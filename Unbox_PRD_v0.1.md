# PRODUCT REQUIREMENTS DOCUMENT: Unbox
**On-chain agent intelligence and accountability layer**

| Field | Detail |
| :--- | :--- |
| **Version** | v1.0 — Full Build Spec |
| **Product** | Unbox |
| **Codename** | AgentMirror |
| **Platform** | X Layer (OKX) + Onchain OS |
| **Author** | Solo Builder |
| **Date** | April 2026 |
| **Status** | Active spec (single source of truth) |

---

## 1. Product overview

### Mission
> "Agents should be accountable. Not just autonomous."

Unbox is an on-chain agent intelligence layer that logs, explains, and stress-tests every decision an AI agent makes before and after execution. Built on X Layer and Onchain OS, Unbox converts opaque agent behavior into transparent, verifiable, and monetizable intelligence.

### Problem
The agentic economy on X Layer is expanding, but agents remain black boxes: no clear block reason, no counterfactual explanation for underperformance, and no verifiable track record for trust.

### Product promise
Unbox delivers:
1. Explainable decisions (`Mirror`).
2. Quantified alternative outcomes (`Counterfactual`).
3. Verifiable historical trust (`Unbox Score` and soulbound identity).
4. Monetizable intelligence streams (`x402 Feed`).

---

## 2. Scope model

This document classifies every requirement as:
- **Committed (Full V1)**: must ship in this build.
- **Planned (V1.1+)**: likely next build, not required for V1 completion.
- **Experimental**: research track only.

Unless explicitly marked otherwise, requirements in this PRD are **Committed (Full V1)**.

---

## 3. Goals and measurable outcomes

| Goal | Metric | Target |
| :--- | :--- | :--- |
| Transparent decisions | Logged decisions with explainable state | 100% of executed/blocked decisions |
| Fast observability | Intent-to-log visible latency (P95) | <= 500ms |
| Useful counterfactuals | Decisions with replayed alternatives | 100% of logged decisions |
| Reputation correctness | Weighted score updates after each decision | <= 1 block after finalization |
| Feed monetization | Paid decision-batch fetches via x402 | >= 10 successful paid fetches |
| Onboarding clarity | First-time judge/user understanding | < 2 minutes |

---

## 4. Target users

| User type | Primary pain | Unbox value |
| :--- | :--- | :--- |
| Agent developer | Hard to debug why behavior failed | Decision timeline + block reason + replay delta |
| Agent operator | No live visibility into risk posture | Live score, risk flags, explanation history |
| Agent consumer | Cannot trust unknown agents | Verifiable on-chain score and historical decisions |
| Data buyer (agent) | Needs high-quality signals | x402-gated decision intelligence feed |

---

## 5. Functional requirements (with IDs)

### 5.1 Mirror and explainability

| ID | Requirement | Acceptance criteria | Status |
| :--- | :--- | :--- | :--- |
| `REQ-MIRROR-001` | Intercept every decision before signing. | Execute/block/defer paths are captured for each decision request. | Implemented |
| `REQ-MIRROR-002` | Persist decision payload off-chain and hash on-chain in `DecisionLog`. | Hash pointer exists on-chain and payload can be resolved deterministically. | Implemented |
| `REQ-MIRROR-003` | Log mandatory fields: timestamp, block, intent, market state, security scan, final action. | Missing-field rate is 0% in validation suite. | Implemented |
| `REQ-MIRROR-004` | Convert blocked decisions to plain-language explanation. | Explanation includes primary risk factor and at least one measurable signal. | Implemented |
| `REQ-MIRROR-005` | Emit event-first logs for indexers and dashboard consumers. | `DecisionLogged` event emitted once per decision lifecycle stage. | Implemented |

### 5.2 Counterfactual engine

| ID | Requirement | Acceptance criteria | Status |
| :--- | :--- | :--- | :--- |
| `REQ-CF-001` | Snapshot decision-time state (price, liquidity, gas, oracle). | Snapshot record created before final action. | Implemented |
| `REQ-CF-002` | Replay 3 scenarios: wait 30s, alternate route, action inversion. | Scenario outputs produced per decision with outcome delta. | Implemented |
| `REQ-CF-003` | Compute quantitative delta (`usdDelta`, `slippageDeltaPct`, `gasDelta`). | Delta fields populated and numerically valid. | Implemented |
| `REQ-CF-004` | Produce short natural-language synthesis. | Summary available for each replay and displayed in UI. | Implemented |
| `REQ-CF-005` | Store replay linkage to original decision record. | One-to-many relation queryable by decision ID. | Implemented |

### 5.3 Reputation and soulbound identity

| ID | Requirement | Acceptance criteria | Status |
| :--- | :--- | :--- | :--- |
| `REQ-REP-001` | Mint non-transferable agent identity token. | Transfer attempts revert; ownership remains constant. | Implemented |
| `REQ-REP-002` | Maintain weighted score: quality 35, security 30, efficiency 20, transparency 15. | On-chain score calculation equals reference implementation. | Implemented |
| `REQ-REP-003` | Update score and metadata after each finalized decision. | Score update observable <= 1 block from decision finalization. | Implemented |
| `REQ-REP-004` | Keep score auditability with historical checkpoint queries. | Historical score retrieval works by block range. | Implemented |

### 5.4 x402 feed and monetization

| ID | Requirement | Acceptance criteria | Status |
| :--- | :--- | :--- | :--- |
| `REQ-FEED-001` | Return HTTP 402 with payment spec on unpaid request. | Unpaid requests consistently receive valid x402 challenge. | Implemented |
| `REQ-FEED-002` | Verify payment before serving decision batch. | No data served before successful verification. | Implemented |
| `REQ-FEED-003` | Enforce revenue split 80/20 (source agent/protocol). | Accounting records and on-chain flows match split policy. | Implemented |
| `REQ-FEED-004` | Return paid data payload within SLA. | Paid request completion (P95) <= 3s. | Planned |

---

## 6. Non-functional requirements

| ID | Requirement | Target |
| :--- | :--- | :--- |
| `NFR-001` | Intent to mirror visibility latency (P95) | <= 500ms |
| `NFR-002` | Counterfactual compute completion (P95) | <= 5s |
| `NFR-003` | Dashboard initial load | <= 2s |
| `NFR-004` | On-chain confirmation on X Layer | <= 2 blocks |
| `NFR-005` | Full-system uptime during controlled demo | 100% |
| `NFR-006` | Missing mandatory decision fields | 0% |

---

## 7. Technical architecture (logical)

| Layer | Responsibility | Primary tech |
| :--- | :--- | :--- |
| Agent execution | Run strategy, security checks, signing path | Onchain OS MCP + Agentic Wallet |
| Mirror engine | Intercept decision, normalize payload, explain blocks | Node.js services + OpenRouter-routed synthesis |
| Counterfactual engine | Snapshot and replay alternatives | Simulation workers + market adapters |
| On-chain proof | Hash anchoring, score computation, identity token | Solidity on X Layer |
| Data gate | Payment challenge and paid delivery | x402 protocol |
| Dashboard | Decision timeline and trust UI | Vite + `@tanstack/react-router` + wagmi |

---

## 8. Risks and mitigations

| Risk | Mitigation |
| :--- | :--- |
| External API latency spike | Cache recent 20 decisions and degrade gracefully. |
| TEE signing instability | Keep backup EOA path and explicit failover runbook. |
| x402 payment rejection edge cases | Add idempotent verification and retry-safe settlement. |
| Chain congestion | Queue writes, preserve ordering, and show pending state in UI. |

---

## 9. Terminology and naming lock

- **Decision**: a single agent action proposal and its final action (`execute`, `block`, `defer`).
- **Mirror record**: normalized payload captured for a decision.
- **Counterfactual replay**: alternative scenario outcomes derived from snapshot.
- **Unbox Score**: weighted trust score computed from decision history.
- **Agent identity token**: non-transferable score-carrying token (soulbound behavior).
- **Decision batch**: feed payload sold through x402.

Use these terms consistently across `docs/ux.md` and `docs/engineer.md`.

---

## 10. Traceability policy

All UX behaviors and engineering components must reference at least one `REQ-*` or `NFR-*` ID from this PRD. Any item without ID mapping is out of scope for Full V1.

---
*Unbox PRD v1.0 — Full Build Spec — April 2026*
