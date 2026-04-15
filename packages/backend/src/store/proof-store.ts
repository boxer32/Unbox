/**
 * REQ-FEED-002, REQ-FEED-005: Persistent proof storage to prevent replay attacks.
 */
export interface IProofStore {
  has(proof: string): Promise<boolean>;
  add(proof: string): Promise<void>;
}
