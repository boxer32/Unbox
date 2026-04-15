import React from 'react';
import { Database, Zap, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../lib/api.js';

export interface OpsMetrics {
  syncStatus: string;
  blockchainQueue: number;
  hotCacheSize: number;
  historicalTotal: number;
  blockRate: number;
  p95LatencyMs: number;
}

export const OpsMetricsCard: React.FC = () => {
  const { data, isLoading } = useQuery<{ metrics: OpsMetrics }>({
    queryKey: ['ops-metrics'],
    queryFn: () => apiFetch<{ metrics: OpsMetrics }>('/api/ops/metrics'),
    refetchInterval: 3000,
  });

  if (isLoading || !data) {
    return (
      <div className="glass-card p-6 h-full animate-pulse flex items-center justify-center">
         <div className="text-[10px] uppercase tracking-widest text-white/20 font-black">Syncing Ops Pulse...</div>
      </div>
    );
  }

  const { metrics } = data;

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-unbox-green/[0.03] to-transparent space-y-5 border-unbox-green/10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
          <Database className="w-4 h-4 text-unbox-green" />
          System Health
        </h3>
        <span className="text-[9px] font-bold text-unbox-green bg-unbox-green/5 px-2 py-0.5 rounded uppercase tracking-widest border border-unbox-green/20 flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-unbox-green animate-pulse" />
          {metrics.syncStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricItem 
          icon={Zap} 
          label="Mem-Cache" 
          value={metrics.hotCacheSize} 
          subValue="Hot decisions"
          color="text-unbox-green"
        />
        <MetricItem 
          icon={Clock} 
          label="Queue Depth" 
          value={metrics.blockchainQueue} 
          subValue="Tx enqueued"
          color={metrics.blockchainQueue > 0 ? "text-amber-400" : "text-white/40"}
        />
        <MetricItem 
          icon={CheckCircle2} 
          label="Total Handshakes" 
          value={metrics.historicalTotal} 
          subValue="Historic records"
          color="text-white/40"
        />
        <MetricItem 
          icon={AlertTriangle} 
          label="P95 Latency" 
          value={`${metrics.p95LatencyMs}ms`} 
          subValue="Intercept-to-Log"
          color="text-unbox-green"
        />
      </div>

      <div className="pt-2">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-unbox-green transition-all duration-1000" 
            style={{ width: `${Math.min(100, (metrics.hotCacheSize / 20) * 100)}%` }} 
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">Cache Pressure</span>
          <span className="text-[8px] uppercase tracking-widest text-unbox-green font-bold italic">{metrics.hotCacheSize}/20</span>
        </div>
      </div>
    </div>
  );
};

function MetricItem({ icon: Icon, label, value, subValue, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-white/30 font-bold">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className={cn("text-xl font-black italic tracking-tighter tabular-nums", color)}>
        {value}
      </div>
      <div className="text-[8px] text-white/20 uppercase font-medium">{subValue}</div>
    </div>
  );
}

// Inline helper for tailwind classes if needed, or import from utils
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
