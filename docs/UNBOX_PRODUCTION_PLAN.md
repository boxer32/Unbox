# Unbox — Production Readiness Plan

**Date:** April 15, 2026  
**Build:** Full V1 + V1.5 Active Optimizer  
**Target:** Hackathon submission — X Layer Arena (OKX)  
**Code review status:** A+ (2 test fixes pending, all P0 bugs resolved)

---

## สถานะปัจจุบัน

| Layer | สถานะ | หมายเหตุ |
|---|---|---|
| Smart Contracts | ✅ Deployed (testnet) | DecisionLog, AgentReputation, UnboxGuardrail on X Layer |
| Backend API | ✅ Working | 6 endpoints, MirrorEngine + Optimizer pipeline |
| Dashboard | ✅ Working | Clerk auth, wagmi wallet, real API, all components |
| Integration tests | ⚠️ 2 test fixes pending | explainBlock→explainDecision, mirror.lazy→mirror |
| Demo data | ✅ Seeded | 15+ decisions ใน packages/backend/data/decisions/ |

---

## Phase 1 — แก้ก่อน submit (วันนี้)

### 1.1 Fix failing tests (ต้อง run `npm test` ผ่านก่อน)

**เวลาที่ใช้: ~15 นาที**

```bash
# Fix 1: explanation-worker.spec.ts — เปลี่ยน method name 5 จุด
# เดิม: worker.explainBlock(...)
# ใหม่: worker.explainDecision(...)
sed -i 's/explainBlock/explainDecision/g' \
  packages/backend/src/workers/__tests__/explanation-worker.spec.ts

# Fix 2: mirror_api_source.spec.ts — เปลี่ยน path 1 จุด
# เดิม: '../dashboard/src/routes/mirror.lazy.tsx'
# ใหม่: '../dashboard/src/routes/mirror.tsx'
sed -i "s/mirror.lazy.tsx/mirror.tsx/" \
  packages/backend/tests/integration/dashboard/mirror_api_source.spec.ts

# ตรวจสอบ
cd packages/backend && npm test
```

**Expected output:**
```
✓ explanation-worker.spec.ts (5 tests)
✓ mirror_api_source.spec.ts (1 test)
✓ All suites passed
```

### 1.2 ตรวจสอบ environment variables

สร้าง `packages/backend/.env` ก่อน start server:

```bash
# Required — ต้องมีก่อน start
PRIVATE_KEY=0x...           # wallet key ที่ deploy contract
OPENROUTER_API_KEY=sk-or-... # สำหรับ structured explanation

# Contracts (deployed บน X Layer testnet)
DECISION_LOG_ADDRESS=0x3aAde2dCD2Df6a8cAc689EE797591b2913658659
AGENT_REPUTATION_ADDRESS=0xffa7CA1AEEEbBc30C874d32C7e22F052BbEa0429
UNBOX_GUARDRAIL_ADDRESS=0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926

# Optional — defaults ใช้ได้ถ้าไม่มี
RPC_URL=https://testrpc.xlayer.tech/terigon
PORT=4000
```

สร้าง `packages/dashboard/.env`:

```bash
VITE_BACKEND_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...  # จาก Clerk dashboard
```

### 1.3 ตรวจสอบ data directory

```bash
# ตรวจ path ที่ใช้จริง
ls packages/backend/data/decisions/

# ควรเห็น 15+ ไฟล์ รวมถึง
# - global-risk-cache.json
# - dd6a700f-...json (block decision)
# - e4d59c3c-...json (execute decision)

# ถ้าว่าง — seed data ด้วย simulation
cd packages/backend
npx tsx scratch/simulate-circuit-breaker.ts
```

---

## Phase 2 — ตรวจสอบ end-to-end ก่อน demo

### 2.1 Start stack และตรวจ smoke test

```bash
# Terminal 1: Backend
cd packages/backend
npm run build && npm start
# ต้องเห็น: [Backend] API server listening on :4000

# Terminal 2: Dashboard  
cd packages/dashboard
npm run build && npm run preview
# ต้องเห็น: Local: http://localhost:4173

# Smoke tests (Terminal 3)
curl http://localhost:4000/health
# Expected: {"status":"ok"}

curl http://localhost:4000/api/stats
# Expected: {"stats":{"totalDecisions":N,"blockRatePercent":N,...}}

curl http://localhost:4000/api/decisions?limit=5
# Expected: {"decisions":[...]} — ต้องมี data

curl http://localhost:4000/api/global-risk
# Expected: {"flags":[...],"targets":[...]}
```

### 2.2 ตรวจ Dashboard flows

เปิด http://localhost:4173 และตรวจแต่ละ flow:

| Flow | สิ่งที่ต้องเห็น | Pass/Fail |
|---|---|---|
| Landing page | stats จาก API (ไม่ใช่ 0 ทั้งหมด) | — |
| Sign in (Clerk) | modal popup, redirect หลัง sign in | — |
| Mirror page | decisions จาก API, AnomalyBar, Heatmap | — |
| คลิก decision row | เข้า detail page ได้, replays แสดง | — |
| Causal chain | 4 steps แสดงครบ: Intent → Snapshot → Security → Decision | — |
| Counterfactual | 3 cards แสดง, "Representative Scenario" badge | — |
| Feed page | 402 challenge เมื่อยังไม่ pay | — |
| Wallet connect | MetaMask connect ได้, address แสดง | — |
| ReputationCard | โหลด score จาก on-chain หลัง connect | — |

### 2.3 ตรวจ on-chain proof

```bash
# ตรวจ decision บน explorer
# เอา payloadHash จาก decision JSON แล้วค้นใน X Layer explorer
open "https://www.oklink.com/xlayer-test/search/0x..."

# ตรวจ contract ที่ deploy
cast call 0x3aAde2dCD2Df6a8cAc689EE797591b2913658659 \
  "owner()(address)" \
  --rpc-url https://testrpc.xlayer.tech/terigon

cast call 0xffa7CA1AEEEbBc30C874d32C7e22F052BbEa0429 \
  "getScore(uint256)(uint256,uint256,uint256,uint256,uint256,uint256)" 1 \
  --rpc-url https://testrpc.xlayer.tech/terigon
```

---

## Phase 3 — Demo data preparation

### 3.1 Seed demo decisions ที่หลากหลาย

Demo ต้องการ decisions ที่ครอบคลุม 3 scenarios หลัก:

```bash
# Run simulation เพื่อสร้าง decisions ใหม่
cd packages/backend

# Scenario 1: Blocked by Guardrail (risky meme token)
npx tsx scratch/simulate-circuit-breaker.ts

# Scenario 2: Execute + optimize (ETH→USDC)
# decisions เหล่านี้มีอยู่แล้วใน data/decisions/
# ตรวจสอบว่ามีทั้ง execute และ block
ls data/decisions/ | wc -l  # ควรมี >= 10 files
```

### 3.2 ตรวจ demo data quality

decisions ที่ดีสำหรับ demo ต้องมีครบ:

```bash
# ตรวจ block decision ที่มี explanation ครบ
cat packages/backend/data/decisions/dd6a700f-4ba8-4e79-9890-eb1af4b92917.json | \
  python3 -c "import json,sys; d=json.load(sys.stdin); print('flags:', d['securityScan']['flags'], 'replays:', len(d.get('replays',[])))"

# ตรวจ execute decision ที่มี optimization
cat packages/backend/data/decisions/e4d59c3c-e202-4908-9be9-3ecbfa9c3a25.json | \
  python3 -c "import json,sys; d=json.load(sys.stdin); print('opt:', 'optimization' in d, 'replays:', len(d.get('replays',[])))"
```

### 3.3 Demo script path (อ้างอิง docs/DEMO_SCRIPT.md)

เวลา demo ให้เดิน path นี้:

1. **Landing page** (~30s) — แสดง stats live, อธิบาย mission
2. **Mirror page** (~60s) — แสดง decision stream, AnomalyBar, Heatmap
3. **Decision Detail** (~90s) — คลิก block decision, แสดง causal chain + counterfactual
4. **OptimizationPanel** (~30s) — แสดง Bayesian route optimization
5. **Feed page** (~60s) — demo x402 payment flow
6. **On-chain proof** (~30s) — เปิด X Layer explorer แสดง hash

---

## Phase 4 — ความเสี่ยงและ failover

### 4.1 ความเสี่ยงที่ต้องเตรียมรับ

| ความเสี่ยง | โอกาส | แผนสำรอง |
|---|---|---|
| X Layer testnet RPC ล่ม | สูง | ใช้ demo data ที่มีอยู่, ไม่ต้องพึ่ง live chain |
| OpenRouter API quota หมด | กลาง | template explanation fallback ทำงานอัตโนมัติ |
| Clerk auth ล่ม | ต่ำ | ลบ beforeLoad auth guard ชั่วคราว |
| MetaMask ไม่ connect | กลาง | ReputationCard ยัง render score default |
| Backend crash | ต่ำ | npm start ใหม่ใน < 10 วินาที, data ยังอยู่ |

### 4.2 Pre-demo checklist (30 นาทีก่อน present)

```bash
# 1. ตรวจ backend alive
curl http://localhost:4000/health

# 2. ตรวจ decisions มีอยู่
curl http://localhost:4000/api/decisions?limit=3

# 3. ตรวจ RPC connection
cast block-number --rpc-url https://testrpc.xlayer.tech/terigon

# 4. เปิด browser tabs ไว้ล่วงหน้า
# - localhost:4173 (dashboard)
# - xlayer-explorer.okx.com (on-chain proof)
# - openrouter.ai/keys (ถ้าต้องตรวจ quota)

# 5. ตรวจ Clerk sign-in ทำงาน
# sign out แล้ว sign in ใหม่ ตรวจว่า redirect ถูกต้อง
```

### 4.3 Failover steps (อ้างอิง docs/FAILOVER_RUNBOOK.md)

**ถ้า RPC ล่มระหว่าง demo:**
- dashboard ยังแสดง decisions จาก FileDecisionStore ได้ตามปกติ
- บอก judge ว่า off-chain data ยังครบ, on-chain anchoring เป็น async queue
- แสดง payloadHash ใน decision JSON แทนการ verify live

**ถ้า OpenRouter ล่ม:**
- ExplanationWorker fallback เป็น template explanation อัตโนมัติ
- ไม่มีผลต่อ decision capture, replay, หรือ scoring
- บอก judge ว่า AI explanation gracefully degrade

**ถ้า Clerk ล่ม:**
- ลบ `<Show when="signed-out">` wrapper ใน DashboardLayout ชั่วคราว
- แสดงทุก page โดยไม่มี auth gate
- เวลาแก้: ~5 นาที

---

## Phase 5 — สิ่งที่ควรทำหลัง submit (V1.1)

### ลำดับ priority สูงสุด

**Security:**
- smart contract audit โดย third party (ปัจจุบัน self-reviewed เท่านั้น)
- ลบ PRIVATE_KEY จาก environment ใช้ HSM หรือ KMS แทน
- เพิ่ม rate limiting บน POST /api/mirror เพื่อป้องกัน spam

**Reliability:**
- แทน FileDecisionStore ด้วย database จริง (PostgreSQL หรือ SQLite) เพื่อ concurrent access
- เพิ่ม health check endpoint ที่ตรวจ blockchain connection
- implement circuit breaker สำหรับ OpenRouter call

**Observability:**
- เพิ่ม structured logging (winston หรือ pino) แทน console.log
- export metrics สำหรับ NFR measurement (latency P95 จริง)
- สร้าง ops dashboard สำหรับ EVI-S5-OBS

**Performance:**
- run load test ตาม `packages/backend/scripts/load-test.ts`
- ตรวจ P95 latency สำหรับ NFR-001 (500ms), NFR-002 (5s), NFR-003 (2s)
- optimize FileDecisionStore list() ถ้า decisions > 1000 ไฟล์

---

## สรุปสถานะ checklist

### Sprint 5 gate (hardening)
- [ ] NFR metrics วัดใน staging
- [x] S5-T04 chain congestion queue — done (BlockchainService queue)
- [ ] S5-T01 observability dashboard — Todo
- [ ] S5-T02 API spike fallback cache — Todo
- [ ] S5-T05 traceability audit — Todo

### Sprint 6 gate (release candidate)
- [ ] RC regression suite pass (2 test fixes ต้องทำก่อน)
- [ ] Load/perf benchmark
- [ ] Demo script rehearsal — docs/DEMO_SCRIPT.md พร้อม
- [ ] Deployment runbook dry-run

### Release checklist ที่ผ่านแล้ว (Sprint 1–4)
- [x] REQ-MIRROR-001..005 implemented
- [x] REQ-CF-001..005 implemented  
- [x] REQ-REP-001..004 implemented
- [x] REQ-FEED-001..003 implemented
- [x] Contracts deployed on X Layer testnet
- [x] Dashboard real API (no mockData)
- [x] Auth gate (Clerk) working
- [x] Wallet connect (wagmi) working
- [x] on-chain proof anchoring working

---

## คำสั่งสรุปสำหรับ submit

```bash
# Step 1: Fix tests
sed -i 's/explainBlock/explainDecision/g' \
  packages/backend/src/workers/__tests__/explanation-worker.spec.ts
sed -i "s/mirror.lazy.tsx/mirror.tsx/" \
  packages/backend/tests/integration/dashboard/mirror_api_source.spec.ts

# Step 2: Run all tests
cd packages/backend && npm test
cd packages/contracts && forge test

# Step 3: Build production assets
cd packages/shared && npm run build
cd packages/backend && npm run build
cd packages/dashboard && npm run build

# Step 4: ตรวจ dashboard build output
ls packages/dashboard/dist/

# Step 5: Start production server
cd packages/backend && npm start
```

**Contract addresses บน X Layer testnet (confirmed):**
```
DecisionLog:     0x3aAde2dCD2Df6a8cAc689EE797591b2913658659
AgentReputation: 0xffa7CA1AEEEbBc30C874d32C7e22F052BbEa0429
UnboxGuardrail:  0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926
```

---

*Unbox Production Plan · April 15, 2026 · V1 + V1.5 Active Optimizer*
