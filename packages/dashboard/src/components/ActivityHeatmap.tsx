import React from 'react';
import { HourBucket } from '../lib/analysis.js';

interface ActivityHeatmapProps {
  buckets: HourBucket[];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ buckets }) => {
  // Color logic: block rate > 40% → red, > 20% → amber, else green
  const getBucketColor = (bucket: HourBucket) => {
    const total = bucket.execute + bucket.block + bucket.defer;
    if (total === 0) return 'rgba(255, 255, 255, 0.05)';
    
    const blockRate = bucket.block / total;
    if (blockRate > 0.4) return 'rgba(239, 68, 68, 0.5)';
    if (blockRate > 0.2) return 'rgba(245, 158, 11, 0.5)';
    return 'rgba(16, 185, 129, 0.5)';
  };

  const getBucketHeight = (bucket: HourBucket) => {
    const total = bucket.execute + bucket.block + bucket.defer;
    if (total === 0) return '10%';
    const capped = Math.min(total, 50); // Cap for visualization
    return `${Math.max(20, (capped / 50) * 100)}%`;
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider">
          Pulse Heatmap (24h)
        </h3>
        <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest text-white/20">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-unbox-green/50" />
            Healthy
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            Elevated Risk
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            Critical Block
          </div>
        </div>
      </div>

      <div className="h-32 flex items-end gap-1.5 px-2">
        {buckets.map((bucket) => (
          <div 
            key={bucket.hour}
            className="flex-1 rounded-sm transition-all duration-500 hover:scale-110 cursor-help group relative"
            style={{ 
              backgroundColor: getBucketColor(bucket),
              height: getBucketHeight(bucket)
            }}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-black border border-white/10 rounded text-[9px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
              <p className="text-white/40 mb-1">Hour: {bucket.hour}:00</p>
              <p className="text-unbox-green">Exec: {bucket.execute}</p>
              <p className="text-red-500">Block: {bucket.block}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[8px] font-black tracking-widest text-white/20 px-2">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
  );
};
