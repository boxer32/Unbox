# OKX X Layer Developer Documentation

---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer

Title: X Layer overview | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about X Layer overview.

Source: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#x-layer-overview)
X Layer is an Ethereum Layer 2 (L2) network, built by OKX on an enhanced Optimism Stack, designed to provide developers with a superior environment for scaling applications.
Key Developer Advantages
- Full EVM Equivalence: Deploy your existing Ethereum applications without any code modifications.
- Exceptional Performance: Achieve massive scalability with support for up to 5,000 TPS and negligible gas fees.
- Battle-Tested Security: X Layer leverages the robust optimistic rollup architecture, inheriting the security guarantees of Ethereum, but with a simpler, more efficient operational model than ZK rollups.
- Enterprise-Grade Reliability: Features like the Conductor high-availability cluster ensure sequencer redundancy, offering 99.9% uptime for your production-ready dapps.

## X Layer architecture[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#x-layer-architecture)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#x-layer-architecture)
The major components of X Layer are:
- Virtual Machine: EVM‑equivalent
- Sequencer: Trusted (implemented by op-node in sequencer mode, coordinating with op-geth via Engine API)
- Gas token: OKB (fixed supply at 21M post-burns/upgrades; L1 OKB phased out)

## Background[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#background)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#background)
X Layer has evolved to adopt the Optimism Stack (OP Stack) framework, a battle-tested and widely adopted Layer 2 scaling solution. In this architecture, L2 operates with optimistic assumptions where transactions are considered valid by default, with a 7-day challenge period for fraud proofs. This provides a more efficient and cost-effective solution while maintaining Ethereum's security guarantees through cryptographic fraud proofs when needed.

## Architecture flow (OP Stack + AggLayer mode)[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#architecture-flow-(op-stack-+-agglayer-mode))
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#architecture-flow-(op-stack-+-agglayer-mode))
Phase 1: From L1 to L2
Process of bridging assets from ETH to X Layer
Phase 2: Execution and withdrawal back to L1
Standard L2 operations and process of initiating withdrawal back to L1

```
L2BridgeSyncer
```


```
L1InfoTreeSyncer
```

Phase 3: Cross-Chain Settlement & Proof (AggLayer)
This phase involves proving and finalizing the withdrawal on L1 using the AggLayer.

```
aggsender
```


```
aggsender
```

Phase 4: Continuous System Synchronization
Outcome: Fast execution happens on L2 with 1-second block times. All L2 data is published to L1, ensuring the system is fully trustless and censorship-resistant.
This flow ensures immediate transaction finality on L2 for most operations while providing cryptographic security for cross-chain operations through the optimistic rollup model.
[Network information](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[X Layer architecture](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#x-layer-architecture)
[Background](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#background)
[Architecture flow (OP Stack + AggLayer mode)](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer#architecture-flow-(op-stack-+-agglayer-mode))



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information

Title: Network information | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Network information.

Source: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts)
[Address Format](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

# Network information[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#network-information)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#network-information)
Welcome to X Layer developer documentation.

## Connecting to X Layer (Mainnet)[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#connecting-to-x-layer-(mainnet))
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#connecting-to-x-layer-(mainnet))
You can add X Layer mainnet by inputting the following network info:
[https://rpc.xlayer.tech](https://rpc.xlayer.tech)
[https://xlayerrpc.okx.com](https://xlayerrpc.okx.com)
[https://www.okx.com/web3/explorer/xlayer](https://www.okx.com/web3/explorer/xlayer)

## Connecting to X Layer (Testnet)[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#connecting-to-x-layer-(testnet))
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#connecting-to-x-layer-(testnet))
You can add X Layer testnet by inputting the following network info:
[https://testrpc.xlayer.tech/terigon](https://testrpc.xlayer.tech/terigon)
[https://xlayertestrpc.okx.com/terigon](https://xlayertestrpc.okx.com/terigon)
[https://www.okx.com/web3/explorer/xlayer-test](https://www.okx.com/web3/explorer/xlayer-test)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts)
[Connecting to X Layer (Mainnet)](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#connecting-to-x-layer-(mainnet))
[Connecting to X Layer (Testnet)](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information#connecting-to-x-layer-(testnet))



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts

Title: Contracts | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Contracts.

Source: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts)
[Address Format](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#contracts)

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#x-layer-contracts)
These smart contracts facilitate operation on Ethereum Mainnet and Sepolia Testnet.

### Ethereum Layer 1[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#ethereum-layer-1)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#ethereum-layer-1)
[0x5065809Af286321a05fBF85713B5D5De7C8f0433](https://etherscan.io/address/0x5065809Af286321a05fBF85713B5D5De7C8f0433)
[0x06BE4b4A9a28fF8EED6da09447Bc5DAA676efac3](https://sepolia.etherscan.io/address/0x06BE4b4A9a28fF8EED6da09447Bc5DAA676efac3)
[0xF94B553F3602a03931e5D10CaB343C0968D793e3](https://etherscan.io/address/0xF94B553F3602a03931e5D10CaB343C0968D793e3)
[0xEf40d5432D37B3935a11710c73F395e2c9921295](https://sepolia.etherscan.io/address/0xEf40d5432D37B3935a11710c73F395e2c9921295)
[0x64057ad1DdAc804d0D26A7275b193D9DACa19993](https://etherscan.io/address/0x64057ad1DdAc804d0D26A7275b193D9DACa19993)
[0x1529a34331D7d85C8868Fc88EC730aE56d3Ec9c0](https://sepolia.etherscan.io/address/0x1529a34331D7d85C8868Fc88EC730aE56d3Ec9c0)
[0x9D4c8FAEadDdDeeE1Ed0c92dAbAD815c2484f675](https://etherscan.io/address/0x9D4c8FAEadDdDeeE1Ed0c92dAbAD815c2484f675)
[0x80388586ab4580936BCb409Cc2dC6BC0221e1B6F](https://sepolia.etherscan.io/address/0x80388586ab4580936BCb409Cc2dC6BC0221e1B6F)
[0xEeDa796a23bc98726e47934ca9B54fDDa5a608e8](https://etherscan.io/address/0xEeDa796a23bc98726e47934ca9B54fDDa5a608e8)
[0x6d5610D86Dba85226146715B5c2b2addDAdE18c0](https://sepolia.etherscan.io/address/0x6d5610D86Dba85226146715B5c2b2addDAdE18c0)
[0x000590BB65ab1864a7AD46d6B957cC9a4F2C149d](https://etherscan.io/address/0x000590BB65ab1864a7AD46d6B957cC9a4F2C149d)
[0x1A8DFc1d6ccfB3bE886b2539823539a9DC0956a5](https://sepolia.etherscan.io/address/0x1A8DFc1d6ccfB3bE886b2539823539a9DC0956a5)
[0x1B8A252A71bC8997d3871aF420895B5845212fC6](https://etherscan.io/address/0x1B8A252A71bC8997d3871aF420895B5845212fC6)
[0xc8e876aD7E2e47017107D335132Bf7e3Efdd6B7b](https://sepolia.etherscan.io/address/0xc8e876aD7E2e47017107D335132Bf7e3Efdd6B7b)
[0x305D1C0EED9a0291686f3BfDf1F5E54aaeeF80e4](https://etherscan.io/address/0x305D1C0EED9a0291686f3BfDf1F5E54aaeeF80e4)
[0x4B55e1782E96762a457896Dff2B17Cd2477ab57c](https://sepolia.etherscan.io/address/0x4B55e1782E96762a457896Dff2B17Cd2477ab57c)
[0x1fb8cdFc6831fc866Ed9C51aF8817Da5c287aDD3](https://etherscan.io/address/0x1fb8cdFc6831fc866Ed9C51aF8817Da5c287aDD3)
[0xD59BB1D50DfeaDc2cC3a7BED43c3bc4065B0ed4B](https://sepolia.etherscan.io/address/0xD59BB1D50DfeaDc2cC3a7BED43c3bc4065B0ed4B)
[0x6a95D7aaC3d41761426761Af031C5034B7b347d4](https://etherscan.io/address/0x6a95D7aaC3d41761426761Af031C5034B7b347d4)
[0x307F426f725Dc6B2C49D489E1133aA5f5F400960](https://sepolia.etherscan.io/address/0x307F426f725Dc6B2C49D489E1133aA5f5F400960)
[0xC1Fb115d8249a7e6b27c8Bc6914Cab7eDF0b0F7E](https://etherscan.io/address/0xC1Fb115d8249a7e6b27c8Bc6914Cab7eDF0b0F7E)
[0x4e753a62Ad7Da17508DBC54A58E1e231C152baA2](https://sepolia.etherscan.io/address/0x4e753a62Ad7Da17508DBC54A58E1e231C152baA2)
[0xE88CfA9D4a4fae1413914baD9796A72D13d035b9](https://etherscan.io/address/0xE88CfA9D4a4fae1413914baD9796A72D13d035b9)
[0x6A09ED5B36dD48904551498f0020cD62cc315907](https://sepolia.etherscan.io/address/0x6A09ED5B36dD48904551498f0020cD62cc315907)

### X Layer Layer 2 (Predeploys)[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#x-layer-layer-2-(predeploys))
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#x-layer-layer-2-(predeploys))

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#token-addresses)
[WOKB](https://www.okx.com/web3/explorer/xlayer/token/0xe538905cf8410324e03A5A23C1c177a474D59b2b)
[0xe538905cf8410324e03A5A23C1c177a474D59b2b](https://www.okx.com/web3/explorer/xlayer/token/0xe538905cf8410324e03A5A23C1c177a474D59b2b)
[WETH](https://www.okx.com/web3/explorer/xlayer/token/0x5A77f1443D16ee5761d310e38b62f77f726bC71c)
[0x5A77f1443D16ee5761d310e38b62f77f726bC71c](https://www.okx.com/web3/explorer/xlayer/token/0x5A77f1443D16ee5761d310e38b62f77f726bC71c)
[0xBec7859BC3d0603BeC454F7194173E36BF2Aa5C8](https://www.okx.com/web3/explorer/xlayer-test/token/0xBec7859BC3d0603BeC454F7194173E36BF2Aa5C8)
[USDT](https://www.okx.com/web3/explorer/xlayer/token/0x1E4a5963aBFD975d8c9021ce480b42188849D41d)
[0x1E4a5963aBFD975d8c9021ce480b42188849D41d](https://www.okx.com/web3/explorer/xlayer/token/0x1E4a5963aBFD975d8c9021ce480b42188849D41d)
[USDT0](https://www.okx.com/web3/explorer/xlayer/token/0x779Ded0c9e1022225f8E0630b35a9b54bE713736)
[0x779Ded0c9e1022225f8E0630b35a9b54bE713736](https://www.okx.com/web3/explorer/xlayer/token/0x779Ded0c9e1022225f8E0630b35a9b54bE713736)
[USDC](https://www.okx.com/web3/explorer/xlayer/token/0x74b7F16337b8972027F6196A17a631aC6dE26d22)
[0x74b7F16337b8972027F6196A17a631aC6dE26d22](https://www.okx.com/web3/explorer/xlayer/token/0x74b7F16337b8972027F6196A17a631aC6dE26d22)
[USDC.e](https://www.okx.com/web3/explorer/xlayer/token/0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035)
[0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035](https://www.okx.com/web3/explorer/xlayer/token/0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035)
[WBTC](https://www.okx.com/web3/explorer/xlayer/token/0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1)
[0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1](https://www.okx.com/web3/explorer/xlayer/token/0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1)
[DAI](https://www.okx.com/web3/explorer/xlayer/token/0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4)
[0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4](https://www.okx.com/web3/explorer/xlayer/token/0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4)
[xBTC](https://www.okx.com/web3/explorer/xlayer/token/0xb7C00000bcDEeF966b20B3D884B98E64d2b06b4f)
[0xb7C00000bcDEeF966b20B3D884B98E64d2b06b4f](https://www.okx.com/web3/explorer/xlayer/token/0xb7C00000bcDEeF966b20B3D884B98E64d2b06b4f)
[USDG](https://www.okx.com/web3/explorer/xlayer/token/0x4ae46a509F6b1D9056937BA4500cb143933D2dc8)
[0x4ae46a509F6b1D9056937BA4500cb143933D2dc8](https://www.okx.com/web3/explorer/xlayer/token/0x4ae46a509F6b1D9056937BA4500cb143933D2dc8)
[Network information](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Address Format](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format)
[X Layer contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts#x-layer-contracts)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format

Title: Address Format | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Address Format.

Source: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts)
[Address Format](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#address-format)
X Layer is an EVM-compatible blockchain network that supports two address formats: Standard EVM Address Format and XKO Prefix Address Format.

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#supported-address-formats)

### Standard EVM Address Format[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#standard-evm-address-format)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#standard-evm-address-format)
- Format: 0x + 40 hexadecimal characters
- Example: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625
- Features:

Complies with EIP-55 checksum standard (mixed case)
Fully compatible with all Ethereum tools and wallets


- Complies with EIP-55 checksum standard (mixed case)
- Fully compatible with all Ethereum tools and wallets

```
0x
```


```
0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625
```

- Complies with EIP-55 checksum standard (mixed case)
- Fully compatible with all Ethereum tools and wallets

### XKO Prefix Address Format[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#xko-prefix-address-format)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#xko-prefix-address-format)
- Format: XKO + 40 hexadecimal characters
- Example: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625
- Features:

X Layer proprietary address format
Case-insensitive prefix (XKO, xko, Xko all valid)
Preserves EIP-55 checksum casing
Easy identification of X Layer ecosystem addresses


- X Layer proprietary address format
- Case-insensitive prefix (XKO, xko, Xko all valid)
- Preserves EIP-55 checksum casing
- Easy identification of X Layer ecosystem addresses

```
XKO
```


```
XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625
```

- X Layer proprietary address format
- Case-insensitive prefix (XKO, xko, Xko all valid)
- Preserves EIP-55 checksum casing
- Easy identification of X Layer ecosystem addresses

### Address Equivalence[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#address-equivalence)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#address-equivalence)
The same account can be represented in both formats, pointing to the same on-chain account:

```
Standard EVM: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 XKO address: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 xko70586beeb7b7aa2e7966df9c8493c6cbfd75c625 ✓ Valid Xko70586beeb7b7aa2e7966df9c8493c6cbfd75c625 ✓ Valid
```


```
Standard EVM: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 XKO address: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 xko70586beeb7b7aa2e7966df9c8493c6cbfd75c625 ✓ Valid Xko70586beeb7b7aa2e7966df9c8493c6cbfd75c625 ✓ Valid
```

Invalid format examples:

```
XKO0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 ✗ Cannot have both XKO and 0x
```


```
XKO0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 ✗ Cannot have both XKO and 0x
```

## XKO Prefix Address Design[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#xko-prefix-address-design)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#xko-prefix-address-design)
XKO address is essentially an alternative representation of a standard EVM address:
1. Address Core: 40 hexadecimal characters (same as EVM address)
2. Prefix Replacement: XKO replaces 0x prefix
3. Checksum Preservation: Maintains Keccak-256 hash-based case checksum
4. On-Chain Storage: Stored as standard 20-byte address on-chain

```
XKO
```


```
0x
```

## SDK Integration Guide[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#sdk-integration-guide)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#sdk-integration-guide)
X Layer provides multi-language SDKs for address format conversion, supporting:
- JavaScript
- TypeScript
- Python
- Go
- Rust
- Java

### Core APIs[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#core-apis)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#core-apis)
All SDKs provide two core functions:

```
toEvmAddress
```


```
0x...
```


```
XKO...
```


```
0x
```


```
fromEvmAddress
```


```
0x...
```


```
XKO
```

Some SDKs also provide utility functions:

```
isXlayerAddress
```

### JavaScript SDK[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#javascript-sdk)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#javascript-sdk)
Installation:

```
npm install js-sha3
```


```
npm install js-sha3
```

Usage Example:

```
const { toEvmAddress, fromEvmAddress } = require('./multiAddress.js'); // XKO to standard EVM address const evmAddr = toEvmAddress('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); console.log(evmAddr); // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // Standard EVM to XKO address const xkoAddr = fromEvmAddress('0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625'); console.log(xkoAddr); // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // Supports multiple input formats toEvmAddress('0x70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); // ✓ toEvmAddress('70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); // ✓ toEvmAddress('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); // ✓
```


```
const { toEvmAddress, fromEvmAddress } = require('./multiAddress.js'); // XKO to standard EVM address const evmAddr = toEvmAddress('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); console.log(evmAddr); // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // Standard EVM to XKO address const xkoAddr = fromEvmAddress('0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625'); console.log(xkoAddr); // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // Supports multiple input formats toEvmAddress('0x70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); // ✓ toEvmAddress('70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); // ✓ toEvmAddress('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); // ✓
```

Error Handling:

```
try { toEvmAddress('invalid'); } catch (error) { console.error(error.message); // Output: Invalid address length: expected 40 hex chars, got 7 }
```


```
try { toEvmAddress('invalid'); } catch (error) { console.error(error.message); // Output: Invalid address length: expected 40 hex chars, got 7 }
```

### TypeScript SDK[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#typescript-sdk)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#typescript-sdk)
Installation:

```
npm install js-sha3
```


```
npm install js-sha3
```

Usage Example:

```
import { toEvmAddress, fromEvmAddress } from './multiAddress'; // Type-safe address conversion const evmAddr: string = toEvmAddress('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); const xkoAddr: string = fromEvmAddress('0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625'); // Type checking toEvmAddress(123); // TypeScript compile error
```


```
import { toEvmAddress, fromEvmAddress } from './multiAddress'; // Type-safe address conversion const evmAddr: string = toEvmAddress('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625'); const xkoAddr: string = fromEvmAddress('0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625'); // Type checking toEvmAddress(123); // TypeScript compile error
```

### Python SDK[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#python-sdk)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#python-sdk)
Installation:

```
pip install eth-utils
```


```
pip install eth-utils
```

Usage Example:

```
from multi_address import to_evm_address, from_evm_address # XKO to EVM evm_addr = to_evm_address('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625') print(evm_addr) # Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 # EVM to XKO xko_addr = from_evm_address('0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625') print(xko_addr) # Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 # Error handling try: to_evm_address('invalid') except ValueError as e: print(e) # Output: Invalid address length: expected 40 hex chars, got 7
```


```
from multi_address import to_evm_address, from_evm_address # XKO to EVM evm_addr = to_evm_address('XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625') print(evm_addr) # Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 # EVM to XKO xko_addr = from_evm_address('0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625') print(xko_addr) # Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 # Error handling try: to_evm_address('invalid') except ValueError as e: print(e) # Output: Invalid address length: expected 40 hex chars, got 7
```

### Go SDK[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#go-sdk)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#go-sdk)
Installation:

```
go get golang.org/x/crypto/sha3
```


```
go get golang.org/x/crypto/sha3
```

Usage Example:

```
package main import ( "fmt" "log" address "your-module/multi_address" ) func main() { // XKO to EVM evmAddr, err := address.ToEvmAddress("XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625") if err != nil { log.Fatal(err) } fmt.Println(evmAddr) // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // EVM to XKO xkoAddr, err := address.FromEvmAddress("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625") if err != nil { log.Fatal(err) } fmt.Println(xkoAddr) // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 }
```


```
package main import ( "fmt" "log" address "your-module/multi_address" ) func main() { // XKO to EVM evmAddr, err := address.ToEvmAddress("XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625") if err != nil { log.Fatal(err) } fmt.Println(evmAddr) // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // EVM to XKO xkoAddr, err := address.FromEvmAddress("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625") if err != nil { log.Fatal(err) } fmt.Println(xkoAddr) // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 }
```

### Rust SDK[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#rust-sdk)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#rust-sdk)
Add Dependency (Cargo.toml):

```
[dependencies] multi_address = { path = "path/to/address/rust" }
```


```
[dependencies] multi_address = { path = "path/to/address/rust" }
```

Usage Example:

```
use multi_address::{to_evm_address, from_evm_address}; fn main() { // XKO to EVM match to_evm_address("XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625") { Ok(evm_addr) => println!("{}", evm_addr), // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 Err(e) => eprintln!("Error: {}", e), } // EVM to XKO match from_evm_address("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625") { Ok(xko_addr) => println!("{}", xko_addr), // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 Err(e) => eprintln!("Error: {}", e), } }
```


```
use multi_address::{to_evm_address, from_evm_address}; fn main() { // XKO to EVM match to_evm_address("XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625") { Ok(evm_addr) => println!("{}", evm_addr), // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 Err(e) => eprintln!("Error: {}", e), } // EVM to XKO match from_evm_address("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625") { Ok(xko_addr) => println!("{}", xko_addr), // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 Err(e) => eprintln!("Error: {}", e), } }
```

[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#java-sdk)
Maven Dependency:

```
<dependency> <groupId>com.okcoin</groupId> <artifactId>xlayer-sdk</artifactId> <version>0.2.1</version> </dependency>
```


```
<dependency> <groupId>com.okcoin</groupId> <artifactId>xlayer-sdk</artifactId> <version>0.2.1</version> </dependency>
```

Usage Example:

```
import com.okcoin.MultiAddress; public class Example { public static void main(String[] args) { // XKO to EVM String evmAddr = MultiAddress.toEvmAddress("XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625"); System.out.println(evmAddr); // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // EVM to XKO String xkoAddr = MultiAddress.fromEvmAddress("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625"); System.out.println(xkoAddr); // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // Check if XKO address boolean isXko = MultiAddress.isXlayerAddress("XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625"); System.out.println(isXko); // true boolean isNotXko = MultiAddress.isXlayerAddress("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625"); System.out.println(isNotXko); // false // Error handling try { MultiAddress.toEvmAddress("invalid"); } catch (IllegalArgumentException e) { System.err.println(e.getMessage()); // Output: Invalid address length: expected 40 hex chars, got 7 } } }
```


```
import com.okcoin.MultiAddress; public class Example { public static void main(String[] args) { // XKO to EVM String evmAddr = MultiAddress.toEvmAddress("XKO70586beeb7b7aa2e7966df9c8493c6cbfd75c625"); System.out.println(evmAddr); // Output: 0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // EVM to XKO String xkoAddr = MultiAddress.fromEvmAddress("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625"); System.out.println(xkoAddr); // Output: XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625 // Check if XKO address boolean isXko = MultiAddress.isXlayerAddress("XKO70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625"); System.out.println(isXko); // true boolean isNotXko = MultiAddress.isXlayerAddress("0x70586BeEB7b7Aa2e7966DF9c8493C6CbFd75C625"); System.out.println(isNotXko); // false // Error handling try { MultiAddress.toEvmAddress("invalid"); } catch (IllegalArgumentException e) { System.err.println(e.getMessage()); // Output: Invalid address length: expected 40 hex chars, got 7 } } }
```

## Security Considerations[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#security-considerations)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#security-considerations)
Important: XKO addresses are only for off-chain interactions (UI display, etc.)
In transaction RLP encoding:
- ❌ Cannot use XKO format addresses
- ✅ Must use standard 20-byte address format
- The chain automatically rejects transactions containing XKO format addresses
SDKs handle this conversion automatically, but if manually constructing transactions, use the standard format.

## Frequently Asked Questions (FAQ)[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#frequently-asked-questions-(faq))
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#frequently-asked-questions-(faq))

### Q1: What's the difference between XKO and EVM addresses?[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q1:-what's-the-difference-between-xko-and-evm-addresses?)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q1:-what's-the-difference-between-xko-and-evm-addresses?)
A: They are completely equivalent on-chain, differing only in prefix. XKO addresses use XKO prefix, while EVM addresses use 0x prefix.

```
XKO
```


```
0x
```

### Q2: Can I use XKO addresses directly in transactions?[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q2:-can-i-use-xko-addresses-directly-in-transactions?)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q2:-can-i-use-xko-addresses-directly-in-transactions?)
A: No. When constructing RLP-encoded transactions, you must use the standard 20-byte address. XKO format is only for off-chain interactions (RPC queries, UI display).

### Q3: Is case sensitivity important?[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q3:-is-case-sensitivity-important?)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q3:-is-case-sensitivity-important?)
A: The XKO prefix is case-insensitive (XKO, xko, Xko all valid). However, the address body preserves EIP-55 checksum casing for error detection.

### Q4: How do I validate address format?[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q4:-how-do-i-validate-address-format?)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#q4:-how-do-i-validate-address-format?)
A: Use the SDK conversion functions. They will throw exceptions if the address format is invalid.

## Resources[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#resources)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#resources)
- GitHub Repository: [xlayer-sdk](https://github.com/okx/xlayer-sdk)
[xlayer-sdk](https://github.com/okx/xlayer-sdk)

## License[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#license)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#license)
This SDK is released under the MIT License.

## Support[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#support)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#support)
For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/okx/xlayer-sdk/issues)
[Create an issue](https://github.com/okx/xlayer-sdk/issues)
[Contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/contracts)
[Deploying contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Supported Address Formats](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#supported-address-formats)
[XKO Prefix Address Design](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#xko-prefix-address-design)
[SDK Integration Guide](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#sdk-integration-guide)
[Security Considerations](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#security-considerations)
[Frequently Asked Questions (FAQ)](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#frequently-asked-questions-(faq))
[Resources](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#resources)
[License](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#license)
[Support](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format#support)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract

Title: Deploying contract | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Deploying contract.

Source: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Deploying with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)
[Deploying with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[Deploying with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

# Deploying contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract#deploying-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract#deploying-contract)
[Deploying with TruffleGuide to deploy contract with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[Deploying with HardhatGuide to deploy contract with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)
[Deploying with FoundryGuide to deploy contract with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[Address Format](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/address-format)
[Deploying with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat

Title: Deploying with Hardhat | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Deploying with Hardhat.

Source: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Deploying with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)
[Deploying with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[Deploying with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#deploying-with-hardhat)
In this tutorial, we explain step-by-step how to create, compile and deploy a simple smart contract on the X Layer testnet using Hardhat.

## What is Hardhat[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#what-is-hardhat)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#what-is-hardhat)
Hardhat is a development environment to compile, deploy, test, and debug your smart contract.

## Setting up the development environment[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#setting-up-the-development-environment)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#setting-up-the-development-environment)
Prerequisites:
- [Node.js v18+ LTS and npm](https://nodejs.org/en) (comes with Node)
- [Git](https://git-scm.com/)
[Node.js v18+ LTS and npm](https://nodejs.org/en)
[Git](https://git-scm.com/)
To install Hardhat, you need to create an npm project by going to an empty folder, running npm init, and following its instructions. You can use another package manager, like yarn, but we recommend you use npm 7 or later, as it makes installing Hardhat plugins simpler.

```
npm init
```

Once your project is ready, you should run npm install --save-dev hardhat , install Hardhat toolbox npm install @nomicfoundation/hardhat-toolbox . In order to use your local installation of Hardhat, you need to use npx to run it (i.e., npx hardhat).

```
npm install --save-dev hardhat
```


```
npm install @nomicfoundation/hardhat-toolbox
```


```
npx
```


```
npx hardhat
```

## Creating your contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#creating-your-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#creating-your-contract)
To create the sample project, run npx hardhat in your project folder:

```
npx hardhat
```


```
$ npx hardhat 888 888 888 888 888 888 888 888 888 888 888 888 888 888 888 8888888888 8888b. 888d888 .d88888 88888b. 8888b. 888888 888 888 "88b 888P" d88" 888 888 "88b "88b 888 888 888 .d888888 888 888 888 888 888 .d888888 888 888 888 888 888 888 Y88b 888 888 888 888 888 Y88b. 888 888 "Y888888 888 "Y88888 888 888 "Y888888 "Y888 👷 Welcome to Hardhat v2.9.9 👷 ? What do you want to do? … ❯ Create a JavaScript project Create a TypeScript project Create an empty hardhat.config.js Quit
```


```
$ npx hardhat 888 888 888 888 888 888 888 888 888 888 888 888 888 888 888 8888888888 8888b. 888d888 .d88888 88888b. 8888b. 888888 888 888 "88b 888P" d88" 888 888 "88b "88b 888 888 888 .d888888 888 888 888 888 888 .d888888 888 888 888 888 888 888 Y88b 888 888 888 888 888 Y88b. 888 888 "Y888888 888 "Y88888 888 888 "Y888888 "Y888 👷 Welcome to Hardhat v2.9.9 👷 ? What do you want to do? … ❯ Create a JavaScript project Create a TypeScript project Create an empty hardhat.config.js Quit
```

## Compiling your contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#compiling-your-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#compiling-your-contract)
Next, if you take a look at the contracts/ folder, you will see Lock.sol:

```
contracts/
```


```
Lock.sol
```


```
// SPDX-License-Identifier: UNLICENSED pragma solidity ^0.8.9; // Uncomment this line to use console.log // import "hardhat/console.sol"; contract Lock { uint public unlockTime; address payable public owner; event Withdrawal(uint amount, uint when); constructor(uint _unlockTime) payable { require( block.timestamp < _unlockTime, "Unlock time should be in the future" ); unlockTime = _unlockTime; owner = payable(msg.sender); } function withdraw() public { // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp); require(block.timestamp >= unlockTime, "You can't withdraw yet"); require(msg.sender == owner, "You aren't the owner"); emit Withdrawal(address(this).balance, block.timestamp); owner.transfer(address(this).balance); } }
```


```
// SPDX-License-Identifier: UNLICENSED pragma solidity ^0.8.9; // Uncomment this line to use console.log // import "hardhat/console.sol"; contract Lock { uint public unlockTime; address payable public owner; event Withdrawal(uint amount, uint when); constructor(uint _unlockTime) payable { require( block.timestamp < _unlockTime, "Unlock time should be in the future" ); unlockTime = _unlockTime; owner = payable(msg.sender); } function withdraw() public { // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp); require(block.timestamp >= unlockTime, "You can't withdraw yet"); require(msg.sender == owner, "You aren't the owner"); emit Withdrawal(address(this).balance, block.timestamp); owner.transfer(address(this).balance); } }
```

To compile it, simply run npx hardhat compile

```
npx hardhat compile
```

## Setting configuration file[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#setting-configuration-file)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#setting-configuration-file)
In order to connect to the X Layer network, we need to configure the corresponding network. To set up your config, you have to export an object from hardhat.config.js:

```
hardhat.config.js
```


```
module.exports = { defaultNetwork: "hardhat", networks: { hardhat: { }, xlayer: { url: "https://testrpc.xlayer.tech/terigon", accounts: [privateKey1, privateKey2, ...] } } }
```


```
module.exports = { defaultNetwork: "hardhat", networks: { hardhat: { }, xlayer: { url: "https://testrpc.xlayer.tech/terigon", accounts: [privateKey1, privateKey2, ...] } } }
```

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#deploying-your-contract)
Next, to deploy the contract, we will use a Hardhat script. Inside the scripts/ folder you will find a file with the following code:

```
scripts/
```


```
// We require the Hardhat Runtime Environment explicitly here. This is optional // but useful for running the script in a standalone fashion through `node <script>`. // // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat // will compile your contracts, add the Hardhat Runtime Environment's members to the // global scope, and execute the script. const hre = require("hardhat"); async function main() { const currentTimestampInSeconds = Math.round(Date.now() / 1000); const unlockTime = currentTimestampInSeconds + 60; const lockedAmount = hre.ethers.utils.parseEther("0.001"); const Lock = await hre.ethers.getContractFactory("Lock"); const lock = await Lock.deploy(unlockTime, { value: lockedAmount }); await lock.deployed(); console.log( `Lock with ${ethers.utils.formatEther( lockedAmount )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}` ); } // We recommend this pattern to be able to use async/await everywhere // and properly handle errors. main().catch((error) => { console.error(error); process.exitCode = 1; });
```


```
// We require the Hardhat Runtime Environment explicitly here. This is optional // but useful for running the script in a standalone fashion through `node <script>`. // // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat // will compile your contracts, add the Hardhat Runtime Environment's members to the // global scope, and execute the script. const hre = require("hardhat"); async function main() { const currentTimestampInSeconds = Math.round(Date.now() / 1000); const unlockTime = currentTimestampInSeconds + 60; const lockedAmount = hre.ethers.utils.parseEther("0.001"); const Lock = await hre.ethers.getContractFactory("Lock"); const lock = await Lock.deploy(unlockTime, { value: lockedAmount }); await lock.deployed(); console.log( `Lock with ${ethers.utils.formatEther( lockedAmount )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}` ); } // We recommend this pattern to be able to use async/await everywhere // and properly handle errors. main().catch((error) => { console.error(error); process.exitCode = 1; });
```

Now, you can run it using npx hardhat run:

```
npx hardhat run
```


```
$ npx hardhat run scripts/deploy.js --network XLayer Lock with 1 ETH deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```


```
$ npx hardhat run scripts/deploy.js --network XLayer Lock with 1 ETH deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

[Deploying contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Deploying with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[What is Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#what-is-hardhat)
[Setting up the development environment](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#setting-up-the-development-environment)
[Creating your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#creating-your-contract)
[Compiling your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#compiling-your-contract)
[Setting configuration file](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#setting-configuration-file)
[Deploying your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat#deploying-your-contract)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry

Title: Deploying with Foundry | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Deploying with Foundry.

Source: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Deploying with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)
[Deploying with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[Deploying with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#deploying-with-foundry)
In this tutorial, we explain step-by-step how to create, compile and deploy a simple smart contract on the X Layer testnet using Foundry.

## What is Foundry[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#what-is-foundry)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#what-is-foundry)
[Foundry](https://github.com/foundry-rs/foundry) offers a complete set of tools for building and deploying decentralized applications (DApps) on the Ethereum blockchain. Utilizing Foundry, you can write smart contracts using the Solidity programming language, compile, deploy, and interact on the Ethereum blockchain.

## Setting up the development environment[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#setting-up-the-development-environment)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#setting-up-the-development-environment)
- [Node.js V18+ LTS and npm](https://nodejs.org/en) (comes with node)
- [Git](https://git-scm.com/)
[Node.js V18+ LTS and npm](https://nodejs.org/en)
[Git](https://git-scm.com/)
If you have not installed Foundry, go to book.getfoundry and select Installation from the side menu. Follow the instructions to download using Foundryup.

```
curl -L https://foundry.paradigm.xyz | bash
```


```
curl -L https://foundry.paradigm.xyz | bash
```

If everything goes successfully, you can use four CLI in the terminal: forge, cast, anvil, and chisel.

## Creating your contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#creating-your-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#creating-your-contract)
Initialize a project with the following command:

```
forge init hello_contract cd hello_contract
```


```
forge init hello_contract cd hello_contract
```

In the hello_contract/src folder, you can edit the Counter.sol file:

```
hello_contract/src
```


```
Counter.sol
```


```
// SPDX-License-Identifier: UNLICENSED pragma solidity ^0.8.13; contract Counter { uint256 public number; function setNumber(uint256 newNumber) public { number = newNumber; } function increment() public { number++; } }
```


```
// SPDX-License-Identifier: UNLICENSED pragma solidity ^0.8.13; contract Counter { uint256 public number; function setNumber(uint256 newNumber) public { number = newNumber; } function increment() public { number++; } }
```

## Compiling your contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#compiling-your-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#compiling-your-contract)
Next, you can compile the contract with the forge command:

```
forge
```


```
forge build
```


```
forge build
```

If all goes accordingly, you will see the details:

```
[⠔] Compiling... [⠢] Compiling 22 files with 0.8.16 [⠔] Solc 0.8.16 finished in 2.75s Compiler run successful!
```


```
[⠔] Compiling... [⠢] Compiling 22 files with 0.8.16 [⠔] Solc 0.8.16 finished in 2.75s Compiler run successful!
```

## Deploying your contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#deploying-your-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#deploying-your-contract)
You can run the forge create command to deploy your contract. Replace the HTTP_URL with your actual endpoint, and PRIVATE_KEY with your actual private key.

```
forge create --rpc-url HTTP_URL \ --private-key PRIVATE_KEY \ src/Counter.sol: Counter
```


```
forge create --rpc-url HTTP_URL \ --private-key PRIVATE_KEY \ src/Counter.sol: Counter
```

If it goes well, you will see the details such as:

```
[⠆] Compiling... No files changed, compilation skipped Deployer: 0x9536354AE32852A7E7C4BFe7415b104016d5Fb04 Deployed to: 0xF0D4950d45CFf612A02f453771CF93418dCaaA0B Transaction hash: 0xc09923e09e5f4a72053bcf72ca66e0fdf434ab63380481ab39ae281c63a716a0
```


```
[⠆] Compiling... No files changed, compilation skipped Deployer: 0x9536354AE32852A7E7C4BFe7415b104016d5Fb04 Deployed to: 0xF0D4950d45CFf612A02f453771CF93418dCaaA0B Transaction hash: 0xc09923e09e5f4a72053bcf72ca66e0fdf434ab63380481ab39ae281c63a716a0
```

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#interacting-with-your-contract)
You can run the cast command to interact with your contract. Write a call with the setNumber function, such as:

```
cast send CONTRACT_ADDRESS "setNumber(uint256)" 10 --rpc-url HTTP_URL --private-key PRIVATE_KEY
```


```
cast send CONTRACT_ADDRESS "setNumber(uint256)" 10 --rpc-url HTTP_URL --private-key PRIVATE_KEY
```

If all goes accordingly, you will see the details:

```
blockHash 0xf1ceea989197708be58264f3e7ebeae3ebffc5d6f345d053fd73c932627ea7fb blockNumber 9760236 contractAddress cumulativeGasUsed 2638507 effectiveGasPrice 3000000070 gasUsed 43494 logs [] logsBloom 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 root status 1 transactionHash 0xd17510371187101f37e96a6287dea64467eeeddae56207e45807e8626c4b01b4 transactionIndex 6 type 2
```


```
blockHash 0xf1ceea989197708be58264f3e7ebeae3ebffc5d6f345d053fd73c932627ea7fb blockNumber 9760236 contractAddress cumulativeGasUsed 2638507 effectiveGasPrice 3000000070 gasUsed 43494 logs [] logsBloom 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 root status 1 transactionHash 0xd17510371187101f37e96a6287dea64467eeeddae56207e45807e8626c4b01b4 transactionIndex 6 type 2
```

Read a call with the number function, such as:

```
cast call CONTRACT_ADDRESS "number()" --rpc-url HTTP_URL
```


```
cast call CONTRACT_ADDRESS "number()" --rpc-url HTTP_URL
```

If all goes accordingly, you will see the details:

```
0x000000000000000000000000000000000000000000000000000000000000000a
```


```
0x000000000000000000000000000000000000000000000000000000000000000a
```

[Deploying with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)
[Deploying with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[What is Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#what-is-foundry)
[Setting up the development environment](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#setting-up-the-development-environment)
[Creating your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#creating-your-contract)
[Compiling your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#compiling-your-contract)
[Deploying your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#deploying-your-contract)
[Interacting with your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry#interacting-with-your-contract)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle

Title: Deploying with Truffle | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Deploying with Truffle.

Source: https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Deploying with Hardhat](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-hardhat)
[Deploying with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[Deploying with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#deploying-with-truffle)
In this tutorial, we explain step-by-step how to create, compile and deploy a simple smart contract on the X Layer testnet using Truffle.

## What is Truffle?[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#what-is-truffle?)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#what-is-truffle?)
Truffle is the most popular development tooling for Ethereum programmers.

## Setting up the development environment[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#setting-up-the-development-environment)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#setting-up-the-development-environment)
There are a few technical requirements before we start. Please install the following:
- [Node.js v18 LTS](https://nodejs.org/en/) or later
- [Git](https://git-scm.com/)
[Node.js v18 LTS](https://nodejs.org/en/)
[Git](https://git-scm.com/)
Recommendations for Windows users: If you’re running Truffle on Windows, you may encounter some naming conflicts that could prevent Truffle from executing properly. Please see the section on resolving naming conflicts for solutions. Once we have those installed, we only need one command to install Truffle:

```
npm install -g truffle
```


```
npm install -g truffle
```

To verify that Truffle is installed properly, type truffle version on a terminal. If you see an error, make sure that your npm modules are added to your path.

```
truffle version
```

## Creating a project[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#creating-a-project)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#creating-a-project)
The first step is to create a Truffle project. We’ll use MegaCoin as an example, which allows you to create a token that can be transferred between accounts:
- Create a new directory for your Truffle project:

```
mkdir MegaCoin cd MegaCoin
```


```
mkdir MegaCoin cd MegaCoin
```

- Initialize your project:

```
truffle init
```


```
truffle init
```

Once this operation is completed, you’ll now have a project structure with the following items:
- contracts/: Directory for Solidity contracts
- migrations/: Directory for scriptable deployment files
- test/: Directory for test files for testing your application and contracts
- truffle-config.js: Truffle configuration file

```
contracts/
```


```
migrations/
```


```
test/
```


```
truffle-config.js
```

## Creating a contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#creating-a-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#creating-a-contract)
You can write your own smart contract or download the [ERC-20 token smart contract template](https://docs.openzeppelin.com/contracts/4.x/erc20).

## Compiling a contract[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#compiling-a-contract)
[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#compiling-a-contract)
To compile a Truffle project, change to the root of the directory where the project is located and then type the following into a terminal:

```
truffle compile
```


```
truffle compile
```

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#config-truffle-for-x-layer)
- Go to truffle-config.js
- Update the truffle-config with XLayer-network-crendentials

```
const HDWalletProvider = require('truffle-hdwallet-provider'); const fs = require('fs'); const mnemonic = fs.readFileSync(".secret").toString().trim(); module.exports = { networks: { development: { host: "127.0.0.1", // Localhost (default: none) port: 8545, // Standard X Layer port (default: none) network_id: "*", // Any network (default: none) }, testnet: { provider: () => new HDWalletProvider(mnemonic, `https://testrpc.xlayer.tech/terigon`), network_id:1952, confirmations: 10, timeoutBlocks: 200, skipDryRun: true }, }, // Set default mocha options here, use special reporters etc. mocha: { // timeout: 100000 }, // Configure your compilers compilers: { solc: { } } }
```


```
const HDWalletProvider = require('truffle-hdwallet-provider'); const fs = require('fs'); const mnemonic = fs.readFileSync(".secret").toString().trim(); module.exports = { networks: { development: { host: "127.0.0.1", // Localhost (default: none) port: 8545, // Standard X Layer port (default: none) network_id: "*", // Any network (default: none) }, testnet: { provider: () => new HDWalletProvider(mnemonic, `https://testrpc.xlayer.tech/terigon`), network_id:1952, confirmations: 10, timeoutBlocks: 200, skipDryRun: true }, }, // Set default mocha options here, use special reporters etc. mocha: { // timeout: 100000 }, // Configure your compilers compilers: { solc: { } } }
```


```
.secret
```

[#](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#deploying-your-contract)
Run this command in the root of the project directory:

```
$ truffle migrate --network testnet
```


```
$ truffle migrate --network testnet
```

The contract will be deployed on X Layer Chapel Testnet. It looks like this:

```
1_initial_migration.js ====================== Deploying 'Migrations' ---------------------- > transaction hash: 0xaf4502198400bde2148eb4274b08d727a17080b685cd2dcd4aee13d8eb954adc > Blocks: 3 Seconds: 9 > contract address: 0x81eCD10b61978D9160428943a0c0Fb31a5460466 > block number: 3223948 > block timestamp: 1604049862 > account: 0x623ac9f6E62A8134bBD5Dc96D9B8b29b4B60e45F > balance: 6.24574114 > gas used: 191943 (0x2edc7) > gas price: 20 gwei > value sent: 0 ETH > total cost: 0.00383886 ETH Pausing for 5 confirmations... ------------------------------ > confirmation number: 2 (block: 3223952) > confirmation number: 3 (block: 3223953) > confirmation number: 4 (block: 3223954) > confirmation number: 6 (block: 3223956) > Saving migration to chain. > Saving artifacts ------------------------------------- > Total cost: 0.00383886 ETH Summary ======= > Total deployments: 1 > Final cost: 0.00383886 ETH
```


```
1_initial_migration.js ====================== Deploying 'Migrations' ---------------------- > transaction hash: 0xaf4502198400bde2148eb4274b08d727a17080b685cd2dcd4aee13d8eb954adc > Blocks: 3 Seconds: 9 > contract address: 0x81eCD10b61978D9160428943a0c0Fb31a5460466 > block number: 3223948 > block timestamp: 1604049862 > account: 0x623ac9f6E62A8134bBD5Dc96D9B8b29b4B60e45F > balance: 6.24574114 > gas used: 191943 (0x2edc7) > gas price: 20 gwei > value sent: 0 ETH > total cost: 0.00383886 ETH Pausing for 5 confirmations... ------------------------------ > confirmation number: 2 (block: 3223952) > confirmation number: 3 (block: 3223953) > confirmation number: 4 (block: 3223954) > confirmation number: 6 (block: 3223956) > Saving migration to chain. > Saving artifacts ------------------------------------- > Total cost: 0.00383886 ETH Summary ======= > Total deployments: 1 > Final cost: 0.00383886 ETH
```


```
address
```


```
transaction_hash
```

Congratulations! You have successfully deployed your Smart Contract. Now you can interact with the Smart Contract.
[Deploying with Foundry](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-foundry)
[Verifying contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[What is Truffle?](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#what-is-truffle?)
[Setting up the development environment](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#setting-up-the-development-environment)
[Creating a project](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#creating-a-project)
[Creating a contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#creating-a-contract)
[Compiling a contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#compiling-a-contract)
[Deploying your contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle#deploying-your-contract)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract

Title: Verifying contract | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Verifying contract.

Source: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Manual verification](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)
[Verifying with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[Verifying with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

# Verifying contract[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract#verifying-contract)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract#verifying-contract)
[Manual verificationGuide to verify contract manually](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)
[Verifying with HardhatGuide to verify contract with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Verifying with FoundryGuide to verify contract with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[Deploying with Truffle](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploy-with-truffle)
[Manual verification](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification

Title: Manual verification | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Manual verification.

Source: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Manual verification](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)
[Verifying with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[Verifying with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)

# Manual verification[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification#manual-verification)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification#manual-verification)
After deploying a smart contract to xlayer, it can be verified in various ways depending on the framework of deployment, as well as the complexity of the contract. In this guide, we will provide examples to demonstrate the manual verification of a deployed smart contract.

## Verifying contract manually[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification#verifying-contract-manually)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification#verifying-contract-manually)
After successfully compiling a smart contract, follow the next steps to verify your smart contract.
1. Copy the Address to which the smart contract is deployed.
2. Navigate to [OKX Explorer](https://www.okx.com/explorer/) and select X Layer testnet or mainnet. Once you are on the right network, paste the contract address into the search box.
3. Now you are on the page that shows your contact address details. Scroll down to select Contracts and click on Verify the contract.
[OKX Explorer](https://www.okx.com/explorer/)
1. Select SingleFile and Compiler version.
1. Copy your contract code below and check Optimization if it is enabled.
That’s it! You have verified your contract. You will see ✅ The contract has been verified under your Contract tab.
[Verifying contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Verifying with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[Verifying contract manually](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification#verifying-contract-manually)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry

Title: Verifying with Foundry | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Verifying with Foundry.

Source: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Manual verification](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)
[Verifying with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[Verifying with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)

[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#verifying-with-foundry)
Foundry is a smart contract development toolchain and supports X Layer.
You can visit [here](https://book.getfoundry.sh/) to get started. The tutorial below will also guide you to verify your smart contract with Foundry.

## Important notes[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#important-notes)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#important-notes)
1. First, you need to apply for a key in [OKLink browser](https://www.oklink.com/docs/en#quickstart-guide-getting-started).
2. After you deploy your contract code, make sure to wait at least one minute before verifying it.
[OKLink browser](https://www.oklink.com/docs/en#quickstart-guide-getting-started)

## Verify by using Foundry[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#verify-by-using-foundry)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#verify-by-using-foundry)

## Example[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#example)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#example)
1. 
Ensure that you have applied for an OKLink API key [here](https://www.oklink.com/docs/en#quickstart-guide-getting-started).

2. 
Verify a smart contract with the forge verify-contract command.

Ensure that you have applied for an OKLink API key [here](https://www.oklink.com/docs/en#quickstart-guide-getting-started).
Verify a smart contract with the forge verify-contract command.

```
forge verify-contract
```

Note that you must provide the following:
- The smart contract address
- The contract name or the pathway to the smart contract such as <path>:<contractname>.
- The verify-url in the following format. You can find the chainShortName [here](https://www.oklink.com/docs/en#quickstart-guide-supported-chains).

```
<path>:<contractname>
```


```
verify-url
```


```
chainShortName
```

[here](https://www.oklink.com/docs/en#quickstart-guide-supported-chains)

```
https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/{chainShortName}
```


```
https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/{chainShortName}
```

- 
The OKLink API key in the following format:
Javascriptforge verify-contract <the_contract_address>
      src/MyToken.sol:MyToken  
      --verifier oklink 
      --verifier-url oklinkverifyUrl
      --api-key oklinkApiKey



The OKLink API key in the following format:

```
forge verify-contract <the_contract_address> src/MyToken.sol:MyToken --verifier oklink --verifier-url oklinkverifyUrl --api-key oklinkApiKey
```


```
forge verify-contract <the_contract_address> src/MyToken.sol:MyToken --verifier oklink --verifier-url oklinkverifyUrl --api-key oklinkApiKey
```

1. 
In case of an Etherscan verification, you must also provide your Etherscan API key, either by passing it as an argument or setting ETHERSCAN_API_KEY.

2. 
Check your verification results. It is recommended that you use the --watch flag along with the verify-contract command in order to poll for the verification result.

In case of an Etherscan verification, you must also provide your Etherscan API key, either by passing it as an argument or setting ETHERSCAN_API_KEY.

```
ETHERSCAN_API_KEY
```

Check your verification results. It is recommended that you use the --watch flag along with the verify-contract command in order to poll for the verification result.

```
--watch
```


```
verify-contract
```

If the --watch flag was not supplied, you can also check the verification status with the forge verify-check command:

```
--watch
```


```
forge verify-check
```


```
forge verify-check --chain 11155111 --verifier oklink --verifier-url https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/{chainShortName} --api-key <your_OKLink_api_key> <GUID>
```


```
forge verify-check --chain 11155111 --verifier oklink --verifier-url https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/{chainShortName} --api-key <your_OKLink_api_key> <GUID>
```

[Manual verification](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)
[Verifying with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Important notes](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#important-notes)
[Verify by using Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#verify-by-using-foundry)
[Example](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry#example)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat

Title: Verifying with Hardhat | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Verifying with Hardhat.

Source: https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Manual verification](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/manual-verification)
[Verifying with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[Verifying with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)

[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#verifying-with-hardhat)
There are currently two methods to verify your code on [OKLink](https://www.oklink.com/). You can either use the recommended [@okxweb3/hardhat-explorer-verify](https://github.com/okx/hardhat-explorer-verify) plugin, or modify the hardhat.config.js file according to Hardhat's [official documentation](https://hardhat.org/hardhat-runner/docs/guides/verifying).

```
hardhat.config.js
```

## Important notes[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#important-notes)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#important-notes)
1. First, you need to apply for a key in [OKLink browser](https://www.oklink.com/docs/en#quickstart-guide-getting-started).
2. After you deploy your contract code, make sure to wait at least one minute before verifying it.
[OKLink browser](https://www.oklink.com/docs/en#quickstart-guide-getting-started)

## Verify by using plugin (Recommended)[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#verify-by-using-plugin-(recommended))
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#verify-by-using-plugin-(recommended))

## Example[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#example)
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#example)
1. First, install the plugin in your Hardhat project by using the following command:
npm install @okxweb3/hardhat-explorer-verify

```
npm install @okxweb3/hardhat-explorer-verify
```

1. In your Hardhat configuration file (usually hardhat.config.js or hardhat.config.ts), import and configure the plugin. ensure that your network configuration and API keys are correctly set. Here is a sample configuration:

```
import "@nomicfoundation/hardhat-toolbox"; import '@okxweb3/hardhat-explorer-verify'; // Import the plugin const config: HardhatUserConfig = { solidity: "0.8.20", sourcify: { enabled: true, }, networks: { xlayer: { url: "https://xlayerrpc.example.com", accounts: ["<Your Wallet Private Key>"], }, }, etherscan: { apiKey: '...' }, okxweb3explorer: { apiKey: "<Your API Key>", } }; export default config;
```


```
import "@nomicfoundation/hardhat-toolbox"; import '@okxweb3/hardhat-explorer-verify'; // Import the plugin const config: HardhatUserConfig = { solidity: "0.8.20", sourcify: { enabled: true, }, networks: { xlayer: { url: "https://xlayerrpc.example.com", accounts: ["<Your Wallet Private Key>"], }, }, etherscan: { apiKey: '...' }, okxweb3explorer: { apiKey: "<Your API Key>", } }; export default config;
```

1. After deploying the contracts, use Hardhat to run the verification script. This typically involves running a specific Hardhat task that automatically fetches the contract data and submitting it to the OKX Chain explorer for verification.
Here is an example command:
npx hardhat okverify --network xlayer <Your Contract Address>

```
npx hardhat okverify --network xlayer <Your Contract Address>
```

1. Once verification is successful, you can view the verification status and the contract code on the OKX Chain blockchain explorer.
1. Verify TransparentUpgradeableProxy contract
An example command:
npx hardhat okxverify --network xlayer --contract <Contract>:<Name> --proxy <address>

```
npx hardhat okxverify --network xlayer --contract <Contract>:<Name> --proxy <address>
```

- --proxy refers to the proxy contract address.

```
--proxy
```


```
--proxy
```


```
--contract
```

## Verify by modifying hardhat.config.js (Alternative)[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#verify-by-modifying-hardhat.config.js-(alternative))
[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#verify-by-modifying-hardhat.config.js-(alternative))

[#](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#example)
1. Start by creating a Hardhat project and using the Lock contract as an example.
2. Next, modify the hardhat.config.js file in your project directory with the following changes.
For X Layer testnet or mainnet:

```
hardhat.config.js
```


```
module.exports = { solidity: "0.8.9", networks: { xlayer: { url: "https://testrpc.xlayer.tech/terigon", //or https://rpc.xlayer.tech for mainnet accounts: [process.env.PRIVKEY] } }, etherscan: { apiKey: process.env.ETHERSCAN_KEY, customChains: [ { network: "xlayer", chainId: 195, //196 for mainnet urls: { apiURL: "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET", //or https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER for mainnet browserURL: "https://www.oklink.com/xlayer-test" //or https://www.oklink.com/xlayer for mainnet } } ] } };
```


```
module.exports = { solidity: "0.8.9", networks: { xlayer: { url: "https://testrpc.xlayer.tech/terigon", //or https://rpc.xlayer.tech for mainnet accounts: [process.env.PRIVKEY] } }, etherscan: { apiKey: process.env.ETHERSCAN_KEY, customChains: [ { network: "xlayer", chainId: 195, //196 for mainnet urls: { apiURL: "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER_TESTNET", //or https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/XLAYER for mainnet browserURL: "https://www.oklink.com/xlayer-test" //or https://www.oklink.com/xlayer for mainnet } } ] } };
```

Replace process.env.PRIVKEY with your own deployment address’s private key, and process.env.ETHERSCAN_KEY can be filled with your OKLink API Key, which can be applied from [My account - API management] on [https://www.oklink.com/](https://www.oklink.com/) for free

```
process.env.PRIVKEY
```


```
process.env.ETHERSCAN_KEY
```

1. Compile your Hardhat contract code and deploy it with this command:

```
hh run scripts/deploy.js --network xlayer
```


```
hh run scripts/deploy.js --network xlayer
```

1. Wait for one to two minutes, and then verify the contract by running the following command and specifying the contract file you want to verify.

```
hh verify --contract contracts/Lock.sol:Lock <address> <unlock time> --network xlayer
```


```
hh verify --contract contracts/Lock.sol:Lock <address> <unlock time> --network xlayer
```

1. Check if the contract has been successfully verified by visiting [here](https://www.oklink.com/xlayer/address/0x21F2018Fe98f49C15Fab002f3D4cFBE9D6EeA88b#code) for mainnet.
[here](https://www.oklink.com/xlayer/address/0x21F2018Fe98f49C15Fab002f3D4cFBE9D6EeA88b#code)
[Verifying with Foundry](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-foundry)
[X Layer bridge overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Important notes](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#important-notes)
[Verify by using plugin (Recommended)](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#verify-by-using-plugin-(recommended))
[Example](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat#example)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/bridge/overview

Title: X Layer bridge overview | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about X Layer bridge overview.

Source: https://web3.okx.com/xlayer/docs/developer/bridge/overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Get testnet tokens and bridge](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet)
[USDC on X Layer](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

# X Layer bridge overview[#](https://web3.okx.com/xlayer/docs/developer/bridge/overview#x-layer-bridge-overview)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/overview#x-layer-bridge-overview)
X Layer remains focused on building a decentralized ecosystem. By empowering the community to develop and operate bridges, we are thus taking one more step towards that goal. For available third-party bridge options, please visit: [https://web3.okx.com/xlayer/bridge](https://web3.okx.com/xlayer/bridge)
[Verifying with Hardhat](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verify-with-hardhat)
[Get testnet tokens and bridge](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet

Title: Get testnet tokens and bridge | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Get testnet tokens and bridge.

Source: https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Get testnet tokens and bridge](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet)
[USDC on X Layer](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)

# Get testnet tokens and bridge[#](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet#get-testnet-tokens-and-bridge)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet#get-testnet-tokens-and-bridge)
Users and developers can receive OKB testnet tokens on X Layer from the official testnet faucet below, max of 0.2 OKB, [here](https://web3.okx.com/xlayer/faucet). In this guide, we will show the steps on how to receive OKB testnet.

## X Layer official testnet faucet[#](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet#x-layer-official-testnet-faucet)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet#x-layer-official-testnet-faucet)
The X Layer [testnet faucet](https://www.okx.com/xlayer/faucet) is an official tool provided by the X Layer team for developers to claim test tokens. Developers and users can use X Layer testnet faucet to obtain:
- Testnet OKB tokens
Please note that on the X Layer testnet, each user can only claim 0.2 OKB per day.
1. Head to the X Layer testnet faucet and click on the Get button for the "Get OKB from X Layer testnet" option.
1. Input your wallet address in the field. If you have connected a wallet plugin (EVM network), the field will automatically display your current wallet address. Next, click the Get 0.2 OKB button at the bottom.
[X Layer bridge overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[USDC on X Layer](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer)
[X Layer official testnet faucet](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet#x-layer-official-testnet-faucet)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer

Title: USDC on X Layer | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about USDC on X Layer.

Source: https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Get testnet tokens and bridge](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet)
[USDC on X Layer](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)

[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc-on-x-layer)

## The difference between USDC and USDC.e[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#the-difference-between-usdc-and-usdc.e)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#the-difference-between-usdc-and-usdc.e)

## USDC[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc)
Circle introduced the [Bridged USDC Standard](https://www.circle.com/en/bridged-usdc) to ensure that chain operators can easily deploy a form of bridged USDC that is capable of being upgraded in-place by Circle to native USDC, if and when appropriate, and prevent any fragmentation problems. X Layer official bridge and OKX Exchange has supported this USDC following Circle Bridged standard. It is USDC-e in the flowchart.

## USDC.e[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc.e)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc.e)
There also exists a “bridged” form of USDC known as USDC.e, which is USDC that has been bridged from Ethereum issued by X Layer. It is BWUSDC in the flowchart.

## Using USDC on X Layer[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#using-usdc-on-x-layer)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#using-usdc-on-x-layer)

## For users[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#for-users)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#for-users)
Users can get USDC on the X Layer mainnet in these ways:
1. Using third-party bridges
Some well known bridges are integrating with X Layers.
1. Using OKX exchange
[OKX](https://www.okx.com/) now supports USDC (not USDC.e) deposits and withdrawals.
1. Using third-party bridges
Some well known bridges are integrating with X Layers.

## For developers[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#for-developers)
[#](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#for-developers)
Please refer to the USDC workflow section.
[Get testnet tokens and bridge](https://web3.okx.com/xlayer/docs/developer/bridge/get-testnet-okb-from-faucet)
[X Layer Setup RPC overview](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[The difference between USDC and USDC.e](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#the-difference-between-usdc-and-usdc.e)
[USDC](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc)
[USDC.e](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#usdc.e)
[Using USDC on X Layer](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#using-usdc-on-x-layer)
[For users](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#for-users)
[For developers](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer#for-developers)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview

Title: X Layer Setup RPC overview | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about X Layer Setup RPC overview.

Source: https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[One-click Setup](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc)
[Snapshots](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

# X Layer Setup RPC overview[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview#x-layer-setup-rpc-overview)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview#x-layer-setup-rpc-overview)
This guide will help you deploy and run an X Layer mainnet or testnet RPC sync node. X Layer is a cutting-edge Ethereum layer 2 (L2) network built by OKX using the Optimism Stack (OP Stack) framework, and this guide is based on the optimized op-stack implementation.
[USDC on X Layer](https://web3.okx.com/xlayer/docs/developer/bridge/usdc-on-x-layer)
[One-click Setup](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc

Title: One-click Setup | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about One-click Setup.

Source: https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[One-click Setup](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc)
[Snapshots](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)

[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#one-click-setup)

## 📋 Overview[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%8B-overview)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%8B-overview)
Quickly deploy an X Layer self-hosted RPC node with the reth execution client.

## 💻 System Requirements[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%92%BB-system-requirements)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%92%BB-system-requirements)
- OS: Linux (Ubuntu 20.04+ recommended)
- Memory: 8GB minimum, 16GB+ recommended
- Storage: 200GB SSD minimum, 500GB+ recommended
- Docker: Docker 20.10+ and Docker Compose 2.0+

## ⚡ Quick Start[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%E2%9A%A1-quick-start)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%E2%9A%A1-quick-start)

### Fully Automatic Setup (Recommended)[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#fully-automatic-setup-(recommended))
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#fully-automatic-setup-(recommended))
Run the following command — a mainnet reth node with snapshot and default ports will be deployed automatically after a 5-second countdown, no input required:

```
curl -sSf https://raw.githubusercontent.com/okx/xlayer-toolkit/main/rpc-setup/one-click-setup.sh | bash
```


```
curl -sSf https://raw.githubusercontent.com/okx/xlayer-toolkit/main/rpc-setup/one-click-setup.sh | bash
```

This is equivalent to: mainnet + reth + snapshot + all default ports.

```
mainnet
```


```
reth
```


```
snapshot
```

### Custom Setup[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#custom-setup)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#custom-setup)
Press any key during the 5-second countdown to enter interactive mode, where you can customize network, client, ports, and more.

#### Interactive Prompts[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#interactive-prompts)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#interactive-prompts)
In custom mode, the script will prompt you for:
1. Network type: testnet or mainnet (default: mainnet)
2. Sync mode: genesis or snapshot (default: snapshot)

Snapshot: Fast sync using pre-built snapshots (recommended)
Genesis: Sync from genesis block


3. Snapshot: Fast sync using pre-built snapshots (recommended)
4. Genesis: Sync from genesis block
5. L1 RPC URL: Ethereum L1 RPC endpoint (optional)
6. L1 Beacon URL: Ethereum L1 Beacon chain endpoint (optional)
7. Ports (optional, with defaults):

RPC port (default: 8545)
WebSocket port (default: 8546)
Engine API port (default: 8552)
Node RPC port (default: 9545)
P2P ports (default: 30303, 9223)


8. RPC port (default: 8545)
9. WebSocket port (default: 8546)
10. Engine API port (default: 8552)
11. Node RPC port (default: 9545)
12. P2P ports (default: 30303, 9223)
13. Flashblocks: Enable/disable MEV flashblocks service (default: disabled)

If enabled, provide a Flashblocks WebSocket URL (default: wss://xlayerws.okx.com/flashblocks)


14. If enabled, provide a Flashblocks WebSocket URL (default: wss://xlayerws.okx.com/flashblocks)

```
testnet
```


```
mainnet
```


```
genesis
```


```
snapshot
```

- Snapshot: Fast sync using pre-built snapshots (recommended)
- Genesis: Sync from genesis block
- RPC port (default: 8545)
- WebSocket port (default: 8546)
- Engine API port (default: 8552)
- Node RPC port (default: 9545)
- P2P ports (default: 30303, 9223)
- If enabled, provide a Flashblocks WebSocket URL (default: wss://xlayerws.okx.com/flashblocks)

```
wss://xlayerws.okx.com/flashblocks
```


#### Sync Mode Availability[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#sync-mode-availability)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#sync-mode-availability)

## 📊 Service Management[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%8A-service-management)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%8A-service-management)

```
# Check service status make status # Stop services (preserves data) make stop # Restart services make run # View logs docker compose logs -f
```


```
# Check service status make status # Stop services (preserves data) make stop # Restart services make run # View logs docker compose logs -f
```

## 📡 Service Ports[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%A1-service-ports)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%A1-service-ports)
All ports are configurable during setup.

## 🔗 Access Your RPC Node[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%94%97-access-your-rpc-node)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%94%97-access-your-rpc-node)
After setup, your RPC node will be available at:
- HTTP RPC: http://localhost:<RPC_PORT>
- WebSocket: ws://localhost:<WS_PORT>
- Op-Node API: http://localhost:<NODE_RPC_PORT>

```
http://localhost:<RPC_PORT>
```


```
ws://localhost:<WS_PORT>
```


```
http://localhost:<NODE_RPC_PORT>
```

Run make status to see your configured ports.

```
make status
```

Thank you for building with X Layer! 💪
[X Layer Setup RPC overview](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[Snapshots](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots)
[📋 Overview](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%8B-overview)
[💻 System Requirements](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%92%BB-system-requirements)
[⚡ Quick Start](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%E2%9A%A1-quick-start)
[📊 Service Management](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%8A-service-management)
[📡 Service Ports](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%93%A1-service-ports)
[🔗 Access Your RPC Node](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc#%F0%9F%94%97-access-your-rpc-node)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots

Title: Snapshots | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Snapshots.

Source: https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[One-click Setup](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc)
[Snapshots](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)

[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#snapshots)
Using snapshots significantly reduces the initial sync time for X Layer RPC nodes. Snapshots are updated regularly and can be used with both geth and reth execution clients.
💡 Recommended: For most users, we recommend using the [one-click setup script](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc) which automatically handles snapshot download and extraction. This page is intended for advanced users who need to manually download snapshots (e.g., for data recovery or custom setups).

## 💡 Important Notes[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%92%A1-important-notes)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%92%A1-important-notes)
- Disk Space: Ensure you have at least 500GB free space for mainnet snapshots (both for the archive and extracted data)
- Network Speed: Snapshots are large files (several GB), so a stable internet connection is recommended
- Latest Snapshots: The latest snapshot filenames are fetched dynamically, so you'll always get the most recent version
- Data Structure: After extraction, move the chain data directories (e.g., chaindata, nodes, segments) directly into your data directory, not nested within another subfolder

```
chaindata
```


```
nodes
```


```
segments
```

## 📥 Download Snapshots[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%93%A5-download-snapshots)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%93%A5-download-snapshots)
If you prefer to manually download and set up snapshots instead of using the one-click setup script, please choose the appropriate snapshot for your network and client from the table below.

```
wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/reth-mainnet-latest)
```


```
wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/geth-mainnet-latest)
```


```
wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/reth-testnet-latest)
```


```
wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/geth-testnet-latest)
```

## 📋 Quick Reference[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%93%8B-quick-reference)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%93%8B-quick-reference)

### Download Example[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#download-example)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#download-example)

```
# Download mainnet geth snapshot wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/geth-mainnet-latest) # Download mainnet reth snapshot wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/reth-mainnet-latest)
```


```
# Download mainnet geth snapshot wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/geth-mainnet-latest) # Download mainnet reth snapshot wget https://static.okx.com/cdn/chain/xlayer/snapshot/$(curl -s https://static.okx.com/cdn/chain/xlayer/snapshot/reth-mainnet-latest)
```

### Extract Snapshot[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#extract-snapshot)
[#](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#extract-snapshot)

```
# Extract the downloaded snapshot archive tar -xzvf <snapshot-filename.tar.gz>
```


```
# Extract the downloaded snapshot archive tar -xzvf <snapshot-filename.tar.gz>
```

Thank you for building with X Layer! 💪
[One-click Setup](https://web3.okx.com/xlayer/docs/developer/setup-rpc/setup-rpc)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[💡 Important Notes](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%92%A1-important-notes)
[📥 Download Snapshots](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%93%A5-download-snapshots)
[📋 Quick Reference](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots#%F0%9F%93%8B-quick-reference)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints

Title: RPC endpoints | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about RPC endpoints.

Source: https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#rpc-endpoints)

## Mainnet (chain-id: 0xC4, 196 in decimals)[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#mainnet-(chain-id:-0xc4,-196-in-decimals))
[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#mainnet-(chain-id:-0xc4,-196-in-decimals))
RPC:
- ChainID: 196
- [https://rpc.xlayer.tech](https://rpc.xlayer.tech)
- [https://xlayerrpc.okx.com](https://xlayerrpc.okx.com)
[https://rpc.xlayer.tech](https://rpc.xlayer.tech)
[https://xlayerrpc.okx.com](https://xlayerrpc.okx.com)

## Testnet (chain-id: 0x7A0, 1952 in decimals)[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#testnet-(chain-id:-0x7a0,-1952-in-decimals))
[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#testnet-(chain-id:-0x7a0,-1952-in-decimals))
RPC:
- ChainID: 1952
- [https://testrpc.xlayer.tech/terigon](https://testrpc.xlayer.tech/terigon)
- [https://xlayertestrpc.okx.com/terigon](https://xlayertestrpc.okx.com/terigon)
[https://testrpc.xlayer.tech/terigon](https://testrpc.xlayer.tech/terigon)
[https://xlayertestrpc.okx.com/terigon](https://xlayertestrpc.okx.com/terigon)

## Infrastructure providers[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#infrastructure-providers)
[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#infrastructure-providers)
Public RPCs may have rate limits or traffic restrictions. For dedicated free RPC URLs, consider the following providers:
- [QuickNode](https://www.quicknode.com/)
- [Blockdaemon](https://www.blockdaemon.com/)
- [Getblock](https://getblock.io/)
- [ZAN](https://zan.top/home)
- [Chainstack](https://chainstack.com/)
- [Unifra](https://unifra.io/)
- [BlockPI](https://blockpi.io/)
[QuickNode](https://www.quicknode.com/)
[Blockdaemon](https://www.blockdaemon.com/)
[Getblock](https://getblock.io/)
[ZAN](https://zan.top/home)
[Chainstack](https://chainstack.com/)
[Unifra](https://unifra.io/)
[BlockPI](https://blockpi.io/)

## Prerequisite readings[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#prerequisite-readings)
[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#prerequisite-readings)
Before you begin using RPC endpoints on X Layer, it’s important to read the relevant articles for guidance:
- [Ethereum JSON-RPC](https://eth.wiki/json-rpc/API)
[Ethereum JSON-RPC](https://eth.wiki/json-rpc/API)

## Starting HTTP JSON-RPC[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#starting-http-json-rpc)
[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#starting-http-json-rpc)
To start the HTTP JSON-RPC, curl method is recommended:

```
# mainnet curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" https://rpc.xlayer.tech # testnet curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" https://testrpc.xlayer.tech/terigon
```


```
# mainnet curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" https://rpc.xlayer.tech # testnet curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -H "Content-Type: application/json" https://testrpc.xlayer.tech/terigon
```

## JSON-RPC methods[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#json-rpc-methods)
[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#json-rpc-methods)

[#](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#1.-ethereum-compatible-rpc)
Here you will find the list of all supported JSON RPC endpoints and the differences between them in comparison to the default behavior of an Ethereum node. If a specific endpoint is not in the list below, it means that this specific endpoint is not supported yet. You can find more details in [Ethereum’s JSON-RPC doc](https://ethereum.org/en/developers/docs/apis/json-rpc/).
[Snapshots](https://web3.okx.com/xlayer/docs/developer/setup-rpc/snapshots)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Mainnet (chain-id: 0xC4, 196 in decimals)](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#mainnet-(chain-id:-0xc4,-196-in-decimals))
[Testnet (chain-id: 0x7A0, 1952 in decimals)](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#testnet-(chain-id:-0x7a0,-1952-in-decimals))
[Infrastructure providers](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#infrastructure-providers)
[Prerequisite readings](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#prerequisite-readings)
[Starting HTTP JSON-RPC](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#starting-http-json-rpc)
[JSON-RPC methods](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints#json-rpc-methods)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints

Title: Websocket endpoints | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Websocket endpoints.

Source: https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#websocket-endpoints)
The WebSockets (WSS) communication protocol enables two-way communication between a client and a server over a single TCP connection. The communication protocol maintains a network connection between the two parties, allowing for real-time, low-latency communication. WebSockets allow for ongoing, bidirectional communication unlike HTTP, which is a request-response protocol.

## Mainnet (chain-id: 0xC4, 196 in decimals)[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#mainnet-(chain-id:-0xc4,-196-in-decimals))
[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#mainnet-(chain-id:-0xc4,-196-in-decimals))
WSS:
- wss://xlayerws.okx.com
- wss://ws.xlayer.tech

## Websocket methods[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#websocket-methods)
[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#websocket-methods)
Subscription methods are available for WebSocket connections only, and allow you to wait for events instead of polling for them. For example, DApps can subscribe to logs and receive notifications when a specific event occurs.
The following subscription methods are available:
- eth_subscribe - Create a subscription to a particular event
- eth_unsubscribe - Cancel an active subscription

```
eth_subscribe
```


```
eth_unsubscribe
```

It also supports Ethereum compatible RPC methods with websocket. You need to install [ws](https://github.com/hashrocket/ws), or another websocket client

```
# install wss tools go install github.com/hashrocket/ws@latest # connect to the wss server ws wss://xlayertestws.okx.com
```


```
# install wss tools go install github.com/hashrocket/ws@latest # connect to the wss server ws wss://xlayertestws.okx.com
```

[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#eth_subscribe)
Subscribe to different Ethereum event types like newHeads, logs, pendingTransactions, and minedTransactions using WebSockets.
Parameters Specify the subscription event parameters, including the following:
- newHeads: Subscribing to this returns a notification each time a new header is appended to the chain, including chain reorganizations. In chain reorganization, the subscription emits all new headers for the new chain. Therefore, the subscription can emit multiple headers at the same height.
- logs: Returns logs that are included in new imported blocks and match the given filter criteria. In case of a chain reorganization, previously sent logs that are on the old chain are resent with the removed property set to true. Logs from transactions that ended up in the new chain are emitted. Therefore, a subscription can emit logs for the same transaction multiple times. This parameter has the following fields:

address: (optional) Either an address or an array of addresses. Only logs that are created from these addresses are returned.
topics: (optional) Only logs that match these specified topics are returned.


- address: (optional) Either an address or an array of addresses. Only logs that are created from these addresses are returned.
- topics: (optional) Only logs that match these specified topics are returned.
- newPendingTransactions: not supported

```
newHeads
```


```
logs
```


```
true
```

- address: (optional) Either an address or an array of addresses. Only logs that are created from these addresses are returned.
- topics: (optional) Only logs that match these specified topics are returned.

```
address
```


```
topics
```


```
newPendingTransactions
```

Returns subscription ID: The ID of the newly created subscription on the node.

```
subscription ID
```

Example Event newHeads

```
> {"id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
```


```
> {"id": 1, "method": "eth_subscribe", "params": ["newHeads"]}
```


```
// Response OK {"jsonrpc":"","id":1,"result":"0x4698d49adc4f4590a7a685702a7890a1"} // Response newHeads {"jsonrpc":"2.0","method":"eth_subscription","params":{"subscription":"0x4698d49adc4f4590a7a685702a7890a1","result":{"parentHash":"0x8cbb9b4bbd08169f6721ca427b7596d367343beafefd795a739aa7561e402aa6","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x5e7b89ab3b2de21f0f35da4920b9d7310ccbe259","stateRoot":"0x82a790655c9731a90388eded2cfcb1dfb9ccd7fedc50a76027ece92b1a1c0a99","transactionsRoot":"0xca77a5c5bbc6ab7cc1a5aca874525d644602c06a8bd78b9a30530cbc311c1204","receiptsRoot":"0x59c28ec1a61258d901bdb099195292ec2ed440e3a8820401c28ec7c77f752791","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000008000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000","difficulty":"0x0","totalDifficulty":"0x0","size":"0x356","number":"0xf92e","gasLimit":"0x1c9c380","gasUsed":"0x2c84c","timestamp":"0x65558e95","extraData":"0x","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0x3313d5a4c5580d6db0310cd6a2e1107bb5b4f94cf16232619ac3bd7d9d04a8f0","transactions":["0x762b9a2eb0b13775beabdacd91fb9150dab945f998c93b92bb838a26542d49c5"],"uncles":[]}}}
```

```
// Response OK {"jsonrpc":"","id":1,"result":"0x4698d49adc4f4590a7a685702a7890a1"} // Response newHeads {"jsonrpc":"2.0","method":"eth_subscription","params":{"subscription":"0x4698d49adc4f4590a7a685702a7890a1","result":{"parentHash":"0x8cbb9b4bbd08169f6721ca427b7596d367343beafefd795a739aa7561e402aa6","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x5e7b89ab3b2de21f0f35da4920b9d7310ccbe259","stateRoot":"0x82a790655c9731a90388eded2cfcb1dfb9ccd7fedc50a76027ece92b1a1c0a99","transactionsRoot":"0xca77a5c5bbc6ab7cc1a5aca874525d644602c06a8bd78b9a30530cbc311c1204","receiptsRoot":"0x59c28ec1a61258d901bdb099195292ec2ed440e3a8820401c28ec7c77f752791","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000008000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000","difficulty":"0x0","totalDifficulty":"0x0","size":"0x356","number":"0xf92e","gasLimit":"0x1c9c380","gasUsed":"0x2c84c","timestamp":"0x65558e95","extraData":"0x","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0x3313d5a4c5580d6db0310cd6a2e1107bb5b4f94cf16232619ac3bd7d9d04a8f0","transactions":["0x762b9a2eb0b13775beabdacd91fb9150dab945f998c93b92bb838a26542d49c5"],"uncles":[]}}}
```

Event logs

```
> {"jsonrpc":"2.0","method":"eth_subscribe","params":["logs",{"topics":["0x7bcec107ebaef6075ec44d44bbaceef2832d8ef887883240b63415dd770788e9"]}],"id":0}
```


```
> {"jsonrpc":"2.0","method":"eth_subscribe","params":["logs",{"topics":["0x7bcec107ebaef6075ec44d44bbaceef2832d8ef887883240b63415dd770788e9"]}],"id":0}
```


```
// Response OK {"jsonrpc":"2.0","id":1,"result":"0x9aebda1c07ed47f78053751ebbbd26d5"} // Response Event Logs {"jsonrpc":"2.0","method":"eth_subscription","params":{"subscription":"0x9aebda1c07ed47f78053751ebbbd26d5","result":{"parentHash":"0x2f823eea412f288a4575c66f845b0eebb40fba3313c36197e20af204b6f7d3be","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x4e830165ff22f4592f0933f01d2d4ffd0b1fccf8","stateRoot":"0xd579fdae44038a6654d23e18ab12d8447fb2732b49eae323f7586959a844f1b2","transactionsRoot":"0x60fd8387b75b3c2c16cd9a51e466d188a967d3a27ef845844cf56008a50b0ddc","receiptsRoot":"0xa0480d2161fb5802ed71872b85cd6828cf9ea74794dc04307d0009ac80e3ed73","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","difficulty":"0x0","totalDifficulty":"0x0","size":"0x273","number":"0x29502","gasLimit":"0x1c9c380","gasUsed":"0x5208","timestamp":"0x652cdae7","extraData":"0x","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0x9703f514105904358b28a804d2ceda3ee3bc075dae9a23d99f352e0346e3f582","transactions":["0x495faaf906c862af71e6f298880c239415a2f80f7fb103bedb00f57dd0392ab0"],"uncles":[]}}}
```

### eth_subscribe[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#eth_subscribe)
```
// Response OK {"jsonrpc":"2.0","id":1,"result":"0x9aebda1c07ed47f78053751ebbbd26d5"} // Response Event Logs {"jsonrpc":"2.0","method":"eth_subscription","params":{"subscription":"0x9aebda1c07ed47f78053751ebbbd26d5","result":{"parentHash":"0x2f823eea412f288a4575c66f845b0eebb40fba3313c36197e20af204b6f7d3be","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x4e830165ff22f4592f0933f01d2d4ffd0b1fccf8","stateRoot":"0xd579fdae44038a6654d23e18ab12d8447fb2732b49eae323f7586959a844f1b2","transactionsRoot":"0x60fd8387b75b3c2c16cd9a51e466d188a967d3a27ef845844cf56008a50b0ddc","receiptsRoot":"0xa0480d2161fb5802ed71872b85cd6828cf9ea74794dc04307d0009ac80e3ed73","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","difficulty":"0x0","totalDifficulty":"0x0","size":"0x273","number":"0x29502","gasLimit":"0x1c9c380","gasUsed":"0x5208","timestamp":"0x652cdae7","extraData":"0x","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0x9703f514105904358b28a804d2ceda3ee3bc075dae9a23d99f352e0346e3f582","transactions":["0x495faaf906c862af71e6f298880c239415a2f80f7fb103bedb00f57dd0392ab0"],"uncles":[]}}}
```

### eth_unsubscribe[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#eth_unsubscribe)
[#](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#eth_unsubscribe)
Cancel the specified subscription by calling eth_unsubscribe. Returns a Boolean value indicating whether the cancellation was successful

```
eth_unsubscribe
```

Parameter
- subscription ID: The ID of the subscription you want to unsubscribe.

```
subscription ID
```

Returns
- unsubscribed flag: (boolean) True if the subscription is canceled successfully.

```
unsubscribed flag
```

Example

```
# subscribe to new block Headers > {"id": 1, "method": "eth_unsubscribe", "params":["0xefa20a66c94a4da7ae18294db6261b42"]}
```


```
# subscribe to new block Headers > {"id": 1, "method": "eth_unsubscribe", "params":["0xefa20a66c94a4da7ae18294db6261b42"]}
```


```
// Response {"jsonrpc":"","id":1,"result":true}
```


```
// Response {"jsonrpc":"","id":1,"result":true}
```

[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Mainnet (chain-id: 0xC4, 196 in decimals)](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#mainnet-(chain-id:-0xc4,-196-in-decimals))
[Websocket methods](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints#websocket-methods)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/flashblocks/overview

Title: Flashblocks | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Flashblocks.

Source: https://web3.okx.com/xlayer/docs/developer/flashblocks/overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Node Providers](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers)
[Flashblocks FAQ](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#flashblocks)
Flashblocks delivers 200-millisecond preconfirmations on X Layer, drastically reducing wait times for transaction feedback. It is perfect for applications where speed is critical.

## Overview[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#overview)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#overview)
Flashblocks drastically reduces user-perceived latency and enables near-instantaneous user experiences for applications that require real-time interactions like gaming, high-frequency trading, and social apps.

## Leveraging Flashblocks[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#leveraging-flashblocks)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#leveraging-flashblocks)
Developers can easily leverage the capabilities of Flashblocks in the following ways:
1. Pending Tag Queries: Query Flashblocks-enabled RPC endpoints using the pending tag.
2. Raw Data Streaming: Stream Flashblocks data directly from the raw Flashblocks feed.

```
pending
```

## Supported RPC APIs[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#supported-rpc-apis)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#supported-rpc-apis)
Flashblocks APIs are fully compatible with the Ethereum JSON-RPC standards. Flashblocks APIs use the pending tag for the last received flashblock chain state, which is applied to the pending state.

```
pending
```

### eth_blockNumber[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_blocknumber)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_blocknumber)
Returns the current Flashblocks pending block height.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":["pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":["pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x832437" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x832437" }
```

### eth_call[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_call)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_call)
Executes a new message call immediately without creating a transaction on the blockchain.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x0000000000000000000000000000000000000000000000000000000000000001" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x0000000000000000000000000000000000000000000000000000000000000001" }
```

### eth_estimateGas[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_estimategas)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_estimategas)
Returns an estimate of how much gas is needed for the transaction to complete.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x5208" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x5208" }
```

### eth_getBalance[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getbalance)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getbalance)
Returns the native token balance for the given address.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x...","pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x...","pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x1234" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x1234" }
```

### eth_getTransactionCount[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactioncount)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactioncount)
Returns the transaction count (nonce) for the given address.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x...","pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x...","pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x1b" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x1b" }
```

### eth_getCode[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getcode)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getcode)
Returns the contract bytecode deployed at the given address.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x...","pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getCode","params":["0x...","pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x606060..." }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x606060..." }
```

### eth_getStorageAt[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getstorageat)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getstorageat)
Returns the storage value at the given position for the specified address.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getStorageAt","params":["0x...","0x0","pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getStorageAt","params":["0x...","0x0","pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0x0000000000000000000000000000000000000000000000000000000000000001" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0x0000000000000000000000000000000000000000000000000000000000000001" }
```

### eth_getBlockByHash[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblockbyhash)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblockbyhash)
Returns the specified block based on the given block hash. Note that flashblocks and their corresponding canonical blocks share the same block number but may have different block hashes.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0x...",true],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0x...",true],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": { "number": "0x832437", "hash": "0x...", // ... other fields "transactions": ["0x..."] } }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": { "number": "0x832437", "hash": "0x...", // ... other fields "transactions": ["0x..."] } }
```

### eth_getBlockByNumber[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblockbynumber)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblockbynumber)
Returns the specified block based on the block number.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending",true],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending",true],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": { "number": "0x832437", "hash": "0x...", // ... other fields "transactions": [{}] } }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": { "number": "0x832437", "hash": "0x...", // ... other fields "transactions": [{}] } }
```

### eth_getBlockReceipts[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblockreceipts)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblockreceipts)
Returns the transaction receipts for the specified block.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockReceipts","params":["pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockReceipts","params":["pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": [ { "transactionHash": "0x...", "transactionIndex": "0x0", // ... other fields "status": "0x1" } ] }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": [ { "transactionHash": "0x...", "transactionIndex": "0x0", // ... other fields "status": "0x1" } ] }
```

### eth_getBlockTransactionCountByNumber[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblocktransactioncountbynumber)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblocktransactioncountbynumber)
Returns the transaction count for the specified block.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["pending"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0xa" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0xa" }
```

### eth_getBlockTransactionCountByHash[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblocktransactioncountbyhash)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getblocktransactioncountbyhash)
Returns the number of transactions in the block with the given block hash.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x..."],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0x..."],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0xa" }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0xa" }
```

### eth_getTransactionByHash[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionbyhash)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionbyhash)
Returns the transaction data for the given transaction hash.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x..."],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x..."],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": { "hash": "0x...", "nonce": "0x1", // ... other fields "s": "0x..." } }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": { "hash": "0x...", "nonce": "0x1", // ... other fields "s": "0x..." } }
```

### eth_getRawTransactionByHash[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getrawtransactionbyhash)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_getrawtransactionbyhash)
Returns the raw transaction data for the given transaction hash.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getRawTransactionByHash","params":["0x..."],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getRawTransactionByHash","params":["0x..."],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": "0xf86c018503b9aca008252089400000000000000000000000000000000000000008800de0b6b3a7640000801ba0..." }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": "0xf86c018503b9aca008252089400000000000000000000000000000000000000008800de0b6b3a7640000801ba0..." }
```

### eth_getTransactionReceipt[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionreceipt)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionreceipt)
Returns the transaction receipt for the given transaction hash.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x..."],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x..."],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": { "transactionHash": "0x...", "transactionIndex": "0x0", // ... other fields "status": "0x1" } }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": { "transactionHash": "0x...", "transactionIndex": "0x0", // ... other fields "status": "0x1" } }
```

### eth_getTransactionByBlockNumberAndIndex[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionbyblocknumberandindex)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionbyblocknumberandindex)
Returns the transaction data for the given block number and transaction index.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["pending","0x0"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["pending","0x0"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": { "hash": "0x...", "nonce": "0x1", // ... other fields "s": "0x..." } }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": { "hash": "0x...", "nonce": "0x1", // ... other fields "s": "0x..." } }
```

### eth_getTransactionByBlockHashAndIndex[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionbyblockhashandindex)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#eth_gettransactionbyblockhashandindex)
Returns the transaction data for the given block hash and transaction index.

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x...","0x0"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x...","0x0"],"id":1}'
```

Example Response

```
{ "jsonrpc": "2.0", "id": 1, "result": { "hash": "0x...", "nonce": "0x1", // ... other fields "s": "0x..." } }
```


```
{ "jsonrpc": "2.0", "id": 1, "result": { "hash": "0x...", "nonce": "0x1", // ... other fields "s": "0x..." } }
```

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#quick-start)
The following libraries can work with any RPC endpoints with flashblocks enabled.

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#viem)

```
import { createWalletClient, createPublicClient, http, defineChain } from 'viem'; import { privateKeyToAccount } from 'viem/accounts'; import dotenv from 'dotenv'; dotenv.config(); // TODO: create PR to viem const xlayerPreconf = defineChain({ id: 195, name: 'X Layer Preconf', nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.xlayer.tech/flashblocks'] }, }, blockExplorers: { default: { name: 'Explorer', url: 'https://www.oklink.com/xlayer-test' }, }, testnet: true, }); const account = privateKeyToAccount(process.env.PRIVATE_KEY); const walletClient = createWalletClient({ account, chain: xlayerPreconf, transport: http('https://rpc.xlayer.tech/flashblocks'), }); const publicClient = createPublicClient({ chain: xlayerPreconf, transport: http('https://rpc.xlayer.tech/flashblocks'), }); async function sendTransaction() { try { const submissionTime = new Date(); const hash = await walletClient.sendTransaction({ to: '0x0000000000000000000000000000000000000001', value: BigInt('100000000000000'), }); console.log(`Transaction submitted time: ${submissionTime.toISOString()}`); console.log(`Transaction hash: ${hash}`); let receipt = null; while (!receipt) { try { receipt = await publicClient.getTransactionReceipt({ hash }); } catch (e) { await new Promise(resolve => setTimeout(resolve, 10)); } } const confirmationTime = new Date(); console.log(`Transaction confirmed time: ${confirmationTime.toISOString()}`); console.log(`Time difference: ${confirmationTime.getTime() - submissionTime.getTime()}ms`); } catch (error) { console.error('Error sending transaction:', error); } } sendTransaction(); // node src/ViemExample.js
```


```
import { createWalletClient, createPublicClient, http, defineChain } from 'viem'; import { privateKeyToAccount } from 'viem/accounts'; import dotenv from 'dotenv'; dotenv.config(); // TODO: create PR to viem const xlayerPreconf = defineChain({ id: 195, name: 'X Layer Preconf', nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 }, rpcUrls: { default: { http: ['https://rpc.xlayer.tech/flashblocks'] }, }, blockExplorers: { default: { name: 'Explorer', url: 'https://www.oklink.com/xlayer-test' }, }, testnet: true, }); const account = privateKeyToAccount(process.env.PRIVATE_KEY); const walletClient = createWalletClient({ account, chain: xlayerPreconf, transport: http('https://rpc.xlayer.tech/flashblocks'), }); const publicClient = createPublicClient({ chain: xlayerPreconf, transport: http('https://rpc.xlayer.tech/flashblocks'), }); async function sendTransaction() { try { const submissionTime = new Date(); const hash = await walletClient.sendTransaction({ to: '0x0000000000000000000000000000000000000001', value: BigInt('100000000000000'), }); console.log(`Transaction submitted time: ${submissionTime.toISOString()}`); console.log(`Transaction hash: ${hash}`); let receipt = null; while (!receipt) { try { receipt = await publicClient.getTransactionReceipt({ hash }); } catch (e) { await new Promise(resolve => setTimeout(resolve, 10)); } } const confirmationTime = new Date(); console.log(`Transaction confirmed time: ${confirmationTime.toISOString()}`); console.log(`Time difference: ${confirmationTime.getTime() - submissionTime.getTime()}ms`); } catch (error) { console.error('Error sending transaction:', error); } } sendTransaction(); // node src/ViemExample.js
```

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#ethers)

```
import { ethers } from 'ethers'; import dotenv from 'dotenv'; dotenv.config(); const provider = new ethers.JsonRpcProvider( "https://rpc.xlayer.tech/flashblocks" ); async function sendTransaction() { try { const tx = { to: "0x0000000000000000000000000000000000000001", value: ethers.parseEther("0.0000001"), }; // Submit transaction const submissionTime = new Date(); const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); const transaction = await wallet.sendTransaction(tx); console.log(`Transaction submitted time: ${submissionTime.toISOString()}`); console.log(`Transaction hash: ${transaction.hash}`); await transaction.wait(0); // Set confirmation count to 0 for flashblocks const confirmationTime = new Date(); console.log(`Transaction confirmed time: ${confirmationTime.toISOString()}`); console.log(`Time difference: ${confirmationTime.getTime() - submissionTime.getTime()}ms`); } catch (error) { console.error('Error sending transaction:', error); } } sendTransaction(); // node src/EthersExample.js
```


```
import { ethers } from 'ethers'; import dotenv from 'dotenv'; dotenv.config(); const provider = new ethers.JsonRpcProvider( "https://rpc.xlayer.tech/flashblocks" ); async function sendTransaction() { try { const tx = { to: "0x0000000000000000000000000000000000000001", value: ethers.parseEther("0.0000001"), }; // Submit transaction const submissionTime = new Date(); const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); const transaction = await wallet.sendTransaction(tx); console.log(`Transaction submitted time: ${submissionTime.toISOString()}`); console.log(`Transaction hash: ${transaction.hash}`); await transaction.wait(0); // Set confirmation count to 0 for flashblocks const confirmationTime = new Date(); console.log(`Transaction confirmed time: ${confirmationTime.toISOString()}`); console.log(`Time difference: ${confirmationTime.getTime() - submissionTime.getTime()}ms`); } catch (error) { console.error('Error sending transaction:', error); } } sendTransaction(); // node src/EthersExample.js
```

[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Node Providers](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers)
[Overview](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#overview)
[Leveraging Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#leveraging-flashblocks)
[Supported RPC APIs](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#supported-rpc-apis)
[Quick Start](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview#quick-start)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers

Title: Node Providers | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Node Providers.

Source: https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Node Providers](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers)
[Flashblocks FAQ](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#node-providers)
This guide explains how to set up a Flashblocks-enabled RPC node.

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#quick-start)

### Prerequisites[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#prerequisites)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#prerequisites)
- Docker and Docker Compose
- Minimum hardware requirements (see [Setup RPC](https://web3.okx.com/developer/setup-rpc/setup-rpc) for details)
- Access to a Flashblocks WebSocket endpoint
[Setup RPC](https://web3.okx.com/developer/setup-rpc/setup-rpc)

### Setting Up[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#setting-up)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#setting-up)
View [xlayer-toolkit's README](https://github.com/okx/xlayer-toolkit) for more information.

```
mkdir -p /data/xlayer-mainnet && cd /data/xlayer-mainnet curl -fsSL https://raw.githubusercontent.com/okx/xlayer-toolkit/main/rpc-setup/one-click-setup.sh -o one-click-setup.sh chmod +x one-click-setup.sh ./one-click-setup.sh --rpc_type=reth
```


```
mkdir -p /data/xlayer-mainnet && cd /data/xlayer-mainnet curl -fsSL https://raw.githubusercontent.com/okx/xlayer-toolkit/main/rpc-setup/one-click-setup.sh -o one-click-setup.sh chmod +x one-click-setup.sh ./one-click-setup.sh --rpc_type=reth
```

## Configuration[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#configuration)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#configuration)
The one-click-setup.sh script includes interactive prompts to configure Flashblocks-related variables. For Flashblocks-specific configurations, refer to the table below:

```
one-click-setup.sh
```


```
FLASHBLOCKS_ENABLED
```


```
true
```


```
FLASHBLOCKS_URL
```


```
wss://xlayerws.okx.com/flashblocks
```

Note that the RPC must be running reth instead of geth.

## Verifying Flashblocks Functionality[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#verifying-flashblocks-functionality)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#verifying-flashblocks-functionality)
Nodes with Flashblocks will return preconfirmed transactions in the pending block:

```
curl http://localhost:8545 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending",true],"id":1}'
```


```
curl http://localhost:8545 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending",true],"id":1}'
```

## Flashblocks WebSocket[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#flashblocks-websocket)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#flashblocks-websocket)
The public WebSocket API is exposed at the following endpoints and is used to stream raw Flashblocks data. This is the URL needed during the RPC node configuration.

```
wss://ws.xlayer.tech/flashblocks
```


```
wss://xlayerws.okx.com/flashblocks
```


```
wss://testws.xlayer.tech/flashblocks
```


```
wss://xlayertestws.okx.com/flashblocks
```

## Flashblocks Data[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#flashblocks-data)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#flashblocks-data)
Flashblock messages use delta compression:
- Index 0: Full base and diff object (block properties + transactions).
- Index 1+: Diff object only (new transactions in the flashblock).
This delta compression reduces message size by transmitting only incremental changes.

### Base + Diff Response[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#base-+-diff-response)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#base-+-diff-response)

```
{ "base": { "base_fee_per_gas": "0x5f5e0ff", "block_number": "0x8328ab", "extra_data": "0x...", "fee_recipient": "0x...", "gas_limit": "0xbebc200", "parent_beacon_block_root": "0x...", "parent_hash": "0x...", "prev_randao": "0x...", "timestamp": "0x695dd9b6" }, "diff": { "blob_gas_used": "0x0", "block_hash": "0x...", "gas_used": "0x6c63", "logs_bloom": "0x...", "receipts_root": "0x...", "state_root": "0x...", "transactions": [], "withdrawals": [], "withdrawals_root": "0x..." }, "index": 0, "metadata": { "block_number": 8595627, "new_account_balances": { "0x0000f90827f1c53a10cb7a02335b175320002935": "0x0" }, "receipts": { "0x56d542ee662d9a7e1696880346a3f2fb1ed091c15b7c6b607f64ae95e431b097": { "Deposit": {} } } }, "payload_id": "0x03307607ad2ba79d" }
```


```
{ "base": { "base_fee_per_gas": "0x5f5e0ff", "block_number": "0x8328ab", "extra_data": "0x...", "fee_recipient": "0x...", "gas_limit": "0xbebc200", "parent_beacon_block_root": "0x...", "parent_hash": "0x...", "prev_randao": "0x...", "timestamp": "0x695dd9b6" }, "diff": { "blob_gas_used": "0x0", "block_hash": "0x...", "gas_used": "0x6c63", "logs_bloom": "0x...", "receipts_root": "0x...", "state_root": "0x...", "transactions": [], "withdrawals": [], "withdrawals_root": "0x..." }, "index": 0, "metadata": { "block_number": 8595627, "new_account_balances": { "0x0000f90827f1c53a10cb7a02335b175320002935": "0x0" }, "receipts": { "0x56d542ee662d9a7e1696880346a3f2fb1ed091c15b7c6b607f64ae95e431b097": { "Deposit": {} } } }, "payload_id": "0x03307607ad2ba79d" }
```

### Diff Response[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#diff-response)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#diff-response)

```
{ "diff": { "blob_gas_used": "0x0", "block_hash": "0x...", "gas_used": "0xbe6b", "logs_bloom": "0x...", "receipts_root": "0x...", "state_root": "0x...", "transactions": [], "withdrawals": [], "withdrawals_root": "0x..." }, "index": 1, "metadata": { "block_number": 8595627, "new_account_balances": { "0x0000f90827f1c53a10cb7a02335b175320002935": "0x0" }, "receipts": { "0x30130a020af408787a9388dcf0272635fff7bc15ae118edb76d207391bb57b51": { "Legacy": {} } } }, "payload_id": "0x03307607ad2ba79d" }
```


```
{ "diff": { "blob_gas_used": "0x0", "block_hash": "0x...", "gas_used": "0xbe6b", "logs_bloom": "0x...", "receipts_root": "0x...", "state_root": "0x...", "transactions": [], "withdrawals": [], "withdrawals_root": "0x..." }, "index": 1, "metadata": { "block_number": 8595627, "new_account_balances": { "0x0000f90827f1c53a10cb7a02335b175320002935": "0x0" }, "receipts": { "0x30130a020af408787a9388dcf0272635fff7bc15ae118edb76d207391bb57b51": { "Legacy": {} } } }, "payload_id": "0x03307607ad2ba79d" }
```

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#live-testing)
Test Flashblocks on X Layer using our public RPC endpoint. Run the following commands in your terminal, replacing the placeholder values with your actual parameters.

### eth_getBlockByNumber[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_getblockbynumber)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_getblockbynumber)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending",true],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["pending",true],"id":1}'
```

### eth_getTransactionReceipt[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_gettransactionreceipt)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_gettransactionreceipt)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x..."],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x..."],"id":1}'
```

### eth_getBalance[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_getbalance)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_getbalance)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x...","pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x...","pending"],"id":1}'
```

### eth_getTransactionCount[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_gettransactioncount)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_gettransactioncount)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x...","pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x...","pending"],"id":1}'
```

### eth_getTransactionByHash[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_gettransactionbyhash)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_gettransactionbyhash)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x..."],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x..."],"id":1}'
```

### eth_call[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_call)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_call)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#eth_estimategas)

```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```


```
curl https://rpc.xlayer.tech/flashblocks -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"to":"0x...","data":"0x..."},"pending"],"id":1}'
```

[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Flashblocks FAQ](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq)
[Quick Start](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#quick-start)
[Configuration](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#configuration)
[Verifying Flashblocks Functionality](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#verifying-flashblocks-functionality)
[Flashblocks WebSocket](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#flashblocks-websocket)
[Flashblocks Data](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#flashblocks-data)
[Live Testing](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers#live-testing)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/flashblocks/faq

Title: Flashblocks FAQ | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Flashblocks FAQ.

Source: https://web3.okx.com/xlayer/docs/developer/flashblocks/faq

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Node Providers](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers)
[Flashblocks FAQ](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#flashblocks-faq)

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#flashblocks-block-building)

### How many flashblocks per L2 block?[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#how-many-flashblocks-per-l2-block?)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#how-many-flashblocks-per-l2-block?)
Typically 3-5 flashblocks can be built within the X Layer's 1-second block time, each representing ~200ms intervals. The exact number depends on network conditions and transaction volume.

### In what scenario will the sequencer stop producing flashblocks?[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#in-what-scenario-will-the-sequencer-stop-producing-flashblocks?)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#in-what-scenario-will-the-sequencer-stop-producing-flashblocks?)
In the unlikely scenario where all reth sequencers fail, the backup sequencer (without flashblocks) takes over to build blocks, then flashblocks will stop producing.

### What are flashblock reorgs?[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#what-are-flashblock-reorgs?)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#what-are-flashblock-reorgs?)
Similar to normal blockchain reorgs, newly minted flashblocks are also susceptible to reorgs. Flashblock reorgs refer to the case where the gossiped flashblock payloads in the current pending block were not confirmed by the sequencer. When this happens, the gossiped flashblocks become invalid since a different full block was eventually minted.

### What are the implications of a reorg?[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#what-are-the-implications-of-a-reorg?)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#what-are-the-implications-of-a-reorg?)
This means that a transaction was streamed out as a pre-confirmed transaction, but may not actually be included in the canonical chain.

### How often does a reorg occur?[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#how-often-does-a-reorg-occur?)
[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#how-often-does-a-reorg-occur?)
Flashblock reorgs occur very rarely on X Layer. This is due to its multi-sequencer architecture, where flashblock builders include additional flashblock replay mechanisms that prevent reorgs from occurring. However, they may still potentially occur, and it is good practice for applications to handle reorgs appropriately.

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#flashblocks-websocket)

[#](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#what-is-websocket-streaming?)
Flashblocks WebSocket is the default WebSocket subscription provided to stream raw flashblock payloads from the X Layer sequencer. It provides access to new flashblock payload data and is used for deploying Flashblocks RPC reth nodes.
[Node Providers](https://web3.okx.com/xlayer/docs/developer/flashblocks/node-providers)
[Tooling and infrastructure](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Flashblocks Block Building](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#flashblocks-block-building)
[Flashblocks WebSocket](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq#flashblocks-websocket)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/overview

Title: Tooling and infrastructure | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Tooling and infrastructure.

Source: https://web3.okx.com/xlayer/docs/developer/tools/overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)

# Tooling and infrastructure[#](https://web3.okx.com/xlayer/docs/developer/tools/overview#tooling-and-infrastructure)
[#](https://web3.okx.com/xlayer/docs/developer/tools/overview#tooling-and-infrastructure)
Developing a dapp can be laborious, but fortunately X layer has an array of robust third-party tools and developer infrastructure to accelerate your dapp's development. Feel free to leverage these protocols, tools and infrastructure to speed up your go-to-market.
[Account abstractionAccount abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorersBlock explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chainCross chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexersData indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer toolsDeveloper tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providersNode providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[OraclesOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboardingUser-onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Flashblocks FAQ](https://web3.okx.com/xlayer/docs/developer/flashblocks/faq)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview

Title: Account abstraction | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Account abstraction.

Source: https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Particle Network](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network)
[Safe](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Account abstraction[#](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview#account-abstraction)
[#](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview#account-abstraction)
Account abstraction is a broad category of fast-moving development in the Ethereum ecosystem. It generally refers to different ways to create and manage accounts, other than using a Secret Recovery Phrase and a wallet.

```
Account abstraction
```

One milestone in this area was the inclusion of [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) in the Ethereum protocol.
This includes, but is not limited to:
Creating accounts using a cryptographic library running in a dapp (an "embedded wallet") The creation of an account that is to some degree controlled by a smart contract That second point may seem small, but it enables things like:
Account Recovery ("social recovery", recovery via email or other identities or accounts) Use case-specific limitations Paying for a user's gas fees Delegation of assets and a lot more.
As a network, X Layer is heavily invested in innovating in the account abstraction space; consult the resources here to see how you can implement the tools we already have... and then build your own.
[Particle NetworkParticle network](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network)
[SafeSafe](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe)
[Tooling and infrastructure](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Particle Network](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network

Title: Particle Network | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Particle Network.

Source: https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Particle Network](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network)
[Safe](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)

# Particle Network[#](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network#particle-network)
[#](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network#particle-network)
The intent-centric, modular access layer of Web3: Built with [Particle Network](https://particle.network/)’s modular smart wallet-as-a-service, confidential ZKStack, omnichain account abstraction, and intent fusion protocol.
Supported network:
- X Layer mainnet
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Safe](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe

Title: Safe | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Safe.

Source: https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Particle Network](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network)
[Safe](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)

# Safe[#](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe#safe)
[#](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe#safe)
Safe provides modular smart account infrastructure and account abstraction stack via their Safe Core [Account Abstraction SDK](https://docs.safe.global/sdk/overview), [API](https://docs.safe.global/advanced/api-supported-networks), and [Protocol](https://github.com/5afe/safe-core-protocol).
Supported network:
- X Layer mainnet
[Particle Network](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/particle-network)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview

Title: Block explorers | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Block explorers.

Source: https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Block explorers[#](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview#block-explorers)
[#](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview#block-explorers)
A block explorer is an essential tool in the blockchain ecosystem, enabling users to navigate and analyze blockchain transactions and data. It provides a user-friendly interface to view detailed information about blocks, addresses, transactions, and other blockchain activities. By using a block explorer, users can track the status of their transactions, view historical data, and gain insights into the overall health and activity of the blockchain network. This transparency and accessibility are crucial for ensuring trust and accountability within the blockchain community.

```
block explorer
```

As a network, X Layer is committed to enhancing the capabilities of block explorer, providing robust tools and resources to help you utilize and innovate upon our existing solutions.
Supported explorer:
- [X Layer mainnet](https://www.okx.com/web3/explorer/xlayer)
- [X Layer testnet](https://www.okx.com/web3/explorer/xlayer-test)
[X Layer mainnet](https://www.okx.com/web3/explorer/xlayer)
[X Layer testnet](https://www.okx.com/web3/explorer/xlayer-test)
[Safe](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction/safe)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview

Title: Cross-chain | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Cross-chain.

Source: https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Layer Zero](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero)
[Connext](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Cross-chain[#](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview#cross-chain)
[#](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview#cross-chain)
Cross-chain communication and messaging tools are pivotal in the blockchain ecosystem, enabling seamless interoperability between different blockchain networks. These tools, including Connext, Layer Zero, and Wormhole, allow assets and data to be transferred across various blockchains, breaking down the barriers that typically silo blockchain ecosystems. By facilitating cross-chain communication, these tools empower developers to build more complex and interconnected decentralized applications (dApps), enhancing the user experience and expanding the functionality of blockchain technology.
[Layer ZeroLayerZero](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero)
[ConnextConnext](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Layer Zero](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero

Title: Layer Zero | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Layer Zero.

Source: https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Layer Zero](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero)
[Connext](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)

# Layer Zero[#](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero#layer-zero)
[#](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero#layer-zero)
LayerZero is an interoperability protocol that connects blockchains (50+ and counting), allowing developers to build seamless omnichain applications, tokens, and experiences.
View [here](https://docs.layerzero.network/v2/developers/evm/technical-reference/endpoints) for the endpoint IDs and addresses required for X Layer.
Supported network:
- X Layer mainnet
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Connext](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext

Title: Connext | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Connext.

Source: https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Layer Zero](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero)
[Connext](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)

# Connext[#](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext#connext)
[#](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext#connext)
With [Connext](https://www.connext.network/), you can build Web3 applications on X Layer that can securely interact with users, tokens, and other applications on any chain — just like on the web.
Supported network:
- X Layer mainnet
[Layer Zero](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/layer-zero)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview

Title: Data indexers | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Data indexers.

Source: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[The Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)
[Subquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)
[Subsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Data indexers[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview#data-indexers)
[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview#data-indexers)
Data indexers play a critical role in the blockchain ecosystem by organizing and making blockchain data easily accessible. These tools, such as The Graph, help developers query blockchain data efficiently, allowing for the creation of complex decentralized applications (dApps) that rely on fast and reliable data retrieval. By indexing blockchain data, these tools provide a structured and searchable database, enabling developers to build more robust and data-intensive applications.
X Layer is heavily invested in the development and implementation of data indexers. Consult our resources to see how you can utilize these tools to enhance your projects and build powerful, data-driven solutions.
[The GraphThe Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)
[SubquerySubquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)
[SubsquidSubsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)
[Connext](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain/connext)
[The Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph

Title: The Graph | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about The Graph.

Source: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[The Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)
[Subquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)
[Subsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)

# The Graph[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph#the-graph)
[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph#the-graph)
[The Graph](https://thegraph.com/docs/en/supported-networks/xlayer-mainnet/) is an open-sourced software used to collect, process and store data from various blockchain applications to facilitate information retrieval on X Layer.
Supported network:
- X Layer mainnet
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Subquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery

Title: Subquery | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Subquery.

Source: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[The Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)
[Subquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)
[Subsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)

# Subquery[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery#subquery)
[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery#subquery)
[Subquery](https://subquery.foundation/sale) is pioneering fast, flexible, and scalable decentralized infrastructure, we power Web3’s transition to an open, efficient, and user-centric future.
Supported network:
- X Layer mainnet
[The Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)
[Subsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid

Title: Subsquid | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Subsquid.

Source: https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[The Graph](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/the-graph)
[Subquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)
[Subsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)

# Subsquid[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid#subsquid)
[#](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid#subsquid)
[Subsquid](https://subsquid.io) is a peer-to-peer network to batch query and aggregate terabytes of on-chain and off-chain data in a ridiculously efficient way.
Supported network:
- X Layer mainnet
[Subquery](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subquery)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview

Title: Developer tools | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Developer tools.

Source: https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[thirdweb](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Developer tools[#](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview#developer-tools)
[#](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview#developer-tools)
Developer tools are vital in the blockchain ecosystem, providing the necessary resources and frameworks for building, testing, and deploying decentralized applications (dApps). These tools, including Sentio and thirdweb, offer comprehensive development environments, debugging capabilities, and deployment support.
[thirdwebthirdweb](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb)
[Subsquid](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers/subsquid)
[thirdweb](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb

Title: thirdweb | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about thirdweb.

Source: https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[thirdweb](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)

# thirdweb[#](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb#thirdweb)
[#](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb#thirdweb)
[thirdweb](https://thirdweb.com) is the complete Web3 development toolkit tha onboards users with wallets, build & deploy smart contracts, accept fiat with payments, and scale apps with infrastructure — on any EVM chain such as X Layer
Supported network:
- X Layer mainnet
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview

Title: Node providers | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Node providers.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Node providers[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview#node-providers)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview#node-providers)
Node providers are fundamental to the blockchain ecosystem, offering the infrastructure needed to connect to and interact with blockchain networks. These services, including Alchemy, Quicknode, Blockdaemon, Getblock, BlockPI, ZAN, and Tenderly, provide scalable and reliable access to blockchain nodes, enabling developers to build and maintain decentralized applications (dApps) without the need to manage their own nodes. X Layer is dedicated to supporting and advancing the capabilities of node providers. Explore our resources to learn how you can leverage these services to streamline your development process and build robust blockchain applications.
[AlchemyAlchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[QuicknodeQuicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[BlockdaemonBlockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[GetblockGetblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPIBlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZANZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[TenderlyTenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[thirdweb](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling/thirdweb)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy

Title: Alchemy | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Alchemy.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# Alchemy[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy#alchemy)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy#alchemy)
[Alchemy](https://www.alchemy.com/) is the complete blockchain developer platform trusted by leading fintechs and developers worldwide.
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode

Title: Quicknode | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Quicknode.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# Quicknode[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode#quicknode)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode#quicknode)
[Quicknode](https://www.quicknode.com/) is the complete Web3 development platform providing high-performance blockchain infrastructure. It offers fast, reliable access to blockchain nodes with powerful APIs and analytics tools for developers building decentralized applications.
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon

Title: Blockdaemon | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Blockdaemon.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# Blockdaemon[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon#blockdaemon)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon#blockdaemon)
[Blockdaemon](https://www.blockdaemon.com/) is the complete blockchain infrastructure platform for enterprises. It provides institutional-grade node infrastructure, staking services, and APIs to help businesses integrate blockchain technology seamlessly.
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock

Title: Getblock | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Getblock.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# Getblock[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock#getblock)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock#getblock)
[Getblock](https://getblock.io/) provides Blockchain Node APIs for developers. It offers instant access to full nodes of major blockchains, enabling developers to connect their applications to blockchain networks without running their own infrastructure.
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi

Title: BlockPI | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about BlockPI.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# BlockPI[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi#blockpi)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi#blockpi)
[BlockPI](https://blockpi.io/) provides reliable and scalable blockchain infrastructure services. It offers high-performance RPC endpoints and node services designed to support developers in building and scaling their Web3 applications.
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan

Title: ZAN | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about ZAN.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# ZAN[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan#zan)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan#zan)
[ZAN](https://zan.top) provideds a suite of plug-and-play tools and services for your Web3 endeavors on X Layer.
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly

Title: Tenderly | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Tenderly.

Source: https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Alchemy](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/alchemy)
[Quicknode](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/quicknode)
[Blockdaemon](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockdaemon)
[Getblock](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/getblock)
[BlockPI](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/blockpi)
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)

# Tenderly[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly#tenderly)
[#](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly#tenderly)
[Tenderly](https://docs.tenderly.co/node/rpc-reference/xlayer) is the full-stack Web3 infrastructure platform providing node RPC, dev environments, and exploration tools.
[ZAN](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/zan)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview

Title: Oracles | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Oracles.

Source: https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Oracles[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview#oracles)
[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview#oracles)
Oracles are crucial components in the blockchain ecosystem, enabling smart contracts to interact with real-world data and external systems. These services, such as Chainlink, API3, Supra, Redstone provide secure and reliable data feeds, allowing decentralized applications (dApps) to access off-chain information like market prices, weather data, and event outcomes.
[ChainlinkChainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[API3API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[SupraOraclesSupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[RedstoneRedstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[Tenderly](https://web3.okx.com/xlayer/docs/developer/tools/node-providers/tenderly)
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink

Title: Chainlink | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Chainlink.

Source: https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)

# Chainlink[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink#chainlink)
[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink#chainlink)
[Chainlink](https://chain.link/) is the industry-standard oracle platform bringing the capital markets onchain and powering the majority of decentralized finance.
Supported network:
- X Layer mainnet
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3

Title: API3 | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about API3.

Source: https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)

# API3[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3#api3)
[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3#api3)
[API3](https://api3.org/) provides a decentralized solution for APIs to directly deliver data to blockchain applications on X Layer, improving the overall security and reliability of data feeds.
Supported network:
- X Layer mainnet
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles

Title: SupraOracles | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about SupraOracles.

Source: https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)

# SupraOracles[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles#supraoracles)
[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles#supraoracles)
[SupraOracles](https://supra.com/oracles-product/) is a powerful cross-chain oracle network designed to power DApps across blockchain ecosystems with fast, secure, decentralized, and scalable data solutions
Supported network:
- X Layer mainnet
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone

Title: Redstone | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Redstone.

Source: https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[Chainlink](https://web3.okx.com/xlayer/docs/developer/tools/oracles/chainlink)
[API3](https://web3.okx.com/xlayer/docs/developer/tools/oracles/api3)
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)

# Redstone[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone#redstone)
[#](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone#redstone)
[Redstone](https://redstone.finance/) is the number one Modular Oracle offering low-latency Pull model ([RedStone Core](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-core)) with versatile data feeds on X Layer.
Supported network:
- X Layer mainnet
[SupraOracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles/supraoracles)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding

Title: User onboarding | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about User onboarding.

Source: https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Privy](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding/privy)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# User onboarding[#](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding#user-onboarding)
[#](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding#user-onboarding)
User onboarding tools are essential for the blockchain ecosystem, simplifying the process for new users to interact with decentralized applications (dApps). These tools, such as Privy provide intuitive interfaces and streamlined processes for account creation, wallet management, and transaction execution.
[PrivyPrivy](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding/privy)
[Redstone](https://web3.okx.com/xlayer/docs/developer/tools/oracles/redstone)
[Privy](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding/privy)



---

## PAGE
URL: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet

Title: Safe Wallet | X Layer Documentation | OKX Wallet

Description: X Layer documentation consists of product user guides, developer's guide, and X Layer's fundamental tech and architecture. Click to learn about Safe Wallet.

Source: https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet

---

[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Academy](https://web3.okx.com/xlayer/docs/academy/getting-started/start-learning)
[X Layer overview](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Network information and contracts](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/network-information)
[Deploy a smart contract](https://web3.okx.com/xlayer/docs/developer/deploy-a-smart-contract/deploying-contract)
[Verify a smart contract](https://web3.okx.com/xlayer/docs/developer/verify-a-smart-contract/verifying-contract)
[Overview](https://web3.okx.com/xlayer/docs/developer/bridge/overview)
[Setup RPC](https://web3.okx.com/xlayer/docs/developer/setup-rpc/overview)
[RPC endpoints](https://web3.okx.com/xlayer/docs/developer/rpc-endpoints/rpc-endpoints)
[Websocket endpoints](https://web3.okx.com/xlayer/docs/developer/websockets-endpoints/websocket-endpoints)
[Flashblocks](https://web3.okx.com/xlayer/docs/developer/flashblocks/overview)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)
[Account abstraction](https://web3.okx.com/xlayer/docs/developer/tools/account-abstraction-overview)
[Block explorers](https://web3.okx.com/xlayer/docs/developer/tools/block-explorers-overview)
[Cross-chain](https://web3.okx.com/xlayer/docs/developer/tools/cross-chain-overview)
[Data indexers](https://web3.okx.com/xlayer/docs/developer/tools/data-indexers-overview)
[Developer tools](https://web3.okx.com/xlayer/docs/developer/tools/dev-tooling-overview)
[Node providers](https://web3.okx.com/xlayer/docs/developer/tools/node-providers-overview)
[Oracles](https://web3.okx.com/xlayer/docs/developer/tools/oracles-overview)
[User onboarding](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding)
[Safe Wallet](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet)
[Network Status](https://status.xlayer.tech)
[Developers](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/about-xlayer)
[Tools](https://web3.okx.com/xlayer/docs/developer/tools/overview)

# Safe Wallet[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet#safe-wallet)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet#safe-wallet)

## Version[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet#version)
[#](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet#version)
- Safe: Proxy Factory 1.3.0
- Verified: True
- Link: [https://app.safe.global/welcome?chain=xlayer](https://app.safe.global/welcome?chain=xlayer)
[https://app.safe.global/welcome?chain=xlayer](https://app.safe.global/welcome?chain=xlayer)
You can visit this [link](https://docs.safe.global/advanced/smart-account-supported-networks/v1.3.0) to view the contract addresses.
To access X Layer's Safe wallet, click [here](https://app.safe.global/welcome?chain=xlayer).
[Privy](https://web3.okx.com/xlayer/docs/developer/tools/user-onboarding/privy)
[Network Status](https://status.xlayer.tech)
[Version](https://web3.okx.com/xlayer/docs/developer/build-on-xlayer/safe-wallet#version)



