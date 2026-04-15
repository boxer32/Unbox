// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/UnboxGuardrail.sol";

contract DeployGuardrail is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address reputationAddress = vm.envAddress("REPUTATION_CONTRACT_ADDRESS");
        
        vm.startBroadcast(deployerPrivateKey);

        UnboxGuardrail guardrail = new UnboxGuardrail(reputationAddress);
        console.log("UnboxGuardrail deployed to:", address(guardrail));

        vm.stopBroadcast();
    }
}
