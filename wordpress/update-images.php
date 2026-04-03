<?php
// Run inside WP container: wp eval-file /tmp/update-images.php --allow-root

$base = "http://localhost:8080/wp-content/uploads/2026/04";

// HOME page
$home = get_page_by_path('home');
if ($home) {
    $d = json_decode(get_post_meta($home->ID, 'page_sections', true), true);
    $d['hero']['hero_background_image'] = "$base/about-hero-bg.jpg";
    $d['hero']['brand_logo_image'] = "$base/aaa-vector.svg";
    $d['about']['section_background_image'] = "$base/about-hero-bg.jpg";
    for ($i = 0; $i < count($d['problems']['cards'] ?? []); $i++) {
        $n = $i + 1;
        $d['problems']['cards'][$i]['card_image'] = "$base/card{$n}-bg.png";
    }
    $d['services']['items'][0]['card_background_image'] = "$base/service1-security.jpg";
    $d['services']['items'][1]['card_background_image'] = "$base/service2-robotics.jpg";
    $d['services']['items'][2]['card_background_image'] = "$base/service3-ai-partner.jpg";
    $d['outcomes']['decorative_image'] = "$base/outcomes-robot.png";
    $d['process']['side_panel_image'] = "$base/howwework-side.webp";
    $d['cta']['background_video'] = "$base/CTA-Loop.mp4";
    $d['contact']['google_map_url'] = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0!2d100.6308!3d13.7230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzIyLjgiTiAxMDDCsDM3JzUwLjkiRQ!5e0!3m2!1sen!2sth!4v1700000000000";
    update_post_meta($home->ID, 'page_sections', wp_json_encode($d, JSON_UNESCAPED_UNICODE));
    echo "Home updated\n";
}

// ABOUT page
$about = get_page_by_path('about');
if ($about) {
    $d = json_decode(get_post_meta($about->ID, 'page_sections', true), true);
    $d['hero']['hero_background_image'] = "$base/about-hero-bg.jpg";
    $d['mission']['mission_background_image'] = "$base/about-mission-bg-3ce2d2.png";
    $d['edge']['edge_photo_image'] = "$base/about-edge-photo.jpg";
    $d['leadership']['logo_image'] = "$base/about-aieat-logo.png";
    $d['leadership']['background_color'] = "";
    $d['leadership']['background_image'] = "";
    $d['team']['ceo_photo_image'] = "$base/about-ceo.jpg";
    $d['team']['cto_photo_image'] = "$base/about-cto.jpg";
    $d['team']['coo_photo_image'] = "$base/about-coo.jpg";

    // Fix philosophy to match Figma
    $d['philosophy'] = [
        'label' => 'Philosophy',
        'headingPrefix' => 'How we ',
        'headingHighlight' => 'Think',
        'subtitle' => 'AI is not just a model. AI is a system inside operations.',
        'introText' => "That's why we focus on delivery patterns that work in real organizations — not just technically impressive prototypes.",
        'principles' => [
            ['num' => '01', 'label' => 'People and processes'],
            ['num' => '02', 'label' => 'Governance and controls'],
            ['num' => '03', 'label' => 'Data and integration'],
            ['num' => '04', 'label' => 'Monitoring and continuous improvement'],
        ],
    ];
    $d['hero']['heading'] = "About\nAI-AI-AI Co., Ltd.";
    update_post_meta($about->ID, 'page_sections', wp_json_encode($d, JSON_UNESCAPED_UNICODE));
    echo "About updated\n";
}

// SERVICES page
$svc = get_page_by_path('services');
if ($svc) {
    $d = json_decode(get_post_meta($svc->ID, 'page_sections', true), true);
    $d['hero']['background_image'] = "$base/services-security-hero-bg.jpg";
    $d['hero']['background_color'] = "";
    update_post_meta($svc->ID, 'page_sections', wp_json_encode($d, JSON_UNESCAPED_UNICODE));
    echo "Services updated\n";
}

// SECURITY page
$sec = get_page_by_path('security');
if ($sec) {
    $d = json_decode(get_post_meta($sec->ID, 'page_sections', true), true);
    $d['hero']['hero_background_image'] = "$base/security-hero-bg.jpg";
    $d['hero']['background_color'] = "";
    update_post_meta($sec->ID, 'page_sections', wp_json_encode($d, JSON_UNESCAPED_UNICODE));
    echo "Security updated\n";
}

// HUMANOID page
$hum = get_page_by_path('humanoid');
if ($hum) {
    $d = json_decode(get_post_meta($hum->ID, 'page_sections', true), true);
    $d['hero']['hero_background_image'] = "$base/humanoid-hero-bg.jpg";
    $d['hero']['background_color'] = "";
    update_post_meta($hum->ID, 'page_sections', wp_json_encode($d, JSON_UNESCAPED_UNICODE));
    echo "Humanoid updated\n";
}

// PARTNER page
$par = get_page_by_path('partner');
if ($par) {
    $d = json_decode(get_post_meta($par->ID, 'page_sections', true), true);
    $d['hero']['hero_background_image'] = "$base/partner-hero-bg.jpg";
    $d['hero']['background_color'] = "";
    update_post_meta($par->ID, 'page_sections', wp_json_encode($d, JSON_UNESCAPED_UNICODE));
    echo "Partner updated\n";
}

echo "All pages updated!\n";
