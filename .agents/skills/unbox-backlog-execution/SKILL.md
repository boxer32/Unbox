---
name: unbox-backlog-execution
description: Plans and updates Unbox sprint backlog for execution. Use when breaking requirements into sprint tasks, estimating work, assigning owners, setting dependencies, or tracking blockers across S1 to S6.
---

# Unbox Backlog Execution

Use this skill for `docs/sprint_backlog.md`.

## When to use

- User asks to create or refine sprint plans.
- User asks to add owners, estimates, priorities, dependencies, or blockers.
- User asks to prepare delivery sequence for release.

## Workflow

1. Keep sprint sequence dependency-safe:
   - S1 Mirror
   - S2 Counterfactual
   - S3 Reputation
   - S4 Feed
   - S5 Hardening
   - S6 RC
2. For each task row include:
   - Owner
   - Estimate
   - Priority
   - Dependency
   - Blocker
3. Ensure each task maps to `REQ-*`/`NFR-*`.
4. Verify sprint exit criteria are still measurable.

## Guardrails

- No task without mapped IDs.
- No dependency cycles.
- Blockers should be concrete and actionable.
