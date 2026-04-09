export const agentReputationAbi = [
  {
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'agentScores',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'decisionQuality', type: 'uint256', internalType: 'uint256' },
      { name: 'securityDiscipline', type: 'uint256', internalType: 'uint256' },
      { name: 'executionEfficiency', type: 'uint256', internalType: 'uint256' },
      { name: 'transparency', type: 'uint256', internalType: 'uint256' },
      { name: 'weightedScore', type: 'uint256', internalType: 'uint256' },
      { name: 'lastUpdateBlock', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getScore',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct AgentReputation.Score',
        components: [
          { name: 'decisionQuality', type: 'uint256', internalType: 'uint256' },
          { name: 'securityDiscipline', type: 'uint256', internalType: 'uint256' },
          { name: 'executionEfficiency', type: 'uint256', internalType: 'uint256' },
          { name: 'transparency', type: 'uint256', internalType: 'uint256' },
          { name: 'weightedScore', type: 'uint256', internalType: 'uint256' },
          { name: 'lastUpdateBlock', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getScoreHistory',
    inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct AgentReputation.Score[]',
        components: [
          { name: 'decisionQuality', type: 'uint256', internalType: 'uint256' },
          { name: 'securityDiscipline', type: 'uint256', internalType: 'uint256' },
          { name: 'executionEfficiency', type: 'uint256', internalType: 'uint256' },
          { name: 'transparency', type: 'uint256', internalType: 'uint256' },
          { name: 'weightedScore', type: 'uint256', internalType: 'uint256' },
          { name: 'lastUpdateBlock', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintIdentity',
    inputs: [{ name: 'to', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateScore',
    inputs: [
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'q', type: 'uint256', internalType: 'uint256' },
      { name: 's', type: 'uint256', internalType: 'uint256' },
      { name: 'e', type: 'uint256', internalType: 'uint256' },
      { name: 't', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;
