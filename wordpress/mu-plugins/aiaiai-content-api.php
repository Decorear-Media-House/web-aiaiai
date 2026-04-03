<?php
/**
 * Plugin Name: AIAIAI Content API
 * Description: Visual content editor for AIAIAI website with rich text editing and image uploads.
 * Version: 3.0.0
 */

defined('ABSPATH') || exit;

/* ================================================================== */
/*  1. Register meta fields for REST API                               */
/* ================================================================== */

add_action('init', function () {
    foreach (['page_sections', 'page_hero_image', 'page_og_image'] as $key) {
        register_post_meta('page', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'auth_callback' => fn() => current_user_can('edit_posts'),
        ]);
    }

    // Expose RankMath SEO meta fields in REST API (read-only for frontend)
    $rankmath_fields = [
        'rank_math_title',
        'rank_math_description',
        'rank_math_focus_keyword',
        'rank_math_robots',
        'rank_math_facebook_title',
        'rank_math_facebook_description',
        'rank_math_facebook_image',
        'rank_math_twitter_title',
        'rank_math_twitter_description',
        'rank_math_twitter_card_type',
    ];
    foreach ($rankmath_fields as $key) {
        register_post_meta('page', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
        ]);
        register_post_meta('post', $key, [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
        ]);
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
/*  3. Admin menu                                                      */
/* ================================================================== */

add_action('admin_menu', function () {
    add_menu_page('AIAIAI Content', 'AIAIAI Content', 'edit_pages', 'aiaiai-content', 'aiaiai_render_admin', 'dashicons-edit-page', 3);
});

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'toplevel_page_aiaiai-content') return;
    wp_enqueue_media();
    wp_enqueue_editor();
    wp_enqueue_style('aiaiai-admin', false);
    wp_add_inline_style('aiaiai-admin', aiaiai_css());
});

/* ================================================================== */
/*  4. Save handler                                                    */
/* ================================================================== */

add_action('admin_init', function () {
    if (!isset($_POST['aiaiai_save_content'])) return;
    if (!wp_verify_nonce($_POST['_aiaiai_nonce'] ?? '', 'aiaiai_save')) return;
    if (!current_user_can('edit_pages')) return;

    $slug = sanitize_text_field($_POST['aiaiai_page'] ?? '');
    $page = get_page_by_path($slug);
    if (!$page) return;

    $raw = $_POST['sections'] ?? [];
    $sections = aiaiai_clean($raw);

    update_post_meta($page->ID, 'page_sections', wp_json_encode($sections, JSON_UNESCAPED_UNICODE));
    wp_redirect(admin_url('admin.php?page=aiaiai-content&tab=' . $slug . '&saved=1'));
    exit;
});

function aiaiai_clean($raw) {
    if (is_string($raw)) return wp_kses_post(wp_unslash($raw));
    if (!is_array($raw)) return [];
    $clean = [];
    foreach ($raw as $k => $v) {
        $clean[sanitize_text_field($k)] = is_array($v) ? aiaiai_clean($v) : wp_kses_post(wp_unslash($v));
    }
    return $clean;
}

/* ================================================================== */
/*  5. Global editor counter (for unique IDs)                          */
/* ================================================================== */

$GLOBALS['aiaiai_editor_id'] = 0;

/* ================================================================== */
/*  6. Admin page renderer                                             */
/* ================================================================== */

function aiaiai_render_admin() {
    $tabs = [
        'home' => 'Home', 'about' => 'About Us', 'services' => 'Services',
        'partner' => 'AI Solution Partner', 'humanoid' => 'Humanoid Robotics', 'security' => 'Security',
    ];

    $current = sanitize_text_field($_GET['tab'] ?? 'home');
    if (!isset($tabs[$current])) $current = 'home';

    $page = get_page_by_path($current);
    $sections = [];
    if ($page) {
        $raw = get_post_meta($page->ID, 'page_sections', true);
        if ($raw) $sections = json_decode($raw, true) ?: [];
    }

    echo '<div class="wrap aiaiai-wrap">';
    echo '<h1>AIAIAI Content Editor</h1>';

    if (isset($_GET['saved'])) {
        echo '<div class="notice notice-success is-dismissible"><p><strong>Saved!</strong> Frontend will refresh within 60 seconds.</p></div>';
    }

    echo '<nav class="nav-tab-wrapper">';
    foreach ($tabs as $slug => $label) {
        $cls = ($slug === $current) ? 'nav-tab nav-tab-active' : 'nav-tab';
        echo '<a href="' . admin_url('admin.php?page=aiaiai-content&tab=' . $slug) . '" class="' . $cls . '">' . esc_html($label) . '</a>';
    }
    echo '</nav>';

    echo '<form method="post" class="aiaiai-form">';
    wp_nonce_field('aiaiai_save', '_aiaiai_nonce');
    echo '<input type="hidden" name="aiaiai_page" value="' . esc_attr($current) . '">';
    echo '<input type="hidden" name="aiaiai_save_content" value="1">';

    if (empty($sections)) {
        echo '<div class="aiaiai-empty"><p>No content for this page yet. The frontend will use default values.</p></div>';
    } else {
        foreach ($sections as $sk => $sd) {
            aiaiai_section($sk, $sd, "sections[{$sk}]");
        }
    }

    echo '<div class="aiaiai-submit">';
    submit_button('Save Changes', 'primary large', 'submit', false);
    echo '</div>';
    echo '</form></div>';

    echo '<script>' . aiaiai_js() . '</script>';
}

/* ================================================================== */
/*  7. Section renderer                                                */
/* ================================================================== */

function aiaiai_section($key, $data, $prefix) {
    $title = ucwords(str_replace('_', ' ', $key));
    echo '<div class="aiaiai-section">';
    echo '<div class="aiaiai-section-header" onclick="this.parentElement.classList.toggle(\'collapsed\')">';
    echo '<h2>' . esc_html($title) . '</h2>';
    echo '<span class="aiaiai-toggle dashicons dashicons-arrow-down-alt2"></span>';
    echo '</div>';
    echo '<div class="aiaiai-section-body">';
    echo '<table class="form-table aiaiai-table">';

    if (!is_array($data)) return;

    foreach ($data as $fk => $fv) {
        $name = "{$prefix}[{$fk}]";
        $label = ucwords(str_replace(['_', '-'], ' ', $fk));

        if (aiaiai_is_color($fk)) {
            echo '<tr><th>' . esc_html($label) . '</th><td>';
            aiaiai_color_field($name, $fv);
            echo '</td></tr>';
        } elseif (is_array($fv)) {
            if (isset($fv[0]) && is_array($fv[0])) {
                echo '</table>';
                aiaiai_array_table($label, $fv, $name);
                echo '<table class="form-table aiaiai-table">';
            } elseif (isset($fv[0]) && is_string($fv[0])) {
                echo '<tr><th>' . esc_html($label) . '</th><td>';
                foreach ($fv as $i => $item) {
                    $eid = 'aiaiai_ed_' . (++$GLOBALS['aiaiai_editor_id']);
                    wp_editor($item, $eid, [
                        'textarea_name' => $name . "[{$i}]",
                        'textarea_rows' => 4,
                        'media_buttons' => true,
                        'teeny'         => false,
                        'quicktags'     => true,
                    ]);
                    if ($i < count($fv) - 1) echo '<hr style="margin:10px 0">';
                }
                echo '</td></tr>';
            }
        } elseif (aiaiai_is_img($fk)) {
            echo '<tr><th>' . esc_html($label) . '</th><td>';
            aiaiai_img_field($name, $fv);
            echo '</td></tr>';
        } elseif (aiaiai_is_rich($fk, $fv)) {
            echo '<tr><th>' . esc_html($label) . '</th><td>';
            $eid = 'aiaiai_ed_' . (++$GLOBALS['aiaiai_editor_id']);
            wp_editor($fv, $eid, [
                'textarea_name' => $name,
                'textarea_rows' => 4,
                'media_buttons' => true,
                'teeny'         => false,
                'quicktags'     => true,
            ]);
            echo '</td></tr>';
        } else {
            echo '<tr><th>' . esc_html($label) . '</th><td>';
            echo '<input type="text" name="' . esc_attr($name) . '" value="' . esc_attr($fv) . '" class="large-text">';
            echo '</td></tr>';
        }
    }

    echo '</table></div></div>';
}

/* ================================================================== */
/*  8. Array table (cards, stats, items)                               */
/* ================================================================== */

function aiaiai_array_table($label, $items, $prefix) {
    if (empty($items)) return;
    $cols = array_keys($items[0]);

    echo '<div class="aiaiai-array">';
    echo '<h3>' . esc_html($label) . '</h3>';
    echo '<table class="widefat aiaiai-items">';
    echo '<thead><tr><th class="aiaiai-rn">#</th>';
    foreach ($cols as $c) echo '<th>' . esc_html(ucwords(str_replace('_', ' ', $c))) . '</th>';
    echo '</tr></thead><tbody>';

    foreach ($items as $i => $item) {
        echo '<tr>';
        echo '<td class="aiaiai-rn">' . ($i + 1) . '</td>';
        foreach ($cols as $c) {
            $val = $item[$c] ?? '';
            $n = "{$prefix}[{$i}][{$c}]";
            echo '<td>';
            if (aiaiai_is_img($c)) {
                aiaiai_img_field($n, $val);
            } elseif (strlen((string)$val) > 60 || strpos($c, 'description') !== false) {
                echo '<textarea name="' . esc_attr($n) . '" rows="3" class="large-text">' . esc_textarea($val) . '</textarea>';
            } else {
                echo '<input type="text" name="' . esc_attr($n) . '" value="' . esc_attr($val) . '" class="large-text">';
            }
            echo '</td>';
        }
        echo '</tr>';
    }
    echo '</tbody></table></div>';
}

/* ================================================================== */
/*  9. Field helpers                                                   */
/* ================================================================== */

function aiaiai_is_color($key) {
    return (bool) preg_match('/(_color|_bg_color|background_color|bg_color|accent_color|text_color)$/i', $key);
}

function aiaiai_is_img($key) {
    if (aiaiai_is_color($key)) return false;
    return (bool) preg_match('/(image|img|photo|avatar|logo|background|thumbnail|banner|cover|icon_url|video)/i', $key);
}

function aiaiai_is_rich($key, $val) {
    return strlen((string)$val) > 100
        || preg_match('/(description|text|paragraph|content|bio|intro|body|quote|subtitle)/i', $key);
}

/**
 * Image field descriptions — explains what each image is used for
 */
function aiaiai_img_desc($key) {
    $map = [
        'hero_background_image'   => '🖼 Hero section full-width background image (1440×800px recommended)',
        'brand_logo_image'        => '🏷 Brand logo/vector displayed on the right side of hero',
        'section_background_image'=> '🖼 Section background photo (left half, 720×500px recommended)',
        'card_image'              => '🃏 Card background image (286×312px recommended)',
        'card_background_image'   => '🖼 Service card full background image (480×616px recommended)',
        'side_panel_image'        => '📐 Right side panel image (389×full height)',
        'background_video'        => '🎬 Background video file (MP4, auto-loop)',
        'background_image'        => '🖼 Section background image (full-width)',
        'og_image'                => '🔗 Social share preview image (1200×630px)',
        'thumbnail'               => '📷 Thumbnail preview image',
        'avatar_image'            => '👤 Profile photo / avatar',
        'logo_image'              => '🏷 Company or brand logo',
        'banner_image'            => '🖼 Banner image (full-width)',
        'cover_image'             => '🖼 Cover image',
        'icon_image'              => '🔹 Small icon image (48×48px)',
    ];
    foreach ($map as $pattern => $desc) {
        if (stripos($key, str_replace('_image', '', $pattern)) !== false || $key === $pattern) {
            return $desc;
        }
    }
    return '🖼 Image';
}

function aiaiai_color_field($name, $val) {
    $has_val = !empty($val);
    $hex = $has_val ? $val : '#070E24';
    echo '<div class="aiaiai-color-field">';
    echo '<p class="aiaiai-color-desc">🎨 Background color (leave empty to use default from code)</p>';
    echo '<div class="aiaiai-color-input">';
    echo '<input type="color" value="' . esc_attr($hex) . '" class="aiaiai-color-picker" onchange="this.nextElementSibling.value=this.value">';
    echo '<input type="text" name="' . esc_attr($name) . '" value="' . esc_attr($val) . '" class="aiaiai-color-text" placeholder="#070E24 or linear-gradient(...)">';
    echo '<button type="button" class="button aiaiai-color-clear" onclick="var w=this.closest(\'.aiaiai-color-field\');w.querySelector(\'.aiaiai-color-text\').value=\'\';w.querySelector(\'.aiaiai-color-picker\').value=\'#070E24\';">Clear</button>';
    echo '</div>';
    if ($has_val) {
        echo '<div class="aiaiai-color-preview" style="background:' . esc_attr($val) . '"></div>';
    }
    echo '</div>';
}

function aiaiai_img_field($name, $val) {
    // Extract field key from name for description
    preg_match('/\[([^\]]+)\]$/', $name, $m);
    $field_key = $m[1] ?? '';
    $desc = aiaiai_img_desc($field_key);

    // For local /images/ paths, construct full frontend URL for preview
    $preview_url = $val;
    $is_local = $val && strpos($val, '/images/') === 0 || strpos($val, '/videos/') === 0;
    $frontend_base = 'http://localhost:3050';

    echo '<div class="aiaiai-img-wrap">';
    echo '<p class="aiaiai-img-desc">' . esc_html($desc) . '</p>';
    echo '<div class="aiaiai-img-input">';
    echo '<input type="text" name="' . esc_attr($name) . '" value="' . esc_attr($val) . '" class="large-text aiaiai-img-url" placeholder="Image URL or upload →">';
    echo '<button type="button" class="button button-secondary aiaiai-upload">📷 Upload</button>';
    echo '<button type="button" class="button aiaiai-remove-img" style="color:#b32d2e;' . ($val ? '' : 'display:none') . '">✕</button>';
    echo '</div>';

    if ($val) {
        $is_video = preg_match('/\.(mp4|webm|mov)$/i', $val);
        if ($is_video) {
            $video_src = $is_local ? $frontend_base . $val : $val;
            echo '<div class="aiaiai-img-preview">';
            echo '<video src="' . esc_url($video_src) . '" controls muted loop playsinline style="max-width:400px;max-height:225px;border-radius:8px;border:1px solid #ddd;margin-top:8px;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">';
            echo '</video>';
            echo '<div class="aiaiai-video-tag" style="display:none">⚠️ Cannot preview: ' . esc_html(basename($val)) . '</div>';
            echo '</div>';
        } else {
            $src = $is_local ? $frontend_base . $val : $val;
            echo '<div class="aiaiai-img-preview"><img src="' . esc_url($src) . '" style="max-width:500px!important;max-height:300px!important;width:auto;height:auto;object-fit:cover;border-radius:6px;border:1px solid #ddd;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'" />';
            echo '<span class="aiaiai-img-fallback" style="display:none">⚠️ Cannot preview: ' . esc_html($val) . '</span></div>';
        }
    } else {
        echo '<div class="aiaiai-img-preview"><span class="aiaiai-no-img">No image set — using default from code</span></div>';
    }
    echo '</div>';
}

/* ================================================================== */
/*  10. CSS                                                            */
/* ================================================================== */

function aiaiai_css() {
    return '
    .aiaiai-wrap { max-width: 1200px; }
    .aiaiai-form { margin-top: 16px; }

    .aiaiai-section {
        background: #fff;
        border: 1px solid #c3c4c7;
        border-radius: 8px;
        margin-bottom: 16px;
        overflow: hidden;
    }
    .aiaiai-section.collapsed .aiaiai-section-body { display: none; }
    .aiaiai-section.collapsed .aiaiai-toggle { transform: rotate(-90deg); }

    .aiaiai-section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px;
        background: linear-gradient(135deg, #1d2327 0%, #2c3338 100%);
        cursor: pointer;
        user-select: none;
    }
    .aiaiai-section-header h2 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        letter-spacing: 0.03em;
    }
    .aiaiai-toggle {
        color: #fff;
        transition: transform 0.2s;
    }

    .aiaiai-section-body { padding: 0 0 10px; }

    .aiaiai-table { margin: 0; }
    .aiaiai-table th {
        width: 160px;
        font-weight: 500;
        color: #50575e;
        padding: 14px 20px 14px 20px;
        vertical-align: top;
        font-size: 13px;
    }
    .aiaiai-table td { padding: 10px 20px 10px 0; }
    .aiaiai-table input[type="text"] { width: 100% !important; }

    /* WP Editor tweaks */
    .aiaiai-table .wp-editor-wrap { max-width: 100%; }
    .aiaiai-table .wp-editor-container { border: 1px solid #c3c4c7; border-radius: 4px; }
    .aiaiai-table .mce-toolbar-grp { background: #f6f7f7; }

    /* Array tables */
    .aiaiai-array { padding: 0 20px 15px; }
    .aiaiai-array h3 {
        font-size: 12px;
        font-weight: 700;
        color: #1d2327;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 16px 0 8px;
        padding-bottom: 6px;
        border-bottom: 2px solid #2271b1;
        display: inline-block;
    }
    .aiaiai-items { border-collapse: collapse; }
    .aiaiai-items th {
        background: #f0f0f1;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        padding: 8px 10px;
    }
    .aiaiai-items td { padding: 8px 10px; vertical-align: top; }
    .aiaiai-items textarea, .aiaiai-items input[type="text"] { width: 100% !important; font-size: 13px; }
    .aiaiai-items textarea { min-height: 120px; resize: vertical; }
    .aiaiai-items { table-layout: fixed; width: 100%; }
    .aiaiai-items th:first-child, .aiaiai-items td:first-child { width: 35px; }
    .aiaiai-items td { word-wrap: break-word; }
    .aiaiai-rn { width: 35px; text-align: center; color: #999; font-weight: 700; }
    .aiaiai-items tr:nth-child(even) td { background: #f9f9f9; }

    /* Image fields */
    .aiaiai-img-wrap {
        background: #f9fafb;
        border: 1px solid #e2e4e7;
        border-radius: 8px;
        padding: 12px;
    }
    .aiaiai-img-desc {
        margin: 0 0 8px;
        font-size: 11px;
        color: #2271b1;
        font-weight: 600;
        letter-spacing: 0.02em;
    }
    .aiaiai-img-input { display: flex; gap: 6px; align-items: center; }
    .aiaiai-img-input .aiaiai-img-url { flex: 1; font-size: 12px !important; }
    .aiaiai-img-preview { margin-top: 8px; }
    .aiaiai-img-preview img {
        display: block;
        max-width: 160px;
        max-height: 90px;
        border-radius: 6px;
        border: 1px solid #ddd;
        object-fit: cover;
    }
    .aiaiai-no-img {
        display: inline-block;
        padding: 4px 10px;
        background: #f0f0f1;
        border-radius: 4px;
        font-size: 11px;
        color: #999;
    }
    .aiaiai-video-tag {
        display: inline-block;
        padding: 4px 10px;
        background: #1d2327;
        color: #fff;
        border-radius: 4px;
        font-size: 11px;
    }
    .aiaiai-img-fallback {
        display: inline-block;
        padding: 4px 10px;
        background: #fff3cd;
        border-radius: 4px;
        font-size: 11px;
        color: #856404;
    }

    /* Color picker */
    .aiaiai-color-field { }
    .aiaiai-color-desc {
        margin: 0 0 6px;
        font-size: 11px;
        color: #2271b1;
        font-weight: 600;
    }
    .aiaiai-color-input { display: flex; gap: 8px; align-items: center; }
    .aiaiai-color-picker {
        width: 40px; height: 36px;
        border: 1px solid #c3c4c7;
        border-radius: 4px;
        padding: 2px;
        cursor: pointer;
    }
    .aiaiai-color-text { flex: 1; max-width: 300px; }
    .aiaiai-color-preview {
        margin-top: 6px;
        width: 100%;
        height: 24px;
        border-radius: 4px;
        border: 1px solid rgba(0,0,0,0.1);
    }

    /* Force all image previews small */
    .aiaiai-img-preview img { max-width: 120px !important; max-height: 68px !important; }

    /* Array table image cells - compact */
    .aiaiai-items .aiaiai-img-wrap { padding: 8px; }
    .aiaiai-items .aiaiai-img-input { flex-wrap: wrap; }
    .aiaiai-items .aiaiai-img-desc { font-size: 10px; margin-bottom: 4px; }

    /* Submit bar */
    .aiaiai-submit {
        position: sticky;
        bottom: 0;
        background: #fff;
        border-top: 2px solid #2271b1;
        padding: 12px 20px;
        margin: 0 -1px;
        z-index: 100;
    }
    .aiaiai-empty { padding: 60px 20px; text-align: center; color: #999; font-size: 15px; }
    .nav-tab-wrapper { margin-bottom: 0; border-bottom: 1px solid #c3c4c7; }
    .nav-tab-active { background: #1d2327 !important; color: #fff !important; border-color: #1d2327 !important; }
    ';
}

/* ================================================================== */
/*  11. JavaScript                                                     */
/* ================================================================== */

function aiaiai_js() {
    return "
    jQuery(function($) {
        // Image upload
        $(document).on('click', '.aiaiai-upload', function(e) {
            e.preventDefault();
            var wrap = $(this).closest('.aiaiai-img-wrap');
            var input = wrap.find('.aiaiai-img-url');
            var preview = wrap.find('.aiaiai-img-preview');
            var removeBtn = wrap.find('.aiaiai-remove-img');

            var frame = wp.media({ title: 'Select Image', multiple: false, library: { type: 'image' } });
            frame.on('select', function() {
                var url = frame.state().get('selection').first().toJSON().url;
                input.val(url);
                preview.html('<img src=\"' + url + '\" style=\"max-width:500px!important;max-height:300px!important;width:auto;height:auto;object-fit:cover;border-radius:6px;border:1px solid #ddd;\">');
                removeBtn.show();
            });
            frame.open();
        });

        // Remove image
        $(document).on('click', '.aiaiai-remove-img', function() {
            var wrap = $(this).closest('.aiaiai-img-wrap');
            wrap.find('.aiaiai-img-url').val('');
            wrap.find('.aiaiai-img-preview').html('');
            $(this).hide();
        });

        // Color picker sync: text → picker
        $(document).on('input', '.aiaiai-color-text', function() {
            var val = $(this).val();
            if (/^#[0-9a-f]{6}$/i.test(val)) {
                $(this).siblings('.aiaiai-color-picker').val(val);
            }
            $(this).closest('.aiaiai-color-field').find('.aiaiai-color-preview').css('background', val || '#070E24');
        });

        // Section collapse/expand
        $('.aiaiai-section').each(function(i) {
            if (i > 0) $(this).addClass('collapsed');
        });
    });
    ";
}
