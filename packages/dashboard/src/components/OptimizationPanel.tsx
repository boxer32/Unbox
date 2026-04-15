import React from 'react';
import { OptimizedPlan } from '@unbox/shared';
import { Target, Zap, ShieldCheck, ShieldAlert, TrendingDown, Gauge } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OptimizationPanelProps {
  optimization?: OptimizedPlan;
  handshakeStatus?: 'approved' | 'blocked' | 'pending';
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ optimization, handshakeStatus = 'approved' }) => {
  if (!optimization) return null;

  const isBlocked = handshakeStatus === 'blocked';

  return (
    <div className="glass-card overflow-hidden group">
      {/* Header */}
      <div className={cn(
        "px-6 py-3 flex items-center justify-between border-b border-white/5",
        isBlocked ? "bg-red-500/10" : "bg-unbox-green/10"
      )}>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-white/50">
          <Target className="w-4 h-4 text-unbox-green" />
          Active Optimizer V1.5
        </h3>
        <div className="flex items-center gap-2">
          {isBlocked ? (
            <>
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span className="text-[9px] font-black uppercase text-red-500">Handshake Blocked</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-unbox-green" />
              <span className="text-[9px] font-black uppercase text-unbox-green">Handshake Approved</span>
            </>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Bayesian Result */}
        <div className="relative p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-4 overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Zap className="w-24 h-24 text-unbox-green" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-[10px] font-black text-unbox-green uppercase tracking-widest">Ax Bayesian Result</p>
              <p className="text-xs text-white/40">Global Maximum Search Completed</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="space-y-1">
              <span className="text-[8px] uppercase tracking-widest text-white/30">Target Route</span>
              <p className="text-sm font-mono text-white font-bold">{(optimization.optimizedPayload as any).targetRoute || 'Canonical'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] uppercase tracking-widest text-white/30">Slippage Limit</span>
              <p className="text-sm font-mono text-unbox-green font-bold">{(optimization.optimizedPayload as any).recommendedSlippage * 100}%</p>
            </div>
          </div>
        </div>

        {/* Savings Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card bg-white/5 p-4 rounded-xl border-unbox-green/20 group-hover:border-unbox-green/40 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-3 h-3 text-unbox-green" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Slippage Saved</span>
            </div>
            <p className="text-xl font-black text-white">{optimization.improvements.slippageSaved}%</p>
            <div className="mt-2 w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-unbox-green h-full w-[15%]" />
            </div>
          </div>

          <div className="glass-card bg-white/5 p-4 rounded-xl border-unbox-green/20 group-hover:border-unbox-green/40 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Gauge className="w-3 h-3 text-unbox-green" />
              <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Gas Optimized</span>
            </div>
            <p className="text-xl font-black text-white">{(optimization.improvements.gasSaved / 1000).toFixed(1)}k</p>
            <div className="mt-2 w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-unbox-green h-full w-[25%]" />
            </div>
          </div>
        </div>

        <div className="pt-2">
            <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] italic font-medium leading-relaxed">
              Optimizer performed 100 iterations on X Layer Testnet telemetry to finalize this execution plan.
            </p>
        </div>
      </div>
    </div>
  );
};
