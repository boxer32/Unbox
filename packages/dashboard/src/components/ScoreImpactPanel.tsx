import React from 'react';
import { DecisionPayload } from '@unbox/shared';
import { computeScoreImpact } from '../lib/analysis.js';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ScoreImpactPanelProps {
  decision: DecisionPayload;
}

export const ScoreImpactPanel: React.FC<ScoreImpactPanelProps> = ({ decision }) => {
  const delta = computeScoreImpact(decision);

  const ImpactRow = ({ label, value, type }: { label: string, value: number, type: 'q' | 's' | 'e' | 't' }) => {
    const isPositive = value > 0;
    const isZero = value === 0;

    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{label}</span>
          <span className="text-[8px] text-white/30 uppercase tracking-[0.2em]">Reputation Vector</span>
        </div>
        <div className={cn(
          "flex items-center gap-2 font-mono font-bold",
          isZero ? "text-white/20" : isPositive ? "text-unbox-green" : "text-red-500"
        )}>
          <span>{isZero ? '' : (isPositive ? '+' : '-')}{Math.abs(value).toFixed(1)}</span>
          {isZero ? <Minus className="w-4 h-4" /> : isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Score Impact
        </h3>
        <span className="text-[10px] font-black italic text-white/20">AGENT WEIGHTED</span>
      </div>

      <div className="space-y-3">
        <ImpactRow label="Strategy Confidence" value={delta.s} type="s" />
        <ImpactRow label="Execution Quality" value={delta.e} type="e" />
        <ImpactRow label="Risk Quotient" value={delta.q} type="q" />
        <ImpactRow label="Transparency Log" value={delta.t} type="t" />
      </div>

      <div className="pt-4 border-t border-white/5 flex items-start gap-3">
        <Info className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
        <p className="text-[9px] text-white/30 leading-relaxed font-medium">
          Reputation scores are calculated using a weighted vector model. Transparency contributions are awarded automatically for every decision captured by the Mirror engine.
        </p>
      </div>
    </div>
  );
};
