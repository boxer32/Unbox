---
name: unbox-brand-voice
description: Applies Unbox brand voice and messaging standards to UX copy and product communication. Use when writing headlines, microcopy, error messages, counterfactual narratives, pitch lines, or any user-facing text.
---

# Unbox Brand Voice

Use this skill for brand-consistent writing across product and UX surfaces.

## Required references

Read before writing copy:
- `docs/brand.md`
- `Unbox_PRD_v0.1.md`

## When to use

- User asks to write homepage copy, dashboard copy, or product messaging.
- User asks to improve error text, insight cards, or alerts.
- User asks for tagline, pitch line, or content tone alignment.
- User asks to localize or rewrite copy while preserving brand personality.

## Voice profile (must follow)

- Straightforward, precise, evidence-based
- Technical but readable
- Calm under pressure
- Honest about uncertainty
- No hype language

## Writing rules (mandatory)

1. Numbers first whenever possible.
2. Active voice only.
3. No superlatives (`best`, `first`, `revolutionary`, `unprecedented`).
4. Explain uncertainty explicitly (`We estimate`, `Data suggests`, `We don't know yet`).
5. Refer to agent clearly as `it` and keep agency explicit.

## Content workflow

1. Identify context:
   - Surface (homepage, error state, insight card, feed console, pitch)
   - User goal
   - Risk level (normal, warning, blocked, uncertain)
2. Draft copy in concise factual format.
3. Add concrete signals:
   - score
   - percentage
   - block number
   - timestamp
4. Run voice checks:
   - no hype
   - active voice
   - factual and actionable
5. If uncertainty exists, state known vs unknown explicitly.

## Output templates

## Error/blocked template

`Transaction blocked. Here's why: <primary reason>. <evidence>. Logged at block <block>. <next action>.`

## Counterfactual template

`Your agent acted at <time>. If it had <alternative>, <metric> would be <delta> - a difference of <value>. Unbox Score impact: <delta>.`

## Trust/status template

`Agent <id> has an Unbox Score of <score> across <count> decisions.`

## Guardrails

- Do not write generic marketing fluff.
- Do not hide key facts behind vague language.
- Do not output copy without user action guidance for warning/error states.
- Keep naming aligned to brand architecture:
  - `Unbox`
  - `Unbox Mirror`
  - `Unbox Score`
  - `Unbox Feed`
