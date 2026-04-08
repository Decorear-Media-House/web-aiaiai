<?php
/**
 * Plugin Name: AIAIAI Meta Box Fix
 * Description: Ensures JetEngine meta boxes only show on their assigned pages.
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

/**
 * Fix meta boxes: ensure active_conditions + allowed_posts are set correctly.
 * Runs once on admin_init, stores a version flag to avoid re-running.
 */
add_action('admin_init', function () {
    $fix_version = '1.0.3';
    if (get_option('aiaiai_metabox_fix_version') === $fix_version) {
        return; // Already fixed
    }

    $boxes = get_option('jet_engine_meta_boxes', []);
    if (empty($boxes)) return;

    // Page slug => ID mapping
    $page_map = [];
    foreach (['home', 'about', 'services', 'partner', 'humanoid', 'security'] as $slug) {
        $p = get_page_by_path($slug);
        if ($p) $page_map[$slug] = $p->ID;
    }

    // Meta box ID prefix => page slug
    $prefix_to_page = [
        'home-'  => 'home',
        'about-' => 'about',
        'svc-'   => 'services',
        'ptr-'   => 'partner',
        'hum-'   => 'humanoid',
        'sec-'   => 'security',
    ];

    $fixed = 0;
    foreach ($boxes as $id => &$box) {
        // Determine which page this meta box belongs to
        $target_page = null;
        foreach ($prefix_to_page as $prefix => $slug) {
            if (strpos($id, $prefix) === 0 && isset($page_map[$slug])) {
                $target_page = $page_map[$slug];
                break;
            }
        }

        if (!$target_page) continue;

        $args = &$box['args'];
        $args['active_conditions'] = ['allowed_posts'];
        $args['allowed_posts'] = [strval($target_page)];
        // Remove wrong key if exists
        unset($args['allowed_pages']);
        $fixed++;
    }
    unset($box, $args);

    if ($fixed > 0) {
        update_option('jet_engine_meta_boxes', $boxes);
    }

    update_option('aiaiai_metabox_fix_version', $fix_version);
}, 5);
