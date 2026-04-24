Branch: simba/refactor-document-structure-engine-corestructure
Title: Refactor Document Structure Engine (core/structure.js) to correctly p...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Refactor Document Structure Engine (core/structure.js) to correctly parse headings, build hierarchy, and generate EPUB-compliant navigation (TOC + nav.xhtml).

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.