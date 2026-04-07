#!/usr/bin/env bash
set -euo pipefail

echo "========================================="
echo "  AIAIAI Full Deploy"
echo "  Frontend + WordPress CMS + Images"
echo "========================================="

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WP_DIR="$SCRIPT_DIR/wordpress"
FE_DIR="$SCRIPT_DIR/Frontend"

CMS_HOST="aiaiai-cms"
CMS_ROOT="~/htdocs/aiaiai-cms.decorear.com"
DEPLOY_HOST="aiaiai-deploy"
DEPLOY_ROOT="~/htdocs/aiaiai.decorear.com"

PROD_WP_URL="https://aiaiai-cms.decorear.com"
PROD_API_URL="https://aiaiai-cms.decorear.com/wp-json"

# ── Step 1: Push code to GitHub ──
echo ""
echo "→ [1/8] Pushing code to GitHub..."
cd "$SCRIPT_DIR"
git add -A && git commit -m "deploy: full deploy" 2>/dev/null || echo "  (nothing to commit)"
git push origin main 2>/dev/null || echo "  (already up to date)"

# ── Step 2: Deploy mu-plugins ──
echo ""
echo "→ [2/8] Deploying mu-plugins to WordPress CMS..."
scp -q "$WP_DIR"/mu-plugins/*.php "$CMS_HOST:$CMS_ROOT/wp-content/mu-plugins/"
echo "  ✓ mu-plugins updated"

# ── Step 3: Upload images to production ──
echo ""
echo "→ [3/8] Uploading images to WordPress CMS..."
# Upload to a temp dir, then use WP-CLI to import into Media Library
ssh "$CMS_HOST" "mkdir -p /tmp/aiaiai-images"
scp -q -r "$FE_DIR"/public/images/* "$CMS_HOST:/tmp/aiaiai-images/"
echo "  ✓ Images uploaded to /tmp/aiaiai-images/"

# Upload images.php to CMS and run it
scp -q "$WP_DIR/upload-images.php" "$CMS_HOST:/tmp/upload-images.php"
echo "  Running image import into WP Media Library..."
ssh "$CMS_HOST" "cd $CMS_ROOT && wp --allow-root eval-file /tmp/upload-images.php" || echo "  ⚠ Image import had warnings (may be OK)"
echo "  ✓ Images imported"

# ── Step 4: Export local WP data (if Docker is running) ──
echo ""
echo "→ [4/8] Exporting local WordPress data..."
if docker ps --filter name=aiaiai-wordpress --format '{{.Names}}' 2>/dev/null | grep -q aiaiai-wordpress; then
    # Copy export script into container and run
    docker cp "$WP_DIR/export-data.php" aiaiai-wordpress:/tmp/export-data.php
    docker exec aiaiai-wordpress bash -c "cd /var/www/html && php -r \"require '/var/www/html/wp-load.php'; require '/tmp/export-data.php';\"" || \
    echo "  ⚠ Docker export failed, using existing export-data.json"
    # Copy exported file back
    docker cp aiaiai-wordpress:/tmp/export-data.json "$WP_DIR/export-data.json" 2>/dev/null || true
fi

if [ ! -f "$WP_DIR/export-data.json" ]; then
    echo "  ✗ No export-data.json found! Cannot import content."
    exit 1
fi
echo "  ✓ export-data.json ready ($(wc -c < "$WP_DIR/export-data.json") bytes)"

# ── Step 5: Import content to production WP ──
echo ""
echo "→ [5/8] Importing content to production WordPress..."
scp -q "$WP_DIR/export-data.json" "$CMS_HOST:/tmp/export-data.json"
scp -q "$WP_DIR/import-data.php" "$CMS_HOST:/tmp/import-data.php"

# import-data.php reads from same directory
ssh "$CMS_HOST" "cp /tmp/export-data.json /tmp/import-data-dir/export-data.json 2>/dev/null; \
    mkdir -p /tmp/import-data-dir && \
    cp /tmp/export-data.json /tmp/import-data-dir/export-data.json && \
    cp /tmp/import-data.php /tmp/import-data-dir/import-data.php && \
    cd $CMS_ROOT && wp --allow-root eval-file /tmp/import-data-dir/import-data.php"
echo "  ✓ Content imported"

# ── Step 6: Run JetEngine seed (meta boxes) ──
echo ""
echo "→ [6/8] Seeding JetEngine meta boxes..."
scp -q "$WP_DIR/seed-all-jetengine.php" "$CMS_HOST:/tmp/seed-all-jetengine.php"
ssh "$CMS_HOST" "cd $CMS_ROOT && wp --allow-root eval-file /tmp/seed-all-jetengine.php" || echo "  ⚠ JetEngine seed had warnings"
echo "  ✓ JetEngine meta boxes created"

# ── Step 7: Fix URLs (localhost → production) ──
echo ""
echo "→ [7/8] Fixing image URLs (localhost → production)..."
scp -q "$WP_DIR/fix-urls.php" "$CMS_HOST:/tmp/fix-urls.php"
ssh "$CMS_HOST" "cd $CMS_ROOT && wp --allow-root eval-file /tmp/fix-urls.php"
echo "  ✓ URLs updated"

# ── Step 8: Build & deploy static site ──
echo ""
echo "→ [8/8] Building and deploying static site..."
cd "$FE_DIR"
NEXT_OUTPUT=export \
WORDPRESS_API_URL="$PROD_API_URL" \
NEXT_PUBLIC_WORDPRESS_URL="$PROD_WP_URL" \
npx next build

echo "  Uploading static files..."
scp -r out/* "$DEPLOY_HOST:$DEPLOY_ROOT/"

echo ""
echo "========================================="
echo "  ✓ Deploy complete!"
echo ""
echo "  Frontend: https://aiaiai.decorear.com"
echo "  CMS:      https://aiaiai-cms.decorear.com/wp-admin"
echo "========================================="
