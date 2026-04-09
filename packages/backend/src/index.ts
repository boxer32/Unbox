import http from 'http';
import { URL } from 'url';
import { DecisionPayloadSchema } from '@unbox/shared';
import { FileDecisionStore } from './store/decision-store';
import { FileProofStore } from './store/proof-store';
import { ExplanationWorker } from './workers/explanation-worker';
import { X402Gateway } from './gateway/x402-gateway';

type JsonRecord = Record<string, unknown>;

const store = new FileDecisionStore();
const proofStore = new FileProofStore();
const explainer = new ExplanationWorker();
const gateway = new X402Gateway();

function writeJson(res: http.ServerResponse, status: number, payload: JsonRecord) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.end(JSON.stringify(payload));
}

async function readBody(req: http.IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

function deriveStats(decisions: Array<{ action: string }>) {
  const total = decisions.length;
  const blocked = decisions.filter((d) => d.action === 'block').length;
  const executed = decisions.filter((d) => d.action === 'execute').length;
  const blockRate = total === 0 ? 0 : Number(((blocked / total) * 100).toFixed(1));
  return {
    totalDecisions: total,
    blockedDecisions: blocked,
    executedDecisions: executed,
    blockRatePercent: blockRate,
    systemPulse: 'healthy',
  };
}

async function bootstrap() {
  await store.init();
  await proofStore.init();
  await gateway.setProofStore(proofStore);

  const server = http.createServer(async (req, res) => {
    if (!req.url || !req.method) {
      writeJson(res, 400, { error: 'INVALID_REQUEST' });
      return;
    }

    if (req.method === 'OPTIONS') {
      writeJson(res, 204, {});
      return;
    }

    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.pathname === '/health') {
      writeJson(res, 200, { status: 'ok' });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/decisions') {
      let limit = Number(url.searchParams.get('limit') ?? '50');
      if (Number.isNaN(limit) || limit < 1) limit = 1;
      if (limit > 100) limit = 100;
      
      const decisions = await store.list(limit);
      writeJson(res, 200, { decisions });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/stats') {
      const decisions = await store.list(500);
      writeJson(res, 200, { stats: deriveStats(decisions) });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/explanations') {
      const body = await readBody(req);
      let jsonBody: any;
      try {
        jsonBody = JSON.parse(body || '{}');
      } catch (err) {
        writeJson(res, 400, { error: 'MALFORMED_JSON' });
        return;
      }

      const parsed = DecisionPayloadSchema.safeParse(jsonBody);
      if (!parsed.success) {
        writeJson(res, 400, { error: 'INVALID_DECISION_PAYLOAD' });
        return;
      }
      const explanation = await explainer.explainBlock(parsed.data);
      writeJson(res, 200, { explanation });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/feed/redeem') {
      const body = await readBody(req);
      let payload: { proof?: string };
      try {
        payload = JSON.parse(body || '{}');
      } catch (err) {
        writeJson(res, 400, { error: 'MALFORMED_JSON' });
        return;
      }

      if (!payload.proof) {
        writeJson(res, 400, { error: 'MISSING_PROOF' });
        return;
      }
      const result = await gateway.redeemAccess(payload.proof);
      writeJson(res, 200, result);
      return;
    }

    writeJson(res, 404, { error: 'NOT_FOUND' });
  });

  const port = Number(process.env.PORT ?? '4000');
  server.listen(port, () => {
    console.log(`[Backend] API server listening on :${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('[Backend] Failed to start server', error);
  process.exit(1);
});
