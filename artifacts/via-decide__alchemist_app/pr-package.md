Branch: simba/add-checkpointing-and-resumable-export-system-to
Title: Add checkpointing and resumable export system to ensure EPUB generati...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add checkpointing and resumable export system to ensure EPUB generation can recover from interruptions without losing progress.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.