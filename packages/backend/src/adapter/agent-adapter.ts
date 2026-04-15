import { 
  DecisionPayload, 
  DecisionPayloadSchema, 
  DecisionAction 
} from '@unbox/shared';

import { ethers } from 'ethers';
import { ThirdwebIntent } from '../skills/types.js';

/**
 * REQ-MIRROR-001: Agent Adapter
 * Intercepts agent intent and normalizes it into a canonical Mirror record.
 */

import { OKXSecurityService } from '../services/okx-security-service.js';

export interface IntentContext {
  agentId: string;
  intentText: string;
  marketState: {
    price: number;
    liquidity: number;
    gas: number;
    oracleRef: string;
  };
  securityScan: {
    score: number;
    flags: string[];
  };
  blockRef: number;
  structuredIntent?: ThirdwebIntent;
}

export class AgentAdapter {
  constructor(private readonly securityService?: OKXSecurityService) {}

  /**
   * Intercepts a decision intent and converts it to a validated DecisionPayload.
   * This is the entry point for REQ-MIRROR-001.
   */
  public async intercept(
    context: IntentContext,
    action: DecisionAction
  ): Promise<DecisionPayload> {
    const timestampMs = Date.now();
    const decisionId = crypto.randomUUID();

    // Extract target address for Global Risk State (V1.5)
    let targetAddress = context.structuredIntent?.tokenOut;
    if (!targetAddress) {
      const addrMatch = context.intentText.match(/0x[a-fA-F0-9]{40}/);
      targetAddress = addrMatch ? addrMatch[0] : undefined;
    }

    // V1.5 Innovative Integration: Trigger real-time OKX Security Scan
    let securityScan = context.securityScan;
    if (this.securityService && targetAddress) {
      const liveScan = await this.securityService.scanToken(targetAddress);
      securityScan = {
        score: Math.max(0, 100 - (liveScan.level * 20)),
        flags: liveScan.riskLabels
      };
    }

    const payload: Partial<DecisionPayload> = {
      decisionId,
      agentId: context.agentId,
      action,
      intentText: context.intentText,
      marketState: context.marketState,
      securityScan,
      blockRef: context.blockRef,
      timestampMs,
      targetAddress
    };

    // REQ-MIRROR-002: Generate deterministic hash for on-chain anchoring
    payload.payloadHash = this.computePayloadHash(payload as Omit<DecisionPayload, 'payloadHash'>);

    // Validate against canonical schema (REQ-MIRROR-003)
    try {
      return DecisionPayloadSchema.parse(payload);
    } catch (error) {
      console.error('[AgentAdapter] Validation Error:', error);
      throw new Error('FAILED_TO_NORMALIZE_DECISION');
    }
  }

  /**
   * Computes a deterministic Keccak256 hash of the payload.
   */
  private computePayloadHash(payload: Omit<DecisionPayload, 'payloadHash'>): string {
    const deepSorted = this.deepSort(payload);
    const serialized = JSON.stringify(deepSorted);
    return ethers.keccak256(ethers.toUtf8Bytes(serialized));
  }

  /**
   * Recursively sorts object keys to ensure deterministic serialization.
   */
  private deepSort(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.deepSort(item));
    }
    const sortedKeys = Object.keys(obj).sort();
    const result: any = {};
    for (const key of sortedKeys) {
      result[key] = this.deepSort(obj[key]);
    }
    return result;
  }

  /**
   * Helper to determine risk flag count for on-chain guardrail.
   */
  public computeRiskCount(payload: DecisionPayload): number {
    return payload.securityScan.flags.length;
  }
}
