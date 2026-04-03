#!/bin/bash
# Seed WordPress pages with AIAIAI content
# Run inside WordPress container: bash /var/www/html/wp-content/mu-plugins/../seed-content.sh

WP="wp --allow-root"

echo "=== Seeding AIAIAI WordPress Content ==="

# Enable pretty permalinks for REST API
$WP rewrite structure '/%postname%/' 2>/dev/null
$WP rewrite flush 2>/dev/null

# Helper: only seed if page_sections is empty
seed_if_empty() {
  local PAGE_ID=$1
  local DATA=$2
  EXISTING=$($WP post meta get $PAGE_ID page_sections 2>/dev/null)
  if [ -z "$EXISTING" ] || [ "$EXISTING" = "" ] || [ "$EXISTING" = "null" ] || [ "$EXISTING" = "{}" ]; then
    $WP post meta update $PAGE_ID page_sections "$DATA"
    return 0 # seeded
  else
    return 1 # skipped
  fi
}

###############################################################################
# HOME PAGE
###############################################################################
HOME_ID=$($WP post list --post_type=page --name=home --field=ID 2>/dev/null)
if [ -z "$HOME_ID" ]; then
  HOME_ID=$($WP post create --post_type=page --post_title='Home' --post_name='home' --post_status='publish' --porcelain)
fi

HOME_DATA="$(cat <<'ENDJSON'
{
  "hero": {
    "label": "AI Solution Partner · Thailand",
    "heading": "Your AI Solution Partner from roadmap to production deployment.",
    "description": "We help organizations adopt practical AI that reduces cost, increases revenue, strengthens compliance, and improves security—through AI Solution Partner delivery, AI video-analytics security, and humanoid robotics solutions.",
    "cta_text": "Contact Us",
    "cta_subtext": "Share your goal and constraints. Our team will reach out.",
    "stats": [
      { "value": "3+", "label": "AI Solutions" },
      { "value": "100%", "label": "Outcome-Driven" },
      { "value": "PoC→", "label": "Production" },
      { "value": "24/7", "label": "AI Operations" }
    ]
  },
  "about": {
    "heading": "Ai-Ai-Ai Co., Ltd.",
    "paragraphs": [
      "Ai-Ai-Ai Co., Ltd. helps organizations adopt AI in a practical, outcome-driven way. We operate as an AI Solution Partner (and AI development partner) to take ideas from AI strategy and roadmap through PoC, MVP, and production deployment—with strong focus on integration, governance, and operating reality.",
      "We also deliver specialized solutions in Computer Vision security / AI video analytics and humanoid robotics deployment (AgiBo) with innovative AI capabilities."
    ]
  },
  "problems": {
    "label": "AI is easy to demo. Hard to deploy.",
    "headingWhite": "The Problem",
    "headingGradient": " We Solve",
    "description": "Most organizations face at least one of these realities before they can scale AI.",
    "cards": [
      { "title": "Stuck at PoC", "description": "No one owns integration and rollout — AI pilots never reach production." },
      { "title": "Too Many Use Cases", "description": "Teams can't prioritize without certainty on ROI or a clear starting point." },
      { "title": "No Operational Control", "description": "Missing auditability, approval flows, and human-in-the-loop guardrails." },
      { "title": "Security Gaps", "description": "Cameras alone aren't enough — teams need actionable intelligence and workflows." },
      { "title": "Data Not Ready", "description": "Data exists but isn't structured, governed, or production-grade." },
      { "title": "Physical Automation Risk", "description": "Deploying robots requires safety SOPs, maintenance plans, and escalation paths." }
    ]
  },
  "services": {
    "label": "Our Services",
    "heading": "What We Do",
    "description": "Three specialized AI solution lines designed to deliver measurable outcomes across security, automation, and digital transformation.",
    "items": [
      {
        "label": "Computer Vision · Analytics",
        "heading": "AI Security Guard Solution",
        "description": "Computer Vision and AI video analytics / AI video surveillance for event detection, alerts, and incident workflows.",
        "cta": "Explore Security Platform",
        "href": "/services/security"
      },
      {
        "label": "AgiBot · Robotics · Automation",
        "heading": "AI-Enhanced Humanoid Robotics",
        "description": "AgiBot humanoid robotics deployment and workflow integration with enhanced AI capability designed for operational readiness and scale.",
        "cta": "Explore Robotics",
        "href": "/services/humanoid"
      },
      {
        "label": "Strategy · PoC · Production",
        "heading": "AI Solution Partner",
        "description": "AI consulting and hands-on delivery: AI roadmap → PoC → MVP → production deployment, built for real operations.",
        "cta": "Explore AI Solution Partner",
        "href": "/services/partner"
      }
    ]
  },
  "outcomes": {
    "label": "Impact",
    "heading": "Outcomes We Deliver",
    "description": "Every engagement is measured against real business outcomes—not just technical milestones."
  },
  "process": {
    "label": "Our Process",
    "heading": "How We Work",
    "description": "A structured, outcome-driven delivery process—from initial discovery through scale."
  },
  "cta": {
    "heading": "Ready to ship AI that produces outcomes?",
    "description": "Tell us what outcome matters most—cost, revenue, compliance, security, or automation—and we'll propose a practical first step"
  },
  "contact": {
    "label": "Get In Touch",
    "heading": "Contact Us",
    "description": "Tell us what you want to achieve—cost reduction, revenue growth, compliance improvement, security enhancement, or operational automation. We'll review your input and reach out with a practical next step.",
    "email": "info@ai-ai-ai.co",
    "address": "1104/2 4th floor, Pattanakarn Road,\nSuan Luang, Bangkok, Thailand 10250"
  }
}
ENDJSON
)"
echo "✓ Home page content seeded (ID: $HOME_ID)"

###############################################################################
# ABOUT PAGE
###############################################################################
ABOUT_ID=$($WP post list --post_type=page --name=about --field=ID 2>/dev/null)
if [ -z "$ABOUT_ID" ]; then
  ABOUT_ID=$($WP post create --post_type=page --post_title='About Us' --post_name='about' --post_status='publish' --porcelain)
fi

$WP post meta update $ABOUT_ID page_sections "$(cat <<'ENDJSON'
{
  "hero": {
    "label": "About Us",
    "heading": "Your AI Solution Partner\nfrom roadmap to\nproduction deployment.",
    "description": "We are Ai-Ai-Ai Co., Ltd. — a team of AI practitioners, architects, and operators who help organizations move from AI ambition to AI in production."
  },
  "mission": {
    "label": "Our Mission",
    "headingWhite1": "We exist to ",
    "headingHighlight": "close the gap",
    "headingWhite2": " between AI ambition and AI in production.",
    "description": "Most organizations already see the potential of AI. What they lack is a structured path from idea to operating system—built around their constraints, not a vendor's roadmap."
  },
  "philosophy": {
    "label": "Our Philosophy",
    "headingPrefix": "AI That ",
    "headingHighlight": "Works in Practice",
    "subtitle": "We don't believe in AI for its own sake.",
    "introText": "Every engagement starts with: What business outcome justifies this? We measure ourselves against five outcome areas that matter to executive teams and operators alike:",
    "principles": [
      { "title": "Cost Reduction", "description": "Automation, triage, and throughput gains." },
      { "title": "Revenue Growth", "description": "Signal-to-action, conversion, and performance visibility." },
      { "title": "Compliance & Governance", "description": "Audit trails, approvals, and responsible AI boundaries." },
      { "title": "Security & Asset Protection", "description": "Faster incident detection and consistent evidence capture." },
      { "title": "Operational Automation", "description": "SOPs, playbooks, and scalable readiness." }
    ]
  },
  "edge": {
    "label": "Why Us",
    "headingPrefix": "The Ai-Ai-Ai ",
    "headingHighlight": "Edge",
    "edges": [
      { "title": "End-to-End Delivery", "description": "We don't stop at strategy. We build, integrate, and deploy—then support in production." },
      { "title": "Outcome-Anchored", "description": "Every engagement ties to measurable business outcomes—cost, revenue, compliance, security, or automation." },
      { "title": "Integration-First", "description": "We design for your workflows, tools, and governance model—not for a demo environment." },
      { "title": "Governance by Design", "description": "Human-in-the-loop, audit trails, and approval flows are built-in—not bolted on." },
      { "title": "Specialized Solutions", "description": "AI video-analytics security and humanoid robotics—ready for deployment, not experimentation." },
      { "title": "Operational Support", "description": "SOPs, runbooks, and escalation paths—so your team can operate independently." }
    ]
  },
  "leadership": {
    "heading": "Leadership",
    "description": "Our leadership team brings together deep expertise in AI engineering, enterprise delivery, and operational excellence."
  },
  "team": {
    "label": "Our Team",
    "headingPrefix": "Who ",
    "headingHighlight": "We Are",
    "sectionDescription": "We are a multidisciplinary team of AI architects, engineers, designers, and operators."
  }
}
ENDJSON
)"
echo "✓ About page content seeded (ID: $ABOUT_ID)"

###############################################################################
# SERVICES PAGE
###############################################################################
SVC_ID=$($WP post list --post_type=page --name=services --field=ID 2>/dev/null)
if [ -z "$SVC_ID" ]; then
  SVC_ID=$($WP post create --post_type=page --post_title='Services' --post_name='services' --post_status='publish' --porcelain)
fi

$WP post meta update $SVC_ID page_sections "$(cat <<'ENDJSON'
{
  "hero": {
    "label": "AI Solutions",
    "heading": "AI Services Built Around Measurable Outcomes",
    "description": "From strategy to production deployment—every service is designed to reduce cost, grow revenue, strengthen compliance, improve security, or automate operations."
  },
  "outcomes": {
    "label": "Impact",
    "heading_line1": "Outcomes",
    "heading_line2": "We Deliver",
    "description": "Every engagement is anchored to one or more of these five outcome areas—so progress is measurable and business-relevant."
  },
  "overview": {
    "heading": "Three Specialized AI Solution Lines",
    "subtitle": "Each solution line is designed for a different operational challenge—but all share the same delivery philosophy: outcome-first, integration-ready, governance-built-in.",
    "description": ""
  },
  "robotics": {
    "number": "01",
    "label": "AgiBot · Robotics · Automation",
    "heading": "AI-Enhanced Humanoid Robotics",
    "subtitle": "AgiBot humanoid robotics deployment with enhanced AI capability—designed for operational readiness and scale.",
    "what_it_is": "A complete deployment service for embodied AI and humanoid robotics—including robot selection, workflow integration, AI model customization, safety SOPs, and pilot-to-production rollout. We work with AgiBot platforms and enhance their capabilities with custom AI features tailored to your environment."
  },
  "security": {
    "number": "02",
    "label": "Computer Vision · Analytics",
    "heading": "AI Security Guard Solution",
    "subtitle": "Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.",
    "what_it_is": "An AI-powered video analytics platform that turns existing CCTV infrastructure into an intelligent detection, alerting, and response system—with analytics dashboards, alert routing, and audit-ready logs."
  },
  "ai_solution": {
    "number": "03",
    "label": "Strategy · PoC · Production",
    "heading": "AI Solution Partner",
    "subtitle": "AI roadmap → PoC → MVP → production deployment—built for real operations.",
    "what_it_is": "We act as your AI Solution Partner—helping you move from AI strategy and use-case identification through proof of concept, MVP development, and production deployment. Every step is grounded in integration, governance, and operating constraints."
  },
  "initiatives": {
    "label": "Cross-Cutting Capabilities",
    "heading_line1": "Additional",
    "heading_line2": "Initiatives",
    "description": "Beyond our three core solution lines, we offer cross-cutting capabilities that strengthen any AI initiative."
  },
  "guidance": {
    "label": "Next Steps",
    "heading": "Not Sure Where to",
    "heading_highlight": "Start?",
    "description": "We help you identify the right starting point based on your constraints, goals, and readiness—so your first AI initiative delivers real outcomes."
  }
}
ENDJSON
)"
echo "✓ Services page content seeded (ID: $SVC_ID)"

###############################################################################
# PARTNER PAGE
###############################################################################
PARTNER_ID=$($WP post list --post_type=page --name=partner --field=ID 2>/dev/null)
if [ -z "$PARTNER_ID" ]; then
  PARTNER_ID=$($WP post create --post_type=page --post_title='AI Solution Partner' --post_name='partner' --post_status='publish' --porcelain)
fi

$WP post meta update $PARTNER_ID page_sections "$(cat <<'ENDJSON'
{
  "hero": {
    "chipLabel": "Strategy · PoC · Production",
    "heading": "AI Solution Partner",
    "description": "Roadmap to MVP to production deployment—delivered with governance, integration, and operational constraints in mind.",
    "primaryCta": "Get Started",
    "secondaryCta": "Contact Us"
  },
  "statement": {
    "textWhite": "A PoC that doesn't reach production isn't just a failed experiment—",
    "textHighlight": "it's a failure of delivery design."
  },
  "meaning": {
    "chipLabel": "What It Means",
    "headingPrefix": "What ",
    "headingHighlight": "AI Solution Partner",
    "headingSuffix": " Actually Means",
    "description": "We act as your end-to-end AI delivery partner—owning the path from idea to production system, not just a prototype."
  },
  "outcomes": {
    "chipLabel": "Impact",
    "heading": "Outcomes",
    "headingHighlight": "We Deliver",
    "description": "Every engagement is measured against real business outcomes—not just technical milestones."
  },
  "phases": {
    "chipLabel": "Delivery Phases",
    "heading": "How We",
    "headingHighlight": "Deliver",
    "description": "A structured six-phase process from discovery through scale."
  },
  "deliverables": {
    "chipLabel": "Deliverables",
    "heading": "What You",
    "headingHighlight": "Get",
    "description": "Concrete artifacts and systems at every stage—not just reports."
  },
  "engagement": {
    "chipLabel": "Engagement",
    "heading": "How We",
    "headingHighlight": "Engage",
    "description": "Flexible engagement models designed around your constraints."
  },
  "process": {
    "chipLabel": "Process",
    "heading": "A Practical Pre-Production Checklist",
    "description": "A successful proof of concept is not a green light for production. This is what separates a demo from a system."
  },
  "faq": {
    "chipLabel": "FAQ",
    "heading": "Frequently",
    "headingHighlight": "Asked Questions",
    "description": "Common questions about working with us as your AI Solution Partner.",
    "ctaText": "Still have questions? Contact Us"
  },
  "cta": {
    "heading": "Ready to move from",
    "headingHighlight": "AI ambition to AI in production?",
    "description": "Tell us your constraints and goals. We'll propose a practical first step.",
    "primaryCta": "Get Started",
    "secondaryCta": "Contact Us"
  }
}
ENDJSON
)"
echo "✓ Partner page content seeded (ID: $PARTNER_ID)"

###############################################################################
# HUMANOID PAGE
###############################################################################
HUMANOID_ID=$($WP post list --post_type=page --name=humanoid --field=ID 2>/dev/null)
if [ -z "$HUMANOID_ID" ]; then
  HUMANOID_ID=$($WP post create --post_type=page --post_title='AI-Enhanced Humanoid Robotics' --post_name='humanoid' --post_status='publish' --porcelain)
fi

$WP post meta update $HUMANOID_ID page_sections "$(cat <<'ENDJSON'
{
  "hero": {
    "chip": "AgiBot · Robotics · Automation",
    "heading": "AI-Enhanced Embodied &\nHumanoid Robotics Solution",
    "description": "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, and scalable rollout.",
    "ctaPrimary": "Get Started",
    "ctaSecondary": "Contact Us",
    "stats": [
      { "value": "A2 Ultra", "label": "AgiBot Platform" },
      { "value": "Custom AI", "label": "Enhanced Capability" },
      { "value": "End-to-End", "label": "Deployment Service" }
    ]
  },
  "useCases": {
    "chip": "Use Cases",
    "sectionHeading": "Real-World",
    "headingHighlight": "Applications",
    "sectionDescription": "Humanoid robotics designed for practical deployment across industries."
  },
  "outcomes": {
    "chip": "Impact",
    "sectionHeading": "Outcomes",
    "headingHighlight": "We Deliver",
    "sectionDescription": "Every deployment is measured against operational outcomes—not just technical metrics."
  },
  "deliverables": {
    "chip": "What You Get",
    "sectionHeading": "Deployment",
    "headingHighlight": "Deliverables",
    "sectionDescription": "Concrete artifacts and systems at every stage of robotics deployment."
  },
  "cta": {
    "heading": "Ready to deploy",
    "headingHighlight": "humanoid robotics?",
    "description": "Tell us your operational challenge. We'll propose a practical deployment plan.",
    "ctaPrimary": "Get Started",
    "ctaSecondary": "Contact Us"
  }
}
ENDJSON
)"
echo "✓ Humanoid page content seeded (ID: $HUMANOID_ID)"

###############################################################################
# SECURITY PAGE
###############################################################################
SECURITY_ID=$($WP post list --post_type=page --name=security --field=ID 2>/dev/null)
if [ -z "$SECURITY_ID" ]; then
  SECURITY_ID=$($WP post create --post_type=page --post_title='AI Security Guard Solution' --post_name='security' --post_status='publish' --porcelain)
fi

$WP post meta update $SECURITY_ID page_sections "$(cat <<'ENDJSON'
{
  "hero": {
    "chip": "Computer Vision · Analytics",
    "heading": "AI Security Guard Solution",
    "description": "Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.",
    "ctaPrimary": "Get Started",
    "ctaSecondary": "Contact Us",
    "stats": [
      { "value": "CV-Powered", "label": "Video Analytics" },
      { "value": "Real-Time", "label": "Alert System" },
      { "value": "Audit-Ready", "label": "Evidence Trail" }
    ]
  },
  "outcomes": {
    "chip": "Impact",
    "sectionHeading": "Outcomes",
    "headingHighlight": "We Deliver",
    "sectionDescription": "Every deployment is measured against security and operational outcomes."
  },
  "included": {
    "chip": "Platform",
    "sectionHeading": "What's",
    "headingHighlight": "Included",
    "sectionDescription": "A complete AI-powered security platform—not just a camera feed."
  },
  "phases": {
    "chip": "Deployment",
    "sectionHeading": "Deployment",
    "sectionDescription": "A structured rollout from assessment through production monitoring."
  },
  "cta": {
    "heading": "Ready to turn cameras into",
    "headingHighlight": "operational intelligence?",
    "description": "Tell us about your security infrastructure. We'll propose a practical deployment plan.",
    "ctaPrimary": "Get Started",
    "ctaSecondary": "Contact Us"
  }
}
ENDJSON
)"
echo "✓ Security page content seeded (ID: $SECURITY_ID)"

echo ""
echo "=== All pages seeded successfully! ==="
echo "Pages: home, about, services, partner, humanoid, security"
