# Publication provenance

This directory is the deployed HTML snapshot of *A Field Guide to Electronic Dance Music*.

The canonical editable source is the separate local `music` Quarto workspace, including `_quarto.yml`, `index.qmd`, `chapters/`, `fringe/`, `comparisons.qmd`, `spotify.qmd`, and `sources.md`. Update that source, render it with Quarto, run `python3 scripts/validate_project.py --allow-visibility-pending`, and then replace this deployed snapshot from `_book/`.

Do not edit the generated HTML or `site_libs/` in this directory by hand.
