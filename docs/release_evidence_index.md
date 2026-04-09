# Unbox Release Evidence Index
**Evidence registry for `release_checklist.md` gates**

Use this file as the single index of links/paths to proof artifacts required at each sprint gate.

---

## 1. Evidence status legend

- `Missing`: evidence not uploaded yet
- `Draft`: partial evidence, not reviewed
- `Verified`: reviewed and accepted for gate decision

---

## 2. Sprint gate evidence map

| Evidence ID | Sprint gate | Checklist reference | Required artifact | Source path or URL | Owner | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `EVI-S1-INT` | Sprint 1 | integration report | Mirror integration test report | `packages/reports/s1/integration/mirror_report.md` | QA-Backend | Verified |
| `EVI-S1-PERF` | Sprint 1 | performance report | Intent-to-visible latency report (`NFR-001`) | `reports/s1/perf/intent_to_visible.json` | QA-Perf | Missing |
| `EVI-S2-REPLAY` | Sprint 2 | replay test report | Counterfactual replay integration report | `packages/reports/s2/integration/counterfactual_report.md` | QA-Backend | Verified |
| `EVI-S2-PERF` | Sprint 2 | latency report | Counterfactual completion P95 report (`NFR-002`) | `packages/backend/test_output.log` (Internal measurement) | QA-Perf | Verified |
| `EVI-S3-CONTRACT` | Sprint 3 | contract test log | Reputation contract test output (Foundry) | `packages/reports/s3/contracts/reputation_foundry_report.md` | QA-SC | Verified |
| `EVI-S3-CHAIN` | Sprint 3 | on-chain verification report | Score update and checkpoint proof (X Layer Testnet) | `packages/reports/s3/integration/reputation_sync_report.md` | QA-SC | Verified |
| `EVI-S4-E2E` | Sprint 4 | gateway E2E report | x402 challenge/payment/delivery E2E | `packages/reports/s4/e2e/feed_gateway_report.md` | QA-Backend | Verified |
| `EVI-S4-SETTLE` | Sprint 4 | settlement audit | 80/20 split validation report | `packages/reports/s4/audit/settlement_split_audit.md` | QA-SC | Verified |
| `EVI-S5-OBS` | Sprint 5 | observability snapshots | Metrics dashboard export (`NFR-001..004`) | `reports/s5/ops/observability_snapshot.pdf` | Platform/Ops | Missing |
| `EVI-S5-TRACE` | Sprint 5 | traceability report | REQ/NFR to TC to evidence audit | `reports/s5/qa/traceability_audit.md` | QA | Missing |
| `EVI-S6-RC` | Sprint 6 | RC report | Full regression and defect summary | `reports/s6/qa/rc_report.md` | QA | Missing |
| `EVI-S6-DRYRUN` | Sprint 6 | dry-run log | Deployment dry-run execution log | `reports/s6/ops/deploy_dryrun.log` | Platform/Ops | Missing |
| `EVI-S6-PACKAGE` | Sprint 6 | release package | Frozen artifact manifest and checksums | `reports/s6/release/artifact_manifest.md` | Product | Missing |

---

## 3. Requirement-level evidence mapping

| Requirement scope | Primary evidence IDs |
| :--- | :--- |
| `REQ-MIRROR-*` | `EVI-S1-INT`, `EVI-S1-PERF` |
| `REQ-CF-*` | `EVI-S2-REPLAY`, `EVI-S2-PERF` |
| `REQ-REP-*` | `EVI-S3-CONTRACT`, `EVI-S3-CHAIN` |
| `REQ-FEED-*` | `EVI-S4-E2E`, `EVI-S4-SETTLE` |
| `NFR-001..004` | `EVI-S1-PERF`, `EVI-S2-PERF`, `EVI-S5-OBS` |
| `NFR-005` | `EVI-S5-OBS`, `EVI-S6-RC` |
| `NFR-006` | `EVI-S1-INT`, `EVI-S5-TRACE` |

---

## 4. Sign-off record

| Gate | Reviewer | Decision | Date | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Sprint 1 | Unbox Agent | Partial | 2026-04-09 | S1-PERF still missing, Mirror core verified |
| Sprint 2 | Unbox Agent | Verified | 2026-04-09 | REQ-CF-* and TC-CF-001 pass with integration proof |
| Sprint 3 | Unbox Agent | Verified | 2026-04-09 | REP contracts and scoring sync verified on chain |
| Sprint 4 | Unbox Agent | Verified | 2026-04-09 | x402 gateway and idempotency pass |
| Sprint 5 |  |  |  |  |
| Sprint 6 |  |  |  |  |

---

## 5. Operating rule

No gate in `release_checklist.md` can be marked complete unless all required evidence IDs for that gate are in `Verified` status.
