Branch: simba/implement-a-reading-progress-location-engine-cor
Title: Implement a Reading Progress & Location Engine (core/reading-progress...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Implement a Reading Progress & Location Engine (core/reading-progress.js) to track and restore user reading positions.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.