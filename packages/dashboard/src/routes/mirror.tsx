import { useMemo } from 'react';
import { DecisionStream } from '../components/DecisionStream.js';
import { ReputationCard } from '../components/ReputationCard.js';
import { DashboardLayout } from '../components/DashboardLayout.js';
import { AnomalyBar } from '../components/AnomalyBar.js';
import { ActivityHeatmap } from '../components/ActivityHeatmap.js';
import { PatternSidebar } from '../components/PatternSidebar.js';
import { OpsMetricsCard } from '../components/OpsMetricsCard.js';
import { CausalChainPanel } from '../components/CausalChainPanel.js';
import { detectAnomaly, buildHourBuckets, buildPatternSummary } from '../lib/analysis.js';
import { DecisionPayload } from '@unbox/shared';
import { Shield, Activity, Zap, BarChart3, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createFileRoute('/mirror')({
  component: DashboardPage,
})

import { apiFetch } from '../lib/api.js';

function DashboardPage() {
  const decisionsQuery = useQuery({
    queryKey: ['mirror-decisions'],
    queryFn: () => apiFetch<{ decisions: DecisionPayload[] }>('/api/decisions?limit=50').then(res => res.decisions ?? []),
    refetchInterval: 5000,
  });

  const statsQuery = useQuery({
    queryKey: ['mirror-stats'],
    queryFn: () => apiFetch<{ stats: any }>('/api/stats').then(res => res.stats ?? {}),
    refetchInterval: 5000,
  });

  const decisions = decisionsQuery.data ?? [];
  const stats = statsQuery.data;
  
  // Analysis logic
  const anomaly = useMemo(() => detectAnomaly(decisions), [decisions]);
  const hourBuckets = useMemo(() => buildHourBuckets(decisions), [decisions]);
  const patternSummary = useMemo(() => buildPatternSummary(decisions), [decisions]);
  const latestBlock = useMemo(() => decisions.find(d => d.action === 'block'), [decisions]);
  const uniqueAgents = useMemo(() => new Set(decisions.map((d) => d.agentId)).size, [decisions]);

  return (
    <DashboardLayout>
      <main className="min-h-screen p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-10 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">Unbox Mirror</h1>
            <p className="text-sm text-white/30 font-medium uppercase tracking-widest leading-relaxed max-w-xl">
              Real-time forensic observability. We capture every agent intent, verify legitimacy, and log decision signals to the X Layer.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <MetricCard 
              icon={Shield} 
              label="Unbox Score" 
              value="92" 
              unit="/100" 
              color="text-unbox-green"
              delta="Live on X Layer"
            />
            <MetricCard 
              icon={TrendingUp} 
              label="Block Rate" 
              value={stats ? `${stats.blockRatePercent}%` : '--'} 
              color={stats?.blockRatePercent && stats.blockRatePercent > 20 ? "text-red-500" : "text-amber-400"}
              delta="+1.2% spike"
            />
            <MetricCard 
              icon={Activity} 
              label="Pulse" 
              value={stats?.systemPulse ?? 'Syncing'} 
              color="text-unbox-green" 
            />
          </div>
        </div>

        <AnomalyBar anomaly={anomaly} />

        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Main Stream Column */}
          <div className="space-y-12">
            <ActivityHeatmap buckets={hourBuckets} />
            
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                 <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Decision Stream</h2>
                 <div className="flex items-center gap-2 text-[10px] text-unbox-green font-bold uppercase">
                   <div className="w-2 h-2 rounded-full bg-unbox-green animate-pulse" />
                   Live Capture Active
                 </div>
               </div>
               
               {decisionsQuery.isError && (
                 <div className="glass-card p-4 text-xs text-red-500 border border-red-500/20 bg-red-500/5 flex items-center gap-2">
                   <AlertTriangle className="w-4 h-4" />
                   Forensic link interrupted. Backend API unavailable.
                 </div>
               )}
               
               <DecisionStream decisions={decisions} />
            </div>

            {latestBlock && (
              <section className="space-y-4 pt-4">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 px-2">Latest Forensic Trace</h2>
                <CausalChainPanel decision={latestBlock} />
              </section>
            )}
          </div>

          {/* Secondary Metrics Section (Row layout) */}
          <section className="pt-12 border-t border-white/5">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 px-2 mb-8">System Telemetry</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ReputationCard />
              <PatternSidebar patterns={patternSummary} />
              <OpsMetricsCard />
            </div>
          </section>
        </div>
      </main>
    </DashboardLayout>
  );
}

function MetricCard({ icon: Icon, label, value, unit, color, delta }: any) {
  return (
    <div className="glass-card px-5 py-3 flex items-center gap-4 border-white/5 bg-white/[0.02]">
      <div className={cn("p-2 rounded-lg bg-white/5", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[9px] uppercase tracking-widest text-white/30 font-black">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-black italic tracking-tighter tabular-nums">{value}{unit && <span className="text-xs font-normal text-white/20 ml-0.5">{unit}</span>}</p>
          {delta && <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{delta}</span>}
        </div>
      </div>
    </div>
  );
}
