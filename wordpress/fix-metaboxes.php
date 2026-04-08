<?php
/**
 * Rebuild ALL JetEngine meta box definitions from actual database fields.
 * This reads existing meta keys and creates proper meta box UI.
 */

function tf2($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"text","object_type"=>"field"];}
function ta2($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"textarea","object_type"=>"field"];}
function mf2($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"media","object_type"=>"field","value_format"=>"url"];}
function cf2($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"colorpicker","object_type"=>"field"];}
function rf2($n,$t,$sf){return ["name"=>$n,"title"=>$t,"type"=>"repeater","object_type"=>"field","repeater-fields"=>$sf];}

function make_field($key, $value) {
    $label = ucwords(str_replace('_', ' ', preg_replace('/^(home|about|svc|sec|hum|ptr)_[a-z]+_/', '', $key)));
    if (preg_match('/(image|bg_image|photo|logo|thumb|icon)/', $key)) {
        return mf2($key, $label);
    }
    if (preg_match('/(color)/', $key)) {
        return cf2($key, $label);
    }
    if (is_string($value) && strlen($value) > 100) {
        return ta2($key, $label);
    }
    return tf2($key, $label);
}

function build_box($id, $name, $page_id, $fields) {
    return [
        "id" => $id,
        "labels" => ["name" => $name],
        "args" => [
            "object_type" => "post",
            "allowed_post_type" => ["page"],
            "active" => true,
            "show_in_rest" => true,
            "position" => "normal",
            "active_conditions" => ["allowed_posts"],
            "allowed_posts" => [strval($page_id)],
        ],
        "meta_fields" => $fields,
    ];
}

// Page definitions
$pages = [
    'home' => ['id' => 6, 'prefix' => 'home_', 'sections' => [
        'hero' => 'Home — Hero',
        'about' => 'Home — About',
        'problem' => 'Home — Problems',
        'services' => 'Home — Services',
        'outcomes' => 'Home — Outcomes',
        'process' => 'Home — Process',
        'how_we_work' => 'Home — How We Work',
        'cta' => 'Home — CTA',
        'contact' => 'Home — Contact',
    ]],
    'about' => ['id' => 7, 'prefix' => 'about_', 'sections' => [
        'hero' => 'About — Hero',
        'mission' => 'About — Mission',
        'philosophy' => 'About — Philosophy',
        'edge' => 'About — Edge',
        'leadership' => 'About — Leadership',
        'team' => 'About — Team',
    ]],
    'services' => ['id' => 8, 'prefix' => 'svc_', 'sections' => [
        'hero' => 'Services — Hero',
        'outcomes' => 'Services — Outcomes',
        'overview' => 'Services — Overview',
        'robotics' => 'Services — Robotics',
        'security' => 'Services — Security',
        'ai_solution' => 'Services — AI Solution',
        'initiatives' => 'Services — Initiatives',
        'guidance' => 'Services — Guidance',
    ]],
    'partner' => ['id' => 9, 'prefix' => 'ptr_', 'sections' => [
        'hero' => 'Partner — Hero',
        'statement' => 'Partner — Statement',
        'meaning' => 'Partner — Meaning',
        'outcomes' => 'Partner — Outcomes',
        'phases' => 'Partner — Phases',
        'deliverables' => 'Partner — Deliverables',
        'engagement' => 'Partner — Engagement',
        'process' => 'Partner — Process',
        'faq' => 'Partner — FAQ',
        'cta' => 'Partner — CTA',
    ]],
    'humanoid' => ['id' => 10, 'prefix' => 'hum_', 'sections' => [
        'hero' => 'Humanoid — Hero',
        'usecases' => 'Humanoid — Use Cases',
        'outcomes' => 'Humanoid — Outcomes',
        'deliverables' => 'Humanoid — Deliverables',
        'cta' => 'Humanoid — CTA',
    ]],
    'security' => ['id' => 11, 'prefix' => 'sec_', 'sections' => [
        'hero' => 'Security — Hero',
        'outcomes' => 'Security — Outcomes',
        'included' => 'Security — Included',
        'phases' => 'Security — Phases',
        'cta' => 'Security — CTA',
    ]],
];

global $wpdb;
$all_boxes = [];
$total_fields = 0;

foreach ($pages as $slug => $cfg) {
    $pid = $cfg['id'];
    $prefix = $cfg['prefix'];

    // Get ALL meta keys for this page with this prefix
    $keys = $wpdb->get_col($wpdb->prepare(
        "SELECT DISTINCT meta_key FROM $wpdb->postmeta WHERE post_id=%d AND meta_key LIKE %s ORDER BY meta_key",
        $pid, $prefix . '%'
    ));

    // Group keys by section
    foreach ($cfg['sections'] as $sec_key => $box_title) {
        $sec_prefix = $prefix . $sec_key . '_';
        $box_id = str_replace('_', '-', $prefix) . $sec_key;
        // Clean up box_id (remove trailing -)
        $box_id = rtrim($box_id, '-');

        $fields = [];
        $matched_keys = [];

        foreach ($keys as $k) {
            if (strpos($k, $sec_prefix) === 0) {
                $val = get_post_meta($pid, $k, true);
                // Skip serialized arrays - handle as repeaters
                if (is_array($val)) {
                    $fields[] = rf2($k, ucwords(str_replace('_', ' ', str_replace($sec_prefix, '', $k))),
                        [tf2("label","Label"), tf2("value","Value")]);
                } else {
                    $fields[] = make_field($k, $val);
                }
                $matched_keys[] = $k;
                $total_fields++;
            }
        }

        // Special: hum_robots_json is under usecases but doesn't match hum_usecases_
        if ($slug === 'humanoid' && $sec_key === 'usecases') {
            // Add robots repeater
            $fields[] = rf2("hum_robots", "Robot Models", [
                tf2("name","Name"), mf2("header_image","Header Image"),
                tf2("title","Title"), ta2("description","Description"),
                mf2("video_thumb","Video Thumb 1"), mf2("video_thumb_2","Video Thumb 2"),
                tf2("note","Note"),
            ]);
            $total_fields++;
        }

        if (empty($fields)) {
            // Try matching without section prefix (e.g. about_hero_heading vs about_heading)
            // Skip creating empty boxes
            continue;
        }

        $all_boxes[$box_id] = build_box($box_id, $box_title, $pid, $fields);
    }

    // Check for unmatched keys (keys that don't fit any section)
    $all_matched = [];
    foreach ($cfg['sections'] as $sec_key => $box_title) {
        $sec_prefix = $prefix . $sec_key . '_';
        foreach ($keys as $k) {
            if (strpos($k, $sec_prefix) === 0) $all_matched[] = $k;
        }
    }
    $unmatched = array_diff($keys, $all_matched);
    if (!empty($unmatched)) {
        // Create an "Other" box for unmatched
        $fields = [];
        foreach ($unmatched as $k) {
            // Skip special keys
            if (in_array($k, ['hum_robots_json'])) continue;
            $val = get_post_meta($pid, $k, true);
            if (is_array($val)) continue;
            $fields[] = make_field($k, $val);
            $total_fields++;
        }
        if (!empty($fields)) {
            $box_id = rtrim($prefix, '_') . '-other';
            $all_boxes[$box_id] = build_box($box_id, ucfirst($slug) . ' — Other', $pid, $fields);
        }
    }
}

update_option('jet_engine_meta_boxes', $all_boxes);
wp_cache_flush();

echo "Created " . count($all_boxes) . " meta boxes with $total_fields fields total\n";
foreach ($all_boxes as $id => $box) {
    $page = $box['args']['allowed_posts'][0] ?? '?';
    $fc = count($box['meta_fields']);
    echo "  $id => page $page, $fc fields\n";
}
