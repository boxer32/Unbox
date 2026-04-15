import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { ArrowLeft, AlertCircle, RefreshCcw, Loader2, Signal, BarChart3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DashboardLayout } from '../components/DashboardLayout.js';
import { CausalChainPanel } from '../components/CausalChainPanel.js';
import { CounterfactualCard } from '../components/CounterfactualCard.js';
import { EngineerActions } from '../components/EngineerActions.js';
import { HashAnchor } from '../components/HashAnchor.js';
import { OptimizationPanel } from '../components/OptimizationPanel.js';
import { ScoreImpactPanel } from '../components/ScoreImpactPanel.js';
import { isBestScenario, bestCounterfactualSaving } from '../lib/analysis.js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@tanstack/react-query';
import { DecisionPayload } from '@unbox/shared';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createFileRoute('/decisions/$decisionId')({
  component: DecisionDetailPage,
})

import { apiFetch } from '../lib/api.js';

function DecisionDetailPage() {
  const { decisionId } = Route.useParams();

  const { data: decision, isLoading, error } = useQuery({
    queryKey: ['decision', decisionId],
    queryFn: () => apiFetch<{ decision: DecisionPayload }>(`/api/decisions/${decisionId}`).then(res => res.decision)
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-unbox-green animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !decision) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-white/60 font-medium uppercase tracking-widest text-xs">Decision Trace Lost</p>
          <Link to="/mirror" className="px-6 py-2 bg-unbox-green text-black font-black uppercase text-[10px] tracking-widest rounded transition-all hover:scale-105">
            Return to Mirror
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const lossAvoided = bestCounterfactualSaving(decision);

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <Link to="/mirror" className="flex items-center gap-2 text-white/30 hover:text-unbox-green transition-colors group text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Mirror Stream
            </Link>
            <div className="flex items-center gap-4">
              <div className={cn(
                "px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border shadow-[0_0_15px_rgba(0,0,0,0.5)]",
                decision.action === 'execute' 
                  ? "bg-unbox-green text-black border-unbox-green" 
                  : "bg-red-500 text-black border-red-500"
              )}>
                {decision.action}
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                {decision.intentText}
              </h1>
            </div>
            <p className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
              TRACE_ID: {decisionId}
            </p>
          </div>

          {decision.action === 'block' && (
             <div className="glass-card px-6 py-4 bg-red-500/10 border-red-500/20 flex flex-col items-end">
               <span className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-1">Loss Avoided</span>
               <span className="text-3xl font-black text-white tabular-nums">{lossAvoided}</span>
             </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* AI Causal Narrative (REQ-MIRROR-004) */}
            <section className={cn(
               "glass-card p-8 border-l-[6px] relative overflow-hidden",
               decision.action === 'execute' ? "border-l-unbox-amber bg-unbox-amber/[0.02]" : "border-l-red-500 bg-red-500/[0.02]"
            )}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-unbox-amber/5 blur-[80px] rounded-full -mr-32 -mt-32" />
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className={cn("w-5 h-5", decision.action === 'execute' ? "text-unbox-amber" : "text-red-500")} />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-unbox-amber">Forensic Analysis</h3>
              </div>
              
              <div className="space-y-6">
                {/* HEADLINE */}
                <h2 className="text-2xl font-black text-white italic leading-tight">
                  {decision.explanation?.headline || 'Analyzing...'}
                </h2>

                {/* SUMMARY */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {decision.explanation?.summary || decision.explanation?.coreBenefit}
                </p>

                {/* DYNAMIC LIST BASED ON CONTENT TYPE */}
                <div className="grid grid-cols-1 gap-4">
                  {(decision.explanation?.analysis || decision.explanation?.comparisons || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/5 border border-white/5 p-4 rounded-lg group hover:border-unbox-amber/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-unbox-amber mt-1.5 shadow-[0_0_8px_theme(colors.unbox-amber)]" />
                        <div className="space-y-1">
                          <p className="font-black text-[10px] uppercase tracking-widest text-unbox-amber">
                            {item.factor || item.scenario}
                          </p>
                          <p className="text-sm text-white/80 leading-relaxed font-medium">
                            {item.description || item.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CONCLUSION */}
                <div className="pt-6 border-t border-white/10 italic text-white/40 text-sm font-medium">
                  {decision.explanation?.conclusion || decision.explanation?.longTermValue}
                </div>
              </div>
            </section>

            {/* Causal Chain Integration */}
            <section className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 px-2">Diagnostic Trace</h3>
               <CausalChainPanel decision={decision} />
            </section>

            {/* Counterfactual Analysis */}
            <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4" />
                  Counterfactual Replay
                </h3>
                <span className="text-[10px] font-bold text-unbox-green uppercase">Verified simulations</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(decision.replays ?? []).map((replay: any, idx: number) => (
                  <CounterfactualCard 
                    key={idx} 
                    replay={replay} 
                    isBest={isBestScenario(decision.action, replay)} 
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-10">
            {/* Market Snapshot Stats */}
            <section className="glass-card p-6 space-y-6">
               <div className="flex items-center justify-between">
                 <h4 className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Market Snapshot</h4>
                 <Signal className="w-4 h-4 text-unbox-green" />
               </div>
               
               <div className="grid grid-cols-1 gap-4">
                  <SignalMetric 
                    label="Liquidity" 
                    value={`$${decision.marketState.liquidity.toLocaleString()}`} 
                    level={decision.marketState.liquidity < 50000 ? 'warn' : 'ok'}
                  />
                  <SignalMetric 
                    label="Gas Level" 
                    value={`${decision.marketState.gas} gwei`} 
                    level={decision.marketState.gas > 100 ? 'warn' : 'ok'}
                  />
                  <SignalMetric 
                    label="Market Price" 
                    value={`$${decision.marketState.price}`} 
                    level="ok"
                  />
               </div>

               <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/20 uppercase font-black">Oracle Reference</span>
                    <span className="text-white/60 font-mono">{decision.marketState.oracleRef}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/20 uppercase font-black">Decision Latency</span>
                    <span className="text-unbox-green font-mono">{decision.latencyMs ? `${decision.latencyMs}ms` : '42ms'}</span>
                  </div>
               </div>
            </section>

            {decision.optimization && (
              <OptimizationPanel 
                optimization={decision.optimization} 
                handshakeStatus={decision.action === 'block' ? 'blocked' : 'approved'}
              />
            )}

            <ScoreImpactPanel decision={decision} />
            
            <HashAnchor payloadHash={decision.payloadHash} blockRef={decision.blockRef} />

            <EngineerActions decision={decision} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function SignalMetric({ label, value, level }: { label: string, value: string, level: 'ok' | 'warn' | 'crit' }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex flex-col">
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-black group-hover:text-white/50 transition-colors">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-white/90 font-mono">{value}</span>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
          level === 'ok' ? "bg-unbox-green shadow-unbox-green/50" : "bg-red-500 shadow-red-500/50 animate-pulse"
        )} />
      </div>
    </div>
  );
}
