import { describe, it, expect } from 'vitest';
import { X402Gateway } from '../../../src/gateway/x402-gateway';

describe('Feed Gateway Idempotency (TC-FEED-005)', () => {
  const gateway = new X402Gateway();

  it('should suppress duplicate delivery for same payment proof', async () => {
    const proof = "0xhash_of_payment_transaction_long_enough_to_pass_validation_v1";

    const firstRedemption = await gateway.redeemAccess(proof);
    expect(firstRedemption).toEqual({ verified: true, duplicate: false });

    const secondRedemption = await gateway.redeemAccess(proof);
    expect(secondRedemption).toEqual({ verified: true, duplicate: true });
  });
});
