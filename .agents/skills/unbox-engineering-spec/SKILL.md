---
name: unbox-engineering-spec
description: Maintains Unbox engineering specification for architecture, contracts, schemas, SLOs, and failure modes. Use when updating service boundaries, data contracts, runtime flow, or engineering traceability to REQ and NFR IDs.
---

# Unbox Engineering Spec

Use this skill for `docs/engineer.md` updates.

## When to use

- User asks for architecture or implementation spec changes.
- User asks to update data schemas, contract behavior, or runtime flow.
- User asks for SLO, latency budget, or reliability hardening updates.

## Workflow

1. Update component responsibility table and mapped IDs.
2. Update data contracts (decision, counterfactual, score) if needed.
3. Update contract behavior and runtime steps.
4. Update SLO and failure mode tables.
5. Validate traceability matrix still maps PRD -> UX -> Engineering.

## Guardrails

- Keep all behavior linked to `REQ-*` or `NFR-*`.
- Avoid speculative architecture that is out of current scope.
- Keep contract and API terminology consistent with PRD.
