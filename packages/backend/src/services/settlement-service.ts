import { ethers } from 'ethers';

/**
 * REQ-FEED-003: Settlement Service
 * Enforces 80/20 revenue split between source agents and the Unbox protocol.
 */

export interface SettlementRecord {
  requestId: string;
  totalPaid: bigint;
  agentShare: bigint;
  protocolShare: bigint;
  agentAddress: string;
  timestamp: number;
  status: 'pending' | 'settled' | 'failed';
}

export class SettlementService {
  /**
   * Processes a successful payment and records the deterministic split.
   */
  public async processSettlement(
    requestId: string,
    totalAmountStr: string,
    agentAddress: string
  ): Promise<SettlementRecord> {
    
    const totalAmount = BigInt(totalAmountStr);
    
    // Enforce 80/20 split (REQ-FEED-003)
    const agentShare = (totalAmount * 80n) / 100n;
    const protocolShare = totalAmount - agentShare;

    console.log(`[Settlement] Processing split for request ${requestId}:`);
    console.log(` - Agent (80%): ${ethers.formatEther(agentShare)} ETH`);
    console.log(` - Protocol (20%): ${ethers.formatEther(protocolShare)} ETH`);

    const record: SettlementRecord = {
      requestId,
      totalPaid: totalAmount,
      agentShare,
      protocolShare,
      agentAddress,
      timestamp: Date.now(),
      status: 'settled'
    };

    // In production, trigger on-chain transfers or record in database
    return record;
  }
}
