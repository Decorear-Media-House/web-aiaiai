"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ORANGE_SHINE = "linear-gradient(135deg, #ff8904 0%, #ff6467 100%)";

/** Generic phase icon — white shape on gradient background */
function PhaseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="#fff" strokeWidth="1.3"/>
      <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Bullet dot for phase items */
function BulletDot() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#FF8904",
        flexShrink: 0,
        marginTop: 8,
      }}
    />
  );
}

const PHASES = [
  {
    num: "01",
    title: "Discovery & Prioritization",
    items: [
      "Process mapping and bottleneck analysis",
      "Use case identification and prioritization",
      "Feasibility assessment: value, complexity, risk, data readiness",
      "Success metrics and outcome definition",
    ],
  },
  {
    num: "02",
    title: "AI Roadmap & Architecture",
    items: [
      "Phased plan: PoC \u2192 MVP \u2192 production \u2192 scale",
      "Architecture blueprint: systems, data, workflows",
      "Integration plan (APIs, pipelines, operational handoffs)",
      "Security, access control, and governance design",
    ],
  },
  {
    num: "03",
    title: "Implementation Support",
    items: [
      "PoC design to validate feasibility quickly",
      "MVP scope and build plan aligned to real users",
      "Production deployment readiness: monitoring, rollout, change control",
      "Documentation and handover options",
    ],
  },
  {
    num: "04",
    title: "Adoption & Continuous Improvement",
    items: [
      "Training and SOP enablement",
      "Operating model: ownership, SLAs, escalation paths",
      "Improvement loop: track performance, tune workflows, expand coverage",
    ],
  },
];

export default function PartnerPhasesSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "Four Phases, Full Coverage";
  const heading = (content?.heading as string) ?? "What We ";
  const headingHighlight = (content?.headingHighlight as string) ?? "Deliver";
  const description = (content?.description as string) ??
    "From discovery through adoption \u2014 structured work that takes AI from idea to operating model.";
  const bgColor = (content?.background_color as string) ?? "#1E2E48";
  return (
    <section
      style={{
        position: "relative",
        background: bgColor,
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
      }}
    >
      {/* Orange glow top-left */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: 400, height: 400, borderRadius: 9999, background: "rgba(252,90,21,0.1)", filter: "blur(64px)", pointerEvents: "none" }} />
      {/* Orange glow bottom-right */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, right: 0, width: 400, height: 400, borderRadius: 9999, background: "rgba(252,90,21,0.1)", filter: "blur(64px)", pointerEvents: "none" }} />

      {/* Background grid pattern — CSS-based replacement */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>

        {/* Header */}
        <FadeUp trigger="scroll" delay={0}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>
            {/* Chip */}
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 8,
                background: "rgba(251,44,54,0.1)", border: "1px solid rgba(251,44,54,0.2)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5L8.5 5.5H12.5L9.5 8L10.5 12L7 9.5L3.5 12L4.5 8L1.5 5.5H5.5L7 1.5Z" stroke="#FFA2A2" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: font, fontSize: 12, color: "#FFA2A2", whiteSpace: "nowrap" }}>
                {chipLabel}
              </span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, margin: 0, textAlign: "center", color: "#fff" }}>
              {heading}
              <span style={{ backgroundImage: ORANGE_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {headingHighlight}
              </span>
            </h2>
            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              {description}
            </p>
          </div>
        </FadeUp>

        {/* 4 phase cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start", width: "100%" }}>
          {PHASES.map(({ num, title, items }, i) => (
            <FadeUp key={num} trigger="scroll" delay={i * 0.08} className="flex-1 min-w-[400px]">
              <div
                style={{
                  display: "flex", flexDirection: "column", gap: 8,
                  padding: 24, borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                {/* Icon + number row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  {/* Icon square */}
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      backgroundImage: ORANGE_SHINE,
                      boxShadow: "0px 0px 16px 0px rgba(255,117,18,0.35)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <PhaseIcon />
                  </div>
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: font, fontSize: 48, lineHeight: 1.2, whiteSpace: "nowrap",
                      backgroundImage: ORANGE_SHINE,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}
                  >
                    {num}
                  </span>
                </div>

                {/* Title + bullets */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", margin: 0 }}>
                    {title}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((text) => (
                      <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <BulletDot />
                        <p style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
