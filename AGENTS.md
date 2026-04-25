# Repository Instructions for Codex

This repository is the source for https://wdlinch3.github.io/.

## General workflow

- Keep changes narrowly scoped to the requested task.
- Inspect nearby files before introducing new structure.
- Prefer editing existing shared CSS/layout conventions over adding page-local styling.
- Do not introduce a new framework unless explicitly requested.
- Do not alter unrelated routes, navigation, or styling.

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

- Do not commit generated `_site/` output unless the repository convention clearly requires it.
- Do not commit cache directories, temporary files, `.DS_Store`, or editor artifacts.

## Links

- For institutions and organizations, prefer the corresponding Wikipedia page when a useful one exists.
- If no useful Wikipedia page exists, use the official homepage.
- Preserve existing internal-link conventions.
- Prefer relative links for internal site navigation.

## Mathematics and documents

- Preserve LaTeX/MathJax notation carefully.
- Do not flatten mathematical structure unnecessarily.
- Keep section hierarchy clear.
- For converted PDFs or TeX documents, create a readable web page rather than only linking the PDF, unless explicitly instructed otherwise.
- If a PDF remains useful as the authoritative version, include a PDF link on the web page.

## Git workflow

- Create a descriptive branch name.
- Check `git status` before and after changes.
- Review `git diff` before committing.
- Commit the completed change with a concise descriptive commit message.
- Push the branch and open a draft pull request when possible.
- Summarize changed files and any validation performed.
