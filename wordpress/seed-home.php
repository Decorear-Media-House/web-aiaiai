<?php
$page_id = 6; // Home page

$base = 'http://localhost:8080/wp-content/uploads/2026/04';
$meta = get_post_meta($page_id, 'page_sections', true);
$data = json_decode($meta, true) ?: [];

// Update with latest Figma content
$data['hero'] = array_merge($data['hero'] ?? [], [
    'label' => 'AI Solution Partner · Thailand',
    'heading' => 'Your AI Solution Partner from roadmap to production deployment.',
    'description' => 'We help organizations adopt practical AI that reduces cost, increases revenue, strengthens compliance, and improves security—through AI Solution Partnership, Computer Vision security, and humanoid robotics deployment.',
    'cta_text' => 'Contact Us',
    'cta_subtext' => 'Share your goal and constraints. Our team will reach out.',
    'stats' => [
        ['value' => '3+', 'label' => 'AI Solutions'],
        ['value' => '100%', 'label' => 'Outcome-Driven'],
        ['value' => 'PoC→', 'label' => 'Production'],
        ['value' => '24/7', 'label' => 'AI Operations'],
    ],
]);

$data['about'] = array_merge($data['about'] ?? [], [
    'heading' => 'AI-AI-AI Co., Ltd.',
    'paragraphs' => [
        'AI-AI-AI Co., Ltd. helps organizations adopt AI in a practical, outcome-driven way. We operate as an AI Solution Partner (and AI development partner) — guiding you from strategy and use-case discovery through PoC, MVP, and full production deployment.',
        'We also deliver specialized solutions in Computer Vision security / AI video analytics and humanoid robotics deployment (AgiBot with enhanced AI capability) — each designed for real operational adoption, not just proof of concept.',
    ],
]);

$data['problems'] = array_merge($data['problems'] ?? [], [
    'label' => 'The Problem We Solve',
    'headingWhite' => 'AI is easy to demo. ',
    'headingGradient' => 'Hard to deploy.',
    'description' => 'Most organizations face at least one of these realities before they can scale AI.',
    'cards' => [
        ['title' => 'Stuck at PoC', 'description' => 'No one owns integration and rollout — AI pilots never reach production.'],
        ['title' => 'Too Many Use Cases', 'description' => "Teams can't prioritize without certainty on ROI or a clear starting point."],
        ['title' => 'No Operational Control', 'description' => 'Missing auditability, approval flows, and human-in-the-loop guardrails.'],
        ['title' => 'Security Gaps', 'description' => "Cameras alone aren't enough — teams need actionable intelligence and workflows."],
        ['title' => 'Data Not Ready', 'description' => "Data exists but isn't structured, governed, or production-grade."],
        ['title' => 'Physical Automation Risk', 'description' => 'Deploying robots requires safety SOPs, maintenance plans, and escalation paths.'],
    ],
    'footer_text' => 'AI-AI-AI exists to turn AI ambition into deployed solutions that teams can operate and scale — from day one to full production.',
]);

$data['services'] = array_merge($data['services'] ?? [], [
    'label' => 'Our Services',
    'heading' => 'What We Do',
    'description' => 'Three specialized AI solution lines designed to deliver measurable outcomes across security, automation, and digital transformation.',
    'items' => [
        [
            'label' => 'Computer Vision · Analytics',
            'heading' => 'AI Security Guard Solution',
            'description' => 'Computer Vision and AI video analytics / AI video surveillance for event detection, alerts, and incident workflows.',
            'cta' => 'Explore Security Platform',
            'href' => '/services/security',
        ],
        [
            'label' => 'AgiBot · Robotics · Automation',
            'heading' => 'Embodied AI & Humanoid Robotic Solution',
            'description' => 'AgiBot humanoid robotics deployment and workflow integration with enhanced AI capability designed for operational readiness and scale.',
            'cta' => 'Explore Robotics',
            'href' => '/services/humanoid',
        ],
        [
            'label' => 'Strategy · PoC · Production',
            'heading' => 'AI Solution Partner',
            'description' => 'AI consulting and hands-on delivery: AI roadmap → PoC → MVP → production deployment, built for real operations.',
            'cta' => 'Explore AI Solution Partner',
            'href' => '/services/partner',
        ],
    ],
]);

$data['outcomes'] = array_merge($data['outcomes'] ?? [], [
    'label' => 'Impact',
    'heading' => 'Outcomes We Deliver',
    'description' => 'Every engagement is measured against real business outcomes—not just technical milestones.',
]);

$data['process'] = array_merge($data['process'] ?? [], [
    'label' => 'Our Process',
    'heading' => 'How We Work',
    'description' => 'A structured, outcome-driven delivery process—from initial discovery through scale.',
]);

$data['cta'] = array_merge($data['cta'] ?? [], [
    'heading' => 'Ready to ship AI that produces outcomes?',
    'description' => 'Tell us what outcome matters most—cost, revenue, compliance, security, or automation—and we will propose a practical first step.',
]);

$data['contact'] = array_merge($data['contact'] ?? [], [
    'label' => 'Get In Touch',
    'heading' => 'Contact Us',
    'description' => 'Tell us what you want to achieve—cost reduction, revenue growth, compliance improvement, security enhancement, or operational automation.',
    'email' => 'info@ai-ai-ai.co',
    'address' => '1104/2 4th floor, Pattanakarn Road, Suan Luang, Bangkok, Thailand 10250',
]);

$json = wp_slash(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
update_post_meta($page_id, 'page_sections', $json);

// Verify
$check = json_decode(get_post_meta($page_id, 'page_sections', true), true);
echo "Updated Home page - sections: " . implode(', ', array_keys($check)) . "\n";
echo "Hero heading: " . $check['hero']['heading'] . "\n";
echo "Problems cards: " . count($check['problems']['cards']) . "\n";
echo "Services items: " . count($check['services']['items']) . "\n";
