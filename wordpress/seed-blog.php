<?php
/**
 * Seed blog page + 4 sample posts with featured image (looked up by
 * filename from the Media Library) and Rank Math SEO meta.
 */

require_once __DIR__ . '/seed-helpers.php';

// 1. Create Blog page (for hero content)
$blog_page = get_page_by_path('blog');
if (!$blog_page) {
    $blog_id = wp_insert_post([
        'post_title' => 'Blog',
        'post_name' => 'blog',
        'post_status' => 'publish',
        'post_type' => 'page',
    ]);
    echo "Created blog page: $blog_id\n";
} else {
    $blog_id = $blog_page->ID;
    echo "Blog page exists: $blog_id\n";
}

// 2. Create categories
$categories = ['AI Strategy', 'AI Security', 'Robotics', 'Governance', 'Delivery'];
foreach ($categories as $cat) {
    if (!term_exists($cat, 'category')) {
        wp_insert_term($cat, 'category');
        echo "Created category: $cat\n";
    }
}

// 3. Create sample blog posts
$posts = [
    [
        'title' => 'From PoC to Production: Why Most AI Projects Fail After the Demo',
        'category' => 'AI Strategy',
        'featured_image_basename' => 'image-39-1775623189.png',
        'rankmath_meta' => [
            'rank_math_title' => 'From PoC to Production: Why Most AI Projects Fail After the Demo | AIAIAI',
            'rank_math_description' => 'A successful proof of concept is not a green light for production. Learn why the gap between demo and live system is where most AI initiatives stall.',
            'rank_math_focus_keyword' => 'AI PoC to production',
        ],
        'excerpt' => 'A successful proof of concept is not a green light for production. Here\'s why the gap between demo and live system is where most AI initiatives stall — and what to do about it.',
        'content' => '<p>Most AI projects don\'t fail at the idea stage. They fail after the applause. The proof of concept works, stakeholders are excited, and the green light is given. Then reality sets in.</p>

<h2>The Demo Is Not a System</h2>
<p>A PoC is designed to answer one question: \'can this work in principle?\' It runs on curated data, in an isolated environment, with full attention from the team that built it.</p>
<p>The moment you decide to deploy it, you\'re no longer asking \'can it work?\' You\'re asking: \'can it work reliably, for non-technical users, at scale, without constant babysitting?\'</p>

<h2>Five Failure Points to Know Before You Start</h2>
<h3>1. Data Reality Gap</h3>
<p>PoC data is almost always cleaner than production data. Teams curate the best examples for demos.</p>

<h3>2. Integration Debt</h3>
<p>The AI model is rarely the hard part. The hard part is connecting it to your CRM, ERP, communication tools, approval workflows, and operational systems.</p>

<h3>3. No Ownership Model</h3>
<p>Who monitors the model\'s performance next month? Who decides when a threshold needs changing?</p>

<h3>4. Change Resistance</h3>
<p>Even technically excellent AI systems fail when the people they\'re meant to help don\'t trust them.</p>

<h3>5. Missing Governance Layer</h3>
<p>As soon as an AI system influences real decisions — routing a customer, flagging an anomaly — it needs audit trails, access controls, and incident protocols.</p>

<h2>What Bridging the Gap Actually Requires</h2>
<p>The answer isn\'t to slow down the PoC phase. It\'s to treat the PoC as step one of a structured delivery process.</p>',
    ],
    [
        'title' => 'Your AI Solution Partner from Roadmap to Production Deployment',
        'category' => 'Delivery',
        'featured_image_basename' => 'image-40-1775623188.png',
        'rankmath_meta' => [
            'rank_math_title' => 'Your AI Solution Partner from Roadmap to Production | AIAIAI',
            'rank_math_description' => 'How AIAIAI helps organizations move from AI ambition to production deployment with structured delivery, governance, and operational readiness.',
            'rank_math_focus_keyword' => 'AI solution partner',
        ],
        'excerpt' => 'How AIAIAI helps organizations move from AI ambition to production deployment with structured delivery, governance, and operational readiness.',
        'content' => '<p>Organizations that succeed with AI don\'t just have better models. They have better delivery processes.</p>

<h2>What an AI Solution Partner Does</h2>
<p>An AI Solution Partner bridges the gap between strategy and execution. We don\'t just advise — we help you ship AI that works in real operations.</p>

<h2>The Delivery Framework</h2>
<p>Our approach follows six phases: Assess &amp; Discover → Roadmap → PoC → MVP → Production Deployment → Scale.</p>

<h2>Why Governance Matters from Day One</h2>
<p>Too many teams bolt on governance after deployment. We build it in from the start — access controls, audit trails, monitoring, and incident handling.</p>',
    ],
    [
        'title' => 'AI Security: Converting Cameras into Operational Intelligence',
        'category' => 'AI Security',
        'featured_image_basename' => 'image-41-1775623187.png',
        'rankmath_meta' => [
            'rank_math_title' => 'AI Security: Converting Cameras into Operational Intelligence | AIAIAI',
            'rank_math_description' => 'How Computer Vision and AI video analytics transform passive CCTV into active security operations with real-time detection, alerting, and incident workflows.',
            'rank_math_focus_keyword' => 'AI video analytics',
        ],
        'excerpt' => 'How Computer Vision and AI video analytics transform passive CCTV systems into active security operations with real-time detection, alerting, and incident workflows.',
        'content' => '<p>Most organizations have cameras. Few have intelligence. The difference isn\'t hardware — it\'s workflow.</p>

<h2>From Passive Monitoring to Active Response</h2>
<p>Traditional CCTV requires human operators watching screens 24/7. AI video analytics changes the equation: cameras become sensors that detect, alert, and trigger response workflows automatically.</p>

<h2>What AI Security Actually Delivers</h2>
<p>Detection consistency across zones and shifts. Faster time-to-response through alert routing. Evidence capture for every incident. Multi-site visibility through unified dashboards.</p>',
    ],
    [
        'title' => 'Humanoid Robotics in Production: Beyond the Demo Stage',
        'category' => 'Robotics',
        'featured_image_basename' => 'image-42-1775623186.png',
        'rankmath_meta' => [
            'rank_math_title' => 'Humanoid Robotics in Production: Beyond the Demo Stage | AIAIAI',
            'rank_math_description' => 'Deploying humanoid robots in real operations requires more than technology — it needs SOPs, training, integration planning, and governance.',
            'rank_math_focus_keyword' => 'humanoid robots production',
        ],
        'excerpt' => 'Deploying humanoid robots in real operations requires more than technology — it requires SOPs, training, integration planning, and governance.',
        'content' => '<p>Humanoid robots capture imagination. But deploying them in real operations requires structured planning that goes far beyond the technology itself.</p>

<h2>The Deployment Challenge</h2>
<p>A robot that performs impressively in a controlled demo may struggle with real-world variability: uneven floors, unexpected obstacles, human interactions it wasn\'t trained for.</p>

<h2>What Production Readiness Looks Like</h2>
<p>Task definition and environment constraints. Safety SOPs and training. Maintenance schedules and escalation paths. Integration with operational reporting.</p>',
    ],
];

foreach ($posts as $post_data) {
    // Check if post exists
    $existing = get_page_by_title($post_data['title'], OBJECT, 'post');
    if ($existing) {
        echo "Post exists: {$post_data['title']}\n";
        continue;
    }

    $cat = get_term_by('name', $post_data['category'], 'category');
    $cat_id = $cat ? $cat->term_id : 1;

    $post_id = wp_insert_post([
        'post_title' => $post_data['title'],
        'post_content' => $post_data['content'],
        'post_excerpt' => $post_data['excerpt'],
        'post_status' => 'publish',
        'post_type' => 'post',
        'post_category' => [$cat_id],
    ]);

    if (!$post_id || is_wp_error($post_id)) continue;
    echo "Created post: {$post_data['title']} (ID: $post_id)\n";

    $basename = $post_data['featured_image_basename'] ?? '';
    if ($basename) {
        $attach_id = aiaiai_attachment_id_by_basename($basename);
        if ($attach_id) {
            set_post_thumbnail($post_id, $attach_id);
            echo "  thumbnail: $basename → $attach_id\n";
        } else {
            echo "  thumbnail: $basename not in Media Library\n";
        }
    }

    foreach (($post_data['rankmath_meta'] ?? []) as $k => $v) {
        update_post_meta($post_id, $k, $v);
    }
}

echo "\nBlog seed complete!\n";
