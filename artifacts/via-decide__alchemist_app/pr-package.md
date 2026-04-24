Branch: simba/refactor-reading-progress-engine-to-remove-globa
Title: Refactor Reading Progress Engine to remove global state, fix async ha...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Refactor Reading Progress Engine to remove global state, fix async handling, and align with precise EPUB position tracking.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.