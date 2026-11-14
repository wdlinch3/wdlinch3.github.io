# Astro Lab mirror

`astro/` is generated publication output from approved public Git revisions.
Edit the lab source or the original teaching source, never these copied files.
The local checkout and the GitHub branch preserve this snapshot. Publishing
requires the ordinary reviewed GitHub Pages workflow; a branch push is not a
live mirror.

`astro/MIRROR_MANIFEST.json` records source commits, source and exported file
hashes, the limited course-link mappings, and remaining external dependencies.
It includes the 18 lab pages, their referenced research artifacts and assets,
and eight school-hosted minicourse readings with PDFs and support files. It
does not include instructor sources, untracked files, student submissions,
Schoology contents, or the contents of linked external services. The lab
source is `astro_site`; the school teaching deployment is `astro2627`, whose
`SOURCE_COMMIT` identifies its personal-site content source.

## Refresh

Use the lab repository's `scripts/export_public.py` (branch
`codex/lab-preservation` until merged). Choose reviewed exact revisions. Export
to a new empty staging directory; compare the manifest and generated diff
before replacing the previous generated `astro/` directory. Preserve the old
directory until the new output passes checks. Example for this snapshot:

```sh
python3 /absolute/path/to/astro_site/scripts/export_public.py \
  --ref 399c8fa \
  --school-source /absolute/path/to/astro2627 \
  --school-ref 58bc332 \
  --personal-course-base https://wdlinch3.github.io/aa/ \
  --output /absolute/path/to/empty_staging_directory
```

After installing the generated directory in this checkout:

```sh
bundle exec jekyll build
python3 scripts/check_lab_mirror.py
git diff --check
```

The check verifies all exported bytes survive Jekyll unchanged and that mirror
links into this personal site, including the elective class, resolve. Review
the final HTML over HTTP at 1280, 768, 390, and 320 CSS pixels; test with school
hosts blocked. Never commit `_site/`.

## Boundaries

The copy keeps the existing lab design and credits. PDFs retain their original
bytes and authorship. The public minicourses are the existing published
student editions, not the newer private, unreviewed source reorganization.
External institutional, club, tjSTAR, Schoology, and journal-club links remain
external. Math rendering still uses the original external CDN dependencies;
this is a school-independent publication copy, not a fully offline edition.

The root and current elective-class school navigation map to existing personal
course pages. These are dependencies on this Jekyll deployment, not additional
files in the lab export. The shared lab-link include exposes the mirror on
Home, Teaching, and AA@TJ from the single `lab_mirror` configuration value.

## Integration validation — 2026-11-14

Jekyll build and mirror inventory/hash/link checks passed. HTTP browser checks
covered Home, Teaching, AA@TJ, lab Home, Research, Research Class, Minicourses,
and the Groups reading at actual 1280, 768, 390, and 320 CSS pixels. No
page-level horizontal overflow appeared. With school hosts blocked, the lab
pages loaded, the elective link reached the personal course route, and all 16
catalog reading/PDF links returned HTTP 200. An independent source comparison
confirmed every original blob hash and unchanged binary artifact bytes.

Inherited review item: the published Groups reading has three `h1` headings
(title plus two chapters), reproduced unchanged here. The ordinary lab and
personal pages tested each have one. Repair this through its owning course
source in a separate content/presentation release; do not patch the mirror.
This snapshot has not been merged or anonymously verified on GitHub Pages.
