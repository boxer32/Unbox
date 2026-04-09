---
name: unbox-test-release-ops
description: Manages Unbox test matrix, release checklist, evidence indexing, and risk register. Use when defining test cases, mapping TC to REQ/NFR IDs, preparing release gates, or tracking delivery risks.
---

# Unbox Test, Release, and Ops

Use this skill for:
- `docs/test_case_matrix.md`
- `docs/release_checklist.md`
- `docs/release_evidence_index.md`
- `docs/risk_register.md`

## When to use

- User asks to expand test coverage or add execution details.
- User asks to prepare gate-ready release process.
- User asks to track risks with severity and mitigation owners.

## Workflow

1. Test matrix updates:
   - Add `TC-*` with Owner, Automation path, Preconditions, Test data, Expected result.
   - Maintain full `REQ/NFR -> TC` coverage.
2. Release checklist updates:
   - Keep gate checks per sprint.
   - Attach `EVI-*` references for required evidence.
3. Evidence index updates:
   - Maintain artifact path, owner, status.
4. Risk register updates:
   - Keep severity, trigger, owner, mitigation, related tasks, status.

## Guardrails

- RC is blocked if any `REQ-*` has no `TC-*`.
- Gate cannot close if required evidence is not `Verified`.
- Critical risks must have explicit mitigation owner.
