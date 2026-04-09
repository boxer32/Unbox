// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/DecisionLog.sol";

contract DeployDecisionLog is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DecisionLog log = new DecisionLog();
        console.log("DecisionLog deployed to:", address(log));

        vm.stopBroadcast();
    }
}
