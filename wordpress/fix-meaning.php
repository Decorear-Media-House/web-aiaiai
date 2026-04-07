<?php
$boxes = get_option("jet_engine_meta_boxes", []);

// Add colorpicker to meaning if not exists
$has_color = false;
foreach ($boxes["ptr-meaning"]["meta_fields"] as $f) {
    if ($f["name"] === "ptr_meaning_background_color") $has_color = true;
}
if (!$has_color) {
    $boxes["ptr-meaning"]["meta_fields"][] = [
        "name" => "ptr_meaning_background_color",
        "title" => "Background Color",
        "type" => "colorpicker",
        "object_type" => "field",
    ];
}

update_option("jet_engine_meta_boxes", $boxes);

// Seed default color
update_post_meta(9, "ptr_meaning_background_color", "#102050");

echo "Added color picker + set default #102050\n";
