<?php
$pid = 9; // Partner page
$base = 'http://localhost:8080/wp-content/uploads/2026/04';

// Hero
update_post_meta($pid, 'ptr_hero_chipLabel', 'From Roadmap to Production — Delivered');
update_post_meta($pid, 'ptr_hero_heading', 'AI Solution Partner');
update_post_meta($pid, 'ptr_hero_description', 'Roadmap to MVP to production deployment—delivered with governance, integration, and operational constraints in mind.');
update_post_meta($pid, 'ptr_hero_primaryCta', 'Contact Us');
update_post_meta($pid, 'ptr_hero_secondaryCta', 'All Services');
update_post_meta($pid, 'ptr_hero_hero_background_image', "$base/hero-bg-1.png");
echo "Hero: done\n";

// Statement
update_post_meta($pid, 'ptr_statement_textWhite', "Share your objective and constraints. ");
update_post_meta($pid, 'ptr_statement_textHighlight', "We\xE2\x80\x99ll propose a practical first step.");
echo "Statement: done\n";

// Meaning
update_post_meta($pid, 'ptr_meaning_chipLabel', 'What this means');
update_post_meta($pid, 'ptr_meaning_headingPrefix', 'What "AI Solution Partner" ');
update_post_meta($pid, 'ptr_meaning_headingHighlight', 'means');
update_post_meta($pid, 'ptr_meaning_description', "AI Solution Partner is designed for organizations that want AI to ship and stick.\n\nWe don't stop at strategy. We help you:");
echo "Meaning: done\n";

// Outcomes
update_post_meta($pid, 'ptr_outcomes_chipLabel', 'Outcomes');
update_post_meta($pid, 'ptr_outcomes_heading', 'Business Outcomes');
update_post_meta($pid, 'ptr_outcomes_headingHighlight', 'We Target');
update_post_meta($pid, 'ptr_outcomes_description', 'Every engagement is anchored to real outcomes — not just capabilities.');
echo "Outcomes: done\n";

// Phases (What We Deliver)
update_post_meta($pid, 'ptr_phases_chipLabel', 'Four Phases, Full Coverage');
update_post_meta($pid, 'ptr_phases_heading', 'What We');
update_post_meta($pid, 'ptr_phases_headingHighlight', 'Deliver');
update_post_meta($pid, 'ptr_phases_description', 'From discovery through adoption — structured work that takes AI from idea to operating model.');
echo "Phases: done\n";

// Deliverables
update_post_meta($pid, 'ptr_deliverables_chipLabel', 'Deliverables');
update_post_meta($pid, 'ptr_deliverables_heading', 'Typical');
update_post_meta($pid, 'ptr_deliverables_headingHighlight', 'Deliverables');
update_post_meta($pid, 'ptr_deliverables_description', 'Concrete, tangible work products — each designed to carry AI from concept through live operation.');
echo "Deliverables: done\n";

// Engagement
update_post_meta($pid, 'ptr_engagement_chipLabel', 'Engagement models');
update_post_meta($pid, 'ptr_engagement_heading', 'How We');
update_post_meta($pid, 'ptr_engagement_headingHighlight', 'Engage');
update_post_meta($pid, 'ptr_engagement_description', 'Three flexible models to match how your organisation prefers to work.');
echo "Engagement: done\n";

// Process
update_post_meta($pid, 'ptr_process_chipLabel', 'Process');
update_post_meta($pid, 'ptr_process_heading', 'How We');
update_post_meta($pid, 'ptr_process_headingHighlight', 'Work');
update_post_meta($pid, 'ptr_process_description', 'Six structured phases from discovery to scale — with delivery and governance built in from the start.');
echo "Process: done\n";

// FAQ
update_post_meta($pid, 'ptr_faq_chipLabel', 'FAQs');
update_post_meta($pid, 'ptr_faq_heading', 'Frequently asked');
update_post_meta($pid, 'ptr_faq_headingHighlight', 'questions');
update_post_meta($pid, 'ptr_faq_description', 'We have compiled frequently asked questions about how AI solutions are implemented in real operations.');
update_post_meta($pid, 'ptr_faq_ctaText', 'Still have questions? Contact us');
echo "FAQ: done\n";

// CTA
update_post_meta($pid, 'ptr_cta_heading', 'Tell us your target outcome and ');
update_post_meta($pid, 'ptr_cta_headingHighlight', 'constraints.');
update_post_meta($pid, 'ptr_cta_description', "We'll propose a practical next step: discovery, roadmap, pilot, or MVP scope.");
update_post_meta($pid, 'ptr_cta_primaryCta', 'Contact Us');
update_post_meta($pid, 'ptr_cta_secondaryCta', 'All Services');
update_post_meta($pid, 'ptr_cta_background_image', "$base/cta-bg-2.png");
echo "CTA: done\n";

echo "\nAll Partner content seeded!\n";
