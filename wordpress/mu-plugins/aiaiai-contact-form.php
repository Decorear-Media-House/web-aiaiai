<?php
/**
 * Plugin Name: AIAIAI Contact Form
 * Description: REST API endpoint for contact form. Reads SMTP/reCAPTCHA from Decorear Tools → Email Settings.
 * Version: 2.0.0
 */

defined('ABSPATH') || exit;

/* ================================================================== */
/*  Auto-migrate: move email settings from Home page meta → options    */
/* ================================================================== */
add_action('admin_init', function () {
    if (get_option('aiaiai_email_migrated')) return;
    $home = get_page_by_path('home');
    if (!$home) return;
    $pid = $home->ID;
    $map = [
        'home_contact_recipient_email' => 'recipient_email',
        'home_contact_subject'         => 'email_subject',
        'home_recaptcha_site_key'      => 'recaptcha_site_key',
        'home_recaptcha_secret_key'    => 'recaptcha_secret',
        'home_smtp_host'               => 'smtp_host',
        'home_smtp_port'               => 'smtp_port',
        'home_smtp_username'           => 'smtp_username',
        'home_smtp_password'           => 'smtp_password',
        'home_smtp_encryption'         => 'smtp_encryption',
        'home_smtp_from_email'         => 'smtp_from_email',
        'home_smtp_from_name'          => 'smtp_from_name',
    ];
    $existing = get_option('aiaiai_email_settings', []);
    if (!empty($existing)) { update_option('aiaiai_email_migrated', 1); return; }
    $settings = [];
    foreach ($map as $old => $new) {
        $v = get_post_meta($pid, $old, true);
        if ($v) $settings[$new] = $v;
    }
    if ($settings) {
        update_option('aiaiai_email_settings', $settings);
    }
    update_option('aiaiai_email_migrated', 1);
}, 5);

/* ================================================================== */
/*  REST API endpoint: POST /aiaiai/v1/contact                         */
/* ================================================================== */

add_action('rest_api_init', function () {
    register_rest_route('aiaiai/v1', '/contact', [
        'methods'             => 'POST',
        'callback'            => 'aiaiai_handle_contact_form',
        'permission_callback' => '__return_true',
    ]);
});

function aiaiai_handle_contact_form(WP_REST_Request $request) {
    $body = $request->get_json_params();

    // Validate required fields
    $full_name = sanitize_text_field($body['fullName'] ?? '');
    $email     = sanitize_email($body['email'] ?? '');
    $phone     = sanitize_text_field($body['phone'] ?? '');
    $company   = sanitize_text_field($body['company'] ?? '');
    $role      = sanitize_text_field($body['role'] ?? '');
    $message   = sanitize_textarea_field($body['message'] ?? '');

    if (empty($full_name) || empty($email) || empty($company)) {
        return new WP_REST_Response([
            'ok'      => false,
            'message' => 'Full name, email, and company are required.',
        ], 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response([
            'ok'      => false,
            'message' => 'Invalid email address.',
        ], 400);
    }

    // Get settings from Decorear Tools → Email Settings
    $s = get_option('aiaiai_email_settings', []);

    // Verify reCAPTCHA
    $recaptcha_token  = sanitize_text_field($body['recaptchaToken'] ?? '');
    $recaptcha_secret = $s['recaptcha_secret'] ?? '';
    if ($recaptcha_secret && $recaptcha_token) {
        $verify = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', [
            'body' => [
                'secret'   => $recaptcha_secret,
                'response' => $recaptcha_token,
            ],
        ]);
        $verify_body = json_decode(wp_remote_retrieve_body($verify), true);
        if (empty($verify_body['success'])) {
            return new WP_REST_Response([
                'ok'      => false,
                'message' => 'reCAPTCHA verification failed.',
            ], 403);
        }
    } elseif ($recaptcha_secret && !$recaptcha_token) {
        // Skip reCAPTCHA for localhost (dev)
        $is_local = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'])
                 || strpos($_SERVER['HTTP_ORIGIN'] ?? '', 'localhost') !== false;
        if (!$is_local) {
            return new WP_REST_Response([
                'ok'      => false,
                'message' => 'reCAPTCHA is required.',
            ], 400);
        }
    }

    // Email settings
    $recipient = $s['recipient_email'] ?? '';
    $subject   = $s['email_subject'] ?? '';
    if (empty($recipient)) $recipient = get_option('admin_email', 'info@ai-ai-ai.co');
    if (empty($subject))   $subject = 'New Contact — AI-AI-AI Website';

    // Build email body
    $email_body  = "New contact form submission from AI-AI-AI website:\n\n";
    $email_body .= "Name: {$full_name}\n";
    $email_body .= "Email: {$email}\n";
    if ($phone)   $email_body .= "Phone: {$phone}\n";
    $email_body .= "Company: {$company}\n";
    if ($role)    $email_body .= "Role: {$role}\n";
    $email_body .= "\nMessage:\n{$message}\n";
    $email_body .= "\n---\nSent from: https://ai-ai-ai.co";

    $headers = [
        "From: AI-AI-AI <{$recipient}>",
        "Reply-To: {$full_name} <{$email}>",
        "Content-Type: text/plain; charset=UTF-8",
    ];

    // Configure SMTP
    aiaiai_configure_smtp_from_option();

    $sent = wp_mail($recipient, $subject, $email_body, $headers);

    if ($sent) {
        return new WP_REST_Response([
            'ok'      => true,
            'message' => 'Message sent successfully.',
        ], 200);
    }

    return new WP_REST_Response([
        'ok'      => false,
        'message' => 'Failed to send email. Please try again later.',
    ], 500);
}

/* ================================================================== */
/*  REST endpoint to expose reCAPTCHA site key to frontend             */
/* ================================================================== */

add_action('rest_api_init', function () {
    register_rest_route('aiaiai/v1', '/recaptcha-key', [
        'methods'             => 'GET',
        'callback'            => function () {
            $s = get_option('aiaiai_email_settings', []);
            return new WP_REST_Response([
                'site_key' => $s['recaptcha_site_key'] ?? '',
            ], 200);
        },
        'permission_callback' => '__return_true',
    ]);
});
