# 📦 Unbox (AgentMirror): The On-chain Accountability & Guardrail Layer

## 🎯 Project Intro
**Unbox** is an active optimization and security guardrail middleware for AI Agents operating on the **OKX X Layer**. While Agentic Wallets hold the capital and Onchain OS provides the execution pathways, Agents inherently act as "Black Boxes," creating severe information asymmetry and security risks for human users. 

Unbox solves this by intercepting Agent intents, running Bayesian optimization (via `ax.dev`) to find the most capital-efficient route, and enforcing an on-chain **"Handshake Protocol"** via the `UnboxGuardrail` Smart Contract before allowing execution. If an agent's on-chain reputation score is too low for a risky trade, Unbox triggers an automated **circuit break**.

---

## 🏗️ Architecture Overview

Unbox operates as a **deterministic Sub-OS** sitting between the Agentic Wallet and the blockchain:

```
┌──────────────────────────────────────────────────────────────────┐
│                        USER / OPERATOR                          │
└──────────────────┬───────────────────────────────────────────────┘
                   │ Command
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│              OKX Agentic Wallet (TEE-protected)                 │
│              Address: 0xe7b7...5c27a                            │
│              Identity: Guardian of Accountability               │
└──────────────────┬───────────────────────────────────────────────┘
                   │ OnchainOSIntent / Uniswap Skill Call
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                    UNBOX MIDDLEWARE LAYER                        │
│                                                                  │
│  1. AgentAdapter ── Intercept & Normalize intent                │
│  2. OKXSecurityService ── Real-time OKX Token Risk Scan         │
│  3. AxBayesianOptimizer ── OKX DEX Aggregator + Uniswap V3     │
│  4. CounterfactualEngine ── "What-if" scenario replay           │
│  5. ExplanationWorker ── AI-powered forensic narration          │
│  6. ReputationService ── On-chain SBT reputation scoring        │
└──────────────────┬───────────────────────────────────────────────┘
                   │ Optimized Payload Hash
                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                   X LAYER SMART CONTRACTS                        │
│                                                                  │
│  • UnboxGuardrail.sol ── Handshake + Circuit Break              │
│  • DecisionLog.sol ── Immutable decision records                │
│  • AgentReputation.sol ── Soulbound Token reputation            │
└──────────────────────────────────────────────────────────────────┘
```

1. **Agentic Wallet:** Generates trading intents using Onchain OS / Uniswap Skills.
2. **Unbox Middleware (Interceptor):** Halts immediate execution, runs security + optimization.
3. **Bayesian Optimizer (`ax.dev`):** Computes alternative scenarios (Counterfactuals) to maximize ROI and minimize gas/slippage using real-time OKX DEX Aggregator quotes.
4. **The Handshake Protocol:** Submits the optimized payload hash to `UnboxGuardrail.sol`.
5. **Guardrail Contract:** Verifies the Agent's Soulbound Token (SBT) Reputation Score.
   - **Approved:** Forwarded to X Layer for execution.
   - **Rejected (Circuit Break):** Intent is blocked, and Global Threat Map is updated.

---

## 🔗 Deployment Addresses (X Layer)

| Contract | Address |
|---|---|
| **Agentic Wallet (Identity)** | `0xe7b7a872e04ea2ffee43785187a4663887e5c27a` |
| **UnboxGuardrail.sol** | Deployed on X Layer Testnet |
| **AgentReputation.sol (SBT)** | Deployed on X Layer Testnet |
| **DecisionLog.sol** | Deployed on X Layer Testnet |

---

## 🛠️ Onchain OS & Uniswap Skill Usage
*(Criteria 1: Onchain OS/Uniswap integration and innovation — 25%)*

Unbox does not just *use* Onchain OS and Uniswap skills; it **protects and optimizes** them.

### Onchain OS Integration
| Module | Usage | File |
|---|---|---|
| **DEX Aggregator** | Real-time swap quotes for counterfactual analysis | `skills/okx-trade-service.ts` |
| **Security Token Scan** | Pre-execution honeypot/rugpull detection | `services/okx-security-service.ts` |
| **Agentic Wallet** | TEE-protected on-chain identity & signing | CLI: `onchainos wallet` |
| **Supported Chains** | Dynamic chain validation for X Layer routing | `skills/okx-trade-service.ts` |

### Uniswap Skill Integration
When our Agentic Wallet utilizes the **Uniswap Exact Input Swap Skill** via Onchain OS, Unbox intercepts the skill call. Instead of accepting the default slippage and routing parameters, Unbox dynamically injects mathematically optimized parameters (via Bayesian search on `ax.dev`) back into the Uniswap Skill module. This transforms standard Onchain OS skills from "blind executors" into **"risk-adjusted, high-efficiency executors."**

### Innovation Highlight
**Forensic Guardrail:** Every intercepted agent intent triggers a real-time security audit using OKX's 4-level risk model. This detects Honeypots and Rugpulls before they hit the chain, providing a unique safety layer for the X Layer ecosystem that does not exist in any other middleware.

---

## ⚙️ Working Mechanics & AI Interactive Experience
*(Criteria 3 & 4: AI Experience & Product Completeness — 50%)*

### Decision Flow
1. **The Intent:** The user commands the Agent to interact with a DeFi protocol via Onchain OS or Uniswap skills.
2. **The Security Audit:** OKX Security Token Scan runs automatically — risk level (1–4) is computed.
3. **The Optimization:** The Bayesian optimizer queries OKX DEX Aggregator and computes counterfactual routes in real-time.
4. **The Explanation:** OpenRouter AI translates complex data into a human-readable causal chain (e.g., *"Wait 30s for better liquidity on X Layer Pool"*).
5. **The Execution/Block:** The Guardrail contract checks the agent's SBT reputation score and either approves or initiates a Circuit Break.

### Forensic Dashboard
A professional React dashboard provides:
- Live decision feed with AI explanations
- Reputation HUD with on-chain score tracking
- Counterfactual replay visualization
- Global Risk State (Herd Immunity) map
- x402 protocol feed monetization

---

## 🌍 Project Positioning in the X Layer Ecosystem
*(Criteria 2: X Layer ecosystem integration — 25%)*

To scale the X Layer ecosystem, human capital must **trust** AI Agents. Currently, they don't. 

Unbox positions itself as the **de facto Trust & Safety Layer for X Layer**:
- **Deterministic Reputation:** Soulbound Token (SBT) scores that cannot be gamed
- **Herd Immunity:** Global Risk State prevents ecosystem-wide honeypot cascades
- **Capital Efficiency:** X Layer's low gas costs enable real-time on-chain auditing of every decision
- **Gas-Free Auditing:** X Layer (chainIndex 196) charges zero gas fees, making it economically viable to anchor every single agent decision on-chain

This creates the psychological and mathematical safety net required for mass institutional and retail adoption of Agentic Wallets on OKX.

---

## 📂 Project Structure

```bash
├── packages/
│   ├── contracts/       # Solidity: UnboxGuardrail, DecisionLog, AgentReputation
│   ├── backend/         # Hono Worker: MirrorEngine, OKX Integration, Optimizer
│   │   └── src/
│   │       ├── adapter/       # AgentAdapter — intent interception
│   │       ├── engine/        # MirrorEngine, CounterfactualEngine
│   │       ├── services/      # BlockchainService, ReputationService, OKXSecurityService
│   │       ├── skills/        # AxBayesianOptimizer, OKXTradeService
│   │       ├── workers/       # ExplanationWorker (AI narration)
│   │       └── gateway/       # x402 protocol gateway
│   ├── dashboard/       # React forensic dashboard
│   └── shared/          # Shared schemas, ABIs, types (OnchainOSIntent)
└── .agents/skills/      # OKX Onchain OS Skills (installed via npx skills)
```

---

## 🏁 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- OKX Onchain OS CLI (`onchainos` — auto-installed via skills)

### Installation
```bash
npm install
npx skills add okx/onchainos-skills --all  # Install Onchain OS skills
```

### Setup Agentic Wallet
```bash
onchainos wallet login <your-email>
onchainos wallet verify <otp-code>
```

### Environment Variables
Create `packages/backend/.dev.vars`:
```env
OKX_API_KEY=your_api_key
OKX_SECRET_KEY=your_secret_key
OKX_PASSPHRASE=your_passphrase
PRIVATE_KEY=your_private_key
RPC_URL=https://xlayer-testnet.okx.com
```

### Run the Stack
```bash
# Backend (Cloudflare Worker)
cd packages/backend && npx wrangler dev

# Dashboard
cd packages/dashboard && npm run dev
```

---

## 👨‍💻 Team Members
- **@boxer32** — Software Engineer & Systems Architect (Smart Contracts, TypeScript Backend, System Design)

---

*Built for the OKX Build X Hackathon — X Layer Agentic Track — April 2026*
