import React from 'react';
import { DecisionPayload } from '@unbox/shared';
import { buildCausalChain, CausalStep } from '../lib/analysis.js';
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle, Fingerprint } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CausalChainPanelProps {
  decision?: DecisionPayload;
}

export const CausalChainPanel: React.FC<CausalChainPanelProps> = ({ decision }) => {
  if (!decision) return null;

  const chain = buildCausalChain(decision);

  return (
    <div className="glass-card p-6 space-y-8 relative overflow-hidden">
       {/* Background scanning effect */}
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-unbox-green/20 to-transparent animate-pulse" />
       
       <div className="flex items-center justify-between">
         <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
           <Fingerprint className="w-4 h-4" />
           Causal Chain Analysis
         </h3>
         <span className="text-[9px] font-mono text-white/30">decisionId: {decision.decisionId.slice(0, 12)}...</span>
       </div>

        <div className="flex flex-col space-y-2">
          {chain.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex gap-6 group">
                {/* Visual Timeline Marker */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 shrink-0 rounded-full flex items-center justify-center border-2 z-10 bg-black transition-all group-hover:scale-110",
                    step.status === 'pass' && "border-unbox-green text-unbox-green shadow-[0_0_10px_rgba(34,197,94,0.2)]",
                    step.status === 'fail' && "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]",
                    step.status === 'neutral' && "border-white/10 text-white/40"
                  )}>
                    {step.status === 'pass' && <CheckCircle2 className="w-4 h-4" />}
                    {step.status === 'fail' && <AlertCircle className="w-4 h-4" />}
                    {step.status === 'neutral' && <span className="text-[10px] font-black">{idx + 1}</span>}
                  </div>
                  {idx < chain.length - 1 && (
                    <div className="w-0.5 grow bg-gradient-to-b from-white/10 to-transparent my-1" />
                  )}
                </div>

                {/* Content Card */}
                <div className="flex-1 pb-10">
                  <div className="glass-card p-6 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/90">{step.title}</h4>
                      {step.reqId && (
                        <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest border border-white/5 px-2 py-1 rounded">
                          TRACED: {step.reqId}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {Object.entries(step.data).map(([key, value]) => (
                        <div key={key} className="flex flex-col border-l border-white/5 pl-3">
                          <span className="text-white/20 uppercase tracking-widest text-[8px] font-bold mb-1">{key}</span>
                          <span className="text-sm font-mono text-white/80 truncate font-medium">
                            {value as string}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {step.flags && step.flags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {step.flags.map(flag => (
                          <span key={flag} className="px-2 py-1 bg-red-500/10 text-red-400 text-[8px] font-black rounded uppercase border border-red-400/20">
                            {flag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
    </div>
  );
};
