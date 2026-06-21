# Improvement Plan

Mission: **Cockpit v0.2 Verification Mission**
Generated at: 2026-06-21T23:20:08.518Z

## User Review Required

> [!IMPORTANT]
> This plan proposes migrating the folder hierarchy from a flat layout to a structured monorepo structure. 
> To prevent breaking external URLs and deep-links, backward-compatible symlinks or routing fallbacks should be created in the main entrypoints.

## Executive Analysis

- **Repository Complexity:** High (152 files detected across multiple layers)
- **Identified Technical Debt:**
  - TODO items: 0
  - Empty error catches: 5
  - Duplicate block patterns: 0
  - Unsafe evals: 0


## Tech Debt Remediation Tasks

### Task 2: Log Silent / Empty Catch Blocks
- **Description:** Ensure unexpected exceptions are not silently suppressed without observability.
- **Impact:** Medium | **Complexity:** Low
- **Recommendation:** Inject error logging metrics in catch handlers. Focus first on:
  - `core/epub-atomic.js` (Line: 560): `catch (e) { // Sync cleanup failure during exit; nothing more can be done. }`
  - `core/epub-checkpoint.js` (Line: 156): `catch (cleanupError) { // Ignore cleanup errors }`
  - `core/reader-location.js` (Line: 319): `catch (e) { // Ignore }`

## Verification Protocol

1. **Compilation Check:** Run syntax validation on modified files.
2. **Unit Suite:** Run `npm run test:unit` to guarantee core calculators are unaffected.
3. **Smoke Check:** Run `npm run test:smoke` to verify web layout loads cleanly.
