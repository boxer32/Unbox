-- Unbox Hackathon Production Seed Data (V3 - Final Polished Schema)
-- Target: Cloudflare D1 Database (Remote)

DELETE FROM decisions WHERE id IN ('d-001', 'd-003');

-- 1. Optimized Swap with proper nested payload
INSERT INTO decisions (id, action, payload_json, timestampMs, targetAddress)
VALUES (
    'd-001', 
    'execute', 
    '{"decisionId":"d-001","agentId":"unbox-agent-01","intentText":"Swap 0.5 ETH to USDC on X Layer","action":"execute","timestampMs":1713192000000,"targetAddress":"0x10dD6f3d1bE1aB9c7e0c4D99e710202F13BAd08c","explanation":{"headline":"Capital Efficiency Optimized via OKX DEX V4 Aggregator","summary":"Unbox intercepted the original swap intent and calculated a more efficient route through Uniswap V3 pools on X Layer, reducing slippage by 12%.","analysis":[{"factor":"Liquidity Search","description":"Found deeper liquidity in X Layer native pools vs bridge routes."}],"conclusion":"Execution approved at optimal 0.1% slippage."},"optimization":{"targetRoute":"OKX_DEX_V4_AGGREGATOR","appliedSkill":"OnchainOS_Swap_Module","slippageSaved":12,"gasSaved":15000,"optimizedPayload":{"recommendedGasLimit":"150000","recommendedMaxFeePerGas":"25.5","targetRoute":"OKX_DEX_V4_AGGREGATOR"}},"securityScan":{"score":100,"flags":[],"status":"safe"},"marketState":{"price":3150.42,"liquidity":1200000,"gas":15,"oracleRef":"OKX_ORACLE_V1"},"payloadHash":"0xhash1","txHash":"0xtx1","blockRef":196}',
    1713192000000,
    '0x10dD6f3d1bE1aB9c7e0c4D99e710202F13BAd08c'
);

-- 2. Uniswap V3 LP with proper nested payload
INSERT INTO decisions (id, action, payload_json, timestampMs, targetAddress)
VALUES (
    'd-003', 
    'execute', 
    '{"decisionId":"d-003","agentId":"unbox-agent-01","intentText":"Provide Liquidity to Uniswap V3 ETH/USDC","action":"execute","timestampMs":1713192200000,"targetAddress":"0x12345f3d1bE1aB9c7e0c4D99e710202F13BAd08c","explanation":{"headline":"Uniswap V3 LP Position Optimized","summary":"Bayesian search found the optimal price range concentration to maximize fees on X Layer.","analysis":[{"factor":"Concentrated Liquidity","description":"Applying Uniswap_V3_Skill for range management."}],"conclusion":"Liquidity deployment confirmed."},"optimization":{"targetRoute":"UNISWAP_V3_POOL","appliedSkill":"Uniswap_V3_Skill","slippageSaved":0,"gasSaved":0,"optimizedPayload":{"recommendedGasLimit":"210000","recommendedMaxFeePerGas":"18.2","targetRoute":"UNISWAP_V3_POOL"}},"securityScan":{"score":100,"flags":[],"status":"safe"},"marketState":{"price":3152.1,"liquidity":5000000,"gas":12,"oracleRef":"UNISWAP_V3_ORACLE"},"payloadHash":"0xhash3","txHash":"0xtx3","blockRef":196}',
    1713192200000,
    '0x12345f3d1bE1aB9c7e0c4D99e710202F13BAd08c'
);
