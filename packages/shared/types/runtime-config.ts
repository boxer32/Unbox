export interface CanonicalRuntimeConfig {
  backendUrl: string;
  rpcUrl: string;
  decisionLogAddress: string;
  agentReputationAddress: string;
  unboxGuardrailAddress: string;
}

type EnvLike = Record<string, string | undefined>;

const LOCAL_DEFAULTS: CanonicalRuntimeConfig = {
  backendUrl: 'http://localhost:4000',
  rpcUrl: 'https://testrpc.xlayer.tech/terigon',
  decisionLogAddress: '0x3aAde2dCD2Df6a8cAc689EE797591b2913658659',
  agentReputationAddress: '0xffa7CA1AEEEbBc30C874d32C7e22F052BbEa0429',
  unboxGuardrailAddress: '0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926',
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
    rpcUrl: firstNonEmpty([env.RPC_URL, env.VITE_RPC_URL], LOCAL_DEFAULTS.rpcUrl),
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
    unboxGuardrailAddress: firstNonEmpty(
      [env.UNBOX_GUARDRAIL_ADDRESS, env.VITE_UNBOX_GUARDRAIL_ADDRESS],
      LOCAL_DEFAULTS.unboxGuardrailAddress,
    ),
  };
}
