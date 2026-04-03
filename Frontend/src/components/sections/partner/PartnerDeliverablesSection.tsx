"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Goal / target icon */
function GoalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="#4A99F5" strokeWidth="1.2"/>
      <circle cx="7" cy="7" r="3.5" stroke="#4A99F5" strokeWidth="1.2"/>
      <circle cx="7" cy="7" r="1.2" fill="#4A99F5"/>
    </svg>
  );
}

const DELIVERABLES = [
  { title: "AI opportunity map",      sub: "candidate use cases grouped by outcomes" },
  { title: "Prioritized backlog",     sub: "what to do now vs later, with rationale" },
  { title: "Roadmap",                 sub: "phases, milestones, dependencies, resourcing" },
  { title: "Architecture blueprint",  sub: "integration points, data flows, system boundaries" },
  { title: "MVP definition",          sub: "scope, acceptance criteria, user journeys" },
  { title: "Governance pack",         sub: "access model, logs, audit trail approach, risk controls" },
  { title: "Rollout plan",            sub: "pilot \u2192 rollout \u2192 adoption plan with training" },
  { title: "Operations playbook",     sub: "monitoring, incident handling, change control" },
];

export default function PartnerDeliverablesSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "Deliverables";
  const heading = (content?.heading as string) ?? "Typical ";
  const headingHighlight = (content?.headingHighlight as string) ?? "Deliverables";
  const description = (content?.description as string) ??
    "Concrete, tangible work products \u2014 each designed to carry AI from concept through live operation.";
  const placeholderImage = wpImageUrl((content?.placeholder_image as string) || "");
  const bgColor = (content?.background_color as string) ?? "#102050";
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
      {/* Blue glow top-center */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 512, height: 512, borderRadius: 9999, background: "rgba(43,127,255,0.05)", filter: "blur(82px)", pointerEvents: "none" }} />

      {/* Deco bottom-right — decorative gradient arc */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, right: 0, width: 397, height: 413, overflow: "hidden", pointerEvents: "none", background: "linear-gradient(320deg, rgba(43,127,255,0.06) 0%, transparent 50%)" }}
      />

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* Left — photo card placeholder */}
        <FadeUp trigger="scroll" delay={0} className="flex-[1_0_0] max-w-[389px] self-stretch">
          <div
            style={{
              position: "relative",
              height: "100%",
              borderRadius: 16,
              boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
            }}
          >
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 16 }}>
              {placeholderImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={placeholderImage}
                  alt=""
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "block",
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    objectFit: "cover",
                    borderRadius: 16,
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #0A1430 0%, #1A2A50 50%, #0E1E3E 100%)",
                  }}
                />
              )}
            </div>
          </div>
        </FadeUp>

        {/* Right — header + deliverable cards */}
        <FadeUp trigger="scroll" delay={0.06} className="flex-[1_0_0] min-w-0">
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Chip */}
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 8,
                  background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <GoalIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>{chipLabel}</span>
              </div>
              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                {heading}
                <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {headingHighlight}
                </span>
              </h2>
              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                {description}
              </p>
            </div>

            {/* Deliverable cards grid */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
              {DELIVERABLES.map(({ title, sub }, i) => (
                <FadeUp key={title} trigger="scroll" delay={i * 0.05} className="flex-[1_0_0] min-w-[240px]">
                  <div
                    style={{
                      padding: 24, borderRadius: 16,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                      display: "flex", flexDirection: "column", gap: 8,
                    }}
                  >
                    <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, margin: 0 }}>{title}</p>
                    <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{sub}</p>
                  </div>
                </FadeUp>
              ))}
              {/* Dummy spacer to balance last row */}
              <div style={{ flex: "1 0 0", minWidth: 240, height: 122, borderRadius: 16 }} />
            </div>

          </div>
        </FadeUp>

      </div>
    </section>
  );
}
