import React from 'react';
import { ShieldCheck, ExternalLink, Globe } from 'lucide-react';

interface HashAnchorProps {
  payloadHash: string;
  blockRef: number;
}

export const HashAnchor: React.FC<HashAnchorProps> = ({ payloadHash, blockRef }) => {
  return (
    <div className="glass-card p-6 border-unbox-green/10 bg-unbox-green/[0.02] flex flex-col gap-4 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-unbox-green/5 blur-[40px] rounded-full -mr-16 -mt-16 transition-all group-hover:bg-unbox-green/10" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-unbox-green/20 flex items-center justify-center text-unbox-green">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">X Layer Proof Anchor</h4>
             <p className="text-[9px] text-unbox-green font-bold uppercase tracking-widest">Decision Verified On-Chain</p>
          </div>
        </div>
        <div className="px-2 py-1 bg-unbox-green text-black text-[8px] font-black uppercase tracking-widest rounded shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          Verified
        </div>
      </div>

      <div className="space-y-3 pt-2 relative z-10">
        <div className="space-y-1">
          <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Payload Fingerprint (SHA-256)</p>
          <div className="flex items-center justify-between group/hash cursor-pointer" onClick={() => navigator.clipboard.writeText(payloadHash)}>
            <p className="text-[10px] font-mono text-white/60 truncate mr-4 group-hover/hash:text-unbox-green transition-colors">
              {payloadHash}
            </p>
            <ExternalLink className="w-3 h-3 text-white/10 group-hover/hash:text-unbox-green" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-white/20" />
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Block Reference: <span className="text-white/60 italic">#{blockRef.toLocaleString()}</span></span>
          </div>
          <button 
            onClick={() => window.open(`https://xlayer-explorer.okx.com/block/${blockRef}`, '_blank')}
            className="text-[9px] font-black uppercase tracking-widest text-unbox-green hover:underline flex items-center gap-1.5"
          >
            Explorer <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
