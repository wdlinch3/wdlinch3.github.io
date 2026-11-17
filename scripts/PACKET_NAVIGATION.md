# Packet navigation

After rendering a current course packet, run `python3 scripts/install_packet_navigation.py` before the Jekyll build. The course manifest supplies all routes. The installer adds shared CSS and JavaScript links, is idempotent, and preserves the rest of every HTML file byte-for-byte, including embedded vendor scripts.

The shared script builds an expanded menu from named headings through level 3, excluding problem and answer scaffolding, and tracks the current section. The legacy Aristarchus web edition has no section headings; its existing topic transitions provide navigation targets without changes to instructional prose. Shared CSS restores sticky positioning without an overflow scroll container. Small screens retain the normal Quarto responsive layout.

This presentation step is intentionally separate from notebook generation: instructor notebooks and student ZIP files are untouched. Four legacy web editions lack their full original render inputs at the recorded paths; no content regeneration is attempted for them.
