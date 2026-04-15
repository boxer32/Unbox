/// <reference types="@cloudflare/workers-types" />
export class D1ProofStore {
  constructor(private db: D1Database) {
    console.log('[D1ProofStore] Initialized');
  }

  public async has(proof: string): Promise<boolean> {
    const row = await this.db.prepare(`SELECT id FROM proofs WHERE id = ?`).bind(proof).first();
    return !!row;
  }

  public async add(proof: string): Promise<void> {
    const ts = Date.now();
    await this.db.prepare(`INSERT INTO proofs (id, consumedAt) VALUES (?, ?)`).bind(proof, ts).run();
  }
}
