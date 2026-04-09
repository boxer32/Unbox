// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/AgentReputation.sol";

contract DeployReputation is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AgentReputation reputation = new AgentReputation();
        console.log("AgentReputation deployed to:", address(reputation));

        vm.stopBroadcast();
    }
}
