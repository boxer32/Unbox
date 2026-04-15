ปัญหา Critical — ต้องแก้ก่อน demo

P0
decisions.$decisionId.tsx — beforeLoad auth check จะ crash ทุก user
packages/dashboard/src/routes/decisions.$decisionId.tsx : line 9193-9197
beforeLoad ทำ redirect ถ้า !context.auth.isSignedIn แต่ไม่มี auth context ถูก setup ใน router ถ้า context.auth ไม่มี หรือ isSignedIn เป็น undefined ทุก user จะถูก redirect กลับ "/" ทันที — decision detail จะเข้าไม่ได้เลย mirror.tsx มี pattern เดียวกันแต่ยังพอไปได้ถ้า context.auth.isSignedIn เป็น falsy แทนที่จะ throw error
P0
verify-sync.ts scratch file — ReputationService() ไม่มี argument
packages/backend/scratch/verify-sync.ts : line 4263
เรียก new ReputationService() โดยไม่ส่ง BlockchainService — constructor ต้องการ required param แล้ว ถ้า CI หรือ test runner ครอบ scratch/ ด้วย จะ fail ทันที ควรลบ scratch file นี้ออกหรือ fix ก่อน commit ต่อไป
P0
data/ directory ที่ root — decisions เก็บผิดที่
./data/decisions/ (root level, ไม่ใช่ ./packages/backend/data/)
simulation script เขียน decisions ลง ./data/decisions/ (root) แต่ backend server อ่านจาก packages/backend/data/decisions/ — decisions จาก simulation จะไม่โชว์ใน dashboard เลย เพราะ FileDecisionStore ใช้ process.cwd() ซึ่งขึ้นอยู่กับว่า start server จากที่ไหน ถ้า start จาก root = ถูก, start จาก packages/backend = ผิด ต้องทำให้ path consistent หรือ hardcode absolute path
P0
decision.replays อาจเป็น undefined — crash ใน detail page
packages/dashboard/src/routes/decisions.$decisionId.tsx : line 9309
decision.replays.map(...) — ถ้า decision ไม่มี replays (เช่น decisions เก่าที่ไม่ได้ถูก process ผ่าน MirrorEngine ใหม่) จะ throw TypeError: Cannot read properties of undefined ไม่มี optional chaining หรือ fallback array ต้องเปลี่ยนเป็น (decision.replays ?? []).map(...)
ปัญหา Medium — ควรแก้ก่อน submit

P1
getGlobalRiskState() ใช้ d.targetAddress — field ไม่มีใน schema เดิม
packages/backend/src/store/decision-store.ts : line 6525
code เข้าถึง d.targetAddress แต่ DecisionPayloadSchema มี targetAddress เป็น z.string().optional() — decisions เก่าทั้งหมดไม่มี field นี้ ดังนั้น targets array จะว่างเปล่าเสมอแม้จะมี block decisions อยู่มาก endpoint /api/global-risk จะส่ง data ที่ไม่สมบูรณ์กลับไป
P1
Unbox Score คำนวณผิดใน mirror.tsx
packages/dashboard/src/routes/mirror.tsx : line 9478
Math.max(0, 100 - stats.blockRatePercent) ไม่ใช่ Unbox Score จริง — นี่คือ derived approximation ไม่ใช่ weighted score จาก AgentReputation contract ถ้า block rate สูง score จะดูต่ำผิดความเป็นจริง ควรดึงจาก ReputationCard หรือ on-chain โดยตรงแทน
P1
rpcUrl เปลี่ยนเป็น X Layer testnet จริง — แต่ไม่มี fallback
packages/shared/types/runtime-config.ts : LOCAL_DEFAULTS.rpcUrl
default เปลี่ยนจาก localhost:8545 เป็น https://testrpc.xlayer.tech/terigon ซึ่งดี แต่ถ้า testnet ล่มหรือ network ไม่พร้อม BlockchainService จะ fail แบบไม่มี fallback ใน demo environment ที่ connectivity ไม่แน่นอน ควรมี try-catch และ fallback graceful ใน BlockchainService.getAgentScore()
P1
OptimizationPanel ไม่อยู่ใน flatten — ไม่รู้ว่า implement จริงไหม
packages/dashboard/src/components/OptimizationPanel.tsx (imported แต่ไม่เห็น code)
decisions.$decisionId.tsx import OptimizationPanel แต่ไม่มี source ใน flatten นี้ ถ้า file นี้ไม่มีจริงหรือ export ไม่ถูกต้อง build จะ fail ทันที ต้องตรวจสอบว่า component นี้มีจริงและ export ถูกต้อง เช่นเดียวกับ CausalChainPanel, CounterfactualCard, EngineerActions, HashAnchor, ScoreImpactPanel
ข้อสังเกต (ไม่ blocking)

Note
simulation run สำเร็จ — decision จริง 2 ตัวอยู่ใน data/
เห็น b33d5d26 (execute) และ a211c99a (block) ใน root data/ มี optimization field และ replays ครบ — proof ว่า V1.5 Handshake Simulation รันจริง circuit breaker จาก explanation "Trade blocked due to multiple..." แต่ยังไม่ใช่ BLOCKED_BY_ONCHAIN_GUARDRAIL จริง (Guardrail contract call อาจยังไม่ connect)
Note
Decision latency hardcoded ที่ 142ms
decisions.$decisionId.tsx มีข้อความ "Decision Latency: 142ms" hardcoded ใน JSX ควรคำนวณจาก timestamp จริงหรือระบุว่าเป็น simulated value
Note
mirror.tsx ไม่ใช่ lazy route แล้ว — เปลี่ยนเป็น regular route
เดิม mirror.lazy.tsx ตอนนี้เป็น mirror.tsx และ routeTree.gen.ts ก็ update แล้ว ดี — ลด complexity ของ lazy loading ที่ไม่จำเป็นสำหรับ demo
Note
docs มีไฟล์ซ้ำ UNBOX_UI_UPDATE_PLAN 2.md
ทั้ง UNBOX_UI_UPDATE_PLAN.md และ UNBOX_UI_UPDATE_PLAN 2.md อยู่ใน docs/ ควรลบ duplicate ออกเพื่อไม่ให้ AI agent อ่านสับสน
Action list — เรียงตาม priority

1
แก้ beforeLoad auth check — ลบออกหรือ implement auth context จริงก่อน demo มิฉะนั้น detail page เข้าไม่ได้
2
แก้ decision.replays?.map(...) — ใส่ optional chaining หรือ ?? [] ทุก access
3
Fix data directory path — ทำให้ consistent ระหว่าง simulation และ server
4
Fix verify-sync.ts scratch — ส่ง mock BlockchainService หรือลบทิ้ง
5
ตรวจสอบ OptimizationPanel และ component อื่นๆ ว่า export ถูกต้องก่อน build
6
แก้ Unbox Score ใน mirror.tsx ให้ดึงจาก wagmi แทนการคำนวณจาก blockRate
7
ลบ UNBOX_UI_UPDATE_PLAN 2.md (duplicate) ออกจาก docs/