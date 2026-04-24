Branch: simba/refactor-reading-progress-engine-corereading-pro
Title: Refactor Reading Progress Engine (core/reading-progress.js) to suppor...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Refactor Reading Progress Engine (core/reading-progress.js) to support multi-book tracking, proper storage integration, and safe performance behavior.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.