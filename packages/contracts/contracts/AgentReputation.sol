// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AgentReputation
 * @dev REQ-REP-001, REQ-REP-002, REQ-REP-003
 * Implement non-transferable Soulbound Token (SBT) for Agent Identity.
 * Maintains weighted trust scores.
 */
contract AgentReputation is ERC721, Ownable {

    struct Score {
        uint256 decisionQuality;     // Weight: 35
        uint256 securityDiscipline;  // Weight: 30
        uint256 executionEfficiency; // Weight: 20
        uint256 transparency;        // Weight: 15
        uint256 weightedScore;       // 0-100 normalized
        uint256 lastUpdateBlock;
    }

    // Mapping from agent token ID to its current score
    mapping(uint256 => Score) public agentScores;

    // REQ-REP-004: Mapping from agent token ID to historical score checkpoints
    mapping(uint256 => Score[]) public scoreHistory;

    // Tracker for token IDs
    uint256 private _nextTokenId;

    event ScoreUpdated(
        uint256 indexed tokenId, 
        uint256 weightedScore, 
        uint256 blockNumber
    );

    constructor() ERC721("Unbox Agent Identity", "UAID") Ownable(msg.sender) {}

    /**
     * @dev REQ-REP-001: Mint a new identity token.
     * Only the protocol owner can register new agents.
     */
    function mintIdentity(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = ++_nextTokenId;
        _safeMint(to, tokenId);
        
        // Initialize with baseline score
        Score memory initialScore = Score(100, 100, 100, 100, 100, block.number);
        agentScores[tokenId] = initialScore;
        scoreHistory[tokenId].push(initialScore);
        
        return tokenId;
    }

    /**
     * @dev REQ-REP-002, REQ-REP-003: Update agent score.
     * Calculation: (Q*35 + S*30 + E*20 + T*15) / 100
     */
    function updateScore(
        uint256 tokenId,
        uint256 q,
        uint256 s,
        uint256 e,
        uint256 t
    ) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Agent does not exist");
        require(q <= 100 && s <= 100 && e <= 100 && t <= 100, "Invalid score range");

        uint256 weighted = (q * 35 + s * 30 + e * 20 + t * 15) / 100;
        
        Score memory newScore = Score(q, s, e, t, weighted, block.number);
        agentScores[tokenId] = newScore;
        scoreHistory[tokenId].push(newScore);
        
        emit ScoreUpdated(tokenId, weighted, block.number);
    }

    /**
     * @dev REQ-REP-001: Enforce Soulbound behavior.
     * Transfers are disabled by overriding the internal _update function (OZ 5.x).
     */
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        // Allow minting (from == 0) and burning (to == 0), but block active transfers
        if (from != address(0) && to != address(0)) {
            revert("SBT: Transfer not allowed");
        }
        return super._update(to, tokenId, auth);
    }

    /**
     * @dev REQ-REP-004: Get historical score history for an agent.
     */
    function getScoreHistory(uint256 tokenId) external view returns (Score[] memory) {
        return scoreHistory[tokenId];
    }

    /**
     * @dev Get detailed score for an agent.
     */
    function getScore(uint256 tokenId) external view returns (Score memory) {
        return agentScores[tokenId];
    }
}
