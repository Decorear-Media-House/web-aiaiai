"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgPlaceholderImage = "https://www.figma.com/api/mcp/asset/3b292922-4c02-43d5-91ef-9029fe64ef28";
const imgGroup            = "https://www.figma.com/api/mcp/asset/2d5cc8fe-f6ba-42b2-b7b5-cbb52dcb87ca";
const imgGroup1           = "https://www.figma.com/api/mcp/asset/e586ba96-4757-49de-b790-41f1785539a7";
const imgIcon             = "https://www.figma.com/api/mcp/asset/f71d3b6e-0af3-4cc6-8a66-fc6eb7572883";
const imgIcon1            = "https://www.figma.com/api/mcp/asset/53625fc0-0587-40f8-ad57-59d9609b405d";

// Stat icon vectors (chip)
const imgVector  = "https://www.figma.com/api/mcp/asset/d7000ff3-1f83-4bba-a5f6-e10b8f6fcbd5";
const imgVector1 = "https://www.figma.com/api/mcp/asset/4162bbe2-fb08-4f46-aef6-cce33f2e990a";
const imgVector2 = "https://www.figma.com/api/mcp/asset/0167ccd5-304c-47df-8d20-7bad1ce77148";
const imgVector3 = "https://www.figma.com/api/mcp/asset/2e35921e-743b-488f-bad3-6d6345952518";

const TABS = [
  {
    label: "Cost Reduction",
    patterns: [
      { icon: imgIcon,  text: "KPI dashboards" },
      { icon: imgIcon1, text: "Standard process flows and SOP alignment" },
      { icon: imgIcon1, text: "Operational monitoring and improvement cadence" },
    ],
    success: [
      { icon: imgIcon1, text: "Predictable operations" },
      { icon: imgIcon1, text: "Fewer surprises and escalations" },
      { icon: imgIcon1, text: "Continuous improvement based on real data" },
    ],
  },
  {
    label: "Revenue Growth",
    patterns: [
      { icon: imgIcon,  text: "AI-driven lead qualification and scoring" },
      { icon: imgIcon1, text: "Personalized customer engagement workflows" },
      { icon: imgIcon1, text: "Revenue forecast modeling and scenario planning" },
    ],
    success: [
      { icon: imgIcon1, text: "Higher conversion rates" },
      { icon: imgIcon1, text: "Faster sales cycles" },
      { icon: imgIcon1, text: "Improved customer lifetime value" },
    ],
  },
  {
    label: "Compliance & Governance",
    patterns: [
      { icon: imgIcon,  text: "Automated audit trails and evidence capture" },
      { icon: imgIcon1, text: "Policy enforcement and exception workflows" },
      { icon: imgIcon1, text: "Role-based access and data governance controls" },
    ],
    success: [
      { icon: imgIcon1, text: "Reduced compliance risk and audit exposure" },
      { icon: imgIcon1, text: "Faster audit readiness across sites" },
      { icon: imgIcon1, text: "Clear accountability structures at every level" },
    ],
  },
  {
    label: "Operational Excellence",
    patterns: [
      { icon: imgIcon,  text: "Process automation aligned to existing SOPs" },
      { icon: imgIcon1, text: "Exception-based workflows to reduce manual load" },
      { icon: imgIcon1, text: "Real-time operational dashboards" },
    ],
    success: [
      { icon: imgIcon1, text: "Reduced cycle times across operations" },
      { icon: imgIcon1, text: "Fewer manual errors and rework" },
      { icon: imgIcon1, text: "Scalable operations across sites and teams" },
    ],
  },
];

function StatIcon() {
  return (
    <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "12.5%" }}>
        <div style={{ position: "absolute", inset: "-5.56%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "37.5%", left: "75%", right: "25%", bottom: "29.17%" }}>
        <div style={{ position: "absolute", inset: "-12.5% -0.58px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "20.83%", right: "45.83%", bottom: "29.17%", left: "54.17%" }}>
        <div style={{ position: "absolute", inset: "-8.33% -0.58px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector2} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "58.33%", right: "66.67%", bottom: "29.17%", left: "33.33%" }}>
        <div style={{ position: "absolute", inset: "-33.33% -0.58px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector3} />
        </div>
      </div>
    </div>
  );
}

export default function PartnerOutcomesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section
      style={{
        position: "relative",
        background: "#070E24",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
      }}
    >
      {/* Deco top-right corner */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -2,
          right: 0,
          width: 224,
          height: 511,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-13.18% -52.66% -12.62% -0.06%",
            maskImage: `url('${imgGroup}')`,
            maskSize: "224px 511px",
            maskPosition: "0.13px 67.327px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgGroup}')`,
            WebkitMaskSize: "224px 511px",
            WebkitMaskPosition: "0.13px 67.327px",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={imgGroup1} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: 1216,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* Header */}
        <FadeUp trigger="scroll" delay={0}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>
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
              <StatIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                Outcomes
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{
                fontFamily: font,
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.3,
                margin: 0,
                textAlign: "center",
                color: "#fff",
              }}
            >
              {"Business Outcomes We "}
              <span
                style={{
                  backgroundImage: ROYAL_SHINE,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Target
              </span>
            </h2>

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              Every engagement is anchored to real outcomes — not just capabilities.
            </p>
          </div>
        </FadeUp>

        {/* Pill tab switcher */}
        <FadeUp trigger="scroll" delay={0.06}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: 8,
              borderRadius: 99,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
            }}
          >
            {TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(i)}
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  padding: "12px 24px",
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  background: activeTab === i ? "#2D7AE8" : "transparent",
                  color: activeTab === i ? "#fff" : "#90A1B9",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Content row — columns animate independently so flex-stretch works */}
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start", width: "100%" }}>

          {/* Left — photo, self-stretch to match right column height */}
          <FadeUp trigger="scroll" delay={0.1} className="flex-1 min-w-0 self-stretch">
            <div
              style={{
                position: "relative",
                height: "100%",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgPlaceholderImage}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  maxWidth: "none",
                  objectFit: "cover",
                  borderRadius: 16,
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </div>
          </FadeUp>

          {/* Right — two cards */}
          <FadeUp trigger="scroll" delay={0.14} className="flex-1 min-w-0">
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Card 1 — Patterns */}
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <p style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5, margin: 0, whiteSpace: "nowrap" }}>
                  Patterns that work well
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {tab.patterns.map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0, marginTop: 3 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" src={icon} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
                      </div>
                      <p style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Success */}
              <div
                style={{
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <p style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5, margin: 0, whiteSpace: "nowrap" }}>
                  What success looks like
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {tab.success.map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0, marginTop: 3 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" src={icon} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
                      </div>
                      <p style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
