import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ShieldCheck, AlertCircle, Clock, Navigation, RefreshCcw, Info } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createFileRoute('/decisions/$decisionId')({
  component: DecisionDetailPage,
})

function DecisionDetailPage() {
  const { decisionId } = Route.useParams();

  // Mock data for detail view (linking Sprint 1, 2, 3 data)
  const decision = {
    decisionId,
    agentId: "alpha-trader",
    action: "block",
    intentText: "High-slippage buy of MOMO token",
    explanation: "Trade blocked: Potential honeypot detected (token cannot be sold) and liquidity depth ($500) is too low for the intended size.",
    marketState: { price: 0.12, liquidity: 500, gas: 22, oracleRef: "dex-screener" },
    securityScan: { score: 15, flags: ["Low Liquidity", "Honeypot Risk"] },
    blockRef: 1200457,
    timestampMs: Date.now() - 60000,
    replays: [
      { scenario: 'wait_30s', usdDelta: 12.5, summary: 'Waiting 30 seconds would have yielded a slightly better entry price (+0.5%).' },
      { scenario: 'alt_route', slippageDeltaPct: -0.02, gasDelta: 5, summary: 'Route via SushiSwap would have decreased slippage by 2% at the cost of higher gas.' },
      { scenario: 'invert_action', usdDelta: -150.0, summary: 'Inverting this action would have resulted in a significant missed opportunity cost.' }
    ]
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Stream
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
            decision.action === 'execute' ? "bg-unbox-green/10 text-unbox-green border border-unbox-green/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
          )}>
            {decision.action}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{decision.intentText}</h1>
        </div>
        <p className="text-white/40 font-mono text-sm">ID: {decisionId}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Explanation Section (REQ-MIRROR-004) */}
          <section className="glass-card p-6 border-l-4 border-l-red-500 bg-red-500/5">
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Mirror Explanation
            </h3>
            <p className="text-lg text-white/90 leading-relaxed font-medium italic">
              "{decision.explanation}"
            </p>
          </section>

          {/* Counterfactual Replays (REQ-CF-002) */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              Counterfactual Scenarios
            </h3>
            <div className="grid gap-4">
              {decision.replays.map((replay, idx) => (
                <div key={idx} className="glass-card p-4 hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-unbox-green uppercase">{replay.scenario.replace('_', ' ')}</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">{replay.summary}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="glass-card p-6 space-y-6">
             <div>
                <h4 className="text-[10px] text-white/30 uppercase tracking-widest mb-4">Security Scan</h4>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-black text-white">{decision.securityScan.score}</span>
                  <span className="text-white/30 text-sm mb-1">/100</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {decision.securityScan.flags.map(flag => (
                    <span key={flag} className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded border border-red-500/20">
                      {flag}
                    </span>
                  ))}
                </div>
             </div>

             <div className="space-y-3 pt-6 border-t border-white/5">
                <DetailRow label="Liquidity" value={`$${decision.marketState.liquidity}`} />
                <DetailRow label="Price" value={`$${decision.marketState.price}`} />
                <DetailRow label="Gas Price" value={`${decision.marketState.gas} gwei`} />
                <DetailRow label="Oracle" value={decision.marketState.oracleRef} />
             </div>
          </section>

          <div className="glass-card p-6 border-unbox-green/10 bg-unbox-green/5 flex items-start gap-3">
             <ShieldCheck className="w-5 h-5 text-unbox-green shrink-0 mt-1" />
             <div>
               <p className="text-xs font-bold text-white mb-1">On-chain Anchored</p>
               <p className="text-[10px] text-white/40 leading-relaxed">
                 This decision hash is anchored on X Layer Testnet at block #{decision.blockRef}.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-white/30">{label}</span>
      <span className="text-white/80 font-mono font-medium">{value}</span>
    </div>
  );
}
