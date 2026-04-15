export interface TokenSecurityResult {
  level: number;
  riskLabels: string[];
  action: 'block' | 'warn' | 'safe';
}

/**
 * OKX Security Service Integration (REST API version)
 * Directly calls the OKX Security endpoints via fetch.
 * Compatible with Cloudflare Workers.
 */
export class OKXSecurityService {
  private readonly baseUrl = 'https://web3.okx.com';

  /**
   * Scans a token for risks using OKX DEX Security API.
   * X Layer Chain Index: 196
   */
  public async scanToken(tokenAddress: string, chain: string = '196'): Promise<TokenSecurityResult> {
    try {
      console.log(`[OKXSecurity] Performing REST API scan for ${tokenAddress} on chain ${chain}...`);
      
      const url = `${this.baseUrl}/api/v6/dex/security/token-scan?chainId=${chain}&contractAddress=${tokenAddress}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`OKX Security API returned status ${response.status}`);
      }

      const result: any = await response.json();

      if (result.code !== "0" || !result.data || result.data.length === 0) {
        throw new Error(result.msg || 'Security API returned no data');
      }

      // OKX Security API returns an array of results
      const data = result.data[0];
      const level = parseInt(data.level) || 1;
      
      let action: 'block' | 'warn' | 'safe' = 'safe';
      
      // Level 4: Critical (Honeypot, etc.) -> Block
      if (level >= 4) action = 'block';
      // Level 2-3: Medium/High Risk -> Warn
      else if (level >= 2) action = 'warn';

      return {
        level,
        riskLabels: data.labels || [],
        action
      };
    } catch (error) {
      console.error('[OKXSecurity] REST API Scan Failed:', error);
      // Fail-safe: warning if security infra is unreachable
      return { level: 1, riskLabels: ['SCAN_UNAVAILABLE'], action: 'safe' };
    }
  }
}
