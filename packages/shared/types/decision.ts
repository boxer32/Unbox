import { z } from 'zod';

/**
 * REQ-MIRROR-003: Canonical Decision Payload Schema
 * This schema validates every decision intercepted by the agent-adapter.
 */

export const MarketStateSchema = z.object({
  price: z.number().describe('Asset price at decision time'),
  liquidity: z.number().describe('Available liquidity depth'),
  gas: z.number().describe('Current network gas price'),
  oracleRef: z.string().describe('Source of truth for market state'),
});

export const SecurityScanSchema = z.object({
  score: z.number().min(0).max(100).describe('Security risk score'),
  flags: z.array(z.string()).describe('Identified risk labels'),
});

export const DecisionAction = z.enum(['execute', 'block', 'defer']);

export const DecisionPayloadSchema = z.object({
  decisionId: z.string().uuid().describe('Unique identifier for this decision'),
  agentId: z.string().describe('Identifier of the agent making the decision'),
  action: DecisionAction,
  intentText: z.string().describe('Plain language intent of the agent'),
  marketState: MarketStateSchema,
  securityScan: SecurityScanSchema,
  blockRef: z.number().int().positive().describe('X Layer block number reference'),
  timestampMs: z.number().int().describe('Unix timestamp in milliseconds'),
  payloadHash: z.string().describe('Deterministic hash of the payload for on-chain anchoring'),
  explanation: z.string().optional().describe('Plain-language block explanation'),
  replays: z.array(z.any()).optional().describe('Counterfactual replay results'),
});

export type MarketState = z.infer<typeof MarketStateSchema>;
export type SecurityScan = z.infer<typeof SecurityScanSchema>;
export type DecisionAction = z.infer<typeof DecisionAction>;
export type DecisionPayload = z.infer<typeof DecisionPayloadSchema>;
