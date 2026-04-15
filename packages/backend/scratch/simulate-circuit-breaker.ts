import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { MirrorEngine } from '../src/engine/mirror-engine.js';
import { AgentAdapter } from '../src/adapter/agent-adapter.js';
import { FileDecisionStore } from '../src/store/decision-store.js';
import { ExplanationWorker } from '../src/workers/explanation-worker.js';
import { CounterfactualEngine } from '../src/engine/counterfactual-engine.js';
import { ReputationService } from '../src/services/reputation-service.js';
import { BlockchainService } from '../src/services/blockchain-service.js';
import { AxBayesianOptimizer } from '../src/skills/ax-optimizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from current package root
dotenv.config({ path: join(__dirname, '../.env') });

async function runSimulation() {
  console.log('--- Unbox V1.5 Handshake Simulation ---');
  
  // 1. Setup Backend Stack
  const store = new FileDecisionStore();
  const explainer = new ExplanationWorker();
  const adapter = new AgentAdapter();
  const counterfactual = new CounterfactualEngine();
  const optimizer = new AxBayesianOptimizer();
  
  const blockchain = new BlockchainService();
  const reputation = new ReputationService(blockchain);
  
  const mirrorEngine = new MirrorEngine(
    adapter, 
    store, 
    explainer, 
    counterfactual, 
    reputation, 
    blockchain,
    optimizer
  );

  await store.init();

  // 2. Define Risky Intent for Agent ID 1 (Low Reputation)
  const context = {
    agentId: 'agent-1',
    intentText: 'Swap 10 ETH for $MEME token on Uniswap V3',
    marketState: {
      price: 2500,
      liquidity: 1000000,
      gas: 20,
      oracleRef: 'chainlink-eth-usd'
    },
    securityScan: {
      score: 45, // Low local scan
      flags: ['HIGH_SLIPPAGE', 'UNVERIFIED_TOKEN']
    },
    blockRef: 27618000,
    // The structured intent that triggers the Guardian Handshake
    structuredIntent: {
      agentTokenId: 1, // Our sabotaged agent
      action: 'SWAP' as const,
      tokenIn: '0xETH',
      tokenOut: '0xMEME',
      amount: '10000000000000000000'
    }
  };

  const action = 'execute' as const;

  console.log(`\n[Sim] Triggering mirror event for Agent ${context.structuredIntent.agentTokenId}...`);
  console.log(`[Sim] Expected Outcome: BLOCKED BY ON-CHAIN GUARDRAIL (Reputation 20 < 50)`);

  try {
    const payload = await mirrorEngine.mirrorDecision(context as any, action);
    
    console.log('\n--- Simulation Result ---');
    console.log(`Decision ID: ${payload.decisionId}`);
    console.log(`Status: ${payload.action.toUpperCase()}`);
    console.log(`Reason: ${payload.explanation}`);
    
    if (payload.action === 'block' && payload.explanation?.includes('BLOCKED_BY_ONCHAIN_GUARDRAIL')) {
      console.log('\n✅ SUCCESS: Circuit Breaker triggered successfully on-chain.');
    } else {
      console.log('\n❌ FAILURE: Circuit Breaker did not trigger as expected.');
    }
  } catch (err: any) {
    console.error('\n❌ ERROR: Simulation crashed:', err.message);
  }

  process.exit(0);
}

runSimulation();
