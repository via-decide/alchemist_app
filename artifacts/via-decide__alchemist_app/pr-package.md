Branch: simba/add-epub-debug-and-inspection-mode-to-visualize-
Title: Add EPUB debug and inspection mode to visualize structure, validate i...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add EPUB debug and inspection mode to visualize structure, validate internal links, and compare outputs for fast issue diagnosis.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.