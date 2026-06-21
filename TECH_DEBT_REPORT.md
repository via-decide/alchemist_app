# Technical Debt Report

Generated at: 2026-06-21T23:20:08.516Z

## Summary Dashboard

- **Debt Health Score:** 15 (Lower is better)
- **TODO / FIXME Flags:** 0
- **Unsafe `eval()` Statements:** 0
- **Silent/Empty Catch Blocks:** 5
- **Duplicate Code Patterns:** 0

## Unsafe Evals (`eval()`) Detail

✅ No eval() statements found.

## Silent Catch Blocks Detail

| File | Line | Block Context |
|---|---|---|
| `core/epub-atomic.js` | 560 | `catch (e) { // Sync cleanup failure during exit; nothing more can be done. }` |
| `core/epub-checkpoint.js` | 156 | `catch (cleanupError) { // Ignore cleanup errors }` |
| `core/reader-location.js` | 319 | `catch (e) { // Ignore }` |
| `index.html` | 3761 | `catch(_){ }` |
| `kernel/alchemist/navigation-state.js` | 112 | `catch (error) {}` |

## Duplicate Code Block Sequences

✅ No matching duplicate blocks found.

## TODO / FIXME Backlog

✅ Clean backlog. No TODOs found.

