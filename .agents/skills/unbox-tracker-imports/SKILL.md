---
name: unbox-tracker-imports
description: Prepares and maintains backlog import files for task trackers. Use when exporting Unbox work items to CSV for Linear or Jira, including priorities, owners, estimates, dependencies, blockers, and external IDs.
---

# Unbox Tracker Imports

Use this skill for CSV import artifacts:
- `docs/backlog_import_jira_linear.csv`
- `docs/backlog_import_linear_native.csv`

## When to use

- User asks for tracker import files.
- User asks to sync backlog changes into CSV.
- User asks for Jira-native or Linear-native field formats.

## Workflow

1. Take source of truth from `docs/sprint_backlog.md`.
2. Regenerate or update CSV rows for all `S*-T*`.
3. Keep fields aligned to target platform:
   - Linear-native: Team/Project/Cycle/Priority/Estimate/Dependencies.
   - Jira-compatible: Issue Type/Priority/Labels/Sprint/Assignee.
4. Preserve `External ID` as task key (for idempotent re-import).

## Guardrails

- Every CSV row must map back to one backlog task ID.
- Keep priority semantics stable (`P0` -> highest).
- Do not drop dependency/blocker context on export.
