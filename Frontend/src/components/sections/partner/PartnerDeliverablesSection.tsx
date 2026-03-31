"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgPlaceholderImage  = "https://www.figma.com/api/mcp/asset/dd0fd7a8-93cf-4fb4-8244-f8d9d60d6a5a";
const imgPlaceholderImage1 = "https://www.figma.com/api/mcp/asset/8db52937-0cab-435a-825b-a835dc086805";
const imgGroup             = "https://www.figma.com/api/mcp/asset/12e917ff-2ab8-46f3-afe8-ab0482a85151";
const imgGroup1            = "https://www.figma.com/api/mcp/asset/a1fbba95-34ef-4ac6-8f88-71b021c279c0";

// Goal icon vectors
const imgVector  = "https://www.figma.com/api/mcp/asset/48a0ea67-a24a-4a99-847a-cde3dd67f511";
const imgVector1 = "https://www.figma.com/api/mcp/asset/28a38887-bddb-49f1-916d-1dbbb4d305b3";
const imgVector2 = "https://www.figma.com/api/mcp/asset/69938d4c-f7de-4ae5-a80f-9ec85813c979";

const DELIVERABLES = [
  { title: "AI opportunity map",      sub: "candidate use cases grouped by outcomes" },
  { title: "Prioritized backlog",     sub: "what to do now vs later, with rationale" },
  { title: "Roadmap",                 sub: "phases, milestones, dependencies, resourcing" },
  { title: "Architecture blueprint",  sub: "integration points, data flows, system boundaries" },
  { title: "MVP definition",          sub: "scope, acceptance criteria, user journeys" },
  { title: "Governance pack",         sub: "access model, logs, audit trail approach, risk controls" },
  { title: "Rollout plan",            sub: "pilot → rollout → adoption plan with training" },
  { title: "Operations playbook",     sub: "monitoring, incident handling, change control" },
];

function GoalIcon() {
  return (
    <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "8.33%" }}>
        <div style={{ position: "absolute", inset: "-5%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
        </div>
      </div>
      <div style={{ position: "absolute", inset: "25%" }}>
        <div style={{ position: "absolute", inset: "-8.33%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
      <div style={{ position: "absolute", inset: "41.67%" }}>
        <div style={{ position: "absolute", inset: "-25%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector2} />
        </div>
      </div>
    </div>
  );
}

export default function PartnerDeliverablesSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#102050",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
      }}
    >
      {/* Blue glow top-center */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 512, height: 512, borderRadius: 9999, background: "rgba(43,127,255,0.05)", filter: "blur(82px)", pointerEvents: "none" }} />

      {/* Deco bottom-right */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, right: 0, width: 397, height: 413, overflow: "hidden", pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0 -53.15% -55.69% 0",
            maskImage: `url('${imgGroup}')`,
            maskSize: "397px 413px",
            maskPosition: "0px 0px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgGroup}')`,
            WebkitMaskSize: "397px 413px",
            WebkitMaskPosition: "0px 0px",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={imgGroup1} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", gap: 40, alignItems: "flex-start" }}>

        {/* Left — photo card, self-stretch, capped at 389px */}
        {/* FadeUp className drives flex sizing + max-width — style prop is NOT supported by FadeUp */}
        <FadeUp trigger="scroll" delay={0} className="flex-[1_0_0] max-w-[389px] self-stretch">
          {/* Shadow lives here — NO overflow:hidden so it isn't clipped */}
          <div
            style={{
              position: "relative",
              height: "100%",
              borderRadius: 16,
              boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
            }}
          >
            {/* Images are absolutely positioned inside an aria-hidden wrapper */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgPlaceholderImage}
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
              {/* Overlay image — clipped within its own overflow:hidden container */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgPlaceholderImage1}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-133.27%",
                    width: "256.84%",
                    height: "100%",
                    maxWidth: "none",
                    display: "block",
                  }}
                />
              </div>
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
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>Deliverables</span>
              </div>
              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                {"Typical "}
                <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Deliverables
                </span>
              </h2>
              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                Concrete, tangible work products — each designed to carry AI from concept through live operation.
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
