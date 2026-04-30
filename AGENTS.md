# AGENTS.md — CODEX_INSTRUCTION_BOOTSTRAP_V1 (Primary)

## Load Order (mandatory, before any command)
1. `AGENTS.md`
2. `.codex/instructions.md`
3. `.codex/session.md`

If any file is missing: **STOP** and report `INSTRUCTION_BOOTSTRAP_MISSING`.

## Core Rules
- Stack is browser-only static runtime (vanilla JS/HTML/CSS; no npm, no frameworks, no backend dependency).
- Use surgical edits only; do not rewrite full files.
- Preserve existing UI behavior; do not modify swipe engine/core gesture logic.
- Execute with task discipline: READ → ANALYZE → PLAN → CONFIRM → MODIFY → VERIFY.
- Keep instructions minimal/high-signal; avoid token bloat.
