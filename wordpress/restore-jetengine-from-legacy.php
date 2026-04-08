<?php
/**
 * Restore JetEngine meta fields from page_sections (legacy JSON) for all pages.
 * This copies data from the JSON blob back into individual meta keys.
 */

// Mapping: page_slug => [page_sections_key => jetengine_prefix]
$page_map = [
    'home' => [
        'prefix' => 'home_',
        'sections' => [
            'hero' => ['heading', 'description', 'cta_text', 'cta_url', 'background_image', 'background_video'],
            'about' => ['chip', 'heading', 'description', 'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url', 'background_image', 'background_color'],
            'problem' => ['chip', 'heading', 'heading_highlight', 'description', 'background_image', 'background_color'],
            'process' => ['chip', 'heading', 'heading_highlight', 'description', 'cta_text', 'cta_url', 'background_color'],
            'outcomes' => ['chip', 'heading', 'heading_highlight', 'description', 'background_color'],
            'how_we_work' => ['chip', 'heading', 'heading_highlight', 'description', 'cta_text', 'cta_url', 'background_color', 'background_video'],
            'cta' => ['heading', 'description', 'background_video', 'cta_primary_text', 'cta_primary_url', 'cta_secondary_text', 'cta_secondary_url'],
        ],
    ],
    'about' => [
        'prefix' => 'about_',
        'sections' => [
            'hero' => ['label', 'heading', 'description', 'hero_background_image'],
            'mission' => [
                'label' => 'mission_label',
                'headingWhite1' => 'mission_headingWhite1',
                'headingHighlight' => 'mission_headingHighlight',
                'headingWhite2' => 'mission_headingWhite2',
                'description' => 'mission_description',
                'mission_background_image' => 'mission_background_image',
                'mission_background_mobile_image' => 'mission_background_mobile_image',
            ],
            'philosophy' => [
                'label' => 'philosophy_label',
                'headingPrefix' => 'philosophy_headingPrefix',
                'headingHighlight' => 'philosophy_headingHighlight',
                'subtitle' => 'philosophy_subtitle',
                'introText' => 'philosophy_introText',
            ],
            'edge' => [
                'label' => 'edge_label',
                'headingPrefix' => 'edge_headingPrefix',
                'headingHighlight' => 'edge_headingHighlight',
                'edge_photo_image' => 'edge_photo_image',
            ],
            'leadership' => [
                'heading' => 'leadership_heading',
                'description' => 'leadership_description',
                'logo_image' => 'leadership_logo_image',
                'background_color' => 'leadership_background_color',
                'background_image' => 'leadership_background_image',
            ],
            'team' => [
                'label' => 'team_label',
                'headingPrefix' => 'team_headingPrefix',
                'headingHighlight' => 'team_headingHighlight',
                'sectionDescription' => 'team_sectionDescription',
                'ceo_photo_image' => 'team_ceo_photo_image',
                'cto_photo_image' => 'team_cto_photo_image',
                'coo_photo_image' => 'team_coo_photo_image',
                'ceoName' => 'team_ceoName',
                'ceoRole' => 'team_ceoRole',
                'ceoBio' => 'team_ceoBio',
                'ctoName' => 'team_ctoName',
                'ctoRole' => 'team_ctoRole',
                'cooName' => 'team_cooName',
                'cooRole' => 'team_cooRole',
                'ceo_photo_mobile_image' => 'team_ceo_photo_mobile_image',
                'cto_photo_mobile_image' => 'team_cto_photo_mobile_image',
                'coo_photo_mobile_image' => 'team_coo_photo_mobile_image',
            ],
        ],
    ],
];

$count = 0;
foreach ($page_map as $slug => $cfg) {
    $page = get_page_by_path($slug);
    if (!$page) {
        echo "$slug: PAGE NOT FOUND\n";
        continue;
    }
    $pid = $page->ID;
    $raw = get_post_meta($pid, 'page_sections', true);
    if (!$raw) {
        echo "$slug: no page_sections data\n";
        continue;
    }
    $data = is_string($raw) ? json_decode($raw, true) : $raw;
    if (!is_array($data)) {
        echo "$slug: invalid page_sections JSON\n";
        continue;
    }

    $prefix = $cfg['prefix'];
    foreach ($cfg['sections'] as $section_key => $fields) {
        $section_data = $data[$section_key] ?? [];
        if (!is_array($section_data)) continue;

        if (array_is_list($fields)) {
            // Simple: field name = section_field
            foreach ($fields as $field) {
                $val = $section_data[$field] ?? '';
                if ($val !== '' && $val !== null) {
                    $meta_key = $prefix . $section_key . '_' . $field;
                    update_post_meta($pid, $meta_key, $val);
                    $count++;
                }
            }
        } else {
            // Custom mapping: json_key => meta_suffix
            foreach ($fields as $json_key => $meta_suffix) {
                $val = $section_data[$json_key] ?? '';
                if ($val !== '' && $val !== null) {
                    $meta_key = $prefix . $meta_suffix;
                    update_post_meta($pid, $meta_key, $val);
                    $count++;
                }
            }
        }
    }
    echo "$slug (ID $pid): restored\n";
}

echo "\nTotal fields restored: $count\n";
