<?php
$boxes = get_option("jet_engine_meta_boxes", []);

$boxes["ptr-faq"]["meta_fields"] = [
    ["name" => "ptr_faq_chipLabel", "title" => "Label", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_faq_heading", "title" => "Heading", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_faq_headingHighlight", "title" => "Heading Highlight", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_faq_description", "title" => "Description", "type" => "textarea", "object_type" => "field"],
    ["name" => "ptr_faq_ctaText", "title" => "CTA Text", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_faq_background_image", "title" => "Background Image", "type" => "media", "object_type" => "field", "value_format" => "url"],
    ["name" => "ptr_faq_background_color", "title" => "Background Color", "type" => "colorpicker", "object_type" => "field"],
];

update_option("jet_engine_meta_boxes", $boxes);
echo "Added bg image + color to FAQ\n";
