#!/bin/bash
# Refresh wordpress/wp-meta-sync.json from production.
# Fresh installs read this file to prefill JetEngine fields in WP admin,
# so run this whenever production content has changed and should become
# the new default for future bootstraps.
#
# Usage:
#   bash wordpress/export-meta-sync.sh
#   PROD_URL=https://cms.otherdomain.com bash wordpress/export-meta-sync.sh

set -euo pipefail

PROD_URL="${PROD_URL:-https://aiaiai-cms.decorear.com}"
AUTH="${WP_AUTH:-}"   # optional: "user:app_password" for authenticated REST
OUT="$(dirname "$0")/wp-meta-sync.json"
TMP="${OUT}.tmp"

command -v python3 >/dev/null 2>&1 || {
  echo "python3 is required for JSON processing" >&2
  exit 1
}

echo "Fetching JetEngine meta from $PROD_URL …"
[ -n "$AUTH" ] && echo "(using WP_AUTH credentials)"

# Write to a tmp file first — only replace wp-meta-sync.json if we got real
# data. Production often returns 403 on unauthenticated meta reads; silently
# overwriting would wipe the committed export.
python3 - "$PROD_URL" "$TMP" "$AUTH" <<'PY'
import sys, json, base64, urllib.request, urllib.error

prod, out, auth = sys.argv[1], sys.argv[2], sys.argv[3]
prefixes = {
    "home": "home_", "about": "about_", "services": "services_",
    "partner": "ptr_", "humanoid": "hum_", "security": "sec_",
}
req_headers = {}
if auth:
    req_headers["Authorization"] = "Basic " + base64.b64encode(auth.encode()).decode()

result, failed = {}, 0
for slug, pfx in prefixes.items():
    url = f"{prod}/wp-json/wp/v2/pages?slug={slug}&_fields=meta"
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, timeout=15) as r:
            pages = json.load(r)
    except urllib.error.URLError as e:
        print(f"  ✗ {slug}: {e}", file=sys.stderr)
        failed += 1
        continue
    if not pages:
        print(f"  ⚠ {slug}: not found on {prod}", file=sys.stderr)
        failed += 1
        continue
    meta = pages[0].get("meta", {}) or {}
    kept = {k: v for k, v in meta.items()
            if k.startswith(pfx) and v not in ("", None, [], {})}
    result[slug] = kept
    print(f"  ✓ {slug}: {len(kept)} keys")

if failed == len(prefixes):
    print("\nAll pages failed — leaving existing wp-meta-sync.json untouched.", file=sys.stderr)
    print("Hint: set WP_AUTH=\"user:app_password\" if the REST API requires auth.", file=sys.stderr)
    sys.exit(2)

with open(out, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

total = sum(len(v) for v in result.values())
print(f"\nWrote {out}: {total} keys across {len(result)} pages")
PY

# Promote tmp → real only if python wrote it successfully.
if [ -s "$TMP" ]; then
  mv "$TMP" "$OUT"
else
  rm -f "$TMP"
  exit 2
fi

echo ""
echo "Review and commit if correct:"
echo "  git diff wordpress/wp-meta-sync.json"
echo "  git add wordpress/wp-meta-sync.json && git commit -m 'sync JetEngine meta from production'"
