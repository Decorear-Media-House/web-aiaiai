<?php
/**
 * Import images from wordpress/uploads/ into WordPress Media Library.
 * Run via: wp --allow-root eval-file /var/www/html/wp-content/mu-plugins/../upload-images.php
 *
 * Tries local repo paths first, then falls back to /tmp/aiaiai-images/.
 */

require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

$candidate_dirs = [
    dirname(__FILE__) . '/uploads',
    ABSPATH . 'wp-content/vendor-seed/uploads',
    '/tmp/aiaiai-images/',
];

$image_dir = null;
foreach ($candidate_dirs as $candidate_dir) {
    if (is_dir($candidate_dir)) {
        $image_dir = $candidate_dir;
        break;
    }
}

if (!$image_dir) {
    echo "Image directory not found.\n";
    echo "Checked:\n";
    foreach ($candidate_dirs as $candidate_dir) {
        echo " - $candidate_dir\n";
    }
    exit(1);
}

$files = glob(rtrim($image_dir, '/\\') . DIRECTORY_SEPARATOR . '*');
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

    // Upload to WordPress
    $upload = wp_upload_bits($filename, null, file_get_contents($file));
    if ($upload['error']) {
        echo "  ERROR: $filename - {$upload['error']}\n";
        continue;
    }

    $attachment = [
        'post_title' => pathinfo($filename, PATHINFO_FILENAME),
        'post_mime_type' => $mime,
        'post_status' => 'inherit',
    ];
    $attach_id = wp_insert_attachment($attachment, $upload['file']);

    if (is_wp_error($attach_id)) {
        echo "  ERROR: $filename - " . $attach_id->get_error_message() . "\n";
        continue;
    }

    // Generate thumbnails for raster images
    if ($mime !== 'image/svg+xml') {
        $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
        wp_update_attachment_metadata($attach_id, $attach_data);
    }

    echo "  OK: $filename → ID $attach_id ({$upload['url']})\n";
    $count++;
}

echo "\nUploaded: $count, Skipped (existing): $skipped, Total files: " . count($files) . "\n";
