"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 mt-0.5" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5"/>
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AnalyticsPacksIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  );
}

function WorkflowsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DeploymentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 4.5v7L12 18l-8-4.5v-7L12 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 18v4M12 10l8-4.5M12 10L4 5.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const PILLAR_ICONS = [
  <AnalyticsPacksIcon key="ap" />,
  <WorkflowsIcon key="wf" />,
  <DeploymentIcon key="dp" />,
];

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-start">
      <CheckCircleIcon />
      <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEEA", lineHeight: "22.75px" }}>{text}</p>
    </div>
  );
}

const PILLARS = [
  {
    title: "Analytics packs (examples)",
    items: [
      "Restricted area / zone monitoring",
      "Anomaly detection (site-defined patterns)",
      "Event triggers (rules-based)",
      "Identity/track-based workflows (as permitted by requirements)",
    ],
  },
  {
    title: "Workflows and operations",
    items: [
      "Alert routing and escalation",
      "Incident reporting and evidence capture",
      "Dashboards and performance reporting",
      "SOP alignment and operational playbooks",
    ],
  },
  {
    title: "Deployment readiness",
    items: [
      "Site assessment and camera mapping",
      "Pilot design and success criteria",
      "Rollout strategy across sites and camera groups",
      "Governance (roles, access, retention practices)",
    ],
  },
];

interface IncludedContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  pillars?: typeof PILLARS;
  background_color?: string;
  wpImageUrl?: string;
}

export default function SecurityIncludedSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as IncludedContent;
  const chip = c.chip ?? "What\u2019s Included";
  const sectionHeading = c.heading ?? "What the Solution ";
  const headingHighlight = c.heading_highlight ?? "Includes";
  const sectionDescription = c.description ?? "Three pillars that work together to turn cameras into an operational intelligence system.";
  const pillars = c.pillars ?? PILLARS;
  return (
    <section className="relative overflow-x-clip" style={{ background: "#1A4494" }}>
      {/* Background grid pattern — 20% opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 overflow-hidden"
        aria-hidden="true"
      >
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="included-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#included-grid)" />
        </svg>
      </div>

      <Container className="relative py-20">
        <div className="flex flex-col gap-10 items-center max-w-[1216px] mx-auto">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center">
              {/* Chip */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="1" fill="white" />
                </svg>
                <span style={{ fontFamily: font, fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>
                  {chip}
                </span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", textAlign: "center" }}>
                {sectionHeading}
                <span style={{ color: "#00BAF2" }}>{headingHighlight}</span>
              </h2>

              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, textAlign: "center" }}>
                {sectionDescription}
              </p>
            </div>
          </FadeUp>

          {/* 3-column pillars */}
          <div className="flex flex-wrap gap-6 items-start w-full">
            {pillars.map(({ title, items }, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="flex-1 min-w-[260px] flex flex-col gap-6">

                {/* Photo card */}
                <div
                  className="relative rounded-2xl overflow-hidden flex items-end shrink-0 w-full"
                  style={{ paddingTop: 180, paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }}
                >
                  {/* Gradient placeholder for photos */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, #0A132F ${i * 10}%, #1A4494 50%, #0A132F ${100 - i * 10}%)` }}
                    aria-hidden="true"
                  />
                  {/* Icon */}
                  <div
                    className="relative flex items-center justify-center rounded-xl shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundImage: ROYAL_SHINE,
                    }}
                  >
                    {PILLAR_ICONS[i]}
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-6">
                  <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", margin: 0 }}>
                    {title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {items.map((text) => (
                      <CheckItem key={text} text={text} />
                    ))}
                  </div>
                </div>

              </FadeUp>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
