import { AgentAdapter, IntentContext } from '../adapter/agent-adapter.js';
import { IDecisionStore } from '../store/decision-store.js';
import { DecisionPayload, DecisionAction } from '@unbox/shared';
import { ExplanationWorker } from '../workers/explanation-worker.js';
import { CounterfactualEngine, CounterfactualResult } from './counterfactual-engine.js';
import { ReputationService } from '../services/reputation-service.js';
import { BlockchainService } from '../services/blockchain-service.js';
import { AxBayesianOptimizer } from '../skills/ax-optimizer.js';

/**
 * Mirror Engine
 * Orchestrates decision interception, normalization, and persistence.
 * Mapped IDs: REQ-MIRROR-001, REQ-MIRROR-002, REQ-MIRROR-005
 */

export class MirrorEngine {
  private recentDecisions: DecisionPayload[] = [];
  private readonly MAX_CACHE_SIZE = 20;

  constructor(
    private readonly adapter: AgentAdapter,
    private readonly store: IDecisionStore,
    private readonly explainer: ExplanationWorker,
    private readonly counterfactual: CounterfactualEngine,
    private readonly reputation: ReputationService,
    private readonly blockchain: BlockchainService,
    private readonly optimizer: AxBayesianOptimizer,
    private readonly agentTokenId: number = 1
  ) {}

  /**
   * REQ-MIRROR-005, NFR-005: Graceful Degradation Cache
   * Returns the last 20 decisions from memory for ultra-low latency dashboard updates.
   */
  public getRecent(): DecisionPayload[] {
    return [...this.recentDecisions].reverse();
  }

  /**
   * Records an agent decision.
   * This handles the full mirror lifecycle for a single decision.
   */
  public async mirrorDecision(
    context: IntentContext,
    action: DecisionAction
  ): Promise<DecisionPayload> {
    console.log(`\n\n!!! MIRROR CORE AKTIVATED - TRACE: ${context.agentId} !!!\n\n`);
    console.log(`[MirrorEngine] Intercepting decision for agent: ${context.agentId}`);

    // 1. Intercept and Normalize (REQ-MIRROR-001, 003)
    const payload = await this.adapter.intercept(context, action);

    // 1.1 V1.5: Bayesian Optimization (Active Optimizer)
    if (context.structuredIntent) {
      console.log(`[MirrorEngine] Optimizing execution plan for agent ${context.agentId}...`);
      const optimized = await this.optimizer.optimize(context.structuredIntent);
      (payload as any).optimization = optimized;
      // MirrorEngine now acts as an Active Guardrail by performing the handshake before final mirror
      try {
        console.log(`[MirrorEngine] Initiating On-chain Handshake Verification (Guardrail)...`);
        const riskCount = this.adapter.computeRiskCount(payload);
        
        // 1. Synchronous dry-run (Static Call)
        await this.blockchain.verifyHandshake(
          context.structuredIntent.agentTokenId,
          optimized.payloadHash,
          riskCount
        );

        // 2. If it passes verification, enqueue the real handshake for logs/metrics
        const handshakeJobId = await this.blockchain.requestHandshake(
          context.structuredIntent.agentTokenId,
          optimized.payloadHash,
          riskCount
        );
        console.log(`[MirrorEngine] Handshake verified and enqueued: ${handshakeJobId}`);
      } catch (handshakeError: any) {
        console.warn(`[MirrorEngine] Handshake REJECTED by Guardrail: ${handshakeError.message}`);
        // For hackathon, we still record the attempt but mark as blocked by guardrail
        payload.action = 'block';
        payload.explanation = 'BLOCKED_BY_ONCHAIN_GUARDRAIL: ' + (handshakeError.message || 'Reputation/Risk mismatch');
      }
    }

    // 3. Sprint 2: Counterfactual Engine (REQ-CF-002..005)
    const replays = await this.counterfactual.computeCounterfactuals(payload);
    payload.replays = replays;

    // 4. AI Narrator: Explain current path vs counterfactuals (REQ-MIRROR-004)
    const explanation = await this.explainer.explainDecision(payload);
    payload.explanation = explanation;
    console.log(`[MirrorEngine] Causal Narrative generated: "${explanation}"`);

    // 5. Persist Full Off-chain Record (REQ-MIRROR-002)
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
    await this.reputation.pushScoreUpdate(this.agentTokenId, newScores.q, newScores.s, newScores.e, newScores.t);

    console.log(`[MirrorEngine] Decision persisted with ${replays.length} replays and score updated.`);

    // 6. Emit event (REQ-MIRROR-005)
    this.emitLocalEvent('DecisionCaptured', { ...payload, explanation, replays, newScores });

    // 7. Update memory cache for NFR-005: Last 20 decisions
    this.recentDecisions.push(payload);
    if (this.recentDecisions.length > this.MAX_CACHE_SIZE) {
      this.recentDecisions.shift();
    }

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
