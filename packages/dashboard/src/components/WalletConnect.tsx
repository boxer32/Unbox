import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Wallet, LogIn, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * REQ-MIRROR-001 / REQ-FEED-001: Real Wallet Connection
 * Allowing users (Eng agents or external buyers) to identify/login.
 */
export const WalletConnect: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-end gap-1">
        <button 
          onClick={() => connect({ connector: injected() })}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 bg-unbox-green text-black font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
        >
          {isPending ? <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" /> : <LogIn className="w-4 h-4" />}
          Connect Agent
        </button>
        {error && <span className="text-[8px] text-red-500 font-bold uppercase tracking-widest">{error.message}</span>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 animate-in fade-in duration-500">
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-bold text-unbox-green uppercase flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          Agent Active
        </span>
        <span className="text-xs font-mono text-white/60">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
      <button 
        onClick={() => disconnect()}
        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/40 hover:text-red-500 transition-all border border-white/5"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
};
