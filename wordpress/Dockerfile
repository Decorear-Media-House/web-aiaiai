FROM wordpress:6-apache

# Production-compatible WordPress image with WP-CLI available inside the same
# container. This avoids a separate sidecar that cannot see WordPress core files
# created by the official wordpress entrypoint at runtime.
RUN apt-get update \
    && apt-get install -y --no-install-recommends less mariadb-client \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp

# Allow installing the required premium plugin ZIPs through wp-admin without
# opening uploads too wide. Current plugin ZIPs are under 6 MB; 16M leaves a
# small operational buffer while staying tighter than generic 64M/128M limits.
# Keep post_max_size higher than upload_max_filesize as PHP requires.
RUN { \
        echo 'upload_max_filesize=16M'; \
        echo 'post_max_size=24M'; \
        echo 'memory_limit=256M'; \
        echo 'max_execution_time=300'; \
        echo 'max_input_time=300'; \
    } > /usr/local/etc/php/conf.d/aiaiai-uploads.ini
