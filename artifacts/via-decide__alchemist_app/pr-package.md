Branch: simba/add-complete-metadata-and-cover-image-system-to-
Title: Add complete metadata and cover image system to make EPUB exports ful...

## Summary
- Repo orchestration task for via-decide/alchemist_app
- Goal: Add complete metadata and cover image system to make EPUB exports fully publish-ready and compatible with Apple Books and other platforms.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.