import { DecisionPayload } from '@unbox/shared';

/**
 * REQ-MIRROR-002: Off-chain payload persistence
 */

export interface IDecisionStore {
  save(payload: DecisionPayload): Promise<void>;
  get(decisionId: string): Promise<DecisionPayload | null>;
  list(limit?: number): Promise<DecisionPayload[]>;
  getGlobalRiskState(): Promise<Array<{ flag: string; count: number }>>;
}

// Re-export FileDecisionStore for backward compatibility with tests and local dev
export { FileDecisionStore } from './file-decision-store.js';
