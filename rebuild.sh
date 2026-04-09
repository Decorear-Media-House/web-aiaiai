#!/usr/bin/env bash
set -euo pipefail

# ── Configuration ──
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/Frontend"
DEPLOY_HOST="aiaiai-deploy"
STATIC_SITE_ROOT="/home/decorear-aiai/htdocs/aiaiai.decorear.com"

echo "==> [$(date)] Starting rebuild..."

# 1. Pull latest code (reset auto-generated files first)
echo "==> Pulling latest code from GitHub..."
cd "$SCRIPT_DIR"
git checkout -- Frontend/next-env.d.ts 2>/dev/null || true
git pull --ff-only

# 2. Update mu-plugins automatically
WP_PLUGINS_DIR="$HOME/htdocs/aiaiai-cms.decorear.com/wp-content/mu-plugins"
if [ -d "$WP_PLUGINS_DIR" ] && [ -d "$SCRIPT_DIR/wordpress/mu-plugins" ]; then
  echo "==> Updating mu-plugins..."
  cp -f "$SCRIPT_DIR"/wordpress/mu-plugins/*.php "$WP_PLUGINS_DIR/"
  echo "  Done"
fi

# 2. Import WP meta from git (if sync file exists)
SYNC_FILE="$SCRIPT_DIR/wordpress/wp-meta-sync.json"
if [ -f "$SYNC_FILE" ]; then
  echo "==> Importing WP meta from wp-meta-sync.json..."
  python3 -c "
import json, urllib.request

with open('$SYNC_FILE', 'r') as f:
    data = json.load(f)

wp = 'https://aiaiai-cms.decorear.com'

for slug, meta in data.items():
    # Get production page ID
    try:
        url = f'{wp}/wp-json/wp/v2/pages?slug={slug}&_fields=id'
        pages = json.loads(urllib.request.urlopen(url).read())
        if not pages:
            print(f'  ⚠️  {slug}: page not found on production')
            continue
        pid = pages[0]['id']

        # Update meta via REST API
        req = urllib.request.Request(
            f'{wp}/wp-json/wp/v2/pages/{pid}',
            data=json.dumps({'meta': meta}).encode(),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        # Use Application Password from environment
        import os, base64
        user = os.environ.get('WP_SYNC_USER', '')
        pw = os.environ.get('WP_SYNC_PASS', '')
        if user and pw:
            cred = base64.b64encode(f'{user}:{pw}'.encode()).decode()
            req.add_header('Authorization', f'Basic {cred}')
            resp = urllib.request.urlopen(req)
            print(f'  ✅ {slug}: {len(meta)} fields synced')
        else:
            print(f'  ⚠️  WP_SYNC_USER/WP_SYNC_PASS not set, skipping import')
            break
    except Exception as e:
        print(f'  ❌ {slug}: {e}')
" || echo "  ⚠️  WP meta import failed (non-fatal, continuing build)"
fi

# 3. Install dependencies (if needed)
echo "==> Installing dependencies..."
cd "$FRONTEND_DIR"
npm ci --prefer-offline 2>/dev/null || npm install

# 4. Build static site (clear cache first to fetch fresh WP content)
echo "==> Clearing build cache..."
rm -rf .next out

echo "==> Building static site..."
NEXT_OUTPUT=export \
WORDPRESS_API_URL=https://aiaiai-cms.decorear.com/wp-json \
NEXT_PUBLIC_WORDPRESS_URL=https://aiaiai-cms.decorear.com \
NODE_ENV=production npm run build

# 5. Deploy to frontend server
echo "==> Deploying to $DEPLOY_HOST:$STATIC_SITE_ROOT ..."
rsync -az --delete -e ssh "$FRONTEND_DIR/out/" "$DEPLOY_HOST:$STATIC_SITE_ROOT/"

echo "==> [$(date)] Rebuild complete! Site live at https://aiaiai.decorear.com"
