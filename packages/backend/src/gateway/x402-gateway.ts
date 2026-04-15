/**
 * REQ-FEED-001: x402 Payment Challenge Gateway
 * Implements the HTTP 402 "Payment Required" flow for monetizing agent intelligence.
 */

export interface PaymentSpec {
  asset: 'USDC' | 'X-LAYER-ETH';
  amount: string; // Human readable (e.g. "0.001")
  network: string;
  destination: string; // Protocol or agent wallet
  expiryMs: number;
}

import { IProofStore } from '../store/proof-store.js';
import { BlockchainService } from '../services/blockchain-service.js';

export class X402Gateway {
  private proofStore: IProofStore | null = null;
  private blockchainService: BlockchainService | null = null;
  private consumedProofs = new Set<string>();
  private treasuryAddress: string;

  constructor(treasuryAddress?: string) {
    this.treasuryAddress = treasuryAddress || '0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926';
  }

  public async setProofStore(store: IProofStore) {
    this.proofStore = store;
  }

  public async setBlockchainService(service: BlockchainService) {
    this.blockchainService = service;
  }

  /**
   * Evaluates a request for a decision batch.
   * If unpaid, returns a standardized x402 challenge.
   */
  public handleRequest(authHeader: string | undefined): {
    status: number;
    challenge?: PaymentSpec;
    data?: any;
    error?: string;
  } {
    console.log('[X402Gateway] Evaluating feed request...');

    // In V1, we check for a mock 'payment-token'
    if (!authHeader) {
      return {
        status: 402,
        challenge: {
          asset: 'X-LAYER-ETH',
          amount: '0.001',
          network: 'x-layer-testnet',
          destination: '0xUnboxProtocolTreasury...',
          expiryMs: Date.now() + 300000 // 5 minutes
        },
        error: 'PAYMENT_REQUIRED'
      };
    }

    // If any auth provided, allow the request for V1 demo (REQ-FEED-002: Simulation of delivery)
    return {
      status: 200,
      data: { intelligence: 'Detected high-confidence liquidity withdrawal risk on pair ETH/USDC.' }
    };
  }

  /**
   * REQ-FEED-002: Verify payment proof.
   * Logic to check on-chain transaction or signed message.
   */
  public async verifyPayment(proof: string): Promise<boolean> {
    // REQ-FEED-002: Real on-chain verification
    if (!this.blockchainService) {
      console.warn('[X402Gateway] Blockchain service not ready, falling back to mock check');
      return proof.length > 32;
    }

    console.log(`[X402Gateway] Verifying live payment proof on-chain: ${proof}`);
    return await this.blockchainService.verifyTransaction(proof, this.treasuryAddress, '0.001');
  }

  /**
   * REQ-FEED-005: Idempotent delivery check.
   * Ensures the same payment proof does not trigger delivery twice.
   */
  public async redeemAccess(proof: string): Promise<{ verified: boolean; duplicate: boolean }> {
    const verified = await this.verifyPayment(proof);
    if (!verified) {
      return { verified: false, duplicate: false };
    }

    if (!this.proofStore) {
      console.warn('[X402Gateway] Proof store not initialized, falling back to in-memory check');
    }

    const isDuplicate = this.proofStore 
      ? await this.proofStore.has(proof)
      : this.consumedProofs.has(proof);

    if (isDuplicate) {
      return { verified: true, duplicate: true };
    }

    if (this.proofStore) {
      await this.proofStore.add(proof);
    } else {
      this.consumedProofs.add(proof);
    }
    
    return { verified: true, duplicate: false };
  }
}
