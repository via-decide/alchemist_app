Branch: simba/add-batch-epub-export-system-with-job-queue-and-
Title: Add batch EPUB export system with job queue and isolation to support ...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add batch EPUB export system with job queue and isolation to support multiple book exports reliably.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.