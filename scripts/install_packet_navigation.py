"""Install shared navigation after rendering packet HTML; preserve all existing bytes.

Use the current course manifest as the route inventory. This presentation-only
post-render step also supports legacy editions whose original render sources
are unavailable. It never changes instructional bodies or embedded scripts.
"""
from pathlib import Path
import yaml
root = Path(__file__).resolve().parents[1]
marker = '<!-- shared-packet-navigation -->'
block = marker + '\n<link rel="stylesheet" href="/assets/css/aa_packet_navigation.css">\n<script defer src="/assets/js/aa_packet_navigation.js"></script>\n'
course = yaml.safe_load((root / '_data/aa_courses.yml').read_text())['ss']['current']
for lesson in course['lessons']:
    for packet in lesson.get('parts', [lesson]):
        path = root / packet['url'].strip('/') / 'index.html'
        original = path.read_text()
        if marker not in original:
            assert original.count('</head>') == 1, path
            path.write_text(original.replace('</head>', block + '</head>', 1))
        print(path.relative_to(root))
