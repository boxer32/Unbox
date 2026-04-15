import { DecisionPayload } from '@unbox/shared';
import { BlockchainService } from './blockchain-service.js';

/**
 * REQ-REP-003: Reputation Service
 * Computes and pushes score updates via the BlockchainService queue.
 */
export class ReputationService {
  constructor(private readonly blockchain: BlockchainService) {}
  
  /**
   * Refreshes the score based on a new finalized decision.
   * Logic: 
   * - Blocked decisions with high risk flags decrease Security and Quality.
   * - Executed decisions with good counterfactuals increase Efficiency.
   */
  public async evaluateDecision(payload: DecisionPayload): Promise<{
    q: number, s: number, e: number, t: number
  }> {
    console.log(`[ReputationService] Evaluating decision: ${payload.decisionId}`);

    // Fetch current scores from contract (REQ-REP-003: Continuous reputation tracking)
    const tokenId = parseInt(payload.agentId) || 1;
    const currentScore = await this.blockchain.getAgentScore(tokenId);
    let { q, s, e, t } = currentScore;

    if (payload.action === 'block') {
      s = Math.max(s - 2, 0);
      q = Math.max(q - 1, 0);
    } else if (payload.action === 'execute') {
      e = Math.min(e + 1, 100);
    }

    t = 100;
    console.log(`[ReputationService] New Score Components: Q=${q}, S=${s}, E=${e}, T=${t}`);

    return { q, s, e, t };
  }

  /**
   * REQ-REP-003: Pushes the update to the blockchain queue.
   */
  public async pushScoreUpdate(tokenId: number, q: number, s: number, e: number, t: number) {
    console.log(`[ReputationService] Enqueueing on-chain update for token ${tokenId}...`);
    await this.blockchain.enqueue('UPDATE_SCORE', [tokenId, q, s, e, t]);
  }
}
