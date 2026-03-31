#!/usr/bin/env bash
set -euo pipefail

MAC_MINI="decr@ssh.decorear.com"
REMOTE_DIR="/Users/decr/apps/aiaiai"
IMAGE_NAME="aiaiai-frontend:latest"
TARBALL="/tmp/aiaiai-frontend.tar.gz"

echo "==> Building Docker image..."
docker build -t "$IMAGE_NAME" ./Frontend

echo "==> Saving image to tarball..."
docker save "$IMAGE_NAME" | gzip > "$TARBALL"

echo "==> Transferring tarball to Mac Mini..."
scp "$TARBALL" "$MAC_MINI:/tmp/aiaiai-frontend.tar.gz"

echo "==> Transferring docker-compose.yml..."
ssh "$MAC_MINI" "mkdir -p $REMOTE_DIR"
scp docker-compose.yml "$MAC_MINI:$REMOTE_DIR/docker-compose.yml"

echo "==> Loading image and starting containers on Mac Mini..."
ssh "$MAC_MINI" bash -s <<'REMOTE'
set -euo pipefail
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"

echo "Loading image..."
docker load < /tmp/aiaiai-frontend.tar.gz

echo "Pulling WordPress and MySQL images..."
cd /Users/decr/apps/aiaiai
docker compose pull aiaiai-wordpress aiaiai-mysql

echo "Starting containers..."
docker compose up -d

echo "Waiting for containers to start..."
sleep 5

echo "Health check (frontend)..."
if curl -sf http://localhost:3050 > /dev/null 2>&1; then
  echo "✓ Frontend health check passed"
else
  echo "⚠ Frontend health check failed — container logs:"
  docker logs aiaiai-frontend --tail 20
  exit 1
fi

echo "Health check (WordPress)..."
if curl -sf http://localhost:8080 > /dev/null 2>&1; then
  echo "✓ WordPress health check passed"
else
  echo "⚠ WordPress not ready yet — may need initial setup at http://<server>:8080"
fi

echo "Cleaning up..."
rm -f /tmp/aiaiai-frontend.tar.gz
REMOTE

echo "==> Cleaning up local tarball..."
rm -f "$TARBALL"

echo "==> Deploy complete!"
echo "    Note: If this is the first deploy, complete WordPress setup at http://<server>:8080"
