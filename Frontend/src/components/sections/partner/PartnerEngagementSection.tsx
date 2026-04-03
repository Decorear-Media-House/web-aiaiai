"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Team / people icon */
function TeamIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="5" cy="4" r="2" stroke="#4A99F5" strokeWidth="1.2"/>
      <circle cx="10" cy="4" r="1.5" stroke="#4A99F5" strokeWidth="1.2"/>
      <path d="M1 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 8c1.7 0 3 1.3 3 3" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Colored bullet dot */
function BulletIcon({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        marginTop: 8,
      }}
    />
  );
}

const MODELS = [
  {
    label: "Model A",
    labelColor: "#4A99F5",
    title: "Partner-led Governance",
    desc: "You have a team/vendor who builds. We ensure delivery happens correctly.",
    border: "rgba(43,127,255,0.2)",
    glow: "rgba(59,130,246,0.4)",
    bulletColor: "#4A99F5",
    items: [
      "Roadmap, scope control, acceptance criteria",
      "Architecture and governance",
      "Rollout and adoption design",
    ],
  },
  {
    label: "Model B",
    labelColor: "#00BC7D",
    title: "Co-build Delivery",
    desc: "You have a team/vendor who builds. We ensure delivery happens correctly.",
    border: "rgba(0,188,125,0.2)",
    glow: "rgba(16,185,129,0.4)",
    bulletColor: "#00BC7D",
    items: [
      "Shared backlog and priorities",
      "Rapid iteration and weekly checkpoints",
      "Production readiness baked into each sprint",
    ],
  },
  {
    label: "Model C",
    labelColor: "#FF8904",
    title: "Build & Handover",
    desc: "We build MVP modules or key components and hand over to your team.",
    border: "rgba(255,105,0,0.2)",
    glow: "rgba(249,115,22,0.4)",
    bulletColor: "#FF8904",
    items: [
      "Fully working MVP modules or components",
      "Training and operational ownership setup",
    ],
  },
];

export default function PartnerEngagementSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "Engagement models";
  const heading = (content?.heading as string) ?? "How We ";
  const headingHighlight = (content?.headingHighlight as string) ?? "Engage";
  const description = (content?.description as string) ??
    "Three flexible models to match how your organisation prefers to work.";
  const bgColor = (content?.background_color as string) ?? "#070E24";
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
      {/* Blue glow center */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 512, height: 512, borderRadius: 9999, background: "rgba(43,127,255,0.05)", filter: "blur(82px)", pointerEvents: "none" }} />

      {/* Deco bottom-left — decorative gradient arc */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: 397, height: 413, overflow: "hidden", pointerEvents: "none", background: "linear-gradient(40deg, rgba(43,127,255,0.06) 0%, transparent 50%)" }}
      />

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", flexDirection: "column", gap: 64, alignItems: "center" }}>

        {/* Header */}
        <FadeUp trigger="scroll" delay={0}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>
            {/* Chip */}
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 8,
                background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <TeamIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>{chipLabel}</span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, margin: 0, textAlign: "center", color: "#fff", width: "100%" }}>
              {heading}
              <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {headingHighlight}
              </span>
            </h2>
            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0, width: "100%" }}>
              {description}
            </p>
          </div>
        </FadeUp>

        {/* 3 model cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", width: "100%" }}>
          {MODELS.map(({ label, labelColor, title, desc, border, glow, bulletColor, items }, i) => (
            <div
              key={label}
              style={{
                flex: "1 1 0%", minWidth: 300,
                display: "flex", flexDirection: "column",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${border}`,
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                boxShadow: `0px 0px 20px 0px ${glow}`,
                overflow: "clip",
              }}
            >
              <FadeUp trigger="scroll" delay={i * 0.08}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", padding: 32 }}>

                  {/* Top section — divider bottom */}
                  <div
                    style={{
                      display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start",
                      width: "100%", paddingBottom: 24,
                      borderBottom: "1px solid #1E2E48",
                    }}
                  >
                    <p style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: labelColor, textAlign: "center", margin: 0, width: "100%" }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: "#fff", textAlign: "center", margin: 0, width: "100%" }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, textAlign: "center", margin: 0, width: "100%" }}>
                      {desc}
                    </p>
                  </div>

                  {/* Bullet items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                    {items.map((text) => (
                      <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <BulletIcon color={bulletColor} />
                        <p style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    style={{
                      fontFamily: font, fontSize: 16, color: "#fff", textDecoration: "none",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                      padding: "12px 24px", borderRadius: 8, width: "100%",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Contact Us
                    <ChevronRightIcon />
                  </a>

                </div>
              </FadeUp>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
