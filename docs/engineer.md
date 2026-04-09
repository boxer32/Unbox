# Unbox Engineering Specification (Full V1)
**Aligned with `Unbox_PRD_v0.1.md` requirement IDs**

## 1. Engineering objective

Implement a production-grade accountability layer where each decision is:
1. Captured with deterministic structure.
2. Explainable in plain language.
3. Evaluated against alternative outcomes.
4. Reflected in verifiable on-chain reputation.
5. Monetizable through x402-paid intelligence delivery.

All sections in this document map to `REQ-*` and `NFR-*`.

---

## 2. System components

| Component | Responsibility | Mapped IDs |
| :--- | :--- | :--- |
| `agent-adapter` | Intercept intent and normalize decision request | `REQ-MIRROR-001`, `REQ-MIRROR-003` |
| `mirror-engine` | Persist payload, generate hash anchor request | `REQ-MIRROR-002`, `REQ-MIRROR-005` |
| `explanation-worker` | Generate block explanations from risk signals | `REQ-MIRROR-004` |
| `counterfactual-worker` | Snapshot and replay three scenarios | `REQ-CF-001`, `REQ-CF-002`, `REQ-CF-003`, `REQ-CF-004` |
| `decision-store` | Keep decision-replay linkage and retrieval | `REQ-CF-005` |
| `score-service` | Compute weighted score and checkpoint updates | `REQ-REP-002`, `REQ-REP-003`, `REQ-REP-004` |
| `reputation-contracts` | Soulbound token + score anchoring | `REQ-REP-001`, `REQ-REP-002` |
| `x402-gateway` | Payment challenge, verify, deliver, settle split | `REQ-FEED-001`, `REQ-FEED-002`, `REQ-FEED-003`, `REQ-FEED-004` |
| `dashboard-web` | Render decision timeline and trust surfaces | Vite + `@tanstack/react-router` + wagmi |

---

## 3. Data contracts

Glossary:
- `OpenRouter-routed synthesis`: model response generated through OpenRouter routing policy.

## 3.1 Decision payload schema

```json
{
  "decisionId": "string",
  "agentId": "string",
  "action": "execute|block|defer",
  "intentText": "string",
  "marketState": {
    "price": "number",
    "liquidity": "number",
    "gas": "number",
    "oracleRef": "string"
  },
  "securityScan": {
    "score": "number",
    "flags": ["string"]
  },
  "blockRef": "number",
  "timestampMs": "number",
  "payloadHash": "string"
}
```

Mapped IDs: `REQ-MIRROR-002`, `REQ-MIRROR-003`.

## 3.2 Counterfactual result schema

```json
{
  "decisionId": "string",
  "scenario": "wait_30s|alt_route|invert_action",
  "usdDelta": "number",
  "slippageDeltaPct": "number",
  "gasDelta": "number",
  "summary": "string"
}
```

Mapped IDs: `REQ-CF-002`, `REQ-CF-003`, `REQ-CF-004`, `REQ-CF-005`.

## 3.3 Score update schema

```json
{
  "agentId": "string",
  "decisionQuality": "number",
  "securityDiscipline": "number",
  "executionEfficiency": "number",
  "transparency": "number",
  "weightedScore": "number",
  "checkpointBlock": "number"
}
```

Mapped IDs: `REQ-REP-002`, `REQ-REP-003`, `REQ-REP-004`.

---

## 4. On-chain contracts (behavioral spec)

## 4.1 `DecisionLog`

- Accept hash anchor writes from trusted mirror writer.
- Emit canonical `DecisionLogged` events per lifecycle stage.
- Keep minimal storage footprint; events are primary indexing source.

Mapped IDs: `REQ-MIRROR-002`, `REQ-MIRROR-005`, `NFR-004`.

## 4.2 `AgentReputation`

- Enforce non-transferability of identity token.
- Accept score update writes and checkpoint snapshots.
- Expose historical score query by block range.

Mapped IDs: `REQ-REP-001`, `REQ-REP-002`, `REQ-REP-003`, `REQ-REP-004`.

## 4.3 `UnboxFeedSettlement`

- Record verified paid request settlement.
- Enforce deterministic 80/20 split by policy.

Mapped IDs: `REQ-FEED-002`, `REQ-FEED-003`.

---

## 5. Runtime flow

1. Agent emits decision intent to `agent-adapter`.
2. `mirror-engine` persists payload and requests on-chain anchor.
3. If blocked, `explanation-worker` emits plain-language reason.
4. `counterfactual-worker` snapshots and replays 3 scenarios.
5. `score-service` recalculates weighted score and pushes update.
6. Dashboard consumes events and APIs for live visualization.
7. External buyers access data via x402 challenge and paid delivery.

Mapped IDs:
- `REQ-MIRROR-001..005`
- `REQ-CF-001..005`
- `REQ-REP-001..004`
- `REQ-FEED-001..004`

---

## 6. SLO and latency budgets

| Budget | Target | Owner | Mapped IDs |
| :--- | :--- | :--- | :--- |
| Intent -> dashboard visible | <= 500ms (P95) | mirror-engine | `NFR-001` |
| Counterfactual completion | <= 5s (P95) | counterfactual-worker | `NFR-002` |
| Dashboard initial render | <= 2s | web app | `NFR-003` |
| Score update finalization | <= 1 block after decision finalization | score-service/contracts | `REQ-REP-003`, `NFR-004` |
| Paid feed response | <= 3s (P95) | x402-gateway | `REQ-FEED-004` |

---

## 7. Reliability and failure modes

| Failure mode | Detection | Fallback |
| :--- | :--- | :--- |
| OpenRouter/provider latency spike | worker queue lag and timeout alerts | return templated reason with risk code; backfill full explanation |
| Chain congestion | confirmation latency monitor | queue writes, keep pending state, preserve order |
| TEE signing path failure | signer health check | fail over to backup EOA path |
| x402 verification timeout | gateway timeout and mismatch logs | idempotent retry with request token |

Mapped IDs: `NFR-001`, `NFR-004`, `REQ-FEED-002`, `REQ-FEED-004`.

---

## 8. Test strategy

## 8.1 Mandatory test suites

1. **Contract tests**
   - Soulbound non-transferability.
   - Score update integrity.
   - Revenue split correctness.
2. **Integration tests**
   - Decision capture to dashboard propagation.
   - Counterfactual pipeline output completeness.
   - x402 challenge to paid delivery flow.
3. **Performance tests**
   - P95 latency for mirror and counterfactual.
   - Under-load feed response SLA.

## 8.2 Definition of done (engineering)

Feature is done only if:
1. It passes tests mapped to its `REQ-*` IDs.
2. It meets associated `NFR-*` budgets.
3. Observability dashboards show green status in staging.

---

## 9. Traceability matrix

| PRD ID | UX reference | Engineering reference |
| :--- | :--- | :--- |
| `REQ-MIRROR-001` | Decision stream row model | `agent-adapter` intercept flow |
| `REQ-MIRROR-002` | Decision detail verifiability cues | hash persistence and anchor flow |
| `REQ-MIRROR-003` | Decision detail context blocks | decision payload schema |
| `REQ-MIRROR-004` | Block reason default visibility | explanation-worker |
| `REQ-MIRROR-005` | Live update behaviors | event-first logging |
| `REQ-CF-001..005` | Counterfactual compare panel | snapshot/replay pipeline |
| `REQ-REP-001..004` | Reputation screen | reputation contracts + score-service |
| `REQ-FEED-001..004` | Feed console timeline | x402-gateway + settlement |
| `NFR-001..006` | Global UX states and latency cues | SLO budgets and performance tests |

---

## 10. Out of scope for Full V1

- Additional score dimensions beyond 35/30/20/15.
- Non-required cryptographic proofs not tied to current acceptance criteria.
- New protocol integrations not mapped to existing `REQ-*`.

---

## 11. HFT-inspired, not HFT-native

For `counterfactual-worker` and `x402-gateway`, this project adopts selected high-frequency trading principles, but does not require full HFT infrastructure.

## 11.1 Why

- Current targets are:
  - Counterfactual completion <= 5s (P95)
  - Paid feed response <= 3s (P95)
- Product value depends on explainability, correctness, and reliability more than microsecond execution race.

## 11.2 Use these HFT-inspired patterns

1. Event-driven processing with bounded queues.
2. Backpressure and overload protection.
3. Stage-level latency budgets and p95/p99 monitoring.
4. Hot cache and precompute for repeated request paths.
5. Deterministic fallbacks under provider latency spikes.
6. Idempotent request handling for payment and delivery flows.

## 11.3 Not required for Full V1

1. Co-location infrastructure.
2. Kernel bypass and specialized low-latency networking stacks.
3. Microsecond-level optimization across all paths.
4. Architecture that sacrifices explainability for speed alone.

## 11.4 Implementation note by component

- `counterfactual-worker`:
  - prioritize deterministic replay and stable latency over ultra-low jitter.
- `x402-gateway`:
  - prioritize verification correctness, idempotency, and predictable SLA.
- `mirror-engine`:
  - prioritize fast visibility and reliable event emission for auditability.
