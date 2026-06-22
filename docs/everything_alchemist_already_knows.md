# Everything Alchemist Already Knows

This document consolidates and formalizes the technical, architectural, UI/UX, and publishing decisions across the Alchemist Universe. It outlines the core operational standards, data contracts, and interface logic currently running within the codebase.

---

## 1. UI Decisions

*   **Zero-Bundler Static Architecture**: The client-facing production app is a vanilla Single Page Application (SPA) deployed at the repository root ([index.html](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/index.html)). It runs on static hosting (e.g., GitHub Pages) loading browser-safe IIFE modules via standard `<script>` tags, intentionally avoiding heavy bundlers like Webpack or Vite.
*   **Gesture-First Interface**: The primary interactive element is a mobile-first, card-swiping quiz engine. Users drag cards left, right, or up to input answers or confirm review decisions.
*   **Interactive Visual State Cues**: Cards render responsive UI updates during swiping, including accent overlays and status indicators:
    *   `✓` (Keep / Success)
    *   `✕` (Discard / Misconception)
    *   `↑` (Publish Ready / Upgrade)
*   **Decoupled UI Integration Layer**: Bridging user gestures with core engines is handled by a listener-based integration layer ([ui-integration.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/ui-integration.js) and [ui-activation.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/ui-activation.js)). It routes events (`alchemist:selection`, `alchemist:session:end`) without touching or interrupting the physical gesture layer.
*   **Robust Degradation & Fail-Safes**: If modular extensions fail to load, the UI displays clear fallback messages without crashing:
    *   `Reasoning engine unavailable.` (when `window.ViaLogic` is missing)
    *   `Visual graph unavailable.` (when `window.ZayvoraVisualEngine` is missing)

---

## 2. UX Decisions

*   **Progressive Card-by-Card Review**: Upon entering session review mode ([session-review.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/session-review.js)), finalized cards transform into discrete decision units. Gestures map directly to actions:
    *   Swipe right → Keep
    *   Swipe left → Discard
    *   Swipe up → Mark as publish candidate
    This prevents modal interruptions and cognitive overload from heavy grid layouts or tabular summaries.
*   **Offline-First Browser Continuity**: State persistence is maintained entirely on the client side using `localStorage` (via [session-engine.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/session-engine.js), [vault-manager.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/vault-manager.js), and [navigation-state.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/navigation-state.js)), ensuring execution continuity across page reloads without external server roundtrips.
*   **Strict Security Prompts**: The Secure Vault login sequence demands active credentials. Clicking "Cancel" or dismissing the access prompt returns a null response which immediately aborts the flow (`if (mob === null) return;`), preventing accidental fallback to guest access.
*   **Encapsulated State Scope**: The active learning session is restricted to a single non-finalized session object at a time. The engine prevents external state leakage by deep-copying blocks when reading or writing session contents.

---

## 3. Export Decisions

*   **Client-Side PDF & EPUB Assembly**: All user-facing documents are generated and packaged dynamically inside the client browser. PDF generation uses `jsPDF` fetched from CDN, and EPUB generation uses client-side compilers like [epub-exporter.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/epub-exporter.js) and [zay-compiler.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/zay-compiler.js).
*   **Unicode Safety in PDF Generators**: Standard PDF fonts (e.g., `helvetica`, `times`) crash when rendering Unicode Greek letters (such as `Δ`). The PDF exporter cleans entities (`replace(/&Delta;/g, "Δ")`) and translates them to safe ASCII equivalents (e.g., `(Delta)`) to ensure the files download and open correctly.
*   **Knowledge Book Packaging**: Finalized sessions compile a personalized "Knowledge Book" that maps kept blocks, session summaries, and logic reasoning outputs into a highly formatted, structure-compliant EPUB file.
*   **Portable .ZAY Archive Specification**: Sessions compile deterministically into a `.zay` v2 zip package ([zay-v2.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/packages/zay-format/zay-v2.js)) that contains:
    *   `manifest.json` (metadata and compilation targets)
    *   `content/session.json` (captured block data)
    *   `assets/index.json` (associated assets)
    *   `state/session-state.json` (finalized session state)
    Deterministic output is guaranteed by sorting JSON keys and entry file paths alphabetically during serialization.

---

## 4. Knowledge Model Decisions

*   **Strict Question Schema Validation**: The active database ([MASTER_VAULT.json](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/MASTER_VAULT.json)) is validated on build. Normalized items ([session-normalizer.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/session-normalizer.js)) must map to:
    *   `domain` (defaulting to `"Uncategorized"`)
    *   `logic` (defaulting to `"Logic unavailable."` when blank)
    *   `trap` (misconception string; numeric-only values fail validation)
*   **ViaLogic Concept Graphs**: Relationships between concepts and chemistry domains are modeled using nodes and edges:
    *   Nodes: `{ id, label, type, domain, weak }`
    *   Edges: `{ from, to, relation, weight }`
*   **Closed-Loop Credit Economy**: Starting a session charges credits ([credit-system.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/credit-system.js)). Publishing valid session blocks pays back a configurable refund (e.g., `50%`). Transitions are encapsulated inside closures to prevent simple browser console manipulation.
*   **Input Ingestion Sanitization**: To protect the database and PWA runtime, user text or custom blocks pass through [ingestion-engine.js](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/kernel/alchemist/ingestion-engine.js) where special HTML characters (`<`, `>`, `&`, quotes) are automatically escaped.

---

## 5. Publishing Decisions

*   **Single-Source Chapter Processing**: Book content resides inside [book/chapters/](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/book/chapters/) sorted by numeric prefix. Metadata configuration is managed globally in `book.yaml`.
*   **Dual-Output Build Pipeline**: A Python publishing pipeline ([build_book.py](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/build_book.py)) generates:
    *   `build/epub/book.epub`: A KDP-compliant EPUB styled via `epub.css`.
    *   `build/pdf/book_print.pdf`: A print-ready 6x9 interior styled via `print.css`, featuring running headers, mirrored margins, and gutter adjustments computed dynamically over a mock page count pass.
*   **Deterministic Vector Art**: Matplotlib-based scripts produce SVG diagrams for digital screens (EPUB) and PDF vector graphics for physical printing, storing them under `build/assets/diagrams/`.
*   **Decoupled EPUB Reader**: The core EPUB reading and parsing system ([core/](file:///Users/dharamdaxini/Downloads/via/daxini.xyz/alchemist/core/)) is written using modern ES Modules. It is kept isolated from the shipped client UI (which runs IIFE scripts) to maintain standard web compatibility until a bundler integration is introduced.
