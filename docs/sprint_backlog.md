# Unbox Full V1 Sprint Backlog
**Derived from `Unbox_PRD_v0.1.md`**

## Planning assumptions

- Sprint length: 2 weeks
- Team mode: Solo builder + AI-assisted coding
- Goal: deliver all `REQ-*` and `NFR-*` for Full V1
- Priority order: Mirror -> Counterfactual -> Reputation -> x402 -> hardening

---

## Sprint 1 - Mirror foundation and schema lock

### Sprint goal
Capture every decision deterministically and anchor payload hashes on-chain.

### Tasks
| Task ID | Task | Mapped IDs | Owner | Estimate | Priority | Dependency | Blocker | Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `S1-T01` | Implement `agent-adapter` interception hooks for execute/block/defer paths | `REQ-MIRROR-001` | Backend | 2d | P0 | None | None | Unified decision interception middleware | Done |
| `S1-T02` | Define and validate canonical decision payload schema | `REQ-MIRROR-003`, `NFR-006` | Backend | 1.5d | P0 | `S1-T01` | None | Schema + validation library | Done |
| `S1-T03` | Implement off-chain decision payload persistence | `REQ-MIRROR-002` | Backend | 2d | P0 | `S1-T02` | Storage provisioning | Decision store writer and retrieval API | Done |
| `S1-T04` | Implement on-chain hash anchoring flow to `DecisionLog` | `REQ-MIRROR-002`, `NFR-004` | Smart Contract | 2d | P0 | `S1-T02` | Testnet RPC stability | Anchor writer + tx lifecycle tracking | Done |
| `S1-T05` | Emit lifecycle event stream (`DecisionLogged`) | `REQ-MIRROR-005` | Smart Contract | 1.5d | P1 | `S1-T04` | None | Event producer and indexer contract tests | Done |
| `S1-T06` | Build minimal dashboard stream for live rows | `REQ-MIRROR-005`, `NFR-001`, `NFR-003` | Frontend | 2d | P1 | `S1-T05` | API contract drift | Live decision table | Done |

### Exit criteria
- `REQ-MIRROR-001`, `REQ-MIRROR-002`, `REQ-MIRROR-003`, `REQ-MIRROR-005` implemented in staging.
- P95 intent-to-visible latency <= 500ms in test environment.

---

## Sprint 2 - Explainability and counterfactual core

### Sprint goal
Provide understandable block reasons and deterministic scenario replay.

### Tasks
| Task ID | Task | Mapped IDs | Owner | Estimate | Priority | Dependency | Blocker | Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `S2-T01` | Build explanation worker for blocked decisions | `REQ-MIRROR-004` | Backend | 2d | P0 | `S1-T03` | OpenRouter provider quota | Explanation service + fallback templates | Done |
| `S2-T02` | Implement state snapshot capture at decision time | `REQ-CF-001` | Backend | 1.5d | P0 | `S1-T03` | Oracle adapter readiness | Snapshot pipeline (price/liquidity/gas/oracle) | Done |
| `S2-T03` | Implement replay engine for 3 fixed scenarios | `REQ-CF-002` | Backend | 2d | P0 | `S2-T02` | DEX route simulator gaps | Scenario runner | Done |
| `S2-T04` | Implement quantitative delta computation | `REQ-CF-003` | Backend | 1.5d | P0 | `S2-T03` | None | `usdDelta`, `slippageDeltaPct`, `gasDelta` calculators | Done |
| `S2-T05` | Generate short synthesis text per scenario | `REQ-CF-004` | Backend | 1d | P1 | `S2-T03` | OpenRouter routing latency variance | Replay summary worker | Done |
| `S2-T06` | Persist replay linkage by decision ID | `REQ-CF-005` | Backend | 1d | P1 | `S2-T03` | None | Decision-to-replay relation model | Done |

### Exit criteria
- All `REQ-CF-*` pass integration tests.
- Counterfactual completion P95 <= 5s.

---

## Sprint 3 - Reputation contracts and scoring services

### Sprint goal
Deliver verifiable, non-transferable identity and auditable weighted score.

### Tasks
| Task ID | Task | Mapped IDs | Owner | Estimate | Priority | Dependency | Blocker | Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `S3-T01` | Implement soulbound identity token contract behavior | `REQ-REP-001` | Smart Contract | 2d | P0 | None | Contract audit slot | Non-transferable token with revert-on-transfer tests | Done |
| `S3-T02` | Implement weighted score calculator (35/30/20/15) | `REQ-REP-002` | Smart Contract | 1.5d | P0 | `S2-T06` | None | Deterministic scoring module | Done |
| `S3-T03` | Implement score and metadata update pipeline per finalized decision | `REQ-REP-003` | Backend | 2d | P0 | `S3-T02` | Metadata storage gateway | Score update job + metadata publisher | Done |
| `S3-T04` | Implement checkpoint storage/query for historical score | `REQ-REP-004` | Smart Contract | 1.5d | P1 | `S3-T02` | Gas budget review | Historical query API and contract method | Done |
| `S3-T05` | Build reputation dashboard view | `REQ-REP-002`, `REQ-REP-003`, `REQ-REP-004` | Frontend | 2d | P1 | `S3-T03`, `S3-T04` | API schema stability | Score view with trend | Done |

### Exit criteria
- `REQ-REP-*` contract and integration suites pass.
- Score update observable within <= 1 block from finalization.

---

## Sprint 4 - x402 feed and settlement

### Sprint goal
Ship paid decision-batch delivery with enforced settlement rules.

### Tasks
| Task ID | Task | Mapped IDs | Owner | Estimate | Priority | Dependency | Blocker | Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `S4-T01` | Implement unpaid request challenge flow (HTTP 402) | `REQ-FEED-001` | Backend | 1.5d | P0 | None | x402 spec update risk | x402 challenge endpoint | Done |
| `S4-T02` | Implement payment verification gate before data delivery | `REQ-FEED-002` | Backend | 2d | P0 | `S4-T01` | Wallet signature edge cases | Verification middleware | Done |
| `S4-T03` | Implement 80/20 settlement accounting and transfer logic | `REQ-FEED-003` | Backend + Smart Contract | 2d | P0 | `S4-T02` | Treasury wallet readiness | Settlement service/contract integration | Done |
| `S4-T04` | Optimize paid response path for SLA <= 3s P95 | `REQ-FEED-004` | Backend | 1.5d | P1 | `S4-T02` | Cold-cache spikes | Low-latency paid delivery path | Done |
| `S4-T05` | Build feed console timeline UI | `REQ-FEED-001`, `REQ-FEED-002`, `REQ-FEED-004` | Frontend | 1.5d | P1 | `S4-T01`, `S4-T02` | Event stream lag | Request state timeline and delivery panel | Done |

### Exit criteria
- `REQ-FEED-*` tests pass end-to-end.
- Paid request P95 <= 3s under staging load profile.

---

## Sprint 5 - End-to-end hardening and observability

### Sprint goal
Stabilize full system reliability and ensure NFR compliance.

### Tasks
| Task ID | Task | Mapped IDs | Owner | Estimate | Priority | Dependency | Blocker | Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `S5-T01` | Build unified observability dashboards (latency, errors, queue lag) | `NFR-001`, `NFR-002`, `NFR-003`, `NFR-004` | Platform/Ops | 2d | P0 | `S1-T06`, `S2-T06`, `S4-T04` | Telemetry pipeline completeness | Ops dashboard | Todo |
| `S5-T02` | Implement API spike fallback and cache of last 20 decisions | `NFR-005` | Backend | 1.5d | P0 | `S2-T01` | Cache invalidation bugs | Graceful degradation path | Todo |
| `S5-T03` | Implement TEE failover runbook and backup EOA path tests | `NFR-005` | Platform/Ops | 1.5d | P1 | `S1-T04` | Key management readiness | Failover operational playbook | Todo |
| `S5-T04` | Add chain congestion queueing and pending-state UX | `NFR-004` | Backend + Frontend | 2d | P1 | `S1-T04`, `S1-T06` | Pending-state UX gaps | Ordered write queue + pending indicators | Done |
| `S5-T05` | Run full traceability audit (REQ/NFR -> tests -> demo script) | all `REQ-*`, all `NFR-*` | QA | 1d | P0 | `S5-T01` | Missing test evidence | Signed-off release checklist | Todo |

### Exit criteria
- All NFRs measured and within target in staging.
- Full traceability report shows no orphan requirement.

---

## Sprint 6 - Release candidate and launch readiness

### Sprint goal
Prepare release candidate with complete acceptance evidence.

### Tasks
| Task ID | Task | Mapped IDs | Owner | Estimate | Priority | Dependency | Blocker | Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `S6-T01` | Execute regression suite and fix priority defects | all `REQ-*`, all `NFR-*` | QA + Backend | 2d | P0 | `S5-T05` | Open P0 defects | RC test report | Todo |
| `S6-T02` | Run load/perf campaign and tune hotspots | `NFR-001`, `NFR-002`, `NFR-003` | Platform/Ops + Backend | 2d | P0 | `S6-T01` | Unstable load environment | Perf benchmark report | Todo |
| `S6-T03` | Rehearse judge/demo path with scripted scenarios | goals + core `REQ-*` | Product + Frontend | 1d | P1 | `S6-T01` | Incomplete demo dataset | Demo script and runbook | Todo |
| `S6-T04` | Freeze release artifacts and deployment checklist | all | Product + Platform/Ops | 1d | P0 | `S6-T01`, `S6-T02`, `S6-T03` | Missing sign-offs | Deployment package | Todo |

### Exit criteria
- RC passes all critical test cases.
- Deployment runbook validated in dry run.

---

## Backlog governance

- Any new task must reference at least one `REQ-*` or `NFR-*`.
- Tasks without mapping are marked `parking-lot` and excluded from active sprint.
- Scope changes are applied in PRD first, then propagated to sprint backlog.
