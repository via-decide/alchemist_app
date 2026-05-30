# ChemBook Auto Publisher

Deterministic book production engine for KDP-ready EPUB and paperback PDF output.

## Quick start

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
make publish
```

Outputs:

- `build/epub/book.epub`
- `build/pdf/book_print.pdf`
- `build/assets/diagrams/*.svg`
- `build/assets/diagrams/*.pdf`

## Content layout

- `book/chapters/` – markdown chapter files
- `book/metadata/book.yaml` – publishing metadata
- `book/styles/epub.css` – Kindle-oriented EPUB CSS
- `book/styles/print.css` – paperback CSS (6 x 9 in)

## Commands

```bash
make diagrams
make epub
make pdf
make publish
pytest -q
```

## Alchemist EPUB Export Engine progress

Mode: BUILD / ARCHITECTURE MODE for notebook-first, citation-governed EPUB publishing.

First implementation target: **Medicinal Chemistry Reasoning System** by **Dharam Daxini**.

Current pipeline commitment:

1. Preserve notebook sequencing as the constitutional truth layer before chapter reconstruction.
2. Reconstruct chapters into mechanism, structure, medicinal logic, pedagogy, citations, and `IMAGE_SPEC` blocks.
3. Govern unsupported scientific claims with `[CITATION REQUIRED]` and quantitative claims with `[NUMERICAL VALIDATION REQUIRED]`.
4. Render Kindle-safe EPUB assets for reaction schemes, SAR panels, spectra, mechanisms, and workflow diagrams.
5. Validate output through OPF/TOC generation, EPUBCheck when available, Kindle-safe CSS, and metadata consistency.

## Publishing details

See `docs/publishing_pipeline.md`.

## Mode confirmation — Build / Architecture

This repository is operating in **BUILD / ARCHITECTURE MODE** with Codex as the implementation fabric for autonomous system evolution.

Current progress target:
- define Codex execution contracts (planner, DAG, validation, PR orchestration)
- support multi-repo worktree-driven execution flows
- enable JSON-native runtime task packs and validator packs
- establish architecture-memory + governance guardrails

Submission endpoint for architecture progress updates:
- https://via-decide.github.io/StudyOS/
