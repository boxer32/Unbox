// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DecisionLog
 * @dev REQ-MIRROR-002, REQ-MIRROR-005
 * Anchors decision payload hashes on-chain for verifiability.
 */
contract DecisionLog is Ownable {
    error UnauthorizedLogger(address caller);
    error InvalidCaller(address caller);
    error HashAlreadyAnchored(bytes32 payloadHash);

    event AllowedCallerUpdated(address indexed caller, bool isAllowed);
    
    // Events for off-chain indexers (Dashboard, etc.)
    event DecisionLogged(
        string decisionId, 
        string indexed agentId, 
        bytes32 indexed payloadHash, 
        string action,
        uint256 timestamp
    );

    // Optional: map to check if a hash has already been anchored
    mapping(bytes32 => bool) public isAnchored;
    mapping(address => bool) public allowedCallers;

    constructor() Ownable(msg.sender) {}

    modifier onlyAuthorizedCaller() {
        if (!(msg.sender == owner() || allowedCallers[msg.sender])) {
            revert UnauthorizedLogger(msg.sender);
        }
        _;
    }

    function setAllowedCaller(address caller, bool isAllowed) external onlyOwner {
        if (caller == address(0)) {
            revert InvalidCaller(caller);
        }
        allowedCallers[caller] = isAllowed;
        emit AllowedCallerUpdated(caller, isAllowed);
    }

    /**
     * @dev Anchors a decision hash. 
     * In V1, we allow the owner (Mirror Engine) to push anchors.
     * @param decisionId UUID from the Mirror Engine
     * @param agentId Unique ID of the agent
     * @param payloadHash Keccak256 hash of the normalized payload
     * @param action The final action taken (execute/block/defer)
     */
    function logDecision(
        string calldata decisionId,
        string calldata agentId,
        bytes32 payloadHash,
        string calldata action
    ) external onlyAuthorizedCaller {
        if (isAnchored[payloadHash]) {
            revert HashAlreadyAnchored(payloadHash);
        }

        isAnchored[payloadHash] = true;

        emit DecisionLogged(
            decisionId,
            agentId,
            payloadHash,
            action,
            block.timestamp
        );
    }
}
