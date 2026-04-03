"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Generic deliverable icon — white shape on gradient background */
function DeliverableIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="#fff" strokeWidth="1.2"/>
      <path d="M6 9l2 2 4-4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const DELIVERABLES = [
  { num: "01", title: "Task definition and environment constraints" },
  { num: "02", title: "Pilot readiness plan with KPIs" },
  { num: "03", title: "SOPs and training approach" },
  { num: "04", title: "Maintenance/service readiness and escalation" },
  { num: "05", title: "Workflow integration into reporting and operations" },
  { num: "06", title: "Rollout governance and scale planning" },
];

interface DeliverablesContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  items?: typeof DELIVERABLES;
  background_color?: string;
}

export default function RoboticsDeliverablesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as DeliverablesContent;
  const chip = c.chip ?? "Deliverables";
  const sectionHeading = c.heading ?? "What We ";
  const headingHighlight = c.heading_highlight ?? "Deliver";
  const sectionDescription = c.description ?? "Six structured work products that take you from concept to operating robotics at scale.";
  const deliverables = c.items ?? DELIVERABLES;
  return (
    <section
      style={{
        position: "relative",
        background: c.background_color ?? "#070E24",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
      }}
    >
      {/* Blue glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 512,
          height: 512,
          borderRadius: 9999,
          background: "rgba(43,127,255,0.05)",
          filter: "blur(82px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1216,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {/* Left — header */}
        <FadeUp trigger="scroll" delay={0}>
          <div
            style={{
              flex: "1 0 0",
              minWidth: 300,
              maxWidth: 389,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {/* Chip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(43,127,255,0.1)",
                border: "1px solid rgba(43,127,255,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {/* Lightbulb icon */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5A3.5 3.5 0 0 0 4.5 8v.5h5V8A3.5 3.5 0 0 0 7 1.5Z" stroke="#4A99F5" strokeWidth="1.2" />
                <path d="M5 9.5h4M5.5 11h3" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                {chip}
              </span>
            </div>

            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
              {sectionHeading}
              <span
                style={{
                  backgroundImage: ROYAL_SHINE,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {headingHighlight}
              </span>
            </h2>

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
              {sectionDescription}
            </p>
          </div>
        </FadeUp>

        {/* Right — 6 cards */}
        <div
          style={{
            flex: "1 0 0",
            minWidth: 300,
            maxWidth: 787,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          {deliverables.map(({ num, title }, i) => (
            <FadeUp key={num} trigger="scroll" delay={i * 0.07}>
              <div
                style={{
                  flex: "1 0 0",
                  minWidth: 200,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                {/* Icon row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", height: 40 }}>
                  {/* Icon square */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundImage: ROYAL_SHINE,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DeliverableIcon />
                  </div>
                  {/* Number */}
                  <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: "#4A6080", whiteSpace: "nowrap" }}>
                    {num}
                  </span>
                </div>
                {/* Title */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, margin: 0 }}>
                  {title}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
