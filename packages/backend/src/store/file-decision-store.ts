import { DecisionPayload } from '@unbox/shared';
import fs from 'fs/promises';
import path from 'path';
import { IDecisionStore } from './decision-store.js';

/**
 * REQ-MIRROR-002: Off-chain payload persistence (File-based)
 * Used for local development, testing, and simulation scripts.
 * Production uses D1DecisionStore on Cloudflare Workers.
 */
export class FileDecisionStore implements IDecisionStore {
  private readonly storageDir: string;
  private readonly cacheFilePath: string;

  constructor(basePath: string = 'data/decisions') {
    this.storageDir = path.isAbsolute(basePath) 
      ? basePath 
      : path.resolve('.', basePath);
    
    this.cacheFilePath = path.join(this.storageDir, 'global-risk-cache.json');
    console.log(`[FileDecisionStore] Initialized with storage: ${this.storageDir}`);
  }

  public async init(): Promise<void> {
    await fs.mkdir(this.storageDir, { recursive: true });
    try {
      await fs.access(this.cacheFilePath);
    } catch {
      await fs.writeFile(this.cacheFilePath, JSON.stringify({ flags: [], targets: [] }));
    }
  }

  public async save(payload: DecisionPayload): Promise<void> {
    const filePath = path.join(this.storageDir, `${payload.decisionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(payload, null, 2));

    if (payload.action === 'block' || payload.securityScan.flags.length > 0) {
      await this.updateRiskCache(payload);
    }
  }

  private async updateRiskCache(payload: DecisionPayload): Promise<void> {
    try {
      const cacheData = await fs.readFile(this.cacheFilePath, 'utf-8');
      const cache = JSON.parse(cacheData);

      if (payload.securityScan.flags.length > 0) {
        payload.securityScan.flags.forEach((f: string) => {
          const existing = cache.flags.find((item: any) => item.flag === f);
          if (existing) existing.count++;
          else cache.flags.push({ flag: f, count: 1 });
        });
      }

      if (payload.action === 'block' && payload.targetAddress) {
        const existing = cache.targets.find((item: any) => item.address === payload.targetAddress);
        if (existing) existing.count++;
        else cache.targets.push({ address: payload.targetAddress, count: 1 });
      }

      cache.flags.sort((a: any, b: any) => b.count - a.count);
      cache.targets.sort((a: any, b: any) => b.count - a.count);

      await fs.writeFile(this.cacheFilePath, JSON.stringify(cache, null, 2));
    } catch (error) {
      console.error('[FileDecisionStore] Cache update error:', error);
    }
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
      const jsonFiles = files.filter((f) => f.endsWith('.json') && f !== 'global-risk-cache.json');

      const fileStats = await Promise.all(
        jsonFiles.map(async (file) => {
          const stats = await fs.stat(path.join(this.storageDir, file));
          return { file, mtime: stats.mtimeMs };
        })
      );

      fileStats.sort((a, b) => b.mtime - a.mtime);

      const filesToRead = fileStats.slice(0, Math.max(0, limit));
      
      const decisions: DecisionPayload[] = [];
      for (const { file } of filesToRead) {
        try {
          const data = await fs.readFile(path.join(this.storageDir, file), 'utf-8');
          decisions.push(JSON.parse(data));
        } catch (e) {
          console.error(`[FileDecisionStore] Failed to parse ${file}`);
        }
      }

      return decisions.sort((a, b) => b.timestampMs - a.timestampMs);
    } catch (error) {
      console.error('[FileDecisionStore] List error:', error);
      return [];
    }
  }

  /**
   * REQ-MIRROR-005: Global Risk Aggregator (Optimized via Cache)
   */
  public async getGlobalRiskState(): Promise<any> {
    try {
      const cacheData = await fs.readFile(this.cacheFilePath, 'utf-8');
      return JSON.parse(cacheData);
    } catch (error) {
      console.error('[FileDecisionStore] Global risk cache read error:', error);
      return { flags: [], targets: [] };
    }
  }
}
