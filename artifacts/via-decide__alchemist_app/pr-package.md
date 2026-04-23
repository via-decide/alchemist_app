Branch: simba/add-epub-parsing-and-rendering-engine-to-enable-
Title: Add EPUB parsing and rendering engine to enable in-app reading of EPU...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add EPUB parsing and rendering engine to enable in-app reading of EPUB files.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.