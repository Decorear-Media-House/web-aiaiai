<?php
/**
 * Fix services page text to match Figma design.
 * Run via: wp eval-file fix-services-text.php
 */

$page = get_page_by_path('services');
if (!$page) { echo "Services page not found!\n"; exit(1); }
$pid = $page->ID;

// Robotics — Figma node 105:3557
update_post_meta($pid, 'svc_robotics_label', 'Robotics');
update_post_meta($pid, 'svc_robotics_heading', 'Embodied AI & Humanoid Robotic Solution');
update_post_meta($pid, 'svc_robotics_subtitle', 'Humanoid robotics deployment with workflow integration.');
update_post_meta($pid, 'svc_robotics_what_it_is', 'End-to-end enablement for humanoid robotics pilots and deployments: readiness planning, SOPs, training, integration, and scale playbooks.');
echo "Robotics: updated\n";

// Security — Figma node 105:3657
update_post_meta($pid, 'svc_security_label', 'Security');
update_post_meta($pid, 'svc_security_heading', 'AI Security Platform');
update_post_meta($pid, 'svc_security_subtitle', 'AI video analytics for security operations and asset protection.');
update_post_meta($pid, 'svc_security_what_it_is', 'Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.');
echo "Security: updated\n";

// AI Solution Partner — Figma node 105:3709
update_post_meta($pid, 'svc_ai_solution_label', 'AI Solution Partner');
update_post_meta($pid, 'svc_ai_solution_heading', 'AI Solution Partner');
update_post_meta($pid, 'svc_ai_solution_subtitle', 'Your AI development partner — from roadmap to production.');
update_post_meta($pid, 'svc_ai_solution_what_it_is', 'A partner-led engagement that combines AI consulting and implementation support to deliver PoC/MVP and deploy AI into real operations.');
echo "AI Solution Partner: updated\n";

// Robotics check items
update_post_meta($pid, 'svc_robotics_check_items', "Labor efficiency and throughput improvement\nSOP-driven consistency and reduced variance\nSafety/governance and service readiness\nRollout readiness for scaling");
echo "Robotics check_items: updated\n";

// Security check items
update_post_meta($pid, 'svc_security_check_items', "Improved detection and response\nReduced loss risk and better evidence capture\nOperational visibility across sites\nReduced monitoring cost through prioritization");
echo "Security check_items: updated\n";

// AI Solution outcomes + use cases
update_post_meta($pid, 'svc_ai_solution_outcomes_enabled', "Labor efficiency and throughput improvement\nSOP-driven consistency and reduced variance\nSafety/governance and service readiness\nRollout readiness for scaling");
update_post_meta($pid, 'svc_ai_solution_use_case_categories', "Workflow automation with approvals\nDecision support dashboards\nClassification/triage at scale\nAI integration into existing systems");
echo "AI Solution outcomes + use_cases: updated\n";

echo "\nDone!\n";
