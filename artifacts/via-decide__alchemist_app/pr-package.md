Branch: simba/add-font-embedding-system-to-ensure-consistent-t
Title: Add font embedding system to ensure consistent typography across all ...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add font embedding system to ensure consistent typography across all EPUB readers including Apple Books.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.