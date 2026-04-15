import { OnchainOSIntent } from './types.js';
import crypto from 'node:crypto';

/**
 * OKX Onchain OS Trade Service Integration
 * 
 * Connects to OKX Onchain OS DEX Aggregator API to fetch real-time
 * swap quotes, liquidity paths, and supported chain information.
 * This service is the primary bridge between Unbox and the OKX ecosystem.
 * 
 * Supported endpoints:
 *   - /api/v6/dex/aggregator/quote — real-time swap quotes
 *   - /api/v6/dex/balance/supported/chain — supported chain list
 * 
 * X Layer chainIndex: 196
 */
export class OKXTradeService {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly passphrase: string;
  private readonly baseUrl = 'https://web3.okx.com';

  // X Layer chain identifier for OKX Onchain OS
  static readonly X_LAYER_CHAIN_INDEX = '196';

  constructor(env: Record<string, string | undefined>) {
    this.apiKey = env.OKX_API_KEY || env.OK_API_KEY || '';
    this.secretKey = env.OKX_SECRET_KEY || env.OK_SECRET_KEY || '';
    this.passphrase = env.OKX_PASSPHRASE || env.OK_PASSPHRASE || '';
  }

  private createSignature(timestamp: string, method: string, requestPath: string): string {
    const message = timestamp + method + requestPath;
    const hmac = crypto.createHmac('sha256', this.secretKey);
    hmac.update(message);
    return hmac.digest('base64');
  }

  /**
   * Fetches a swap quote from OKX Onchain OS DEX Aggregator.
   * Used by AxBayesianOptimizer to compare OKX routes against
   * Uniswap V3 pool routes for optimal execution.
   */
  public async getQuote(intent: OnchainOSIntent): Promise<any> {
    if (!this.apiKey) {
      console.warn('[OKXTradeService] No API key — returning null (fallback to Uniswap estimation).');
      return null;
    }

    const chainIndex = intent.chainIndex || OKXTradeService.X_LAYER_CHAIN_INDEX;
    const timestamp = new Date().toISOString().slice(0, -5) + 'Z';
    const path = `/api/v6/dex/aggregator/quote?chainIndex=${chainIndex}&amount=${intent.amount}&fromTokenAddress=${intent.tokenIn}&toTokenAddress=${intent.tokenOut}`;
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
      console.error('[OKXTradeService] DEX Aggregator API Error:', error);
      return null;
    }
  }

  /**
   * Fetches the list of chains supported by OKX DEX infrastructure.
   * Used to validate that X Layer (chainIndex 196) is active before routing.
   */
  public async getSupportedChains(): Promise<any> {
    if (!this.apiKey) return null;

    const timestamp = new Date().toISOString().slice(0, -5) + 'Z';
    const path = '/api/v6/dex/balance/supported/chain';
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
      console.error('[OKXTradeService] Supported Chains API Error:', error);
      return null;
    }
  }
}
