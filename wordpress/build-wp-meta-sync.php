<?php
/**
 * Build wordpress/wp-meta-sync.json from each page's legacy page_sections JSON.
 *
 * Purpose:
 *   Fresh installs rely on wp-meta-sync.json to prefill JetEngine fields.
 *   page_sections (seeded by seed-content.sh) already holds all the real
 *   content in nested form — this script flattens it into the JetEngine
 *   key/value shape the frontend expects, using the per-page mapping table
 *   below.
 *
 * Run:
 *   docker exec aiaiai-wordpress wp --allow-root eval-file /seed/build-wp-meta-sync.php \
 *     > /tmp/wp-meta-sync.json
 *   docker cp aiaiai-wordpress:/tmp/wp-meta-sync.json wordpress/wp-meta-sync.json
 *
 * Idempotent, read-only — never writes to the database.
 */

require_once __DIR__ . '/seed-helpers.php';

// ── helpers ──────────────────────────────────────────────────────────────
function arr_to_text($v) {
    // textareaToArray in the frontend splits on \n — this is the inverse.
    if (is_array($v)) return implode("\n", array_map('strval', $v));
    return is_scalar($v) ? (string) $v : '';
}

function get_sections($slug) {
    $p = get_page_by_path($slug);
    if (!$p) return [];
    $raw = get_post_meta($p->ID, 'page_sections', true);
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

// ── per-page flatten functions ───────────────────────────────────────────
// Each returns an associative array of meta_key => value ready for
// JetEngine. Sub-field naming mirrors what Frontend components read.

function flatten_home($s) {
    $out = [];
    foreach (($s['hero'] ?? []) as $k => $v) {
        if ($k === 'stats') continue;
        $out["home_hero_$k"] = $v;
    }
    // home_hero_stats: pass {value,label} through (already correct shape)
    if (!empty($s['hero']['stats']) && is_array($s['hero']['stats'])) {
        $out['home_hero_stats'] = array_values($s['hero']['stats']);
    }

    // about / problems / services / outcomes / process / cta / contact
    foreach (['about','problems','services','outcomes','process','cta','contact'] as $sec) {
        foreach (($s[$sec] ?? []) as $k => $v) {
            if ($sec === 'problems' && $k === 'cards')    { $out["home_problems_cards"]   = array_values($v); continue; }
            if ($sec === 'services' && $k === 'items')    { $out["home_services_items"]   = array_values($v); continue; }
            if ($sec === 'about'    && $k === 'paragraphs') { $out["home_about_paragraphs"] = arr_to_text($v); continue; }
            if ($sec === 'cta'      && $k === 'chips')    { $out["home_cta_chips"]        = arr_to_text($v); continue; }
            $out["home_{$sec}_{$k}"] = $v;
        }
    }
    return $out;
}

function flatten_about($s) {
    $out = [];
    foreach (['hero','mission','philosophy','edge','leadership','team'] as $sec) {
        foreach (($s[$sec] ?? []) as $k => $v) {
            if ($sec === 'philosophy' && $k === 'principles') { $out["about_philosophy_principles"] = array_values($v); continue; }
            if ($sec === 'edge' && $k === 'edges') {
                // edges[].icon_image → icon_image; keep title/description/icon_image
                $out["about_edge_edges"] = array_values($v);
                continue;
            }
            $out["about_{$sec}_{$k}"] = $v;
        }
    }
    return $out;
}

function flatten_services($s) {
    $out = [];
    foreach (['hero','outcomes','overview','robotics','security','ai_solution','initiatives','guidance'] as $sec) {
        foreach (($s[$sec] ?? []) as $k => $v) {
            // textarea-array fields
            if (in_array("{$sec}_{$k}", ['robotics_check_items','security_check_items',
                    'ai_solution_outcomes_enabled','ai_solution_use_case_categories',
                    'initiatives_initiatives','guidance_cards'])) {
                if ($k === 'cards') { $out["svc_{$sec}_{$k}"] = array_values($v); continue; }
                $out["svc_{$sec}_{$k}"] = arr_to_text($v);
                continue;
            }
            $out["svc_{$sec}_{$k}"] = $v;
        }
    }
    return $out;
}

function flatten_partner($s) {
    $out = [];
    foreach (['hero','statement','meaning','outcomes','phases','deliverables','engagement','process','faq','cta'] as $sec) {
        foreach (($s[$sec] ?? []) as $k => $v) {
            if ($sec === 'meaning' && $k === 'checkItems') { $out["ptr_meaning_checkItems"] = arr_to_text($v); continue; }
            $out["ptr_{$sec}_{$k}"] = $v;
        }
    }
    return $out;
}

function flatten_humanoid($s) {
    $out = [];
    foreach (['hero','outcomes','deliverables','cta'] as $sec) {
        foreach (($s[$sec] ?? []) as $k => $v) {
            if ($sec === 'outcomes' && $k === 'accordion_items') {
                // Frontend expects {label, icon, items} — map iconGradient→icon_gradient, items textarea
                $items = [];
                foreach ((array) $v as $it) {
                    $items[] = [
                        'label'         => $it['label'] ?? '',
                        'icon_gradient' => $it['iconGradient'] ?? '',
                        'icon_image'    => $it['icon_image'] ?? '',
                        'items'         => arr_to_text($it['items'] ?? []),
                    ];
                }
                $out['hum_outcomes_accordion'] = $items;
                continue;
            }
            if ($sec === 'deliverables' && $k === 'items') {
                $out['hum_deliverables_items'] = array_values($v);
                continue;
            }
            if ($sec === 'cta' && $k === 'chips') { $out['hum_cta_chips'] = arr_to_text($v); continue; }
            $out["hum_{$sec}_{$k}"] = $v;
        }
    }
    // hum_hero_stats (top/bottom) — if present in page_sections
    if (!empty($s['hero']['stats']) && is_array($s['hero']['stats'])) {
        $out['hum_hero_stats'] = array_values($s['hero']['stats']);
    }
    // hum_robots — complex structure from useCases.robots
    $robots = $s['useCases']['robots'] ?? [];
    if (is_array($robots) && $robots) {
        $out['hum_robots'] = array_values($robots);
    }
    return $out;
}

function flatten_security($s) {
    $out = [];

    // hero — scalars + stats repeater
    foreach (($s['hero'] ?? []) as $k => $v) {
        if ($k === 'stats') continue;
        $k2 = [
            'wpImageUrl' => 'bg_image',
            'wpContainerImageUrl' => 'card_image',
            'wpContainerImageMobileUrl' => 'card_mobile_image',
            'background_color' => 'bg_color',
        ][$k] ?? $k;
        $out["sec_hero_$k2"] = $v;
    }
    if (!empty($s['hero']['stats'])) {
        $out['sec_hero_stats'] = array_values($s['hero']['stats']);
    }

    // outcomes — {chip,heading,heading_hl,image,mobile_image,bg_color,accordion}
    $o = $s['outcomes'] ?? [];
    $out['sec_outcomes_chip']        = $o['chip'] ?? '';
    $out['sec_outcomes_heading']     = $o['heading'] ?? '';
    $out['sec_outcomes_heading_hl']  = $o['heading_highlight'] ?? '';
    $out['sec_outcomes_image']       = $o['wpImageUrl'] ?? '';
    $out['sec_outcomes_mobile_image']= $o['wpImageMobileUrl'] ?? '';
    $out['sec_outcomes_bg_color']    = $o['background_color'] ?? '';
    $accord = [];
    foreach (($o['accordion'] ?? []) as $it) {
        $accord[] = [
            'icon_gradient' => $it['iconBg'] ?? $it['icon_gradient'] ?? '',
            'title'         => $it['title'] ?? '',
            'checks'        => arr_to_text($it['checks'] ?? []),
        ];
    }
    if ($accord) $out['sec_outcomes_accordion'] = $accord;

    // included — pillars repeater
    $i = $s['included'] ?? [];
    foreach (['chip','heading','description'] as $k) $out["sec_included_$k"] = $i[$k] ?? '';
    $out['sec_included_heading_hl'] = $i['heading_highlight'] ?? '';
    $out['sec_included_bg_color']   = $i['background_color'] ?? '';
    $pillars = [];
    $card_images = [$i['card1_image'] ?? '', $i['card2_image'] ?? '', $i['card3_image'] ?? ''];
    $card_mobiles = [$i['card1_mobile_image'] ?? '', $i['card2_mobile_image'] ?? '', $i['card3_mobile_image'] ?? ''];
    foreach (($i['pillars'] ?? []) as $idx => $p) {
        $pillars[] = [
            'title'             => $p['title'] ?? '',
            'items'             => arr_to_text($p['items'] ?? []),
            'card_image'        => $card_images[$idx]  ?? '',
            'card_mobile_image' => $card_mobiles[$idx] ?? '',
        ];
    }
    if ($pillars) $out['sec_included_pillars'] = $pillars;

    // phases — items repeater (seed key: 'phases')
    $ph = $s['phases'] ?? [];
    foreach (['chip','heading','description'] as $k) $out["sec_phases_$k"] = $ph[$k] ?? '';
    $out['sec_phases_bg_color'] = $ph['background_color'] ?? '';
    $items = [];
    foreach (($ph['phases'] ?? []) as $p) {
        $items[] = [
            'phase'       => $p['phase'] ?? '',
            'title'       => $p['title'] ?? '',
            'subtitle'    => $p['subtitle'] ?? '',
            'description' => $p['description'] ?? '',
        ];
    }
    if ($items) $out['sec_phases_items'] = $items;

    // cta
    $c = $s['cta'] ?? [];
    $out['sec_cta_heading']        = $c['heading'] ?? '';
    $out['sec_cta_heading_hl']     = $c['heading_highlight'] ?? '';
    $out['sec_cta_description']    = $c['description'] ?? '';
    $out['sec_cta_chips']          = arr_to_text($c['chips'] ?? []);
    $out['sec_cta_primary']        = $c['cta_primary'] ?? '';
    $out['sec_cta_secondary']      = $c['cta_secondary'] ?? '';
    $out['sec_cta_bg_image']       = $c['background_image'] ?? '';
    $out['sec_cta_bg_color']       = $c['background_color'] ?? '';

    return $out;
}

// ── run ──────────────────────────────────────────────────────────────────
$flatteners = [
    'home'     => 'flatten_home',
    'about'    => 'flatten_about',
    'services' => 'flatten_services',
    'partner'  => 'flatten_partner',
    'humanoid' => 'flatten_humanoid',
    'security' => 'flatten_security',
];

// Rank Math SEO lives in post meta (not page_sections), so read it direct.
$rankmath_keys = aiaiai_rankmath_meta_keys();

$all = [];
foreach ($flatteners as $slug => $fn) {
    $sec = get_sections($slug);
    $flat = $fn($sec);
    // Drop empty scalars but keep non-empty arrays (repeaters)
    $filtered = [];
    foreach ($flat as $k => $v) {
        $is_empty = ($v === '' || $v === null || $v === [] || $v === false);
        if ($is_empty) continue;
        $filtered[$k] = $v;
    }

    $page = get_page_by_path($slug);
    $rm_count = 0;
    if ($page) {
        foreach ($rankmath_keys as $rk) {
            $rv = get_post_meta($page->ID, $rk, true);
            if ($rv !== '' && $rv !== null) {
                $filtered[$rk] = $rv;
                $rm_count++;
            }
        }
    }

    $all[$slug] = $filtered;
    fwrite(STDERR, "  $slug: " . count($filtered) . " keys (page_sections=" . count($sec)
        . ", rank_math=$rm_count)\n");
}

// Emit JSON to stdout (caller redirects into wp-meta-sync.json)
echo json_encode($all, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
