# Kepler I student release

School class: https://astro2627.sites.tjhsst.edu/ss/2026-2027/
School reading: https://astro2627.sites.tjhsst.edu/ss/kepler1/
School ZIP: https://astro2627.sites.tjhsst.edu/assignments/ss_kepler1.zip
Website-source route: `/aa/ss/kepler1/`. Director removes the `/aa/` prefix.

- Instructor snapshot: `../aa_class/instructor_reviews/ss_kepler1/2026-09-24/ss_kepler1.before.ipynb`; SHA256 `3135da09c6de8a7fe822609e789817c58e5117bd8d10c08648fed6f9ef459114`
- Repaired instructor notebook: `../aa_class/aa_ss/source/ss_kepler1/ss_kepler1.ipynb`; SHA256 `87363b5a27045475c315619a99e079f5a4ed1a6e19e7722408112fb79346d925`
- Student release: `../aa_class/aa_ss/release/ss_kepler1/ss_kepler1.ipynb`; SHA256 `5c6748b15dc5425973f66cefab85e87c897632a9f8f73271d0bfc40b88b0c478`
- Web source: `aa/ss/kepler1/kepler1.qmd`; SHA256 `dfcf389b5dbd3ab5de9c460766a160fbc2b66e793e3e0296390d8f35bce20d48`
- Rendered HTML: `aa/ss/kepler1/index.html`; SHA256 `039d3bce954ffaf22eccf5adde8dc6aee7c55ca9704fac7349a8b5e6b299c6a9`
- Assignment ZIP: `aa/assignments/ss_kepler1.zip`; SHA256 `1112a53e656b4eae659d6cb6bf9e4137adb86e096bac4f0d567669b93286f95a`

Instructor cell text preserved exactly. Two answer cells (indices 3 and 5) were changed from task metadata to manually graded answer metadata, preserving their IDs and zero points. Other point values remain unchanged. All 11 answers are suppressed by nbgrader; all 12 context/problem cells match the source. All image references belong to instructor answers, so the student notebook has no image dependencies.

The reading includes the student non-answer Markdown cells, removes only the duplicate title, normalizes display-equation delimiters onto separate lines and trims trailing Markdown spaces. It uses the shared packet theme. The ZIP contains only `ss_kepler1/ss_kepler1.ipynb`. No PDFs were requested or published.

## Rebuild

The private run record and isolated nbgrader staging configuration are in `aa_class/instructor_reviews/ss_kepler1/2026-09-24/` in the parent repository. From that staging directory:

```sh
nbgrader generate_assignment ss_kepler1 --notebook ss_kepler1 --force --no-db
```

From the website source root:

```sh
quarto render aa/ss/kepler1/kepler1.qmd --to html
bundle exec jekyll build
```

Rendered with Quarto 1.9.37 as self-contained HTML. Jekyll excludes the QMD and this source record. All 11 problems and four footnotes are retained. The ZIP was extracted and compared byte-for-byte with the canonical release. The existing public-release checker passed with errors=0 and reviews=0.

Author-review note: wording before Problem 10 conflates the ellipse parameter angle and geometric polar angle; preserved for separate instructor review.

Quarto vendor JavaScript is retained byte-for-byte. A file-specific Git whitespace attribute permits its upstream trailing spaces; no generated JavaScript is post-processed.
