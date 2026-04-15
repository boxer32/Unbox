import { PatternEntry } from '../lib/analysis.js';
import React from 'react';
import { Target, AlertCircle, Info, ShieldAlert, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { RiskState } from '@unbox/shared';
import { apiFetch } from '../lib/api.js';

interface PatternSidebarProps {
  patterns: PatternEntry[];
}

export const PatternSidebar: React.FC<PatternSidebarProps> = ({ patterns }) => {
  const { data: globalRisk, isLoading } = useQuery<{ riskState: RiskState }>({
    queryKey: ['global-risk'],
    queryFn: () => apiFetch<{ riskState: RiskState }>('/api/global-risk'),
    refetchInterval: 10000, // Sync every 10s
  });

  // CR Comment 1 (Epic 4): Prefer global risk cache for high-performance dashboard scaling
  const displayPatterns = (globalRisk?.riskState?.flags && globalRisk.riskState.flags.length > 0)
    ? globalRisk.riskState.flags
    : patterns;

  return (
    <div id="pattern-sidebar" className="glass-card p-6 space-y-6">
      <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
        <Target className="w-4 h-4" />
        Detected Patterns
      </h3>

      {displayPatterns.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
          <Info className="w-8 h-8 text-white/10" />
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-black">
            {isLoading ? 'Scanning Cluster...' : 'No active patterns detected'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayPatterns.slice(0, 5).map((pattern) => (
            <div 
              key={pattern.flag}
              className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 group hover:border-unbox-green/30 transition-all cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-unbox-green transition-colors">
                  {pattern.flag}
                </span>
                <span className="text-[8px] text-white/30 uppercase tracking-[0.2em]">Risk Group</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white tabular-nums">{pattern.count}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* V1.5 Ecosystem Threat Map */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <h3 className="text-sm font-medium text-unbox-green/80 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          Ecosystem Threat Map
        </h3>

        {globalRisk?.riskState?.targets && globalRisk.riskState.targets.length > 0 ? (
          <div className="space-y-2">
            {globalRisk.riskState.targets.slice(0, 3).map((threat: any) => (
              <div 
                key={threat.address}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-red-400 truncate max-w-[140px]">
                    {threat.address}
                  </span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-red-500" />
                    <span className="text-xs font-bold text-white">{threat.count}</span>
                  </div>
                </div>
                <p className="text-[9px] text-white/40 leading-tight">
                  Has been blocked by {threat.count} agents in the last 24h.
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-white/20 uppercase tracking-widest text-center py-4">
            No systemic threats detected
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="glass-card bg-white/5 p-4 rounded-xl space-y-2">
          <p className="text-[9px] font-bold text-unbox-green uppercase tracking-widest flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3" />
            Pattern Logic
          </p>
          <p className="text-[10px] text-white/40 leading-relaxed">
            Recurring flags within a 1-hour window are clustered to identify potential targeted attacks or systemic failures.
          </p>
        </div>
      </div>
    </div>
  );
};
