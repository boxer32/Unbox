import { DecisionPayload } from '@unbox/shared';

/**
 * REQ-MIRROR-004: Explanation Worker
 * Converts blocked decisions into plain-language explanations.
 */
export class ExplanationWorker {
  private readonly apiKey: string | undefined;
  private readonly model: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.model = process.env.OPENROUTER_MODEL ?? 'openai/gpt-4o-mini';
  }

  /**
   * Generates a plain-language explanation for a blocked decision.
   */
  public async explainBlock(payload: DecisionPayload): Promise<string> {
    if (payload.action !== 'block') {
      return 'Decision was executed or deferred.';
    }

    // Try AI synthesis if API key is present
    if (this.apiKey) {
      try {
        return await this.generateAiExplanation(payload);
      } catch (error) {
        console.warn('[ExplanationWorker] AI Synthesis failed, falling back to templates.');
      }
    }

    // Fallback: Template-based explanation
    return this.generateTemplateExplanation(payload);
  }

  /**
   * Prompts OpenRouter for natural-language synthesis of risk factors.
   */
  private async generateAiExplanation(payload: DecisionPayload): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY missing');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content:
              'You explain blocked on-chain trading decisions in one concise, objective sentence for operators.',
          },
          {
            role: 'user',
            content: [
              `Intent: ${payload.intentText}`,
              `Security flags: ${payload.securityScan.flags.join(', ') || 'none'}`,
              `Risk score: ${payload.securityScan.score}/100`,
              `Market price: ${payload.marketState.price}`,
              `Market liquidity: ${payload.marketState.liquidity}`,
              'Output one sentence only. Mention the strongest risk signal first.',
            ].join('\n'),
          },
        ],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter request failed with status ${response.status}`);
    }

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('OpenRouter returned empty explanation');
    }
    return content;
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
