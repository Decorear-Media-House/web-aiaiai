<?php
$page_id = 10;
$base = 'http://localhost:8080/wp-content/uploads/2026/04';

$data = [
  'hero' => [
    'chip' => 'AI-Enhanced Humanoid Robotics',
    'heading' => 'Embodied AI & Humanoid Robotic Solution',
    'description' => 'Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, scalable planning, and rollout.',
    'cta_primary' => 'Contact Us',
    'cta_secondary' => 'All Services',
    'hero_background_image' => "$base/hero-bg.png",
    'background_color' => '#070E24',
    'stats' => [
      ['top' => 'Pilot-Ready', 'bottom' => 'Planning'],
      ['top' => 'SOP-Driven', 'bottom' => 'Operations'],
      ['top' => 'Multi-Site', 'bottom' => 'Scalability'],
    ],
  ],
  'useCases' => [
    'robots' => [
      [
        'name' => 'AGIBOT X2 ULTRA',
        'header_image' => "$base/x2-ultra-bg.png",
        'title' => 'Embodied AI & Humanoid Robotic Solution',
        'description' => 'An intelligent humanoid robot with advanced capabilities in movement, interaction, and environmental awareness. Designed for versatile applications across multiple industries.',
        'video_thumb' => "$base/x2-video-thumb.png",
        'specs' => [
          ['label' => 'Height / Weight / Arm Payload', 'value' => '131 cm / 37 kg / 3 kg'],
          ['label' => 'Battery', 'value' => '1 hour charging / up to 2 hours usage per cycle'],
          ['label' => 'Intelligent Perception', 'value' => 'RGBD Camera + RGB Camera + Interaction Camera + LiDAR'],
          ['label' => 'Processing Unit', 'value' => 'High-performance NVIDIA Orin NX 16GB'],
          ['label' => 'Interaction Capability', 'value' => 'Supports interactive responses'],
          ['label' => 'Degrees of Freedom (DOF)', 'value' => 'Full body: 31 / Arms: 7'],
        ],
        'features' => [
          [
            'title' => 'Entertainment & Commercial Performance',
            'items' => [
              '· Supports various activities such as TikTok dancing, drumming, and electric guitar playing',
              '· Enables synchronized group performances with multiple robots',
            ],
            'feature_image' => "$base/x2-feature1.png",
          ],
          [
            'title' => 'Automatic Presentation & Interaction',
            'items' => [
              'Welcomes guests, guides visitors, and provides intelligent responses',
              'Recognizes faces and initiates conversations automatically',
              'Demonstrates over 30 pre-programmed actions',
              'Adjustable voice system, facial expressions, and flexible motion control',
            ],
            'feature_image' => "$base/x2-feature2.png",
          ],
        ],
        'note' => 'Recommended operation time: 7-8 minutes per session, with a rest period of 20 minutes.',
      ],
      [
        'name' => 'AGIBOT D1 EDU',
        'header_image' => "$base/d1-edu-bg.png",
        'title' => 'Embodied AI & Humanoid Robotic Solution',
        'description' => 'A compact, fast, and highly agile robot designed for dynamic environments. It features a self-learning motion system, allowing it to adapt to various terrains.',
        'video_thumb' => "$base/d1-video-thumb.png",
        'specs' => [
          ['label' => 'Weight', 'value' => '15 kg'],
          ['label' => 'Maximum Payload', 'value' => '8 kg'],
          ['label' => 'Battery', 'value' => '1 hour charging / up to 2 hours usage'],
          ['label' => 'Step Climbing Ability', 'value' => '> 16 cm'],
          ['label' => 'Maximum Speed', 'value' => '3.7 m/s'],
          ['label' => 'Maximum Jump Height', 'value' => '35 cm'],
        ],
        'features' => [
          [
            'title' => 'AI-Enhanced Learning',
            'items' => ['Capable of navigating complex environments such as uneven terrain and stairs, with strong balance and anti-tipping capabilities.'],
            'feature_image' => "$base/d1-feature1.png",
          ],
          [
            'title' => 'High-Performance Power System',
            'items' => ['Advanced joint system with industry-leading performance, delivering up to 2 kW/kg power density.'],
            'feature_image' => "$base/d1-feature2.png",
          ],
          [
            'title' => 'Dynamic Mobility',
            'items' => ['Lightweight design combined with high agility, enabling flexible movement in constrained environments.'],
          ],
          [
            'title' => 'Expandable & Customizable',
            'items' => ['Equipped with standard expansion interfaces to support secondary development and personalized customization.'],
          ],
        ],
        'note' => 'It is recommended to allow the robot to rest after extended operation (approximately 30 minutes).',
      ],
      [
        'name' => 'A2 ULTRA',
        'header_image' => "$base/a2-ultra-bg.png",
        'title' => 'Embodied AI & Humanoid Robotic Solution',
        'description' => 'A large-scale humanoid robot designed for full commercial deployment in industrial environments. Certified CR, CE-MD, CE-RED, and FCC. Deployed in more than 20 leading companies worldwide.',
        'specs' => [
          ['label' => 'Height / Weight', 'value' => '169 cm / 69 kg'],
          ['label' => 'Walking Speed', 'value' => '0.8 m/s'],
          ['label' => 'Battery', 'value' => '1 hour charging / up to 3 hours usage per cycle'],
          ['label' => 'Perception System', 'value' => 'LiDAR + Fisheye Camera + RGBD Camera + RGB Camera'],
          ['label' => 'Processing Unit', 'value' => 'High-performance NVIDIA Jetson Orin'],
          ['label' => 'Intelligent System', 'value' => 'Intelligent interaction with built-in skill package'],
          ['label' => 'Degrees of Freedom', 'value' => '40 (Arms: 7 / Legs: 6 / Hands: 6)'],
        ],
        'features' => [
          [
            'title' => 'Professional Reception & Service Assistant',
            'items' => [
              'Provides intelligent greetings, VIP services, and guided assistance',
              'Recognizes faces, delivers personalized greetings, and can serve drinks',
              'Supports over 10 facial expressions and more than 100 motion combinations',
            ],
            'feature_image' => "$base/a2-feature.png",
          ],
          [
            'title' => 'Brand Promotion & Event Hosting',
            'items' => [
              'Customizable appearance, personality, and voice interaction',
              'Supports brand promotion and social media content creation',
              'Capable of remembering faces and engaging in interactive communication',
            ],
          ],
        ],
      ],
      [
        'name' => 'AGIBOT G2',
        'header_image' => "$base/g2-bg.png",
        'title' => 'Embodied AI & Humanoid Robotic Solution',
        'description' => 'Industrial-grade intelligent humanoid robot with fully modular structure and 100% humanoid form. Powered by the intelligent Genie RL system for rapid deployment.',
        'specs' => [
          ['label' => 'Height / Weight', 'value' => '185 cm'],
          ['label' => 'Power System', 'value' => 'Single charge usage over 2 hours'],
          ['label' => 'Performance', 'value' => 'Each arm can handle up to 5 kg'],
          ['label' => 'Battery Life', 'value' => 'Up to 4 hours (dual batteries, 1652 Wh)'],
          ['label' => 'Degrees of Freedom', 'value' => 'Total 26 (7 per arm, 5 per leg, 4 waist, 3 head)'],
          ['label' => 'Processing Unit', 'value' => 'NVIDIA Jetson T5000, AI up to 2070 TFLOPS'],
          ['label' => 'Sensor System', 'value' => '2x 3D LiDAR, 3x Fisheye, 3x RGB-D, 1x Stereo'],
          ['label' => 'Durability', 'value' => 'Dust and water resistance IP42'],
        ],
        'features' => [
          [
            'title' => 'Industrial-Grade Durability',
            'items' => ['Full 100% humanoid structure with IP42 protection, suitable for real industrial environments.'],
            'feature_image' => "$base/g2-feature1.png",
          ],
          [
            'title' => 'High Precision',
            'items' => ['Advanced force control enabling assembly precision at millimeter-level.'],
            'feature_image' => "$base/g2-feature2.png",
          ],
          [
            'title' => 'Ready-to-Deploy System',
            'items' => ['Pre-trained AI model with Genie RL for quick adaptation to production lines.'],
          ],
          [
            'title' => 'Human-Like Intelligent Interaction',
            'items' => ['Natural conversation and real-time interaction, including eye-gaze tracking and facial expressions.'],
          ],
        ],
      ],
    ],
  ],
  'outcomes' => [
    'chip' => 'Outcomes',
    'heading' => 'What Robotics ',
    'heading_highlight' => 'Achieves',
    'description' => 'Structured deployment unlocks measurable operational improvements - from day one through full-scale rollout.',
    'background_color' => '#1E2E48',
    'outcomes_image' => "$base/outcomes-photo-1.png",
    'accordion_items' => [
      [
        'label' => 'Labor efficiency & cost reduction',
        'iconGradient' => 'linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 146, 184) 100%)',
        'items' => [
          'Automate repetitive tasks to improve throughput',
          'Reduce operational load for routine work',
          'Focus people on exceptions and higher-value tasks',
        ],
      ],
      [
        'label' => 'Operational consistency',
        'iconGradient' => 'linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(0, 184, 219) 100%)',
        'items' => [
          'SOP-driven routines improve repeatability',
          'Reduce variance across shifts/sites',
        ],
      ],
      [
        'label' => 'Safety & governance',
        'iconGradient' => 'linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)',
        'items' => [
          'Training and readiness planning',
          'Escalation paths and service readiness',
          'Boundaries and fallback procedures',
        ],
      ],
      [
        'label' => 'Scalability',
        'iconGradient' => 'linear-gradient(135deg, rgb(142, 81, 255) 0%, rgb(21, 93, 252) 100%)',
        'items' => [
          'Rollout checklists and readiness criteria',
          'Monitoring and operational management approach',
          'Scale playbooks for multi-site expansion',
        ],
      ],
    ],
  ],
  'deliverables' => [
    'chip' => 'Deliverables',
    'heading' => 'What We ',
    'heading_highlight' => 'Deliver',
    'description' => 'Six structured work products that take you from concept to operating robotics at scale.',
    'background_color' => '#070E24',
    'items' => [
      ['num' => '01', 'title' => 'Task definition and environment constraints'],
      ['num' => '02', 'title' => 'Pilot readiness plan with KPIs'],
      ['num' => '03', 'title' => 'SOPs and training approach'],
      ['num' => '04', 'title' => 'Maintenance/service readiness and escalation'],
      ['num' => '05', 'title' => 'Workflow integration into reporting and operations'],
      ['num' => '06', 'title' => 'Rollout governance and scale planning'],
    ],
  ],
  'cta' => [
    'heading' => 'Tell us the environment and ',
    'heading_highlight' => 'target tasks.',
    'description' => 'We will propose a pilot approach.',
    'chips' => ['Target environment', 'Robot model', 'Task description'],
    'cta_primary' => 'Contact Us',
    'cta_secondary' => 'All Services',
    'background_image' => "$base/cta-bg-1.png",
    'background_color' => '#070E24',
  ],
];

$json = wp_slash(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
update_post_meta($page_id, 'page_sections', $json);

$verify = json_decode(get_post_meta($page_id, 'page_sections', true), true);
echo "Sections: " . implode(', ', array_keys($verify)) . "\n";
echo "Robots: " . count($verify['useCases']['robots']) . "\n";
echo "Robot 1: " . $verify['useCases']['robots'][0]['name'] . "\n";
echo "Accordion items: " . count($verify['outcomes']['accordion_items']) . "\n";
echo "Accordion[0] items type: " . gettype($verify['outcomes']['accordion_items'][0]['items']) . "\n";
