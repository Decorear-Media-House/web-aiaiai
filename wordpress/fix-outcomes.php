<?php
$boxes = get_option("jet_engine_meta_boxes", []);

$boxes["ptr-outcomes"]["meta_fields"] = [
    ["name" => "ptr_outcomes_chipLabel", "title" => "Label", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_outcomes_heading", "title" => "Heading", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_outcomes_headingHighlight", "title" => "Heading Highlight", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_outcomes_description", "title" => "Description", "type" => "textarea", "object_type" => "field"],
    ["name" => "ptr_outcomes_section_image", "title" => "Section Image", "type" => "media", "object_type" => "field", "value_format" => "url"],
    ["name" => "ptr_outcomes_background_color", "title" => "Background Color", "type" => "colorpicker", "object_type" => "field"],
];

update_option("jet_engine_meta_boxes", $boxes);

// Seed background color
update_post_meta(9, "ptr_outcomes_background_color", "#070E24");

echo "Fixed outcomes meta box + set bg color #070E24\n";
