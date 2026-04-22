<?php
/**
 * Import images from wordpress/uploads/ into WordPress Media Library.
 * Run via: wp --allow-root eval-file /var/www/html/wp-content/mu-plugins/../upload-images.php
 *
 * Images are stored in wordpress/uploads/ in the repo and mounted into the container.
 */

require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

// Try repo-relative path first (mounted via docker-compose), fallback to /tmp
$image_dir = dirname(__FILE__) . '/../uploads/';
if (!is_dir($image_dir)) {
    $image_dir = '/tmp/aiaiai-images/';
}
if (!is_dir($image_dir)) {
    echo "Image directory not found. Expected: wordpress/uploads/ (mounted) or /tmp/aiaiai-images/\n";
    exit(1);
}

$files = glob($image_dir . '*');
$count = 0;
$skipped = 0;

foreach ($files as $file) {
    if (is_dir($file)) continue;

    $filename = basename($file);
    $mime = mime_content_type($file);

    // Skip non-image files
    if (!in_array($mime, ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'])) {
        echo "  SKIP (not image): $filename\n";
        continue;
    }

    // Check if already uploaded (by filename)
    $existing = get_posts([
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'meta_query' => [['key' => '_wp_attached_file', 'value' => $filename, 'compare' => 'LIKE']],
        'posts_per_page' => 1,
    ]);
    if (!empty($existing)) {
        echo "  EXISTS: $filename (ID {$existing[0]->ID})\n";
        $skipped++;
        continue;
    }

    // Copy directly instead of wp_upload_bits() — the latter runs the
    // filename through wp_unique_filename() which appends "-1" to any
    // "*-scaled.*" name (WordPress reserves that suffix for its own
    // auto-scaled variants). That rename makes metadata URLs 404.
    $upload_dir = wp_upload_dir();
    if (!empty($upload_dir['error'])) {
        echo "  ERROR: $filename - {$upload_dir['error']}\n";
        continue;
    }
    if (!wp_mkdir_p($upload_dir['path'])) {
        echo "  ERROR: $filename - cannot create {$upload_dir['path']}\n";
        continue;
    }

    $target_path = trailingslashit($upload_dir['path']) . $filename;
    $target_url  = trailingslashit($upload_dir['url'])  . $filename;

    if (!@copy($file, $target_path)) {
        echo "  ERROR: $filename - copy to {$target_path} failed\n";
        continue;
    }

    $attach_id = wp_insert_attachment([
        'post_title'     => pathinfo($filename, PATHINFO_FILENAME),
        'post_mime_type' => $mime,
        'post_status'    => 'inherit',
        'guid'           => $target_url,
    ], $target_path);

    if (is_wp_error($attach_id)) {
        echo "  ERROR: $filename - " . $attach_id->get_error_message() . "\n";
        @unlink($target_path);
        continue;
    }

    // Generate thumbnails for raster images
    if ($mime !== 'image/svg+xml') {
        $attach_data = wp_generate_attachment_metadata($attach_id, $target_path);
        wp_update_attachment_metadata($attach_id, $attach_data);
    }

    echo "  OK: $filename → ID $attach_id ($target_url)\n";
    $count++;
}

echo "\nUploaded: $count, Skipped (existing): $skipped, Total files: " . count($files) . "\n";
