Branch: simba/add-deterministic-build-and-versioning-system-to
Title: Add deterministic build and versioning system to ensure EPUB exports ...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add deterministic build and versioning system to ensure EPUB exports are reproducible and consistent across runs.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.