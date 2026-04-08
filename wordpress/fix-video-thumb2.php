<?php
/**
 * 1. Add video_thumb_2 to the hum_robots JetEngine repeater field definition
 * 2. Fix meta boxes: remove About boxes from Humanoid page
 */

// --- Step 1: Update hum_robots_json to include video_thumb_2 for first robot ---
$hum = get_page_by_path('humanoid');
if (!$hum) { echo "Humanoid page not found!\n"; exit; }
$pid = $hum->ID;

$json = get_post_meta($pid, 'hum_robots_json', true);
if ($json) {
    $robots = json_decode($json, true);
    if (is_array($robots) && count($robots) > 0) {
        // Only add if not already set
        if (empty($robots[0]['video_thumb_2'])) {
            $robots[0]['video_thumb_2'] = '/images/video-thumb-ai2.png';
            $robots[0]['video_url'] = '/videos/ai1.mp4';
            $robots[0]['video_url_2'] = '/videos/ai2.mp4';
            update_post_meta($pid, 'hum_robots_json', wp_slash(json_encode($robots, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)));
            echo "Updated hum_robots_json with video_thumb_2 + video URLs\n";
        } else {
            echo "video_thumb_2 already set\n";
        }
    }
}

// --- Step 2: Clean up wrong meta boxes from Humanoid page ---
// Remove about_* meta keys from humanoid page
$all_meta = get_post_meta($pid);
$removed = 0;
foreach ($all_meta as $key => $val) {
    if (strpos($key, 'about_') === 0) {
        delete_post_meta($pid, $key);
        $removed++;
    }
}
echo "Removed $removed about_* meta keys from Humanoid page (ID $pid)\n";

// --- Step 3: Update JetEngine meta box for hum_robots to include video_thumb_2 ---
// Find the meta box post
$args = [
    'post_type' => 'jet-engine',
    'posts_per_page' => -1,
    'post_status' => 'publish',
];
$boxes = get_posts($args);
foreach ($boxes as $box) {
    $meta = get_post_meta($box->ID, '_fields', true);
    if (!is_array($meta)) continue;

    foreach ($meta as $i => $field) {
        if (($field['name'] ?? '') === 'hum_robots' && ($field['type'] ?? '') === 'repeater') {
            $sub = $field['repeater-fields'] ?? [];
            $has_thumb2 = false;
            foreach ($sub as $sf) {
                if (($sf['name'] ?? '') === 'video_thumb_2') {
                    $has_thumb2 = true;
                    break;
                }
            }
            if (!$has_thumb2) {
                // Add video_thumb_2 field after video_thumb
                $new_sub = [];
                foreach ($sub as $sf) {
                    $new_sub[] = $sf;
                    if (($sf['name'] ?? '') === 'video_thumb') {
                        $new_sub[] = [
                            'name' => 'video_thumb_2',
                            'title' => 'Video Thumb 2',
                            'type' => 'media',
                            'is_required' => false,
                        ];
                    }
                }
                $meta[$i]['repeater-fields'] = $new_sub;
                update_post_meta($box->ID, '_fields', $meta);
                echo "Added video_thumb_2 to JetEngine repeater in meta box '{$box->post_title}'\n";
            } else {
                echo "video_thumb_2 already exists in repeater\n";
            }
            break 2;
        }
    }
}

echo "Done!\n";
