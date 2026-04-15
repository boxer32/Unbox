# Unbox UI — แผนการอัพเดท Dashboard และ Decision Detail

**วันที่:** April 2026  
**ขอบเขต:** Overview Dashboard + Decision Detail page  
**หลักการ:** เปลี่ยนจาก log viewer → diagnostic tool  
**PRD mapping:** REQ-MIRROR-001..005, REQ-CF-001..005, REQ-REP-002..004, NFR-001, NFR-003

---

## 1. ภาพรวมการเปลี่ยนแปลง

| ส่วน | ก่อน | หลัง |
|---|---|---|
| Overview Dashboard | Decision stream + metric cards | Anomaly detection + heatmap + causal chain inline + pattern sidebar |
| Decision Detail | Fields display | Forensic workstation: causal chain + counterfactual comparison + pattern context |
| Data source | `mockData` hardcoded | `GET /api/decisions` + `GET /api/stats` polling |
| Wallet connect | Fake `useState` | `<WalletConnect />` wagmi จริง |

---

## 2. Overview Dashboard (`mirror.lazy.tsx`)

### 2.1 Metric strip — เพิ่ม business signal

**เดิม:** total decisions, block rate, avg delta, Unbox score (static)  
**ใหม่:** ทุก metric มี delta เทียบ baseline

```tsx
// เดิม
<ForensicStat label="Total Decisions Mirrorred" value="12,481" delta="+1.2k" />

// ใหม่ — ดึงจาก /api/stats แทน hardcode
const { data: stats } = useQuery({
  queryKey: ['stats'],
  queryFn: () => fetch(`${BASE_URL}/api/stats`).then(r => r.json()),
  refetchInterval: 5000,
});
<MetricCard label="Decisions (24h)" value={stats?.totalDecisions} delta="+18 last hour" />
<MetricCard label="Block rate" value={`${stats?.blockRatePercent}%`} deltaWarning="+3.2% vs baseline" />
<MetricCard label="Avg delta (USD)" value="+$12.40" />
<MetricCard label="Unbox score" value={score?.weightedScore} />
```

### 2.2 Anomaly bar — ใหม่ทั้งหมด

แสดงเมื่อตรวจพบ pattern ผิดปกติ: block rate spike, flag cluster, oracle anomaly

```tsx
// logic: ถ้า blockRatePercent > baseline * 1.2 และมี flag เดิมซ้ำ >= 2 ครั้งใน 10 นาที
function detectAnomaly(decisions: DecisionPayload[]): AnomalySignal | null {
  const recent = decisions.filter(d => Date.now() - d.timestampMs < 10 * 60 * 1000);
  const flagCounts = countFlags(recent);
  const dominantFlag = Object.entries(flagCounts).find(([, count]) => count >= 2);
  if (!dominantFlag) return null;
  return {
    type: 'flag_cluster',
    flag: dominantFlag[0],
    count: dominantFlag[1],
    message: `${dominantFlag[0]} appearing ${dominantFlag[1]}x in last ${Math.round((Date.now() - recent[0].timestampMs) / 60000)} minutes`,
  };
}
```

**UI:** `border-left: 3px solid amber` + icon + message + sub-context + "Investigate →" link ไป detail page

### 2.3 Activity heatmap — ใหม่

24 column แทน 24 ชั่วโมง — สูงตาม volume, สีตาม dominant action

```tsx
function buildHourBuckets(decisions: DecisionPayload[]) {
  const buckets = Array.from({ length: 24 }, () => ({ execute: 0, block: 0, defer: 0 }));
  decisions.forEach(d => {
    const hour = new Date(d.timestampMs).getHours();
    buckets[hour][d.action]++;
  });
  return buckets;
}

// สี: block rate > 40% → red, > 20% → amber, else green
function bucketColor(bucket: Bucket) {
  const total = bucket.execute + bucket.block + bucket.defer;
  if (total === 0) return 'var(--color-border-tertiary)';
  const blockRate = bucket.block / total;
  if (blockRate > 0.4) return 'rgba(239,68,68,0.5)';
  if (blockRate > 0.2) return 'rgba(245,158,11,0.5)';
  return 'rgba(16,185,129,0.5)';
}
```

### 2.4 Decision stream — เพิ่ม columns

**เดิม:** action, intent, log ID, timestamp  
**ใหม่:** action, intent + risk flag inline, security score, block ref

```tsx
// เพิ่ม risk flag ใน intent cell
<td>
  <span className="intent-text">{decision.intentText}</span>
  {decision.action === 'block' && decision.securityScan.flags[0] && (
    <span className="flag-chip">{decision.securityScan.flags[0]}</span>
  )}
</td>
<td>
  <span className={scoreColor(decision.securityScan.score)}>
    {decision.securityScan.score}/100
  </span>
</td>
<td className="font-mono text-xs"># {decision.blockRef.toLocaleString()}</td>
```

### 2.5 Inline causal chain — ใหม่

แสดง causal chain ของ decision ล่าสุดที่เป็น `block` ด้านล่าง stream

```tsx
// หยิบ decision block ล่าสุดมาแสดง causal chain
const latestBlock = decisions.find(d => d.action === 'block');

<CausalChainPanel decision={latestBlock} />
```

### 2.6 Pattern sidebar — ใหม่

```tsx
// นับ flag cluster จาก decisions ทั้งหมด
function buildPatternSummary(decisions: DecisionPayload[]) {
  const flagMap: Record<string, number> = {};
  decisions.forEach(d => {
    d.securityScan.flags.forEach(f => {
      flagMap[f] = (flagMap[f] ?? 0) + 1;
    });
  });
  return Object.entries(flagMap)
    .sort((a, b) => b[1] - a[1])
    .map(([flag, count]) => ({ flag, count }));
}
```

### 2.7 แก้ DashboardLayout wallet connect

```tsx
// เดิม — fake
const [address, setAddress] = useState<string | null>(null);
const connectWallet = () => setAddress('0x71C...492d');

// ใหม่ — ลบ state ออก ใช้ <WalletConnect /> แทน
import { WalletConnect } from './WalletConnect';
// ใน header:
<WalletConnect />
```

---

## 3. Decision Detail (`decisions.$decisionId.tsx`)

### 3.1 Verdict header — redesign

เพิ่ม: explanation sentence โดด, score impact (-0.3), counterfactual loss avoided

```tsx
<div className="verdict-card">
  <div className="verdict-top">
    <ActionBadge action={decision.action} />
    <span className="score-impact">score impact: {scoreImpact(decision)}</span>
  </div>
  {/* explanation จาก backend ผ่าน /api/explanations หรือจาก decision.explanation */}
  <p className="verdict-explanation">{decision.explanation}</p>
  <div className="verdict-meta">
    <MetaItem label="intent" value={decision.intentText} />
    <MetaItem label="oracle" value={decision.marketState.oracleRef} />
    <MetaItem label="gas at decision" value={`${decision.marketState.gas} gwei`} />
    <MetaItem label="loss avoided" value={bestCounterfactualSaving(decision)} color="green" />
  </div>
</div>
```

### 3.2 Market state panel — forensic snapshot

```tsx
// แสดง 3 card: price, liquidity (+ concentration warning), gas
// เพิ่ม mini bar แสดง relative level เทียบ threshold
<SignalCard
  label="Pool liquidity"
  value={`$${decision.marketState.liquidity.toLocaleString()}`}
  sub={liquidityConcentration ? `${liquidityConcentration}% single wallet · critical` : 'normal'}
  level={decision.marketState.liquidity < 10000 ? 'critical' : 'normal'}
/>
```

### 3.3 Causal chain — 4 steps

ต้องแสดงลำดับที่ชัดเจน: Intent → Snapshot → Security scan → Decision

```tsx
interface CausalStep {
  id: 'intent' | 'snapshot' | 'security' | 'decision';
  status: 'pass' | 'fail' | 'neutral';
  title: string;
  reqId?: string;
  data: Record<string, string>;
  flags?: string[];
}

function buildCausalChain(decision: DecisionPayload): CausalStep[] {
  return [
    {
      id: 'intent',
      status: 'neutral',
      title: 'Intent formation',
      data: {
        goal: inferGoal(decision.intentText),
        'planned amount': extractAmount(decision.intentText),
        token: extractToken(decision.intentText),
      },
    },
    {
      id: 'snapshot',
      status: 'neutral',
      title: 'State snapshot captured',
      reqId: 'REQ-CF-001',
      data: {
        price: `$${decision.marketState.price}`,
        liquidity: `$${decision.marketState.liquidity.toLocaleString()}`,
        gas: `${decision.marketState.gas} gwei`,
        'block ref': `#${decision.blockRef.toLocaleString()}`,
      },
    },
    {
      id: 'security',
      status: decision.securityScan.score < 30 ? 'fail' : 'pass',
      title: 'Security scan',
      data: {
        score: `${decision.securityScan.score}/100`,
        flags: decision.securityScan.flags.join(', ') || 'none',
      },
      flags: decision.securityScan.flags,
    },
    {
      id: 'decision',
      status: decision.action === 'block' ? 'fail' : 'pass',
      title: `Decision: ${decision.action.toUpperCase()}`,
      reqId: 'REQ-MIRROR-001',
      data: {
        'rule triggered': decision.action === 'block'
          ? `score < threshold(30)` : 'score ≥ threshold',
        suppressed: decision.action === 'block' ? 'yes — no gas spent' : 'no',
        'loss avoided': bestCounterfactualSaving(decision),
      },
    },
  ];
}
```

### 3.4 Counterfactual comparison — 3 cards

```tsx
// replays มาจาก decision.replays (array ที่ save ไว้ใน FileDecisionStore)
{decision.replays?.map((replay) => (
  <CounterfactualCard
    key={replay.scenario}
    scenario={replay.scenario}
    usdDelta={replay.usdDelta}
    slippageDeltaPct={replay.slippageDeltaPct}
    gasDelta={replay.gasDelta}
    summary={replay.summary}
    isBest={isBestScenario(decision.action, replay)}
  />
))}

function isBestScenario(action: string, replay: CounterfactualResult): boolean {
  // ถ้า block: best = scenario ที่ usdDelta negative มากที่สุด (ยืนยัน block ถูกต้อง)
  // ถ้า execute: best = scenario ที่ usdDelta positive มากที่สุด
  if (action === 'block') return replay.scenario === 'wait_30s';
  return replay.scenario === 'alt_route';
}
```

### 3.5 Pattern context sidebar — ใหม่

```tsx
// หา decisions อื่นที่มี flag เดียวกันในวันนี้
function findRelatedDecisions(
  current: DecisionPayload,
  all: DecisionPayload[]
): DecisionPayload[] {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const currentFlags = new Set(current.securityScan.flags);

  return all
    .filter(d =>
      d.decisionId !== current.decisionId &&
      d.timestampMs >= todayStart.getTime() &&
      d.securityScan.flags.some(f => currentFlags.has(f))
    )
    .slice(0, 5);
}
```

### 3.6 Score impact breakdown

```tsx
function computeScoreImpact(decision: DecisionPayload) {
  // logic เดียวกับ ReputationService.evaluateDecision()
  const delta = { q: 0, s: 0, e: 0, t: 0 };
  if (decision.action === 'block') {
    delta.s = -2;
    delta.q = -1;
  } else if (decision.action === 'execute') {
    delta.e = +1;
  }
  delta.t = 0; // transparency always full if log is complete
  return delta;
}
```

### 3.7 Engineer actions

```tsx
// 4 actions ที่ engineer ใช้จริง
const actions = [
  {
    label: 'View raw payload JSON',
    onClick: () => openRawPayload(decision),
  },
  {
    label: 'Verify on-chain hash',
    onClick: () => verifyOnChain(decision.payloadHash),
  },
  {
    label: 'Diagnose risk threshold',
    onClick: () => navigateToThresholdAnalysis(decision),
  },
  {
    label: 'Export to Unbox Feed',
    onClick: () => exportToFeed(decision.decisionId),
  },
];
```

### 3.8 On-chain proof anchor — ย้ายให้เด่นขึ้น

```tsx
<div className="hash-anchor">
  <div className="verified-dot" />
  <div>
    <p>On-chain proof anchored — DecisionLog contract</p>
    <p className="hash">payloadHash: {decision.payloadHash}</p>
    {txHash && <p className="hash">txHash: {txHash}</p>}
  </div>
  <span className="verified-badge">verified</span>
</div>
```

---

## 4. Backend — endpoint ใหม่ที่ต้องเพิ่ม

### 4.1 `POST /api/mirror` — รับ decision จาก agent จริง

```ts
// packages/backend/src/index.ts
if (req.method === 'POST' && url.pathname === '/api/mirror') {
  const body = await readBody(req);
  let ctx: IntentContext & { action: DecisionAction };
  try {
    ctx = JSON.parse(body);
  } catch {
    writeJson(res, 400, { error: 'MALFORMED_JSON' });
    return;
  }
  // validate ด้วย Zod schema
  const result = await mirrorEngine.mirrorDecision(ctx, ctx.action);
  writeJson(res, 200, { decision: result });
  return;
}
```

### 4.2 `GET /api/decisions/:id` — ดึง decision เดียว

```ts
if (req.method === 'GET' && url.pathname.startsWith('/api/decisions/')) {
  const decisionId = url.pathname.split('/')[3];
  const decision = await store.get(decisionId);
  if (!decision) {
    writeJson(res, 404, { error: 'NOT_FOUND' });
    return;
  }
  writeJson(res, 200, { decision });
  return;
}
```

---

## 5. New components ที่ต้องสร้าง

| Component | ไฟล์ | REQ mapping |
|---|---|---|
| `<AnomalyBar />` | `components/AnomalyBar.tsx` | NFR-001, REQ-MIRROR-005 |
| `<ActivityHeatmap />` | `components/ActivityHeatmap.tsx` | NFR-001 |
| `<CausalChainPanel />` | `components/CausalChainPanel.tsx` | REQ-CF-001, REQ-MIRROR-001 |
| `<CounterfactualCard />` | `components/CounterfactualCard.tsx` | REQ-CF-002, REQ-CF-003, REQ-CF-004 |
| `<PatternSidebar />` | `components/PatternSidebar.tsx` | REQ-MIRROR-005 |
| `<ScoreImpactPanel />` | `components/ScoreImpactPanel.tsx` | REQ-REP-002, REQ-REP-003 |
| `<EngineerActions />` | `components/EngineerActions.tsx` | — |
| `<HashAnchor />` | `components/HashAnchor.tsx` | REQ-MIRROR-002 |

---

## 6. Utility functions ที่ต้องเพิ่มใน shared หรือ dashboard

```ts
// packages/dashboard/src/lib/analysis.ts

export function detectAnomaly(decisions: DecisionPayload[]): AnomalySignal | null
export function buildHourBuckets(decisions: DecisionPayload[]): HourBucket[]
export function buildPatternSummary(decisions: DecisionPayload[]): PatternEntry[]
export function buildCausalChain(decision: DecisionPayload): CausalStep[]
export function findRelatedDecisions(current: DecisionPayload, all: DecisionPayload[]): DecisionPayload[]
export function computeScoreImpact(decision: DecisionPayload): ScoreDelta
export function isBestScenario(action: string, replay: CounterfactualResult): boolean
export function scoreColor(score: number): string  // 'c-green' | 'c-amber' | 'c-red'
export function bestCounterfactualSaving(decision: DecisionPayload): string
```

---

## 7. Sprint mapping

| Task | ไฟล์หลัก | ขนาด | PRD |
|---|---|---|---|
| แก้ DashboardLayout wallet | `DashboardLayout.tsx` | S | — |
| เพิ่ม data fetching ใน mirror route | `mirror.lazy.tsx` | S | NFR-001 |
| สร้าง `analysis.ts` utilities | `lib/analysis.ts` | M | REQ-CF-001..005 |
| สร้าง `<AnomalyBar />` | `AnomalyBar.tsx` | S | NFR-001 |
| สร้าง `<ActivityHeatmap />` | `ActivityHeatmap.tsx` | S | NFR-001 |
| สร้าง `<CausalChainPanel />` | `CausalChainPanel.tsx` | M | REQ-CF-001 |
| Redesign metric strip | `mirror.lazy.tsx` | S | NFR-001 |
| เพิ่ม pattern sidebar | `mirror.lazy.tsx` | M | REQ-MIRROR-005 |
| Redesign Decision Detail | `decisions.$decisionId.tsx` | L | REQ-CF-002..005 |
| สร้าง `<CounterfactualCard />` | `CounterfactualCard.tsx` | S | REQ-CF-002..004 |
| สร้าง `<HashAnchor />` | `HashAnchor.tsx` | S | REQ-MIRROR-002 |
| เพิ่ม `POST /api/mirror` | `backend/src/index.ts` | S | REQ-MIRROR-001 |
| เพิ่ม `GET /api/decisions/:id` | `backend/src/index.ts` | S | REQ-MIRROR-002 |

---

## 8. Definition of done

- [ ] `mirror.lazy.tsx` ไม่มี `mockData` — ดึงจาก `GET /api/decisions` จริง
- [ ] `AnomalyBar` แสดงเมื่อ block rate spike หรือ flag cluster >= 2 ใน 10 นาที
- [ ] `ActivityHeatmap` encode สี block rate ถูกต้อง
- [ ] `CausalChainPanel` แสดง 4 steps ครบ พร้อม data จาก decision จริง
- [ ] Decision Detail แสดง `decision.explanation` และ `decision.replays` จาก backend
- [ ] `DashboardLayout` ใช้ `<WalletConnect />` แทน fake state — `isConnected` จาก wagmi ทำงาน
- [ ] `ReputationCard` โหลด score ได้หลัง wallet connect
- [ ] `POST /api/mirror` รับ decision จาก agent และ persist ได้
- [ ] `GET /api/decisions/:id` คืน decision เดียวสำหรับ detail page

---

*Unbox UI Update Plan · April 2026 · mapped to PRD v1.0*
