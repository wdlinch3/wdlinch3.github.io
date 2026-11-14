#!/usr/bin/env python3
"""Check the exported lab mirror, including its final Jekyll output."""
import hashlib
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://wdlinch3.github.io/"


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for name in ("href", "src", "poster"):
            if attrs.get(name):
                self.urls.append(attrs[name])


def main():
    manifest = json.loads((ROOT / "astro/MIRROR_MANIFEST.json").read_text())
    built = ROOT / "_site"
    errors = []
    parsed = {}
    expected = set(manifest["files"]) | {"MIRROR_MANIFEST.json"}
    for tree in (ROOT, built):
        actual = {str(p.relative_to(tree / "astro"))
                  for p in (tree / "astro").rglob("*") if p.is_file()}
        if actual != expected:
            errors.append(f"{tree}: mirror inventory differs; "
                          f"extra={sorted(actual - expected)}, "
                          f"missing={sorted(expected - actual)}")
    for name, record in manifest["files"].items():
        path = Path(name)
        if path.is_absolute() or ".." in path.parts:
            raise ValueError(f"Unsafe manifest path: {name}")
        for tree in (ROOT, built):
            target = tree / "astro" / path
            if not target.is_file():
                errors.append(f"Missing: {target}")
            elif hashlib.sha256(target.read_bytes()).hexdigest() != record["sha256"]:
                errors.append(f"Changed exported bytes: {target}")
        if path.suffix == ".html" and (built / "astro" / path).is_file():
            parser = References()
            parser.feed((built / "astro" / path).read_text())
            parsed["astro/" + name] = parser
    for name, parser in parsed.items():
        for reference in parser.urls:
            url = urlsplit(urljoin(BASE + name, reference))
            if url.hostname != "wdlinch3.github.io":
                continue
            path = unquote(url.path).lstrip("/")
            if not path or path.endswith("/"):
                path += "index.html"
            target = (built / path).resolve()
            if not target.is_relative_to(built.resolve()) or not target.is_file():
                errors.append(f"{name}: missing personal-site target {reference}")
                continue
            if url.fragment and target.suffix == ".html":
                other = parsed.get(path)
                if other is None:
                    other = References()
                    other.feed(target.read_text())
                if unquote(url.fragment) not in other.ids:
                    errors.append(f"{name}: missing fragment {reference}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Lab mirror passed: {len(manifest['files'])} byte-verified files, "
          f"{len(parsed)} HTML pages, and all personal-site targets/fragments.")


if __name__ == "__main__":
    main()
