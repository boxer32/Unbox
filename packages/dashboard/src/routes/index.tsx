import { createFileRoute, Link } from '@tanstack/react-router'
import { Shield, Zap, Search, ArrowRight, Activity, Terminal, Lock, Cpu, BarChart3 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';
  const statsQuery = useQuery({
    queryKey: ['landing-stats'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/stats`);
      const json = await response.json();
      return (json.stats ?? {}) as {
        totalDecisions: number;
        blockedDecisions: number;
        blockRatePercent: number;
      };
    },
    refetchInterval: 5000,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = containerRef.current.getElementsByClassName('premium-border');
      for (const card of cards as any) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white selection:bg-unbox-green/30 relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-20" />
      <div className="scan-line" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-4 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-unbox-green blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-9 h-9 bg-unbox-green rounded-lg flex items-center justify-center font-black text-black relative z-10 transition-transform group-hover:-rotate-3">U</div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-widest uppercase">Unbox</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-unbox-green font-bold">On-chain Intelligence</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest">
            <a href="#mirror" className="text-white/40 hover:text-unbox-green transition-colors">Mirror</a>
            <a href="#score" className="text-white/40 hover:text-unbox-green transition-colors">Score</a>
            <a href="#feed" className="text-white/40 hover:text-unbox-green transition-colors">Feed</a>
            <Link to="/mirror" className="px-6 py-2.5 bg-white text-black hover:bg-unbox-green transition-all rounded-sm flex items-center gap-2">
              Console <Terminal className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-16 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-unbox-green/5 border border-unbox-green/20 text-[10px] font-bold uppercase tracking-[0.2em] text-unbox-green">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-unbox-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-unbox-green"></span>
              </span>
              Accountability Layer for X Layer
            </div>
            
            <h1 className="text-7xl md:text-[100px] font-black tracking-tighter leading-[0.85] text-white">
              Open every<br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-unbox-green via-emerald-400 to-unbox-green bg-[length:200%_auto] animate-gradient glow-text">black box.</span>
            </h1>

            <p className="text-xl text-white/40 max-w-xl leading-relaxed font-medium">
              Unbox logs, explains, and stress-tests every decision your on-chain agent makes — before it costs you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link to="/mirror" className="w-full sm:w-auto px-10 py-5 bg-unbox-green text-black font-black uppercase text-xs tracking-widest rounded-sm hover:-translate-y-1 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]">
                Launch Console
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-transparent text-white border border-white/10 font-black uppercase text-xs tracking-widest rounded-sm hover:bg-white/5 transition-all">
                Security Docs
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-20 bg-unbox-green/10 blur-[100px] rounded-full animate-breathe" />
            <div className="relative flex items-center justify-center animate-float">
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-unbox-green/5 blur-3xl -z-10 rounded-[100%]" />
               <div className="relative glass-card aspect-square max-w-[500px] w-full mx-auto overflow-hidden group">
                  <img src="/assets/hero_3d.png" alt="Unbox" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-40" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="p-3 glass-card border-white/5 bg-white/5 backdrop-blur-xl">
                        <Cpu className="w-5 h-5 text-unbox-green" />
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30">Registry Status</p>
                        <p className="text-[10px] font-mono text-unbox-green">ACTIVE_SYNC</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Reputation HUD integration */}
      <section className="px-8 max-w-7xl mx-auto mb-24 anim-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-unbox-green">Protocol Reputation</h3>
              <p className="text-3xl font-bold tracking-tight">The weighted soul of Unbox Agents.</p>
              <p className="text-sm text-white/40 leading-relaxed font-medium">
                Our reputation engine aggregates on-chain decision traits to assign trust. These scores determine liquidity limits and gatekeeper privileges.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <ReputationGauge label="Quality" value="98" color="emerald" />
               <ReputationGauge label="Security" value="100" color="unbox-green" />
               <ReputationGauge label="Efficiency" value="94" color="amber" />
               <ReputationGauge label="Trust" value="99" color="emerald" />
            </div>
          </div>
        </div>
      </section>

      {/* Forensic Stats */}
      <section className="px-8 py-24 bg-white/[0.01] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <ForensicStat label="Total Decisions Mirrorred" value={`${statsQuery.data?.totalDecisions ?? 0}`} delta="Live" />
          <ForensicStat label="Risk Blocks Generated" value={`${statsQuery.data?.blockedDecisions ?? 0}`} delta="Live" />
          <ForensicStat label="Current Block Rate" value={`${statsQuery.data?.blockRatePercent ?? 0}%`} delta="Live" />
          <ForensicStat label="Data Source" value="API" delta={statsQuery.isError ? "Error" : "Healthy"} />
        </div>
      </section>

      {/* Premium Features */}
      <section className="px-8 py-32 max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-unbox-green">Architecture</h2>
          <p className="text-4xl font-bold tracking-tight">Three layers of verification.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            id="mirror"
            icon={Search} 
            title="Unbox Mirror" 
            label="Forensic Replay"
            desc="Real-time decision interception and plain-language explanation. Know the 'why' behind every block."
          />
          <FeatureCard 
            id="score"
            icon={Shield} 
            title="Unbox Score" 
            label="Soulbound Trust"
            desc="Verifiable on-chain reputation. Non-transferable scores built on historical agent performance."
          />
          <FeatureCard 
            id="feed"
            icon={BarChart3} 
            title="Unbox Feed" 
            label="Data Monetization"
            desc="The x402 data gate. Trade agent intelligence streams in a trustless, payment-guaranteed environment."
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-8 py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-unbox-green/5 blur-[120px] rounded-full" />
        <div className="max-w-3xl mx-auto text-center space-y-12 relative">
          <div className="space-y-6">
            <h3 className="text-5xl font-black tracking-tighter italic">"Agents should be accountable."</h3>
            <p className="text-xl text-white/40 italic">— Unbox Manifesto</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-24 border-t border-white/5 bg-black/50 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-unbox-green rounded-lg flex items-center justify-center font-black text-black">U</div>
              <span className="text-xl font-bold tracking-tighter uppercase uppercase">Unbox</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed font-medium uppercase tracking-widest">
              The accountability layer for on-chain agents. Built for the agentic economy on X Layer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-32">
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Protocol</h4>
               <ul className="text-xs text-white/40 space-y-4 font-bold uppercase tracking-widest">
                 <li><Link to="/mirror" className="hover:text-unbox-green transition-colors">Mirror Console</Link></li>
                 <li><span className="text-white/10 cursor-not-allowed">Score Minting</span></li>
                 <li><span className="text-white/10 cursor-not-allowed">Feed API</span></li>
               </ul>
            </div>
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Resources</h4>
               <ul className="text-xs text-white/40 space-y-4 font-bold uppercase tracking-widest">
                 <li className="hover:text-unbox-green cursor-pointer">Whitepaper</li>
                 <li className="hover:text-unbox-green cursor-pointer">Github</li>
                 <li className="hover:text-unbox-green cursor-pointer">X Layer Explorer</li>
               </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[8px] uppercase tracking-[0.4em] text-white/10 font-black">
             © 2026 UNBOX PROTOCOL. POWERED BY ONCHAIN OS.
           </div>
           <div className="flex items-center gap-8 text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">
             <span>Terms of Intel</span>
             <span>Privacy Hash</span>
           </div>
        </div>
      </footer>
    </div>
  )
}

function ForensicStat({ label, value, delta }: { label: string, value: string, delta: string }) {
  return (
    <div className="space-y-3 group cursor-default">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold group-hover:text-unbox-green transition-colors">{label}</p>
      <div className="flex items-baseline gap-4">
        <p className="text-5xl font-black tracking-tight tabular-nums">{value}</p>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-sm",
          delta === "Critical" ? "bg-red-500/20 text-red-400" : "bg-unbox-green/10 text-unbox-green"
        )}>{delta}</span>
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc, label, id }: { icon: any, title: string, desc: string, label: string, id: string }) {
  return (
    <div id={id} className="premium-border">
      <div className="glass-card p-10 flex flex-col gap-8 h-full relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-unbox-green/20 to-transparent" />
        <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-unbox-green group-hover:bg-unbox-green/10 transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-unbox-green">{label}</span>
            <h3 className="text-2xl font-black tracking-tighter uppercase">{title}</h3>
          </div>
          <p className="text-white/40 text-sm leading-relaxed font-medium">{desc}</p>
        </div>
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-unbox-green transition-colors cursor-pointer">
            Explore Documentation <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ReputationGauge({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="glass-card p-6 border-white/5 bg-white/[0.02] flex flex-col gap-4 group hover:border-unbox-green/30 transition-all hover:bg-white/[0.04]">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-unbox-green transition-colors">{label}</span>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          color === 'unbox-green' ? "bg-unbox-green shadow-[0_0_8px_theme(colors.unbox-green)]" : 
          color === 'amber' ? "bg-amber-500 shadow-[0_0_8px_theme(colors.amber.500)]" : 
          "bg-emerald-500 shadow-[0_0_8px_theme(colors.emerald.500)]"
        )} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">{value}</span>
        <span className="text-[10px] font-bold text-white/20 uppercase">Units</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-[1500ms] shadow-[0_0_10px_currentcolor]",
            color === 'unbox-green' ? "bg-unbox-green" : 
            color === 'amber' ? "bg-amber-500" : 
            "bg-emerald-500"
          )}
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  )
}
