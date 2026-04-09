import { describe, it, expect } from 'vitest';
import { ReputationService } from '../reputation-service';
import { ethers } from 'ethers';
import { agentReputationAbi, resolveRuntimeConfig } from '@unbox/shared';
import { BlockchainService } from '../blockchain-service';

describe('Reputation Synchronization Integration (TC-REP-003)', () => {
  const runtimeConfig = resolveRuntimeConfig(process.env as Record<string, string | undefined>);
  const mockBlockchain = {
    getAgentScore: async () => ({ q: 90, s: 90, e: 90, t: 95 }),
    enqueue: async () => 'job-1',
  } as unknown as BlockchainService;
  const service = new ReputationService(mockBlockchain);
  const provider = new ethers.JsonRpcProvider(runtimeConfig.rpcUrl);
  const contract = new ethers.Contract(runtimeConfig.agentReputationAddress, agentReputationAbi, provider);

  it('should compute and sync score from backend to anvil contract', async () => {
    if (!process.env.RPC_URL) {
      return;
    }

    // 1. Initial State Check
    const scoreBefore = await contract.getScore(1);
    const weightedBefore = Number(scoreBefore.weightedScore);
    
    // 2. Process risky decision
    const mockPayload: any = {
      decisionId: `sync-test-${Date.now()}`,
      action: "block",
      agentId: "alpha-trader"
    };
    
    const computed = await service.evaluateDecision(mockPayload);
    // Based on logic: 90 Quality - 1 = 89; 90 Security - 2 = 88; 90 Efficiency = 90; 100 Transparency
    // Expected Weighted: (89*35 + 88*30 + 90*20 + 100*15) / 100 
    // (3115 + 2640 + 1800 + 1500) / 100 = 9055 / 100 = 90
    
    // 3. Push to Chain
    await service.pushScoreUpdate(1, computed.q, computed.s, computed.e, computed.t);
    
    // 4. Verification on Chain
    const scoreAfter = await contract.getScore(1);
    const weightedAfter = Number(scoreAfter.weightedScore);
    
    console.log(`[SyncTest] Weighted Score: ${weightedBefore} -> ${weightedAfter}`);
    
    expect(weightedAfter).toBe(90);
    expect(Number(scoreAfter.decisionQuality)).toBe(computed.q);
  }, 20000); // Higher timeout for chain interaction
});
