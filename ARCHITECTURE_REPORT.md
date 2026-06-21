# Architecture Report

Generated at: 2026-06-21T23:20:08.516Z

## Repository Overview

- **Total Files Checked:** 152
- **Layer Breakdown:**
  - Shared Utilities: 0 files
  - Games: 0 files
  - Orchard Engine Layer: 0 files
  - Modular Tools: 0 files
  - Root-Level Hub/Router: 25 files

## File Types Distribution

| Extension | Count |
|---|---|
| `.yml` | 1 |
| `(no ext)` | 6 |
| `.md` | 47 |
| `.json` | 5 |
| `.js` | 58 |
| `.py` | 18 |
| `.html` | 6 |
| `.tex` | 1 |
| `.yaml` | 1 |
| `.css` | 3 |
| `.txt` | 3 |
| `.mjs` | 2 |
| `.toml` | 1 |

## Modular Naming Conventions & Boundaries

✅ All tools satisfy naming boundary standards (clean standalone layouts).

## Dependency Graph Map

```mermaid
graph TD
    "reading-progress.js" --> "tracker"
    "reading-progress.js" --> "book"
    "index.html" --> "app.js"
    "3d-block.test.js" --> "session-engine.js"
    "3d-block.test.js" --> "3d-block.js"
    "block-system.test.js" --> "block-system.js"
    "credit-system.test.js" --> "session-engine.js"
    "credit-system.test.js" --> "credit-system.js"
    "credit-system.test.js" --> "vault-manager.js"
    "epub-exporter.js" --> "zay-v2.js"
    "epub-exporter.test.js" --> "epub-exporter.js"
    "ingestion-engine.test.js" --> "block-system.js"
    "ingestion-engine.test.js" --> "session-engine.js"
    "ingestion-engine.test.js" --> "ingestion-engine.js"
    "knowledge-book-exporter.js" --> "session-normalizer.js"
    "knowledge-book-exporter.js" --> "epub-exporter.js"
    "knowledge-book-exporter.test.js" --> "knowledge-book-exporter.js"
    "navigation-state.test.js" --> "navigation-state.js"
    "session-engine.test.js" --> "session-engine.js"
    "session-review.test.js" --> "session-engine.js"
    "session-review.test.js" --> "session-review.js"
    "ui-activation.test.js" --> "session-engine.js"
    "ui-activation.test.js" --> "block-system.js"
    "ui-activation.test.js" --> "ingestion-engine.js"
    "ui-activation.test.js" --> "session-review.js"
    "ui-activation.test.js" --> "vault-manager.js"
    "ui-activation.test.js" --> "credit-system.js"
    "ui-activation.test.js" --> "ui-activation.js"
    "ui-integration.test.js" --> "session-engine.js"
    "ui-integration.test.js" --> "block-system.js"
    "ui-integration.test.js" --> "ingestion-engine.js"
    "ui-integration.test.js" --> "3d-block.js"
    "ui-integration.test.js" --> "ui-integration.js"
    "zay-compiler.test.js" --> "zay-compiler.js"
    "zay-importer.test.js" --> "zay-compiler.js"
    "zay-importer.test.js" --> "zay-importer.js"
    "universe-integration.test.js" --> "session-normalizer.js"
    "universe-integration.test.js" --> "vialogic.js"
    "universe-integration.test.js" --> "zayvora-visual-engine.js"
    "universe-integration.test.js" --> "alchemist-universe-session.js"
    "universe-integration.test.js" --> "zay-v2.js"
    "universe-integration.test.js" --> "epub-exporter.js"
    "universe-integration.test.js" --> "knowledge-book-exporter.js"
```
