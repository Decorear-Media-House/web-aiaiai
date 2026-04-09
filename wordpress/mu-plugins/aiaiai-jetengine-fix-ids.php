<?php
/**
 * Plugin Name: AIAIAI JetEngine Fix IDs
 * Description: Auto-fixes JetEngine meta box allowed_posts IDs based on page slugs.
 *              This ensures meta boxes work correctly on any environment regardless of page IDs.
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Map: meta box key prefix → page slug
 */
function aiaiai_get_slug_map(): array {
    return [
        'home'  => 'home',
        'about' => 'about',
        'svc'   => 'services',
        'ptr'   => 'partner',
        'hum'   => 'humanoid',
        'sec'   => 'security',
    ];
}

/**
 * On admin_init, check if JetEngine meta box allowed_posts need updating.
 * Runs once per page load, only in admin.
 */
add_action('admin_init', function () {
    $meta_boxes = get_option('jet_engine_meta_boxes');
    if (!is_array($meta_boxes) || empty($meta_boxes)) return;

    $slug_map = aiaiai_get_slug_map();
    $changed = false;

    // Build slug → ID lookup
    $slug_to_id = [];
    foreach ($slug_map as $prefix => $slug) {
        $page = get_page_by_path($slug);
        if ($page) {
            $slug_to_id[$prefix] = (string) $page->ID;
        }
    }

    foreach ($meta_boxes as $key => &$box) {
        // Determine which prefix this meta box belongs to
        $prefix = explode('-', $key)[0];
        if (!isset($slug_to_id[$prefix])) continue;

        $correct_id = $slug_to_id[$prefix];
        $current_posts = $box['args']['allowed_posts'] ?? [];

        // Fix if ID doesn't match
        if (!in_array($correct_id, $current_posts, true) || count($current_posts) !== 1 || $current_posts[0] !== $correct_id) {
            $box['args']['allowed_posts'] = [$correct_id];
            $changed = true;
        }
    }
    unset($box);

    if ($changed) {
        update_option('jet_engine_meta_boxes', $meta_boxes);
    }
});
