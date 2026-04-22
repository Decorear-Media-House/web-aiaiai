<?php
/**
 * Import WP site options from the _options block in export-data.json.
 * Companion to export-data.php. Re-resolves custom_logo by filename (IDs
 * don't survive a fresh install) and remaps theme_mods to the active theme.
 */

require_once __DIR__ . '/seed-helpers.php';

$json_file = aiaiai_find_seed_file('export-data.json');
if (!$json_file) {
    echo "export-data.json not found — skipping options import\n";
    return;
}

$data = json_decode(file_get_contents($json_file), true);
if (!is_array($data) || empty($data['_options'])) {
    echo "no _options block — skipping\n";
    return;
}

$options = $data['_options'];
// Refuse to import anything that could carry secrets — Pro license keys and
// registration tokens belong in env vars, not a git-tracked JSON.
$skip = [
    'siteurl', 'home',
    '_custom_logo_basename', '_stylesheet',
    'rank_math_license_code', 'rank_math_license_data',
    'rank-math-pro-registration',
];

if (isset($options['custom_logo']) && !empty($options['_custom_logo_basename'])) {
    $basename = $options['_custom_logo_basename'];
    $attach_id = aiaiai_attachment_id_by_basename($basename);
    if ($attach_id) {
        $options['custom_logo'] = $attach_id;
    } else {
        echo "  custom_logo: '$basename' not uploaded — skipped\n";
        $skip[] = 'custom_logo';
    }
}

$active = get_option('stylesheet');
$source = $options['_stylesheet'] ?? '';
if ($source && $active && $source !== $active) {
    $source_key = "theme_mods_{$source}";
    if (isset($options[$source_key])) {
        $options["theme_mods_{$active}"] = $options[$source_key];
        $skip[] = $source_key;
    }
}

$imported = 0;
foreach ($options as $key => $value) {
    if (in_array($key, $skip, true)) continue;
    update_option($key, $value);
    $imported++;
}

if (isset($options['permalink_structure'])) {
    flush_rewrite_rules(false);
}

echo "imported $imported options from $json_file\n";
