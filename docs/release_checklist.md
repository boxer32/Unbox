# Unbox Release Checklist (Full V1)
**Directly derived from sprint exit criteria**

Use this checklist for release-readiness reviews from Sprint 1 to Sprint 6.

---

## Sprint 1 gate - Mirror foundation

- [ ] `REQ-MIRROR-001` implemented in staging.
- [ ] `REQ-MIRROR-002` implemented in staging.
- [ ] `REQ-MIRROR-003` implemented in staging.
- [ ] `REQ-MIRROR-005` implemented in staging.
- [ ] P95 intent-to-visible latency <= 500ms (`NFR-001`) in test environment.
- [ ] Evidence attached: [`EVI-S1-INT`](./release_evidence_index.md), [`EVI-S1-PERF`](./release_evidence_index.md).

Go/No-Go rule: all items must be checked before Sprint 2 closes.

---

## Sprint 2 gate - Explainability and counterfactual

- [x] All `REQ-CF-*` pass integration tests.
- [x] Counterfactual completion P95 <= 5s (`NFR-002`).
- [x] `REQ-MIRROR-004` block explanation flow is active in staging.
- [x] Evidence attached: [`EVI-S2-REPLAY`](./release_evidence_index.md), [`EVI-S2-PERF`](./release_evidence_index.md).

Go/No-Go rule: all items must be checked before Sprint 3 closes.

---

## Sprint 3 gate - Reputation and identity

- [x] `AgentReputation` contract deployed and non-transferable behavior verified (`REQ-REP-001`).
- [x] Weighted score formula verified on-chain (`REQ-REP-002`).
- [x] Score update synchronization budget confirmed (`REQ-REP-003`).
- [x] Historical score query verified via backend (`REQ-REP-004`).
- [x] PRD and test matrix requirement statuses are aligned for Sprint 3 scope.
- [x] Evidence attached: [`EVI-S3-CONTRACT`](./release_evidence_index.md), [`EVI-S3-CHAIN`](./release_evidence_index.md).

Go/No-Go rule: all items must be checked before Sprint 4 closes.

---

## Sprint 4 gate - x402 feed and settlement

- [x] All `REQ-FEED-*` tests pass end-to-end.
- [x] HTTP 402 challenge behavior verified (`REQ-FEED-001`).
- [x] No pre-payment data leakage (`REQ-FEED-002`).
- [x] Settlement follows 80/20 split (`REQ-FEED-003`).
- [x] Paid request P95 <= 3s (`REQ-FEED-004`).
- [x] Evidence attached: [`EVI-S4-E2E`](./release_evidence_index.md), [`EVI-S4-SETTLE`](./release_evidence_index.md).

Go/No-Go rule: all items must be checked before Sprint 5 closes.

---

## Sprint 5 gate - Hardening and observability

- [ ] All NFR metrics measured in staging.
- [ ] `NFR-001`/`NFR-002`/`NFR-003`/`NFR-004` are within target.
- [ ] Controlled demo uptime meets `NFR-005`.
- [ ] Traceability audit completed (`REQ/NFR -> TC -> evidence`).
- [ ] No orphan requirements in coverage matrix.
- [ ] Evidence attached: [`EVI-S5-OBS`](./release_evidence_index.md), [`EVI-S5-TRACE`](./release_evidence_index.md).

Go/No-Go rule: all items must be checked before Sprint 6 closes.

---

## Sprint 6 gate - Release candidate

- [ ] RC passes all critical test cases.
- [ ] Regression suite has no P0 or P1 unresolved defects.
- [ ] Load/perf benchmark signed off.
- [ ] Demo script and runbook rehearsed successfully.
- [ ] Deployment runbook validated via dry run.
- [ ] Release artifacts frozen and version-tagged.
- [ ] Evidence attached: [`EVI-S6-RC`](./release_evidence_index.md), [`EVI-S6-DRYRUN`](./release_evidence_index.md), [`EVI-S6-PACKAGE`](./release_evidence_index.md).

Go/No-Go rule: all items must be checked for production release.

---

## Final release sign-off

- [ ] Product sign-off
- [ ] Engineering sign-off
- [ ] QA sign-off
- [ ] Ops sign-off

Release decision:
- [ ] GO
- [ ] NO-GO

Decision notes:
- Date:
- Owner:
- Blocking issues (if any):
