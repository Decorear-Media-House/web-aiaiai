<?php
/**
 * Import page data from export-data.json to WordPress.
 * Imports page_sections (legacy), JetEngine meta fields, blog posts, and categories.
 * Automatically replaces localhost URLs with production URLs.
 */

$json_file = dirname(__FILE__) . '/export-data.json';
if (!file_exists($json_file)) {
    echo "export-data.json not found!\n";
    exit(1);
}

$export = json_decode(file_get_contents($json_file), true);

// ── URL replacement ──
$prod_url = 'https://aiaiai-cms.decorear.com';
function fix_url($val, $prod_url) {
    if (is_string($val)) {
        $val = str_replace('http://localhost:8080', $prod_url, $val);
        $val = str_replace('http://aiaiai-wordpress:80', $prod_url, $val);
        $val = str_replace('http://aiaiai-wordpress', $prod_url, $val);
    } elseif (is_array($val)) {
        foreach ($val as $k => $v) {
            $val[$k] = fix_url($v, $prod_url);
        }
    }
    return $val;
}

// ── Import categories ──
$cats = $export['_categories'] ?? [];
foreach ($cats as $cat) {
    if (!term_exists($cat['name'], 'category')) {
        wp_insert_term($cat['name'], 'category', ['slug' => $cat['slug']]);
        echo "Created category: {$cat['name']}\n";
    }
}

// ── Import blog posts ──
$posts = $export['_blog_posts'] ?? [];
foreach ($posts as $post_data) {
    $existing = get_page_by_title($post_data['title'], OBJECT, 'post');
    if ($existing) {
        echo "Post exists: {$post_data['title']}\n";
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
    }
}

// ── Import pages ──
$page_slugs = ['home', 'about', 'services', 'partner', 'humanoid', 'security'];
foreach ($page_slugs as $slug) {
    $data = $export[$slug] ?? null;
    if (!$data) continue;

    $page = get_page_by_path($slug);
    if (!$page) {
        // Create page if not exists
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

    // Import page_sections (legacy) with URL fix
    $ps = $data['page_sections'] ?? '';
    if ($ps) {
        $ps = fix_url($ps, $prod_url);
        update_post_meta($pid, 'page_sections', wp_slash($ps));
    }

    // Import JetEngine fields with URL fix
    $jet = $data['jet_fields'] ?? [];
    $count = 0;
    foreach ($jet as $key => $val) {
        $val = fix_url($val, $prod_url);
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
