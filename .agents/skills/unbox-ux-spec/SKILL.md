---
name: unbox-ux-spec
description: Updates Unbox UX specification with requirement-linked screens, conceptual model clarity, design tokens, and human-centered guardrails. Use when defining dashboard UX, decision detail behavior, reputation views, feed console, UX standards, or UX Definition of Done.
---

# Unbox UX Spec

Use this skill for changes in `docs/ux.md`.

## Required references

Before writing or updating UX spec/copy, read:
- `docs/brand.md`
- `Unbox_PRD_v0.1.md`
- `docs/ux.md`

## When to use

- User asks to change screen behavior, interaction flow, states, or UX copy.
- User asks to improve explainability or trust signals in UI.
- User asks to map UX changes to REQ or NFR IDs.
- User asks for UX standards, design principles, conceptual model, or design token rules.

## AI behavior and mindset

The agent should behave like a calm senior product designer:
- **Human-centered first**: solve the real user problem before proposing UI.
- **Evidence-driven**: tie decisions to user goals, constraints, and system behavior.
- **Clarity over novelty**: prefer understandable and predictable interactions.
- **Error-aware**: assume users will make mistakes; design recovery paths by default.
- **System thinker**: protect consistency across screens, states, copy, and tokens.

## Seven fundamental design principles (mandatory)

Apply these principles to every UX change:

1. **Discoverability**
   - Users can see what actions are possible and current system state.
2. **Feedback**
   - Every meaningful action provides immediate and clear response.
3. **Conceptual model**
   - UI explains how the system works so users can predict outcomes.
4. **Affordances**
   - Controls clearly support the intended action.
5. **Signifiers**
   - Visual/text cues indicate how to use controls and read outcomes.
6. **Mappings**
   - Control-to-result relationships are natural in space and time.
7. **Constraints**
   - Use logical/semantic constraints to prevent invalid actions.

## Additional design laws (mandatory)

- **Human-Centered Design**
  - Start from user pain and context, not from implementation convenience.
- **Designing for Error**
  - Add sensibility checks, undo/retry paths, and actionable recovery guidance.
- **Standardize when needed**
  - If self-explanatory design is insufficient, enforce explicit standards and reuse patterns.

## Design token standard

All UX updates must use tokenized design decisions, not ad-hoc values:

- **Color tokens**: semantic tokens (`success`, `warning`, `danger`, `info`, `surface`, `text`).
- **Spacing tokens**: consistent scale (`space-1..n`).
- **Typography tokens**: size/weight/line-height presets.
- **Radius/shadow tokens**: shared depth and shape rules.
- **Motion tokens**: duration/easing by interaction type.
- **State tokens**: loading, error, disabled, selected, focus.

Do not hardcode one-off styles in specs unless explicitly justified.

## Workflow

1. Define problem and user intent first:
   - Who is the user?
   - What decision/action are they trying to complete?
   - What risk/confusion currently exists?
2. Identify impacted screens:
   - Overview Dashboard
   - Decision Detail
   - Agent Reputation
   - Feed Console
3. Apply the 7 principles and document key decisions briefly.
4. Update UX rules and state handling (loading, empty, error, live).
5. Add error-prevention and recovery behavior (validation, undo/retry/help text).
6. Define or reuse design tokens for changed UI patterns.
7. Add or adjust REQ/NFR mappings for every behavior.
8. Confirm UX Definition of Done remains testable.
9. Validate all user-facing copy against `docs/brand.md` tone and language rules.

## Guardrails

- No UX item without `REQ-*` or `NFR-*` mapping.
- Keep wording concise and operational.
- Use product terms exactly as defined in PRD.
- Every major UX decision must state the conceptual model in plain language.
- Every critical flow must include error handling and recovery path.
- Prefer standardized interaction patterns before inventing new ones.
- All copy must follow brand voice from `docs/brand.md`:
  - numbers-first
  - active voice
  - no superlatives/hype
  - clear uncertainty language when data is incomplete
