<?php
/**
 * Shared helpers for AIAIAI seed, import, and export scripts.
 * Required by every wp-cli eval-file script that needs to line up on the
 * same filename→attachment lookup, Rank Math meta keys, or seed-file paths.
 */

if (!function_exists('aiaiai_attachment_id_by_basename')) {
    /**
     * Find a Media Library attachment ID by filename. Returns 0 when no
     * matching _wp_attached_file row exists — callers skip gracefully.
     */
    function aiaiai_attachment_id_by_basename($basename) {
        if (!$basename) return 0;
        global $wpdb;
        $like = '%/' . $wpdb->esc_like($basename);
        return (int) $wpdb->get_var($wpdb->prepare(
            "SELECT post_id FROM {$wpdb->postmeta}
             WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s LIMIT 1",
            $like
        ));
    }
}

if (!function_exists('aiaiai_rankmath_meta_keys')) {
    /**
     * Per-post/page Rank Math meta keys synced alongside content.
     * Site-level options (rank_math_options_*, rank_math_modules) are
     * handled separately in export-data.php → _options / import-options.php.
     */
    function aiaiai_rankmath_meta_keys() {
        return [
            'rank_math_title', 'rank_math_description', 'rank_math_focus_keyword',
            'rank_math_robots', 'rank_math_canonical_url',
            'rank_math_facebook_title', 'rank_math_facebook_description', 'rank_math_facebook_image',
            'rank_math_twitter_title', 'rank_math_twitter_description', 'rank_math_twitter_card_type',
        ];
    }
}

if (!function_exists('aiaiai_find_seed_file')) {
    /**
     * Resolve a seed JSON file across known mount points.
     * Returns the first existing absolute path, or null.
     */
    function aiaiai_find_seed_file($filename) {
        $candidates = [
            dirname(ABSPATH) . "/web-aiaiai/wordpress/$filename",
            __DIR__ . "/$filename",
            "/seed/$filename",
        ];
        foreach ($candidates as $p) {
            if (file_exists($p)) return $p;
        }
        return null;
    }
}
