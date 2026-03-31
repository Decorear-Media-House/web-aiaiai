"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ORANGE_SHINE = "linear-gradient(135deg, #ff8904 0%, #ff6467 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgContent    = "https://www.figma.com/api/mcp/asset/b16625e4-0746-4751-a957-ca05077fd74a";
const imgVertical   = "https://www.figma.com/api/mcp/asset/876374ee-099d-42b6-90b7-0d0f6f45204d";
const imgHorizontal = "https://www.figma.com/api/mcp/asset/054c73b9-07d2-4b8a-bbbd-f12631846507";
const imgIcon       = "https://www.figma.com/api/mcp/asset/f238ba6d-adad-4b93-95e6-bc12c282955f";
const imgIcon1      = "https://www.figma.com/api/mcp/asset/f2a4675c-246c-44cf-9df9-4e79fe0653b1";
const imgIcon2      = "https://www.figma.com/api/mcp/asset/5c3f2d2a-8b5e-4fc4-816f-e37509e11bf3";
const imgIcon3      = "https://www.figma.com/api/mcp/asset/562d1a0d-b217-4a0c-9ff6-ee4ecab2bf25";
const imgIcon4      = "https://www.figma.com/api/mcp/asset/1e5b07c2-11f1-4569-9462-27a25488443e";
const imgBullet     = "https://www.figma.com/api/mcp/asset/f2a4675c-246c-44cf-9df9-4e79fe0653b1";

const PHASES = [
  {
    num: "01",
    icon: imgIcon,
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
    icon: imgIcon2,
    title: "AI Roadmap & Architecture",
    items: [
      "Phased plan: PoC → MVP → production → scale",
      "Architecture blueprint: systems, data, workflows",
      "Integration plan (APIs, pipelines, operational handoffs)",
      "Security, access control, and governance design",
    ],
  },
  {
    num: "03",
    icon: imgIcon3,
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
    icon: imgIcon4,
    title: "Adoption & Continuous Improvement",
    items: [
      "Training and SOP enablement",
      "Operating model: ownership, SLAs, escalation paths",
      "Improvement loop: track performance, tune workflows, expand coverage",
    ],
  },
];

export default function PartnerPhasesSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#1E2E48",
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

      {/* Background grid pattern — 14% opacity */}
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 1920, height: 1440, opacity: 0.14, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1920,
            height: 1440,
            maskImage: `url('${imgContent}')`,
            maskSize: "1440px 1440px",
            maskPosition: "240px 0px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgContent}')`,
            WebkitMaskSize: "1440px 1440px",
            WebkitMaskPosition: "240px 0px",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={imgVertical}   style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={imgHorizontal} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
        </div>
      </div>

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
                Four Phases, Full Coverage
              </span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, margin: 0, textAlign: "center", color: "#fff" }}>
              {"What We "}
              <span style={{ backgroundImage: ORANGE_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Deliver
              </span>
            </h2>
            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              From discovery through adoption — structured work that takes AI from idea to operating model.
            </p>
          </div>
        </FadeUp>

        {/* 4 phase cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-start", width: "100%" }}>
          {PHASES.map(({ num, icon, title, items }, i) => (
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" width={20} height={20} style={{ display: "block" }} />
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
                      <div key={text} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" src={imgBullet} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
                        </div>
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
