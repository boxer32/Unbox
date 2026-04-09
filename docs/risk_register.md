# Unbox Risk Register (Execution)
**Operational risk tracking for Full V1 delivery**

## Severity scale

- `Critical`: blocks sprint exit criteria or release gate
- `High`: major delay/risk to REQ/NFR target
- `Medium`: manageable impact with workaround
- `Low`: minor operational risk

---

## Active risks

| Risk ID | Area | Severity | Trigger | Impact | Mitigation owner | Mitigation plan | Related tasks | Status | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `RISK-001` | Infra | High | Testnet RPC instability during anchoring | Delayed `REQ-MIRROR-002`, `NFR-004` validation | Platform/Ops | Add fallback RPC provider and retry with backoff | `S1-T04` | Monitoring | `EVI-S1-INT` |
| `RISK-002` | Data | High | Storage provisioning not ready for decision payloads | Blocks mirror persistence rollout | Backend | Pre-provision storage and run write/read smoke checks | `S1-T03` | Closed | `EVI-S1-INT` |
| `RISK-003` | API | High | OpenRouter provider quota or throttling reached | Explainability and synthesis degraded | Backend | Implement template fallback and request budgeting | `S2-T01`, `S2-T05` | Monitoring | `EVI-S2-REPLAY` |
| `RISK-004` | Market adapter | Medium | Oracle/DEX adapters incomplete | Counterfactual replay accuracy drops | Backend | Freeze adapter contract and add mock adapter fallback | `S2-T02`, `S2-T03` | Closed | `EVI-S2-REPLAY` |
| `RISK-005` | Security | Critical | Missing contract audit slot for reputation contracts | Release blocked for on-chain trust features | Smart Contract | Schedule audit window in Sprint 3 and reserve patch time | `S3-T01`, `S3-T02`, `S3-T04` | Closed | `EVI-S3-CONTRACT` |
| `RISK-006` | Metadata | Medium | Metadata storage gateway unavailable | `REQ-REP-003` may not show fresh score metadata | Backend | Add queue/retry and temporary cached metadata path | `S3-T03` | Closed | `EVI-S3-CHAIN` |
| `RISK-007` | Payments | High | x402 spec changes or wallet signature edge cases | Breaks `REQ-FEED-001/002` and E2E payment flow | Backend | Version-pin x402 interface and add signature compatibility tests | `S4-T01`, `S4-T02` | Closed | `EVI-S4-E2E` |
| `RISK-008` | Treasury | High | Treasury wallet setup delayed | Cannot validate 80/20 settlement in Sprint 4 | Product + Smart Contract | Pre-create treasury wallet and verify permissions | `S4-T03` | Closed | `EVI-S4-SETTLE` |
| `RISK-009` | Performance | Medium | Cold-cache spikes push paid response > 3s | `REQ-FEED-004` gate miss | Backend | Warm cache strategy and endpoint hot-path optimization | `S4-T04` | Closed | `EVI-S4-E2E` |
| `RISK-010` | Observability | High | Telemetry pipeline incomplete | NFR measurements unavailable for gate | Platform/Ops | Define required metrics early and add synthetic probes | `S5-T01` | Open | - |
| `RISK-011` | Reliability | High | Cache invalidation bugs in fallback path | Data inconsistency and false trust signals | Backend | TTL rules + cache consistency tests + kill switch | `S5-T02` | Open | - |
| `RISK-012` | Key management | Critical | Backup EOA key process not finalized | TEE failover impossible during incident | Platform/Ops | Secure key runbook and recovery drill before Sprint 5 exit | `S5-T03` | Open | - |
| `RISK-013` | Quality | High | Missing test evidence for traceability audit | Sprint 5 and RC gate blocked | QA | Enforce evidence checklist and owner accountability | `S5-T05`, `S6-T01` | Mitigating | `EVI-S5-TRACE` |
| `RISK-014` | Release | Critical | Open P0 defects at RC stage | Release blocked | QA + Backend | Daily triage, freeze scope, hotfix window | `S6-T01` | Open | - |
| `RISK-015` | Perf environment | Medium | Unstable load testing environment | Invalid benchmark and tuning decisions | Platform/Ops | Dedicated load env and repeatable test profile | `S6-T02` | Open | - |
| `RISK-016` | Demo | Medium | Incomplete demo dataset | Weak validation of judge flow | Product + Frontend | Build deterministic seeded demo dataset | `S6-T03` | Mitigating | - |
| `RISK-017` | Security | Critical | Unauthorized score updates on AgentReputation | Reputation integrity collapse | Smart Contract | Strict `onlyOwner` checks and Foundry regression tests | `S3-T01`, `S3-T02` | Closed | `EVI-S3-CONTRACT` |
| `RISK-018` | Security | High | Tampering with mirror payloads before hashing | Loss of auditability and trust | Backend | Compute and verify hash at the earliest interception point | `S1-T04`, `S3-T03` | Monitoring | `EVI-S1-INT`, `EVI-S3-CHAIN` |

---

## Review cadence

- Sprint planning: review all `Open` risks and assign owner actions.
- Mid-sprint: update status and escalation for `High`/`Critical`.
- Sprint exit: confirm no unresolved `Critical` risk for gate sign-off.

---

## Status workflow

- `Open` -> `Mitigating` -> `Monitoring` -> `Closed`
- If trigger occurs with active impact, mark `Escalated` and notify gate owner.
