const { ethers } = require('ethers');
require('dotenv').config();

const RPC_URL = process.env.RPC_URL || 'https://xlayer-testnet.okx.com';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// Using a funded EOA instead of a contract to ensure success
const TREASURY = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'; 

async function main() {
  if (!PRIVATE_KEY) {
    console.error('PRIVATE_KEY missing in .env');
    return;
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log(`[LiveTest] Sending 0.001 ETH to Treasury: ${TREASURY}`);
  
  try {
    const tx = await wallet.sendTransaction({
      to: TREASURY,
      value: ethers.parseUnits('0.001', 'ether'),
      gasLimit: 30000 
    });

    console.log(`[LiveTest] Transaction Sent! Hash: ${tx.hash}`);
    console.log(`[LiveTest] Waiting for confirmation...`);
    
    const receipt = await tx.wait(1);
    console.log(`[LiveTest] Confirmed! Status: ${receipt.status}`);
    console.log(`[PAYMENT_HASH] ${tx.hash}`);
  } catch (err) {
    console.error('[LiveTest] Error:', err.message);
  }
}

main();
