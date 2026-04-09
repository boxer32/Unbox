import { useMemo } from 'react';
import { DecisionStream } from '../components/DecisionStream';
import { ReputationCard } from '../components/ReputationCard';
import { DashboardLayout } from '../components/DashboardLayout';
import { DecisionPayload } from '@unbox/shared';
import { Shield, Activity, Zap, BarChart3, Info } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createLazyFileRoute('/mirror')({
  component: DashboardPage,
})

function DashboardPage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';
  const decisionsQuery = useQuery({
    queryKey: ['mirror-decisions'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/decisions?limit=50`);
      const json = await response.json();
      return (json.decisions ?? []) as DecisionPayload[];
    },
    refetchInterval: 5000,
  });
  const statsQuery = useQuery({
    queryKey: ['mirror-stats'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/stats`);
      const json = await response.json();
      return (json.stats ?? {}) as {
        totalDecisions: number;
        blockRatePercent: number;
        systemPulse: string;
      };
    },
    refetchInterval: 5000,
  });

  const decisions = decisionsQuery.data ?? [];
  const stats = statsQuery.data;
  const uniqueAgents = useMemo(() => new Set(decisions.map((d) => d.agentId)).size, [decisions]);

  return (
    <DashboardLayout>
      <main className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end border-b border-white/10 pb-10">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">Unbox Mirror</h1>
            <p className="text-sm text-white/30 font-medium uppercase tracking-widest leading-relaxed max-w-xl">
              Real-time forensic observability. We capture every agent intent, verify legitimacy, and log decision signals to the X Layer.
            </p>
          </div>
          <div className="flex gap-6">
            <MetricCard icon={Shield} label="Unbox Score" value={stats ? `${Math.max(0, 100 - stats.blockRatePercent)}` : '--'} unit="/100" color="text-unbox-green" />
            <MetricCard icon={Activity} label="System Pulse" value={stats?.systemPulse ?? 'Syncing'} color="text-unbox-green" />
          </div>
        </div>

        {/* Orientation Guide (UX-GLOBAL-006) */}
        <div className="premium-border">
          <div className="glass-card bg-unbox-green/5 border-unbox-green/10 p-6 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-unbox-green/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            <div className="w-12 h-12 rounded-full bg-unbox-green/20 flex items-center justify-center text-unbox-green flex-shrink-0 animate-pulse">
              <Info className="w-6 h-6" />
            </div>
            <div className="space-y-1 relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest text-unbox-green">New to Unbox?</h4>
              <p className="text-xs text-white/50 leading-relaxed font-medium">
                Unbox tracks <span className="text-white">Agent Decisions</span> (Mirror) to build <span className="text-white">Verifiable Reputation</span> (Score), which unlocks <span className="text-white">Premium Intelligence Streams</span> (Feed).
              </p>
            </div>
            <div className="md:ml-auto flex items-center gap-4 relative z-10">
              <button className="px-4 py-2 bg-unbox-green/10 hover:bg-unbox-green/20 text-unbox-green text-[9px] font-black uppercase tracking-widest rounded transition-colors whitespace-nowrap">
                Read Whitepaper
              </button>
              <button className="px-4 py-2 bg-unbox-green text-black hover:bg-emerald-400 text-[9px] font-black uppercase tracking-widest rounded transition-colors whitespace-nowrap">
                Start Tutorial
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {(decisionsQuery.isError || statsQuery.isError) && (
              <div className="glass-card p-4 text-xs text-unbox-red border border-unbox-red/30">
                Failed to load live mirror data from backend API.
              </div>
            )}
            <DecisionStream decisions={decisions} />
          </div>

          <div className="space-y-6">
            <ReputationCard />
            
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <StatItem label="Total Captured" value={`${stats?.totalDecisions ?? 0}`} />
                <StatItem label="Block Rate" value={`${stats?.blockRatePercent ?? 0}%`} />
              </div>
            </div>

            <div className="glass-card p-6 bg-gradient-to-br from-unbox-green/10 to-transparent text-xs text-white/50 leading-relaxed">
               <div className="flex items-center gap-2 mb-2 text-unbox-green uppercase font-bold">
                 <Zap className="w-4 h-4" />
                 Live Connection
               </div>
               Connected to backend API.
               Mirror engine is capturing signals from {uniqueAgents} active agents.
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

function MetricCard({ icon: Icon, label, value, unit, color }: any) {
  return (
    <div className="glass-card px-4 py-2 flex items-center gap-3">
      <Icon className={cn("w-5 h-5", color)} />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{label}</p>
        <p className="text-xl font-bold">{value}{unit && <span className="text-xs font-normal text-white/20 ml-0.5">{unit}</span>}</p>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-white/30 uppercase mb-1">{label}</p>
      <p className="text-lg font-semibold text-white/90">{value}</p>
    </div>
  );
}
