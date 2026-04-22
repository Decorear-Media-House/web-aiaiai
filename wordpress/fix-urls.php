<?php
/**
 * Replace localhost URLs with production URLs in all postmeta.
 * Run via: wp --allow-root eval-file fix-urls.php
 */

global $wpdb;

// Replacement URL: PROD_URL env override (deploy.sh / external scripts) →
// WP_HOME (set from WP_DOMAIN/.env.prod by docker-compose) → bail if neither.
$replace = getenv('PROD_URL') ?: rtrim(get_option('home', ''), '/');
if (!$replace) {
    echo "fix-urls.php: no PROD_URL or WP_HOME set; aborting (nothing to rewrite to)\n";
    return;
}

$search = [
    'http://localhost:8080',
    'http://aiaiai-wordpress:80',
    'http://aiaiai-wordpress',
    'https://aiaiai-cms.decorear.com',
    'http://aiaiai-cms.decorear.com',
];
$search = array_values(array_filter($search, fn($u) => $u !== $replace));

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
$where_parts = [];
$where_args  = [];
foreach ($search as $old_url) {
    $where_parts[] = 'meta_value LIKE %s';
    $where_args[]  = '%' . $wpdb->esc_like($old_url) . '%';
}
$where_sql = implode(' OR ', $where_parts);
$rows = $wpdb->get_results(
    $wpdb->prepare("SELECT meta_id, meta_value FROM {$wpdb->postmeta} WHERE $where_sql", $where_args)
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
