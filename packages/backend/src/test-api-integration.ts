import { OKXTradeService } from './skills/okx-trade-service.js';
import { OKXSecurityService } from './services/okx-security-service.js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load config from .dev.vars (Cloudflare format)
const envPath = path.resolve(process.cwd(), '.dev.vars');
dotenv.config({ path: envPath });

async function runSanityCheck() {
    console.log("=== 🔍 OKX API SANITY CHECK ===");
    
    const tradeService = new OKXTradeService(process.env as any);
    const securityService = new OKXSecurityService();

    // 1. Test Trade Quote (USDT to USDC on X Layer)
    console.log("\n1. Testing OKX DEX Aggregator...");
    const quote = await tradeService.getQuote({
        tokenIn: '0x10dD6f3d1bE1aB9c7e0c4D99e710202F13BAd08c', // USDT (dummy for test)
        tokenOut: '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDC
        amount: '1000000',
        agentTokenId: 1,
        action: 'ONCHAIN_OS_SWAP'
    });
    
    if (quote && quote.code === 0) {
        console.log("✅ DEX Quote Successful!");
        console.log("Price Quote:", quote.data?.[0]?.toTokenAmount);
    } else {
        console.log("❌ DEX Quote Failed. Check your API Key/Passphrase.");
    }

    // 2. Test Security Scan
    console.log("\n2. Testing OKX Security Scan...");
    const scan = await securityService.scanToken('0xdac17f958d2ee523a2206206994597c13d831ec7');
    
    if (scan && scan.token) {
        console.log("✅ Security Scan Successful!");
        console.log("Risk Level:", scan.level);
        console.log("Risk Labels:", scan.riskLabels);
    } else {
        console.log("❌ Security Scan Failed. Check Onchain OS CLI configuration.");
    }
}

runSanityCheck();
