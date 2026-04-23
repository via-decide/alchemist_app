Branch: simba/rebuild-epub-export-pipeline-to-generate-fully-c
Title: Rebuild EPUB export pipeline to generate fully compliant EPUB3 files ...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Rebuild EPUB export pipeline to generate fully compliant EPUB3 files with proper image support and cross-reader compatibility (including iOS Apple Books).

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.