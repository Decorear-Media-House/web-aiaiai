<?php
/**
 * Export all page meta (JetEngine fields + legacy page_sections) + blog posts to JSON.
 * Run via: wp --allow-root eval-file export-data.php
 */

require_once __DIR__ . '/seed-helpers.php';

$output = [];

// ── Export pages ──
$slugs = ['home', 'about', 'services', 'partner', 'humanoid', 'security'];
foreach ($slugs as $slug) {
    $page = get_page_by_path($slug);
    if (!$page) {
        echo "$slug: NOT FOUND\n";
        continue;
    }
    $pid = $page->ID;
    $all_meta = get_post_meta($pid);

    // Legacy page_sections
    $ps = $all_meta['page_sections'][0] ?? '';

    // JetEngine fields (prefixed)
    $prefixes = [
        'home' => 'home_',
        'about' => 'about_',
        'services' => 'svc_',
        'partner' => 'ptr_',
        'humanoid' => 'hum_',
        'security' => 'sec_',
    ];
    $prefix = $prefixes[$slug] ?? '';
    $jet = [];
    foreach ($all_meta as $key => $values) {
        if ($prefix && strpos($key, $prefix) === 0) {
            $val = $values[0] ?? '';
            $unserialized = maybe_unserialize($val);
            $jet[$key] = $unserialized;
        }
    }

    $output[$slug] = [
        'page_sections' => $ps,
        'jet_fields' => $jet,
    ];
    echo "$slug (ID $pid): page_sections=" . strlen($ps) . " chars, jet=" . count($jet) . " fields\n";
}

// ── Export blog posts ──
$rankmath_keys = aiaiai_rankmath_meta_keys();
$posts = get_posts(['numberposts' => -1, 'post_status' => 'publish']);
$blog_posts = [];
foreach ($posts as $post) {
    $cats = wp_get_post_categories($post->ID, ['fields' => 'names']);
    $tags = wp_get_post_tags($post->ID, ['fields' => 'names']);
    $thumb_id = get_post_thumbnail_id($post->ID);
    $thumb_url = $thumb_id ? wp_get_attachment_url($thumb_id) : '';

    $rm_meta = [];
    foreach ($rankmath_keys as $k) {
        $v = get_post_meta($post->ID, $k, true);
        if ($v !== '' && $v !== null) $rm_meta[$k] = $v;
    }

    $blog_posts[] = [
        'title' => $post->post_title,
        'slug' => $post->post_name,
        'content' => $post->post_content,
        'excerpt' => $post->post_excerpt,
        'categories' => $cats,
        'tags' => $tags,
        'featured_image' => $thumb_url,
        'featured_image_basename' => $thumb_url ? wp_basename($thumb_url) : '',
        'rankmath_meta' => $rm_meta,
        'date' => $post->post_date,
    ];
}
$output['_blog_posts'] = $blog_posts;

// ── Export categories ──
$categories = get_categories(['hide_empty' => false]);
$output['_categories'] = array_map(function($cat) {
    return ['name' => $cat->name, 'slug' => $cat->slug];
}, $categories);

// ── Export site-level options ──
// siteurl/home are pinned by WORDPRESS_CONFIG_EXTRA so they're skipped.
// nav_menu_locations skipped — term IDs aren't portable across installs.
// Rank Math settings groups are stored with hyphens (verified via wp_options
// dump); `rank_math_modules` is underscore. Both conventions coexist — keep them.
$option_keys = [
    'blogname', 'blogdescription',
    'permalink_structure', 'date_format', 'time_format', 'timezone_string',
    'start_of_week', 'posts_per_page', 'default_category',
    'custom_logo',
    'rank_math_modules',
    'rank-math-options-general',
    'rank-math-options-titles',
    'rank-math-options-sitemap',
    'rank-math-options-redirections',
    'rank-math-options-instant-indexing',
];
$exported_options = [];
foreach ($option_keys as $key) {
    $val = get_option($key);
    if ($val !== false && $val !== '') $exported_options[$key] = $val;
}

// Pair custom_logo with its filename — attachment IDs differ across installs.
if (!empty($exported_options['custom_logo'])) {
    $logo_url = wp_get_attachment_url((int) $exported_options['custom_logo']);
    if ($logo_url) $exported_options['_custom_logo_basename'] = wp_basename($logo_url);
}

// theme_mods are keyed by stylesheet slug — import remaps to the active theme.
$stylesheet = get_option('stylesheet');
if ($stylesheet) {
    $mods = get_option("theme_mods_{$stylesheet}");
    if ($mods !== false) {
        $exported_options["theme_mods_{$stylesheet}"] = $mods;
        $exported_options['_stylesheet'] = $stylesheet;
    }
}
$output['_options'] = $exported_options;
echo "options: " . count($exported_options) . " keys\n";

// Write JSON
$json_file = dirname(__FILE__) . '/export-data.json';
file_put_contents($json_file, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
echo "\nExported to $json_file (" . filesize($json_file) . " bytes)\n";
