<?php
/**
 * Plugin Name: AIAIAI Core
 * Description: Auto-creates pages, Deploy button, and REST API meta registration.
 * Version: 4.0.0
 */

defined('ABSPATH') || exit;

/* Disable Gutenberg starter patterns modal */
add_action('enqueue_block_editor_assets', function () {
    wp_add_inline_script('wp-block-editor', "wp.data && wp.data.dispatch('core/preferences')?.set('core/edit-post','isPatternModalDismissed',true);", 'after');
});

/* ================================================================== */
/*  1. Register meta fields for REST API                               */
/* ================================================================== */

add_action('init', function () {
    // Legacy page_sections field (backward compat)
    foreach (['page_sections', 'page_hero_image', 'page_og_image'] as $key) {
        register_post_meta('page', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'auth_callback' => fn() => current_user_can('edit_posts'),
        ]);
    }

    // RankMath SEO meta fields
    $rankmath_fields = [
        'rank_math_title', 'rank_math_description', 'rank_math_focus_keyword',
        'rank_math_robots', 'rank_math_facebook_title', 'rank_math_facebook_description',
        'rank_math_facebook_image', 'rank_math_twitter_title', 'rank_math_twitter_description',
        'rank_math_twitter_card_type',
    ];
    foreach ($rankmath_fields as $key) {
        register_post_meta('page', $key, ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
        register_post_meta('post', $key, ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
    }
});

/* ================================================================== */
/*  2. Auto-create default pages (runs once)                           */
/* ================================================================== */

add_action('init', function () {
    if (get_option('aiaiai_pages_created')) return;
    $pages = [
        'home'     => 'Home',
        'about'    => 'About Us',
        'services' => 'Services',
        'partner'  => 'AI Solution Partner',
        'humanoid' => 'AI-Enhanced Humanoid Robotics',
        'security' => 'AI Security Guard Solution',
    ];
    foreach ($pages as $slug => $title) {
        if (get_page_by_path($slug)) continue;
        wp_insert_post(['post_title' => $title, 'post_name' => $slug, 'post_status' => 'publish', 'post_type' => 'page']);
    }
    update_option('aiaiai_pages_created', true);
});

/* ================================================================== */
/*  3. Admin menu — Deploy button                                      */
/* ================================================================== */

add_action('admin_menu', function () {
    add_submenu_page(null, 'Deploy Site', 'Deploy Site', 'edit_pages', 'aiaiai-deploy', 'aiaiai_render_deploy');
});

// Add Deploy button to Admin Bar (top bar)
add_action('admin_bar_menu', function ($wp_admin_bar) {
    if (!current_user_can('edit_pages')) return;
    $wp_admin_bar->add_node([
        'id'    => 'aiaiai-deploy',
        'title' => '<span class="ab-icon dashicons dashicons-upload" style="margin-top:2px;"></span> Deploy Site',
        'href'  => admin_url('admin.php?page=aiaiai-deploy'),
        'meta'  => ['class' => 'aiaiai-deploy-btn'],
    ]);
}, 100);

// Style the button red/orange to stand out
add_action('admin_head', function () {
    echo '<style>
        #wp-admin-bar-aiaiai-deploy > a {
            background: #2D7AE8 !important;
            color: #fff !important;
            font-weight: 600 !important;
        }
        #wp-admin-bar-aiaiai-deploy > a:hover {
            background: #1A4494 !important;
        }
    </style>';
});

function aiaiai_render_deploy() {
    $webhook_url = defined('AIAIAI_WEBHOOK_URL') ? AIAIAI_WEBHOOK_URL : 'http://127.0.0.1:9000/rebuild';
    $result = '';

    if (isset($_POST['aiaiai_deploy']) && wp_verify_nonce($_POST['_aiaiai_deploy_nonce'] ?? '', 'aiaiai_deploy')) {
        $response = wp_remote_post($webhook_url, [
            'timeout' => 5,
            'body'    => json_encode(['trigger' => 'wordpress', 'user' => wp_get_current_user()->user_login]),
            'headers' => ['Content-Type' => 'application/json'],
        ]);
        if (is_wp_error($response)) {
            $result = '<div class="notice notice-error"><p>Deploy failed: ' . esc_html($response->get_error_message()) . '</p></div>';
        } else {
            $result = '<div class="notice notice-success"><p>Deploy triggered! Site will rebuild in 1-2 minutes.</p></div>';
        }
    }

    echo '<div class="wrap">';
    echo '<h1>Deploy Static Site</h1>';
    echo $result;
    echo '<div style="max-width:600px;margin-top:20px;padding:30px;background:#fff;border:1px solid #ccd0d4;border-radius:8px;">';
    echo '<h2 style="margin-top:0;">Rebuild & Deploy</h2>';
    echo '<p>Click the button below to rebuild the static site with the latest content.</p>';
    echo '<p style="color:#666;">This will:</p>';
    echo '<ol style="color:#666;">';
    echo '<li>Pull latest code from GitHub</li>';
    echo '<li>Build static HTML (fetches current WP content)</li>';
    echo '<li>Deploy to <strong>aiaiai.decorear.com</strong></li>';
    echo '</ol>';
    echo '<form method="post">';
    wp_nonce_field('aiaiai_deploy', '_aiaiai_deploy_nonce');
    echo '<button type="submit" name="aiaiai_deploy" value="1" class="button button-primary button-hero" style="font-size:18px;padding:10px 40px;">';
    echo '<span class="dashicons dashicons-upload" style="margin-top:4px;margin-right:8px;"></span> Deploy Now';
    echo '</button>';
    echo '</form>';
    echo '</div></div>';
}
