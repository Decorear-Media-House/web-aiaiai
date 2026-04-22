<?php
/**
 * Import JetEngine field values from wp-meta-sync.json into post meta.
 * Run via: wp --allow-root eval-file import-meta-sync.php
 *
 * Runs once during init.sh on fresh install — safe to overwrite unconditionally
 * because the init.sh flag file prevents re-runs on an already-seeded system.
 */

require_once __DIR__ . '/seed-helpers.php';

$json_file = aiaiai_find_seed_file('wp-meta-sync.json');
if (!$json_file) {
    echo "wp-meta-sync.json not found — skipping JetEngine value import\n";
    return;
}

$data = json_decode(file_get_contents($json_file), true);
if (!$data || !is_array($data)) {
    echo "wp-meta-sync.json is empty or malformed — skipping\n";
    return;
}

$total = 0;
foreach ($data as $slug => $meta) {
    $page = get_page_by_path($slug);
    if (!$page) {
        echo "  ⚠ page '$slug' not found — skipping\n";
        continue;
    }
    $pid = $page->ID;
    $count = 0;
    foreach ($meta as $key => $value) {
        update_post_meta($pid, $key, wp_slash($value));
        $count++;
    }
    echo "  ✓ $slug: $count keys imported (post ID $pid)\n";
    $total += $count;
}
echo "Total: $total meta keys imported from $json_file\n";
