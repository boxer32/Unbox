import { describe, it, expect, beforeEach } from 'vitest';
import { MirrorEngine } from '../mirror-engine.js';
import { AgentAdapter, IntentContext } from '../../adapter/agent-adapter.js';
import { InMemoryDecisionStore } from '../../store/memory-store.js';
import { ExplanationWorker } from '../../workers/explanation-worker.js';
import { CounterfactualEngine } from '../counterfactual-engine.js';
import { ReputationService } from '../../services/reputation-service.js';
import { BlockchainService } from '../../services/blockchain-service.js';
import { AxBayesianOptimizer } from '../../skills/ax-optimizer.js';

describe('MirrorEngine Integration', () => {
  const adapter = new AgentAdapter();
  const explainer = new ExplanationWorker();
  const counterfactual = new CounterfactualEngine();
  const mockBlockchain = {
    enqueue: async () => 'job-1',
    getAgentScore: async () => ({ q: 90, s: 90, e: 90, t: 95 }),
  } as unknown as BlockchainService;
  const reputation = new ReputationService(mockBlockchain);
  const optimizer = new AxBayesianOptimizer();
  
  let store: InMemoryDecisionStore;
  let engine: MirrorEngine;

  const mockContext: IntentContext = {
    agentId: 'agent-456',
    intentText: 'Approve token spend for Uniswap',
    marketState: {
      price: 1,
      liquidity: 10000000,
      gas: 15,
      oracleRef: 'fixed',
    },
    securityScan: {
      score: 100,
      flags: [],
    },
    blockRef: 999999,
  };

  beforeEach(async () => {
    store = new InMemoryDecisionStore();
    engine = new MirrorEngine(adapter, store, explainer, counterfactual, reputation, mockBlockchain, optimizer);
    await store.init();
  });

  it('should process and persist a full decision lifecycle', async () => {
    const payload = await engine.mirrorDecision(mockContext, 'execute');

    expect(payload.agentId).toBe('agent-456');
    
    // Check if file exists
    const persisted = await store.get(payload.decisionId);
    expect(persisted).not.toBeNull();
    expect(persisted?.payloadHash).toBe(payload.payloadHash);
  });

  it('should list persisted decisions', async () => {
    await engine.mirrorDecision(mockContext, 'execute');
    await engine.mirrorDecision(mockContext, 'block');

    const list = await store.list();
    expect(list.length).toBe(2);
  });
});
