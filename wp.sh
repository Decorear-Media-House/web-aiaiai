#!/usr/bin/env bash
# Ad-hoc WP-CLI wrapper for the prod compose stack.
#
# Usage:
#   ./wp.sh post list
#   ./wp.sh plugin status
#   ./wp.sh eval-file wordpress/verify-media.php
#
# Runs a throwaway wordpress:cli container that shares the wp-html volume and
# Docker network of aiaiai-wordpress. Requires `./bootstrap.sh` (or
# `docker compose -p aiaiai-prod -f docker-compose.prod.yml up -d`) to have
# been run so the stack is alive.
set -euo pipefail
cd "$(dirname "$0")"

[ -f .env.prod ] || { echo "error: .env.prod not found — run ./bootstrap.sh first" >&2; exit 1; }
docker ps --format '{{.Names}}' | grep -q '^aiaiai-wordpress$' \
  || { echo "error: aiaiai-wordpress is not running" >&2; exit 1; }

exec docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod \
  run --rm --no-deps --entrypoint wp \
  aiaiai-wp-init --allow-root --path=/var/www/html "$@"
