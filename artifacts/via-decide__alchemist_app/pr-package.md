Branch: simba/add-reading-location-progress-tracking-and-resum
Title: Add reading location, progress tracking, and resume system to persist...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add reading location, progress tracking, and resume system to persist and restore user position accurately.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.