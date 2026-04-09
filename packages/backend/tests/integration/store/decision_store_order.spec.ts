import { describe, it, expect } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { FileDecisionStore } from '../../../src/store/decision-store';

describe('Decision Store Ordering (TC-MIR-008)', () => {
  it('should list by timestamp descending regardless of file order', async () => {
    const basePath = `data/test_decisions_order_${Date.now()}`;
    const store = new FileDecisionStore(basePath);
    await store.init();

    const storageDir = path.resolve(process.cwd(), basePath);
    const baseDecision = {
      agentId: 'agent-1',
      action: 'execute',
      intentText: 'intent',
      marketState: { price: 1, liquidity: 1, gas: 1, oracleRef: 'test' },
      securityScan: { score: 90, flags: [] },
      blockRef: 1,
      payloadHash: '0xabc',
    };

    await fs.writeFile(
      path.join(storageDir, 'z-last.json'),
      JSON.stringify({ ...baseDecision, decisionId: '1', timestampMs: 1000 }),
    );
    await fs.writeFile(
      path.join(storageDir, 'a-first.json'),
      JSON.stringify({ ...baseDecision, decisionId: '2', timestampMs: 3000 }),
    );
    await fs.writeFile(
      path.join(storageDir, 'm-middle.json'),
      JSON.stringify({ ...baseDecision, decisionId: '3', timestampMs: 2000 }),
    );

    const decisions = await store.list();
    expect(decisions.map((d) => d.timestampMs)).toEqual([3000, 2000, 1000]);

    await fs.rm(storageDir, { recursive: true, force: true });
  });
});
