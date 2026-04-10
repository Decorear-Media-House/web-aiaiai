<?php
/**
 * Plugin Name: AIAIAI REST API Meta
 * Description: Registers all JetEngine meta fields for REST API exposure.
 * Version: 4.0.0
 */

defined('ABSPATH') || exit;

// Register all page meta fields with correct types for REST API
add_action('init', function () {
    global $wpdb;

    $prefixes = ['home_', 'about_', 'svc_', 'sec_', 'hum_', 'ptr_'];
    $like_clauses = array_map(function ($p) use ($wpdb) {
        return $wpdb->prepare("meta_key LIKE %s", $p . '%');
    }, $prefixes);

    $sql = "SELECT DISTINCT meta_key FROM {$wpdb->postmeta} WHERE " . implode(' OR ', $like_clauses);
    $keys = $wpdb->get_col($sql);

    foreach ($keys as $key) {
        $sample = $wpdb->get_var($wpdb->prepare(
            "SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_key = %s LIMIT 1", $key
        ));
        $is_array = is_serialized($sample) && is_array(maybe_unserialize($sample));

        register_post_meta('page', $key, [
            'show_in_rest'  => $is_array ? [
                'schema' => ['type' => 'array', 'items' => ['type' => 'object', 'additionalProperties' => true]],
                'prepare_callback' => function ($value) {
                    return is_array($value) ? array_values($value) : $value;
                },
            ] : true,
            'single'        => true,
            'type'          => $is_array ? 'array' : 'string',
            'auth_callback' => '__return_true',
        ]);
    }
}, 20);

// Mark all prefixed meta as protected — hides from Gutenberg "Custom Fields" panel
add_filter('is_protected_meta', function ($protected, $meta_key) {
    $prefixes = ['home_', 'about_', 'svc_', 'sec_', 'hum_', 'ptr_'];
    foreach ($prefixes as $p) {
        if (strpos($meta_key, $p) === 0) return true;
    }
    return $protected;
}, 10, 2);

// Remove default custom fields meta box
add_action('add_meta_boxes', function () {
    remove_meta_box('postcustom', 'page', 'normal');
}, 999);

// Hide JetEngine meta boxes that don't belong to the current page
add_action('add_meta_boxes', function () {
    global $post;
    if (!$post || $post->post_type !== 'page') return;

    $slug = $post->post_name;
    $prefix_map = [
        'home'     => 'home_',
        'about'    => 'about_',
        'services' => 'svc_',
        'security' => 'sec_',
        'humanoid' => 'hum_',
        'partner'  => 'ptr_',
    ];

    $my_prefix = $prefix_map[$slug] ?? '';
    if (!$my_prefix) return;

    $raw = get_option('jet_engine_meta_boxes', []);
    foreach ($raw as $id => $mb) {
        // Check if this meta box's fields start with a different prefix
        $fields = $mb['meta_fields'] ?? [];
        if (empty($fields)) continue;

        $first_field_name = $fields[0]['name'] ?? '';
        if (!$first_field_name) continue;

        // If the first field doesn't start with our prefix, hide this meta box
        $belongs_to_us = strpos($first_field_name, $my_prefix) === 0;
        if (!$belongs_to_us) {
            remove_meta_box($id, 'page', 'normal');
            remove_meta_box($id, 'page', 'side');
            remove_meta_box($id, 'page', 'advanced');
        }
    }
}, 100);
