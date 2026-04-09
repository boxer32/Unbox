export const decisionLogAbi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AllowedCallerUpdated',
    inputs: [
      { name: 'caller', type: 'address', indexed: true, internalType: 'address' },
      { name: 'isAllowed', type: 'bool', indexed: false, internalType: 'bool' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DecisionLogged',
    inputs: [
      { name: 'decisionId', type: 'string', indexed: false, internalType: 'string' },
      { name: 'agentId', type: 'string', indexed: true, internalType: 'string' },
      { name: 'payloadHash', type: 'bytes32', indexed: true, internalType: 'bytes32' },
      { name: 'action', type: 'string', indexed: false, internalType: 'string' },
      { name: 'timestamp', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'function',
    name: 'allowedCallers',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isAnchored',
    inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'logDecision',
    inputs: [
      { name: 'decisionId', type: 'string', internalType: 'string' },
      { name: 'agentId', type: 'string', internalType: 'string' },
      { name: 'payloadHash', type: 'bytes32', internalType: 'bytes32' },
      { name: 'action', type: 'string', internalType: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setAllowedCaller',
    inputs: [
      { name: 'caller', type: 'address', internalType: 'address' },
      { name: 'isAllowed', type: 'bool', internalType: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;
