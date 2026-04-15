// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/AgentReputation.sol";
import "../contracts/DecisionLog.sol";
import "../contracts/UnboxGuardrail.sol";

/**
 * @title DeployAllXLayer
 * @dev Deploys the full Unbox protocol suite to X Layer.
 * 
 * Usage:
 *   source .env
 *   forge script script/DeployAllXLayer.s.sol:DeployAllXLayer \
 *     --rpc-url https://rpc.xlayer.tech \
 *     --broadcast --verify -vvvv
 */
contract DeployAllXLayer is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);

        // 1. Deploy AgentReputation (SBT)
        AgentReputation reputation = new AgentReputation();
        console.log("AgentReputation deployed at:", address(reputation));

        // 2. Deploy UnboxGuardrail (Circuit Breaker)
        UnboxGuardrail guardrail = new UnboxGuardrail(address(reputation));
        console.log("UnboxGuardrail deployed at:", address(guardrail));

        // 3. Deploy DecisionLog (Immutable Records)
        DecisionLog decisionLog = new DecisionLog();
        console.log("DecisionLog deployed at:", address(decisionLog));

        // 4. Mint initial agent identity for Agentic Wallet
        address agenticWallet = 0xe7b7a872e04ea2ffee43785187a4663887e5c27a;
        uint256 tokenId = reputation.mintIdentity(agenticWallet);
        console.log("Agent SBT minted with tokenId:", tokenId);

        // 5. Authorize the deployer to log decisions
        decisionLog.setAllowedCaller(msg.sender, true);
        console.log("Deployer authorized as DecisionLog caller");

        vm.stopBroadcast();
    }
}
