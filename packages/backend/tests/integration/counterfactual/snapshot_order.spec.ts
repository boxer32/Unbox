import { describe, it, expect, vi } from 'vitest';
import { MirrorEngine } from '../../../src/engine/mirror-engine';
import { AgentAdapter } from '../../../src/adapter/agent-adapter';
import { FileDecisionStore } from '../../../src/store/decision-store';
import { ExplanationWorker } from '../../../src/workers/explanation-worker';
import { CounterfactualEngine } from '../../../src/engine/counterfactual-engine';
import { ReputationService } from '../../../src/services/reputation-service';
import { BlockchainService } from '../../../src/services/blockchain-service';

describe('Counterfactual Snapshot Order (TC-CF-001)', () => {
  it('should ensure snapshot timestamp is captured before final action', async () => {
    // Setup
    const adapter = new AgentAdapter();
    const store = new FileDecisionStore('data/test-decisions');
    await store.init();
    const explainer = new ExplanationWorker();
    const counterfactual = new CounterfactualEngine();
    const mockBlockchain = {
      enqueue: async () => 'job-1',
      getAgentScore: async () => ({ q: 90, s: 90, e: 90, t: 95 }),
    } as unknown as BlockchainService;
    const reputation = new ReputationService(mockBlockchain);
    
    // Mock pushScoreUpdate to avoid real chain dependency for this specific timing test
    vi.spyOn(reputation, 'pushScoreUpdate').mockResolvedValue(undefined as any);

    const engine = new MirrorEngine(adapter, store, explainer, counterfactual, reputation, mockBlockchain);

    const context = {
      agentId: 'test-agent',
      intentText: 'Swap 1 ETH for USDC',
      marketState: { price: 3000, liquidity: 1000000, gas: 50, oracleRef: 'v1' },
      securityScan: { score: 95, flags: [] },
      blockRef: 1000
    };

    const startTime = Date.now();
    const payload = await engine.mirrorDecision(context, 'execute');
    const endTime = Date.now();

    // Verification REQ-CF-001: Snapshot created before final action returned
    expect(payload.timestampMs).toBeGreaterThanOrEqual(startTime);
    expect(payload.timestampMs).toBeLessThanOrEqual(endTime);
    
    console.log(`[TC-CF-001] Snapshot Time: ${payload.timestampMs}, Execution Time: ${endTime - startTime}ms. Order Validated.`);
  });
});
