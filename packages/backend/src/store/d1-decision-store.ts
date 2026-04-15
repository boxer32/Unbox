/// <reference types="@cloudflare/workers-types" />
import { DecisionPayload } from '@unbox/shared';
import { IDecisionStore } from './decision-store.js';

export class D1DecisionStore implements IDecisionStore {
  constructor(private db: D1Database) {
    console.log('[D1DecisionStore] Initialized');
  }

  public async save(payload: DecisionPayload): Promise<void> {
    const payloadJson = JSON.stringify(payload);
    
    await this.db.prepare(
      `INSERT INTO decisions (id, action, payload_json, timestampMs, targetAddress) VALUES (?, ?, ?, ?, ?)`
    ).bind(
      payload.decisionId,
      payload.action,
      payloadJson,
      payload.timestampMs,
      payload.targetAddress || null
    ).run();

    if (payload.action === 'block' || payload.securityScan.flags.length > 0) {
      await this.updateRiskCache(payload);
    }
  }

  private async updateRiskCache(payload: DecisionPayload): Promise<void> {
    try {
      const row = await this.db.prepare(`SELECT data_json FROM risk_cache WHERE id = 'global'`).first<{ data_json: string }>();
      let cache = { flags: [] as Array<{flag: string; count: number}>, targets: [] as Array<{address: string; count: number}> };
      if (row) {
        cache = JSON.parse(row.data_json);
      }

      if (payload.securityScan.flags.length > 0) {
        payload.securityScan.flags.forEach((f: string) => {
          const existing = cache.flags.find(item => item.flag === f);
          if (existing) existing.count++;
          else cache.flags.push({ flag: f, count: 1 });
        });
      }

      if (payload.action === 'block' && payload.targetAddress) {
        const existing = cache.targets.find(item => item.address === payload.targetAddress);
        if (existing) existing.count++;
        else cache.targets.push({ address: payload.targetAddress, count: 1 });
      }

      cache.flags.sort((a, b) => b.count - a.count);
      cache.targets.sort((a, b) => b.count - a.count);

      await this.db.prepare(
        `UPDATE risk_cache SET data_json = ? WHERE id = 'global'`
      ).bind(JSON.stringify(cache)).run();
    } catch (error) {
      console.error('[D1DecisionStore] Cache update error:', error);
    }
  }

  public async get(decisionId: string): Promise<DecisionPayload | null> {
    try {
      const row = await this.db.prepare(
        `SELECT payload_json FROM decisions WHERE id = ?`
      ).bind(decisionId).first<{ payload_json: string }>();
      
      if (!row) return null;
      return JSON.parse(row.payload_json) as DecisionPayload;
    } catch (error) {
      return null;
    }
  }

  public async list(limit: number = 50): Promise<DecisionPayload[]> {
    try {
      const { results } = await this.db.prepare(
        `SELECT payload_json FROM decisions ORDER BY timestampMs DESC LIMIT ?`
      ).bind(Math.max(1, limit)).all<{ payload_json: string }>();
      
      return results.map((row: any) => JSON.parse(row.payload_json));
    } catch (error) {
      console.error('[D1DecisionStore] List error:', error);
      return [];
    }
  }

  public async getStats(): Promise<{ total: number, sinceLastHour: number }> {
    try {
      const total = await this.db.prepare(`SELECT COUNT(*) as count FROM decisions`).first<{ count: number }>();
      const hourAgo = Date.now() - 3600000;
      const sinceLastHour = await this.db.prepare(`SELECT COUNT(*) as count FROM decisions WHERE timestampMs > ?`).bind(hourAgo).first<{ count: number }>();
      
      return { 
        total: total?.count || 0, 
        sinceLastHour: sinceLastHour?.count || 0 
      };
    } catch (error) {
       return { total: 0, sinceLastHour: 0 };
    }
  }

  public async getGlobalRiskState(): Promise<any> {
    try {
      const row = await this.db.prepare(
        `SELECT data_json FROM risk_cache WHERE id = 'global'`
      ).first<{ data_json: string }>();
      
      if (row) return JSON.parse(row.data_json);
      return { flags: [], targets: [] };
    } catch (error) {
      console.error('[D1DecisionStore] Global risk cache read error:', error);
      return { flags: [], targets: [] };
    }
  }
}
