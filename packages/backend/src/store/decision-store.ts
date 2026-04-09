import { DecisionPayload } from '@unbox/shared';
import fs from 'fs/promises';
import path from 'path';

/**
 * REQ-MIRROR-002: Off-chain payload persistence
 */

export interface IDecisionStore {
  save(payload: DecisionPayload): Promise<void>;
  get(decisionId: string): Promise<DecisionPayload | null>;
  list(limit?: number): Promise<DecisionPayload[]>;
}

export class FileDecisionStore implements IDecisionStore {
  private readonly storageDir: string;

  constructor(basePath: string = 'data/decisions') {
    this.storageDir = path.resolve(process.cwd(), basePath);
  }

  /**
   * Initializes the storage directory.
   */
  public async init(): Promise<void> {
    await fs.mkdir(this.storageDir, { recursive: true });
  }

  public async save(payload: DecisionPayload): Promise<void> {
    const filePath = path.join(this.storageDir, `${payload.decisionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(payload, null, 2));
  }

  public async get(decisionId: string): Promise<DecisionPayload | null> {
    const filePath = path.join(this.storageDir, `${decisionId}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as DecisionPayload;
    } catch (error) {
      return null;
    }
  }

  public async list(limit: number = 50): Promise<DecisionPayload[]> {
    try {
      const files = await fs.readdir(this.storageDir);
      
      const decisions: DecisionPayload[] = [];
      for (const file of files.filter((f) => f.endsWith('.json'))) {
        const data = await fs.readFile(path.join(this.storageDir, file), 'utf-8');
        try {
          decisions.push(JSON.parse(data));
        } catch (e) {
          console.error(`[FileDecisionStore] Failed to parse ${file}`);
        }
      }

      return decisions
        .sort((a, b) => b.timestampMs - a.timestampMs)
        .slice(0, Math.max(0, limit));
    } catch (error) {
      console.error('[FileDecisionStore] List error:', error);
      return [];
    }
  }
}
