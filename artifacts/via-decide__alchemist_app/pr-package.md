Branch: simba/add-image-normalization-and-embedding-pipeline-t
Title: Add image normalization and embedding pipeline to ensure all images r...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add image normalization and embedding pipeline to ensure all images render correctly across EPUB readers and devices.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.