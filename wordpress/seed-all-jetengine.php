<?php
/**
 * Create JetEngine meta boxes + seed data for ALL pages.
 * Run via: wp --allow-root eval-file seed-all-jetengine.php
 */

// ── Helpers ──
function tf($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"text","object_type"=>"field"];}
function ta($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"textarea","object_type"=>"field"];}
function mf($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"media","object_type"=>"field","value_format"=>"url"];}
function cf($n,$t){return ["name"=>$n,"title"=>$t,"type"=>"colorpicker","object_type"=>"field"];}
function rf($n,$t,$sf){return ["name"=>$n,"title"=>$t,"type"=>"repeater","object_type"=>"field","repeater-fields"=>$sf];}

function add_meta_box_je($id, $name, $page_id, $fields) {
    $item = [
        "id" => $id,
        "labels" => ["name" => $name],
        "args" => ["object_type"=>"post","allowed_post_type"=>["page"],"active"=>true,"show_in_rest"=>true,"position"=>"normal","allowed_posts"=>[strval($page_id)],"active_conditions"=>["allowed_posts"]],
        "meta_fields" => $fields,
    ];
    $raw = get_option("jet_engine_meta_boxes", []);
    $raw[$id] = $item;
    update_option("jet_engine_meta_boxes", $raw);
}

// Get page IDs
$pages = [];
foreach (["home","about","services","partner","humanoid","security"] as $slug) {
    $p = get_page_by_path($slug);
    $pages[$slug] = $p ? $p->ID : 0;
}

// Get existing data for seeding
function get_sections($page_id) {
    $raw = get_post_meta($page_id, 'page_sections', true);
    return $raw ? (json_decode($raw, true) ?: []) : [];
}

function seed($page_id, $key, $val) {
    if ($val === '' || $val === null) return;
    $existing = get_post_meta($page_id, $key, true);
    if ($existing !== '' && $existing !== null && $existing !== false) return; // don't overwrite
    update_post_meta($page_id, $key, $val);
}

function seed_repeater($page_id, $key, $data) {
    if (!is_array($data) || empty($data)) return;
    $existing = get_post_meta($page_id, $key, true);
    if (!empty($existing)) return; // don't overwrite
    update_post_meta($page_id, $key, $data);
}

function arr_to_text($arr) {
    if (is_array($arr)) return implode("\n", $arr);
    return $arr ?? '';
}

// ═══════════════════════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════════════════════
$pid = $pages['home'];
$s = get_sections($pid);

add_meta_box_je("home-hero", "Home — Hero", $pid, [
    tf("home_hero_label","Label"), tf("home_hero_heading","Heading"), ta("home_hero_description","Description"),
    tf("home_hero_cta_text","CTA Text"), tf("home_hero_cta_subtext","CTA Subtext"),
    mf("home_hero_brand_logo_image","Brand Logo"), mf("home_hero_background_image","BG Image"), cf("home_hero_background_color","BG Color"),
    rf("home_hero_stats","Stats",[tf("value","Value"),tf("label","Label")]),
]);

$h = $s['hero'] ?? [];
seed($pid, "home_hero_label", $h['label'] ?? 'AI Solution Partner · Thailand');
seed($pid, "home_hero_heading", $h['heading'] ?? 'Your AI Solution Partner from roadmap to production deployment.');
seed($pid, "home_hero_description", $h['description'] ?? '');
seed($pid, "home_hero_cta_text", $h['cta_text'] ?? 'Contact Us');
seed($pid, "home_hero_cta_subtext", $h['cta_subtext'] ?? '');
seed($pid, "home_hero_background_image", $h['background_image'] ?? '');
seed($pid, "home_hero_background_color", $h['background_color'] ?? '');
seed_repeater($pid, "home_hero_stats", $h['stats'] ?? [
    ['value'=>'3+','label'=>'AI Solutions'],['value'=>'100%','label'=>'Outcome-Driven'],
    ['value'=>'PoC→','label'=>'Production'],['value'=>'24/7','label'=>'AI Operations'],
]);

add_meta_box_je("home-about", "Home — About", $pid, [
    tf("home_about_heading","Heading"), ta("home_about_paragraphs","Paragraphs (1/line)"),
    mf("home_about_section_background_image","BG Image"),
]);

$a = $s['about'] ?? [];
seed($pid, "home_about_heading", $a['heading'] ?? 'AI-AI-AI Co., Ltd.');
seed($pid, "home_about_paragraphs", arr_to_text($a['paragraphs'] ?? []));
seed($pid, "home_about_section_background_image", $a['section_background_image'] ?? '');

add_meta_box_je("home-problems", "Home — Problems", $pid, [
    tf("home_problems_label","Label"), tf("home_problems_headingWhite","Heading White"), tf("home_problems_headingGradient","Heading Gradient"),
    ta("home_problems_description","Description"), ta("home_problems_footer_text","Footer Text"),
    rf("home_problems_cards","Cards",[tf("title","Title"),ta("description","Description"),mf("card_image","Image")]),
]);

$pr = $s['problems'] ?? [];
seed($pid, "home_problems_label", $pr['label'] ?? 'The Problem We Solve');
seed($pid, "home_problems_headingWhite", $pr['headingWhite'] ?? 'AI is easy to demo. ');
seed($pid, "home_problems_headingGradient", $pr['headingGradient'] ?? 'Hard to deploy.');
seed($pid, "home_problems_description", $pr['description'] ?? '');
seed($pid, "home_problems_footer_text", $pr['footer_text'] ?? '');
seed_repeater($pid, "home_problems_cards", $pr['cards'] ?? []);

add_meta_box_je("home-services", "Home — Services", $pid, [
    tf("home_services_label","Label"), tf("home_services_heading","Heading"), ta("home_services_description","Description"),
    rf("home_services_items","Service Items",[tf("label","Label"),tf("heading","Heading"),ta("description","Description"),tf("cta","CTA Text"),tf("href","Link"),mf("card_background_image","BG Image")]),
]);

$sv = $s['services'] ?? [];
seed($pid, "home_services_label", $sv['label'] ?? 'Our Services');
seed($pid, "home_services_heading", $sv['heading'] ?? 'What We Do');
seed($pid, "home_services_description", $sv['description'] ?? '');
seed_repeater($pid, "home_services_items", $sv['items'] ?? []);

add_meta_box_je("home-outcomes", "Home — Outcomes", $pid, [
    tf("home_outcomes_label","Label"), tf("home_outcomes_heading","Heading"), ta("home_outcomes_description","Description"),
    mf("home_outcomes_decorative_image","Decorative Image"),
]);

$oc = $s['outcomes'] ?? [];
seed($pid, "home_outcomes_label", $oc['label'] ?? 'Impact');
seed($pid, "home_outcomes_heading", $oc['heading'] ?? 'Outcomes We Deliver');
seed($pid, "home_outcomes_description", $oc['description'] ?? '');

add_meta_box_je("home-process", "Home — Process", $pid, [
    tf("home_process_label","Label"), tf("home_process_heading","Heading"), ta("home_process_description","Description"),
    mf("home_process_side_panel_image","Side Panel Image"),
]);

$pc = $s['process'] ?? [];
seed($pid, "home_process_label", $pc['label'] ?? 'Our Process');
seed($pid, "home_process_heading", $pc['heading'] ?? 'How We Work');
seed($pid, "home_process_description", $pc['description'] ?? '');

add_meta_box_je("home-cta", "Home — CTA", $pid, [
    tf("home_cta_heading","Heading"), ta("home_cta_description","Description"), mf("home_cta_background_video","BG Video"),
]);

$ct = $s['cta'] ?? [];
seed($pid, "home_cta_heading", $ct['heading'] ?? 'Ready to ship AI that produces outcomes?');
seed($pid, "home_cta_description", $ct['description'] ?? '');

add_meta_box_je("home-contact", "Home — Contact", $pid, [
    tf("home_contact_label","Label"), tf("home_contact_heading","Heading"), ta("home_contact_description","Description"),
    tf("home_contact_email","Email"), ta("home_contact_address","Address"), tf("home_contact_google_map_url","Map URL"),
    cf("home_contact_background_color","BG Color"),
]);

$co = $s['contact'] ?? [];
seed($pid, "home_contact_label", $co['label'] ?? 'Get In Touch');
seed($pid, "home_contact_heading", $co['heading'] ?? 'Contact Us');
seed($pid, "home_contact_description", $co['description'] ?? '');
seed($pid, "home_contact_email", $co['email'] ?? 'info@ai-ai-ai.co');
seed($pid, "home_contact_address", $co['address'] ?? '1104/2 4th floor, Pattanakarn Road, Suan Luang, Bangkok, Thailand 10250');

echo "HOME: done\n";

// ═══════════════════════════════════════════════════════
//  ABOUT PAGE
// ═══════════════════════════════════════════════════════
$pid = $pages['about'];
$s = get_sections($pid);

add_meta_box_je("about-hero", "About — Hero", $pid, [
    tf("about_hero_label","Label"), tf("about_hero_heading","Heading"), ta("about_hero_description","Description"),
    mf("about_hero_background_image","BG Image"),
]);

$h = $s['hero'] ?? [];
seed($pid, "about_hero_label", $h['label'] ?? 'About Us');
seed($pid, "about_hero_heading", $h['heading'] ?? "About\nAI-AI-AI Co., Ltd.");
seed($pid, "about_hero_description", $h['description'] ?? '');
seed($pid, "about_hero_background_image", $h['hero_background_image'] ?? '');

add_meta_box_je("about-mission", "About — Mission", $pid, [
    tf("about_mission_label","Label"), tf("about_mission_headingWhite1","Heading 1"), tf("about_mission_headingHighlight","Highlight"),
    tf("about_mission_headingWhite2","Heading 2"), ta("about_mission_description","Description"),
    mf("about_mission_background_image","BG Image"), mf("about_mission_background_mobile_image","BG Mobile"),
]);

$m = $s['mission'] ?? [];
seed($pid, "about_mission_label", $m['label'] ?? '');
seed($pid, "about_mission_headingWhite1", $m['headingWhite1'] ?? '');
seed($pid, "about_mission_headingHighlight", $m['headingHighlight'] ?? '');
seed($pid, "about_mission_headingWhite2", $m['headingWhite2'] ?? '');
seed($pid, "about_mission_description", $m['description'] ?? '');
seed($pid, "about_mission_background_image", $m['mission_background_image'] ?? '');
seed($pid, "about_mission_background_mobile_image", $m['mission_background_mobile_image'] ?? '');

add_meta_box_je("about-philosophy", "About — Philosophy", $pid, [
    tf("about_philosophy_label","Label"), tf("about_philosophy_headingPrefix","Heading Prefix"), tf("about_philosophy_headingHighlight","Highlight"),
    tf("about_philosophy_subtitle","Subtitle"), ta("about_philosophy_introText","Intro Text"),
    rf("about_philosophy_principles","Principles",[tf("num","Number"),tf("label","Label")]),
]);

$ph = $s['philosophy'] ?? [];
seed($pid, "about_philosophy_label", $ph['label'] ?? '');
seed($pid, "about_philosophy_headingPrefix", $ph['headingPrefix'] ?? '');
seed($pid, "about_philosophy_headingHighlight", $ph['headingHighlight'] ?? '');
seed($pid, "about_philosophy_subtitle", $ph['subtitle'] ?? '');
seed($pid, "about_philosophy_introText", $ph['introText'] ?? '');
seed_repeater($pid, "about_philosophy_principles", $ph['principles'] ?? []);

add_meta_box_je("about-edge", "About — Edge", $pid, [
    tf("about_edge_label","Label"), tf("about_edge_headingPrefix","Heading Prefix"), tf("about_edge_headingHighlight","Highlight"),
    mf("about_edge_photo_image","Edge Photo"),
    rf("about_edge_edges","Edge Cards",[tf("title","Title"),ta("description","Description"),mf("icon_image","Icon")]),
]);

$ed = $s['edge'] ?? [];
seed($pid, "about_edge_label", $ed['label'] ?? '');
seed($pid, "about_edge_headingPrefix", $ed['headingPrefix'] ?? '');
seed($pid, "about_edge_headingHighlight", $ed['headingHighlight'] ?? '');
seed($pid, "about_edge_photo_image", $ed['edge_photo_image'] ?? '');
seed_repeater($pid, "about_edge_edges", $ed['edges'] ?? []);

add_meta_box_je("about-leadership", "About — Leadership", $pid, [
    tf("about_leadership_heading","Heading"), ta("about_leadership_description","Description"),
    mf("about_leadership_logo_image","Logo"), cf("about_leadership_background_color","BG Color"),
]);

$ld = $s['leadership'] ?? [];
seed($pid, "about_leadership_heading", $ld['heading'] ?? '');
seed($pid, "about_leadership_description", $ld['description'] ?? '');
seed($pid, "about_leadership_logo_image", $ld['logo_image'] ?? '');

add_meta_box_je("about-team", "About — Team", $pid, [
    tf("about_team_label","Label"), tf("about_team_headingPrefix","Heading Prefix"), tf("about_team_headingHighlight","Highlight"),
    ta("about_team_sectionDescription","Description"),
    tf("about_team_ceoName","CEO Name"), tf("about_team_ceoRole","CEO Role"), ta("about_team_ceoBio","CEO Bio"),
    ta("about_team_ceoTags","CEO Tags (1/line)"),
    mf("about_team_ceo_photo_image","CEO Photo"), mf("about_team_ceo_photo_mobile_image","CEO Photo Mobile"),
    tf("about_team_ctoName","CTO Name"), tf("about_team_ctoRole","CTO Role"),
    mf("about_team_cto_photo_image","CTO Photo"), mf("about_team_cto_photo_mobile_image","CTO Photo Mobile"),
    tf("about_team_cooName","COO Name"), tf("about_team_cooRole","COO Role"),
    mf("about_team_coo_photo_image","COO Photo"), mf("about_team_coo_photo_mobile_image","COO Photo Mobile"),
]);

$tm = $s['team'] ?? [];
seed($pid, "about_team_label", $tm['label'] ?? '');
seed($pid, "about_team_headingPrefix", $tm['headingPrefix'] ?? '');
seed($pid, "about_team_headingHighlight", $tm['headingHighlight'] ?? '');
seed($pid, "about_team_sectionDescription", $tm['sectionDescription'] ?? '');
seed($pid, "about_team_ceoName", $tm['ceoName'] ?? '');
seed($pid, "about_team_ceoRole", $tm['ceoRole'] ?? '');
seed($pid, "about_team_ceoBio", $tm['ceoBio'] ?? '');
seed($pid, "about_team_ceoTags", arr_to_text($tm['ceoTags'] ?? []));
seed($pid, "about_team_ceo_photo_image", $tm['ceo_photo_image'] ?? '');
seed($pid, "about_team_ceo_photo_mobile_image", $tm['ceo_photo_mobile_image'] ?? '');
seed($pid, "about_team_ctoName", $tm['ctoName'] ?? '');
seed($pid, "about_team_ctoRole", $tm['ctoRole'] ?? '');
seed($pid, "about_team_cto_photo_image", $tm['cto_photo_image'] ?? '');
seed($pid, "about_team_cto_photo_mobile_image", $tm['cto_photo_mobile_image'] ?? '');
seed($pid, "about_team_cooName", $tm['cooName'] ?? '');
seed($pid, "about_team_cooRole", $tm['cooRole'] ?? '');
seed($pid, "about_team_coo_photo_image", $tm['coo_photo_image'] ?? '');
seed($pid, "about_team_coo_photo_mobile_image", $tm['coo_photo_mobile_image'] ?? '');

echo "ABOUT: done\n";

// ═══════════════════════════════════════════════════════
//  SERVICES PAGE
// ═══════════════════════════════════════════════════════
$pid = $pages['services'];
$s = get_sections($pid);

add_meta_box_je("svc-hero", "Services — Hero", $pid, [
    tf("svc_hero_label","Label"), tf("svc_hero_heading","Heading"), ta("svc_hero_description","Description"),
    mf("svc_hero_background_image","BG Image"), cf("svc_hero_background_color","BG Color"),
]);

$h = $s['hero'] ?? [];
seed($pid, "svc_hero_label", $h['label'] ?? '');
seed($pid, "svc_hero_heading", $h['heading'] ?? '');
seed($pid, "svc_hero_description", $h['description'] ?? '');
seed($pid, "svc_hero_background_image", $h['background_image'] ?? '');
seed($pid, "svc_hero_background_color", $h['background_color'] ?? '');

add_meta_box_je("svc-outcomes", "Services — Outcomes", $pid, [
    tf("svc_outcomes_label","Label"), tf("svc_outcomes_heading_line1","Heading Line 1"), tf("svc_outcomes_heading_line2","Heading Line 2"),
    ta("svc_outcomes_description","Description"),
    mf("svc_outcomes_outcome1_image","Outcome 1 Image"), mf("svc_outcomes_outcome2_image","Outcome 2 Image"),
    mf("svc_outcomes_outcome3_image","Outcome 3 Image"), mf("svc_outcomes_outcome4_image","Outcome 4 Image"),
    mf("svc_outcomes_outcome5_image","Outcome 5 Image"),
]);

$oc = $s['outcomes'] ?? [];
seed($pid, "svc_outcomes_label", $oc['label'] ?? '');
seed($pid, "svc_outcomes_heading_line1", $oc['heading_line1'] ?? '');
seed($pid, "svc_outcomes_heading_line2", $oc['heading_line2'] ?? '');
seed($pid, "svc_outcomes_description", $oc['description'] ?? '');
foreach ([1,2,3,4,5] as $i) { seed($pid, "svc_outcomes_outcome{$i}_image", $oc["outcome{$i}_image"] ?? ''); }

add_meta_box_je("svc-overview", "Services — Overview", $pid, [
    tf("svc_overview_heading","Heading"), tf("svc_overview_subtitle","Subtitle"), ta("svc_overview_description","Description"),
    mf("svc_overview_background_image","BG Image"),
]);

$ov = $s['overview'] ?? [];
seed($pid, "svc_overview_heading", $ov['heading'] ?? '');
seed($pid, "svc_overview_subtitle", $ov['subtitle'] ?? '');
seed($pid, "svc_overview_description", $ov['description'] ?? '');
seed($pid, "svc_overview_background_image", $ov['background_image'] ?? '');

// Services sub-sections (robotics, security, ai_solution) — simple text fields
foreach (['robotics','security','ai_solution'] as $sub) {
    $prefix = "svc_{$sub}";
    $d = $s[$sub] ?? [];
    add_meta_box_je("svc-{$sub}", "Services — " . ucfirst($sub), $pid, [
        tf("{$prefix}_number","Number"), tf("{$prefix}_label","Label"), tf("{$prefix}_heading","Heading"),
        ta("{$prefix}_subtitle","Subtitle"), ta("{$prefix}_what_it_is","What It Is"),
        tf("{$prefix}_cta_text","CTA Text"), tf("{$prefix}_cta_href","CTA Link"),
        mf("{$prefix}_section_image","Section Image"), cf("{$prefix}_background_color","BG Color"),
    ]);
    seed($pid, "{$prefix}_number", $d['number'] ?? '');
    seed($pid, "{$prefix}_label", $d['label'] ?? '');
    seed($pid, "{$prefix}_heading", $d['heading'] ?? '');
    seed($pid, "{$prefix}_subtitle", $d['subtitle'] ?? '');
    seed($pid, "{$prefix}_what_it_is", $d['what_it_is'] ?? '');
    seed($pid, "{$prefix}_cta_text", $d['cta_text'] ?? '');
    seed($pid, "{$prefix}_cta_href", $d['cta_href'] ?? '');
    seed($pid, "{$prefix}_section_image", $d['section_image'] ?? '');
    seed($pid, "{$prefix}_background_color", $d['background_color'] ?? '');
}

add_meta_box_je("svc-initiatives", "Services — Initiatives", $pid, [
    tf("svc_initiatives_label","Label"), tf("svc_initiatives_heading_line1","Heading Line 1"), tf("svc_initiatives_heading_line2","Heading Line 2"),
    ta("svc_initiatives_description","Description"), cf("svc_initiatives_background_color","BG Color"),
]);

$ini = $s['initiatives'] ?? [];
seed($pid, "svc_initiatives_label", $ini['label'] ?? '');
seed($pid, "svc_initiatives_heading_line1", $ini['heading_line1'] ?? '');
seed($pid, "svc_initiatives_heading_line2", $ini['heading_line2'] ?? '');
seed($pid, "svc_initiatives_description", $ini['description'] ?? '');

add_meta_box_je("svc-guidance", "Services — Guidance", $pid, [
    tf("svc_guidance_label","Label"), tf("svc_guidance_heading","Heading"), tf("svc_guidance_heading_highlight","Highlight"),
    ta("svc_guidance_description","Description"), mf("svc_guidance_background_image","BG Image"), cf("svc_guidance_background_color","BG Color"),
]);

$gu = $s['guidance'] ?? [];
seed($pid, "svc_guidance_label", $gu['label'] ?? '');
seed($pid, "svc_guidance_heading", $gu['heading'] ?? '');
seed($pid, "svc_guidance_heading_highlight", $gu['heading_highlight'] ?? '');
seed($pid, "svc_guidance_description", $gu['description'] ?? '');
seed($pid, "svc_guidance_background_image", $gu['background_image'] ?? '');

echo "SERVICES: done\n";

// ═══════════════════════════════════════════════════════
//  HUMANOID PAGE
// ═══════════════════════════════════════════════════════
$pid = $pages['humanoid'];
$s = get_sections($pid);

add_meta_box_je("hum-hero", "Humanoid — Hero", $pid, [
    tf("hum_hero_chip","Label"), tf("hum_hero_heading","Heading"), ta("hum_hero_description","Description"),
    mf("hum_hero_bg_image","BG Image"), cf("hum_hero_bg_color","BG Color"),
    tf("hum_hero_cta_primary","Primary CTA"), tf("hum_hero_cta_primary_url","Primary CTA URL"),
    tf("hum_hero_cta_secondary","Secondary CTA"), tf("hum_hero_cta_secondary_url","Secondary CTA URL"),
    rf("hum_hero_stats","Stats",[tf("top","Top"),tf("bottom","Bottom")]),
]);

$h = $s['hero'] ?? [];
seed($pid, "hum_hero_chip", $h['chip'] ?? '');
seed($pid, "hum_hero_heading", $h['heading'] ?? '');
seed($pid, "hum_hero_description", $h['description'] ?? '');
seed($pid, "hum_hero_bg_image", $h['hero_background_image'] ?? '');
seed($pid, "hum_hero_bg_color", $h['background_color'] ?? '');
seed($pid, "hum_hero_cta_primary", $h['cta_primary'] ?? '');
seed($pid, "hum_hero_cta_secondary", $h['cta_secondary'] ?? '');
seed_repeater($pid, "hum_hero_stats", $h['stats'] ?? []);

add_meta_box_je("hum-usecases", "Humanoid — Use Cases", $pid, [
    rf("hum_robots","Robot Models",[
        tf("name","Name"), mf("header_image","Header Image"), tf("title","Title"), ta("description","Description"),
        mf("video_thumb","Video Thumb 1"), tf("video_url","Video URL 1"),
        mf("video_thumb_2","Video Thumb 2"), tf("video_url_2","Video URL 2"),
        ta("specs","Specs (label|value per line)"),
        mf("feature_image_1","Feature Image 1"),
        mf("feature_image_2","Feature Image 2"),
        tf("note","Note"),
    ]),
]);

$uc = $s['useCases'] ?? [];
$robots = $uc['robots'] ?? [];
if (is_array($robots)) {
    // Simplify for JetEngine repeater (specs/features are nested - store as separate meta or simplify)
    $simple_robots = [];
    foreach ($robots as $r) {
        $simple_robots[] = [
            'name' => $r['name'] ?? '',
            'header_image' => $r['header_image'] ?? '',
            'title' => $r['title'] ?? '',
            'description' => $r['description'] ?? '',
            'video_thumb' => $r['video_thumb'] ?? '',
            'video_thumb_2' => $r['video_thumb_2'] ?? '',
            'note' => $r['note'] ?? '',
        ];
    }
    seed_repeater($pid, "hum_robots", $simple_robots);
}

add_meta_box_je("hum-outcomes", "Humanoid — Outcomes", $pid, [
    tf("hum_outcomes_chip","Label"), tf("hum_outcomes_heading","Heading"), tf("hum_outcomes_heading_hl","Highlight"),
    ta("hum_outcomes_description","Description"), mf("hum_outcomes_image","Photo"), cf("hum_outcomes_bg_color","BG Color"),
    rf("hum_outcomes_accordion","Accordion",[tf("label","Label"),tf("icon_gradient","Icon Gradient"),mf("icon_image","Icon Image"),ta("items","Items (1/line)")]),
]);

$oc = $s['outcomes'] ?? [];
seed($pid, "hum_outcomes_chip", $oc['chip'] ?? '');
seed($pid, "hum_outcomes_heading", $oc['heading'] ?? '');
seed($pid, "hum_outcomes_heading_hl", $oc['heading_highlight'] ?? '');
seed($pid, "hum_outcomes_description", $oc['description'] ?? '');
seed($pid, "hum_outcomes_image", $oc['outcomes_image'] ?? '');
seed($pid, "hum_outcomes_bg_color", $oc['background_color'] ?? '');

$acc = $oc['accordion_items'] ?? [];
if (is_array($acc)) {
    $acc_data = [];
    foreach ($acc as $item) {
        $acc_data[] = [
            'label' => $item['label'] ?? '',
            'icon_gradient' => $item['iconGradient'] ?? '',
            'items' => arr_to_text($item['items'] ?? []),
        ];
    }
    seed_repeater($pid, "hum_outcomes_accordion", $acc_data);
}

add_meta_box_je("hum-deliverables", "Humanoid — Deliverables", $pid, [
    tf("hum_deliverables_chip","Label"), tf("hum_deliverables_heading","Heading"), tf("hum_deliverables_heading_hl","Highlight"),
    ta("hum_deliverables_description","Description"), cf("hum_deliverables_bg_color","BG Color"),
    rf("hum_deliverables_items","Items",[tf("num","Number"),tf("title","Title"),mf("icon","Icon Image")]),
]);

$dl = $s['deliverables'] ?? [];
seed($pid, "hum_deliverables_chip", $dl['chip'] ?? '');
seed($pid, "hum_deliverables_heading", $dl['heading'] ?? '');
seed($pid, "hum_deliverables_heading_hl", $dl['heading_highlight'] ?? '');
seed($pid, "hum_deliverables_description", $dl['description'] ?? '');
seed_repeater($pid, "hum_deliverables_items", $dl['items'] ?? []);

add_meta_box_je("hum-cta", "Humanoid — CTA", $pid, [
    tf("hum_cta_heading","Heading"), tf("hum_cta_heading_hl","Highlight"), ta("hum_cta_description","Description"),
    ta("hum_cta_chips","Chips (1/line)"),
    tf("hum_cta_primary","Primary CTA"), tf("hum_cta_primary_url","Primary CTA URL"),
    tf("hum_cta_secondary","Secondary CTA"), tf("hum_cta_secondary_url","Secondary CTA URL"),
    mf("hum_cta_bg_image","BG Image"), cf("hum_cta_bg_color","BG Color"),
]);

$ct = $s['cta'] ?? [];
seed($pid, "hum_cta_heading", $ct['heading'] ?? '');
seed($pid, "hum_cta_heading_hl", $ct['heading_highlight'] ?? '');
seed($pid, "hum_cta_description", $ct['description'] ?? '');
seed($pid, "hum_cta_chips", arr_to_text($ct['chips'] ?? []));
seed($pid, "hum_cta_primary", $ct['cta_primary'] ?? '');
seed($pid, "hum_cta_secondary", $ct['cta_secondary'] ?? '');
seed($pid, "hum_cta_bg_image", $ct['background_image'] ?? '');

echo "HUMANOID: done\n";

// ═══════════════════════════════════════════════════════
//  PARTNER PAGE
// ═══════════════════════════════════════════════════════
$pid = $pages['partner'];
$s = get_sections($pid);

$partner_sections = ['hero','statement','meaning','outcomes','phases','deliverables','engagement','process','faq','cta'];
foreach ($partner_sections as $sec) {
    $prefix = "ptr_{$sec}";
    $d = $s[$sec] ?? [];
    $fields = [];

    // Common fields
    foreach ($d as $k => $v) {
        if (is_string($v) && strlen($v) > 100) {
            $fields[] = ta("{$prefix}_{$k}", ucwords(str_replace('_',' ',$k)));
        } elseif (is_string($v)) {
            $fields[] = tf("{$prefix}_{$k}", ucwords(str_replace('_',' ',$k)));
        }
    }

    add_meta_box_je("ptr-{$sec}", "Partner — " . ucfirst($sec), $pid, $fields ?: [tf("{$prefix}_placeholder","(empty)")]);

    foreach ($d as $k => $v) {
        if (is_string($v)) {
            seed($pid, "{$prefix}_{$k}", $v);
        }
    }
}

echo "PARTNER: done\n";

// Summary
$total = count(get_option("jet_engine_meta_boxes", []));
echo "\nTotal meta boxes created: $total\n";
echo "All pages seeded with JetEngine data!\n";
