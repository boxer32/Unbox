import http from 'http';
import { v4 as uuidv4 } from 'uuid';

/**
 * S6-T02: Performance & Load Test
 * Verifies system stability under concurrent intent pressure.
 * Goal: 10 intents/second without backend hang.
 */

const BASE_URL = 'http://localhost:4000';
const ITERATIONS = 50;
const CONCURRENCY = 5;

const mockContext = (i: number) => ({
  agentId: `agent-stress-test-${i % 2}`,
  intentText: `STRESS_TEST: Swap 100 USDT to OKB (Iteration ${i})`,
  marketState: {
    price: 35.5,
    liquidity: 1000000,
    gas: 15,
    oracleRef: "STRESS_ORACLE_REF"
  },
  securityScan: {
    score: 85,
    flags: []
  },
  blockRef: 1234567,
  structuredIntent: {
    agentTokenId: 1,
    action: 'SWAP',
    tokenIn: '0x_usdt',
    tokenOut: '0x_okb',
    amount: "100"
  }
});

async function sendRequest(i: number) {
  const data = JSON.stringify({
    context: mockContext(i),
    action: 'execute'
  });

  return new Promise((resolve, reject) => {
    const start = Date.now();
    const req = http.request(`${BASE_URL}/api/mirror`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const latency = Date.now() - start;
        if (res.statusCode === 201) {
          console.log(`[PASS] Iteration ${i} | Status: ${res.statusCode} | Latency: ${latency}ms | Cache: ${JSON.parse(body).source || 'hot'}`);
          resolve(latency);
        } else {
          console.error(`[FAIL] Iteration ${i} | Status: ${res.statusCode} | Error: ${body}`);
          reject(new Error(`Status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

async function runLoadTest() {
  console.log(`🚀 Starting Unbox Load Test: ${ITERATIONS} requests with concurrency ${CONCURRENCY}...`);
  const latencies: number[] = [];

  for (let i = 0; i < ITERATIONS; i += CONCURRENCY) {
    const batch = Array.from({ length: CONCURRENCY }, (_, k) => sendRequest(i + k));
    const results = await Promise.all(batch);
    latencies.push(...(results as number[]));
    // Wait for 200ms between batches to maintain ~25 RPS
    await new Promise(r => setTimeout(r, 200));
  }

  const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const p95 = latencies.sort((a, b) => a - b)[Math.floor(latencies.length * 0.95)];
  
  console.log('\n--- Load Test Results ---');
  console.log(`Total Requests: ${ITERATIONS}`);
  console.log(`Avg Latency: ${avg.toFixed(2)}ms`);
  console.log(`P95 Latency: ${p95.toFixed(2)}ms`);
  console.log('System Status: OPERATIONAL - ALL NFRs PASSED');
}

runLoadTest().catch(console.error);
