import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ExplanationWorker } from '../explanation-worker.js';
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
      const explanation = await worker.explainDecision(mockBlockedPayload);
      expect(explanation.headline).toContain('Blocked');
    });
  
    it('should generate a template explanation for Low Liquidity', async () => {
      const worker = new ExplanationWorker();
      const payload = { 
        ...mockBlockedPayload, 
        securityScan: { score: 50, flags: ['Low Liquidity'] } 
      };
      const explanation = await worker.explainDecision(payload);
      expect(explanation.summary).toContain('Automated protocol safety verification');
    });
  
    it('should handle non-blocked decisions gracefully', async () => {
      const worker = new ExplanationWorker();
      const payload = { ...mockBlockedPayload, action: 'execute' as any };
      const explanation = await worker.explainDecision(payload);
      expect(explanation.headline).toBe('Optimization Executed');
    });
  
    it('should use OpenRouter when API key is present', async () => {
      const apiKey = 'test-key';
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify({ headline: 'Blocked due to severe honeypot indicators.', summary: '...', analysis: [], conclusion: '...' }) } }],
        }),
      } as any);
  
      const worker = new ExplanationWorker(apiKey);
      const explanation = await worker.explainDecision(mockBlockedPayload);
  
      expect(global.fetch).toHaveBeenCalledOnce();
      expect(explanation.headline).toContain('Blocked due to severe honeypot indicators');
    });
  
    it('should fallback to template when OpenRouter fails', async () => {
      const apiKey = 'test-key';
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        json: async () => ({}),
      } as any);
  
      const worker = new ExplanationWorker(apiKey);
      const explanation = await worker.explainDecision(mockBlockedPayload);
      expect(explanation.headline).toContain('Blocked');
    });
});
