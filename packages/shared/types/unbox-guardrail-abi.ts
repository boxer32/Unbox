export const unboxGuardrailAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_reputationContract",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "MIN_SECURITY_SCORE",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "reputationContract",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract AgentReputation"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "requestExecution",
    "inputs": [
      {
        "name": "agentTokenId",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "payloadHash",
        "type": "bytes32",
        "internalType": "bytes32"
      },
      {
        "name": "riskFlagCount",
        "type": "uint8",
        "internalType": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "CircuitBroken",
    "inputs": [
      {
        "name": "agentTokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "reason",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "HandshakeApproved",
    "inputs": [
      {
        "name": "agentTokenId",
        "type": "uint256",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "name": "payloadHash",
        "type": "bytes32",
        "indexed": false,
        "internalType": "bytes32"
      }
    ],
    "anonymous": false
  }
];
