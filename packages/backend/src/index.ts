/// <reference types="@cloudflare/workers-types" />
// Shim process for libraries that expect it (e.g. ethers, etc.)
if (typeof (globalThis as any).process === 'undefined') {
  (globalThis as any).process = { env: {} };
}
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { DecisionPayloadSchema } from '@unbox/shared';
import { D1DecisionStore } from './store/d1-decision-store.js';
import { D1ProofStore } from './store/d1-proof-store.js';
import { ExplanationWorker } from './workers/explanation-worker.js';
import { X402Gateway } from './gateway/x402-gateway.js';
import { MirrorEngine } from './engine/mirror-engine.js';
import { AgentAdapter } from './adapter/agent-adapter.js';
import { CounterfactualEngine } from './engine/counterfactual-engine.js';
import { ReputationService } from './services/reputation-service.js';
import { BlockchainService } from './services/blockchain-service.js';
import { AxBayesianOptimizer } from './skills/ax-optimizer.js';

type Bindings = {
  DB: D1Database;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_MODEL?: string;
  TREASURY_ADDRESS?: string;
  PRIVATE_KEY?: string;
  RPC_URL?: string;
  DECISION_LOG_ADDRESS?: string;
  REPUTATION_CONTRACT_ADDRESS?: string;
  UNBOX_GUARDRAIL_ADDRESS?: string;
  AGENT_TOKEN_ID?: string;
};

type Variables = {
  store: D1DecisionStore;
  proofStore: D1ProofStore;
  explainer: ExplanationWorker;
  mirrorEngine: MirrorEngine;
  gateway: X402Gateway;
};

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', cors());

// Middleware to inject core services into context
app.use('*', async (c, next) => {
  // We re-instantiate per request or lazily locally. 
  // Cloudflare often re-uses global state. We can keep singletons where safe.
  const store = new D1DecisionStore(c.env.DB);
  const proofStore = new D1ProofStore(c.env.DB);
  
  const explainer = new ExplanationWorker(c.env.OPENROUTER_API_KEY, c.env.OPENROUTER_MODEL);
  
  const gateway = new X402Gateway(c.env.TREASURY_ADDRESS);
  const blockchain = new BlockchainService(c.env as unknown as Record<string, string | undefined>);
  const reputation = new ReputationService(blockchain);
  const adapter = new AgentAdapter();
  const counterfactual = new CounterfactualEngine();
  const optimizer = new AxBayesianOptimizer();

  // Wire them up
  await gateway.setProofStore(proofStore as any); // Type cast until we update X402Gateway signature
  await gateway.setBlockchainService(blockchain);

  const agentTokenId = Number(c.env.AGENT_TOKEN_ID || '1');
  const mirrorEngine = new MirrorEngine(
    adapter, 
    store, 
    explainer, 
    counterfactual, 
    reputation, 
    blockchain, 
    optimizer,
    agentTokenId
  );

  c.set('store', store);
  c.set('proofStore', proofStore);
  c.set('explainer', explainer);
  c.set('mirrorEngine', mirrorEngine);
  c.set('gateway', gateway);

  await next();
});

app.get('/health', (c) => {
  return c.json({ status: 'ok' });
});

app.get('/api/decisions/:id', async (c) => {
  const store = c.get('store');
  const decisionId = c.req.param('id');
  const decision = await store.get(decisionId);
  if (!decision) {
    return c.json({ error: 'DECISION_NOT_FOUND' }, 404);
  }
  return c.json({ decision });
});

app.get('/api/decisions', async (c) => {
  const store = c.get('store');
  const mirrorEngine = c.get('mirrorEngine');
  let limit = Number(c.req.query('limit') ?? '50');
  if (Number.isNaN(limit) || limit < 1) limit = 1;
  if (limit > 100) limit = 100;

  if (limit <= 20) {
    const decisions = mirrorEngine.getRecent();
    // Using hot cache for <= 20
    if (decisions.length > 0) {
       return c.json({ decisions, source: 'hot_cache' });
    }
  }

  const decisions = await store.list(limit);
  return c.json({ decisions, source: 'd1_store' });
});

app.get('/api/stats', async (c) => {
  const store = c.get('store');
  const allDecisions = await store.list(100);
  
  const total = allDecisions.length;
  const blocked = allDecisions.filter((d) => d.action === 'block').length;
  const executed = allDecisions.filter((d) => d.action === 'execute').length;
  const blockRate = total === 0 ? 0 : Number(((blocked / total) * 100).toFixed(1));
  
  return c.json({
    stats: {
      totalDecisions: total,
      blockedDecisions: blocked,
      executedDecisions: executed,
      blockRatePercent: blockRate,
      systemPulse: 'healthy',
    }
  });
});

app.get('/api/global-risk', async (c) => {
  const store = c.get('store');
  const riskState = await store.getGlobalRiskState();
  return c.json({ riskState });
});

app.post('/api/mirror', async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch(e) {
    return c.json({ error: 'MALFORMED_JSON' }, 400);
  }

  const { context, action } = body;
  if (!context || !action) {
    return c.json({ error: 'MISSING_CONTEXT_OR_ACTION' }, 400);
  }

  const mirrorEngine = c.get('mirrorEngine');
  try {
    const decision = await mirrorEngine.mirrorDecision(context, action);
    return c.json({ decision }, 201);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

app.post('/api/explanations', async (c) => {
  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'MALFORMED_JSON' }, 400);
  }

  const parsed = DecisionPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'INVALID_DECISION_PAYLOAD' }, 400);
  }
  
  const explainer = c.get('explainer');
  const explanation = await explainer.explainDecision(parsed.data);
  return c.json({ explanation });
});

app.post('/api/feed/redeem', async (c) => {
  let payload;
  try {
    payload = await c.req.json();
  } catch {
    return c.json({ error: 'MALFORMED_JSON' }, 400);
  }

  if (!payload.proof) {
    return c.json({ error: 'MISSING_PROOF' }, 400);
  }
  
  const gateway = c.get('gateway');
  const result = await gateway.redeemAccess(payload.proof);
  return c.json(result);
});

export default app;
