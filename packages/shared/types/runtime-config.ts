export interface CanonicalRuntimeConfig {
  backendUrl: string;
  rpcUrl: string;
  decisionLogAddress: string;
  agentReputationAddress: string;
}

type EnvLike = Record<string, string | undefined>;

const LOCAL_DEFAULTS: CanonicalRuntimeConfig = {
  backendUrl: 'http://localhost:4000',
  rpcUrl: 'http://127.0.0.1:8545',
  decisionLogAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  agentReputationAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
};

function firstNonEmpty(values: Array<string | undefined>, fallback: string): string {
  for (const value of values) {
    if (value && value.trim().length > 0) {
      return value.trim();
    }
  }
  return fallback;
}

export function resolveRuntimeConfig(env: EnvLike): CanonicalRuntimeConfig {
  return {
    backendUrl: firstNonEmpty([env.VITE_BACKEND_URL, env.BACKEND_URL], LOCAL_DEFAULTS.backendUrl),
    rpcUrl: firstNonEmpty([env.RPC_URL], LOCAL_DEFAULTS.rpcUrl),
    decisionLogAddress: firstNonEmpty(
      [env.DECISION_LOG_ADDRESS, env.VITE_DECISION_LOG_ADDRESS],
      LOCAL_DEFAULTS.decisionLogAddress,
    ),
    agentReputationAddress: firstNonEmpty(
      [
        env.AGENT_REPUTATION_ADDRESS,
        env.REPUTATION_CONTRACT_ADDRESS,
        env.VITE_AGENT_REPUTATION_ADDRESS,
        env.VITE_REPUTATION_CONTRACT_ADDRESS,
      ],
      LOCAL_DEFAULTS.agentReputationAddress,
    ),
  };
}
