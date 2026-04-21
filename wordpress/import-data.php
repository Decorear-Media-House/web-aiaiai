<?php
/**
 * Import page data from export-data.json to WordPress.
 *
 * Preferred low-code import path:
 * - restores legacy page_sections for backward compatibility
 * - restores JetEngine meta field values used by wp-admin edit screens
 * - imports blog posts and categories
 *
 * URL behavior:
 * - local Docker defaults to the current WordPress home URL
 * - production can set WP_IMPORT_URL or PROD_URL, for example:
 *   PROD_URL=https://cms.example.com wp --allow-root eval-file import-data.php
 */

$json_file = dirname(__FILE__) . '/export-data.json';
if (!file_exists($json_file)) {
    echo "export-data.json not found!\n";
    exit(1);
}

$export = json_decode(file_get_contents($json_file), true);
if (!is_array($export)) {
    echo "export-data.json is invalid!\n";
    exit(1);
}

// Normalize exported local/production URLs to the target site.
$target_url = getenv('WP_IMPORT_URL') ?: getenv('PROD_URL') ?: home_url();
$source_urls = [
    'http://localhost:8080',
    'http://aiaiai-wordpress:80',
    'http://aiaiai-wordpress',
    'https://aiaiai-cms.decorear.com',
];

function fix_url($val, $target_url, $source_urls) {
    if (is_string($val)) {
        return str_replace($source_urls, $target_url, $val);
    }

    if (is_array($val)) {
        foreach ($val as $k => $v) {
            $val[$k] = fix_url($v, $target_url, $source_urls);
        }
    }

    return $val;
}

function find_attachment_id_by_url($url) {
    if (!$url) return 0;

    $attachment_id = attachment_url_to_postid($url);
    if ($attachment_id) return $attachment_id;

    $filename = basename(parse_url($url, PHP_URL_PATH) ?: $url);
    if (!$filename) return 0;

    $matches = get_posts([
        'post_type' => 'attachment',
        'post_status' => 'inherit',
        'meta_query' => [[
            'key' => '_wp_attached_file',
            'value' => $filename,
            'compare' => 'LIKE',
        ]],
        'posts_per_page' => 1,
        'fields' => 'ids',
    ]);

    return $matches ? (int) $matches[0] : 0;
}

function set_featured_image_from_url($post_id, $url, $target_url, $source_urls) {
    $url = fix_url($url, $target_url, $source_urls);
    $attachment_id = find_attachment_id_by_url($url);
    if (!$attachment_id) {
        echo "  Featured image not found for post $post_id: $url\n";
        return;
    }

    set_post_thumbnail($post_id, $attachment_id);
    echo "  Featured image set for post $post_id: attachment $attachment_id\n";
}

echo "Target URL: $target_url\n";

// Import categories.
$cats = $export['_categories'] ?? [];
foreach ($cats as $cat) {
    if (!term_exists($cat['name'], 'category')) {
        wp_insert_term($cat['name'], 'category', ['slug' => $cat['slug']]);
        echo "Created category: {$cat['name']}\n";
    }
}

// Import blog posts.
$posts = $export['_blog_posts'] ?? [];
foreach ($posts as $post_data) {
    $existing = get_page_by_title($post_data['title'], OBJECT, 'post');
    if ($existing) {
        echo "Post exists: {$post_data['title']}\n";
        if (!empty($post_data['featured_image'])) {
            set_featured_image_from_url($existing->ID, $post_data['featured_image'], $target_url, $source_urls);
        }
        continue;
    }

    $cat_ids = [];
    foreach (($post_data['categories'] ?? []) as $cat_name) {
        $cat = get_term_by('name', $cat_name, 'category');
        if ($cat) $cat_ids[] = $cat->term_id;
    }

    $post_id = wp_insert_post([
        'post_title' => $post_data['title'],
        'post_name' => $post_data['slug'] ?? '',
        'post_content' => $post_data['content'] ?? '',
        'post_excerpt' => $post_data['excerpt'] ?? '',
        'post_status' => 'publish',
        'post_type' => 'post',
        'post_category' => $cat_ids,
        'post_date' => $post_data['date'] ?? current_time('mysql'),
    ]);

    if ($post_id && !is_wp_error($post_id)) {
        echo "Created post: {$post_data['title']} (ID: $post_id)\n";
        if (!empty($post_data['featured_image'])) {
            set_featured_image_from_url($post_id, $post_data['featured_image'], $target_url, $source_urls);
        }
    }
}

// Import pages and their editable low-code fields.
$page_slugs = ['home', 'about', 'services', 'partner', 'humanoid', 'security'];
foreach ($page_slugs as $slug) {
    $data = $export[$slug] ?? null;
    if (!$data) continue;

    $page = get_page_by_path($slug);
    if (!$page) {
        $pid = wp_insert_post([
            'post_title' => ucfirst($slug),
            'post_name' => $slug,
            'post_status' => 'publish',
            'post_type' => 'page',
        ]);
        echo "$slug: CREATED page (ID $pid)\n";
    } else {
        $pid = $page->ID;
    }

    $ps = $data['page_sections'] ?? '';
    if ($ps) {
        $ps = fix_url($ps, $target_url, $source_urls);
        update_post_meta($pid, 'page_sections', wp_slash($ps));
    }

    $jet = $data['jet_fields'] ?? [];
    $count = 0;
    foreach ($jet as $key => $val) {
        $val = fix_url($val, $target_url, $source_urls);
        if (is_array($val)) {
            update_post_meta($pid, $key, array_values($val));
        } else {
            update_post_meta($pid, $key, $val);
        }
        $count++;
    }

    echo "$slug (ID $pid): page_sections=" . strlen($ps) . " chars, jet=$count fields\n";
}

echo "\nImport complete!\n";
