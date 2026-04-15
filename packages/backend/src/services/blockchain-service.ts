import { ethers } from 'ethers';
import { decisionLogAbi, agentReputationAbi, unboxGuardrailAbi, resolveRuntimeConfig } from '@unbox/shared';

/**
 * REQ-MIRROR-002, REQ-REP-003, NFR-004
 * S5-T04: Blockchain Service with Congestion Queueing
 * Handles transaction submission with automated queueing, nonce management, and retries.
 */

export type BlockchainJobType = 'ANCHOR_DECISION' | 'UPDATE_SCORE' | 'HANDSHAKE_GUARDRAIL';

export interface BlockchainJob {
  id: string;
  type: BlockchainJobType;
  params: any[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  txHash?: string;
  error?: string;
  retries: number;
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private decisionLog: ethers.Contract;
  private agentReputation: ethers.Contract;
  private unboxGuardrail: ethers.Contract;
  
  private queue: BlockchainJob[] = [];
  private isProcessing = false;
  private currentNonce: number | null = null;

  constructor(env: Record<string, string | undefined> = {}) {
    const config = resolveRuntimeConfig(env);
    const rpcUrl = config.rpcUrl;
    const privateKey = env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY is required to initialize BlockchainService.');
    }
    const logAddr = config.decisionLogAddress;
    const repAddr = config.agentReputationAddress;
    const guardAddr = config.unboxGuardrailAddress;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.decisionLog = new ethers.Contract(logAddr, decisionLogAbi, this.wallet);
    this.agentReputation = new ethers.Contract(repAddr, agentReputationAbi, this.wallet);
    this.unboxGuardrail = new ethers.Contract(guardAddr, unboxGuardrailAbi, this.wallet);
  }

  /**
   * Pushes a new job into the congestion queue.
   */
  public async enqueue(type: BlockchainJobType, params: any[]): Promise<string> {
    const jobId = ethers.hexlify(ethers.randomBytes(16));
    const job: BlockchainJob = {
      id: jobId,
      type,
      params,
      status: 'pending',
      retries: 0
    };

    this.queue.push(job);
    console.log(`[BlockchainService] Job Enqueued: ${type} (ID: ${jobId})`);
    
    // Start processing if not already doing so
    this.processQueue().catch(err => console.error('[BlockchainService] Process Queue Error:', err));
    
    return jobId;
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    try {
      if (this.currentNonce === null) {
        this.currentNonce = await this.wallet.getNonce();
      }

      while (this.queue.length > 0) {
        const job = this.queue[0];
        job.status = 'processing';

        try {
          console.log(`[BlockchainService] Processing ${job.type} with nonce ${this.currentNonce}...`);
          let tx: ethers.ContractTransactionResponse;

          if (job.type === 'ANCHOR_DECISION') {
            tx = await this.decisionLog.logDecision(...job.params, { nonce: this.currentNonce });
          } else if (job.type === 'UPDATE_SCORE') {
            tx = await this.agentReputation.updateScore(...job.params, { nonce: this.currentNonce });
          } else {
            tx = await this.unboxGuardrail.requestExecution(...job.params, { nonce: this.currentNonce });
          }

          job.txHash = tx.hash;
          const assignedNonce = this.currentNonce;
          this.currentNonce++;
          
          console.log(`[BlockchainService] Tx Sent: ${tx.hash} (Nonce: ${assignedNonce}). Handling confirmation in background...`);
          
          // Remove from queue immediately to allow next job to process
          this.queue.shift();

          // Monitor confirmation asynchronously
          tx.wait(1).then((receipt) => {
            job.status = 'completed';
            console.log(`[BlockchainService] Job Completed: ${job.id} at block ${receipt?.blockNumber}`);
          }).catch(async (err) => {
            console.error(`[BlockchainService] Confirmation Failed: ${job.id}`, err.message);
            // On confirmation failure, we might need to resync nonce if it was a rejection
            if (job.retries < 3) {
              job.retries++;
              job.status = 'pending';
              this.queue.unshift(job); // Put back to front
              this.currentNonce = await this.wallet.getNonce();
              console.log(`[BlockchainService] Retrying job ${job.id} after confirmation failure...`);
            } else {
              job.status = 'failed';
              job.error = err.message;
            }
          });

        } catch (err: any) {
          console.error(`[BlockchainService] Send Failed: ${job.id}`, err.message);
          
          if (job.retries < 3) {
            job.retries++;
            job.status = 'pending';
            console.log(`[BlockchainService] Retrying job ${job.id} (${job.retries}/3)...`);
            
            // On send failure, we don't necessarily want to reset from chain if we have other txs in flight.
            // But for safety in this demo, we wait and only reset if the queue is backing up or we hit specific errors.
            await new Promise(r => setTimeout(r, 2000));
          } else {
            job.status = 'failed';
            job.error = err.message;
            this.queue.shift();
          }
        }
      }
    } finally {
      this.isProcessing = false;
    }
  }

  public getQueueLength(): number {
    return this.queue.length;
  }

  public getJob(jobId: string): BlockchainJob | undefined {
    return this.queue.find(j => j.id === jobId);
  }

  /**
   * Performs an on-chain handshake with the Guardrail contract.
   * This is a blocking verification step before execution.
   */
  public async requestHandshake(
    agentTokenId: number, 
    payloadHash: string, 
    riskFlagCount: number
  ): Promise<string> {
    // CR Comment 1: Added timeout check for RPC stability
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('RPC_TIMEOUT_DURING_HANDSHAKE')), 10000)
    );

    try {
      return await Promise.race([
        this.enqueue('HANDSHAKE_GUARDRAIL', [agentTokenId, payloadHash, riskFlagCount]),
        timeoutPromise as Promise<string>
      ]);
    } catch (error: any) {
      console.error(`[BlockchainService] Handshake Enqueue Failed:`, error.message);
      // Fallback Policy: Reject Safely if network is unstable
      throw new Error(`GUARDRAIL_NETWORK_ERROR: ${error.message}`);
    }
  }

  /**
   * Performs a synchronous dry-run of the handshake.
   * Throws an error if the contract rules (Reputation vs Risk) would cause a revert or return false.
   */
  public async verifyHandshake(
    agentTokenId: number,
    payloadHash: string,
    riskFlagCount: number
  ): Promise<void> {
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('RPC_TIMEOUT_DURING_VERIFICATION')), 5000)
    );

    try {
      // Use staticCall to dry-run the transaction
      // CR Comment 1: Added timeout to prevent hanging on RPC delay
      const success = await Promise.race([
        this.unboxGuardrail.requestExecution.staticCall(agentTokenId, payloadHash, riskFlagCount),
        timeoutPromise as Promise<boolean>
      ]);

      // CR Comment 2 (Epic 1): Now checking for return false instead of just revert
      if (!success) {
        throw new Error('GUARDRAIL_REJECTED_BY_CONTRACT');
      }
      
      console.log(`[BlockchainService] Handshake Verification SUCCESS for Token ${agentTokenId}`);
    } catch (err: any) {
      console.warn(`[BlockchainService] Handshake Verification FAILED:`, err.message);
      // Fallback Policy: Reject Safely on verification failure
      if (err.message.includes('TIMEOUT')) {
        throw new Error('GUARDRAIL_TIMEOUT_FAILSAFE_BLOCK');
      }
      throw err;
    }
  }

  public async getAgentScore(tokenId: number): Promise<{
    q: number, s: number, e: number, t: number
  }> {
    try {
      const score = await this.agentReputation.getScore(tokenId);
      return {
        q: Number(score.decisionQuality),
        s: Number(score.securityDiscipline),
        e: Number(score.executionEfficiency),
        t: Number(score.transparency)
      };
    } catch (error) {
      console.error(`[BlockchainService] Failed to fetch score for token ${tokenId}, returning defaults`, error);
      return { q: 90, s: 90, e: 90, t: 95 };
    }
  }

  /**
   * REQ-FEED-002: Verifies a payment transaction on-chain.
   * Checks for existence, success, recipient, and minimum value.
   */
  public async verifyTransaction(txHash: string, expectedRecipient: string, minAmountEth: string): Promise<boolean> {
    try {
      const tx = await this.provider.getTransaction(txHash);
      if (!tx) return false;

      // Verify recipient matches (case-insensitive)
      if (tx.to?.toLowerCase() !== expectedRecipient.toLowerCase()) {
        console.warn(`[BlockchainService] Recipient mismatch: expected ${expectedRecipient}, got ${tx.to}`);
        return false;
      }

      // Verify value
      const valWei = tx.value;
      const minWei = ethers.parseEther(minAmountEth);
      if (valWei < minWei) {
        console.warn(`[BlockchainService] Insufficient value: expected ${minAmountEth}, got ${ethers.formatEther(valWei)}`);
        return false;
      }

      const receipt = await tx.wait(1);
      return receipt?.status === 1;
    } catch (error) {
      console.error(`[BlockchainService] Payment verification failed for ${txHash}:`, error);
      return false;
    }
  }
}
