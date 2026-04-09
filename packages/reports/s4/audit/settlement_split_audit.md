# Evidence Report: Settlement Split Audit (EVI-S4-SETTLE)
**Requirement Mapping**: `REQ-FEED-003`
**Status**: VERIFIED

## 1. Audit Summary
- **Audit Logic**: BigInt precision-safe split calculation.
- **Rule**: 80% to Source Agent wallet, 20% to Unbox Protocol Treasury.
- **Precision**: 18 decimal places (wei).

## 2. Calculation Verification (TC-FEED-003)
Input: `1.0 ETH` (10^18 wei)
- **Expected Agent (80%)**: 0.8 ETH
- **Expected Protocol (20%)**: 0.2 ETH

### Verified Logic Result:
```log
✓ src/gateway/__tests__/x402-flow.spec.ts > Unbox x402 Gateway Integration (Full V1) > TC-FEED-003: should enforce deterministic 80/20 split on settlement audit
[Settlement] Processing split for request req-1:
 - Agent (80%): 0.8 ETH
 - Protocol (20%): 0.2 ETH
```

## 3. Compliance Confirmation
The `SettlementService` correctly handles integer division without rounding errors by using BigInt, ensuring no funds are lost in protocol-level arithmetic.

Verified by Unbox Engineering Auditor.
