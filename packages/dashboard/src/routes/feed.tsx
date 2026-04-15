import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout.js';
import { 
  Lock, Zap, ShieldCheck, AlertCircle, ArrowRight, 
  CreditCard, Loader2, Database, Clock, 
  CheckCircle2, Circle, ArrowDownCircle, ShoppingCart, Info, TrendingUp, BarChart
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useMutation, useQuery } from '@tanstack/react-query';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Route = createFileRoute('/feed')({
  component: FeedPage,
})

type FeedState = 'onboarding' | 'challenge' | 'verified' | 'delivered';

interface DataBatch {
  id: string;
  title: string;
  description: string;
  price: string;
  items: number;
  confidence: number;
  type: 'security' | 'alpha' | 'governance';
  tag: string;
}

const AVAILABLE_BATCHS: DataBatch[] = [
  {
    id: 'batch-sec-01',
    title: 'X Layer Threat Intel (Last 100 Blocks)',
    description: 'Aggregated security flags from Mirror Engine targeting high-risk dex pairs.',
    price: '0.0001',
    items: 42,
    confidence: 99.4,
    type: 'security',
    tag: 'REQ-FEED-BATCH'
  },
  {
    id: 'batch-alpha-04',
    title: 'Deep Liquidity Shifts (Arbitrage Path)',
    description: 'Decision traces from Bayesian Optimizer detecting hidden arbitrage routes.',
    price: '0.0005',
    items: 12,
    confidence: 88.2,
    type: 'alpha',
    tag: 'ALPHA-ALPHA'
  },
  {
    id: 'batch-gov-12',
    title: 'Agent Governance Sentiment Feed',
    description: 'Voting intention logs and counterfactual impacts for current proposals.',
    price: '0.0002',
    items: 85,
    confidence: 94.0,
    type: 'governance',
    tag: 'GOV-LOGS'
  }
];

function FeedPage() {
  const [step, setStep] = useState<FeedState>('onboarding');
  const [selectedBatch, setSelectedBatch] = useState<DataBatch | null>(null);
  const [txHash, setTxHash] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deliveredData, setDeliveredData] = useState<any>(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000';

  const redeemMutation = useMutation({
    mutationFn: async (proof: string) => {
      const response = await fetch(`${baseUrl}/api/feed/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proof }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Payment verification failed.');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setDeliveredData(data.deliveredData);
      setStep('delivered' as any);
      setIsProcessing(false);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setIsProcessing(false);
      setStep('challenge');
    }
  });

  const startChallenge = (batch: DataBatch) => {
    setSelectedBatch(batch);
    setStep('challenge');
  };

  const handleRedeem = () => {
    if (!txHash.startsWith('0x')) {
      setErrorMessage('Valid TxHash (0x...) required');
      return;
    }
    setIsProcessing(true);
    setErrorMessage(null);
    setStep('verified');
    redeemMutation.mutate(txHash);
  };

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Header - REQ-FEED-001 Consistency */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-unbox-amber/20 rounded-xl flex items-center justify-center border border-unbox-amber/30">
                  <Database className="w-6 h-6 text-unbox-amber" />
               </div>
               <div>
                  <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Intelligence Feed</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-unbox-amber">Monetizable Intelligence Streams (REQ-FEED-001)</p>
               </div>
            </div>
            <p className="text-sm text-white/40 max-w-xl font-medium leading-relaxed">
              Access high-confidence decision batches from X Layer agents gated via atomic 402 settlement. 
              Built for agents, by agents.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Protocol Revenue Split</p>
                <p className="text-xs font-black text-unbox-green">80% AGENT / 20% PROTOCOL</p>
             </div>
          </div>
        </header>

        {step === 'onboarding' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {AVAILABLE_BATCHS.map((batch) => (
              <BatchCard key={batch.id} batch={batch} onSelect={() => startChallenge(batch)} />
            ))}
          </div>
        )}

        {(step === 'challenge' || step === 'verified') && selectedBatch && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
            {/* Timeline Progress */}
             <div className="flex items-center justify-between relative px-2 mb-12">
                <div className="absolute top-4 left-0 w-full h-[1px] bg-white/5 -z-10" />
                <TimelineStep status="done" label="Selected" />
                <TimelineStep status="active" label="402 Spec" />
                <TimelineStep status={step === 'verified' ? 'active' : 'pending'} label="Verification" />
                <TimelineStep status="pending" label="Delivery" />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12">
                  <div className="glass-card p-10 bg-unbox-amber/5 border-unbox-amber/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Lock className="w-32 h-32 text-unbox-amber" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-12">
                       <div className="flex-1 space-y-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-unbox-amber">
                                <Zap className="w-3 h-3" />
                                Payment Challenge Issued (402)
                             </div>
                             <h2 className="text-4xl font-black tracking-tighter italic">{selectedBatch.title}</h2>
                             <p className="text-white/50 text-sm leading-relaxed">{selectedBatch.description}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-black/40 rounded-xl border border-white/5">
                             <SpecItem label="Price" value={`${selectedBatch.price} OKB`} highlight />
                             <SpecItem label="Asset" value="X-LAYER NAT" />
                             <SpecItem label="Items" value={`${selectedBatch.items} Entries`} />
                             <SpecItem label="Confidence" value={`${selectedBatch.confidence}%`} />
                          </div>

                          <div className="flex flex-col md:flex-row gap-6 items-end">
                             <div className="flex-1 space-y-3 w-full">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Proof of Payment (TxHash)</p>
                                <input 
                                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-xs font-mono focus:border-unbox-amber outline-none transition-all"
                                  placeholder="0x..."
                                  value={txHash}
                                  onChange={(e) => setTxHash(e.target.value)}
                                />
                             </div>
                             <button 
                                onClick={handleRedeem}
                                disabled={isProcessing || !txHash}
                                className="w-full md:w-auto px-10 py-4 bg-unbox-amber text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-105 transition-all disabled:opacity-30 shadow-[0_15px_30px_-10px_rgba(245,158,11,0.3)]"
                             >
                                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Settle x402'}
                             </button>
                          </div>
                          {errorMessage && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-bounce">{errorMessage}</p>}
                       </div>

                       <div className="w-full md:w-72 space-y-6">
                         <div className="glass-card p-6 bg-white/[0.02] border-white/5 space-y-6">
                            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Revenue Split Map</h4>
                            <SplitProgress label="Source Agent" percent={80} amount={`${(Number(selectedBatch.price) * 0.8).toFixed(5)} OKB`} />
                            <SplitProgress label="Unbox Protocol" percent={20} amount={`${(Number(selectedBatch.price) * 0.2).toFixed(5)} OKB`} />
                            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[8px] text-white/20 font-bold tracking-widest leading-relaxed">
                               <Info className="w-3 h-3 shrink-0" />
                               SETTLEMENT IS ATOMIC ON X LAYER TESTNET (REQ-FEED-003)
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        {step === ('delivered' as any) && deliveredData && (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             <div className="flex items-center justify-between relative px-2 mb-12">
                <div className="absolute top-4 left-0 w-full h-[1px] bg-white/5 -z-10" />
                <TimelineStep status="done" label="Selected" />
                <TimelineStep status="done" label="Challenge" />
                <TimelineStep status="done" label="Verified" />
                <TimelineStep status="active" label="Intelligence" />
             </div>

             <div className="glass-card p-12 bg-unbox-green/[0.03] border-unbox-green/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 p-8">
                   <CheckCircle2 className="w-20 h-20 text-unbox-green opacity-20 group-hover:scale-110 transition-transform" />
                </div>

                <div className="space-y-10 relative z-10">
                   <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-unbox-green/10 border border-unbox-green/20 rounded-full text-[9px] font-black uppercase tracking-widest text-unbox-green">
                         Batch Ref: {deliveredData.batchId}
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter text-white italic">{deliveredData.insightTitle}</h2>
                   </div>

                   <p className="text-xl text-white/70 leading-relaxed font-medium max-w-3xl">
                      {deliveredData.insightBody}
                   </p>

                   <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <DataPoint icon={TrendingUp} label="Confidence" value={deliveredData.confidence} />
                      <DataPoint icon={Clock} label="Mirror Latency" value={deliveredData.latency} />
                      <DataPoint icon={BarChart} label="Sample Size" value={`${deliveredData.itemsCount} Decisions`} />
                      <DataPoint icon={Info} label="System Block" value={deliveredData.block} />
                   </div>

                   <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                      <div className="flex gap-4">
                         <button className="px-6 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded transition-all hover:bg-unbox-green">Export raw JSON</button>
                         <button className="px-6 py-3 bg-transparent border border-white/10 text-white/40 font-black uppercase text-[10px] tracking-widest rounded hover:bg-white/5">View On Explorer</button>
                      </div>
                      <button onClick={() => setStep('onboarding')} className="text-unbox-amber text-[10px] font-black uppercase tracking-widest hover:underline px-4 py-2">Return to Marketplace</button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  )
}

function BatchCard({ batch, onSelect }: { batch: DataBatch; onSelect: () => void }) {
  return (
    <div className="premium-border group h-full">
      <div className="glass-card p-8 bg-white/[0.02] border-white/5 h-full flex flex-col gap-6 relative overflow-hidden">
        <div className={cn(
          "absolute top-0 right-0 p-6 opacity-5 transition-transform group-hover:scale-110",
          batch.type === 'security' ? 'text-red-500' : batch.type === 'alpha' ? 'text-unbox-amber' : 'text-unbox-green'
        )}>
           <Database className="w-20 h-20" />
        </div>
        
        <div className="flex justify-between items-start relative z-10">
           <div className={cn(
              "px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest border",
              batch.type === 'security' ? 'border-red-500/20 text-red-500 bg-red-500/5' :
              batch.type === 'alpha' ? 'border-unbox-amber/20 text-unbox-amber bg-unbox-amber/5' :
              'border-unbox-green/20 text-unbox-green bg-unbox-green/5'
           )}>
              {batch.type} feed
           </div>
           <span className="text-white/20 text-[9px] font-mono tracking-widest uppercase">{batch.tag}</span>
        </div>

        <div className="space-y-3 relative z-10">
           <h3 className="text-xl font-black tracking-tight leading-tight uppercase group-hover:text-unbox-amber transition-colors">{batch.title}</h3>
           <p className="text-white/40 text-sm font-medium leading-relaxed">{batch.description}</p>
        </div>

        <div className="mt-auto space-y-6 relative z-10">
           <div className="flex justify-between items-center py-4 border-y border-white/5">
              <div className="space-y-1">
                 <p className="text-[8px] font-black uppercase text-white/20 tracking-widest">Entry Price</p>
                 <p className="text-lg font-black text-white tabular-nums">{batch.price} <span className="text-[10px] text-white/20">OKB</span></p>
              </div>
              <div className="text-right space-y-1">
                 <p className="text-[8px] font-black uppercase text-white/20 tracking-widest">Confidence Score</p>
                 <p className="text-lg font-black text-unbox-green tabular-nums">{batch.confidence}%</p>
              </div>
           </div>
           <button 
             onClick={onSelect}
             className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-sm hover:bg-unbox-amber hover:text-black transition-all group-hover:translate-y-[-2px]"
           >
              Unlock Intelligence
           </button>
        </div>
      </div>
    </div>
  )
}

function SpecItem({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="space-y-1 border-l border-white/5 pl-4">
       <p className="text-[8px] text-white/30 uppercase font-black tracking-[0.2em]">{label}</p>
       <p className={cn("text-sm font-black tracking-tight", highlight ? "text-unbox-amber" : "text-white")}>{value}</p>
    </div>
  )
}

function SplitProgress({ label, percent, amount }: { label: string, percent: number, amount: string }) {
  return (
    <div className="space-y-3">
       <div className="flex justify-between items-end">
          <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">{label}</span>
          <span className="text-xs font-black text-white">{percent}%</span>
       </div>
       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-unbox-amber rounded-full" style={{ width: `${percent}%` }} />
       </div>
       <div className="bg-black/40 p-2 rounded-lg border border-white/5">
          <span className="text-[9px] font-mono text-unbox-amber">{amount}</span>
       </div>
    </div>
  )
}

function DataPoint({ icon: Icon, label, value }: { icon: any, label: string; value: string }) {
  return (
    <div className="space-y-3 group cursor-default">
       <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-unbox-green group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{label}</span>
       </div>
       <div className="text-xl font-black text-white font-mono">{value}</div>
    </div>
  )
}

function TimelineStep({ status, label }: { status: 'done' | 'active' | 'pending'; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 relative">
       <div className={cn(
         "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-2",
         status === 'done' ? "bg-unbox-green border-unbox-green text-black" :
         status === 'active' ? "bg-black border-unbox-green text-unbox-green shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" :
         "bg-black border-white/10 text-white/20"
       )}>
         {status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : status === 'active' ? <Clock className="w-4 h-4" /> : <Circle className="w-4 h-4 fill-current opacity-10" />}
       </div>
       <span className={cn(
         "text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
         status === 'pending' ? "text-white/10" : "text-white/60"
       )}>{label}</span>
    </div>
  )
}
