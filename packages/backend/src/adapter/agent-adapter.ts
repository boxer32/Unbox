import { 
  DecisionPayload, 
  DecisionPayloadSchema, 
  DecisionAction 
} from '@unbox/shared';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';

/**
 * REQ-MIRROR-001: Agent Adapter
 * Intercepts agent intent and normalizes it into a canonical Mirror record.
 */

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
}

export class AgentAdapter {
  /**
   * Intercepts a decision intent and converts it to a validated DecisionPayload.
   * This is the entry point for REQ-MIRROR-001.
   */
  public async intercept(
    context: IntentContext,
    action: DecisionAction
  ): Promise<DecisionPayload> {
    const timestampMs = Date.now();
    const decisionId = uuidv4();

    const payload: Partial<DecisionPayload> = {
      decisionId,
      agentId: context.agentId,
      action,
      intentText: context.intentText,
      marketState: context.marketState,
      securityScan: context.securityScan,
      blockRef: context.blockRef,
      timestampMs,
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
}
