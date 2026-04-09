"use client";

import React from 'react';
import { DecisionPayload } from '@unbox/shared';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DecisionStreamProps {
  decisions: DecisionPayload[];
}

/**
 * UX-GLOBAL-001: Decision Stream Panel
 * Displays a live feed of agent decisions with status-based color coding.
 */
export const DecisionStream: React.FC<DecisionStreamProps> = ({ decisions }) => {
  return (
    <div className="premium-border">
      <div className="glass-card overflow-hidden">
        <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-unbox-amber rounded-sm animate-pulse" />
            <h2 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">
              Decision Intercept stream
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-unbox-green" />
            Live Buffer: {decisions.length} events
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <tr>
                <th className="px-8 py-4 font-black">Agent Action</th>
                <th className="px-8 py-4 font-black">Forensic Intent</th>
                <th className="px-8 py-4 font-black">Log ID</th>
                <th className="px-8 py-4 font-black text-right">Intercept Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {decisions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                      <Clock className="w-8 h-8 animate-spin-slow" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">
                        Awaiting on-chain decision signals...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                decisions.map((decision) => (
                  <tr key={decision.decisionId} className="hover:bg-unbox-green/[0.02] transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <StatusBadge action={decision.action} />
                    </td>
                    <td className="px-8 py-5">
                      <Link
                        to="/decisions/$decisionId"
                        params={{ decisionId: decision.decisionId }}
                        className="flex flex-col gap-1.5"
                      >
                        <span className="text-sm font-bold text-white/90 group-hover:text-unbox-green transition-colors leading-snug">
                          {decision.intentText}
                        </span>
                        {decision.action === 'block' && decision.securityScan.flags.length > 0 && (
                           <div className="flex items-center gap-2">
                             <span className="text-[8px] font-black uppercase tracking-widest bg-unbox-red/10 text-unbox-red px-2 py-0.5 rounded border border-unbox-red/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                               {decision.securityScan.flags[0]}
                             </span>
                             <span className="text-[8px] text-white/20 font-mono uppercase">Risk Score: {decision.securityScan.score}/100</span>
                           </div>
                        )}
                      </Link>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-mono text-white/20 group-hover:text-white/40 transition-colors uppercase">
                        {decision.decisionId.split('-')[0]}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="text-[10px] font-black text-white/30 tabular-nums">
                        {new Date(decision.timestampMs).toLocaleTimeString('en-US', { hour12: false })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ action: 'execute' | 'block' | 'defer' }> = ({ action }) => {
  const config = {
    execute: {
      color: 'bg-unbox-green/5 text-unbox-green border-unbox-green/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
      icon: CheckCircle,
      label: 'Executed'
    },
    block: {
      color: 'bg-unbox-red/5 text-unbox-red border-unbox-red/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
      icon: XCircle,
      label: 'Blocked'
    },
    defer: {
      color: 'bg-unbox-amber/5 text-unbox-amber border-unbox-amber/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
      icon: Clock,
      label: 'Deferred'
    }
  };

  const { color, icon: Icon, label } = config[action];

  return (
    <span className={cn("px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border w-fit italic", color)}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
};
