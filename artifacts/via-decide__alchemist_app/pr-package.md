Branch: simba/implement-a-document-structure-engine-corestruct
Title: Implement a Document Structure Engine (core/structure.js) to automati...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Implement a Document Structure Engine (core/structure.js) to automatically detect headings and generate proper EPUB navigation (TOC + nav map).

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.