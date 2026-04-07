<?php
/**
 * Plugin Name: AIAIAI REST API Meta
 * Description: Registers all JetEngine meta fields for REST API exposure.
 * Version: 2.0.0
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
        // Check if stored value is a serialized array (repeater field)
        $sample = $wpdb->get_var($wpdb->prepare(
            "SELECT meta_value FROM {$wpdb->postmeta} WHERE meta_key = %s LIMIT 1", $key
        ));
        $is_array = is_serialized($sample) && is_array(maybe_unserialize($sample));

        if ($is_array) {
            register_post_meta('page', $key, [
                'show_in_rest' => [
                    'schema' => [
                        'type'  => 'array',
                        'items' => ['type' => 'object', 'additionalProperties' => true],
                    ],
                ],
                'single' => true,
                'type'   => 'array',
            ]);
        } else {
            register_post_meta('page', $key, [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
            ]);
        }
    }
}, 20);
