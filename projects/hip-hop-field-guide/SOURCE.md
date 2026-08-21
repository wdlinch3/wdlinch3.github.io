# Publication provenance

This directory is the deployed HTML snapshot of the public working edition of *The Message and the Method*.

The canonical editable source is `/Users/wdlinch3/Documents/ChatGPT/music/hip-hop-field-guide`, including `_quarto.yml`, the `.qmd` chapters, `sources.md`, and `candidate_manifest.csv`. Update that source, render it with Quarto, run `python3 scripts/validate_project.py`, and then replace this deployed snapshot from `_book/`.

Do not edit the generated HTML or `site_libs/` in this directory by hand. `candidate_manifest.csv` is copied alongside the rendered site for transparent research status; its `recognition_prompt` rows are proposals rather than accepted curriculum entries.
