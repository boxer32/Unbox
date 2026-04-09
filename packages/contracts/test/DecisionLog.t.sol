// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/DecisionLog.sol";

contract DecisionLogTest is Test {
    DecisionLog public decisionLog;
    address public owner = address(1);
    address public authorizedCaller = address(2);
    address public unauthorizedCaller = address(3);

    function setUp() public {
        vm.prank(owner);
        decisionLog = new DecisionLog();
    }

    function test_OwnerCanLogDecision() public {
        bytes32 payloadHash = keccak256("payload-owner");

        vm.prank(owner);
        decisionLog.logDecision("id-owner", "agent-owner", payloadHash, "execute");

        assertTrue(decisionLog.isAnchored(payloadHash));
    }

    function test_AuthorizedCallerCanLogDecision() public {
        bytes32 payloadHash = keccak256("payload-authorized");

        vm.prank(owner);
        decisionLog.setAllowedCaller(authorizedCaller, true);

        vm.prank(authorizedCaller);
        decisionLog.logDecision("id-auth", "agent-auth", payloadHash, "block");

        assertTrue(decisionLog.isAnchored(payloadHash));
    }

    function test_UnauthorizedCallerReverts() public {
        bytes32 payloadHash = keccak256("payload-unauthorized");

        vm.expectRevert(abi.encodeWithSelector(DecisionLog.UnauthorizedLogger.selector, unauthorizedCaller));
        vm.prank(unauthorizedCaller);
        decisionLog.logDecision("id-nope", "agent-nope", payloadHash, "execute");
    }

    function test_DuplicateHashReverts() public {
        bytes32 payloadHash = keccak256("payload-duplicate");

        vm.prank(owner);
        decisionLog.logDecision("id-1", "agent", payloadHash, "execute");

        vm.expectRevert(abi.encodeWithSelector(DecisionLog.HashAlreadyAnchored.selector, payloadHash));
        vm.prank(owner);
        decisionLog.logDecision("id-2", "agent", payloadHash, "block");
    }

    function test_SetAllowedCallerZeroAddressReverts() public {
        vm.expectRevert(abi.encodeWithSelector(DecisionLog.InvalidCaller.selector, address(0)));
        vm.prank(owner);
        decisionLog.setAllowedCaller(address(0), true);
    }
}
