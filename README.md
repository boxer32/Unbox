# 📦 Unbox (AgentMirror): The On-chain Accountability & Guardrail Layer

## 🎯 Project Intro
**Unbox** is an active optimization and security guardrail middleware for AI Agents operating on the OKX X Layer. While Agentic Wallets hold the capital and Onchain OS provides the execution pathways, Agents inherently act as "Black Boxes," creating severe information asymmetry and security risks for human users. 

Unbox solves this by intercepting Agent intents, running Bayesian optimization (via `ax.dev`) to find the most capital-efficient route, and enforcing an on-chain "Handshake Protocol" via the `UnboxGuardrail` Smart Contract before allowing execution. If an agent's on-chain reputation score is too low for a risky trade, Unbox triggers an automated circuit break.

## 🏗️ Architecture Overview
Unbox operates as a deterministic Sub-OS sitting between the Agentic Wallet and the blockchain:
1. **Agentic Wallet:** Generates trading intents using Onchain OS/Uniswap Skills.
2. **Unbox Middleware (Interceptor):** Halts immediate execution.
3. **Bayesian Optimizer (`ax.dev`):** Computes alternative scenarios (Counterfactuals) to maximize ROI and minimize gas/slippage.
4. **The Handshake Protocol:** Submits the optimized payload hash to `UnboxGuardrail.sol`.
5. **Guardrail Contract:** Verifies the Agent's Soulbound Token (SBT) Reputation Score. 
   - **Approved:** Forwarded to X Layer for execution.
   - **Rejected (Circuit Break):** Intent is blocked, and Global Threat Map is updated.

## 🔗 Deployment Addresses (X Layer Testnet)
* **Agentic Wallet (Identity):** `0xe7b7a872e04ea2ffee43785187a4663887e5c27a`
* **Unbox Guardrail Contract:** `[Handshake Pending Deploy]`
* **Agent Reputation (SBT) Contract:** `0xffa7CA1AEEEbBc30C874d32C7e22F052BbEa0429`
* **Decision Log Contract:** `[Historical Anchor Pending]`

## 🛠️ Onchain OS & Uniswap Skill Usage
*(Criteria 1: Onchain OS/Uniswap integration and innovation - 25%)*
Unbox does not just *use* Onchain OS and Uniswap skills; it **protects and optimizes** them. 
When our Agentic Wallet utilizes the **Uniswap Exact Input Swap Skill** via Onchain OS, Unbox intercepts the skill call. Instead of accepting the default slippage and routing parameters, Unbox dynamically injects mathematically optimized parameters back into the Uniswap Skill module. Unbox transforms standard Onchain OS skills from "blind executors" into "risk-adjusted, high-efficiency executors."

## ⚙️ Working Mechanics & AI Interactive Experience
*(Criteria 3 & 4: AI Experience & Product Completeness - 50%)*
1. **The Intent:** The user commands the Agent to interact with a DeFi protocol.
2. **The Optimization:** The UI displays a live terminal showing Unbox calculating spatial data and counterfactual routes.
3. **The Explanation:** Once optimized, OpenRouter AI translates the complex data parameters into a human-readable causal chain (e.g., *"Wait 30s for better liquidity on X Layer"*).
4. **The Execution/Block:** The UI visually indicates if the Guardrail contract approved the execution or initiated a Circuit Break based on network-wide risk flags.

## 🌍 Project Positioning in the X Layer Ecosystem
*(Criteria 2: X Layer ecosystem integration - 25%)*
To scale the X Layer ecosystem, human capital must trust AI Agents. Currently, they don't. Unbox positions itself as the **defacto Trust & Safety Layer for X Layer**. By providing deterministic reputation scores, stopping honeypot interactions via Herd Immunity (Global Risk State), and ensuring capital efficiency via L2's low gas costs, Unbox creates the psychological and mathematical safety net required for mass institutional and retail adoption of Agentic Wallets on OKX.

## 👨💻 Team Members
* **@boxer32** - Software Engineer & Systems Architect (Smart Contracts, Typescript Backend, System Design)
* **Antigravity** - AI Systems Engineer (Powered by Google DeepMind)
