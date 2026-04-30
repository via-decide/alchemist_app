# CODEX Instruction Layer — Full Rules

## Bootstrap Contract
Codex must load and enforce these files in order before execution:
1. `AGENTS.md` (global guardrails)
2. `.codex/instructions.md` (full protocol)
3. `.codex/session.md` (active focus)

Missing file behavior:
- Abort execution.
- Emit: `INSTRUCTION_BOOTSTRAP_MISSING`.

## Execution Protocol (mandatory)
READ → ANALYZE → PLAN → CONFIRM → MODIFY → VERIFY

## Repository Constraints
- Browser-only runtime (vanilla JS, HTML, CSS).
- No frameworks, package managers, bundlers, or backend coupling.
- Static deployment compatible.
- No broad refactors or full-file rewrites.
- UI safety first; swipe/gesture core is protected.

## Task Economy + Session Rules
- Prefer smallest valid change set.
- Keep outputs deterministic and high-signal.
- Respect active session focus in `.codex/session.md`.
- If session constraints conflict with task safety, stop and report conflict.

## Enforcement Check (pre-execution)
Codex must print a concise “Rules Loaded” summary with:
- detected files
- active module focus
- protected UI areas
