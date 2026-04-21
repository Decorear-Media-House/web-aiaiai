#!/usr/bin/env bash
# One-command deploy entrypoint. Designed for fresh `git clone` on EC2 / Linux.
#
#   ./bootstrap.sh
#
# - Verifies Docker + compose plugin are installed
# - Creates .env.prod with auto-generated random passwords on first run
# - Auto-detects EC2 public IPv4 (falls back to localhost)
# - Builds and starts the full stack
# - Prints access URL + admin credentials when ready
set -euo pipefail

cd "$(dirname "$0")"

log()  { printf '\n[bootstrap] %s\n' "$*"; }
fail() { printf '\n[bootstrap][ERROR] %s\n' "$*" >&2; exit 1; }

# --- 1. Prerequisites --------------------------------------------------------
command -v docker >/dev/null 2>&1 \
  || fail "Docker is not installed. See https://docs.docker.com/engine/install/"
docker compose version >/dev/null 2>&1 \
  || fail "Docker Compose plugin missing. On Ubuntu: sudo apt-get install docker-compose-plugin"
command -v openssl >/dev/null 2>&1 \
  || fail "openssl is required for password generation (preinstalled on most systems)."

# --- 2. .env.prod: generate on first run only --------------------------------
if [ ! -f .env.prod ]; then
  [ -f .env.prod.example ] || fail ".env.prod.example missing — is this the right repo?"

  log "first run — generating .env.prod with random secrets"
  cp .env.prod.example .env.prod

  # EC2 public IPv4 via IMDSv2, then v1, then localhost. 2s timeouts so non-EC2
  # hosts don't hang.
  PUBLIC_IP=""
  TOKEN=$(curl -sS -m 2 -X PUT "http://169.254.169.254/latest/api/token" \
    -H "X-aws-ec2-metadata-token-ttl-seconds: 60" 2>/dev/null || true)
  if [ -n "$TOKEN" ]; then
    PUBLIC_IP=$(curl -sS -m 2 -H "X-aws-ec2-metadata-token: $TOKEN" \
      http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || true)
  fi
  if [ -z "$PUBLIC_IP" ]; then
    PUBLIC_IP=$(curl -sS -m 2 http://169.254.169.254/latest/meta-data/public-ipv4 2>/dev/null || true)
  fi
  DETECTED_DOMAIN="${PUBLIC_IP:-localhost}"

  # WP_HOME must include the port when it's non-standard, otherwise WordPress
  # generates redirect URLs without it and browsers hit port 80 (nothing there).
  # For production with a reverse proxy on 80/443, edit .env.prod manually.
  WP_PORT=$(grep ^WP_HTTP_PORT= .env.prod.example | cut -d= -f2)
  WP_PORT="${WP_PORT:-8080}"
  if [ "$WP_PORT" != "80" ] && [ "$WP_PORT" != "443" ]; then
    DETECTED_DOMAIN="${DETECTED_DOMAIN}:${WP_PORT}"
  fi

  WP_PASS=$(openssl rand -hex 16)
  DB_PASS=$(openssl rand -hex 16)
  DB_ROOT=$(openssl rand -hex 16)

  # Portable in-place edit (works on macOS + GNU sed).
  sed -i.bak \
    -e "s|^WP_DOMAIN=.*|WP_DOMAIN=${DETECTED_DOMAIN}|" \
    -e "s|^WP_PROTOCOL=.*|WP_PROTOCOL=http|" \
    -e "s|^WP_ADMIN_PASS=.*|WP_ADMIN_PASS=${WP_PASS}|" \
    -e "s|^MYSQL_PASSWORD=.*|MYSQL_PASSWORD=${DB_PASS}|" \
    -e "s|^MYSQL_ROOT_PASSWORD=.*|MYSQL_ROOT_PASSWORD=${DB_ROOT}|" \
    .env.prod
  rm -f .env.prod.bak

  log "detected domain: ${DETECTED_DOMAIN} (edit .env.prod to customize)"
else
  log ".env.prod already present — reusing existing secrets"
fi

# --- 3. Build + start stack --------------------------------------------------
# -p aiaiai-prod isolates prod volumes from the dev compose (which uses the
# default `aiaiai` project) so the two can coexist without clobbering each
# other's DB.
COMPOSE="docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod"

log "building images and starting services (first run takes ~3–8 min)"
log "→ WP init container will seed content, upload 74MB of media, activate plugins"
$COMPOSE up -d --build

# depends_on: service_completed_successfully means `up` blocks until wp-init
# exits. If it exited non-zero, surface that here.
INIT_EXIT=$(docker inspect -f '{{.State.ExitCode}}' aiaiai-wp-init 2>/dev/null || echo "missing")
if [ "$INIT_EXIT" != "0" ]; then
  $COMPOSE logs --tail 80 aiaiai-wp-init || true
  fail "aiaiai-wp-init exited with code ${INIT_EXIT}. See logs above."
fi

# --- 4. Report ---------------------------------------------------------------
get_env() { grep "^$1=" .env.prod | head -1 | cut -d= -f2-; }
DOMAIN=$(get_env WP_DOMAIN)
PROTO=$(get_env WP_PROTOCOL)
WP_PORT=$(get_env WP_HTTP_PORT)
FE_PORT=$(get_env FRONTEND_HTTP_PORT)
ADMIN_USER=$(get_env WP_ADMIN_USER)
ADMIN_PASS=$(get_env WP_ADMIN_PASS)

cat <<EOF

════════════════════════════════════════════════════════
  ✓ Deployment ready
════════════════════════════════════════════════════════
  Frontend:     http://${DOMAIN}:${FE_PORT}
  WordPress:    ${PROTO}://${DOMAIN}:${WP_PORT}/wp-admin
  Admin user:   ${ADMIN_USER}
  Admin pass:   ${ADMIN_PASS}

  All secrets live in .env.prod (git-ignored). Save them now
  or rotate later: docker compose -p aiaiai-prod -f
  docker-compose.prod.yml down && rm .env.prod && ./bootstrap.sh
════════════════════════════════════════════════════════
EOF
