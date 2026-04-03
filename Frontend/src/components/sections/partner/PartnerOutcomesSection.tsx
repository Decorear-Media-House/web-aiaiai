"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Stat / bar-chart icon for the chip */
function StatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="7" width="3" height="5" rx="0.5" stroke="#4A99F5" strokeWidth="1.2"/>
      <rect x="5.5" y="4" width="3" height="8" rx="0.5" stroke="#4A99F5" strokeWidth="1.2"/>
      <rect x="10" y="2" width="3" height="10" rx="0.5" stroke="#4A99F5" strokeWidth="1.2"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5"/>
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5"/>
    </svg>
  );
}

const TABS = [
  {
    label: "Cost Reduction",
    patterns: [
      { text: "KPI dashboards", useSparkle: true },
      { text: "Standard process flows and SOP alignment", useSparkle: false },
      { text: "Operational monitoring and improvement cadence", useSparkle: false },
    ],
    success: [
      { text: "Predictable operations" },
      { text: "Fewer surprises and escalations" },
      { text: "Continuous improvement based on real data" },
    ],
  },
  {
    label: "Revenue Growth",
    patterns: [
      { text: "AI-driven lead qualification and scoring", useSparkle: true },
      { text: "Personalized customer engagement workflows", useSparkle: false },
      { text: "Revenue forecast modeling and scenario planning", useSparkle: false },
    ],
    success: [
      { text: "Higher conversion rates" },
      { text: "Faster sales cycles" },
      { text: "Improved customer lifetime value" },
    ],
  },
  {
    label: "Compliance & Governance",
    patterns: [
      { text: "Automated audit trails and evidence capture", useSparkle: true },
      { text: "Policy enforcement and exception workflows", useSparkle: false },
      { text: "Role-based access and data governance controls", useSparkle: false },
    ],
    success: [
      { text: "Reduced compliance risk and audit exposure" },
      { text: "Faster audit readiness across sites" },
      { text: "Clear accountability structures at every level" },
    ],
  },
  {
    label: "Operational Excellence",
    patterns: [
      { text: "Process automation aligned to existing SOPs", useSparkle: true },
      { text: "Exception-based workflows to reduce manual load", useSparkle: false },
      { text: "Real-time operational dashboards", useSparkle: false },
    ],
    success: [
      { text: "Reduced cycle times across operations" },
      { text: "Fewer manual errors and rework" },
      { text: "Scalable operations across sites and teams" },
    ],
  },
];

export default function PartnerOutcomesSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "Outcomes";
  const heading = (content?.heading as string) ?? "Business Outcomes We ";
  const headingHighlight = (content?.headingHighlight as string) ?? "Target";
  const description = (content?.description as string) ??
    "Every engagement is anchored to real outcomes \u2014 not just capabilities.";
  const placeholderImage = wpImageUrl((content?.placeholder_image as string) || "");
  const bgColor = (content?.background_color as string) ?? "#070E24";
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

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
      {/* Deco top-right corner — decorative gradient arc */}
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
          background: "linear-gradient(220deg, rgba(43,127,255,0.08) 0%, transparent 60%)",
        }}
      />

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
                {chipLabel}
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
              {heading}
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
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              {description}
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

        {/* Content row */}
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start", width: "100%" }}>

          {/* Left — photo placeholder */}
          <FadeUp trigger="scroll" delay={0.1} className="flex-1 min-w-0 self-stretch">
            <div
              style={{
                position: "relative",
                height: "100%",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {placeholderImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={placeholderImage}
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
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #0A1430 0%, #1A2A50 50%, #0E1E3E 100%)",
                  }}
                />
              )}
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
                  {tab.patterns.map(({ text, useSparkle }) => (
                    <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      {useSparkle ? <SparkleIcon /> : <CheckCircleIcon />}
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
                  {tab.success.map(({ text }) => (
                    <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <CheckCircleIcon />
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
