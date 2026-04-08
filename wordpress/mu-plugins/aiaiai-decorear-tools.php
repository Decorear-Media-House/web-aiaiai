<?php
/**
 * Plugin Name: Decorear Utility Tools
 * Description: Tracking tags manager + one-click backup (DB + uploads).
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'AIAIAI_TAGS_OPTION', 'aiaiai_tracking_tags' );
define( 'AIAIAI_BACKUP_DIR', '/home/decorear-aiaiai-cms/backups' );
define( 'AIAIAI_BACKUP_MAX', 5 );
define( 'AIAIAI_BACKUP_PROGRESS_FILE', '/tmp/aiaiai-backup-progress.json' );

/* ──────────────────────────────────────────────
   Hide unused admin menus (ACF, Hello Dolly, etc.)
   ────────────────────────────────────────────── */
add_action( 'admin_menu', function () {
    remove_menu_page( 'edit.php?post_type=acf-field-group' );  // ACF
    remove_menu_page( 'acf-options' );                          // ACF Options
}, 999 );

/* ──────────────────────────────────────────────
   Admin menu — top-level "Decorear Tools"
   ────────────────────────────────────────────── */
add_action( 'admin_menu', function () {
    add_menu_page(
        'Decorear Utility Tools',
        'Decorear Tools',
        'manage_options',
        'aiaiai-tags',
        'aiaiai_tags_render_page',
        'dashicons-admin-generic',
        80
    );

    add_submenu_page(
        'aiaiai-tags',
        'Tracking Tags',
        'Tracking Tags',
        'manage_options',
        'aiaiai-tags',
        'aiaiai_tags_render_page'
    );

    add_submenu_page(
        'aiaiai-tags',
        'Backup',
        'Backup',
        'manage_options',
        'aiaiai-backup',
        'aiaiai_backup_render_page'
    );
});

/* Enqueue assets on our pages only */
add_action( 'admin_enqueue_scripts', function ( $hook ) {
    $our_pages = [ 'toplevel_page_aiaiai-tags', 'decorear-tools_page_aiaiai-backup' ];
    if ( ! in_array( $hook, $our_pages, true ) ) return;
    wp_enqueue_media();
});


/* ================================================================
   TRACKING TAGS — GTM, GA4, Google Ads, Meta Pixel, LINE Tag, etc.
   ================================================================ */

function aiaiai_tags_defaults() {
    return [
        'gtm_id'           => '',
        'ga4_id'            => '',
        'google_ads_id'     => '',
        'meta_pixel_id'     => '',
        'line_tag_id'       => '',
        'custom_head'       => '',
        'custom_body_open'  => '',
        'custom_body_close' => '',
    ];
}

/* Handle tracking tags save */
add_action( 'admin_init', function () {
    if (
        ! isset( $_POST['aiaiai_tags_nonce'] ) ||
        ! wp_verify_nonce( $_POST['aiaiai_tags_nonce'], 'aiaiai_tags_save' ) ||
        ! current_user_can( 'manage_options' )
    ) return;

    $data = [
        'gtm_id'            => sanitize_text_field( $_POST['tags']['gtm_id'] ?? '' ),
        'ga4_id'             => sanitize_text_field( $_POST['tags']['ga4_id'] ?? '' ),
        'google_ads_id'      => sanitize_text_field( $_POST['tags']['google_ads_id'] ?? '' ),
        'meta_pixel_id'      => sanitize_text_field( $_POST['tags']['meta_pixel_id'] ?? '' ),
        'line_tag_id'        => sanitize_text_field( $_POST['tags']['line_tag_id'] ?? '' ),
        'custom_head'        => $_POST['tags']['custom_head'] ?? '',
        'custom_body_open'   => $_POST['tags']['custom_body_open'] ?? '',
        'custom_body_close'  => $_POST['tags']['custom_body_close'] ?? '',
    ];

    update_option( AIAIAI_TAGS_OPTION, $data );

    add_settings_error( 'aiaiai_tags', 'saved', 'บันทึกเรียบร้อยแล้ว (Saved)', 'updated' );
    set_transient( 'settings_errors', get_settings_errors(), 30 );

    wp_safe_redirect( add_query_arg( 'settings-updated', 'true', wp_get_referer() ) );
    exit;
});

/* Render tracking tags admin page */
function aiaiai_tags_render_page() {
    $tags = wp_parse_args( get_option( AIAIAI_TAGS_OPTION, [] ), aiaiai_tags_defaults() );
    ?>
    <div class="wrap">
        <h1>Tracking Tags</h1>
        <p class="description">จัดการแท็กติดตาม (Manage tracking tags) — ใส่แค่ ID แล้วระบบจะสร้างโค้ดให้อัตโนมัติ (just paste the ID, the code is generated automatically)</p>

        <?php settings_errors( 'aiaiai_tags' ); ?>

        <form method="post">
            <?php wp_nonce_field( 'aiaiai_tags_save', 'aiaiai_tags_nonce' ); ?>

            <h2 class="title">Preset Tags — แค่ใส่ ID (Just enter the ID)</h2>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row">
                        <label for="gtm_id">Google Tag Manager</label>
                        <p class="description" style="font-weight:normal;">Container ID</p>
                    </th>
                    <td>
                        <input type="text" id="gtm_id" name="tags[gtm_id]" value="<?php echo esc_attr( $tags['gtm_id'] ); ?>" class="regular-text" placeholder="GTM-XXXXXXX" />
                        <p class="description">จะใส่ script ใน &lt;head&gt; และ &lt;noscript&gt; หลัง &lt;body&gt; ให้อัตโนมัติ<br>(Auto-injects script in &lt;head&gt; and &lt;noscript&gt; after &lt;body&gt;)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="ga4_id">Google Analytics 4</label>
                        <p class="description" style="font-weight:normal;">Measurement ID</p>
                    </th>
                    <td>
                        <input type="text" id="ga4_id" name="tags[ga4_id]" value="<?php echo esc_attr( $tags['ga4_id'] ); ?>" class="regular-text" placeholder="G-XXXXXXXXXX" />
                        <p class="description">ไม่ต้องใส่ถ้าใช้ GTM อยู่แล้ว (ตั้งค่าใน GTM แทน)<br>(Not needed if you already use GTM — configure GA4 inside GTM instead)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="google_ads_id">Google Ads</label>
                        <p class="description" style="font-weight:normal;">Conversion ID</p>
                    </th>
                    <td>
                        <input type="text" id="google_ads_id" name="tags[google_ads_id]" value="<?php echo esc_attr( $tags['google_ads_id'] ); ?>" class="regular-text" placeholder="AW-XXXXXXXXXX" />
                        <p class="description">Global site tag สำหรับ Google Ads — จะรวมกับ GA4 gtag ถ้ามี<br>(Global site tag for Google Ads — combined with GA4 gtag if present)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="meta_pixel_id">Meta (Facebook) Pixel</label>
                        <p class="description" style="font-weight:normal;">Pixel ID</p>
                    </th>
                    <td>
                        <input type="text" id="meta_pixel_id" name="tags[meta_pixel_id]" value="<?php echo esc_attr( $tags['meta_pixel_id'] ); ?>" class="regular-text" placeholder="123456789012345" />
                        <p class="description">จะใส่ fbq script ใน &lt;head&gt; และ noscript pixel ให้อัตโนมัติ<br>(Auto-injects fbq script in &lt;head&gt; and noscript pixel)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="line_tag_id">LINE Tag</label>
                        <p class="description" style="font-weight:normal;">Base Code ID</p>
                    </th>
                    <td>
                        <input type="text" id="line_tag_id" name="tags[line_tag_id]" value="<?php echo esc_attr( $tags['line_tag_id'] ); ?>" class="regular-text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
                        <p class="description">LINE Tag base code สำหรับติดตาม conversion จาก LINE Ads<br>(LINE Tag base code for LINE Ads conversion tracking)</p>
                    </td>
                </tr>
            </table>

            <h2 class="title">Custom Scripts — วางโค้ดที่ทีมโฆษณาให้มา (Paste code from your ad team)</h2>
            <p class="description">สำหรับแท็กอื่น ๆ ที่ไม่มีช่อง preset ด้านบน เช่น TikTok Pixel, Hotjar, etc.<br>(For other tags not covered above — TikTok Pixel, Hotjar, etc.)</p>

            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="custom_head">Scripts in &lt;head&gt;</label></th>
                    <td>
                        <textarea id="custom_head" name="tags[custom_head]" rows="8" class="large-text code" placeholder="<!-- Paste script tags here -->"><?php echo esc_textarea( $tags['custom_head'] ); ?></textarea>
                        <p class="description">จะถูกใส่ก่อน &lt;/head&gt; (Injected before &lt;/head&gt;)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="custom_body_open">Scripts after &lt;body&gt;</label></th>
                    <td>
                        <textarea id="custom_body_open" name="tags[custom_body_open]" rows="6" class="large-text code" placeholder="<!-- Paste script/noscript tags here -->"><?php echo esc_textarea( $tags['custom_body_open'] ); ?></textarea>
                        <p class="description">จะถูกใส่หลังเปิด &lt;body&gt; (Injected right after opening &lt;body&gt;)</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="custom_body_close">Scripts before &lt;/body&gt;</label></th>
                    <td>
                        <textarea id="custom_body_close" name="tags[custom_body_close]" rows="6" class="large-text code" placeholder="<!-- Paste script tags here -->"><?php echo esc_textarea( $tags['custom_body_close'] ); ?></textarea>
                        <p class="description">จะถูกใส่ก่อน &lt;/body&gt; (Injected before &lt;/body&gt;)</p>
                    </td>
                </tr>
            </table>

            <?php submit_button( 'บันทึก (Save)' ); ?>
        </form>
    </div>
    <?php
}

/* Tracking Tags REST endpoint */
add_action( 'rest_api_init', function () {
    register_rest_route( 'aiaiai/v1', '/tracking-tags', [
        'methods'             => 'GET',
        'callback'            => 'aiaiai_tags_rest_get',
        'permission_callback' => '__return_true',
    ]);
});

function aiaiai_tags_rest_get() {
    $tags = wp_parse_args( get_option( AIAIAI_TAGS_OPTION, [] ), aiaiai_tags_defaults() );

    $head_scripts       = '';
    $body_open_scripts  = '';
    $body_close_scripts = '';

    // Google Tag Manager
    if ( ! empty( $tags['gtm_id'] ) ) {
        $gtm = esc_attr( $tags['gtm_id'] );
        $head_scripts .= "<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','{$gtm}');</script>\n<!-- End Google Tag Manager -->\n";
        $body_open_scripts .= "<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id={$gtm}\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n<!-- End Google Tag Manager (noscript) -->\n";
    }

    // Google Analytics 4 + Google Ads (shared gtag.js)
    $gtag_ids = [];
    if ( ! empty( $tags['ga4_id'] ) )        $gtag_ids[] = $tags['ga4_id'];
    if ( ! empty( $tags['google_ads_id'] ) )  $gtag_ids[] = $tags['google_ads_id'];

    if ( ! empty( $gtag_ids ) ) {
        $primary = esc_attr( $gtag_ids[0] );
        $head_scripts .= "<!-- Global site tag (gtag.js) -->\n<script async src=\"https://www.googletagmanager.com/gtag/js?id={$primary}\"></script>\n<script>\nwindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\n";
        foreach ( $gtag_ids as $gid ) {
            $head_scripts .= "gtag('config', '" . esc_attr( $gid ) . "');\n";
        }
        $head_scripts .= "</script>\n";
    }

    // Meta (Facebook) Pixel
    if ( ! empty( $tags['meta_pixel_id'] ) ) {
        $px = esc_attr( $tags['meta_pixel_id'] );
        $head_scripts .= "<!-- Meta Pixel Code -->\n<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','{$px}');fbq('track','PageView');</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://www.facebook.com/tr?id={$px}&ev=PageView&noscript=1\" /></noscript>\n<!-- End Meta Pixel Code -->\n";
    }

    // LINE Tag
    if ( ! empty( $tags['line_tag_id'] ) ) {
        $lt = esc_attr( $tags['line_tag_id'] );
        $head_scripts .= "<!-- LINE Tag Base Code -->\n<script>(function(g,d,o){g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};var h=d.getElementsByTagName(o)[0];var j=d.createElement(o);j.async=true;j.src='https://d.line-scdn.net/n/line_tag/public/release/v1/lt.js';h.parentNode.insertBefore(j,h);})(window,document,'script');_lt('init',{customerType:'account',tagId:'{$lt}'});_lt('send','pv',['pv']);</script>\n<noscript><img height=\"1\" width=\"1\" style=\"display:none\" src=\"https://tr.line.me/tag.gif?c_t=lap&t_id={$lt}&e=pv&noscript=1\" /></noscript>\n<!-- End LINE Tag -->\n";
    }

    // Custom scripts
    if ( ! empty( $tags['custom_head'] ) )       $head_scripts .= $tags['custom_head'] . "\n";
    if ( ! empty( $tags['custom_body_open'] ) )   $body_open_scripts .= $tags['custom_body_open'] . "\n";
    if ( ! empty( $tags['custom_body_close'] ) )  $body_close_scripts .= $tags['custom_body_close'] . "\n";

    return [
        'ids' => [
            'gtm_id'        => $tags['gtm_id'],
            'ga4_id'         => $tags['ga4_id'],
            'google_ads_id'  => $tags['google_ads_id'],
            'meta_pixel_id'  => $tags['meta_pixel_id'],
            'line_tag_id'    => $tags['line_tag_id'],
        ],
        'head_scripts'       => trim( $head_scripts ),
        'body_open_scripts'  => trim( $body_open_scripts ),
        'body_close_scripts' => trim( $body_close_scripts ),
    ];
}


/* ================================================================
   BACKUP — One-click database + uploads backup
   ================================================================ */

/* Handle delete backup */
add_action( 'admin_init', function () {
    if (
        isset( $_GET['aiaiai_delete_backup'] ) &&
        isset( $_GET['_wpnonce'] ) &&
        wp_verify_nonce( $_GET['_wpnonce'], 'aiaiai_delete_backup' ) &&
        current_user_can( 'manage_options' )
    ) {
        $file = basename( $_GET['aiaiai_delete_backup'] );
        if ( preg_match( '/^aiaiai-backup-.+\.tar\.gz$/', $file ) ) {
            $path = AIAIAI_BACKUP_DIR . '/' . $file;
            if ( file_exists( $path ) ) unlink( $path );
        }
        wp_safe_redirect( admin_url( 'admin.php?page=aiaiai-backup&deleted=1' ) );
        exit;
    }
});

/* Download handler */
add_action( 'wp_ajax_aiaiai_download_backup', function () {
    if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Unauthorized' );
    check_admin_referer( 'aiaiai_download_backup' );

    $file = basename( $_GET['file'] ?? '' );
    if ( ! preg_match( '/^aiaiai-backup-.+\.tar\.gz$/', $file ) ) wp_die( 'Invalid file' );

    $path = AIAIAI_BACKUP_DIR . '/' . $file;
    if ( ! file_exists( $path ) ) wp_die( 'File not found' );

    header( 'Content-Type: application/gzip' );
    header( 'Content-Disposition: attachment; filename="' . $file . '"' );
    header( 'Content-Length: ' . filesize( $path ) );
    readfile( $path );
    exit;
});

/* AJAX: Create backup */
function aiaiai_backup_update_progress( $percent, $step, $status = 'running' ) {
    file_put_contents( AIAIAI_BACKUP_PROGRESS_FILE, json_encode( [
        'percent' => $percent,
        'step'    => $step,
        'status'  => $status,
    ] ) );
}

add_action( 'wp_ajax_aiaiai_create_backup', function () {
    check_ajax_referer( 'aiaiai_backup_create', 'nonce' );
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Unauthorized' );
    $result = aiaiai_backup_create();
    wp_send_json( $result );
});

/* AJAX: Restore backup */
add_action( 'wp_ajax_aiaiai_restore_backup', function () {
    check_ajax_referer( 'aiaiai_backup_create', 'nonce' );
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Unauthorized' );

    $file = basename( $_POST['file'] ?? '' );
    if ( ! preg_match( '/^aiaiai-backup-.+\.tar\.gz$/', $file ) ) {
        wp_send_json( [ 'success' => false, 'message' => 'Invalid filename' ] );
    }

    $result = aiaiai_backup_restore( $file );
    wp_send_json( $result );
});

add_action( 'wp_ajax_aiaiai_backup_progress', function () {
    if ( ! current_user_can( 'manage_options' ) ) wp_send_json_error( 'Unauthorized' );

    if ( file_exists( AIAIAI_BACKUP_PROGRESS_FILE ) ) {
        $data = json_decode( file_get_contents( AIAIAI_BACKUP_PROGRESS_FILE ), true );
        wp_send_json( $data ?: [ 'percent' => 0, 'step' => '', 'status' => 'idle' ] );
    } else {
        wp_send_json( [ 'percent' => 0, 'step' => '', 'status' => 'idle' ] );
    }
});

/* Create backup */
function aiaiai_backup_create() {
    $timestamp   = wp_date( 'Y-m-d-His' );
    $backup_dir  = AIAIAI_BACKUP_DIR;
    $sql_file    = "/tmp/aiaiai-db-{$timestamp}.sql";
    $tar_file    = "{$backup_dir}/aiaiai-backup-{$timestamp}.tar.gz";
    $wp_root     = ABSPATH;
    $uploads_dir = $wp_root . 'wp-content/uploads';

    if ( ! is_dir( $backup_dir ) ) {
        mkdir( $backup_dir, 0755, true );
    }

    // Step 1: Dump database
    aiaiai_backup_update_progress( 5, 'กำลังสำรองฐานข้อมูล... (Dumping database)' );

    $dump_cmd = sprintf(
        'mysqldump --single-transaction -h %s -u %s -p%s %s > %s 2>&1',
        escapeshellarg( DB_HOST ),
        escapeshellarg( DB_USER ),
        escapeshellarg( DB_PASSWORD ),
        escapeshellarg( DB_NAME ),
        escapeshellarg( $sql_file )
    );
    exec( $dump_cmd, $dump_output, $dump_exit );

    if ( $dump_exit !== 0 ) {
        aiaiai_backup_update_progress( 0, 'mysqldump failed', 'error' );
        return [ 'success' => false, 'message' => 'mysqldump failed: ' . implode( "\n", $dump_output ) ];
    }

    aiaiai_backup_update_progress( 30, 'สำรองฐานข้อมูลเสร็จ (Database dumped)' );

    // Step 2: Compress
    aiaiai_backup_update_progress( 40, 'กำลังบีบอัดไฟล์อัพโหลด... (Compressing uploads)' );

    $tar_cmd = sprintf(
        'tar -czf %s -C /tmp %s -C %s uploads 2>&1',
        escapeshellarg( $tar_file ),
        escapeshellarg( basename( $sql_file ) ),
        escapeshellarg( dirname( $uploads_dir ) )
    );
    exec( $tar_cmd, $tar_output, $tar_exit );

    if ( file_exists( $sql_file ) ) unlink( $sql_file );

    if ( $tar_exit !== 0 ) {
        aiaiai_backup_update_progress( 0, 'tar failed', 'error' );
        return [ 'success' => false, 'message' => 'tar failed: ' . implode( "\n", $tar_output ) ];
    }

    aiaiai_backup_update_progress( 90, 'บีบอัดเสร็จ กำลังทำความสะอาด... (Compressed, cleaning up)' );

    // Auto-cleanup
    aiaiai_backup_cleanup();

    $size = filesize( $tar_file );
    aiaiai_backup_update_progress( 100, 'สำเร็จ! (Complete)', 'done' );

    return [
        'success'  => true,
        'message'  => 'สร้างแบ็คอัพสำเร็จ (Backup created)',
        'filename' => basename( $tar_file ),
        'size'     => size_format( $size, 2 ),
    ];
}

/* Restore backup */
function aiaiai_backup_restore( $filename ) {
    $tar_file    = AIAIAI_BACKUP_DIR . '/' . $filename;
    $tmp_dir     = '/tmp/aiaiai-restore-' . uniqid();
    $wp_root     = ABSPATH;
    $uploads_dir = $wp_root . 'wp-content/uploads';

    if ( ! file_exists( $tar_file ) ) {
        return [ 'success' => false, 'message' => 'Backup file not found' ];
    }

    // Extract
    aiaiai_backup_update_progress( 5, 'กำลังแตกไฟล์แบ็คอัพ... (Extracting archive)' );
    mkdir( $tmp_dir, 0755, true );

    $extract_cmd = sprintf( 'tar -xzf %s -C %s 2>&1', escapeshellarg( $tar_file ), escapeshellarg( $tmp_dir ) );
    exec( $extract_cmd, $out, $exit );
    if ( $exit !== 0 ) {
        exec( 'rm -rf ' . escapeshellarg( $tmp_dir ) );
        aiaiai_backup_update_progress( 0, 'Extract failed', 'error' );
        return [ 'success' => false, 'message' => 'Extract failed: ' . implode( "\n", $out ) ];
    }

    aiaiai_backup_update_progress( 20, 'แตกไฟล์เสร็จ (Extracted)' );

    // Import SQL
    aiaiai_backup_update_progress( 25, 'กำลังนำเข้าฐานข้อมูล... (Importing database)' );
    $sql_files = glob( $tmp_dir . '/aiaiai-db-*.sql' );
    if ( empty( $sql_files ) ) {
        exec( 'rm -rf ' . escapeshellarg( $tmp_dir ) );
        aiaiai_backup_update_progress( 0, 'No SQL file found', 'error' );
        return [ 'success' => false, 'message' => 'No SQL file found in backup' ];
    }

    $sql_file = $sql_files[0];
    $import_cmd = sprintf(
        'mysql -h %s -u %s -p%s %s < %s 2>&1',
        escapeshellarg( DB_HOST ),
        escapeshellarg( DB_USER ),
        escapeshellarg( DB_PASSWORD ),
        escapeshellarg( DB_NAME ),
        escapeshellarg( $sql_file )
    );
    exec( $import_cmd, $import_out, $import_exit );
    if ( $import_exit !== 0 ) {
        exec( 'rm -rf ' . escapeshellarg( $tmp_dir ) );
        aiaiai_backup_update_progress( 0, 'SQL import failed', 'error' );
        return [ 'success' => false, 'message' => 'Database import failed: ' . implode( "\n", $import_out ) ];
    }

    aiaiai_backup_update_progress( 60, 'นำเข้าฐานข้อมูลเสร็จ (Database imported)' );

    // Restore uploads
    $backup_uploads = $tmp_dir . '/uploads';
    if ( is_dir( $backup_uploads ) ) {
        aiaiai_backup_update_progress( 65, 'กำลังกู้คืนไฟล์อัพโหลด... (Restoring uploads)' );

        $rsync_cmd = sprintf(
            'rsync -a --delete %s/ %s/ 2>&1',
            escapeshellarg( $backup_uploads ),
            escapeshellarg( $uploads_dir )
        );
        exec( $rsync_cmd, $rsync_out, $rsync_exit );
        if ( $rsync_exit !== 0 ) {
            exec( 'rm -rf ' . escapeshellarg( $tmp_dir ) );
            aiaiai_backup_update_progress( 0, 'Uploads restore failed', 'error' );
            return [ 'success' => false, 'message' => 'Uploads restore failed: ' . implode( "\n", $rsync_out ) ];
        }

        aiaiai_backup_update_progress( 90, 'กู้คืนไฟล์อัพโหลดเสร็จ (Uploads restored)' );
    }

    exec( 'rm -rf ' . escapeshellarg( $tmp_dir ) );
    aiaiai_backup_update_progress( 100, 'กู้คืนสำเร็จ! (Restore complete)', 'done' );

    return [
        'success'  => true,
        'message'  => 'กู้คืนสำเร็จ — ฐานข้อมูลและไฟล์อัพโหลดถูกกู้คืนแล้ว (Restored successfully)',
        'filename' => $filename,
    ];
}

/* Auto-cleanup */
function aiaiai_backup_cleanup() {
    $files = aiaiai_backup_list();
    if ( count( $files ) <= AIAIAI_BACKUP_MAX ) return;

    $to_delete = array_slice( $files, AIAIAI_BACKUP_MAX );
    foreach ( $to_delete as $f ) {
        unlink( $f['path'] );
    }
}

/* List backups */
function aiaiai_backup_list() {
    $dir = AIAIAI_BACKUP_DIR;
    if ( ! is_dir( $dir ) ) return [];

    $files = [];
    foreach ( glob( $dir . '/aiaiai-backup-*.tar.gz' ) as $path ) {
        $files[] = [
            'path'     => $path,
            'filename' => basename( $path ),
            'size'     => filesize( $path ),
            'time'     => filemtime( $path ),
        ];
    }

    usort( $files, function ( $a, $b ) {
        return $b['time'] - $a['time'];
    });

    return $files;
}

/* Render backup page */
function aiaiai_backup_render_page() {
    if ( isset( $_GET['deleted'] ) ) {
        echo '<div class="notice notice-success is-dismissible"><p>ลบสำเร็จ (Deleted)</p></div>';
    }

    $backups = aiaiai_backup_list();
    $nonce = wp_create_nonce( 'aiaiai_backup_create' );
    ?>
    <div class="wrap">
        <h1>Backup</h1>
        <p class="description">
            สำรองข้อมูลฐานข้อมูล + ไฟล์อัพโหลด (Database + wp-content/uploads)<br>
            เก็บไว้บนเซิร์ฟเวอร์สูงสุด <?php echo AIAIAI_BACKUP_MAX; ?> ไฟล์ — ไฟล์เก่าจะถูกลบอัตโนมัติ
        </p>

        <div id="backup-progress-wrap" style="display:none;margin:20px 0;max-width:600px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                <span id="backup-spinner" class="spinner is-active" style="float:none;margin:0;"></span>
                <strong id="backup-step-text" style="font-size:14px;">กำลังเริ่ม...</strong>
            </div>
            <div style="background:#e2e4e7;border-radius:8px;height:24px;overflow:hidden;position:relative;">
                <div id="backup-bar" style="background:linear-gradient(90deg,#0073aa,#00a0d2);height:100%;width:0%;border-radius:8px;transition:width 0.4s ease;position:relative;">
                    <span id="backup-percent-text" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);color:#fff;font-size:12px;font-weight:700;text-shadow:0 1px 2px rgba(0,0,0,.3);white-space:nowrap;">0%</span>
                </div>
            </div>
        </div>

        <div id="backup-result" style="display:none;margin:20px 0;"></div>

        <div style="margin:20px 0;">
            <button type="button" id="backup-create-btn" class="button button-primary button-hero">
                <span class="dashicons dashicons-download" style="margin-top:4px;margin-right:4px;"></span>
                สร้างแบ็คอัพใหม่ (Create Backup)
            </button>
            <p class="description" style="margin-top:8px;">จะสำรอง: ฐานข้อมูลทั้งหมด (meta boxes, posts, settings) + โฟลเดอร์ uploads (รูปภาพ, SVG)</p>
        </div>

        <div id="backup-list-section">
        <?php if ( ! empty( $backups ) ) : ?>
            <h2>รายการแบ็คอัพ (Backup List)</h2>
            <?php aiaiai_backup_render_table( $backups ); ?>
        <?php else : ?>
            <p style="color:#666;margin-top:20px;">ยังไม่มีแบ็คอัพ — กดปุ่มด้านบนเพื่อสร้าง (No backups yet — click the button above to create one)</p>
        <?php endif; ?>
        </div>

        <div style="margin-top:30px;padding:16px;background:#fef3c7;border:1px solid #f59e0b;border-radius:4px;max-width:800px;">
            <h3 style="margin-top:0;">การกู้คืน (Restore)</h3>
            <p style="margin-bottom:0;">กดปุ่ม <strong>"กู้คืน"</strong> ในตารางด้านบนเพื่อกู้คืนฐานข้อมูลและไฟล์อัพโหลดจากแบ็คอัพ<br>
            <span style="color:#92400e;">คำเตือน: การกู้คืนจะ<strong>แทนที่</strong>ฐานข้อมูลและไฟล์อัพโหลดปัจจุบันทั้งหมด — ควรสร้างแบ็คอัพใหม่ก่อนกู้คืนเสมอ</span></p>
        </div>
    </div>

    <script>
    jQuery(function($) {
        var pollTimer = null;
        var nonce = '<?php echo $nonce; ?>';

        $('#backup-create-btn').on('click', function() {
            var $btn = $(this);
            $btn.prop('disabled', true).css('opacity', 0.6);
            $('#backup-progress-wrap').slideDown(200);
            $('#backup-result').hide();

            pollTimer = setInterval(pollProgress, 800);

            $.post(ajaxurl, { action: 'aiaiai_create_backup', nonce: nonce }, function(res) {
                clearInterval(pollTimer);
                $('#backup-bar').css('width', '100%');
                $('#backup-percent-text').text('100%');
                $('#backup-step-text').text('เสร็จสิ้น! (Complete)');
                $('#backup-spinner').removeClass('is-active');

                setTimeout(function() {
                    $('#backup-progress-wrap').slideUp(300);
                    if (res.success) {
                        $('#backup-result').html('<div class="notice notice-success"><p><strong>' + res.message + '</strong> — <code>' + res.filename + '</code> (' + res.size + ')</p></div>').show();
                    } else {
                        $('#backup-result').html('<div class="notice notice-error"><p>' + (res.message || 'Backup failed') + '</p></div>').show();
                    }
                    $btn.prop('disabled', false).css('opacity', 1);
                    setTimeout(function() { location.reload(); }, 1500);
                }, 800);
            }).fail(function() {
                clearInterval(pollTimer);
                $('#backup-spinner').removeClass('is-active');
                $('#backup-step-text').text('เกิดข้อผิดพลาด (Error)');
                $('#backup-bar').css({ 'width': '100%', 'background': '#dc3232' });
                $btn.prop('disabled', false).css('opacity', 1);
            });
        });

        function pollProgress() {
            $.get(ajaxurl, { action: 'aiaiai_backup_progress' }, function(data) {
                if (!data || data.status === 'idle') return;
                var pct = Math.min(data.percent || 0, 99);
                $('#backup-bar').css('width', pct + '%');
                $('#backup-percent-text').text(pct + '%');
                if (data.step) $('#backup-step-text').text(data.step);
            });
        }

        $(document).on('click', '.backup-restore-btn', function() {
            var file = $(this).data('file');
            if (!confirm('กู้คืนจากแบ็คอัพนี้?\n\n' + file + '\n\nคำเตือน: ฐานข้อมูลและไฟล์อัพโหลดปัจจุบันจะถูกแทนที่ทั้งหมด!')) return;
            if (!confirm('ยืนยันอีกครั้ง — คุณแน่ใจหรือไม่?')) return;

            var $btn = $(this);
            $btn.prop('disabled', true).text('กำลังกู้คืน...');
            $('#backup-progress-wrap').slideDown(200);
            $('#backup-step-text').text('กำลังเริ่มกู้คืน...');
            $('#backup-bar').css({'width': '0%', 'background': 'linear-gradient(90deg,#f59e0b,#d97706)'});
            $('#backup-result').hide();

            pollTimer = setInterval(pollProgress, 800);

            $.post(ajaxurl, { action: 'aiaiai_restore_backup', nonce: nonce, file: file }, function(res) {
                clearInterval(pollTimer);
                $('#backup-bar').css('width', '100%');
                $('#backup-percent-text').text('100%');
                $('#backup-spinner').removeClass('is-active');

                setTimeout(function() {
                    $('#backup-progress-wrap').slideUp(300);
                    if (res.success) {
                        $('#backup-result').html('<div class="notice notice-success"><p><strong>' + res.message + '</strong></p></div>').show();
                    } else {
                        $('#backup-bar').css('background', '#dc3232');
                        $('#backup-result').html('<div class="notice notice-error"><p>' + (res.message || 'Restore failed') + '</p></div>').show();
                    }
                    $btn.prop('disabled', false).text('กู้คืน');
                }, 800);
            }).fail(function() {
                clearInterval(pollTimer);
                $('#backup-spinner').removeClass('is-active');
                $('#backup-step-text').text('เกิดข้อผิดพลาด (Error)');
                $('#backup-bar').css({'width': '100%', 'background': '#dc3232'});
                $btn.prop('disabled', false).text('กู้คืน');
            });
        });
    });
    </script>
    <?php
}

/* Backup table */
function aiaiai_backup_render_table( $backups ) {
    ?>
    <table class="widefat striped" style="max-width:800px;">
        <thead>
            <tr>
                <th>ไฟล์ (File)</th>
                <th>ขนาด (Size)</th>
                <th>วันที่ (Date)</th>
                <th style="width:260px;">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ( $backups as $b ) : ?>
                <tr>
                    <td><code><?php echo esc_html( $b['filename'] ); ?></code></td>
                    <td><?php echo size_format( $b['size'], 2 ); ?></td>
                    <td><?php echo wp_date( 'j M Y, H:i', $b['time'] ); ?></td>
                    <td>
                        <button type="button" class="button button-small backup-restore-btn" data-file="<?php echo esc_attr( $b['filename'] ); ?>" style="color:#0073aa;">กู้คืน</button>
                        <a class="button button-small" href="<?php echo wp_nonce_url(
                            admin_url( 'admin-ajax.php?action=aiaiai_download_backup&file=' . urlencode( $b['filename'] ) ),
                            'aiaiai_download_backup'
                        ); ?>">ดาวน์โหลด</a>
                        <a class="button button-small" style="color:#b32d2e;" href="<?php echo wp_nonce_url(
                            admin_url( 'admin.php?page=aiaiai-backup&aiaiai_delete_backup=' . urlencode( $b['filename'] ) ),
                            'aiaiai_delete_backup'
                        ); ?>" onclick="return confirm('ลบไฟล์นี้? (Delete this backup?)');">ลบ</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php
}
