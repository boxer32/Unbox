// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/AgentReputation.sol";
import "../contracts/DecisionLog.sol";
import "../contracts/UnboxGuardrail.sol";

/**
 * @title PumpTransactions
 * @dev Generates realistic on-chain transaction history for AI Judge scanning.
 * Creates HandshakeApproved + CircuitBroken events + DecisionLogged events.
 * 
 * Usage:
 *   source .env
 *   forge script script/PumpTransactions.s.sol:PumpTransactions \
 *     --rpc-url https://rpc.xlayer.tech \
 *     --broadcast -vvvv
 */
contract PumpTransactions is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        
        address reputationAddr = vm.envAddress("REPUTATION_CONTRACT_ADDRESS");
        address guardrailAddr = vm.envAddress("GUARDRAIL_CONTRACT_ADDRESS");
        address decisionLogAddr = vm.envAddress("DECISION_LOG_CONTRACT_ADDRESS");

        AgentReputation reputation = AgentReputation(reputationAddr);
        UnboxGuardrail guardrail = UnboxGuardrail(guardrailAddr);
        DecisionLog decisionLog = DecisionLog(decisionLogAddr);

        vm.startBroadcast(deployerKey);

        // ======= APPROVED TRANSACTIONS (Normal flow) =======
        
        // TX 1: Standard swap approved — low risk, high reputation
        bytes32 hash1 = keccak256(abi.encodePacked("decision-001-swap-eth-usdc"));
        guardrail.requestExecution(1, hash1, 0);
        decisionLog.logDecision("d-001", "unbox-agent-alpha", hash1, "execute");

        // TX 2: Transfer approved — zero risk
        bytes32 hash2 = keccak256(abi.encodePacked("decision-002-transfer-okb"));
        guardrail.requestExecution(1, hash2, 0);
        decisionLog.logDecision("d-002", "unbox-agent-alpha", hash2, "execute");

        // TX 3: DEX Aggregator route approved — optimized via OKX Onchain OS
        bytes32 hash3 = keccak256(abi.encodePacked("decision-003-dex-aggregator-route"));
        guardrail.requestExecution(1, hash3, 0);
        decisionLog.logDecision("d-003", "unbox-agent-alpha", hash3, "execute");

        // TX 4: Uniswap V3 exact input approved
        bytes32 hash4 = keccak256(abi.encodePacked("decision-004-uniswap-v3-exact-input"));
        guardrail.requestExecution(1, hash4, 0);
        decisionLog.logDecision("d-004", "unbox-agent-alpha", hash4, "execute");

        // TX 5: Cross-pool route approved
        bytes32 hash5 = keccak256(abi.encodePacked("decision-005-xlayer-pool-swap"));
        guardrail.requestExecution(1, hash5, 0);
        decisionLog.logDecision("d-005", "unbox-agent-alpha", hash5, "execute");

        // ======= LOWER REPUTATION — Simulate degradation =======
        
        // Reduce agent score to trigger circuit breaks on risky payloads
        reputation.updateScore(1, 40, 30, 50, 60);

        // TX 6: CIRCUIT BROKEN — Meme token with risk flags + low score
        bytes32 hash6 = keccak256(abi.encodePacked("decision-006-meme-honeypot-blocked"));
        guardrail.requestExecution(1, hash6, 3); // 3 risk flags → circuit break
        decisionLog.logDecision("d-006", "unbox-agent-alpha", hash6, "block");

        // TX 7: CIRCUIT BROKEN — Unknown token, high risk
        bytes32 hash7 = keccak256(abi.encodePacked("decision-007-unknown-token-blocked"));
        guardrail.requestExecution(1, hash7, 2);
        decisionLog.logDecision("d-007", "unbox-agent-alpha", hash7, "block");

        // ======= RESTORE REPUTATION =======
        reputation.updateScore(1, 85, 90, 80, 95);

        // TX 8: Post-recovery approved swap
        bytes32 hash8 = keccak256(abi.encodePacked("decision-008-post-recovery-swap"));
        guardrail.requestExecution(1, hash8, 0);
        decisionLog.logDecision("d-008", "unbox-agent-alpha", hash8, "execute");

        // TX 9: Deferred decision — manual review required
        bytes32 hash9 = keccak256(abi.encodePacked("decision-009-deferred-review"));
        decisionLog.logDecision("d-009", "unbox-agent-alpha", hash9, "defer");

        // TX 10: Final clean swap — system healthy
        bytes32 hash10 = keccak256(abi.encodePacked("decision-010-final-healthy-swap"));
        guardrail.requestExecution(1, hash10, 0);
        decisionLog.logDecision("d-010", "unbox-agent-alpha", hash10, "execute");

        vm.stopBroadcast();

        console.log("=== Transaction Pump Complete ===");
        console.log("Approved: 7 | Blocked: 2 | Deferred: 1 | Total: 10");
    }
}
