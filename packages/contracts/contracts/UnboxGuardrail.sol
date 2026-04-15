// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AgentReputation.sol";

/**
 * @title UnboxGuardrail
 * @dev Active circuit breaker for agent execution based on reputation and risk signals.
 * Mapped to REQ-MIRROR-001, NFR-001
 */
contract UnboxGuardrail {
    AgentReputation public reputationContract;
    uint256 public constant MIN_SECURITY_SCORE = 50; // Threshold for risky actions
    uint256 public constant CRITICAL_SCORE_THRESHOLD = 20; // Critical threshold, block regardless of risk flags

    event HandshakeApproved(uint256 indexed agentTokenId, bytes32 payloadHash);
    event CircuitBroken(uint256 indexed agentTokenId, string reason);

    constructor(address _reputationContract) {
        reputationContract = AgentReputation(_reputationContract);
    }

    /**
     * @dev Requests permission to execute a transaction plan.
     * Evaluates the agent's security discipline score against the risk profile of the payload.
     */
    function requestExecution(
        uint256 agentTokenId, 
        bytes32 payloadHash, 
        uint8 riskFlagCount
    ) external returns (bool) {
        // 1. Fetch current agent scores from the reputation contract
        AgentReputation.Score memory score = reputationContract.getScore(agentTokenId);

        // 2. Circuit Breaker Logic:
        // CR Comment 1: If score is below critical threshold, block immediately.
        if (score.securityDiscipline < CRITICAL_SCORE_THRESHOLD) {
            emit CircuitBroken(agentTokenId, "Score below critical threshold");
            return false;
        }

        // If security discipline is below MIN_SECURITY_SCORE AND the plan contains risk flags, block execution.
        if (score.securityDiscipline < MIN_SECURITY_SCORE && riskFlagCount > 0) {
            emit CircuitBroken(agentTokenId, "High risk flag detected for low-score agent");
            return false;
        }

        // 3. Pass through for high-reputation agents or low-risk payloads
        emit HandshakeApproved(agentTokenId, payloadHash);
        return true;
    }
}
