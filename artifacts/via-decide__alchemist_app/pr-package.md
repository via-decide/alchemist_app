Branch: simba/add-atomic-export-system-using-staging-and-commi
Title: Add atomic export system using staging and commit mechanism to ensure...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add atomic export system using staging and commit mechanism to ensure only fully valid EPUB files are written to final output.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.