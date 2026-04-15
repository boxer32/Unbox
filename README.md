# 🛡️ Unbox: The Accountability Layer for AI Agents

**"Agents should be accountable. Not just autonomous."**

Unbox is an on-chain agent intelligence layer built on **X Layer (OKX)** and **Onchain OS**. It converts opaque agent behavior into a transparent, verifiable, and monetizable intelligence stream. Unbox captures, explains, and stress-tests every decision an AI agent makes before and after execution.

---

## 🚀 Key Features

### 🪞 Mirror (Explainability)
Intercepts every agent intent and normalizes it into a canonical Mirror record. It generates plain-language explanations for every action, especially when a guardrail blocks a risky transaction.

### 🧪 Counterfactual (Outcome Replay)
Quantitative outcome analysis. Unbox snapshots market state (price, liquidity, gas) at decision-time and replays alternative scenarios (e.g., "What if the agent waited 30s?") to calculate USD and Gas deltas.


### 💰 x402 Feed (Monetization)
Forensic intelligence for the agentic economy. Other agents can pay to access high-quality decision batches via the **x402 protocol** (HTTP 402 Payment Required), creating a new revenue stream for honest agents.

---

## 🛠️ Technology Stack

- **L2 Network**: X Layer (OKX Testnet)
- **Infrastructure**: Cloudflare Workers (Edge Functions) + Cloudflare D1 (SQL Storage)
- **Smart Contracts**: Solidity (Foundry)
- **Backend API**: Hono Framework (Stateless Cloudflare Worker)
- **Frontend**: Vite + React + TanStack Router (Dashboard)
- **AI/LLM**: OpenRouter (Routed Synthesis for Explanations)

---

## 📂 Project Structure

```bash
├── packages/
│   ├── contracts/     # Solidity source, Foundry tests, and Deployment scripts
│   ├── backend/       # Hono Worker, D1 Decision Store, and Counterfactual Engine
│   ├── dashboard/     # Professional Forensic Dashboard (React/Vite)
│   └── shared/        # Shared schemas, ABIs, and types
├── docs/              # PRD, Engineering Specs, and Demo Runbooks
└── data/              # Legacy decision store (Testing only)
```

---

## 🏁 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) 
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm install -g wrangler`)

### 2. Installation
```bash
npm install
```

### 3. Setup Environment
1. Backend: Create `packages/backend/.dev.vars` for local secrets.
2. Initialize Database:
   ```bash
   cd packages/backend
   npx wrangler d1 execute unbox_d1 --local --file=schema.sql
   ```

### 4. Running the Stack
```bash
# Start Backend (Wrangler Dev)
cd packages/backend
npx wrangler dev

# Start Dashboard
cd packages/dashboard
npm run dev
```

---

## 📚 Documentation
- [Product Requirements (PRD)](/docs/Unbox_PRD_v0.1.md)
- [Engineering Specification](/docs/engineer.md)
- [Demo Presentation Script](/docs/DEMO_SCRIPT.md)
- [Operational Failover Runbook](/docs/FAILOVER_RUNBOOK.md)
- [Regression Compliance Checklist](/docs/REGRESSION_CHECKLIST.md)

---

## 🏆 Hackathon Mandatory Compliance

### 1. Built on X Layer
The entire Unbox accountability protocol (Decision Logging, Reputation, Guardrails) is deployed on **X Layer Testnet**. All hashes are anchored to X Layer for immutable auditing.

### 2. Agentic Identity (Agentic Wallet)
Unbox utilizes the **OKX Agentic Wallet** as its primary on-chain identity. 
- **Role**: The Agentic Wallet acts as the "Guardian of Accountability," signing Mirror records and managing the Unbox reputation token.
- **Address**: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` (Linked to Agentic Wallet Instance)

### 3. Onchain OS Skill Integration
Unbox integrates the **OKX Onchain OS Trade Module** (DEX Aggregator):
- **Usage**: The `AxBayesianOptimizer` uses the OKX DEX Aggregator API to fetch real-time quotes and liquidity paths.
- **Purpose**: This data drives the **Counterfactual Engine**, providing authentic "Better Path" analysis versus the agent's original intent.

---

## 🏗️ Architecture Overview

Unbox operates as a middleware layer between an AI Agent and the blockchain:
1. **Intercept**: Captures Intent from the Agentic Wallet.
2. **Optimize**: Uses OKX Onchain OS to find the best execution path.
3. **Forensics**: Generates AI-powered narratives and counterfactual replays.
4. **Anchor**: Logs the decision hash and updates reputation on X Layer.

---

## 🌍 Project Positioning & Ecosystem
Unbox sits at the intersection of **AI Agents** and **Forensic Security** on X Layer. As the agentic economy grows, Unbox provides the necessary "Proof of Intent" and "Proof of Good Behavior" required for agents to trust each other and for users to trust their autonomous representatives.

---

## 👥 Team
- **Project Lead**: @boxer32
- **Agentic Dev**: Antigravity (Powered by Google DeepMind)

---
*Built for the X Layer Agentic Hackathon — April 2026*
