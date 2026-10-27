# Solar System I student release — 2026-10-27

Authority: `aa_class/aa_ss/source/ss_solar_system_1/ss_solar_system_1.ipynb`.
Source SHA256: `c2e087791ec5fb9c7520f86b1b87568c97867235553c2f23724ce0c406c5b48e`.
Student SHA256: `6adb6c3593a6af8f6f648698f311ce2037ee643b05d254ee8c0b9abaf85e01ee`.
Assignment ZIP SHA256: `55ca814a4c2c938e226831def2d7134b3d65153185878c14f07faf48dcf5009a`.

Publication authorized 2026-10-27. This replaces the previous nine-problem edition, including its deferred asteroid-distribution Problem 9. The current packet has ten problems: Problem 9 treats Pluto's ellipse and Problem 10 teaches reusable Python comparisons. The optional parts remain marked optional.

Real nbgrader generation suppressed 16 answer cells and cleared all outputs. All non-answer cells, including editable pass scaffolds and the starter loop, are preserved verbatim in the student notebook. Dependencies: the two PNG files under images/. The ZIP contains only the notebook and those two images, within one ss_solar_system_1 directory. No instructor keys, private notes, experiments, or executed outputs are shipped.

The reading is derived from that validated student notebook, omitting solution placeholders and fencing instructional code as Python. The shared theme, navigation, and responsive table wrappers are retained. No student PDF is linked on the existing card or included in this release.

Rebuild:
```sh
cd /Users/wdlinch3/Documents/github/aa_class/aa_ss/source/ss_solar_system_1/workflow_runs/2026-10-27_release/build/staging
nbgrader generate_assignment ss_solar_system_1 --notebook ss_solar_system_1 --force --no-db
python /Users/wdlinch3/Documents/github/aa_class/aa_ss/source/ss_solar_system_1/workflow_runs/2026-10-27_release/build/prepare_release.py
cd /Users/wdlinch3/Documents/github/worktrees/website/solar-system-1-20261027
quarto render aa/ss/solar_system_1/solar_system_1.qmd --to html
bundle exec jekyll build
```

The preparation script archives previous release directories and is intended for this recorded run, not blind repeat execution. Use fresh staging/snapshot locations for later releases.

Website reading: `/aa/ss/solar_system_1/`.
School reading: `https://astro2627.sites.tjhsst.edu/ss/solar_system_1/`.
School assignment: `https://astro2627.sites.tjhsst.edu/assignments/ss_solar_system_1.zip`.
Class: `https://astro2627.sites.tjhsst.edu/ss/2026-2027/`.
Deployment and live verification are recorded separately in the private release record.

The original asteroid PNG is preserved in the instructor source. The release uses a 2100 × 3057 LANCZOS-resampled PNG derived from the 10500 × 15285 original to keep student downloads practical. The other PNG is unchanged. Repeat this publication-size conversion after staging generation and before ZIP packaging.
