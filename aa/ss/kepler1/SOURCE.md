# Kepler I student release — 2026-10-05

School class: https://astro2627.sites.tjhsst.edu/ss/2026-2027/
School reading: https://astro2627.sites.tjhsst.edu/ss/kepler1/
School ZIP: https://astro2627.sites.tjhsst.edu/assignments/ss_kepler1.zip
School student PDF: https://astro2627.sites.tjhsst.edu/ss/kepler1/ss_kepler1.pdf
Website-source routes use the `/aa/` prefix; the Director builder removes it.

## Authority and provenance

The current original instructor notebook is `aa_class/aa_ss/source/ss_kepler1/ss_kepler1.ipynb` in the local parent workspace. It was snapshotted unchanged for this release; no notebook content or metadata was edited, and the notebook was not executed. Experimental redesign materials were not used.

The private snapshot, staging config, generation evidence, previous canonical release, and complete release record are in `aa_class/instructor_reviews/ss_kepler1/2026-10-05-release/`. The final run record records the exact public-assignment, website, Director, and observed server revisions.

| Artifact | SHA256 |
| --- | --- |
| Current instructor snapshot | `f6cc97668579cbb9e501932f7ed8cb4afc3513dfe61769a49125a80f1922acca` |
| Generated student notebook | `40b345ec06e97714927c08f21346296ed7cd645afe8c51c63a7a013a9f941d12` |
| Student ZIP | `b8dc85bf8520059bef47f79858e1ab980aa9e32b15b882f8f07b4c0ed3c06676` |
| Reading QMD | `8f679a555d4b24681a283f483ad442e5a159d7eea1c6300579cbdeef87438340` |
| Rendered HTML | `8cea07ef9627412bb7c57ae2786feda48c2fc0041c6184e4d51fd388672aba82` |
| Student PDF | `4ba25d50823165673d6ebdcf5591588b3751d09d17596dd077237ec8dfd444c6` |
| Student figure Images/anomalies.png | `3dabc7296d16765107b5ff5eec525647aa84e0491ecbaeda173adf5a5e26aa16` |

## Transformations

Nbgrader 0.9.5 generated all 27 cells. All 12 solution cells, including the supplemental anomaly derivation, become `YOUR ANSWER HERE`. The other 15 cells preserve exact source text and order. There are 11 problems, four footnotes, no code outputs, and one student image dependency. Grade IDs remain stable and unique. The ZIP allowlist is exactly `ss_kepler1/ss_kepler1.ipynb` and `ss_kepler1/Images/anomalies.png`; it excludes all instructor diagrams, old exports, and redesign material.

The reading is derived from the generated student notebook's non-solution cells. It omits the duplicate title and answer-entry placeholders, normalizes display-math delimiters and trailing Markdown whitespace, and converts the existing HTML image wrapper to Markdown image syntax with equivalent width plus alt text so the same figure appears in HTML and PDF. All instructional wording, equations, problem order, links, and footnotes are retained. The student PDF is seven pages using the course's article/one-inch-margin convention; a print-only space reservation keeps problem headings with their text. It contains no solutions. No instructor PDF is part of this public release.

Existing card routes, description, and demo link are preserved; the requested student PDF link is added to the existing shared manifest entry. Shared HTML styling is unchanged. Quarto vendor JavaScript is not modified.

## Rebuild commands

From the isolated staging course root in the private run record (with explicit `aa_ss` course ID and `source` / `release` directories):

```sh
nbgrader generate_assignment ss_kepler1 --notebook ss_kepler1 --force --no-db
```

Install the generated allowlist into `aa_class/aa_ss/release/ss_kepler1/` and the public `aa_assignments/aa_ss/ss_kepler1/`; package it into the same ZIP bytes for the assignment repository and website. From the public-assignment checkout:

```sh
python3 tools/check_public_release.py --release-root /Users/wdlinch3/Documents/github/aa_class aa_ss/ss_kepler1
```

From this website root, with a writable TeX cache if needed:

```sh
quarto render aa/ss/kepler1/kepler1.qmd --to html
quarto render aa/ss/kepler1/kepler1.qmd --to pdf
bundle exec jekyll build
git diff --check
```

Quarto 1.9.37 and LuaHBTeX / TeX Live 2026 were used. The QMD and this provenance file remain excluded from Jekyll output. Build Director from the exact merged website commit using its `scripts/build_from_source.py`, then run `scripts/check_site.py` before publication.

## Validation and limits

Notebook validation, exact cell comparison, ZIP integrity/extraction/hash comparison, dependency path/case checks, and public release checker passed (`errors=0 reviews=0`). PDF text/figure checks and rendered-page inspection passed. Local HTTP browser checks at 1440px and 390px confirmed the card links, all 11 problems, 106 rendered math expressions, one loaded figure, zero math/browser errors, and no page overflow. Wide mobile display equations retain the shared theme's horizontal scrolling.

This is a source-faithful build, not a scientific rewrite or comprehensive physics audit. Existing wording and coordinate conventions are preserved. The instructor-only anomaly discussion is suppressed rather than amended. See the private run record for completed CI, Director, and live freshness verification.
