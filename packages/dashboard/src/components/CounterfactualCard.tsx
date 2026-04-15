import React from 'react';
import { CounterfactualResult } from '@unbox/shared';
import { ArrowDownRight, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CounterfactualCardProps {
  replay: CounterfactualResult;
  isBest?: boolean;
}

export const CounterfactualCard: React.FC<CounterfactualCardProps> = ({ replay, isBest }) => {
  const isNegative = replay.usdDelta < 0;

  return (
    <div className={cn(
      "glass-card p-4 relative overflow-hidden transition-all group hover:bg-white/[0.03]",
      isBest && "border-unbox-green/30 bg-unbox-green/[0.02]"
    )}>
      {isBest && (
        <div className="absolute top-0 right-0 px-2 py-0.5 bg-unbox-green text-black text-[7px] font-black uppercase tracking-widest rounded-bl">
          Representative Scenario
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Scenario</p>
          <h4 className="text-sm font-bold text-white uppercase italic tracking-tight">
            {replay.scenario.replace('_', ' ')}
          </h4>
        </div>
        <div className={cn(
          "px-3 py-1 rounded-sm text-xs font-mono font-bold flex items-center gap-1.5",
          isNegative ? "text-red-400 bg-red-400/10" : "text-unbox-green bg-unbox-green/10"
        )}>
          {isNegative ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
          {isNegative ? '-' : '+'}${Math.abs(replay.usdDelta).toFixed(2)}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-white/60 leading-relaxed font-medium">
          {replay.summary}
        </p>

        <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Slippage Impact</p>
            <p className={cn(
              "text-xs font-mono",
              replay.slippageDeltaPct > 0.5 ? "text-red-400" : "text-white/80"
            )}>
              {replay.slippageDeltaPct}%
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Gas Estimate</p>
            <p className="text-xs font-mono text-white/80">
              {replay.gasDelta} gwei
            </p>
          </div>
        </div>
      </div>
      
      {isBest && (
        <div className="mt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-unbox-green">
          <ShieldCheck className="w-3 h-3" />
          Confirmed Decision Basis
        </div>
      )}
    </div>
  );
};
