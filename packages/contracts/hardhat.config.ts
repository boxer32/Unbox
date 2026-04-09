import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.26",
  networks: {
    // Configuration for X Layer Testnet would go here
    "x-layer-testnet": {
      url: "https://xlayer-testnet.okx.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  }
};

export default config;
