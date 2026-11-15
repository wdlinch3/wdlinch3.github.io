#!/usr/bin/env python3
"""Import public lab navigation from its source manifest; never crawl private files.

Run: python3 scripts/sync_astro_lab.py --source ../astro_site [--check]
The output is catalog metadata only, not a mirror or a backup of the lab.
"""
import argparse
import hashlib
import json
from pathlib import Path
from urllib.parse import urljoin

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://activities.tjhsst.edu/astro/'


def catalog(source):
    raw = (source / 'data/site.json').read_bytes()
    data = json.loads(raw)
    labels = {'home': 'Astro Lab', 'research': 'Research archive',
              'about': 'How the lab works', 'minicourses': 'Lab minicourse catalog',
              'contact': 'Contact the lab'}
    links = []
    for item in data['site']['primary_nav']:
        path = item['path']
        if path.startswith('/') or '..' in Path(path).parts or '://' in path:
            raise ValueError(f'Expected a lab-relative path: {path}')
        if not (source / path).is_file():
            raise ValueError(f'Missing lab page: {path}')
        links.append({'id': item['key'], 'title': labels.get(item['key'], item['label']),
                      'url': urljoin(BASE, path), 'compact': item['key'] in ('home', 'research', 'minicourses')})
    course = data['astronomy_research_class']
    if not (source / course['path']).is_file():
        raise ValueError('Missing research class page')
    links.insert(1, {'id': 'research_class', 'title': f"Astronomy Research {course['short_year']}",
                     'url': urljoin(BASE, course['path']), 'compact': True})
    return {'source': BASE, 'source_manifest': 'astro_site/data/site.json',
            'source_sha256': hashlib.sha256(raw).hexdigest(), 'links': links}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    output = ROOT / '_data/astro_lab.json'
    rendered = json.dumps(catalog(args.source), indent=2, ensure_ascii=False) + '\n'
    if args.check:
        if not output.exists() or output.read_text() != rendered:
            raise SystemExit('Lab catalog is stale; rerun without --check.')
        print('Lab catalog matches source manifest.')
    else:
        output.write_text(rendered)
        print(f'Updated {output}')


if __name__ == '__main__':
    main()
