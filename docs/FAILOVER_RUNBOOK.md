# Unbox Operational Failover Runbook (V1)
**Operational Guardrails for Demo Uptime (NFR-005)**

## 1. RPC Latency & Chain Congestion
**Detection**: `OpsMetricsCard` shows `Queue Depth > 5` or `P95 Latency > 1s`.
**Automatic Mitigation**:
- `BlockchainService` automatically enqueues transactions and retries with updated nonces.
- `MirrorEngine` serves the last 20 decisions from the **Hot Cache** (`source: hot_cache`).

**Manual Intervention**:
1. If the queue continues to grow, check the X Layer Testnet explorer.
2. If the RPC is unresponsive, the system will trigger `GUARDRAIL_TIMEOUT_FAILSAFE_BLOCK`. This is expected behavior to prioritize safety.
3. Switch to backup RPC URL in `.env`.

## 2. API Provider (OpenRouter) Failure
**Detection**: Decision records show `explanation: "TEMPLATE_REASON_LATENCY_SPIKE"`.
**Automatic Mitigation**:
- `ExplanationWorker` uses pre-defined fallback templates based on risk flags to ensure users always see a "Why".
- Counterfactual summary is skipped or uses a simplified numeric-only delta view.

**Manual Intervention**:
1. Check OpenRouter dashboard for credit balance or global outages.
2. If error rate is > 20%, switch primary model to `gemini-pro` or `claude-3-haiku` in `.env`.

## 3. Handshake Rejection (Guardrail)
**Detection**: Decisions marked as `block` with reason `BLOCKED_BY_ONCHAIN_GUARDRAIL`.
**Normal Behavior**: This means the guardrail is working correctly.
**Emergency Intervention**:
- If an agent is wrongly blocked (False Positive), verify the agent's score in `AgentReputation` contract.
- Lower the `MIN_SECURITY_SCORE` or `CRITICAL_SCORE_THRESHOLD` in `UnboxGuardrail.sol` and redeploy ONLY if the risk logic is confirmed faulty.

## 4. TEE signing path / Private Key Failure
**Detection**: Backend logs show `PRIVATE_KEY is required` or `Send Failed`.
**Mitigation**:
1. Ensure the `.env` file is present in `packages/backend`.
2. Fallback to Backup EOA: Update the private key to a secondary funded wallet.
3. Verify wallet balance on X Layer to ensure enough gas for anchoring.

---
*Signed off for Demo V1 — April 2026*
