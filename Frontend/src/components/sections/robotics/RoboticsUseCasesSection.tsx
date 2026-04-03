"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5"/>
    </svg>
  );
}

const TABS = [
  {
    label: "Logistics & Warehousing",
    caseLabel: "Use Case 1",
    tags: ["Pick & Place", "Inventory", "WMS Integration"],
    heading: "Logistics & Warehousing",
    body: "Humanoid robots handling pick-and-place, sorting, and inventory checks in warehouse environments — integrated with existing WMS and operational SOPs.",
  },
  {
    label: "Manufacturing & Assembly",
    caseLabel: "Use Case 2",
    tags: ["Line Assembly", "QA Inspection", "ERP Integration"],
    heading: "Manufacturing & Assembly",
    body: "Robots operating alongside human workers on assembly lines — performing precision tasks, quality checks, and feeding data directly into ERP systems.",
  },
  {
    label: "Facility & Inspection",
    caseLabel: "Use Case 3",
    tags: ["Patrol & Monitoring", "Anomaly Detection", "CMMS Integration"],
    heading: "Facility & Inspection",
    body: "Autonomous inspection rounds across facilities — detecting anomalies, logging maintenance events, and syncing findings with facility management systems.",
  },
];

interface UseCasesContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  tabs?: typeof TABS;
  background_color?: string;
}

export default function RoboticsUseCasesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as UseCasesContent;
  const chip = c.chip ?? "Use Cases";
  const sectionHeading = c.heading ?? "Where Robots ";
  const headingHighlight = c.heading_highlight ?? "Deliver Value";
  const sectionDescription = c.description ?? "Deployment-ready use cases across industries — each with a structured pilot, SOP, and integration plan.";
  const tabs = c.tabs ?? TABS;
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];

  return (
    <section
      style={{
        position: "relative",
        background: c.background_color ?? "#070E24",
        paddingTop: 40,
        paddingBottom: 80,
        overflow: "hidden",
      }}
    >
      {/* Glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 68,
          right: 0,
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: "rgba(43,61,255,0.1)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />

      {/* Deco corner top-right — decorative gradient arc */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 224,
          height: 511,
          overflow: "hidden",
          pointerEvents: "none",
          background: "linear-gradient(220deg, rgba(43,127,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Glow bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: -2,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: "rgba(43,127,255,0.1)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          maxWidth: 1216,
          margin: "0 auto",
          paddingLeft: 112,
          paddingRight: 112,
          display: "flex",
          flexDirection: "column",
          gap: 40,
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
                borderRadius: 8,
                padding: "8px 16px",
                background: "rgba(43,127,255,0.1)",
                border: "1px solid rgba(43,127,255,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <SparkleIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                {chip}
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
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              {sectionDescription}
            </p>
          </div>
        </FadeUp>

        {/* Pill tab switcher */}
        <FadeUp trigger="scroll" delay={0.08}>
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
            {tabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActiveTab(i)}
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  background: activeTab === i ? "#2D7AE8" : "transparent",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                  ...(activeTab !== i && { color: "#90A1B9" }),
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Content row */}
        <FadeUp trigger="scroll" delay={0.14}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px 40px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left — photo card placeholder */}
            <div
              style={{
                flex: "1 0 0",
                minWidth: 300,
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                paddingTop: 300,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Dark gradient placeholder for photos */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #0A1430 0%, #1A2A50 50%, #0E1E3E 100%)",
                  }}
                />
              </div>
              {/* Tags */}
              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 4 }}>
                {tab.tags.map((tag) => (
                  <div
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      borderRadius: 8,
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — content */}
            <div
              style={{
                flex: "1 0 0",
                minWidth: 300,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                alignItems: "flex-start",
              }}
            >
              {/* Case chip */}
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
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                  {tab.caseLabel}
                </span>
              </div>

              {/* h3 */}
              <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", margin: 0 }}>
                {tab.heading}
              </h3>

              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>
                {tab.body}
              </p>

              {/* Dot carousel */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {tabs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    aria-label={`Go to tab ${i + 1}`}
                    style={{
                      width: i === activeTab ? 32 : 6,
                      height: 6,
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "width 0.3s, background 0.3s",
                      backgroundImage: i === activeTab ? ROYAL_SHINE : undefined,
                      background: i === activeTab ? undefined : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
