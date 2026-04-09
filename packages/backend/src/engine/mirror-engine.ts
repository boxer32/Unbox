import { AgentAdapter, IntentContext } from '../adapter/agent-adapter';
import { IDecisionStore } from '../store/decision-store';
import { DecisionPayload, DecisionAction } from '@unbox/shared';
import { ExplanationWorker } from '../workers/explanation-worker';
import { CounterfactualEngine, CounterfactualResult } from './counterfactual-engine';
import { ReputationService } from '../services/reputation-service';
import { BlockchainService } from '../services/blockchain-service';

/**
 * Mirror Engine
 * Orchestrates decision interception, normalization, and persistence.
 * Mapped IDs: REQ-MIRROR-001, REQ-MIRROR-002, REQ-MIRROR-005
 */

export class MirrorEngine {
  constructor(
    private readonly adapter: AgentAdapter,
    private readonly store: IDecisionStore,
    private readonly explainer: ExplanationWorker,
    private readonly counterfactual: CounterfactualEngine,
    private readonly reputation: ReputationService,
    private readonly blockchain: BlockchainService
  ) {}

  /**
   * Records an agent decision.
   * This handles the full mirror lifecycle for a single decision.
   */
  public async mirrorDecision(
    context: IntentContext,
    action: DecisionAction
  ): Promise<DecisionPayload> {
    console.log(`[MirrorEngine] Intercepting decision for agent: ${context.agentId}`);

    // 1. Intercept and Normalize (REQ-MIRROR-001, 003)
    const payload = await this.adapter.intercept(context, action);

    // 2. Sprint 2: Explainability (REQ-MIRROR-004)
    let explanation = '';
    if (payload.action === 'block') {
      explanation = await this.explainer.explainBlock(payload);
      payload.explanation = explanation;
      console.log(`[MirrorEngine] Explanation generated: "${explanation}"`);
    }

    // 3. Sprint 2: Counterfactual Engine (REQ-CF-002..005)
    const replays = await this.counterfactual.computeCounterfactuals(payload);
    payload.replays = replays;
    
    // 4. Persist Full Off-chain Record (REQ-MIRROR-002)
    // Now includes explanation and replays
    await this.store.save(payload);

    // 5. Anchor Hash On-chain (REQ-MIRROR-002, S5-T04)
    await this.blockchain.enqueue('ANCHOR_DECISION', [
      payload.decisionId,
      payload.agentId,
      payload.payloadHash,
      payload.action
    ]);

    // Sprint 3: Reputation Updates (REQ-REP-003)
    const newScores = await this.reputation.evaluateDecision(payload);
    const tokenId = Number(process.env.AGENT_TOKEN_ID || '1');
    await this.reputation.pushScoreUpdate(tokenId, newScores.q, newScores.s, newScores.e, newScores.t);

    console.log(`[MirrorEngine] Decision persisted with ${replays.length} replays and score updated.`);

    // 6. Emit event (REQ-MIRROR-005)
    this.emitLocalEvent('DecisionCaptured', { ...payload, explanation, replays, newScores });

    return payload;
  }

  /**
   * Mock event emitter for local observability.
   * Will be replaced by on-chain event listeners in S1-T05.
   */
  private emitLocalEvent(type: string, payload: any) {
    // In production, this would go to a WebSocket or PubSub
    console.log(`[Event: ${type}]`, {
      id: payload.decisionId,
      action: payload.action,
      hash: payload.payloadHash
    });
  }
}
