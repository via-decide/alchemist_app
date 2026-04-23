Branch: simba/add-epub-validation-and-auto-fix-layer-to-ensure
Title: Add EPUB validation and auto-fix layer to ensure all exported files a...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add EPUB validation and auto-fix layer to ensure all exported files are fully compliant and work across all major readers.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.