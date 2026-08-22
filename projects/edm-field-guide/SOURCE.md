# Publication provenance

This directory is the deployed HTML snapshot of *A Field Guide to Electronic Dance Music*.

The canonical editable source is the separate local `music` Quarto workspace, including `_quarto.yml`, `index.qmd`, `chapters/`, `fringe/`, `comparisons.qmd`, `spotify.qmd`, `sources.md`, and the graph generators under `scripts/`. Update that source, render it with Quarto, run `python3 scripts/validate_project.py --allow-visibility-pending`, and then replace this deployed snapshot from `_book/`.

Do not edit the generated HTML, web map, download bundle, or `site_libs/` in this directory by hand. The Quarto guide and track manifest govern the listening curriculum; the 179-node web and Obsidian graphs are generated navigation views derived from the shared `PILLARS` and `EDGES` declarations.
