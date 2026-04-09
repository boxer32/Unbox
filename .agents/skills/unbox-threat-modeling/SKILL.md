---
name: unbox-threat-modeling
description: Builds and maintains threat models for Unbox systems. Use when analyzing attack surfaces, trust boundaries, abuse cases, STRIDE risks, and mitigations across Mirror, Counterfactual, Reputation, and x402 flows.
---

# Unbox Threat Modeling

Use this skill for structured security design reviews before or during implementation.

## When to use

- User asks for threat modeling or security architecture review.
- A new feature changes trust boundaries, auth, payments, or on-chain behavior.
- A release gate requires risk review and mitigation coverage.

## Required references

- `Unbox_PRD_v0.1.md`
- `docs/engineer.md`
- `docs/risk_register.md`
- `docs/release_checklist.md`

## Workflow

1. Define scope and assets:
   - critical data
   - signing keys
   - payment flows
   - reputation state
2. Draw trust boundaries:
   - client/UI
   - backend workers
   - OpenRouter provider path
   - on-chain contracts
   - x402 gateway
3. Run STRIDE per component and data flow.
4. Rate severity (Critical/High/Medium/Low) and exploitability.
5. Add concrete mitigations:
   - prevention
   - detection
   - response/recovery
6. Map findings to tasks and release evidence IDs.

## Output format

Provide findings in a table with:
- `THREAT-ID`
- component/flow
- attack scenario
- impacted `REQ-*`/`NFR-*`
- severity
- mitigation owner
- mitigation task
- verification test

## Guardrails

- No vague risks without concrete exploit path.
- No mitigation without owner and verification method.
- Critical findings must block release until mitigated or formally accepted.
