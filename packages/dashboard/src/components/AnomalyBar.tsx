import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';
import { AnomalySignal } from '../lib/analysis.js';
import { Link } from '@tanstack/react-router';

interface AnomalyBarProps {
  anomaly: AnomalySignal | null;
}

export const AnomalyBar: React.FC<AnomalyBarProps> = ({ anomaly }) => {
  if (!anomaly) return null;

  return (
    <div className="premium-border animate-in slide-in-from-top-4 duration-500">
      <div className="glass-card bg-amber-500/5 border-amber-500/20 px-6 py-4 flex items-center justify-between border-l-[3px] border-l-amber-500">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
            {anomaly.type === 'flag_cluster' ? <ShieldAlert className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
              Security Anomaly Detected — {anomaly.type.replace('_', ' ')}
            </h4>
            <p className="text-sm font-medium text-white/80">{anomaly.message}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {anomaly.flag && (
            <span className="px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded border border-amber-500/20 uppercase">
              {anomaly.flag}
            </span>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest text-white transition-all rounded group">
            Investigate Patterns
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
