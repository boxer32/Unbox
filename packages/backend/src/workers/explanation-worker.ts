import { DecisionPayload } from '@unbox/shared';
import { OpenRouter } from '@openrouter/sdk';

/**
 * REQ-MIRROR-004: Explanation Worker
 * Converts blocked decisions into plain-language explanations.
 */
export class ExplanationWorker {
  private client: OpenRouter | null = null;
  private modelName: string = 'google/gemini-2.0-flash-lite-preview-02-05:free';
  private apiKey?: string;

  constructor(apiKey?: string, model?: string) {
    console.log('[ExplanationWorker] Initializing AI Narrator...');
    if (apiKey) {
      console.log(`[ExplanationWorker] Success: OpenRouter Key detected (${apiKey.slice(0, 10)}...)`);
      this.client = new OpenRouter({ apiKey });
      this.modelName = model ?? 'google/gemini-2.0-flash-lite-preview-02-05:free';
      this.apiKey = apiKey;
    } else {
      console.warn('[ExplanationWorker] Warning: OPENROUTER_API_KEY missing from environment.');
    }
  }

  /**
   * Generates a structured explanation for a decision using OpenRouter JSON Schema.
   */
  public async explainDecision(payload: DecisionPayload): Promise<any> {
    console.log(`[ExplanationWorker] explainDecision called for action: ${payload.action}`);
    
    if (this.client) {
      console.log(`[ExplanationWorker] Requesting Structured JSON via OpenRouter (Model: ${this.modelName})...`);
      try {
        if (payload.action === 'block') {
          return await this.generateStructuredBlockExplanation(this.client, payload);
        } else {
          return await this.generateStructuredSuccessExplanation(this.client, payload);
        }
      } catch (error: any) {
        console.warn(`[ExplanationWorker] Structured AI Synthesis failed: ${error.message}. falling back to default.`);
      }
    }

    return {
      headline: payload.action === 'block' ? 'Trade Blocked' : 'Optimization Executed',
      summary: 'Automated protocol safety verification.',
      details: [{ title: 'Notice', content: 'AI synthesis was unavailable. Standard safety checks were applied.' }],
      conclusion: 'Safety priority maintained.'
    };
  }

  private async generateStructuredBlockExplanation(client: OpenRouter, payload: DecisionPayload): Promise<any> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: [
          {
            role: 'user',
            content: `Analyze this blocked trade on X Layer: 
            Intent: ${payload.intentText}
            Security Flags: ${payload.securityScan.flags.join(', ')}
            Risk Score: ${payload.securityScan.score}/100
            Market: $${payload.marketState.liquidity} liquidity
            Oracle: ${payload.marketState.oracleRef}
            Chain Context: Block #${payload.blockRef}`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'forensic_report',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                headline: { type: 'string', description: 'Headline including the primary threat' },
                summary: { type: 'string', description: 'Summary mentioning Chain/Block context if relevant' },
                analysis: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      factor: { type: 'string' },
                      description: { type: 'string' }
                    },
                    required: ['factor', 'description'],
                    additionalProperties: false
                  }
                },
                conclusion: { type: 'string', description: 'Danger avoided, referenced to Oracle/Market state' }
              },
              required: ['headline', 'summary', 'analysis', 'conclusion'],
              additionalProperties: false
            }
          }
        }
      })
    });

    const data = await response.json() as any;
    return JSON.parse(data.choices[0].message.content || '{}');
  }

  private async generateStructuredSuccessExplanation(client: OpenRouter, payload: DecisionPayload): Promise<any> {
    const opt = (payload as any).optimization;
    const replays = payload.replays || [];
    const bestReplay = replays.reduce((prev, curr) => (curr.usdDelta > prev.usdDelta ? curr : prev), { usdDelta: -1 } as any);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: [
          {
            role: 'user',
            content: `Explain trade optimization on X Layer:
            Strategy: ${opt?.executionStrategy}
            Alpha: ${opt?.improvements?.slippageSaved}% slippage saved
            Counterfactual: ${bestReplay.summary}
            Oracle Verified: ${payload.marketState.oracleRef}
            Reference Block: #${payload.blockRef}`
          }
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'efficiency_report',
            strict: true,
            schema: {
              type: 'object',
              properties: {
                headline: { type: 'string', description: 'Economic alpha summary' },
                coreBenefit: { type: 'string', description: 'Detailed reason for path choice with Oracle/Network context' },
                comparisons: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      scenario: { type: 'string' },
                      result: { type: 'string' }
                    },
                    required: ['scenario', 'result'],
                    additionalProperties: false
                  }
                },
                longTermValue: { type: 'string', description: 'Reputation/Wealth impact based on current chain state' }
              },
              required: ['headline', 'coreBenefit', 'comparisons', 'longTermValue'],
              additionalProperties: false
            }
          }
        }
      })
    });

    const data = await response.json() as any;
    return JSON.parse(data.choices[0].message.content || '{}');
  }

  /**
   * Generates a deterministic explanation based on security flags.
   */
  private generateTemplateExplanation(payload: DecisionPayload): Promise<string> {
    const { flags, score } = payload.securityScan;
    
    if (flags.includes('Honeypot Risk')) {
      return Promise.resolve('Trade blocked: Potential honeypot detected (token cannot be sold).');
    }
    
    if (flags.includes('Low Liquidity')) {
      return Promise.resolve(`Trade blocked: Liquidity depth ($${payload.marketState.liquidity}) is too low for the intended size.`);
    }

    if (score < 30) {
      return Promise.resolve(`Trade blocked: Aggregated risk score (${score}) is below the minimum safety threshold.`);
    }

    return Promise.resolve('Trade blocked due to multiple internal security-check failures.');
  }
}
