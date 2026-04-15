import { ThirdwebIntent, OptimizedPlan } from './types.js';
import crypto from 'crypto';

/**
 * OKX Trade Service Integration
 * Uses OKX Onchain OS DEX Aggregator to find best swap paths.
 */
export class OKXTradeService {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly passphrase: string;
  private readonly baseUrl = 'https://web3.okx.com';

  constructor(env: Record<string, string | undefined>) {
    this.apiKey = env.OKX_API_KEY || '';
    this.secretKey = env.OKX_SECRET_KEY || '';
    this.passphrase = env.OKX_PASSPHRASE || '';
  }

  private createSignature(timestamp: string, method: string, requestPath: string): string {
    const message = timestamp + method + requestPath;
    const hmac = crypto.createHmac('sha256', this.secretKey);
    hmac.update(message);
    return hmac.digest('base64');
  }

  public async getQuote(intent: ThirdwebIntent): Promise<any> {
    if (!this.apiKey) {
      console.warn('[OKXTradeService] No API key provided, returning fallback mock quote.');
      return null;
    }

    const timestamp = new Date().toISOString().slice(0, -5) + 'Z';
    const path = `/api/v6/dex/aggregator/quote?chainIndex=1952&amount=${intent.amount}&fromTokenAddress=${intent.tokenIn}&toTokenAddress=${intent.tokenOut}`;
    const signature = this.createSignature(timestamp, 'GET', path);

    try {
      const response = await fetch(this.baseUrl + path, {
        headers: {
          'OK-ACCESS-KEY': this.apiKey,
          'OK-ACCESS-SIGN': signature,
          'OK-ACCESS-TIMESTAMP': timestamp,
          'OK-ACCESS-PASSPHRASE': this.passphrase,
        }
      });
      return await response.json();
    } catch (error) {
      console.error('[OKXTradeService] API Error:', error);
      return null;
    }
  }
}
