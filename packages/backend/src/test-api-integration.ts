import { OKXTradeService } from './skills/okx-trade-service.js';
import { OKXSecurityService } from './services/okx-security-service.js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load config from .dev.vars (Cloudflare format)
const envPath = path.resolve(process.cwd(), '.dev.vars');
dotenv.config({ path: envPath });

async function runSanityCheck() {
    console.log("=== 🔍 OKX API VERBOSE DEBUG ===");
    console.log(`Loading env from: ${envPath}`);
    console.log(`API KEY starts with: ${process.env.OKX_API_KEY?.substring(0, 5)}...`);
    console.log(`PASSPHRASE: ${process.env.OKX_PASSPHRASE}`);

    const tradeService = new OKXTradeService(process.env as any);
    const securityService = new OKXSecurityService();

    // 1. Test Trade Quote 
    console.log("\n1. Testing OKX DEX Aggregator (USDT -> USDC on X Layer 196)...");
    const quoteResult = await tradeService.getQuote({
        tokenIn: '0x10dD6f3d1bE1aB9c7e0c4D99e710202F13BAd08c',
        tokenOut: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        amount: '1000000',
        agentTokenId: 1,
        action: 'ONCHAIN_OS_SWAP'
    });
    
    console.log("Response Body:", JSON.stringify(quoteResult, null, 2));

    // 2. Test Security Scan
    console.log("\n2. Testing OKX Security Scan (USDC on X Layer 196)...");
    const scan = await securityService.scanToken('0xdac17f958d2ee523a2206206994597c13d831ec7');
    console.log("Scan Result:", JSON.stringify(scan, null, 2));
}

runSanityCheck();
