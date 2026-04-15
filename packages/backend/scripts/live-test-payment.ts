import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const RPC_URL = process.env.RPC_URL || 'https://xlayer-testnet.okx.com';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const TREASURY = '0xab16A69A5a8c12C732e0DEFF4BE56A70bb64c926';

async function main() {
  if (!PRIVATE_KEY) {
    console.error('PRIVATE_KEY missing in .env');
    return;
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log(`[LiveTest] Sending 0.001 ETH to Treasury: ${TREASURY}`);
  console.log(`[LiveTest] From: ${wallet.address}`);

  const tx = await wallet.sendTransaction({
    to: TREASURY,
    value: ethers.parseEther('0.001')
  });

  console.log(`[LiveTest] Transaction Sent! Hash: ${tx.hash}`);
  console.log(`[LiveTest] Waiting for confirmation...`);
  
  await tx.wait(1);
  console.log(`[LiveTest] Confirmed! You can now use this hash in the Intelligence Feed.`);
}

main().catch(console.error);
