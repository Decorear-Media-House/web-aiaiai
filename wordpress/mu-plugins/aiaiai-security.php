<?php
/**
 * Plugin Name: AIAIAI Security Hardening
 * Description: Locks down WordPress REST API, disables XML-RPC, hides user data.
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

/* ================================================================== */
/*  1. Disable XML-RPC completely (prevents brute force attacks)       */
/* ================================================================== */

add_filter('xmlrpc_enabled', '__return_false');
add_filter('xmlrpc_methods', fn() => []);

// Block xmlrpc.php requests at the earliest point
add_action('init', function () {
    if (defined('XMLRPC_REQUEST') && XMLRPC_REQUEST) {
        http_response_code(403);
        exit('Forbidden');
    }
}, 1);

/* ================================================================== */
/*  2. Hide WordPress version                                          */
/* ================================================================== */

remove_action('wp_head', 'wp_generator');
add_filter('the_generator', fn() => '');

/* ================================================================== */
/*  3. Block REST API user enumeration                                 */
/* ================================================================== */

add_filter('rest_endpoints', function ($endpoints) {
    // Remove /wp/v2/users endpoint for non-authenticated users
    if (!is_user_logged_in()) {
        unset($endpoints['/wp/v2/users']);
        unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    }
    return $endpoints;
});

/* ================================================================== */
/*  4. Restrict REST API — only allow specific endpoints publicly      */
/* ================================================================== */

add_filter('rest_authentication_errors', function ($result) {
    if ($result !== null) return $result;

    // Authenticated users (logged in or Application Password) — allow everything
    if (is_user_logged_in()) return $result;

    // Check for Application Password auth header
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!empty($auth) && stripos($auth, 'Basic') === 0) {
        return $result; // Let WordPress handle the auth
    }

    $path = $_SERVER['REQUEST_URI'] ?? '';

    // Allow these public endpoints (needed by frontend)
    $allowed = [
        '/wp/v2/pages',
        '/wp/v2/posts',
        '/wp/v2/categories',
        '/wp/v2/tags',
        '/wp/v2/media',
        '/rankmath/v1/',
    ];

    foreach ($allowed as $endpoint) {
        if (strpos($path, $endpoint) !== false) {
            return $result; // Allow
        }
    }

    // Block everything else for unauthenticated users
    return new WP_Error(
        'rest_forbidden',
        'REST API access restricted.',
        ['status' => 403]
    );
});

/* ================================================================== */
/*  5. Disable author archives (prevents user enumeration via ?author=1) */
/* ================================================================== */

add_action('template_redirect', function () {
    if (is_author()) {
        wp_redirect(home_url(), 301);
        exit;
    }
});

/* ================================================================== */
/*  6. Add security headers                                            */
/* ================================================================== */

add_action('send_headers', function () {
    if (is_admin()) return;

    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header("Permissions-Policy: camera=(), microphone=(), geolocation=()");
});

/* ================================================================== */
/*  7. Limit login attempts (basic rate limiting)                      */
/* ================================================================== */

add_filter('authenticate', function ($user, $username) {
    if (empty($username)) return $user;

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = 'login_attempts_' . md5($ip);
    $attempts = (int) get_transient($key);

    if ($attempts >= 5) {
        return new WP_Error(
            'too_many_attempts',
            'Too many login attempts. Please wait 15 minutes.',
            ['status' => 429]
        );
    }

    return $user;
}, 30, 2);

add_action('wp_login_failed', function () {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = 'login_attempts_' . md5($ip);
    $attempts = (int) get_transient($key);
    set_transient($key, $attempts + 1, 15 * MINUTE_IN_SECONDS);
});

add_action('wp_login', function () {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    delete_transient('login_attempts_' . md5($ip));
});

/* ================================================================== */
/*  8. Disable file editing from admin (prevents code injection)       */
/* ================================================================== */

if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

/* ================================================================== */
/*  9. Unique filenames — append timestamp to avoid duplicates         */
/* ================================================================== */

add_filter('wp_handle_upload_prefilter', function ($file) {
    $info = pathinfo($file['name']);
    $ext = isset($info['extension']) ? '.' . $info['extension'] : '';
    $base = $info['filename'];
    // Append Unix timestamp to make filename unique
    $file['name'] = $base . '-' . time() . $ext;
    return $file;
});

/* Allow SVG uploads */
add_filter("upload_mimes", function($mimes) {
    $mimes["svg"] = "image/svg+xml";
    return $mimes;
});
