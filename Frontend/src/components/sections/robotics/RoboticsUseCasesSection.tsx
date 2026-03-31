"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/robotics/
const imgThumnail  = "https://www.figma.com/api/mcp/asset/68c22e5a-3db5-4d88-a8eb-1a007cc502cb";
const imgThumnail1 = "https://www.figma.com/api/mcp/asset/099caa6f-05af-48c6-a345-2d2e432fa16a";
const imgGroup     = "https://www.figma.com/api/mcp/asset/174d3d98-7381-41fa-8447-16bd6de94159";
const imgGroup1    = "https://www.figma.com/api/mcp/asset/50cdc245-5a18-4fcc-86ea-770a5b368d4f";

// Sparkle icon vectors
const imgVector  = "https://www.figma.com/api/mcp/asset/3b148a11-1489-4839-8f09-a48587cb34ce";
const imgVector1 = "https://www.figma.com/api/mcp/asset/dfe75313-88a5-452a-9682-b4f525cab52b";
const imgVector2 = "https://www.figma.com/api/mcp/asset/ccf11cae-9e8d-49f0-a993-e377d8f4b4ce";
const imgVector3 = "https://www.figma.com/api/mcp/asset/935fcdad-a41b-4a6d-99c0-c509facd4b35";
const imgVector4 = "https://www.figma.com/api/mcp/asset/be71d7b9-cc55-4df5-88cf-51e60929043d";

const TABS = [
  {
    label: "Logistics & Warehousing",
    caseLabel: "Use Case 1",
    photos: [imgThumnail, imgThumnail1],
    tags: ["Pick & Place", "Inventory", "WMS Integration"],
    heading: "Logistics & Warehousing",
    body: "Humanoid robots handling pick-and-place, sorting, and inventory checks in warehouse environments — integrated with existing WMS and operational SOPs.",
  },
  {
    label: "Manufacturing & Assembly",
    caseLabel: "Use Case 2",
    photos: [imgThumnail, imgThumnail1],
    tags: ["Line Assembly", "QA Inspection", "ERP Integration"],
    heading: "Manufacturing & Assembly",
    body: "Robots operating alongside human workers on assembly lines — performing precision tasks, quality checks, and feeding data directly into ERP systems.",
  },
  {
    label: "Facility & Inspection",
    caseLabel: "Use Case 3",
    photos: [imgThumnail, imgThumnail1],
    tags: ["Patrol & Monitoring", "Anomaly Detection", "CMMS Integration"],
    heading: "Facility & Inspection",
    body: "Autonomous inspection rounds across facilities — detecting anomalies, logging maintenance events, and syncing findings with facility management systems.",
  },
];

function SparkleIcon() {
  return (
    <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: "8.33% 8.32% 8.33% 8.34%" }}>
        <div style={{ position: "absolute", inset: "-5%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "12.5%", right: "83.33%", bottom: "70.83%", left: "16.67%" }}>
        <div style={{ position: "absolute", inset: "-25% -0.58px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "20.83%", left: "75%", right: "8.33%", bottom: "79.17%" }}>
        <div style={{ position: "absolute", inset: "-0.58px -25%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector2} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "70.83%", left: "16.67%", right: "83.33%", bottom: "20.83%" }}>
        <div style={{ position: "absolute", inset: "-50% -0.58px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector3} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "75%", left: "12.5%", right: "79.17%", bottom: "25%" }}>
        <div style={{ position: "absolute", inset: "-0.58px -50%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector4} />
        </div>
      </div>
    </div>
  );
}

export default function RoboticsUseCasesSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section
      style={{
        position: "relative",
        background: "#070E24",
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

      {/* Deco corner top-right */}
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
                Use Cases
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
              {"Where Robots "}
              <span
                style={{
                  backgroundImage: ROYAL_SHINE,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Deliver Value
              </span>
            </h2>

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              Deployment-ready use cases across industries — each with a structured pilot, SOP, and integration plan.
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
            {TABS.map((t, i) => (
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
            {/* Left — photo card */}
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
              {/* Photos */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none" }}>
                {tab.photos.map((src, pi) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={pi}
                    alt=""
                    src={src}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      maxWidth: "none",
                      objectFit: "cover",
                      borderRadius: 16,
                      display: "block",
                    }}
                  />
                ))}
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
                {TABS.map((_, i) => (
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
