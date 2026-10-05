# Kepler I corrected student release — 2026-10-04

Authority: current original `aa_class/aa_ss/source/ss_kepler1/ss_kepler1.ipynb`, snapshotted unchanged. No redesign, source edits, or execution of the instructor notebook.

School class: https://astro2627.sites.tjhsst.edu/ss/2026-2027/
School reading: https://astro2627.sites.tjhsst.edu/ss/kepler1/
School ZIP: https://astro2627.sites.tjhsst.edu/assignments/ss_kepler1.zip
Website-source URLs have an additional `/aa` prefix.

## Metadata and source fidelity

The author removed nbgrader metadata from cell `31ea8975-292d-4ef0-ba2b-f7093338cfad` (formerly grade ID `cell-d0c2e23acc4fd903`, solution/grade true, task/locked false, points 0). Its Anomaly matching discussion is now intentionally visible, together with Images/anomalies2.png and Images/anomalies3.png. Fresh nbgrader generation preserves all 27 cells and exact text/order of all 16 non-solution cells. The remaining 11 solutions become YOUR ANSWER HERE. No code outputs or instructor tests are published.

The ZIP allowlist is ss_kepler1.ipynb and Images/anomalies.png, Images/anomalies2.png, Images/anomalies3.png under one ss_kepler1 directory. Notebook validation, cell comparison, archive extraction/hash checks, and public-release checker passed (errors=0 reviews=0).

## Reading and card

Reading derives from the generated student notebook, omitting placeholders and duplicate title, preserving original problem blockquotes and shared theme. Display delimiters are normalized; only the newly visible discussion has blockquote wrappers removed to keep its displays at top level, and its align environments are wrapped as aligned display math. Image wrappers become Markdown images with equivalent widths and accessibility text without added visible captions. Source wording and mathematical conventions are preserved without scientific rewriting.

Only the Student PDF resource was removed from the card; Read online, Download assignment (.zip), Kepler two-body demo, ordering, description, and other cards are unchanged. The existing PDF was refreshed on 2026-10-05 from the corrected student reading, including Anomaly matching and all three diagrams. The other 11 solutions remain suppressed. The reading navigation link is unchanged; the class card still has no PDF link. HTML, ZIP, original QMD, notebook metadata and instructional wording are unchanged.

## Hashes

- Instructor snapshot: `31e91c5a60bbbcd3f4e00b48263b4915d2953d21e63cf7b0fbaca1c7be2d583f`
- Student notebook: `0e36f35854ea7531513a2472c13c9e67b72069dafa6d710f3c653af6a4e22159`
- Assignment ZIP: `770d665a1e454744f0186b9e7b75f6415a9fe7d222eb81ddbe1b1a17a9f7a7d1`
- Reading QMD: `6d3a1b90e7e1107f597753a8f1277eaea9e618239af4ac41220b3a7f3af7a874`
- Rendered HTML: `753eba2fe937757ec52dba71e4664a8e93470c467d9a725db575781012a9e5b1`

## Rebuild

Private evidence and staged course configuration: `aa_class/instructor_reviews/ss_kepler1/2026-10-04-correction/`.

```sh
# From isolated staging, explicit course_id aa_ss and source/release directories:
nbgrader generate_assignment ss_kepler1 --notebook ss_kepler1 --force --no-db
# From public assignment checkout:
python3 tools/check_public_release.py --release-root /Users/wdlinch3/Documents/github/aa_class aa_ss/ss_kepler1
# From website checkout:
quarto render aa/ss/kepler1/kepler1.qmd --to html
bundle exec jekyll build
git diff --check
```

Build Director with scripts/build_from_source.py using the exact merged website SHA; run scripts/check_site.py and fast-forward /site/public. The private RELEASE.md records published revisions and anonymous verification. QMD/provenance remain excluded from Jekyll output.

## PDF consistency update — 2026-10-05

PDF SHA256: `edc86dc82bc22b93debbe00708cd14003aa8ae47247c453723a1901aa4a70fac`.
Public PDF: https://astro2627.sites.tjhsst.edu/ss/kepler1/ss_kepler1.pdf

Ten letter-size pages, all 11 problems and three diagrams. All ten rendered pages were visually inspected; text extraction confirms the intentionally visible discussion. The existing validated student source excludes the other 11 solution cells. No nbgrader rerun was needed.

A private print-staging copy converts four legacy `\pmatrix{...}` wrappers, accepted by MathJax but rejected by amsmath, to equivalent `\begin{pmatrix}...\end{pmatrix}` environments. Entries and surrounding text are unchanged. The original QMD and HTML stay byte-identical.

Rebuild: copy the current kepler1.qmd and Images directory into private staging, perform the four balanced-brace matrix-wrapper replacements, then run `quarto render kepler1.qmd --to pdf -M latex-auto-install:false` with TEXMFVAR and TEXMFCACHE set to writable absolute paths. Install the resulting ss_kepler1.pdf here. Quarto 1.9.37, LuaHBTeX 1.24.0 / TeX Live 2026. Private print input, logs, rendered pages and verification evidence: `aa_class/instructor_reviews/ss_kepler1/2026-10-05-pdf-consistency/`.
