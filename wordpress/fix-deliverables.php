<?php
$boxes = get_option("jet_engine_meta_boxes", []);

$boxes["ptr-deliverables"]["meta_fields"] = [
    ["name" => "ptr_deliverables_chipLabel", "title" => "Label", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_deliverables_heading", "title" => "Heading", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_deliverables_headingHighlight", "title" => "Heading Highlight", "type" => "text", "object_type" => "field"],
    ["name" => "ptr_deliverables_description", "title" => "Description", "type" => "textarea", "object_type" => "field"],
    ["name" => "ptr_deliverables_container_image", "title" => "Left Image", "type" => "media", "object_type" => "field", "value_format" => "url"],
    ["name" => "ptr_deliverables_background_image", "title" => "Background Image", "type" => "media", "object_type" => "field", "value_format" => "url"],
];

update_option("jet_engine_meta_boxes", $boxes);
echo "Removed background_color from Deliverables\n";
