---
name: unbox-prd-alignment
description: Maintains Unbox PRD alignment and requirement traceability. Use when updating product scope, REQ or NFR IDs, acceptance criteria, or cross-document consistency between PRD, UX, and engineering specs.
---

# Unbox PRD Alignment

Use this skill to keep `Unbox_PRD_v0.1.md` as single source of truth.

## When to use

- User asks to update scope, requirement IDs, acceptance criteria, or targets.
- User asks whether docs are aligned.
- Any change touches both PRD and downstream docs.

## Workflow

1. Update PRD first (`REQ-*`, `NFR-*`, terminology).
2. Propagate mapping updates to:
   - `docs/ux.md`
   - `docs/engineer.md`
   - `docs/sprint_backlog.md`
   - `docs/test_case_matrix.md`
3. Verify no orphan IDs remain.
4. Summarize changed IDs and affected docs.

## Completion reporting protocol (mandatory)

When reporting status, use only:
- `Done` = completed and verified with evidence
- `In Progress` = partially done
- `Blocked` = cannot proceed

For every `Done` item, include evidence:
- exact file path(s) updated
- what changed
- verification result (search/lint/test if applicable)

If evidence is missing, status must NOT be `Done`.

## Forbidden behaviors

- Do not fabricate completion checkboxes.
- Do not claim "all done" without checking files.
- Do not mark checklist items complete by assumption.
- Do not report verification you did not actually run.

## Guardrails

- Do not introduce undocumented IDs.
- Keep naming consistent with PRD terminology section.
- If a requirement changes, update acceptance criteria and at least one mapped task and test.
- If user asks for an audit, prioritize findings and mismatches before summary.
