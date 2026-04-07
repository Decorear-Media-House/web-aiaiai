#!/usr/bin/env bash
set -euo pipefail

echo "=== AIAIAI Deploy ==="

# 1. Push code to GitHub
echo "→ Pushing code to GitHub..."
git add -A && git commit -m "update" 2>/dev/null || echo "  (nothing to commit)"
git push origin main 2>/dev/null || echo "  (already up to date)"

# 2. Copy mu-plugins to WordPress CMS
echo "→ Updating WordPress mu-plugins..."
scp -q wordpress/mu-plugins/*.php aiaiai-cms:~/htdocs/aiaiai-cms.decorear.com/wp-content/mu-plugins/

# 3. Build static site from production CMS
echo "→ Building static site..."
cd Frontend
NEXT_OUTPUT=export \
WORDPRESS_API_URL=https://aiaiai-cms.decorear.com/wp-json \
NEXT_PUBLIC_WORDPRESS_URL=https://aiaiai-cms.decorear.com \
npx next build

# 4. Upload to frontend server
echo "→ Deploying to aiaiai.decorear.com..."
scp -r out/* aiaiai-deploy:~/htdocs/aiaiai.decorear.com/

echo ""
echo "✓ Done! https://aiaiai.decorear.com"
