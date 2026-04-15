import { createFileRoute, redirect } from '@tanstack/react-router'
import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout.js';
import { 
  Lock, Zap, ShieldCheck, AlertCircle, ArrowRight, 
  CreditCard, Loader2, Database, Clock, 
  CheckCircle2, Circle, ArrowDownCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { useMutation } from '@tanstack/react-query';

export const Route = createFileRoute('/feed')({
  component: FeedPage,
})

type FeedState = 'requested' | 'challenge' | 'paid' | 'verified' | 'delivered';

function FeedPage() {
  const [step, setStep] = useState<FeedState>('challenge');
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
        throw new Error(err.error || 'Verification failed. Ensure the transaction is confirmed on X Layer Testnet.');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setDeliveredData(data);
      setStep('delivered');
      setIsProcessing(false);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setIsProcessing(false);
    }
  });

  const handleRedeem = () => {
    if (!txHash.startsWith('0x') || txHash.length !== 66) {
      setErrorMessage('Please enter a valid Transaction Hash (0x...)');
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
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-8">
           <div>
              <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <Database className="w-8 h-8 text-unbox-green" />
                Unbox Feed Console
              </h1>
              <p className="text-white/40 mt-2 font-medium">REQ-FEED-001: x402 machine-to-machine payment gateway.</p>
           </div>
           <div className="flex gap-4">
              <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase font-bold text-white/40 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-unbox-green animate-pulse" />
                Live Channel #104
              </span>
           </div>
        </div>

        {/* UX-4.4.1: Request State Timeline */}
        <div className="max-w-4xl mx-auto">
           <div className="flex items-center justify-between relative px-4">
             {/* Connector Line */}
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
             
             <TimelineStep status={step === 'requested' ? 'active' : 'done'} label="Requested" />
             <TimelineStep status={step === 'challenge' ? 'active' : step === 'requested' ? 'pending' : 'done'} label="402 Challenge" />
             <TimelineStep status={step === 'paid' ? 'active' : (step === 'delivered' || step === 'verified') ? 'done' : 'pending'} label="Paid" />
             <TimelineStep status={step === 'verified' ? 'active' : step === 'delivered' ? 'done' : 'pending'} label="Verified" />
             <TimelineStep status={step === 'delivered' ? 'active' : 'pending'} label="Delivered" />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
           {/* Main Feed Content Area */}
           <div className="lg:col-span-2 space-y-6">
              {step !== 'delivered' ? (
                /* UX-4.4.2: Payment Spec Panel (Locked State) */
                <div className="glass-card p-12 text-center space-y-8 bg-unbox-amber/5 border-unbox-amber/10">
                   <div className="w-16 h-16 bg-unbox-amber/10 rounded-2xl border border-unbox-amber/20 flex items-center justify-center mx-auto">
                      <Lock className="w-8 h-8 text-unbox-amber" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-2xl font-bold uppercase tracking-tighter">Locked Intelligence</h3>
                      <p className="text-sm text-white/30 max-w-sm mx-auto leading-relaxed">
                        Machine payload contains deterministic risk signals for Alpha-Trader. Access requires atomic settlement.
                      </p>
                   </div>
                   
                   <div className="max-w-sm mx-auto p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                       <div className="grid grid-cols-2 gap-4 text-left border-b border-white/5 pb-4 mb-4">
                          <SpecItem label="Asset" value="X-LAYER ETH" />
                          <SpecItem label="Network" value="X Layer Testnet" />
                       </div>

                       <div className="space-y-2">
                          <p className="text-[9px] uppercase tracking-widest text-unbox-amber font-bold text-left">Paste Transaction Hash (TxHash)</p>
                          <input 
                            type="text" 
                            placeholder="0x..."
                            value={txHash}
                            onChange={(e) => setTxHash(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-xs font-mono text-white focus:border-unbox-amber outline-none transition-colors"
                          />
                       </div>

                       {errorMessage && (
                         <div className="p-3 bg-unbox-red/10 border border-unbox-red/20 rounded-lg text-[10px] text-unbox-red flex items-center gap-2">
                           <AlertCircle className="w-3 h-3" />
                           {errorMessage}
                         </div>
                       )}

                       <button 
                          onClick={handleRedeem}
                          disabled={isProcessing || !txHash}
                          className="w-full py-4 bg-unbox-amber text-black font-black uppercase text-xs tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.2)] disabled:opacity-30 transition-all hover:scale-[1.02]"
                       >
                          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                          {isProcessing ? 'Verifying on X Layer...' : 'Verify & Unbox Intelligence'}
                       </button>
                    </div>
                </div>
              ) : (
                /* UX-4.4.3: Delivery Result (Unlocked State) */
                <div className="space-y-8 animate-in fade-in duration-700">
                   <div className="glass-card p-8 space-y-6 border-unbox-green/20 bg-unbox-green/5">
                      <div className="flex items-center gap-2 text-unbox-green font-black uppercase text-[10px] tracking-widest">
                         <ShieldCheck className="w-4 h-4" />
                         Intelligence Delivered • Batch #{deliveredData?.batchId ?? 'UC-9941'}
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-2xl font-bold">{deliveredData?.insightTitle ?? 'Alpha Trader Liquidity Insight'}</h3>
                         <p className="text-white/50 leading-relaxed text-sm">
                            {deliveredData?.insightBody ?? 'Detected 12.4% liquidity drop on pair ETH/USDC. Recommendation: Invert next 2 execution intents to defensive mode until volatility resets.'}
                         </p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                         <MiniStat label="Latency" value={deliveredData?.latency ?? '2.4s'} />
                         <MiniStat label="Items" value={`${deliveredData?.itemsCount ?? 12}`} />
                         <MiniStat label="Confidence" value={deliveredData?.confidence ?? '98%'} />
                         <MiniStat label="Block" value={deliveredData?.block ?? '#124K'} />
                      </div>
                   </div>
                </div>
              )}
           </div>

           {/* Sidebar: Settlement & Revenue Split (UX-4.4.4) */}
           <div className="space-y-6">
              <div className="glass-card p-6 space-y-6">
                 <h4 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ArrowDownCircle className="w-4 h-4" />
                    Settlement Policy
                 </h4>
                 
                 <div className="space-y-4">
                    <SplitRow label="Source Agent" percentage={80} amount="0.0008 ETH" color="text-unbox-green" />
                    <SplitRow label="Unbox Protocol" percentage={20} amount="0.0002 ETH" color="text-white/40" />
                 </div>

                 <div className="pt-6 border-t border-white/5 text-[10px] text-white/30 leading-relaxed">
                    REQ-FEED-003: Settlement is atomic and occurs on-chain via UnboxFeedSettlement contract. 
                    Calculations follow the 80/20 non-negotiable split.
                 </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-unbox-green/10 to-transparent">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-unbox-green animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-unbox-green tracking-widest">Live Auditor</span>
                 </div>
                 <p className="text-xs text-white/60 leading-relaxed">
                    Connected to X Layer Testnet. All hashes and settlement proofs are verifiable via the explorer.
                 </p>
              </div>
           </div>
        </div>
      </main>
    </DashboardLayout>
  )
}

function TimelineStep({ status, label }: { status: 'done' | 'active' | 'pending'; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 relative">
       <div className={cn(
         "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border-2",
         status === 'done' ? "bg-unbox-green border-unbox-green text-black" :
         status === 'active' ? "bg-black border-unbox-green text-unbox-green shadow-[0_0_15px_rgba(16,185,129,0.5)]" :
         "bg-unbox-dark border-white/10 text-white/20"
       )}>
         {status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : status === 'active' ? <Clock className="w-4 h-4 animate-pulse" /> : <Circle className="w-4 h-4 fill-current opacity-20" />}
       </div>
       <span className={cn(
         "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
         status === 'pending' ? "text-white/20" : "text-white/80"
       )}>{label}</span>
    </div>
  )
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
       <p className="text-[8px] text-white/30 uppercase font-bold tracking-widest">{label}</p>
       <p className="text-xs font-black text-white">{value}</p>
    </div>
  )
}

function SplitRow({ label, percentage, amount, color }: { label: string, percentage: number, amount: string, color: string }) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between text-xs font-bold">
          <span className="text-white/60">{label}</span>
          <span className={color}>{percentage}%</span>
       </div>
       <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg border border-white/5">
          <span className="text-[10px] font-mono text-white/30">{amount}</span>
       </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
       <div className="text-[8px] uppercase text-white/30 font-bold mb-1">{label}</div>
       <div className="text-sm font-black text-white font-mono">{value}</div>
    </div>
  )
}
