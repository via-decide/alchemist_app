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

## Publishing details

See `docs/publishing_pipeline.md`.
