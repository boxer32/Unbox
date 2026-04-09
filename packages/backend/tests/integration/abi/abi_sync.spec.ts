import { describe, it, expect } from 'vitest';
import { agentReputationAbi } from '@unbox/shared';

describe('ABI synchronization (TC-REP-007)', () => {
  it('should keep required contract methods present in shared ABI', async () => {
    const sharedFnNames = new Set(
      agentReputationAbi
        .filter((entry) => entry.type === 'function')
        .map((entry) => entry.name),
    );
    const requiredFunctionNames = [
      'getScore',
      'getScoreHistory',
      'mintIdentity',
      'updateScore',
    ];
    for (const fnName of requiredFunctionNames) {
      expect(sharedFnNames.has(fnName)).toBe(true);
    }
  });
});
