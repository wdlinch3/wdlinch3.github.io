# Repository Instructions for Codex

This repository is the source for https://wdlinch3.github.io/. Treat it as a
stable, manifest-driven Jekyll/GitHub Pages site.

## General workflow

- Keep changes narrowly scoped to the requested task.
- Inspect nearby files before introducing new structure.
- Prefer editing existing shared CSS/layout conventions over adding page-local styling.
- Do not introduce a new framework unless explicitly requested.
- Do not alter unrelated routes, navigation, or styling.
- Prefer shared `_data/` manifests over duplicated hand-maintained HTML lists.
- When a page, packet, minicourse, talk, research item, or utility link appears
  in multiple places, create or update a shared data source under `_data/`
  instead of editing each duplicate list manually.
- Do not allow parallel manually maintained lists to drift.

## Site architecture

- Preserve stable public URLs unless a compatibility or redirect plan is
  explicitly approved.
- Maintain three distinct user paths:
  - daily-use/student-course path;
  - public professional path;
  - expository intellectual path.
- Navigation, sitemap entries, packet lists, minicourse lists, research themes,
  talks/writings, and utility links should ideally be generated from shared
  `_data/` files.
- Recommended manifest files include:
  - `_data/site_nav.yml`
  - `_data/quick_links.yml`
  - `_data/aa_packets.yml`
  - `_data/minicourses.yml`
  - `_data/research.yml`
  - `_data/talks.yml`

## Site style

- Default to dark mode.
- Match the existing visual style of the site.
- Preserve MathJax-compatible mathematical notation.
- Use clean, readable HTML or Quarto source.
- Prefer Quarto `.qmd` for long-form mathematical, instructional, standards, or research pages when appropriate.
- Use plain HTML when nearby pages are plain HTML and consistency favors HTML.

## File naming

- Use semantic, readable file and folder names.
- Use underscores where the separator semantically represents a space.
- Use hyphens only when the underlying phrase itself is hyphenated, for example `a-theory`.
- Avoid ambiguous abbreviations unless already established in the repository.

## Generated files

- Do not edit or commit generated `_site/` output.
- Do not commit cache directories, temporary files, `.DS_Store`, or editor artifacts.
- Do not treat Quarto-generated `*_files/` folders as source.
- Do not deep-edit Quarto-generated `*_files/` folders unless they are required
  deployed support assets for standalone HTML pages.

## Links

- For institutions and organizations, prefer the corresponding Wikipedia page when a useful one exists.
- If no useful Wikipedia page exists, use the official homepage.
- Preserve existing internal-link conventions.
- Prefer relative links for internal site navigation.
- Do not rename public URLs casually. If a URL seems wrong, propose a
  compatibility strategy before changing it.

## Mathematics and documents

- Preserve LaTeX/MathJax notation carefully.
- Do not flatten mathematical structure unnecessarily.
- Keep section hierarchy clear.
- For converted PDFs or TeX documents, create a readable web page rather than only linking the PDF, unless explicitly instructed otherwise.
- If a PDF remains useful as the authoritative version, include a PDF link on the web page.
- For Quarto-derived source files, use `$...$` and `$$...$$` math delimiters in
  source text, not `\(...\)` or `\[...\]`.
- Before declaring Quarto-derived HTML ready, check for visible raw LaTeX
  preamble leakage, especially:
  - `\DeclareOldFontCommand`
  - `\newcommand`
  - `\usepackage`
  - `\def`

## Audit-first cleanup

- For large site-cleanup requests, audit first. Do not immediately rewrite pages.
- The first pass should identify source pages, internal links, broken links,
  orphan candidates, stale placeholders, duplicate/copy-named files, rendered
  artifacts without source provenance, unlinked assets, duplicated manual
  navigation lists, and pages that should become data-driven.
- After the audit, implement in small branches and narrow pull requests.

## Implementation sequence

Based on the latest site audit, prefer this sequence for future refactors:

1. Quick-links / daily-use links.
2. Packet manifest.
3. Minicourse render cleanup.
4. Data-driven navigation.
5. Research and talks/writings structure.
6. Stale artifact cleanup.

## Git workflow

- Use one branch per priority.
- Create a descriptive branch name.
- Check `git status` before and after changes.
- Review `git diff` before committing.
- Commit the completed change with a concise descriptive commit message.
- Push the branch and open a draft pull request when possible.
- Summarize changed files and any validation performed.

## Validation

- For Jekyll changes, run:

  ```bash
  bundle exec jekyll build
  ```

- For local preview, run:

  ```bash
  bundle exec jekyll serve --livereload
  ```

- Open:

  ```text
  http://127.0.0.1:4000/
  ```

- Do not rely on `file://` previews for Jekyll pages.
