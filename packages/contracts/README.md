## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
# Deploy AgentReputation
$ forge script script/DeployReputation.s.sol --rpc-url <your_rpc_url> --broadcast

# Deploy DecisionLog
$ forge script script/DeployDecisionLog.s.sol --rpc-url <your_rpc_url> --broadcast
```

### Authorize Backend Caller (Mirror Engine)

Once `DecisionLog` is deployed, the backend service address needs authorization to push decision anchors:

```shell
$ export DECISION_LOG_ADDRESS=0x...
$ export CALLER_TO_AUTHORIZE=0x...
$ forge script script/AuthorizeCaller.s.sol --rpc-url <your_rpc_url> --broadcast
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
