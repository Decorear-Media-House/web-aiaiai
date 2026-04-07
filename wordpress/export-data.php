<?php
/**
 * Export all page meta (JetEngine fields + legacy page_sections) + blog posts to JSON.
 * Run via: wp --allow-root eval-file export-data.php
 */

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
$posts = get_posts(['numberposts' => -1, 'post_status' => 'publish']);
$blog_posts = [];
foreach ($posts as $post) {
    $cats = wp_get_post_categories($post->ID, ['fields' => 'names']);
    $tags = wp_get_post_tags($post->ID, ['fields' => 'names']);
    $thumb_id = get_post_thumbnail_id($post->ID);
    $thumb_url = $thumb_id ? wp_get_attachment_url($thumb_id) : '';

    $blog_posts[] = [
        'title' => $post->post_title,
        'slug' => $post->post_name,
        'content' => $post->post_content,
        'excerpt' => $post->post_excerpt,
        'categories' => $cats,
        'tags' => $tags,
        'featured_image' => $thumb_url,
        'date' => $post->post_date,
    ];
}
$output['_blog_posts'] = $blog_posts;

// ── Export categories ──
$categories = get_categories(['hide_empty' => false]);
$output['_categories'] = array_map(function($cat) {
    return ['name' => $cat->name, 'slug' => $cat->slug];
}, $categories);

// Write JSON
$json_file = dirname(__FILE__) . '/export-data.json';
file_put_contents($json_file, json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
echo "\nExported to $json_file (" . filesize($json_file) . " bytes)\n";
