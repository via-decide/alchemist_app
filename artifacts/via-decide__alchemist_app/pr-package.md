Branch: simba/add-robust-table-of-contents-toc-and-navigation-
Title: Add robust Table of Contents (TOC) and navigation system using EPUB3 ...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add robust Table of Contents (TOC) and navigation system using EPUB3 nav.xhtml with NCX fallback for full cross-reader compatibility.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.