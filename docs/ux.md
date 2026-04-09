# Unbox UX Specification (Full V1)
**Aligned with `Unbox_PRD_v0.1.md` requirement IDs**

## 1. UX objective

This document defines the required user experience for Full V1. Every behavior maps to PRD requirement IDs (`REQ-*`) and non-functional IDs (`NFR-*`).

Primary UX outcome:
- Users can understand any decision outcome in under 10 seconds.
- New users can understand the product flow in under 2 minutes.
- Trust signals are visible and verifiable, not decorative.

---

## 2. Information architecture

1. **Overview Dashboard**
   - Decision stream
   - Live score summary
   - Feed monetization summary
2. **Decision Detail**
   - Intent and context
   - Block reason or execution outcome
   - Counterfactual comparison
3. **Agent Reputation**
   - Weighted score breakdown
   - Historical trend and checkpoints
4. **Feed Console**
   - x402 request status
   - Paid batch delivery and revenue split

---

## 3. Global UX rules

| Rule | Description | Mapped IDs |
| :--- | :--- | :--- |
| `UX-GLOBAL-001` | Every decision row must show final action (`execute`, `block`, `defer`) and timestamp. | `REQ-MIRROR-001`, `REQ-MIRROR-003` |
| `UX-GLOBAL-002` | If action is `block`, show human-readable reason by default, not hidden in tooltip. | `REQ-MIRROR-004` |
| `UX-GLOBAL-003` | Show live updates without manual refresh. | `REQ-MIRROR-005`, `NFR-001` |
| `UX-GLOBAL-004` | All score visuals must show exact numeric value and update time. | `REQ-REP-002`, `REQ-REP-003` |
| `UX-GLOBAL-005` | Any paid feed flow must show payment state before data is displayed. | `REQ-FEED-001`, `REQ-FEED-002` |
| `UX-GLOBAL-006` | First-time users see 'Orientation Guide' explaining Mirror -> Score -> Feed relationship. | `NFR-UX-001` |
| `UX-GLOBAL-007` | Use 'Forensic Evidence' tags for any data snapshot (Price/Liquidity) to signify verifiability. | `REQ-CF-001` |

---

## 4. Screen specifications

## 4.1 Overview Dashboard

### Purpose
Provide at-a-glance trust and performance status.

### Required components
1. **Decision Stream Panel**
   - Columns: decision ID, agent, action, risk summary, timestamp.
   - Color semantics: green execute, red block, amber defer.
2. **Live Metrics Strip**
   - Total decisions, block rate, avg delta, feed revenue.
3. **Score Snapshot Card**
   - Current Unbox Score and four-dimension mini breakdown.

### States
- Loading: skeleton rows and metric placeholders.
- Empty: "No decisions yet" with guidance text.
- Error: non-blocking banner with retry.
- Live: incremental updates within latency budget.

### Requirements mapping
- `REQ-MIRROR-001`, `REQ-MIRROR-003`, `REQ-MIRROR-005`
- `REQ-REP-002`, `REQ-REP-003`
- `NFR-001`, `NFR-003`

---

## 4.2 Decision Detail

### Purpose
Explain exactly what happened and what alternatives existed.

### Required components
1. **Intent and Context**
   - Human-readable intent
   - Snapshot fields: price, liquidity, gas, oracle.
2. **Outcome and Explanation**
   - Final action status
   - Block reason (if blocked) with measurable signals.
3. **Counterfactual Compare**
   - Baseline result vs 3 scenarios
   - Numeric deltas (`usdDelta`, `slippageDeltaPct`, `gasDelta`)
   - One-line synthesis per scenario

### UX constraints
- No hidden critical information behind hover-only UI.
- Deltas must use explicit sign (`+` or `-`) and unit.
- Show "as of block" reference for verifiability.

### Requirements mapping
- `REQ-MIRROR-003`, `REQ-MIRROR-004`
- `REQ-CF-001`, `REQ-CF-002`, `REQ-CF-003`, `REQ-CF-004`, `REQ-CF-005`
- `NFR-002`

---

## 4.3 Agent Reputation

### Purpose
Help users assess trust quality over time.

### Required components
1. **Score Header**
   - Current score (0-100)
   - Last updated block/time
2. **Dimension Breakdown**
   - Decision quality (35)
   - Security discipline (30)
   - Execution efficiency (20)
   - Transparency (15)
3. **History View**
   - Score trend by checkpoint/block
   - Clickable point to inspect contributing decisions

### Requirements mapping
- `REQ-REP-001`, `REQ-REP-002`, `REQ-REP-003`, `REQ-REP-004`
- `NFR-004`

---

## 4.4 Feed Console (x402)

### Purpose
Make machine-to-machine payment flow understandable for humans and debuggable for developers.

### Required components
1. **Request State Timeline**
   - Requested -> 402 challenge -> paid -> verified -> delivered
2. **Payment Spec Panel**
   - Asset, network, amount, expiry
3. **Delivery Result**
   - Batch ID, item count, latency
4. **Revenue Split Display**
   - 80% source agent, 20% protocol

### Requirements mapping
- `REQ-FEED-001`, `REQ-FEED-002`, `REQ-FEED-003`, `REQ-FEED-004`

---

## 5. Content and copy rules

| ID | Rule |
| :--- | :--- |
| `UX-COPY-001` | Block reason must be one concise sentence first, details second. |
| `UX-COPY-002` | Avoid vague labels like "failed check"; always name the risk signal. |
| `UX-COPY-003` | Use consistent terms from PRD terminology section only. |
| `UX-COPY-004` | All monetary deltas must include currency unit and precision policy. |

---

## 6. Visual system constraints (Full V1)

- Dark mode default with high-contrast status colors.
- Numbers-first layout for key metrics.
- Motion is functional only (state transitions), never decorative-only.
- Accessibility baseline:
  - Color is not the only status cue.
  - Keyboard navigation for all interactive controls.

---

## 7. UX Definition of Done

A UX feature is done only when:
1. It maps to at least one `REQ-*` or `NFR-*`.
2. Loading, empty, error, and live states are implemented.
3. Copy follows `UX-COPY-*` rules.
4. Interaction is testable in scripted demo and integration test.

---

## 8. Out of scope for Full V1

- Purely aesthetic-only charts without requirement mapping.
- Additional gamification layers unrelated to trust/accountability.
- New dimensions in score model beyond the four locked weights.