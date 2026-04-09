// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../contracts/AgentReputation.sol";

contract AgentReputationTest is Test {
    AgentReputation public reputation;
    address public owner = address(1);
    address public agent1 = address(2);
    address public bystander = address(3);

    function setUp() public {
        vm.prank(owner);
        reputation = new AgentReputation();
    }

    function test_MintIdentity(address to) public {
        vm.assume(to != address(0));
        vm.prank(owner);
        uint256 tokenId = reputation.mintIdentity(to);
        
        assertEq(reputation.ownerOf(tokenId), to);
        
        // REQ-REP-003: Check initial score is 100
        (uint256 q, uint256 s, uint256 e, uint256 t, uint256 w, uint256 lastBlock) = reputation.agentScores(tokenId);
        assertEq(q, 100);
        assertEq(w, 100);
        assertEq(lastBlock, block.number);
    }

    function test_SBT_BlockTransfer() public {
        vm.prank(owner);
        uint256 tokenId = reputation.mintIdentity(agent1);
        
        // Attempt transfer from agent1 to bystander
        vm.prank(agent1);
        vm.expectRevert("SBT: Transfer not allowed");
        reputation.transferFrom(agent1, bystander, tokenId);
    }

    function test_WeightedScoreCalculation() public {
        vm.prank(owner);
        uint256 tokenId = reputation.mintIdentity(agent1);
        
        // Input: Q=80, S=90, E=70, T=100
        // (80*35 + 90*30 + 70*20 + 100*15) / 100 = 84
        vm.prank(owner);
        reputation.updateScore(tokenId, 80, 90, 70, 100);
        
        (, , , , uint256 weighted, ) = reputation.agentScores(tokenId);
        assertEq(weighted, 84);
    }

    function test_UpdateScore_OnlyOwner() public {
        vm.prank(owner);
        uint256 tokenId = reputation.mintIdentity(agent1);
        
        vm.prank(bystander);
        // Expecting OwnableUnauthorizedAccount error from OpenZeppelin
        vm.expectRevert(); 
        reputation.updateScore(tokenId, 100, 100, 100, 100);
    }

    function test_ScoreHistory() public {
        vm.prank(owner);
        uint256 tokenId = reputation.mintIdentity(agent1);
        
        vm.prank(owner);
        reputation.updateScore(tokenId, 80, 80, 80, 80);
        
        vm.prank(owner);
        reputation.updateScore(tokenId, 60, 60, 60, 60);
        
        AgentReputation.Score[] memory history = reputation.getScoreHistory(tokenId);
        assertEq(history.length, 3); // Initial + 2 updates
        assertEq(history[0].weightedScore, 100);
        assertEq(history[1].weightedScore, 80);
        assertEq(history[2].weightedScore, 60);
    }
}
