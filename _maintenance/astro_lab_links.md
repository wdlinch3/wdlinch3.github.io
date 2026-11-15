# Lab resource links

The personal site's Home, Teaching, and AA@TJ pages consume
`_data/astro_lab.json` through `_includes/astro_lab_links.html`.
The catalog is generated from the lab's `data/site.json`; do not edit it by hand.
It includes primary lab navigation and the current research-class route.

From this repository, refresh and validate against the intended lab checkout:

```sh
python3 scripts/sync_astro_lab.py --source /path/to/astro_site
python3 scripts/sync_astro_lab.py --source /path/to/astro_site --check
bundle exec jekyll build
```

The source-manifest hash identifies which catalog was imported. The script
checks that the referenced pages exist in that checkout; it does not prove
that they have been deployed. Verify new routes anonymously before publication.
This catalog links to the school site; independent mirror delivery is separate.

## November 14, 2026 validation

Jekyll build and catalog consistency check passed. HTTP preview of Home,
Teaching, and AA@TJ confirmed one h1 and no page-level horizontal overflow at
actual inner widths 1280, 768, 390, and 320 pixels. Teaching resource-card
screenshots were reviewed at all four widths. Existing styling and course
materials were retained.
