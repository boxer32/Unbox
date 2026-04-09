import { describe, it, expect, beforeEach } from 'vitest';
import { MirrorEngine } from '../mirror-engine';
import { AgentAdapter, IntentContext } from '../../adapter/agent-adapter';
import { FileDecisionStore } from '../../store/decision-store';
import { ExplanationWorker } from '../../workers/explanation-worker';
import { CounterfactualEngine } from '../counterfactual-engine';
import { ReputationService } from '../../services/reputation-service';
import { BlockchainService } from '../../services/blockchain-service';
import fs from 'fs/promises';
import path from 'path';

describe('MirrorEngine Integration', () => {
  const testStorageDir = 'data/test_decisions';
  const adapter = new AgentAdapter();
  const store = new FileDecisionStore(testStorageDir);
  const explainer = new ExplanationWorker();
  const counterfactual = new CounterfactualEngine();
  const mockBlockchain = {
    enqueue: async () => 'job-1',
    getAgentScore: async () => ({ q: 90, s: 90, e: 90, t: 95 }),
  } as unknown as BlockchainService;
  const reputation = new ReputationService(mockBlockchain);
  const engine = new MirrorEngine(adapter, store, explainer, counterfactual, reputation, mockBlockchain);

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
    // Clean up test directory
    const fullPath = path.resolve(process.cwd(), testStorageDir);
    await fs.rm(fullPath, { recursive: true, force: true });
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
