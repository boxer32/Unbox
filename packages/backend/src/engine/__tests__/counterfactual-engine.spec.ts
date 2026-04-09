import { describe, it, expect } from 'vitest';
import { CounterfactualEngine } from '../counterfactual-engine';
import { DecisionPayload } from '@unbox/shared';

describe('CounterfactualEngine', () => {
  const engine = new CounterfactualEngine();

  const mockPayload: DecisionPayload = {
    decisionId: 'decision-123',
    agentId: 'agent-1',
    action: 'execute',
    intentText: 'Swap ETH for USDC',
    marketState: { price: 3500, liquidity: 1000000, gas: 20, oracleRef: 'chainlink' },
    securityScan: { score: 100, flags: [] },
    blockRef: 100,
    timestampMs: Date.now(),
    payloadHash: '0xabc'
  };

  it('should compute exactly 3 scenarios (REQ-CF-002)', async () => {
    const results = await engine.computeCounterfactuals(mockPayload);
    expect(results.length).toBe(3);
    
    const scenarios = results.map(r => r.scenario);
    expect(scenarios).toContain('wait_30s');
    expect(scenarios).toContain('alt_route');
    expect(scenarios).toContain('invert_action');
  });

  it('should compute numerical deltas (REQ-CF-003)', async () => {
    const results = await engine.computeCounterfactuals(mockPayload);
    const waitResult = results.find(r => r.scenario === 'wait_30s');
    
    expect(waitResult?.usdDelta).toBeTypeOf('number');
    expect(waitResult?.summary).toBeDefined();
  });
});
