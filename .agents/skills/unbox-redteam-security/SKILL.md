---
name: unbox-redteam-security
description: Runs red-team style adversarial testing for Unbox. Use when validating abuse resistance, bypass attempts, prompt injection paths, payment fraud scenarios, and detection or response readiness before release.
---

# Unbox Red Team Security

Use this skill to pressure-test real attack paths against implemented behavior.

## When to use

- User asks for red-team exercises or adversarial testing.
- Security-sensitive release is approaching.
- New integration introduces external input or payment logic.

## Required references

- `docs/engineer.md`
- `docs/test_case_matrix.md`
- `docs/risk_register.md`
- `docs/release_checklist.md`
- `docs/release_evidence_index.md`

## Attack tracks (minimum set)

1. Prompt/input manipulation:
   - malicious intent payloads
   - explanation/synthesis prompt injection attempts
2. Payment abuse:
   - x402 replay attempts
   - duplicate settlement
   - partial verification bypass
3. Reputation abuse:
   - score manipulation via malformed events
   - checkpoint inconsistency attempts
4. Availability abuse:
   - queue saturation
   - high-latency provider behavior
5. Data integrity abuse:
   - hash mismatch
   - stale or reordered event consumption

## Workflow

1. Define red-team objective and target flow.
2. Select attack hypotheses from risk register.
3. Execute controlled adversarial tests.
4. Record outcomes as:
   - exploited
   - blocked
   - partially blocked
5. Create remediation tasks and map to release gates.

## Output format

For each scenario include:
- `RT-ID`
- hypothesis
- attack steps
- expected defense
- actual result
- severity
- remediation owner
- linked test (`TC-*`) and evidence (`EVI-*`)

## Guardrails

- Keep tests legal, safe, and within authorized environment.
- Do not run destructive actions against production.
- Every successful exploit must create a tracked mitigation task.
