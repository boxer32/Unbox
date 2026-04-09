import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ExplanationWorker } from '../explanation-worker';
import { DecisionPayload } from '@unbox/shared';

describe('ExplanationWorker', () => {
  const originalFetch = global.fetch;
  const originalApiKey = process.env.OPENROUTER_API_KEY;

  beforeEach(() => {
    delete process.env.OPENROUTER_API_KEY;
    vi.restoreAllMocks();
  });

  afterEach(() => {
    process.env.OPENROUTER_API_KEY = originalApiKey;
    global.fetch = originalFetch;
  });

  const mockBlockedPayload: DecisionPayload = {
    decisionId: 'uuid-1',
    agentId: 'agent-1',
    action: 'block',
    intentText: 'Swap ETH for SHITCOIN',
    marketState: { price: 1, liquidity: 500, gas: 20, oracleRef: 'dex' },
    securityScan: { score: 10, flags: ['Honeypot Risk'] },
    blockRef: 123,
    timestampMs: Date.now(),
    payloadHash: '0xabc'
  };

  it('should generate a template explanation for Honeypot Risk (REQ-MIRROR-004)', async () => {
    const worker = new ExplanationWorker();
    const explanation = await worker.explainBlock(mockBlockedPayload);
    expect(explanation).toContain('honeypot');
  });

  it('should generate a template explanation for Low Liquidity', async () => {
    const worker = new ExplanationWorker();
    const payload = { 
      ...mockBlockedPayload, 
      securityScan: { score: 50, flags: ['Low Liquidity'] } 
    };
    const explanation = await worker.explainBlock(payload);
    expect(explanation).toContain('Liquidity depth');
  });

  it('should handle non-blocked decisions gracefully', async () => {
    const worker = new ExplanationWorker();
    const payload = { ...mockBlockedPayload, action: 'execute' as any };
    const explanation = await worker.explainBlock(payload);
    expect(explanation).toBe('Decision was executed or deferred.');
  });

  it('should use OpenRouter when API key is present', async () => {
    process.env.OPENROUTER_API_KEY = 'test-key';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Blocked due to severe honeypot indicators.' } }],
      }),
    } as any);

    const worker = new ExplanationWorker();
    const explanation = await worker.explainBlock(mockBlockedPayload);

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(explanation).toContain('Blocked due to severe honeypot indicators');
  });

  it('should fallback to template when OpenRouter fails', async () => {
    process.env.OPENROUTER_API_KEY = 'test-key';
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    } as any);

    const worker = new ExplanationWorker();
    const explanation = await worker.explainBlock(mockBlockedPayload);
    expect(explanation).toContain('honeypot');
  });
});
