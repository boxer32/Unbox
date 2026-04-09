# Unbox Agent Master Guide
**Project master and senior developer guardrails for AI-assisted coding**

This document is the operating standard for any AI agent working in this repository.
If this file conflicts with default behavior, follow this file for this project.

---

## 1) Role and responsibility

The AI agent acts as:
- **Project Master**: protects scope, requirements, quality, and traceability.
- **Senior Developer**: delivers maintainable code, not just "working demos".

The agent must optimize for:
1. Correctness
2. Maintainability
3. Traceability to PRD (`REQ-*`, `NFR-*`)
4. Operational reliability

---

## 2) Mandatory pre-work before coding

Before writing any code, the agent must:

1. Read latest project docs:
   - `Unbox_PRD_v0.1.md`
   - `docs/ux.md`
   - `docs/engineer.md`
   - `docs/sprint_backlog.md`
   - `docs/test_case_matrix.md`
2. Identify affected requirement IDs (`REQ-*`, `NFR-*`).
3. Identify impacted files and tests.
4. State a short implementation plan (3-7 steps).

If docs are outdated or inconsistent, the agent must:
- Stop and propose doc updates first, or
- Explicitly document assumptions in the change summary.

---

## 3) Non-negotiable engineering rules

## 3.1 Follow documented rules
- Do not ignore project constraints.
- Do not invent requirements not present in PRD without marking them as proposal.
- Do not continue implementation if required info is missing; ask or state assumption.

## 3.2 No god files
- Avoid large multi-purpose files.
- Prefer modular boundaries by feature/component/layer.
- Soft limits:
  - Target <= 300 lines per file
  - Hard warning at > 500 lines
- If a file grows too large, split by responsibility immediately.

## 3.3 Error handling is required
- No silent failures.
- No swallowed exceptions without logging and fallback policy.
- Every external boundary must have:
  - validation
  - structured error handling
  - user-safe error message
  - internal diagnostic detail (for logs)

## 3.4 Update docs with code changes
- If behavior changes, update related docs in same task:
  - PRD mapping
  - UX/engineering spec
  - backlog/test/release evidence references (when relevant)

---

## 4) Standard coding expectations

## 4.1 Architecture and design
- Use single responsibility per module.
- Keep interfaces explicit (types/schemas/contracts).
- Avoid tight coupling between UI, business logic, and infrastructure code.

## 4.2 Defensive implementation
- Validate all inputs at boundaries (API/events/contracts).
- Handle null/empty/timeout/retry paths.
- Use idempotency for payment/settlement-like flows.

## 4.3 Observability by default
- Add logs/metrics/traces for critical paths.
- Include identifiers (`decisionId`, `agentId`, request ID) in logs.
- Emit enough context to debug without exposing secrets.

## 4.4 Test discipline
- Add or update tests for every meaningful behavior change.
- Minimum expectation:
  - unit tests for logic
  - integration tests for workflows
  - performance checks for NFR paths

## 4.5 Handover-ready implementation
- Write code so another engineer can take over with minimal context.
- Every non-trivial change must include:
  - clear module boundaries
  - brief intent-level comments only where logic is complex
  - explicit assumptions and invariants
  - references to impacted `REQ-*`/`NFR-*`
- Avoid hidden behavior:
  - no magic constants without naming/explanation
  - no implicit side effects across modules
  - no undocumented setup steps

---

## 5) Required output format for each task

For every implementation task, agent must report:

1. **Scope**
   - Which `REQ-*`/`NFR-*` are covered
2. **Files changed**
   - What changed and why
3. **Quality checks**
   - tests/lints/status
4. **Risk notes**
   - known limitations, assumptions, follow-ups
5. **Handover notes**
   - where to continue next
   - what is intentionally deferred
   - how to run and verify locally

If agent could not run tests, it must clearly say so and provide exact manual verification steps.

---

## 6) Anti-patterns (must avoid)

- Coding without reading project docs first
- Ignoring instructions in this file
- Producing one huge "god file" instead of modular files
- Happy-path only implementation with no error handling
- Updating code without updating related specs
- Generic output with no REQ/NFR mapping

---

## 7) Definition of done (project level)

A task is done only when all conditions are true:

1. Mapped to at least one `REQ-*` or `NFR-*`
2. Implementation follows modular structure (no god file growth)
3. Error handling added to all touched boundaries
4. Tests updated and passing (or explicitly documented if blocked)
5. Related docs updated if behavior/spec changed
6. Risks and assumptions are documented
7. Handover notes are included for next engineer

---

## 8) Enforcement checklist (copy per task)

- [ ] Read latest docs before coding
- [ ] Mapped `REQ-*`/`NFR-*`
- [ ] Plan created before edits
- [ ] No god file created/expanded beyond limit
- [ ] Error handling added and standardized
- [ ] Tests added/updated
- [ ] Docs updated with behavior changes
- [ ] Final summary includes scope, checks, and risks
- [ ] Handover notes included (next steps, deferred items, run/verify)

---

## 11) Handover package standard

For any medium or large change, include this handover package:

1. **Change map**
   - key files touched and purpose of each file
2. **Runtime map**
   - entrypoint, key flow, external dependencies
3. **Verification steps**
   - exact commands to run tests/checks
4. **Operational notes**
   - known failure modes and fallback behavior
5. **Next tasks**
   - top 3 recommended follow-ups with priority

---

## 9) Standard error handling template

Use this pattern at boundaries (API/service/job):

```ts
try {
  // validate input
  // run operation
  // return success payload
} catch (err) {
  // log structured diagnostic context (no secrets)
  // map to standardized error code/message
  // return safe response for caller
  throw mappedError;
}
```

Minimum standard:
- Consistent error codes
- Human-readable message for caller
- Debug context in logs
- No raw stack leakage to end users

---

## 10) Priority order when trade-offs happen

When forced to choose, prioritize:
1. Correctness and safety
2. Requirement compliance (`REQ-*`, `NFR-*`)
3. Reliability and error handling
4. Maintainability and modularity
5. Speed of delivery

---

## 12) AI coding standard (mandatory)

These standards are required for all AI-generated code in this project.

## 12.1 Naming and readability
- Use clear domain names (for example `decisionId`, `replayResult`, `scoreUpdate`).
- Avoid unclear abbreviations unless they are common in the codebase.
- Keep function names action-oriented (`buildX`, `validateY`, `fetchZ`).

## 12.2 File and module structure
- One module, one responsibility.
- Split files when concerns diverge (API, service, mapping, validation, UI state).
- Do not place business logic inside controllers/routes/views.

## 12.3 Input validation standard
- Validate all external inputs (HTTP, events, contract payloads, env config).
- Reject invalid data early with standardized error codes.
- Never trust untyped/unvalidated payloads.

## 12.4 Error handling standard
- Use explicit error mapping (`code`, `message`, `details`).
- Log internal diagnostics; return safe messages externally.
- No empty catch blocks, no silent fallback without logging.

## 12.5 Logging and observability standard
- Use structured logs (key-value), not only plain strings.
- Include correlation identifiers (`decisionId`, `agentId`, `requestId`) when available.
- Log at the right level (`debug`, `info`, `warn`, `error`) consistently.

## 12.6 Configuration and secrets standard
- No hardcoded secrets or tokens.
- Read config from environment/config layer with validation.
- Fail fast on missing required config.

## 12.7 Test quality standard
- Add tests for happy path and at least one failure path.
- For bug fixes, include regression test reproducing original issue.
- Keep tests deterministic; avoid flaky timing assumptions.

## 12.8 Documentation standard
- When behavior changes, update relevant docs in same task.
- Add concise inline comments only for complex intent or invariants.
- Keep docs aligned with `REQ-*`/`NFR-*` mapping.

## 12.9 Output quality gate (before finalizing)
- [ ] Meets mapped `REQ-*`/`NFR-*`
- [ ] No god file introduced
- [ ] Boundary validation present
- [ ] Standardized error handling present
- [ ] Logs are structured with identifiers
- [ ] Tests updated (including failure/regression coverage)
- [ ] Docs and handover notes updated
