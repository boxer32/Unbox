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
- **Infrastructure**: OKX Onchain OS + Agentic Wallet
- **Smart Contracts**: Solidity (Foundry)
- **Backend**: Node.js Service (Mirror Engine)
- **Frontend**: Vite + React + TanStack Router (Dashboard)
- **AI/LLM**: OpenRouter (Routed Synthesis for Explanations)

---

## 📂 Project Structure

```bash
├── packages/
│   ├── contracts/     # Solidity source, Foundry tests, and Deployment scripts
│   ├── backend/       # Mirror Engine, Counterfactual Worker, and x402 Gateway
│   ├── dashboard/     # Professional Forensic Dashboard (React/Vite)
│   └── shared/        # Shared schemas, ABIs, and types
├── docs/              # PRD, Engineering Specs, and Demo Runbooks
└── data/              # Local decision store (Forensic logs)
```

---

## 🏁 Quick Start

### 1. Prerequisite
- [Node.js](https://nodejs.org/) (v18+)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (for contract compilation)

### 2. Installation
```bash
npm install
```

### 3. Setup Environment
Create `.env` files in `packages/backend` and `packages/contracts` based on the provided examples.

### 4. Running the Stack
```bash
# Start Backend
npm run backend:dev

# Start Dashboard
npm run dashboard:dev
```

---

## 📚 Documentation
- [Product Requirements (PRD)](/docs/Unbox_PRD_v0.1.md)
- [Engineering Specification](/docs/engineer.md)
- [Demo Presentation Script](/docs/DEMO_SCRIPT.md)
- [Operational Failover Runbook](/docs/FAILOVER_RUNBOOK.md)
- [Regression Compliance Checklist](/docs/REGRESSION_CHECKLIST.md)

---
*Built for the X Layer Agentic Hackathon — April 2026*
