<?php
/**
 * Register all unregistered files in wp-content/uploads/ into WP Media Library.
 * Skips thumbnails (files with -WIDTHxHEIGHT suffix) and already registered files.
 * Run via: wp --allow-root eval-file register-uploads.php
 */

require_once ABSPATH . 'wp-admin/includes/image.php';

$upload_dir = wp_upload_dir();
$base_dir = $upload_dir['basedir'];
$base_url = $upload_dir['baseurl'];

// Get all already registered files
$registered = [];
$attachments = get_posts([
    'post_type' => 'attachment',
    'post_status' => 'inherit',
    'posts_per_page' => -1,
]);
foreach ($attachments as $att) {
    $file = get_post_meta($att->ID, '_wp_attached_file', true);
    if ($file) {
        $registered[basename($file)] = $att->ID;
    }
}
echo "Already registered: " . count($registered) . " attachments\n\n";

// Scan uploads directory for original files (skip thumbnails)
$scan_dir = $base_dir . '/2026/04';
if (!is_dir($scan_dir)) {
    echo "Directory not found: $scan_dir\n";
    exit(1);
}

$files = scandir($scan_dir);
$count = 0;
$skipped = 0;

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;

    $filepath = $scan_dir . '/' . $file;
    if (!is_file($filepath)) continue;

    // Skip thumbnails (filename-300x200.png pattern)
    if (preg_match('/-\d+x\d+\.\w+$/', $file)) continue;
    // Skip -scaled files
    if (preg_match('/-scaled\.\w+$/', $file)) continue;

    // Check mime type
    $mime = wp_check_filetype($file);
    if (!$mime['type']) continue;
    if (!in_array($mime['type'], [
        'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'
    ])) continue;

    // Skip if already registered
    if (isset($registered[$file])) {
        $skipped++;
        continue;
    }

    // Register as attachment
    $relative_path = '2026/04/' . $file;
    $attachment = [
        'post_title'     => pathinfo($file, PATHINFO_FILENAME),
        'post_mime_type' => $mime['type'],
        'post_status'    => 'inherit',
        'guid'           => $base_url . '/' . $relative_path,
    ];

    $attach_id = wp_insert_attachment($attachment, $filepath);
    if (is_wp_error($attach_id)) {
        echo "ERROR: $file - " . $attach_id->get_error_message() . "\n";
        continue;
    }

    // Update attached file path
    update_post_meta($attach_id, '_wp_attached_file', $relative_path);

    // Generate metadata (thumbnails already exist on disk, just need DB record)
    if ($mime['type'] !== 'image/svg+xml') {
        $metadata = wp_generate_attachment_metadata($attach_id, $filepath);
        wp_update_attachment_metadata($attach_id, $metadata);
    }

    echo "OK: $file → ID $attach_id\n";
    $count++;
}

echo "\nRegistered: $count new, Skipped (existing): $skipped\n";
echo "Total attachments now: " . ($count + count($registered)) . "\n";
