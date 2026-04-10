# ChemBook Auto Publisher

End-to-end automated publishing pipeline for an **Analytical Chemistry textbook series**.

## What it does
- Ingests notebook photos, markdown notes, and research PDFs.
- Runs OCR + chemistry-aware extraction.
- Reconstructs chapter content and diagrams.
- Generates examples, exercises, and citations.
- Exports EPUB, print-ready PDF, and KDP metadata/marketing assets.

## Architecture
1. OCR extraction (Tesseract)
2. Formula detection / chemical equation parsing
3. Diagram reconstruction (titration, spectroscopy, chromatography, stats)
4. Chapter structuring
5. Example problem generator
6. Exercise generator
7. Citation engine
8. EPUB builder (Pandoc + HTML template)
9. Paperback PDF builder (XeLaTeX)
10. KDP metadata + listing assets

## Quick start
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

System tools required:
- `tesseract`
- `pandoc`
- `xelatex`

### CLI usage
```bash
python -m chembook.cli.main ingest data/sample/images
python -m chembook.cli.main build epub
python -m chembook.cli.main build pdf
python -m chembook.cli.main generate exercises
python -m chembook.cli.main export kdp
```

### Run API
```bash
uvicorn chembook.api.main:app --reload --app-dir backend
```

### Run dashboard
The dashboard is a React+Tailwind single-page app loaded from CDN (no bundler needed):
```bash
python3 -m http.server 8080 --directory frontend
```
Then open `http://localhost:8080`.

## Project structure
```
backend/
  chembook/
    api/            # FastAPI endpoints
    cli/            # CLI entrypoint
    core/           # pipeline modules
    templates/      # pandoc + latex templates
    examples/       # prompt/seed data
frontend/
  index.html        # React + Tailwind dashboard
  src/app.js        # dashboard logic
  src/styles.css
scripts/
  build_book.py     # one-shot full pipeline script
data/sample/
  images/
  markdown/
  pdfs/
```

## Build a 100-page draft automatically
Use the one-shot script with multiple markdown sources and diagrams:
```bash
python scripts/build_book.py --input data/sample --title "Analytical Chemistry Vol. 1"
```
This orchestrates all pipeline steps and creates output in `backend/output/`.

## Notes
- This repo avoids binary files by design.
- OCR quality depends on image quality and installed language data.
- PDF/EPUB steps gracefully degrade if Pandoc/XeLaTeX are unavailable.
