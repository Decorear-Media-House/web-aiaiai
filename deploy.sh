#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────
# AIAIAI Deploy Script
#
# Usage:
#   bash deploy.sh              # Quick: push code + build + deploy
#   bash deploy.sh --full       # Full: + images + WP content + JetEngine
#   bash deploy.sh --sync       # Sync: export local WP meta → git push
#
# Windows (PowerShell):
#   & "C:\Program Files\Git\bin\bash.exe" deploy.sh
#   & "C:\Program Files\Git\bin\bash.exe" deploy.sh --full
# ─────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WP_DIR="$SCRIPT_DIR/wordpress"
FE_DIR="$SCRIPT_DIR/Frontend"

# Source per-environment deploy targets. Copy .env.deploy.example to
# .env.deploy and edit before first run. .env.deploy is gitignored
# (covered by the .env.* rule).
if [ -f "$SCRIPT_DIR/.env.deploy" ]; then
  set -a; source "$SCRIPT_DIR/.env.deploy"; set +a
else
  cat >&2 <<EOF
[deploy.sh] Missing .env.deploy.

  cp .env.deploy.example .env.deploy
  # then edit .env.deploy with your SSH host aliases + production URLs

EOF
  exit 1
fi

: "${CMS_HOST:?Set CMS_HOST in .env.deploy (SSH host alias for the WordPress server)}"
: "${CMS_ROOT:?Set CMS_ROOT in .env.deploy (path to WP install on CMS_HOST)}"
: "${DEPLOY_HOST:?Set DEPLOY_HOST in .env.deploy (SSH host alias for the static frontend host)}"
: "${DEPLOY_ROOT:?Set DEPLOY_ROOT in .env.deploy (path to web root on DEPLOY_HOST)}"
: "${PROD_WP_URL:?Set PROD_WP_URL in .env.deploy (public CMS URL, e.g. https://cms.example.com)}"
: "${PROD_API_URL:=${PROD_WP_URL%/}/wp-json}"
: "${PROD_SITE_URL:=$PROD_WP_URL}"

MODE="${1:-quick}"

# ── --sync: Export local WP meta → commit → push ──
if [ "$MODE" = "--sync" ]; then
  echo "=== Sync: Export local WP meta → git push ==="
  echo ""
  echo "→ Exporting WP meta..."
  cd "$SCRIPT_DIR"
  python3 export-wp.py || python export-wp.py
  echo ""
  echo "→ Committing & pushing..."
  git add wordpress/wp-meta-sync.json
  git commit -m "sync: update WP meta" 2>/dev/null || echo "  (nothing to commit)"
  git push origin main
  echo ""
  echo "✓ Done! Server will pick up changes on next rebuild."
  echo "  To rebuild now: go to WP Admin → click Deploy Site"
  exit 0
fi

echo "=== AIAIAI Deploy $([ "$MODE" = "--full" ] && echo "(Full)" || echo "(Quick)") ==="

# ── Step 1: Push code ──
echo ""
echo "→ [1] Pushing code to GitHub..."
cd "$SCRIPT_DIR"
git add -A && git commit -m "deploy" 2>/dev/null || echo "  (nothing to commit)"
git push origin main 2>/dev/null || echo "  (already up to date)"

# ── Step 2: Update mu-plugins ──
echo ""
echo "→ [2] Updating mu-plugins on CMS..."
scp -q "$WP_DIR"/mu-plugins/*.php "$CMS_HOST:$CMS_ROOT/wp-content/mu-plugins/"
echo "  ✓ mu-plugins updated"

# ── Full mode: images + content + JetEngine ──
if [ "$MODE" = "--full" ]; then

  # Step 3: Upload images
  echo ""
  echo "→ [3] Uploading images to CMS..."
  ssh "$CMS_HOST" "mkdir -p /tmp/aiaiai-images"
  scp -q -r "$FE_DIR"/public/images/* "$CMS_HOST:/tmp/aiaiai-images/"
  scp -q "$WP_DIR/upload-images.php" "$CMS_HOST:/tmp/upload-images.php"
  ssh "$CMS_HOST" "cd $CMS_ROOT && wp --allow-root eval-file /tmp/upload-images.php" || echo "  ⚠ Image import had warnings"
  echo "  ✓ Images imported"

  # Step 4: Export local WP data
  echo ""
  echo "→ [4] Exporting local WP data..."
  if docker ps --filter name=aiaiai-wordpress --format '{{.Names}}' 2>/dev/null | grep -q aiaiai-wordpress; then
    docker cp "$WP_DIR/export-data.php" aiaiai-wordpress:/tmp/export-data.php
    docker exec aiaiai-wordpress bash -c "cd /var/www/html && php -r \"require '/var/www/html/wp-load.php'; require '/tmp/export-data.php';\"" || \
      echo "  ⚠ Docker export failed, using existing export-data.json"
    docker cp aiaiai-wordpress:/tmp/export-data.json "$WP_DIR/export-data.json" 2>/dev/null || true
  fi
  [ -f "$WP_DIR/export-data.json" ] || { echo "  ✗ No export-data.json!"; exit 1; }
  echo "  ✓ export-data.json ready"

  # Step 5: Import content
  echo ""
  echo "→ [5] Importing content to production WP..."
  scp -q "$WP_DIR/export-data.json" "$CMS_HOST:/tmp/export-data.json"
  scp -q "$WP_DIR/import-data.php" "$CMS_HOST:/tmp/import-data.php"
  ssh "$CMS_HOST" "mkdir -p /tmp/import-data-dir && \
    cp /tmp/export-data.json /tmp/import-data-dir/export-data.json && \
    cp /tmp/import-data.php /tmp/import-data-dir/import-data.php && \
    cd $CMS_ROOT && wp --allow-root eval-file /tmp/import-data-dir/import-data.php"
  echo "  ✓ Content imported"

  # Step 6: Seed JetEngine
  echo ""
  echo "→ [6] Seeding JetEngine meta boxes..."
  scp -q "$WP_DIR/seed-all-jetengine.php" "$CMS_HOST:/tmp/seed-all-jetengine.php"
  ssh "$CMS_HOST" "cd $CMS_ROOT && wp --allow-root eval-file /tmp/seed-all-jetengine.php" || echo "  ⚠ JetEngine seed had warnings"
  echo "  ✓ JetEngine meta boxes created"

  # Step 7: Fix URLs
  echo ""
  echo "→ [7] Fixing URLs (localhost → production)..."
  scp -q "$WP_DIR/fix-urls.php" "$CMS_HOST:/tmp/fix-urls.php"
  ssh "$CMS_HOST" "cd $CMS_ROOT && wp --allow-root eval-file /tmp/fix-urls.php"
  echo "  ✓ URLs fixed"
fi

# ── Build & deploy static site ──
STEP=$([ "$MODE" = "--full" ] && echo "8" || echo "3")
echo ""
echo "→ [$STEP] Building static site..."
cd "$FE_DIR"
rm -rf .next out
NEXT_OUTPUT=export \
WORDPRESS_API_URL="$PROD_API_URL" \
NEXT_PUBLIC_WORDPRESS_URL="$PROD_WP_URL" \
NODE_ENV=production npx next build

echo "→ Deploying to $DEPLOY_HOST..."
scp -r out/* "$DEPLOY_HOST:$DEPLOY_ROOT/"

echo ""
echo "========================================="
echo "  ✓ Deploy complete!"
echo "  $PROD_SITE_URL"
echo "========================================="
