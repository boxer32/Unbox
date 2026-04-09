// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/DecisionLog.sol";

/**
 * @title AuthorizeCaller
 * @dev Helper script to authorize a backend address to log decisions on-chain.
 * Usage: forge script script/AuthorizeCaller.s.sol --rpc-url $RPC_URL --broadcast
 * Required Env: PRIVATE_KEY, DECISION_LOG_ADDRESS, CALLER_TO_AUTHORIZE
 */
contract AuthorizeCaller is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address logAddress = vm.envAddress("DECISION_LOG_ADDRESS");
        address callerToAuthorize = vm.envAddress("CALLER_TO_AUTHORIZE");

        vm.startBroadcast(deployerPrivateKey);

        DecisionLog log = DecisionLog(logAddress);
        log.setAllowedCaller(callerToAuthorize, true);
        
        console.log("Authorized caller:", callerToAuthorize);
        console.log("On DecisionLog at:", logAddress);

        vm.stopBroadcast();
    }
}
