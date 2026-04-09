---
name: okx-onchainos
description: Provides instructions for interacting with OKX Onchain OS and X Layer. Use for wallet management, swaps, and smart contract deployment on OKX infrastructure.
---

# OKX Onchain OS & X Layer Skill

This skill helps the agent navigate and integrate with OKX's Web3 infrastructure, specifically Onchain OS (Agentic Wallet) and X Layer (L2).

## When to use this skill

- Use this when setting up or managing an **Agentic Wallet**.
- Use this when performing token **swaps** or fetching **market data** via OKX DEX aggregation.
- Use this when deploying or verifying smart contracts on **X Layer**.
- Use this when handling **XKO prefix** address conversions.

## Authentication Methods

### 1. Email Authentication (Quick Start)
Tell the user to:
1. "Log in to Agentic Wallet with email"
2. Provide their email.
3. Enter the OTP code.
The agent will automatically create/restore a TEE-based wallet.

### 2. API Key Authentication (Production)
For stable usage, use the [OKX Developer Portal](https://web3.okx.com/onchainos/dev-portal/project) to generate:
- `OKX_API_KEY`
- `OKX_SECRET_KEY`
- `OKX_PASSPHRASE`

**Security Rule**: Never commit `.env` files. Ensure they are in `.gitignore`.

## Onchain OS Integration

### Installation
Run: `npx skills add okx/onchainos-skills`

### Core APIs
- **Trade**: `GET /api/v6/dex/aggregator/swap` - Aggregates liquidity across major DEXs.
- **Market**: Real-time prices and onchain data.
- **Wallet**: TEE-protected key generation and signing.

## X Layer (Ethereum L2)

### Network Info
- **Mainnet RPC**: `https://rpc.xlayer.tech`
- **Testnet RPC**: `https://testrpc.xlayer.tech/terigon`

### Address Formats
X Layer supports two equivalence formats:
- **Standard EVM**: `0x...`
- **XKO Prefix**: `XKO...` (Case-insensitive prefix, preserves checksum).
*Note: Use standard 20-byte format for on-chain transactions; XKO is for off-chain UI/display.*

### Contract Deployment
Compatible with **Hardhat**, **Foundry**, and **Truffle**.
- Gas Token: **OKB**
- EVM Equivalent: No code changes required from Ethereum.

## Decision Tree

1. **New User?** -> Recommend Email Authentication.
2. **Developing a DApp?** -> Use API Keys + X Layer Testnet.
3. **Transaction Error?** -> Check if XKO format was used in RLP encoding (unsupported).
4. **Best Price Swap?** -> Use DEX Aggregator API.
