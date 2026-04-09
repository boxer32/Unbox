# Unbox Backend

## Local API

- `GET /health`
- `GET /api/decisions?limit=50`
- `GET /api/stats`
- `POST /api/explanations`
- `POST /api/feed/redeem`

Start with:

```bash
npm run build
npm start
```

## Environment Setup

- Copy `.env.example` to `.env`.
- Set `PRIVATE_KEY` to your deploy wallet key.
- Set `DECISION_LOG_ADDRESS` and `REPUTATION_CONTRACT_ADDRESS` to the active deployment addresses.
- Never commit `.env` to source control.

## Storage Caveat

`FileDecisionStore` persists decisions to local filesystem under `data/decisions`.
This is suitable for local demos but not for serverless or ephemeral containers.
If the process restarts on ephemeral storage, decision history can be lost.

## DecisionLog Authorization

`DecisionLog` now supports owner-managed caller authorization.
After deploy, authorize the backend signer:

1. Call `setAllowedCaller(<backendWallet>, true)` as contract owner.
2. Verify the backend wallet can call `logDecision`.
