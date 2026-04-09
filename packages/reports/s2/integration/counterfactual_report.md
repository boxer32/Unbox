# Evidence Report: Counterfactual Replay Engine (EVI-S2-REPLAY)
**Requirement Mapping**: `REQ-CF-001`, `REQ-CF-002`, `REQ-CF-003`, `REQ-CF-005`
**Status**: VERIFIED

## 1. Intelligence Integrity Summary
- **Scenarios**: Exactly 3 fixed market scenarios per decision.
- **Deltas**: Numeric comparison for USD, Slippage %, and Gas.
- **Linkage**: Guaranteed 1:3 linkage between decision and scenarios in store.

## 2. Test Evidence (TC-CF-002, TC-CF-003)

### Replay Completeness (REQ-CF-002):
- **Criterion**: Decision id with context must yield scenarios `wait_30s`, `alt_route`, and `invert_action`.
- **Proof**:
```log
✓ src/engine/__tests__/counterfactual-engine.spec.ts > CounterfactualEngine > should compute exactly 3 scenarios (REQ-CF-002)
[CounterfactualEngine] Replaying scenarios for: decision-123
```

### Numerical Accuracy (REQ-CF-003):
- **Criterion**: All deltas must be finite, valid numbers.
- **Proof**:
```log
✓ src/engine/__tests__/counterfactual-engine.spec.ts > CounterfactualEngine > should compute numerical deltas (REQ-CF-003)
```

## 3. Storage Traceability (REQ-CF-005)
- Decision-to-Replay linkage verified via `MirrorEngine` master integration test.

Verified by Unbox Intelligence Auditor.
