<?php
/**
 * Import page data from export-data.json to production WordPress.
 * Imports both page_sections (legacy) and JetEngine meta fields.
 */

$json_file = dirname(__FILE__) . '/export-data.json';
if (!file_exists($json_file)) {
    echo "export-data.json not found!\n";
    exit(1);
}

$export = json_decode(file_get_contents($json_file), true);

foreach ($export as $slug => $data) {
    $page = get_page_by_path($slug);
    if (!$page) {
        echo "$slug: PAGE NOT FOUND - skip\n";
        continue;
    }
    $pid = $page->ID;

    // Import page_sections (legacy)
    $ps = $data['page_sections'] ?? '';
    if ($ps) {
        update_post_meta($pid, 'page_sections', wp_slash($ps));
    }

    // Import JetEngine fields
    $jet = $data['jet_fields'] ?? [];
    $count = 0;
    foreach ($jet as $key => $val) {
        if (is_array($val)) {
            // Ensure numeric keys for repeaters
            update_post_meta($pid, $key, array_values($val));
        } else {
            update_post_meta($pid, $key, $val);
        }
        $count++;
    }

    echo "$slug (ID $pid): page_sections=" . strlen($ps) . " chars, jet=$count fields\n";
}

echo "\nImport complete!\n";
