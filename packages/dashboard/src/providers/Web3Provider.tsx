import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia, localhost, x1Testnet as xLayerTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

console.log("[Web3Provider] Initializing with X Layer Testnet support");

// REQ-FEED-001: Web3 Provider for x402 settlement
const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet, sepolia, localhost, xLayerTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
    [xLayerTestnet.id]: http("https://testrpc.xlayer.tech/terigon"),
  },
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
