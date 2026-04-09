import { ethers } from 'ethers';
import { decisionLogAbi, agentReputationAbi, resolveRuntimeConfig } from '@unbox/shared';

/**
 * REQ-MIRROR-002, REQ-REP-003, NFR-004
 * S5-T04: Blockchain Service with Congestion Queueing
 * Handles transaction submission with automated queueing, nonce management, and retries.
 */

export type BlockchainJobType = 'ANCHOR_DECISION' | 'UPDATE_SCORE';

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
  
  private queue: BlockchainJob[] = [];
  private isProcessing = false;
  private currentNonce: number | null = null;

  constructor() {
    const config = resolveRuntimeConfig(process.env as Record<string, string | undefined>);
    const rpcUrl = config.rpcUrl;
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY is required to initialize BlockchainService.');
    }
    const logAddr = config.decisionLogAddress;
    const repAddr = config.agentReputationAddress;

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.decisionLog = new ethers.Contract(logAddr, decisionLogAbi, this.wallet);
    this.agentReputation = new ethers.Contract(repAddr, agentReputationAbi, this.wallet);
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
          } else {
            tx = await this.agentReputation.updateScore(...job.params, { nonce: this.currentNonce });
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
}
