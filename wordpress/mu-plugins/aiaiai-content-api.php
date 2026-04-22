<?php
/**
 * Plugin Name: AIAIAI Core
 * Description: Auto-creates pages, Deploy button, and REST API meta registration.
 * Version: 4.0.0
 */

defined('ABSPATH') || exit;

/* ================================================================== */
/*  Auto-sync: import wp-meta-sync.json into WP on first load          */
/*  This seeds all page meta from the git-tracked JSON export.         */
/*  Only runs once per deploy (uses a version hash to detect changes). */
/* ================================================================== */
add_action('admin_init', function () {
    // Find the JSON file relative to this mu-plugin
    $json_paths = [
        dirname(ABSPATH) . '/web-aiaiai/wordpress/wp-meta-sync.json',   // server: ~/web-aiaiai/
        dirname(__DIR__, 2) . '/wordpress/wp-meta-sync.json',            // relative to mu-plugins
        dirname(__DIR__, 2) . '/wp-meta-sync.json',                      // fallback
    ];
    $json_file = null;
    foreach ($json_paths as $p) {
        if (file_exists($p)) { $json_file = $p; break; }
    }
    if (!$json_file) return;

    // Check if this version was already imported
    $hash = md5_file($json_file);
    if (get_option('aiaiai_sync_hash') === $hash) return;

    $data = json_decode(file_get_contents($json_file), true);
    if (!$data || !is_array($data)) return;

    $count = 0;
    foreach ($data as $slug => $meta) {
        $page = get_page_by_path($slug);
        if (!$page) continue;
        $pid = $page->ID;
        foreach ($meta as $key => $value) {
            $current = get_post_meta($pid, $key, true);
            $is_empty = ($current === '' || $current === null || $current === false);

            // Case 1: field is empty → just set it
            if ($is_empty) {
                update_post_meta($pid, $key, wp_slash($value));
                $count++;
                continue;
            }

            // Case 2: both are arrays (repeater) → merge missing sub-fields
            if (is_array($current) && is_array($value)) {
                $merged = $current;
                $changed = false;
                foreach ($value as $item_key => $item_value) {
                    if (!isset($merged[$item_key])) {
                        // New item — add it
                        $merged[$item_key] = $item_value;
                        $changed = true;
                    } elseif (is_array($item_value) && is_array($merged[$item_key])) {
                        // Merge missing sub-fields (e.g. feature_image_1 inside robot)
                        foreach ($item_value as $sub_key => $sub_value) {
                            $existing_sub = $merged[$item_key][$sub_key] ?? null;
                            if ($existing_sub === null || $existing_sub === '' || $existing_sub === false) {
                                $merged[$item_key][$sub_key] = $sub_value;
                                $changed = true;
                            }
                        }
                    }
                }
                if ($changed) {
                    update_post_meta($pid, $key, $merged);
                    $count++;
                }
            }
            // Case 3: scalar field with data → skip (don't overwrite user edits)
        }
    }

    // Only mark this JSON version as imported if something actually got
    // imported — otherwise admin visits before pages exist would lock out
    // future syncs with a stored hash and zero work done.
    if ($count > 0) {
        update_option('aiaiai_sync_hash', $hash);
        error_log("[AIAIAI] Auto-synced $count empty fields from wp-meta-sync.json");
    }
}, 1);

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

/* ── AJAX proxy: trigger rebuild from server-side ── */
add_action('wp_ajax_aiaiai_deploy_trigger', function () {
    if (!current_user_can('manage_options')) wp_send_json_error('Forbidden', 403);
    $url = defined('AIAIAI_WEBHOOK_URL') ? AIAIAI_WEBHOOK_URL : 'http://127.0.0.1:9001/rebuild';
    $headers = ['Content-Type' => 'application/json'];
    if (defined('AIAIAI_REVALIDATE_SECRET') && AIAIAI_REVALIDATE_SECRET) {
        $headers['x-revalidate-secret'] = AIAIAI_REVALIDATE_SECRET;
    }
    $res = wp_remote_post($url, ['timeout' => 5, 'body' => wp_json_encode(['trigger' => 'wordpress', 'user' => wp_get_current_user()->user_login]), 'headers' => $headers]);
    if (is_wp_error($res)) wp_send_json_error($res->get_error_message());
    wp_send_json_success(json_decode(wp_remote_retrieve_body($res), true));
});

add_action('wp_ajax_aiaiai_deploy_health', function () {
    if (!current_user_can('manage_options')) wp_send_json_error('Forbidden', 403);
    $url = defined('AIAIAI_WEBHOOK_URL') ? AIAIAI_WEBHOOK_URL : 'http://127.0.0.1:9001/rebuild';
    // Legacy webhook endpoints expose /rebuild + /health; Next.js revalidate
    // endpoint is GETtable on the same URL. Swap /rebuild→/health for legacy;
    // leave other paths (e.g. /api/revalidate) unchanged.
    $health_url = preg_replace('#/rebuild$#', '/health', $url);
    $res = wp_remote_get($health_url, ['timeout' => 5]);
    if (is_wp_error($res)) wp_send_json_error($res->get_error_message());
    wp_send_json_success(json_decode(wp_remote_retrieve_body($res), true));
});

function aiaiai_render_deploy() {
    $webhook_url = admin_url('admin-ajax.php?action=aiaiai_deploy_trigger&_wpnonce=' . wp_create_nonce('aiaiai_deploy_trigger'));
    $health_url  = admin_url('admin-ajax.php?action=aiaiai_deploy_health&_wpnonce=' . wp_create_nonce('aiaiai_deploy_health'));
    $site_url    = 'https://aiaiai.decorear.com';

    echo '<div class="wrap">';
    echo '<h1>Deploy Static Site</h1>';
    echo '<div id="deploy-card" style="max-width:600px;margin-top:20px;padding:30px;background:#fff;border:1px solid #ccd0d4;border-radius:8px;">';
    echo '<h2 style="margin-top:0;">Rebuild &amp; Deploy</h2>';
    echo '<p>Click the button below to rebuild the static site with the latest content.</p>';
    echo '<p style="color:#666;">This will:</p>';
    echo '<ol style="color:#666;">';
    echo '<li>Pull latest code from GitHub</li>';
    echo '<li>Build static HTML (fetches current WP content)</li>';
    echo '<li>Deploy to <strong>aiaiai.decorear.com</strong></li>';
    echo '</ol>';
    echo '<button id="deploy-btn" class="button button-primary button-hero" style="font-size:18px;padding:10px 40px;">';
    echo '<span class="dashicons dashicons-upload" style="margin-top:4px;margin-right:8px;"></span> Deploy Now';
    echo '</button>';
    echo '</div>';

    // Modal overlay
    echo '<div id="deploy-modal" style="display:none;position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,0.5);align-items:center;justify-content:center;">';
    echo '<div style="background:#fff;border-radius:16px;padding:48px;text-align:center;max-width:420px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">';
    // Spinner
    echo '<div id="deploy-spinner" style="margin:0 auto 24px;width:80px;height:80px;border-radius:50%;background:#f0f4ff;display:flex;align-items:center;justify-content:center;">';
    echo '<div style="width:40px;height:40px;border:3px solid #e0e7ff;border-top-color:#4A99F5;border-radius:50%;animation:deploy-spin 1s linear infinite;"></div>';
    echo '</div>';
    // Success icon (hidden)
    echo '<div id="deploy-success-icon" style="display:none;margin:0 auto 24px;width:80px;height:80px;border-radius:50%;background:#ecfdf5;align-items:center;justify-content:center;">';
    echo '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    echo '</div>';
    // Error icon (hidden)
    echo '<div id="deploy-error-icon" style="display:none;margin:0 auto 24px;width:80px;height:80px;border-radius:50%;background:#fef2f2;align-items:center;justify-content:center;">';
    echo '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/></svg>';
    echo '</div>';
    echo '<h3 id="deploy-title" style="margin:0 0 8px;font-size:24px;font-weight:600;">กำลัง Deploy...</h3>';
    echo '<p id="deploy-status" style="color:#888;margin:0 0 24px;">กำลัง build. (~9s)</p>';
    // Progress bar
    echo '<div style="background:#e5e7eb;border-radius:99px;height:10px;overflow:hidden;margin-bottom:8px;">';
    echo '<div id="deploy-bar" style="height:100%;width:0%;background:#4A99F5;border-radius:99px;transition:width 0.5s ease;"></div>';
    echo '</div>';
    echo '<p id="deploy-percent" style="text-align:right;color:#888;font-size:14px;margin:0 0 16px;">0%</p>';
    // Buttons (hidden initially)
    echo '<div id="deploy-actions" style="display:none;gap:12px;justify-content:center;">';
    echo '<a id="deploy-view-btn" href="' . esc_url($site_url) . '" target="_blank" style="display:inline-block;padding:12px 32px;background:#10b981;color:#fff;border-radius:8px;text-decoration:none;font-size:16px;font-weight:500;">ดูเว็บไซต์</a>';
    echo '<button id="deploy-close-btn" style="padding:12px 32px;background:#f3f4f6;color:#333;border:none;border-radius:8px;font-size:16px;cursor:pointer;">ปิด</button>';
    echo '</div>';
    echo '</div></div>';

    echo '<style>@keyframes deploy-spin{to{transform:rotate(360deg)}}</style>';

    // JavaScript
    echo '<script>';
    echo 'document.addEventListener("DOMContentLoaded",function(){';
    echo '  var btn=document.getElementById("deploy-btn"),modal=document.getElementById("deploy-modal");';
    echo '  var bar=document.getElementById("deploy-bar"),pct=document.getElementById("deploy-percent");';
    echo '  var title=document.getElementById("deploy-title"),status=document.getElementById("deploy-status");';
    echo '  var spinner=document.getElementById("deploy-spinner"),successIcon=document.getElementById("deploy-success-icon");';
    echo '  var errorIcon=document.getElementById("deploy-error-icon"),actions=document.getElementById("deploy-actions");';
    echo '  var closeBtn=document.getElementById("deploy-close-btn");';
    echo '  var webhookUrl=' . json_encode($webhook_url) . ',healthUrl=' . json_encode($health_url) . ';';
    echo '  var progress=0,pollTimer=null,progressTimer=null,startTime=0;';
    echo '  btn.addEventListener("click",function(){';
    echo '    modal.style.display="flex";progress=0;startTime=Date.now();';
    echo '    spinner.style.display="flex";successIcon.style.display="none";errorIcon.style.display="none";';
    echo '    actions.style.display="none";bar.style.background="#4A99F5";';
    echo '    title.textContent="กำลัง Deploy...";status.textContent="กำลัง build...";';
    echo '    bar.style.width="5%";pct.textContent="5%";';
    // Trigger webhook via WP AJAX (server-side proxy)
    echo '    fetch(webhookUrl,{method:"POST",credentials:"same-origin"}).catch(function(){});';
    // Animate progress
    echo '    progressTimer=setInterval(function(){';
    echo '      if(progress<85){progress+=Math.random()*3+0.5;if(progress>85)progress=85;}';
    echo '      var elapsed=Math.round((Date.now()-startTime)/1000);';
    echo '      status.textContent="กำลัง build. (~"+elapsed+"s)";';
    echo '      bar.style.width=Math.round(progress)+"%";pct.textContent=Math.round(progress)+"%";';
    echo '    },500);';
    // Poll health endpoint
    echo '    setTimeout(function(){pollBuild();},3000);';
    echo '  });';
    echo '  function pollBuild(){';
    echo '    fetch(healthUrl,{credentials:"same-origin"}).then(function(r){return r.json();}).then(function(d){';
    echo '      var h=d.data||d;';
    echo '      if(h.building){pollTimer=setTimeout(pollBuild,3000);}';
    echo '      else{deployDone(true);}';
    echo '    }).catch(function(){pollTimer=setTimeout(pollBuild,5000);});';
    echo '  }';
    echo '  function deployDone(ok){';
    echo '    clearInterval(progressTimer);';
    echo '    bar.style.width="100%";pct.textContent="100%";';
    echo '    spinner.style.display="none";';
    echo '    if(ok){';
    echo '      bar.style.background="#10b981";';
    echo '      successIcon.style.display="flex";';
    echo '      title.textContent="Deploy สำเร็จ!";status.textContent="เว็บไซต์อัปเดตเรียบร้อยแล้ว";';
    echo '    }else{';
    echo '      bar.style.background="#ef4444";';
    echo '      errorIcon.style.display="flex";';
    echo '      title.textContent="Deploy ล้มเหลว";status.textContent="กรุณาลองอีกครั้ง";';
    echo '    }';
    echo '    actions.style.display="flex";';
    echo '  }';
    echo '  closeBtn.addEventListener("click",function(){modal.style.display="none";});';
    echo '});';
    echo '</script>';

    echo '</div>';
}

/* ================================================================== */
/*  Footer Settings meta box on Home page                              */
/* ================================================================== */

/* Auto-seed footer defaults if empty */
add_action('admin_init', function () {
    if (get_option('aiaiai_footer_seeded')) return;
    $home = get_page_by_path('home');
    if (!$home) return;
    $pid = $home->ID;
    $defaults = [
        'home_footer_email_label' => 'info@ai-ai-ai.co',
        'home_footer_email_url'   => 'mailto:info@ai-ai-ai.co',
        'home_footer_phone_label' => '(66) 82 335 2444',
        'home_footer_phone_url'   => 'tel:+66823352444',
        'home_footer_line_label'  => 'Contact us via LINE',
        'home_footer_line_url'    => '',
        'home_footer_copyright'   => '© 2026 AI-AI-AI Co., Ltd. All rights reserved. | Powered by Decorear',
    ];
    foreach ($defaults as $k => $v) {
        if (!get_post_meta($pid, $k, true)) {
            update_post_meta($pid, $k, $v);
        }
    }
    update_option('aiaiai_footer_seeded', 1);
}, 5);

$aiaiai_footer_fields = [
    ['key' => 'home_footer_email_label', 'label' => 'Email — Label',     'type' => 'text', 'placeholder' => 'info@ai-ai-ai.co'],
    ['key' => 'home_footer_email_url',   'label' => 'Email — Link',      'type' => 'text', 'placeholder' => 'mailto:info@ai-ai-ai.co'],
    ['key' => 'home_footer_phone_label', 'label' => 'Phone — Label',     'type' => 'text', 'placeholder' => '(66) 82 335 2444'],
    ['key' => 'home_footer_phone_url',   'label' => 'Phone — Link',      'type' => 'text', 'placeholder' => 'tel:+66823352444'],
    ['key' => 'home_footer_line_label',  'label' => 'LINE — Label',      'type' => 'text', 'placeholder' => 'Contact us via LINE'],
    ['key' => 'home_footer_line_url',    'label' => 'LINE — Link',       'type' => 'url',  'placeholder' => 'https://line.me/ti/p/xxx'],
    ['key' => 'home_footer_copyright',   'label' => 'Copyright Text',    'type' => 'text', 'placeholder' => '© 2026 AI-AI-AI Co., Ltd. All rights reserved.'],
];

add_action('add_meta_boxes', function () {
    $home = get_page_by_path('home');
    if (!$home) return;
    add_meta_box('aiaiai-footer-settings', 'Footer Settings', 'aiaiai_render_footer_meta_box', 'page', 'normal', 'default');
});

function aiaiai_render_footer_meta_box($post) {
    global $aiaiai_footer_fields;
    $home = get_page_by_path('home');
    if (!$home || $post->ID !== $home->ID) {
        echo '<p style="color:#999;">This meta box only applies to the Home page.</p>';
        return;
    }
    wp_nonce_field('aiaiai_footer_meta', '_aiaiai_footer_nonce');
    echo '<table class="form-table"><tbody>';
    foreach ($aiaiai_footer_fields as $f) {
        $val = get_post_meta($post->ID, $f['key'], true);
        echo '<tr><th><label for="' . esc_attr($f['key']) . '">' . esc_html($f['label']) . '</label></th>';
        echo '<td><input type="' . esc_attr($f['type']) . '" id="' . esc_attr($f['key']) . '" name="' . esc_attr($f['key']) . '" value="' . esc_attr($val) . '" placeholder="' . esc_attr($f['placeholder']) . '" class="regular-text" style="width:100%;max-width:500px;" /></td></tr>';
    }
    echo '</tbody></table>';
}

add_action('save_post_page', function ($post_id) {
    global $aiaiai_footer_fields;
    if (!isset($_POST['_aiaiai_footer_nonce']) || !wp_verify_nonce($_POST['_aiaiai_footer_nonce'], 'aiaiai_footer_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    foreach ($aiaiai_footer_fields as $f) {
        if (isset($_POST[$f['key']])) {
            update_post_meta($post_id, $f['key'], sanitize_text_field(wp_unslash($_POST[$f['key']])));
        }
    }
});

/* ================================================================== */
/*  Robot Features Editor (textarea per robot) on Humanoid page        */
/* ================================================================== */

$aiaiai_robot_names = ['AGIBOT X2 ULTRA', 'AGIBOT D1 EDU', 'A2 ULTRA', 'AGIBOT G2'];

add_action('add_meta_boxes', function () {
    $hum = get_page_by_path('humanoid');
    if (!$hum) return;
    add_meta_box(
        'aiaiai-robot-features',
        'Robot Features',
        'aiaiai_render_robot_features_meta_box',
        'page',
        'normal',
        'high'
    );
});

function aiaiai_render_robot_features_meta_box($post) {
    global $aiaiai_robot_names;
    $hum = get_page_by_path('humanoid');
    if (!$hum || $post->ID !== $hum->ID) {
        echo '<p style="color:#999;">This meta box only applies to the Humanoid page.</p>';
        return;
    }

    wp_nonce_field('aiaiai_robot_features', '_aiaiai_robot_features_nonce');

    echo '<div style="background:#f0f6ff;padding:12px 16px;border-radius:6px;margin-bottom:16px;border:1px solid #c3d9f7;">';
    echo '<strong>Format:</strong> Use <code>## Heading</code> for feature titles, and <code>- item</code> for list items.<br>';
    echo '<pre style="background:#fff;padding:8px;border-radius:4px;margin:8px 0 0;font-size:13px;">## Entertainment &amp; Commercial Performance
- Supports TikTok dancing, drumming
- Enables group performances

## Automatic Presentation &amp; Interaction
- Welcomes guests and guides visitors</pre>';
    echo '</div>';

    $robots = maybe_unserialize(get_post_meta($post->ID, 'hum_robots', true));
    if (!is_array($robots)) return;

    $i = 0;
    foreach ($robots as $key => $r) {
        $name = $r['name'] ?? ($aiaiai_robot_names[$i] ?? "Robot $i");
        // Read from SEPARATE meta key (not inside repeater)
        $meta_key = "hum_robot_{$i}_features";
        $features_raw = get_post_meta($post->ID, $meta_key, true);

        $field_id = "robot_features_$i";
        echo '<h3 style="margin:20px 0 8px;padding-top:16px;border-top:1px solid #ddd;font-size:16px;">' . esc_html($name) . '</h3>';
        echo '<textarea name="' . esc_attr($field_id) . '" id="' . esc_attr($field_id) . '" rows="10" style="width:100%;font-family:monospace;font-size:14px;padding:10px;">' . esc_textarea($features_raw) . '</textarea>';
        $i++;
    }
}

// Save features as SEPARATE meta keys (not inside repeater — JetEngine can't overwrite)
add_action('save_post_page', function ($post_id) {
    if (!isset($_POST['_aiaiai_robot_features_nonce']) ||
        !wp_verify_nonce($_POST['_aiaiai_robot_features_nonce'], 'aiaiai_robot_features')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $robots = maybe_unserialize(get_post_meta($post_id, 'hum_robots', true));
    if (!is_array($robots)) return;

    $i = 0;
    foreach ($robots as $key => $r) {
        $field_id = "robot_features_$i";
        if (isset($_POST[$field_id])) {
            $meta_key = "hum_robot_{$i}_features";
            update_post_meta($post_id, $meta_key, sanitize_textarea_field(wp_unslash($_POST[$field_id])));
        }
        $i++;
    }
});
