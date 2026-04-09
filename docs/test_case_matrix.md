# Unbox Test Case Matrix
**TC to requirement traceability for Full V1**

## Status legend

- `Planned`: test defined but not automated yet
- `Ready`: implemented and runnable
- `Pass`: latest run passed
- `Fail`: latest run failed

---

## 1. Detailed TC matrix

| TC ID | Test name | Type | Covers | Owner | Automation path | Precondition | Test data | Expected result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-MIR-001` | Intercept execute path | Integration | `REQ-MIRROR-001` | QA-Backend | `packages/backend/src/adapter/__tests__/agent-adapter.spec.ts` | Agent adapter connected to signer | Valid trade intent with safe token | Execute decision captured before signing | Pass |
| `TC-MIR-002` | Intercept block path | Integration | `REQ-MIRROR-001` | QA-Backend | `packages/backend/src/adapter/__tests__/agent-adapter.spec.ts` | Risk engine enabled | Honeypot-like token and low score | Block decision captured with action=`block` | Pass |
| `TC-MIR-003` | Intercept defer path | Integration | `REQ-MIRROR-001` | QA-Backend | `packages/backend/src/adapter/__tests__/agent-adapter.spec.ts` | Deferral rule enabled | High gas threshold scenario | Defer decision captured with action=`defer` | Pass |
| `TC-MIR-004` | Off-chain payload and on-chain hash consistency | Integration | `REQ-MIRROR-002` | QA-Backend | `packages/backend/src/engine/__tests__/mirror-engine.spec.ts` | Decision store and `DecisionLog` deployed | One known payload fixture | Off-chain hash equals on-chain anchored hash | Pass |
| `TC-MIR-005` | Mandatory field completeness | Contract+Integration | `REQ-MIRROR-003`, `NFR-006` | QA-Backend | `packages/backend/src/adapter/__tests__/agent-adapter.spec.ts` | Schema validator active | Batch of 100 mixed decision events | Missing mandatory fields rate is 0% | Pass |
| `TC-MIR-006` | Plain-language block reason quality | Integration | `REQ-MIRROR-004` | QA-Backend | `packages/backend/src/adapter/__tests__/agent-adapter.spec.ts` | Explanation worker running | Blocked decision with 2 risk flags | Explanation includes primary risk + measurable signal | Pass |
| `TC-MIR-007` | Decision lifecycle event emission | Contract | `REQ-MIRROR-005` | QA-SC | `packages/contracts/test/DecisionLog.ts` | `DecisionLog` event listener subscribed | Execute, block, defer fixtures | `DecisionLogged` emitted at each lifecycle stage | Pass |
| `TC-MIR-008` | Intent-to-visible latency budget | Performance | `NFR-001` | QA-Perf | `tests/perf/mirror/intent_to_visible.k6.js` | Metrics collector enabled | 500 sequential decision intents | P95 intent-to-dashboard latency <= 500ms | Planned |
| `TC-CF-001` | Snapshot before final action | Integration | `REQ-CF-001` | QA-Backend | `packages/backend/tests/integration/counterfactual/snapshot_order.spec.ts` | Snapshot service connected to data feeds | Decision with volatile market state | Snapshot timestamp <= action finalization | Pass |
| `TC-CF-002` | Three-scenario replay completeness | Integration | `REQ-CF-002` | QA-Backend | `packages/backend/src/engine/__tests__/counterfactual-engine.spec.ts` | Replay worker enabled | One decision baseline payload | Exactly 3 scenarios returned | Pass |
| `TC-CF-003` | Delta numeric validity | Unit+Integration | `REQ-CF-003` | QA-Backend | `packages/backend/src/engine/__tests__/counterfactual-engine.spec.ts` | Delta calculator module loaded | Replay outputs with numeric and edge values | `usdDelta`, `slippageDeltaPct`, `gasDelta` are finite numbers | Pass |
| `TC-CF-004` | Synthesis generation | Integration | `REQ-CF-004` | QA-Backend | `packages/backend/src/engine/__tests__/mirror-engine.spec.ts` | OpenRouter-routed synthesis integration available | Three scenario outputs | Non-empty summary for each scenario | Pass |
| `TC-CF-005` | Replay linkage query | Integration | `REQ-CF-005` | QA-Backend | `packages/backend/src/engine/__tests__/mirror-engine.spec.ts` | Decision and replay records persisted | Decision ID with 3 linked replays | Query returns all linked replay records | Pass |
| `TC-CF-006` | Counterfactual latency budget | Performance | `NFR-002` | QA-Perf | `packages/backend/test_output.log` | Perf runner configured | 200 replay jobs | P95 counterfactual completion <= 5s | Pass |
| `TC-REP-001` | Soulbound transfer rejection | Contract | `REQ-REP-001` | QA-SC | `packages/contracts/test/AgentReputation.t.sol` | Identity token minted | Transfer transaction from owner to second wallet | Transfer reverts with non-transferable behavior | Pass |
| `TC-REP-002` | Weighted score correctness | Unit+Contract | `REQ-REP-002` | QA-SC | `packages/contracts/test/AgentReputation.t.sol` | Reference scorer and contract both available | Fixed input vector for 4 dimensions | On-chain weighted score equals reference score | Pass |
| `TC-REP-003` | Score update timing | Integration | `REQ-REP-003` | QA-Backend | `packages/backend/src/services/__tests__/reputation-sync.spec.ts` | Score worker subscribed to finalized decisions | Finalized decision stream of 50 entries | Score update visible within <= 1 block | Pass |
| `TC-REP-004` | Metadata update synchronization | Integration | `REQ-REP-003` | QA-Backend | `packages/backend/src/services/reputation-service.ts` | Metadata publisher enabled | Decision causing score change | Token metadata score equals latest on-chain score | Pass |
| `TC-REP-005` | Historical checkpoint query | Contract+Integration | `REQ-REP-004` | QA-SC | `packages/contracts/test/AgentReputation.t.sol` | Checkpoint storage deployed | Score changes across known block range | Query returns correct historical values | Pass |
| `TC-REP-006` | On-chain confirmation budget | Performance | `NFR-004` | QA-Perf | `tests/perf/chain/confirmation_blocks.k6.js` | Block monitor active on X Layer testnet | 100 anchor/update transactions | Confirmation <= 2 blocks for P95 | Planned |
| `TC-FEED-001` | Unpaid request returns x402 challenge | Integration | `REQ-FEED-001` | QA-Backend | `packages/backend/src/gateway/__tests__/x402-flow.spec.ts` | x402 gateway endpoint running | Unauthenticated feed request | HTTP 402 response with valid payment spec | Pass |
| `TC-FEED-002` | Payment required before delivery | Integration | `REQ-FEED-002` | QA-Backend | `packages/backend/src/gateway/__tests__/x402-flow.spec.ts` | Verification middleware enabled | Unpaid then paid request pair | No data before verify; data after verify only | Pass |
| `TC-FEED-003` | Settlement split correctness | Contract+Integration | `REQ-FEED-003` | QA-SC | `packages/backend/src/gateway/__tests__/x402-flow.spec.ts` | Settlement route configured | Paid batch with known amount | 80/20 split recorded and transferred correctly | Pass |
| `TC-FEED-004` | Paid response latency | Performance | `REQ-FEED-004` | QA-Perf | `packages/backend/test_output.log` | Warm cache and perf monitor enabled | 300 paid requests | P95 paid response <= 3s | Pass |
| `TC-FEED-005` | Idempotent verification retry safety | Integration | `REQ-FEED-002` | QA-Backend | `packages/backend/tests/integration/feed/idempotent_verify.spec.ts` | Idempotency key enforcement enabled | Duplicate verify callbacks | No duplicate delivery or settlement | Pass |
| `TC-UX-001` | Dashboard initial load | E2E+Performance | `NFR-003` | QA-Frontend | `tests/e2e/dashboard/initial_load.spec.ts` | Frontend built and API healthy | Standard dataset of 1k decisions | Initial render <= 2s on target env | Planned |
| `TC-SYS-001` | Controlled demo uptime | Soak | `NFR-005` | QA-Perf | `tests/soak/system/demo_uptime.k6.js` | Full stack deployed in staging | 2-hour scripted demo traffic | No service downtime during window | Planned |
| `TC-SYS-002` | End-to-end decision traceability | E2E | all `REQ-*` | QA-Platform | `tests/e2e/system/decision_traceability.spec.ts` | Full system with logging and UI enabled | Single decision from intent to score update | Decision trace is complete across all layers | Planned |

---

## 2. Coverage view (REQ/NFR -> TC)

| Requirement | Test cases |
| :--- | :--- |
| `REQ-MIRROR-001` | `TC-MIR-001`, `TC-MIR-002`, `TC-MIR-003` |
| `REQ-MIRROR-002` | `TC-MIR-004` |
| `REQ-MIRROR-003` | `TC-MIR-005` |
| `REQ-MIRROR-004` | `TC-MIR-006` |
| `REQ-MIRROR-005` | `TC-MIR-007` |
| `REQ-CF-001` | `TC-CF-001` |
| `REQ-CF-002` | `TC-CF-002` |
| `REQ-CF-003` | `TC-CF-003` |
| `REQ-CF-004` | `TC-CF-004` |
| `REQ-CF-005` | `TC-CF-005` |
| `REQ-REP-001` | `TC-REP-001` |
| `REQ-REP-002` | `TC-REP-002` |
| `REQ-REP-003` | `TC-REP-003`, `TC-REP-004` |
| `REQ-REP-004` | `TC-REP-005` |
| `REQ-FEED-001` | `TC-FEED-001` |
| `REQ-FEED-002` | `TC-FEED-002`, `TC-FEED-005` |
| `REQ-FEED-003` | `TC-FEED-003` |
| `REQ-FEED-004` | `TC-FEED-004` |
| `NFR-001` | `TC-MIR-008` |
| `NFR-002` | `TC-CF-006` |
| `NFR-003` | `TC-UX-001` |
| `NFR-004` | `TC-REP-006` |
| `NFR-005` | `TC-SYS-001` |
| `NFR-006` | `TC-MIR-005` |

---

## 3. Usage notes

- Add automation file paths after implementation (for example, `tests/integration/...`).
- Keep one owner per `TC-*` in your test runner metadata.
- Release candidate is blocked if any `REQ-*` has no mapped `TC-*`.
- Requirement status in the PRD is authoritative; update PRD and matrix in the same change when status changes.
