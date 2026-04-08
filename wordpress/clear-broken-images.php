<?php
/**
 * Clear broken image URLs from all postmeta.
 * Image fields that point to non-existent WP uploads will be emptied,
 * so frontend components use their fallback images from /images/.
 *
 * Run via: wp --allow-root eval-file clear-broken-images.php
 */

global $wpdb;

// Find all postmeta values containing wp-content/uploads that are image URLs
$rows = $wpdb->get_results(
    "SELECT meta_id, post_id, meta_key, meta_value
     FROM {$wpdb->postmeta}
     WHERE meta_value LIKE '%wp-content/uploads%'
     AND (meta_key LIKE '%image%' OR meta_key LIKE '%photo%' OR meta_key LIKE '%bg_image%' OR meta_key LIKE '%background%')"
);

$cleared = 0;
$kept = 0;
$upload_dir = wp_upload_dir();
$base_dir = $upload_dir['basedir'];

foreach ($rows as $row) {
    $val = $row->meta_value;

    // Extract filename from URL
    if (preg_match('/uploads\/(.+)$/', $val, $m)) {
        $file_path = $base_dir . '/' . $m[1];

        if (!file_exists($file_path)) {
            // File doesn't exist — clear the field
            update_post_meta($row->post_id, $row->meta_key, '');
            echo "CLEARED: {$row->meta_key} = {$val}\n";
            $cleared++;
        } else {
            echo "  OK: {$row->meta_key} = {$val}\n";
            $kept++;
        }
    }
}

// Also check serialized arrays (page_sections JSON, repeaters)
$json_rows = $wpdb->get_results(
    "SELECT meta_id, post_id, meta_key, meta_value
     FROM {$wpdb->postmeta}
     WHERE meta_key = 'page_sections'
     AND meta_value LIKE '%wp-content/uploads%'"
);

foreach ($json_rows as $row) {
    $val = $row->meta_value;
    // Replace broken upload URLs with empty strings in JSON
    $new_val = preg_replace(
        '/https?:\/\/[^"]*wp-content\/uploads\/[^"]*/',
        '',
        $val
    );
    if ($new_val !== $val) {
        update_post_meta($row->post_id, $row->meta_key, wp_slash($new_val));
        echo "CLEARED page_sections images for post {$row->post_id}\n";
        $cleared++;
    }
}

// Clear broken URLs in serialized repeater arrays
$repeater_rows = $wpdb->get_results(
    "SELECT meta_id, post_id, meta_key, meta_value
     FROM {$wpdb->postmeta}
     WHERE meta_value LIKE '%wp-content/uploads%'
     AND meta_key NOT LIKE '%image%'
     AND meta_key NOT LIKE '%photo%'
     AND meta_key NOT LIKE '%bg_image%'
     AND meta_key NOT LIKE '%background%'
     AND meta_key != 'page_sections'"
);

foreach ($repeater_rows as $row) {
    $unserialized = maybe_unserialize($row->meta_value);
    if (is_array($unserialized)) {
        $json = json_encode($unserialized);
        $new_json = preg_replace(
            '/https?:\/\/[^"]*wp-content\/uploads\/[^"]*/',
            '',
            $json
        );
        if ($new_json !== $json) {
            $new_val = json_decode($new_json, true);
            update_post_meta($row->post_id, $row->meta_key, $new_val);
            echo "CLEARED repeater images in {$row->meta_key} for post {$row->post_id}\n";
            $cleared++;
        }
    }
}

echo "\nDone! Cleared: $cleared, Kept (valid): $kept\n";
