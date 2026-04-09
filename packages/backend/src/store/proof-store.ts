import fs from 'fs/promises';
import path from 'path';

/**
 * REQ-FEED-002, REQ-FEED-005: Persistent proof storage to prevent replay attacks.
 */
export class FileProofStore {
  private readonly storagePath: string;
  private consumedProofs: Set<string> = new Set();

  constructor(filePath: string = 'data/consumed_proofs.json') {
    this.storagePath = path.resolve(process.cwd(), filePath);
  }

  public async init(): Promise<void> {
    try {
      await fs.mkdir(path.dirname(this.storagePath), { recursive: true });
      const data = await fs.readFile(this.storagePath, 'utf-8');
      const list = JSON.parse(data) as string[];
      this.consumedProofs = new Set(list);
      console.log(`[FileProofStore] Loaded ${this.consumedProofs.size} consumed proofs.`);
    } catch (error) {
      this.consumedProofs = new Set();
      await this.save(); // Create file if not exists
    }
  }

  private async save(): Promise<void> {
    await fs.writeFile(this.storagePath, JSON.stringify(Array.from(this.consumedProofs), null, 2));
  }

  public async has(proof: string): Promise<boolean> {
    return this.consumedProofs.has(proof);
  }

  public async add(proof: string): Promise<void> {
    this.consumedProofs.add(proof);
    await this.save();
  }
}
