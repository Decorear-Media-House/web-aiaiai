"""
export-wp.py — Export local WP meta → JSON file (committed to git)
Run this after editing content in local WordPress.

Usage:  python export-wp.py
"""
import json
import urllib.request
import sys

LOCAL_WP = "http://localhost:8080"
OUT = "wordpress/wp-meta-sync.json"
SLUGS = ["home", "about", "services", "partner", "humanoid", "security"]

print(f"Exporting WP meta from {LOCAL_WP}...")

result = {}
for slug in SLUGS:
    url = f"{LOCAL_WP}/wp-json/wp/v2/pages?slug={slug}&_fields=id,slug,meta"
    try:
        data = json.loads(urllib.request.urlopen(url, timeout=10).read())
        if not data:
            print(f"  [!] {slug}: not found")
            continue
        meta = data[0].get("meta", {})
        filtered = {}
        for k, v in meta.items():
            if k.startswith("page_") or k.startswith("rank_math") or k.startswith("_"):
                continue
            if v == "" or v is None or v == []:
                continue
            if isinstance(v, list) and all(
                isinstance(i, dict) and all(val == "" for val in i.values())
                for i in v
            ):
                continue
            filtered[k] = v
        if filtered:
            result[slug] = filtered
            print(f"  OK  {slug}: {len(filtered)} fields")
        else:
            print(f"  --  {slug}: no data")
    except Exception as e:
        print(f"  ERR {slug}: {e}")

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"\nSaved to {OUT}")
print("Now run: git add wordpress/wp-meta-sync.json && git push")
