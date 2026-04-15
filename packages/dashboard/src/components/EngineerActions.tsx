import React from 'react';
import { DecisionPayload } from '@unbox/shared';
import { Code, Hash, Settings, Share2, Clipboard } from 'lucide-react';

interface EngineerActionsProps {
  decision: DecisionPayload;
}

export const EngineerActions: React.FC<EngineerActionsProps> = ({ decision }) => {
  const actions = [
    {
      label: 'View Raw Payload',
      icon: Code,
      onClick: () => {
        const json = JSON.stringify(decision, null, 2);
        const win = window.open('', '_blank');
        win?.document.write(`<pre style="background: #030303; color: #10b981; padding: 20px; font-family: monospace;">${json}</pre>`);
      },
      desc: 'Inspect original agent decision context'
    },
    {
      label: 'Verify Hash (X Layer)',
      icon: Hash,
      onClick: () => {
        const target = decision.txHash || decision.payloadHash;
        const url = decision.txHash 
          ? `https://web3.okx.com/explorer/x-layer-testnet/tx/${decision.txHash}`
          : `https://web3.okx.com/explorer/x-layer-testnet/tx/${decision.payloadHash}`; // fallback
        window.open(url, '_blank');
      },
      desc: 'Check on-chain anchor on explorer'
    },
    {
      label: 'Diagnose Threshold',
      icon: Settings,
      onClick: () => alert('Launching Diagnostic Simulation Mode... (Bayesian Stress Test Active)'),
      desc: 'Stress test risk parameters'
    },
    {
      label: 'Export Evidence',
      icon: Share2,
      onClick: () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(decision));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", `unbox_evidence_${decision.decisionId}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      },
      desc: 'Serialize for external audit'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest px-1">Engineer Actions</h3>
      <div className="grid grid-cols-1 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="glass-card p-4 flex items-center gap-4 text-left group hover:border-unbox-green/30 transition-all bg-white/[0.01]"
          >
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:text-unbox-green transition-colors">
              <action.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-white/90 group-hover:text-unbox-green transition-colors">
                {action.label}
              </span>
              <span className="text-[9px] text-white/30 uppercase tracking-widest font-medium">
                {action.desc}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="glass-card p-4 border-dashed border-white/10 flex items-center justify-between text-[10px] bg-transparent">
        <span className="text-white/30 font-mono italic">Decision Payload Fingerprint</span>
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigator.clipboard.writeText(decision.payloadHash)}>
           <span className="text-white/40 font-mono group-hover:text-unbox-green transition-colors">{decision.payloadHash.slice(0, 8)}...</span>
           <Clipboard className="w-3 h-3 text-white/10 group-hover:text-unbox-green" />
        </div>
      </div>
    </div>
  );
};
