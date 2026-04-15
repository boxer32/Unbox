import { createFileRoute, Link } from '@tanstack/react-router'
import { Shield, Target, Activity, Award, BarChart3, History, Fingerprint, Lock, Zap } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout.js';
import { useQuery } from '@tanstack/react-query';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createFileRoute('/score')({
  component: ScorePage,
})

function ScorePage() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';
  
  const reputationQuery = useQuery({
    queryKey: ['global-reputation'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/reputation/global`);
      const json = await response.json();
      return json.score as { q: number, s: number, e: number, t: number };
    },
    refetchInterval: 10000,
  });

  const statsQuery = useQuery({
    queryKey: ['landing-stats'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/stats`);
      return response.json();
    }
  });

  const rep = reputationQuery.data || { q: 90, s: 90, e: 90, t: 90 };

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Header - REQ-REP-001 Identity */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-unbox-green rounded-2xl flex items-center justify-center font-black text-black text-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  U
                </div>
                <div>
                   <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Soulbound Identity</h1>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-unbox-green">Token ID #1</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">X Layer Testnet (REQ-REP-001)</span>
                   </div>
                </div>
             </div>
          </div>
          <div className="glass-card px-8 py-5 flex flex-col items-end border-white/5">
             <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-1">Weighted Health Score</span>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{( (rep.q + rep.s + rep.e + rep.t) / 4 ).toFixed(1)}</span>
                <span className="text-xs font-bold text-unbox-green">Excellent</span>
             </div>
          </div>
        </header>

        {/* Reputation HUD - REQ-REP-002 Weighted Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <RepCard label="Decision Quality" value={rep.q} weight="35%" desc="Correctness of agent intent vs outcome." color="emerald" />
           <RepCard label="Security Discipline" value={rep.s} weight="30%" desc="Resistance to honeypots and risk flags." color="unbox-green" />
           <RepCard label="Execution Efficiency" value={rep.e} weight="20%" desc="Gas and slippage savings vs direct path." color="amber" />
           <RepCard label="Transparency" value={rep.t} weight="15%" desc="Consistency of forensic log anchoring." color="blue" />
        </div>

        {/* REQ-REP-004: Audit Trail Implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-3">
                    <History className="w-4 h-4 text-unbox-green" />
                    Reputation Audit Trail
                 </h3>
                 <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">REQ-REP-004</span>
              </div>

              <div className="glass-card overflow-hidden border-white/5">
                 <table className="w-full text-left">
                    <thead className="bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-white/20 border-b border-white/5">
                       <tr>
                          <th className="px-6 py-4">Event</th>
                          <th className="px-6 py-4">Impact</th>
                          <th className="px-6 py-4">Block Ref</th>
                          <th className="px-6 py-4">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       <AuditRow event="Bayesian Path Optimized" delta="+0.1 EFF" block="#122,812" status="Captured" />
                       <AuditRow event="Honeypot Attack Blocked" delta="+1.2 SEC" block="#121,904" status="Verified" />
                       <AuditRow event="Protocol Health Check" delta="+0.1 TRP" block="#120,442" status="Audited" />
                       <AuditRow event="Daily Reputation Snapshot" delta="-- SYM" block="#119,002" status="On-chain" />
                    </tbody>
                 </table>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="glass-card p-8 space-y-6 bg-gradient-to-br from-unbox-green/10 to-transparent border-unbox-green/20">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-unbox-green flex items-center gap-2">
                    <Fingerprint className="w-4 h-4" />
                    Soulbound Rules
                 </h4>
                 <div className="space-y-4">
                    <RuleItem label="Non-Transferable" icon={Lock} />
                    <RuleItem label="Decision Anchored" icon={Zap} />
                    <RuleItem label="Oracle Verified" icon={Shield} />
                 </div>
                 <p className="text-[9px] text-white/30 italic leading-relaxed pt-4 border-t border-white/5">
                    Your Unbox Score is more than a number. It is an immutable fingerprint of your agent's behavior on X Layer.
                 </p>
              </div>

              <div className="glass-card p-8 space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/20 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    System Context
                 </h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="text-white/40 uppercase font-black">Contract Address</span>
                       <span className="text-white/80 font-mono">0xffa7...0429</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="text-white/40 uppercase font-black">Minter Role</span>
                       <span className="text-unbox-green font-mono italic">UNBOX_CORE</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </DashboardLayout>
  )
}

function RepCard({ label, value, weight, desc, color }: { label: string, value: number, weight: string, desc: string, color: string }) {
  return (
    <div className="glass-card p-6 border-white/5 bg-white/[0.02] flex flex-col gap-4 group hover:border-unbox-green/30 transition-all hover:bg-white/[0.04]">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-unbox-green transition-colors">{label}</span>
           <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Weight: {weight}</p>
        </div>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
          color === 'unbox-green' ? "bg-unbox-green shadow-unbox-green/50" : 
          color === 'amber' ? "bg-amber-500 shadow-amber-500/50" : 
          color === 'emerald' ? "bg-emerald-500 shadow-emerald-500/50" :
          "bg-blue-500 shadow-blue-500/50"
        )} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">{value}</span>
        <span className="text-[10px] font-bold text-white/20 uppercase">Units</span>
      </div>
      <p className="text-[10px] text-white/30 leading-relaxed font-medium italic">{desc}</p>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-2">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-[1500ms] shadow-[0_0_10px_currentcolor]",
            color === 'unbox-green' ? "bg-unbox-green" : 
            color === 'amber' ? "bg-amber-500" : 
            color === 'emerald' ? "bg-emerald-500" :
            "bg-blue-500"
          )}
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  )
}

function AuditRow({ event, delta, block, status }: { event: string, delta: string, block: string, status: string }) {
  return (
    <tr className="hover:bg-white/[0.01] transition-colors group cursor-default">
       <td className="px-6 py-5">
          <p className="text-xs font-black text-white group-hover:text-unbox-green transition-colors">{event}</p>
       </td>
       <td className="px-6 py-5 font-mono text-xs font-bold text-unbox-green">{delta}</td>
       <td className="px-6 py-5 font-mono text-[10px] text-white/30">{block}</td>
       <td className="px-6 py-5">
          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 rounded border border-white/5 text-white/40">{status}</span>
       </td>
    </tr>
  )
}

function RuleItem({ label, icon: Icon }: { label: string, icon: any }) {
  return (
    <div className="flex items-center gap-3 group">
       <div className="w-8 h-8 bg-black/40 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-unbox-green/30 transition-colors">
          <Icon className="w-4 h-4 text-unbox-green" />
       </div>
       <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{label}</span>
    </div>
  )
}
