# Astrodynamics I student release

Authoritative instructor notebook: aa_class/aa_x/source/x_astrodynamics_1/x_astrodynamics_1.ipynb (umbrella workspace).
Instructor SHA256: `e347ad97660ef85a2e2a8cf8ecfd912142de19bca5071fdf8ea3c49d1f21b1f6`. Source was not modified or executed.
Private snapshot, staging config, generation script and validation record:
`aa_class/instructor_reviews/x_astrodynamics_1/2026-10-01-release/`.
Canonical student notebook: aa_class/aa_x/release/x_astrodynamics_1/x_astrodynamics_1.ipynb.
Student SHA256: `a2bb46fc1f75b5153034d8107bf6cbc4ba7d0f3475b71d46492eb1bba3a2ab3d`.
ZIP SHA256: `d7a722427c316b214e29283f6ff922e52414f4525cfa09529fd9422b7e9e2d2d`.

School class: https://astro2627.sites.tjhsst.edu/ss/2026-2027/
School reading: https://astro2627.sites.tjhsst.edu/x/astrodynamics_1/
School download: https://astro2627.sites.tjhsst.edu/assignments/x_astrodynamics_1.zip
Website routes prefix those school paths with /aa.

All 20 manually graded answers are suppressed by real nbgrader generation.
All 12 context/problem cells are unchanged; 11 problems retain their order.
ZIP contains only the student notebook and Images/ucm1a.png, Images/ucm2a.png.
No keys, instructor outputs, hidden tests, or assertion bodies are published.
The student notebook expects the course's existing aa_tools installation when
students choose to use the module suggested in Problem 5; it is not bundled.

The online reading derives from student context cells, omits answer placeholders,
removes only the duplicate title, normalizes display spacing and replaces HTML
anchor wrappers around equations with empty anchors at the same destinations.
It also separates nested hint blocks and renders the existing manual footnote marker as 1 instead of literal [^1]. It preserves prose, equations, image paths and problem order. Shared dark packet
theme and self-contained Quarto HTML match the Kepler I release. No PDF requested.

Rebuild in the recorded isolated staging directory:
`nbgrader generate_assignment x_astrodynamics_1 --notebook x_astrodynamics_1 --force --no-db`
Then run the private prepare_release.py on fresh clean release worktrees (paths
are explicit in that script), which validates comparisons, ZIP and reading.
From this website root:
`quarto render aa/x/astrodynamics_1/astrodynamics_1.qmd --to html`
`bundle exec jekyll build`
Director uses scripts/build_from_source.py against this exact committed source.
Never edit the generated Director HTML directly.

Prior scientific/editorial review notes remain instructor-local. In particular,
finite versus instantaneous velocity, the velocity/acceleration direction sentence,
independent lunar-acceleration data and mass-measurement scope warrant later author
review. These are preserved rather than silently rewritten in this release.
