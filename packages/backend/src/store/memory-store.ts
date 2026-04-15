import { DecisionPayload } from '@unbox/shared';
import { IDecisionStore } from './decision-store.js';
import { IProofStore } from './proof-store.js';

export class InMemoryDecisionStore implements IDecisionStore {
  private decisions: Map<string, DecisionPayload> = new Map();
  private riskFlags: Array<{ flag: string; count: number }> = [];

  public async init(): Promise<void> {}
  
  public async save(payload: DecisionPayload): Promise<void> {
    this.decisions.set(payload.decisionId, payload);
  }

  public async get(decisionId: string): Promise<DecisionPayload | null> {
    return this.decisions.get(decisionId) || null;
  }

  public async list(limit: number = 50): Promise<DecisionPayload[]> {
    return Array.from(this.decisions.values())
      .sort((a, b) => b.timestampMs - a.timestampMs)
      .slice(0, limit);
  }

  public async getGlobalRiskState(): Promise<any> {
    return { flags: this.riskFlags, targets: [] };
  }
}

export class InMemoryProofStore implements IProofStore {
  private proofs: Set<string> = new Set();
  
  public async has(proof: string): Promise<boolean> {
    return this.proofs.has(proof);
  }

  public async add(proof: string): Promise<void> {
    this.proofs.add(proof);
  }
}
