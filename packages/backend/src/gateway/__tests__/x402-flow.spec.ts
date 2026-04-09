import { describe, it, expect } from 'vitest';
import { X402Gateway } from '../x402-gateway';
import { SettlementService } from '../../services/settlement-service';

/**
 * TC-FEED-001, TC-FEED-002, TC-FEED-003
 * Comprehensive Verification of x402 Monetization Flow
 */
describe('Unbox x402 Gateway Integration (Full V1)', () => {
  const gateway = new X402Gateway();
  const settlement = new SettlementService();

  it('TC-FEED-001: should return 402 challenge with payment spec for unauthenticated request', () => {
    const request = { decisionId: '550e8400', hasPaid: false };
    const response = gateway.handleRequest(request.hasPaid ? 'VALID_TOKEN' : undefined);
    
    expect(response.status).toBe(402);
    expect(response.challenge).toMatchObject({
      asset: 'X-LAYER-ETH',
      amount: '0.001',
      network: 'x-layer-testnet'
    });
    // REQ-FEED-002: Ensure no data is returned in the 402 response
    expect(response.data).toBeUndefined();
  });

  it('TC-FEED-002: should deliver intelligence after payment is verified', () => {
    // Stage 1: Payment verified (mocking token validation)
    const validToken = 'valid-receipt-hash-xyz';
    const response = gateway.handleRequest(validToken);
    
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.intelligence).toContain('liquidity withdrawal');
  });

  it('TC-FEED-003: should enforce deterministic 80/20 split on settlement audit', async () => {
    const totalAmount = '1000000000000000000'; // 1 ETH (in wei)
    const result = await settlement.processSettlement('req-1', totalAmount, '0xAgent');
    
    // Check bigInt calculation for precision safety (HFT-inspired pattern 11.2)
    const expectedAgent = (BigInt(totalAmount) * 80n) / 100n;
    const expectedProtocol = (BigInt(totalAmount) * 20n) / 100n;
    
    expect(result.agentShare).toBe(expectedAgent);
    expect(result.protocolShare).toBe(expectedProtocol);
    expect(result.status).toBe('settled');
  });
});
