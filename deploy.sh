#!/usr/bin/env bash
set -euo pipefail

REMOTE_HOST="decr@ssh.decorear.com"
REMOTE_PATH="/home/decorear-aiai/apps/aiaiai"
GIT_SSH_KEY="~/.ssh/id_aiaiai"
REPO_URL="github-aiaiai:Decorear-Media-House/web-aiaiai.git"

echo "==> Pushing latest code to GitHub..."
git push

echo "==> Deploying to server ($REMOTE_HOST)..."
ssh "$REMOTE_HOST" bash -s <<REMOTE
set -euo pipefail
export PATH="/usr/local/bin:/opt/homebrew/bin:\$PATH"

# Clone or pull repo
if [ ! -d "$REMOTE_PATH" ]; then
  echo "Cloning repository..."
  mkdir -p "$REMOTE_PATH"
  GIT_SSH_COMMAND="ssh -i $GIT_SSH_KEY" git clone "$REPO_URL" "$REMOTE_PATH"
else
  echo "Pulling latest code..."
  cd "$REMOTE_PATH"
  GIT_SSH_COMMAND="ssh -i $GIT_SSH_KEY" git pull --ff-only
fi

cd "$REMOTE_PATH"

# Install mu-plugins to WordPress
echo "Copying mu-plugins to WordPress..."
WP_MUPLUGINS="/home/decorear-aiaiai-cms/htdocs/aiaiai-cms.decorear.com/wp-content/mu-plugins"
mkdir -p "\$WP_MUPLUGINS"
cp -f wordpress/mu-plugins/*.php "\$WP_MUPLUGINS/"

# Setup webhook listener
echo "Setting up webhook listener..."
cd "$REMOTE_PATH"
if command -v pm2 &>/dev/null; then
  pm2 delete aiaiai-webhook 2>/dev/null || true
  pm2 start webhook.js --name aiaiai-webhook
  pm2 save
else
  echo "PM2 not found. Install with: npm install -g pm2"
  echo "Then run: pm2 start webhook.js --name aiaiai-webhook && pm2 save"
fi

# Run initial build
echo "Running initial build..."
chmod +x rebuild.sh
bash rebuild.sh

echo "Done!"
REMOTE

echo "==> Deploy complete!"
echo "    CMS: https://aiaiai-cms.decorear.com/wp-admin/"
echo "    Site: https://aiaiai.decorear.com"
