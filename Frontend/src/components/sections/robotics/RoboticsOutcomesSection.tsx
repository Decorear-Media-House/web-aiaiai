"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local assets in /public/images/robotics/
const imgGe  = "https://www.figma.com/api/mcp/asset/21996aff-a9f9-4ea7-bef1-7fd8f0e029e4";
const imgGe1 = "https://www.figma.com/api/mcp/asset/7c9968fb-0da7-42ee-a891-b6c376fd66c2";
const imgCheckCircle2 = "https://www.figma.com/api/mcp/asset/df8ab74c-7bb1-4a44-b8b3-363c23171d75";
const imgOIcon  = "https://www.figma.com/api/mcp/asset/b114c9a0-b13d-4117-820f-7a48d3a4a8a8";
const imgOIcon1 = "https://www.figma.com/api/mcp/asset/684e3bdb-1540-4f11-a400-35a398df60a0";
const imgIcon   = "https://www.figma.com/api/mcp/asset/93cde9f6-e363-42c4-a172-e65537bd7630";
const imgIcon1  = "https://www.figma.com/api/mcp/asset/cbcf785e-b940-42a4-9ab1-119267a1238a";
const imgChevronRight  = "https://www.figma.com/api/mcp/asset/ca5aeb1a-710d-43ff-a0ce-c5eb427b6c8e";
const imgChevronRight1 = "https://www.figma.com/api/mcp/asset/e36ecb27-d2ac-4f53-8426-8df535223e89";

const ACCORDION_ITEMS = [
  {
    label: "Labor efficiency & cost reduction",
    iconImg: imgOIcon,
    iconGradient: "linear-gradient(135deg, #00BC7D 0%, #0092B8 100%)",
    items: [
      "Automate repetitive tasks to improve throughput",
      "Reduce operational load for routine work",
      "Focus people on exceptions and higher-value tasks",
    ],
  },
  {
    label: "Operational consistency",
    iconImg: imgIcon,
    iconGradient: "linear-gradient(135deg, #2B7FFF 0%, #00B8DB 100%)",
    items: [],
  },
  {
    label: "Safety & governance",
    iconImg: imgOIcon1,
    iconGradient: "linear-gradient(135deg, #00B8DB 0%, #155DFC 100%)",
    items: [],
  },
  {
    label: "Scalability",
    iconImg: imgIcon1,
    iconGradient: "linear-gradient(135deg, #8E51FF 0%, #155DFC 100%)",
    items: [],
  },
];

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgCheckCircle2} alt="" width={16} height={16} style={{ flexShrink: 0, marginTop: 2 }} />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
    </div>
  );
}

export default function RoboticsOutcomesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      style={{
        position: "relative",
        background: "#1E2E48",
        overflow: "hidden",
      }}
    >
      {/* Orange glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: "rgba(252,90,21,0.1)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />
      {/* Orange glow bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: "rgba(252,90,21,0.1)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />

      <Container className="relative py-20">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            alignItems: "flex-start",
            maxWidth: 1216,
            margin: "0 auto",
          }}
        >
          {/* Left column */}
          <FadeUp trigger="scroll" delay={0}>
            <div
              style={{
                flex: "1 0 0",
                minWidth: 300,
                maxWidth: 389,
                display: "flex",
                flexDirection: "column",
                gap: 32,
                alignItems: "flex-start",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                {/* Chip */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "rgba(251,44,54,0.1)",
                    border: "1px solid rgba(251,44,54,0.2)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Stat icon */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 10L5 7L7.5 9.5L11 5" stroke="#FFA2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 5H11V7" stroke="#FFA2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: font, fontSize: 12, color: "#FFA2A2", whiteSpace: "nowrap" }}>
                    Outcomes
                  </span>
                </div>

                {/* Heading */}
                <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                  {"What Robotics "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #ff8904 0%, #ff6467 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Achieves
                  </span>
                </h2>

                {/* Body */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                  Structured deployment unlocks measurable operational improvements — from day one through full-scale rollout.
                </p>
              </div>

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  height: 260,
                  width: "100%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={imgGe}  aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 16, display: "block" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src={imgGe1} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 16, display: "block" }} />
              </div>
            </div>
          </FadeUp>

          {/* Right column — accordion */}
          <div style={{ flex: "1 0 0", minWidth: 300, display: "flex", flexDirection: "column", gap: 12 }}>
            {ACCORDION_ITEMS.map(({ label, iconImg, iconGradient, items }, i) => (
              <FadeUp key={label} trigger="scroll" delay={i * 0.07}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      padding: 20,
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {/* Icon square */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundImage: iconGradient,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: open === i ? 1 : 0.6,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={iconImg} alt="" width={18} height={18} style={{ display: "block" }} />
                    </div>
                    <span style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                      {label}
                    </span>
                    {/* Chevron */}
                    <div style={{ width: 24, height: 24, flexShrink: 0, transform: open === i ? "rotate(90deg)" : "rotate(-90deg)", transition: "transform 0.2s" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={open === i ? imgChevronRight : imgChevronRight1} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
                    </div>
                  </button>

                  {/* Expanded content */}
                  {open === i && items.length > 0 && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {items.map((text) => (
                        <CheckItem key={text} text={text} />
                      ))}
                    </div>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
