#!/usr/bin/env python3
"""Build vr-entry/index.html from index.template.html.

Injects the real ../sample-log.json into the __SAMPLE_LOG_JSON__ placeholder so
the page is self-contained (works from file:// as well as over HTTP, and on a
phone with no extra fetches). No network. Re-run after any sample-log change.
Usage: python3 build.py
"""
import json
from pathlib import Path

here = Path(__file__).parent
template = (here / "index.template.html").read_text(encoding="utf-8")
sample = json.loads((here.parent / "sample-log.json").read_text(encoding="utf-8"))
assert "__SAMPLE_LOG_JSON__" in template, "placeholder missing from template"
html = template.replace("__SAMPLE_LOG_JSON__", json.dumps(sample))
assert "__SAMPLE_LOG_JSON__" not in html, "placeholder not fully replaced"
(here / "index.html").write_text(html, encoding="utf-8")
print(f"wrote index.html ({len(html)} bytes, {len(sample)} sample events embedded)")
