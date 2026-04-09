#!/usr/bin/env bash
set -euo pipefail

# ── Configuration ──
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/Frontend"
DEPLOY_HOST="aiaiai-deploy"
STATIC_SITE_ROOT="/home/decorear-aiai/htdocs/aiaiai.decorear.com"

echo "==> [$(date)] Starting rebuild..."

# 1. Pull latest code
echo "==> Pulling latest code from GitHub..."
cd "$SCRIPT_DIR"
git pull --ff-only

# 2. Install dependencies (if needed)
echo "==> Installing dependencies..."
cd "$FRONTEND_DIR"
npm ci --prefer-offline 2>/dev/null || npm install

# 3. Build static site (clear cache first to fetch fresh WP content)
echo "==> Clearing build cache..."
rm -rf .next out

echo "==> Building static site..."
NEXT_OUTPUT=export \
WORDPRESS_API_URL=https://aiaiai-cms.decorear.com/wp-json \
NEXT_PUBLIC_WORDPRESS_URL=https://aiaiai-cms.decorear.com \
NODE_ENV=production npm run build

# 4. Deploy to frontend server
echo "==> Deploying to $DEPLOY_HOST:$STATIC_SITE_ROOT ..."
rsync -az --delete -e ssh "$FRONTEND_DIR/out/" "$DEPLOY_HOST:$STATIC_SITE_ROOT/"

echo "==> [$(date)] Rebuild complete! Site live at https://aiaiai.decorear.com"
