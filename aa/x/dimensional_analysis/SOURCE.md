# Dimensional Analysis student edition

Public route: `/aa/x/dimensional_analysis/`.
Card authority: `_data/aa_courses.yml`; uses the existing lesson-card template.

## Sources

- Instructor authority: `aa_class/aa_x/source/x_dimensional_analysis/x_dimensional_analysis.ipynb` (in the parent source repository).
- Source SHA-256: `52f60a8887dbe99f74a9bd3f2b8ac7644c705c15de8cd5492d34ae007ac071c3`
- Nbgrader student release SHA-256: `186cbf1afbf2a3b7aabd5c6d95c162c71a3069e39d393fb11f2a62681a11e082`
- Web source: `dimensional_analysis.qmd`, SHA-256 `e8a12eb57c87c6ed931fb1a5b51f4a0e8578cf756516c532a30ea1bbc5f7623a`
- HTML SHA-256: `f67a95872edc0dc0ca8ce6edf8fcda35f4fa4256c6dbfeabf76878aef5548c22`
- ZIP SHA-256: `f35e8ef1b8b398187f0e24e7e1be7d87b9aa40ba493ab1b8272b4ee63f41d583`

The online reading derives from the current nbgrader student notebook's non-answer Markdown cells. It retains the nine problems and explanatory text, omits answer placeholders and code-entry cells, removes the duplicate title, and normalizes display-equation spacing. It uses the shared `assets/css/aa_packet_theme.css`. The older instructor QMD is not a student-publication source. The instructor notebook is unchanged.

The ZIP contains only `x_dimensional_analysis/x_dimensional_analysis.ipynb`, byte-identical to the generated student notebook; this unit has no local image dependencies. All nine Markdown answers and three code solutions were replaced by nbgrader placeholders; outputs are empty. No legacy PDF, HTML, DOCX, or checkpoints are distributed.

## Rebuild

From `aa_class/aa_x`:

```sh
nbgrader generate_assignment x_dimensional_analysis --notebook x_dimensional_analysis --force --CourseDirectory.course_id=aa_x --CourseDirectory.source_directory=source --CourseDirectory.release_directory=release --CourseDirectory.ignore='[".ipynb_checkpoints","*.pyc","__pycache__","feedback",".DS_Store","*.qmd","_quarto.yml","rendered"]'
```

Update the reading from non-answer Markdown cells of the regenerated student notebook, preserve shared-theme metadata and navigation, and ZIP only the student notebook. From the website root:

```sh
quarto render aa/x/dimensional_analysis/dimensional_analysis.qmd --to html
bundle exec jekyll build
```

Quarto 1.9.37 embeds required assets. No separate support folder or PDF is published. Quarto reports an unused footnote 1, whose reference belongs to an omitted instructor answer; it is not displayed.

## Review note

The source note after Problem 6 calls `sqrt(m/(k*tau))` dimensionless; dimensional consistency requires `sqrt(m/(k*tau^2))`. This source wording is preserved pending instructor direction.

Validation: nbformat validation and the existing release checker passed for all 22 cells; ZIP integrity and byte identity passed; Jekyll build passed. Chromium checks at 1440px and 390px verified the card-to-reading interaction, ZIP HTTP 200, nine problem headings, no math errors, no page overflow, and no runtime errors.
