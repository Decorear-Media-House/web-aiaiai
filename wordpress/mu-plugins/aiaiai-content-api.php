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
    $webhook_url = defined('AIAIAI_WEBHOOK_URL') ? AIAIAI_WEBHOOK_URL : 'http://127.0.0.1:9001/rebuild';
    $health_url  = preg_replace('#/rebuild$#', '/health', $webhook_url);
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
    // Trigger webhook
    echo '    fetch(webhookUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trigger:"wordpress",user:"' . esc_js(wp_get_current_user()->user_login) . '"})}).catch(function(){});';
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
    echo '    fetch(healthUrl).then(function(r){return r.json();}).then(function(d){';
    echo '      if(d.building){pollTimer=setTimeout(pollBuild,3000);}';
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
