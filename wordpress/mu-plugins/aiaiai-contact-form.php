<?php
/**
 * Plugin Name: AIAIAI Contact Form
 * Description: REST API endpoint for contact form + SMTP config from Home page meta.
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

/* ================================================================== */
/*  1. REST API endpoint: POST /aiaiai/v1/contact                      */
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

    // Get Home page for settings
    $home_page = get_page_by_path('home');
    if (!$home_page) {
        $home_page = get_page_by_title('Home');
    }
    $page_id = $home_page ? $home_page->ID : 0;

    // Verify reCAPTCHA
    $recaptcha_token  = sanitize_text_field($body['recaptchaToken'] ?? '');
    $recaptcha_secret = get_post_meta($page_id, 'home_recaptcha_secret_key', true);
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
        // Skip reCAPTCHA requirement for localhost (dev)
        $is_local = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'])
                 || strpos($_SERVER['HTTP_ORIGIN'] ?? '', 'localhost') !== false;
        if (!$is_local) {
            return new WP_REST_Response([
                'ok'      => false,
                'message' => 'reCAPTCHA is required.',
            ], 400);
        }
    }

    // Get email settings from meta
    $recipient = get_post_meta($page_id, 'home_contact_recipient_email', true);
    $subject   = get_post_meta($page_id, 'home_contact_subject', true);

    if (empty($recipient)) {
        $recipient = get_option('admin_email', 'info@ai-ai-ai.co');
    }
    if (empty($subject)) {
        $subject = 'New Contact — AI-AI-AI Website';
    }

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

    // Configure SMTP if settings exist
    aiaiai_configure_smtp($page_id);

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
/*  2. SMTP configuration from Home page meta                          */
/* ================================================================== */

/* ================================================================== */
/*  3. Meta box UI on Home page for Contact & SMTP settings            */
/* ================================================================== */

$aiaiai_contact_fields = [
    ['key' => 'home_contact_recipient_email', 'label' => 'Recipient Email',        'type' => 'email',    'placeholder' => 'info@ai-ai-ai.co'],
    ['key' => 'home_contact_subject',         'label' => 'Email Subject',           'type' => 'text',     'placeholder' => 'New Contact — AI-AI-AI Website'],
    ['key' => 'home_recaptcha_site_key',      'label' => 'reCAPTCHA Site Key',      'type' => 'text',     'placeholder' => '6Le9YK4s...'],
    ['key' => 'home_recaptcha_secret_key',    'label' => 'reCAPTCHA Secret Key',    'type' => 'text',     'placeholder' => '6Le9YK4s...'],
    ['key' => 'home_smtp_host',               'label' => 'SMTP Host',               'type' => 'text',     'placeholder' => 'smtp.gmail.com'],
    ['key' => 'home_smtp_port',               'label' => 'SMTP Port',               'type' => 'number',   'placeholder' => '587'],
    ['key' => 'home_smtp_username',           'label' => 'SMTP Username',           'type' => 'text',     'placeholder' => 'email@gmail.com'],
    ['key' => 'home_smtp_password',           'label' => 'SMTP Password (App Password)', 'type' => 'password', 'placeholder' => ''],
    ['key' => 'home_smtp_encryption',         'label' => 'SMTP Encryption',         'type' => 'text',     'placeholder' => 'tls'],
    ['key' => 'home_smtp_from_email',         'label' => 'From Email',              'type' => 'email',    'placeholder' => 'info@ai-ai-ai.co'],
    ['key' => 'home_smtp_from_name',          'label' => 'From Name',               'type' => 'text',     'placeholder' => 'AI-AI-AI'],
];

add_action('add_meta_boxes', function () {
    // Only show on Home page
    $home_page = get_page_by_path('home');
    $home_id = $home_page ? $home_page->ID : 0;
    add_meta_box(
        'aiaiai-contact-settings',
        '📧 Contact Form & SMTP Settings',
        'aiaiai_render_contact_meta_box',
        'page',
        'normal',
        'high',
        ['home_id' => $home_id]
    );
});

function aiaiai_render_contact_meta_box($post) {
    global $aiaiai_contact_fields;
    $home_page = get_page_by_path('home');
    $home_id = $home_page ? $home_page->ID : 0;

    // Only render on Home page
    if ($post->ID !== $home_id && $post->post_name !== 'home') {
        echo '<p style="color:#999;">This meta box only applies to the Home page.</p>';
        return;
    }

    wp_nonce_field('aiaiai_contact_meta', '_aiaiai_contact_nonce');

    echo '<table class="form-table"><tbody>';
    foreach ($aiaiai_contact_fields as $field) {
        $value = get_post_meta($post->ID, $field['key'], true);
        $type = $field['type'];
        echo '<tr>';
        echo '<th><label for="' . esc_attr($field['key']) . '">' . esc_html($field['label']) . '</label></th>';
        echo '<td>';
        echo '<input type="' . esc_attr($type) . '" id="' . esc_attr($field['key']) . '" name="' . esc_attr($field['key']) . '" value="' . esc_attr($value) . '" placeholder="' . esc_attr($field['placeholder']) . '" class="regular-text" style="width:100%;max-width:400px;" />';
        echo '</td></tr>';
    }
    echo '</tbody></table>';
}

add_action('save_post_page', function ($post_id) {
    global $aiaiai_contact_fields;
    if (!isset($_POST['_aiaiai_contact_nonce']) || !wp_verify_nonce($_POST['_aiaiai_contact_nonce'], 'aiaiai_contact_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    foreach ($aiaiai_contact_fields as $field) {
        if (isset($_POST[$field['key']])) {
            update_post_meta($post_id, $field['key'], sanitize_text_field(wp_unslash($_POST[$field['key']])));
        }
    }
});

function aiaiai_configure_smtp($page_id) {
    $host       = get_post_meta($page_id, 'home_smtp_host', true);
    $port       = get_post_meta($page_id, 'home_smtp_port', true);
    $username   = get_post_meta($page_id, 'home_smtp_username', true);
    $password   = get_post_meta($page_id, 'home_smtp_password', true);
    $encryption = get_post_meta($page_id, 'home_smtp_encryption', true);
    $from_email = get_post_meta($page_id, 'home_smtp_from_email', true);
    $from_name  = get_post_meta($page_id, 'home_smtp_from_name', true);

    if (empty($host) || empty($username) || empty($password)) {
        return; // No SMTP configured, use default wp_mail
    }

    // Override PHPMailer settings
    add_action('phpmailer_init', function ($phpmailer) use ($host, $port, $username, $password, $encryption, $from_email, $from_name) {
        $phpmailer->isSMTP();
        $phpmailer->Host       = $host;
        $phpmailer->Port       = intval($port) ?: 587;
        $phpmailer->SMTPAuth   = true;
        $phpmailer->Username   = $username;
        $phpmailer->Password   = $password;
        $phpmailer->SMTPSecure = $encryption ?: 'tls';

        if ($from_email) {
            $phpmailer->setFrom($from_email, $from_name ?: 'AI-AI-AI');
        }
    });
}
