# Solar System I preparation provenance

Authority: `/Users/wdlinch3/Documents/github/aa_class/aa_ss/source/ss_solar_system_1/ss_solar_system_1.ipynb`.
Source SHA256: `fd00c9e7dbafa47173c4dcfd82623cdfb0f3de2344a4bdd51ec7e45e483f5bb3`.
Canonical student release: `/Users/wdlinch3/Documents/github/aa_class/aa_ss/release/ss_solar_system_1`.
Student SHA256: `346e8715565215129c9af05dd3152a3a4f7d0e7ccc992041a56492603740b905`.
ZIP SHA256: `77fbc5b3ea397a8d9dfcfa25202ae50fc184652ae391efc6da0d4844319a6ff6`.

Real nbgrader generation suppressed 15 answer cells, including the previously unmarked Problem 9 discussion and private HTML-comment notes. 11 context cells are unchanged in the student notebook. Nine problems retained. No outputs or instructor code remain. ZIP allowlist: only `ss_solar_system_1/ss_solar_system_1.ipynb`; no local dependencies. Older Markdown exports are stale and excluded.

Reading: `solar_system_1.qmd`, derived from the validated student notebook, omitting solution placeholders and duplicate title; shared dark packet theme, self-contained HTML. No student PDF requested or existing card PDF to regenerate.

Rebuild:
```sh
cd /Users/wdlinch3/Documents/github/aa_class/aa_ss/source/ss_solar_system_1/workflow_runs/2026-10-22_release/build/staging
/Users/wdlinch3/Documents/github/aa_class/.venv/bin/nbgrader generate_assignment ss_solar_system_1 --notebook ss_solar_system_1 --force --no-db
cd /Users/wdlinch3/Documents/github/worktrees/website/solar-system-1-prep
quarto render aa/ss/solar_system_1/solar_system_1.qmd --to html
bundle exec jekyll build
```

Website routes: `/aa/ss/solar_system_1/`, `/aa/assignments/ss_solar_system_1.zip`.
School routes: `https://astro2627.sites.tjhsst.edu/ss/solar_system_1/`, `https://astro2627.sites.tjhsst.edu/assignments/ss_solar_system_1.zip`.
Class: `https://astro2627.sites.tjhsst.edu/ss/2026-2027/`.

LOCAL PREPARATION ONLY. No push, publication, server update, or live verification is authorized for this run. Problem 9 science and its discussion are deliberately preserved pending separate review; the candidate must be regenerated after that review. Formatting-only changes were made there. Private run record: `/Users/wdlinch3/Documents/github/aa_class/aa_ss/source/ss_solar_system_1/workflow_runs/2026-10-22_release/record.md`.

The reading wraps the wide planetary table in Bootstrap’s existing `table-responsive` container for horizontal scrolling on mobile; table wording and values are unchanged.
