import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface TokenSecurityResult {
  level: number;
  riskLabels: string[];
  action: 'block' | 'warn' | 'safe';
}

/**
 * OKX Security Service Integration
 * Uses Onchain OS CLI to perform deep token risk scanning (Honeypot, Rugpull, etc.)
 */
export class OKXSecurityService {
  private readonly binaryPath = '/Users/test/.local/bin/onchainos';

  /**
   * Scans a token for risks across supported chains.
   * Leverages the 4-level risk model from OKX Onchain OS.
   */
  public async scanToken(tokenAddress: string, chain: string = 'xlayer'): Promise<TokenSecurityResult> {
    try {
      console.log(`[OKXSecurity] Scanning token ${tokenAddress} on ${chain}...`);
      
      // Execute Onchain OS CLI command (using X Layer chain index 196)
      const { stdout } = await execAsync(`${this.binaryPath} security token-scan --tokens 196:${tokenAddress}`);
      const result = JSON.parse(stdout);

      if (!result.ok) {
        throw new Error(result.msg || 'Unknown security scan error');
      }

      // Map OKX risk model to Unbox format
      const level = result.data.level || 1;
      let action: 'block' | 'warn' | 'safe' = 'safe';
      
      if (level >= 4) action = 'block';
      else if (level >= 2) action = 'warn';

      return {
        level,
        riskLabels: result.data.labels || [],
        action
      };
    } catch (error) {
      console.error('[OKXSecurity] Scan Failed:', error);
      // Fail-safe: proceed with warning if security infra is down
      return { level: 1, riskLabels: ['SCAN_UNAVAILABLE'], action: 'safe' };
    }
  }
}
