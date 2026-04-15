import { DecisionPayload, CounterfactualResult } from '@unbox/shared';

export interface AnomalySignal {
  type: 'flag_cluster' | 'block_rate_spike';
  flag?: string;
  count?: number;
  message: string;
}

export interface HourBucket {
  hour: number;
  execute: number;
  block: number;
  defer: number;
}

export interface PatternEntry {
  flag: string;
  count: number;
}

export interface CausalStep {
  id: 'intent' | 'snapshot' | 'security' | 'decision';
  status: 'pass' | 'fail' | 'neutral';
  title: string;
  reqId?: string;
  data: Record<string, string>;
  flags?: string[];
}

export interface ScoreDelta {
  q: number;
  s: number;
  e: number;
  t: number;
}

/**
 * Detects security patterns that warrant a dashboard alert.
 */
export function detectAnomaly(decisions: DecisionPayload[]): AnomalySignal | null {
  if (decisions.length === 0) return null;

  const now = Date.now();
  const tenMinutesMs = 10 * 60 * 1000;
  const recent = decisions.filter(d => now - d.timestampMs < tenMinutesMs);

  if (recent.length === 0) return null;

  // 1. Flag cluster check
  const flagCounts: Record<string, number> = {};
  recent.forEach(d => {
    d.securityScan.flags.forEach(f => {
      flagCounts[f] = (flagCounts[f] ?? 0) + 1;
    });
  });

  const dominantFlag = Object.entries(flagCounts).find(([, count]) => count >= 2);
  if (dominantFlag) {
    return {
      type: 'flag_cluster',
      flag: dominantFlag[0],
      count: dominantFlag[1],
      message: `${dominantFlag[0]} appearing ${dominantFlag[1]}x in last 10 minutes`,
    };
  }

  // 2. Block rate spike check (if > 40% of recent decisions are blocks)
  const blockCount = recent.filter(d => d.action === 'block').length;
  if (recent.length >= 5 && blockCount / recent.length > 0.4) {
    return {
      type: 'block_rate_spike',
      message: `Critical block rate spike: ${Math.round((blockCount / recent.length) * 100)}% in last 10 minutes`,
    };
  }

  return null;
}

/**
 * Groups decisions into 24-hour buckets for heatmap visualization.
 */
export function buildHourBuckets(decisions: DecisionPayload[]): HourBucket[] {
  const buckets = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    execute: 0,
    block: 0,
    defer: 0
  }));

  decisions.forEach(d => {
    const hour = new Date(d.timestampMs).getHours();
    if (d.action === 'execute') buckets[hour].execute++;
    else if (d.action === 'block') buckets[hour].block++;
    else if (d.action === 'defer') buckets[hour].defer++;
  });

  return buckets;
}

/**
 * Aggregates recurring security flags.
 */
export function buildPatternSummary(decisions: DecisionPayload[]): PatternEntry[] {
  const flagMap: Record<string, number> = {};
  decisions.forEach(d => {
    d.securityScan.flags.forEach(f => {
      flagMap[f] = (flagMap[f] ?? 0) + 1;
    });
  });

  return Object.entries(flagMap)
    .sort((a, b) => b[1] - a[1])
    .map(([flag, count]) => ({ flag, count }));
}

/**
 * Constructs the causal chain logic for forensic visualization.
 */
export function buildCausalChain(decision: DecisionPayload): CausalStep[] {
  return [
    {
      id: 'intent',
      status: 'neutral',
      title: 'Intent formation',
      data: {
        goal: decision.intentText.toUpperCase().includes('ARBITRAGE') ? 'Arbitrage Attack' : 
              decision.intentText.toUpperCase().includes('LAUNCH') ? 'Token Launch' :
              decision.intentText.toUpperCase().includes('VOTE') ? 'Governance Force' :
              decision.intentText.toLowerCase().includes('swap') ? 'Asset Swap' : 'Liquidity Mgmt',
        intent: decision.intentText.length > 20 ? decision.intentText.slice(0, 17) + '...' : decision.intentText,
        token: (decision as any).structuredIntent?.tokenOut?.slice(0, 10) || 'N/A',
      },
    },
    {
      id: 'snapshot',
      status: 'neutral',
      title: 'State snapshot captured',
      reqId: 'REQ-CF-001',
      data: {
        price: `$${decision.marketState.price}`,
        liquidity: `$${decision.marketState.liquidity.toLocaleString()}`,
        gas: `${decision.marketState.gas} gwei`,
      },
    },
    // CR Comment: Strategic Bayesian Optimization (V1.5 Active Optimizer)
    ...((decision as any).optimization ? [{
      id: 'optimization' as any,
      status: 'pass' as any,
      title: 'Strategy Optimized',
      reqId: 'NFR-003',
      data: {
        'gas limit': (decision as any).optimization?.optimizedPayload?.recommendedGasLimit || 'Auto',
        'max fee': (decision as any).optimization?.optimizedPayload?.recommendedMaxFeePerGas || 'Auto',
        route: (decision as any).optimization?.targetRoute?.split('_').pop() || (decision as any).optimization?.optimizedPayload?.targetRoute?.split('_').pop() || 'Canonical',
      },
    }] : []),
    {
      id: 'security',
      status: decision.securityScan.score < 20 ? 'fail' : 'pass',
      title: 'Security scan',
      data: {
        score: `${decision.securityScan.score}/100`,
        status: decision.securityScan.score < 20 ? 'CRITICAL' : 'SAFE',
      },
      flags: decision.securityScan.flags,
    },
    {
      id: 'decision',
      status: decision.action === 'block' ? 'fail' : 'pass',
      title: `Decision: ${decision.action.toUpperCase()}`,
      reqId: 'REQ-MIRROR-001',
      data: {
        'rule triggered': decision.action === 'block'
          ? `score < threshold(30)` : 'score \u2265 threshold',
        suppressed: decision.action === 'block' ? 'yes \u2014 no gas spent' : 'no',
        'loss avoided': bestCounterfactualSaving(decision),
      },
    },
  ];
}

/**
 * Finds decisions sharing flags with the current one.
 */
export function findRelatedDecisions(
  current: DecisionPayload,
  all: DecisionPayload[]
): DecisionPayload[] {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const currentFlags = new Set(current.securityScan.flags);

  return all
    .filter(d =>
      d.decisionId !== current.decisionId &&
      d.timestampMs >= todayStart.getTime() &&
      d.securityScan.flags.some(f => currentFlags.has(f))
    )
    .slice(0, 5);
}

/**
 * Calculates reputation score delta.
 */
export function computeScoreImpact(decision: DecisionPayload): ScoreDelta {
  const delta = { q: 0, s: 0, e: 0, t: 0 };
  if (decision.action === 'block') {
    delta.s = -0.2;
    delta.q = -0.1;
  } else if (decision.action === 'execute') {
    delta.e = +0.1;
  }
  delta.t = 0.1; // Transparency contribution for logging
  return delta;
}

/**
 * Identifies the most representative counterfactual scenario.
 */
export function isBestScenario(action: string, replay: CounterfactualResult): boolean {
  if (action === 'block') {
    // For blocks, 'best' means the scenario proving high risk (large negative delta avoided)
    return replay.scenario === 'wait_30s' || replay.usdDelta < -100;
  }
  // For executions, 'best' is the optimal route taken
  return replay.scenario === 'direct' || replay.usdDelta >= 0;
}

/**
 * Returns color class based on security score.
 */
export function scoreColor(score: number): string {
  if (score > 70) return 'text-unbox-green';
  if (score > 30) return 'text-amber-400';
  return 'text-red-500';
}

/**
 * Formats the avoided loss from counterfactual analysis.
 */
export function bestCounterfactualSaving(decision: DecisionPayload): string {
  if (!decision.replays || decision.replays.length === 0) return '$0.00';
  
  if (decision.action === 'block') {
    const maxLoss = Math.min(...decision.replays.map(r => r.usdDelta));
    return maxLoss < 0 ? `$${Math.abs(maxLoss).toFixed(2)}` : '$0.00';
  }
  
  return '$0.00';
}
