Branch: simba/add-text-selection-highlighting-and-notes-system
Title: Add text selection, highlighting, and notes system to enable annotati...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add text selection, highlighting, and notes system to enable annotations similar to Kindle.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.