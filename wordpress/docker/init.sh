#!/usr/bin/env bash
# Zero-touch WordPress installer for EC2 Docker deployments.
# Runs once inside a `wordpress:cli` container against a healthy aiaiai-wordpress
# service. Subsequent boots no-op via the /flags/installed guard.
set -euo pipefail

FLAG=/var/www/html/wp-content/.wp-init-installed
WP="wp --allow-root --path=/var/www/html"

log()  { printf '\n[wp-init] %s\n' "$*"; }
fail() { printf '\n[wp-init][ERROR] %s\n' "$*" >&2; exit 1; }

if [ -f "$FLAG" ]; then
  log "already seeded ($(cat "$FLAG" 2>/dev/null || echo 'flag present')) — exiting"
  exit 0
fi

# --- 1. Validate required env ------------------------------------------------
: "${WP_DOMAIN:?WP_DOMAIN is required (e.g. cms.example.com)}"
: "${WP_PROTOCOL:=https}"
: "${WP_SITE_TITLE:=AIAIAI CMS}"
: "${WP_ADMIN_USER:?WP_ADMIN_USER is required}"
: "${WP_ADMIN_PASS:?WP_ADMIN_PASS is required}"
: "${WP_ADMIN_EMAIL:?WP_ADMIN_EMAIL is required}"

if [ "$WP_ADMIN_PASS" = "CHANGE_ME_BEFORE_FIRST_UP" ] || [ ${#WP_ADMIN_PASS} -lt 8 ]; then
  fail "WP_ADMIN_PASS is unset, placeholder, or shorter than 8 chars. Refusing to install."
fi

SITE_URL="${WP_PROTOCOL}://${WP_DOMAIN}"

# --- 2. Wait for WordPress core files to be ready ----------------------------
log "waiting for WordPress core to be available..."
for i in $(seq 1 30); do
  if $WP core version >/dev/null 2>&1; then
    break
  fi
  sleep 2
done
$WP core version >/dev/null || fail "WordPress core files not ready after 60s"

# --- 3. Install WordPress ----------------------------------------------------
if $WP core is-installed 2>/dev/null; then
  log "WordPress already installed in DB — skipping core install"
else
  log "installing WordPress → $SITE_URL"
  $WP core install \
    --url="$SITE_URL" \
    --title="$WP_SITE_TITLE" \
    --admin_user="$WP_ADMIN_USER" \
    --admin_password="$WP_ADMIN_PASS" \
    --admin_email="$WP_ADMIN_EMAIL" \
    --skip-email
fi

log "setting permalink structure"
$WP rewrite structure '/%postname%/' >/dev/null
$WP rewrite flush >/dev/null

# Pre-create writable dirs WP's plugin/media APIs expect (they don't mkdir -p).
# Running as root, chown to www-data (UID 33) so the aiaiai-wordpress Apache
# process can write there at runtime.
log "preparing wp-content subdirectories"
mkdir -p \
  /var/www/html/wp-content/uploads \
  /var/www/html/wp-content/upgrade \
  /var/www/html/wp-content/plugins
chown -R 33:33 /var/www/html/wp-content/uploads \
               /var/www/html/wp-content/upgrade \
               /var/www/html/wp-content/plugins

# --- 4. Plugins: free from wp.org --------------------------------------------
log "installing free plugins"
$WP plugin install seo-by-rank-math --activate || log "rank-math install failed (non-fatal)"

# --- 5. Plugins: premium zips dropped into /premium-plugins ------------------
if compgen -G "/premium-plugins/*.zip" >/dev/null; then
  log "installing premium plugin zips from /premium-plugins"
  for zip in /premium-plugins/*.zip; do
    log "  → $(basename "$zip")"
    $WP plugin install "$zip" --activate --force || log "  (skipped: $(basename "$zip"))"
  done
else
  log "no premium plugin zips in /premium-plugins — skipping"
fi

# --- 5b. Register JetEngine / Crocoblock license (optional) ------------------
# The actual activation roundtrip to Crocoblock happens the first time an admin
# opens Crocoblock → License. Storing the key here means no one has to paste it
# by hand after a fresh bootstrap.
if [ -n "${JET_ENGINE_LICENSE:-}" ] && $WP plugin is-active jet-engine 2>/dev/null; then
  log "registering JetEngine license key"
  $WP option update jet_engine_license "$JET_ENGINE_LICENSE" >/dev/null \
    || log "  (could not set jet_engine_license option — check via wp-admin)"
fi

# --- 6. Upload images into Media Library -------------------------------------
log "uploading images (wordpress/uploads → Media Library)"
$WP eval-file /seed/upload-images.php

# --- 7. Register JetEngine meta boxes ----------------------------------------
log "seeding JetEngine meta boxes"
$WP eval-file /seed/seed-all-jetengine.php

# --- 8. Seed page content ----------------------------------------------------
log "seeding page content"
bash /seed/seed-content.sh

# --- 9. Rewrite baked-in URLs to this domain ---------------------------------
log "rewriting seed URLs → $SITE_URL"
PROD_URL="$SITE_URL" $WP eval-file /seed/fix-urls.php

# --- 10. Mark done -----------------------------------------------------------
date -u +"%Y-%m-%dT%H:%M:%SZ" > "$FLAG"
log "zero-touch install complete ✓"
