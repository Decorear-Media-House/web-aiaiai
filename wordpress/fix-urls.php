<?php
/**
 * Replace localhost URLs with production URLs in all postmeta.
 * Run via: wp --allow-root eval-file fix-urls.php
 */

global $wpdb;

$search = [
    'http://localhost:8080',
    'http://aiaiai-wordpress:80',
    'http://aiaiai-wordpress',
];
$replace = 'https://aiaiai-cms.decorear.com';

$total = 0;
foreach ($search as $old_url) {
    $count = $wpdb->query($wpdb->prepare(
        "UPDATE {$wpdb->postmeta} SET meta_value = REPLACE(meta_value, %s, %s) WHERE meta_value LIKE %s",
        $old_url,
        $replace,
        '%' . $wpdb->esc_like($old_url) . '%'
    ));
    echo "Replaced '$old_url' → '$replace': $count rows\n";
    $total += $count;
}

// Also fix serialized data (JetEngine repeaters store URLs in serialized arrays)
$rows = $wpdb->get_results(
    "SELECT meta_id, meta_value FROM {$wpdb->postmeta} WHERE meta_value LIKE '%localhost:8080%' OR meta_value LIKE '%aiaiai-wordpress%'"
);
foreach ($rows as $row) {
    $val = maybe_unserialize($row->meta_value);
    if (is_array($val)) {
        $json = json_encode($val);
        foreach ($search as $old_url) {
            $json = str_replace($old_url, $replace, $json);
        }
        $new_val = json_decode($json, true);
        update_post_meta_by_mid($row->meta_id, $new_val);
        $total++;
    }
}

echo "\nTotal updated: $total\n";
echo "Done! All URLs now point to $replace\n";
