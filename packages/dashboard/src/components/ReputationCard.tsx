import React, { useMemo } from 'react';
import { TrendingUp, Award, Loader2, Clock } from 'lucide-react';
import { useReadContract, useAccount } from 'wagmi';
import { agentReputationAbi, resolveRuntimeConfig } from '@unbox/shared';
const runtimeConfig = resolveRuntimeConfig(import.meta.env as Record<string, string | undefined>);
const CONTRACT_ADDRESS = runtimeConfig.agentReputationAddress as `0x${string}`;

interface ReputationCardProps {
  agentId?: number;
}

/**
 * REQ-REP-002, REQ-REP-004: Reputation Score & History
 * Displaying the latest weighted score and historical checkpoints.
 */
export const ReputationCard: React.FC<ReputationCardProps> = ({ agentId = 1 }) => {
  const { isConnected } = useAccount();
  const tokenId = BigInt(agentId);

  // 1. Fetch Latest Score
  const { data: scoreData, isLoading: isScoreLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: agentReputationAbi,
    functionName: 'getScore',
    args: [tokenId],
    query: { enabled: isConnected, refetchInterval: 5000 }
  });

  // 2. Fetch Historical Checkpoints (REQ-REP-004)
  const { data: historyData, isLoading: isHistoryLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: agentReputationAbi,
    functionName: 'getScoreHistory',
    args: [tokenId],
    query: { enabled: isConnected, refetchInterval: 10000 }
  });

  const reputation = useMemo(() => {
    if (!scoreData) {
      return {
        weightedScore: 0,
        components: [
          { name: 'Quality', score: 0, weight: 35 },
          { name: 'Security', score: 0, weight: 30 },
          { name: 'Efficiency', score: 0, weight: 20 },
          { name: 'Transparency', score: 0, weight: 15 }
        ]
      };
    }

    const [q, s, e, t, weighted] = scoreData as any;
    return {
      weightedScore: Number(weighted),
      components: [
        { name: 'Quality', score: Number(q), weight: 35 },
        { name: 'Security', score: Number(s), weight: 30 },
        { name: 'Efficiency', score: Number(e), weight: 20 },
        { name: 'Transparency', score: Number(t), weight: 15 }
      ]
    };
  }, [scoreData]);

  const history = useMemo(() => {
    if (!historyData) return [];
    return (historyData as any[]).slice(-3).reverse(); // Last 3 updates
  }, [historyData]);

  if (!isConnected) {
    return (
      <div className="glass-card p-6 text-center space-y-4">
        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
           <Award className="w-6 h-6 text-white/20" />
        </div>
        <p className="text-xs text-white/30 uppercase font-black tracking-widest">Connect Wallet to view Reputation</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 space-y-6 relative overflow-hidden">
      {(isScoreLoading || isHistoryLoading) && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 flex items-center justify-center">
           <Loader2 className="w-6 h-6 text-unbox-green animate-spin" />
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-unbox-green uppercase tracking-widest flex items-center gap-2">
            <Award className="w-4 h-4" />
            Live Reputation
          </h3>
          <div className="flex items-baseline gap-2">
             <p className="text-4xl font-black text-white">{reputation.weightedScore}</p>
             <span className="text-sm font-normal text-white/20">/100</span>
          </div>
        </div>
        <div className="p-2 bg-unbox-green/10 rounded-lg">
          <TrendingUp className="w-5 h-5 text-unbox-green" />
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="space-y-4">
        {reputation.components.map((comp) => (
          <div key={comp.name} className="space-y-1.5">
            <div className="flex justify-between text-[10px] uppercase tracking-wider">
              <span className="text-white/40">{comp.name}</span>
              <span className="text-white/80 font-bold">{comp.score}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-unbox-green rounded-full transition-all duration-1000" 
                style={{ width: `${comp.score}%`, opacity: 0.2 + (comp.score / 150) }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* REQ-REP-004: History Checkpoints */}
      <div className="pt-4 border-t border-white/5 space-y-3">
         <h4 className="text-[10px] text-white/30 uppercase font-bold flex items-center gap-2">
            <Clock className="w-3 h-3" />
            History Checkpoints
         </h4>
         <div className="flex gap-2">
            {history.map((entry, i) => (
               <div key={i} className="flex-1 glass-card p-2 bg-white/5 text-center">
                  <p className="text-xs font-black text-white">{Number(entry.weightedScore)}</p>
                  <p className="text-[8px] text-white/20 uppercase">Block {Number(entry.lastUpdateBlock)}</p>
               </div>
            ))}
            {history.length === 0 && <p className="text-[10px] text-white/20 italic">No history available yet</p>}
         </div>
      </div>

      <div className="pt-4 flex items-center gap-3">
         <div className="w-8 h-8 rounded-lg bg-unbox-green/10 border border-unbox-green/20 flex items-center justify-center text-[10px] font-black text-unbox-green">
            UAID
         </div>
         <div className="text-[10px]">
            <p className="text-white/80 font-bold uppercase tracking-tight">Soulbound Identity #{agentId}</p>
            <p className="text-white/20 font-mono truncate max-w-[140px]">{CONTRACT_ADDRESS}</p>
         </div>
      </div>
    </div>
  );
};
