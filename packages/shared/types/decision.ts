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
  explanation: z.any().optional().describe('Plain-language block explanation or structural JSON'),
  targetAddress: z.string().optional().describe('Target contract or wallet address involved in the decision'),
  replays: z.array(z.any()).optional().describe('Counterfactual replay results'),
  optimization: z.any().optional().describe('Optimization outcome'),
  latencyMs: z.number().optional().describe('Decision latency'),
});

export type MarketState = z.infer<typeof MarketStateSchema>;
export type SecurityScan = z.infer<typeof SecurityScanSchema>;
export type DecisionAction = z.infer<typeof DecisionAction>;
export type DecisionPayload = z.infer<typeof DecisionPayloadSchema>;

export interface CounterfactualResult {
  scenario: string;
  usdDelta: number;
  summary: string;
  slippageDeltaPct: number;
  gasDelta: number;
}

export interface RiskState {
  score: number;
  flags: Array<{ flag: string; count: number }>;
  targets: Array<{ address: string; count: number }>;
}

export interface ThirdwebIntent {
  agentTokenId: number;
  action: 'SWAP' | 'TRANSFER';
  tokenIn: string;
  tokenOut: string;
  amount: string;
}

export interface OptimizedPlan {
  originalPayload: any;
  optimizedPayload: any;
  improvements: { 
    slippageSaved: number; 
    gasSaved: number; 
  };
  riskFlags: number;
  payloadHash: string;
}

export interface OptimizerSkill {
  skillName: string;
  optimize(intent: ThirdwebIntent): Promise<OptimizedPlan>;
}
