"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/robotics/
const imgIcon  = "https://www.figma.com/api/mcp/asset/04e9acd9-7a30-4a26-9fe0-d39991423169";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/3f374987-ba37-4476-8578-2ac3bf41d607";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/0a6fb245-d701-4fc4-9db2-0c5e89d2c384";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/0b8adf96-8012-48af-89fe-5a8ea8ecb27f";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/676b67d9-9ec2-4757-bcd8-5fb9705bef3d";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/a9f4f07c-a88f-4451-8da6-00c0c0af0e90";

const DELIVERABLES = [
  { num: "01", icon: imgIcon,  title: "Task definition and environment constraints" },
  { num: "02", icon: imgIcon1, title: "Pilot readiness plan with KPIs" },
  { num: "03", icon: imgIcon2, title: "SOPs and training approach" },
  { num: "04", icon: imgIcon3, title: "Maintenance/service readiness and escalation" },
  { num: "05", icon: imgIcon4, title: "Workflow integration into reporting and operations" },
  { num: "06", icon: imgIcon5, title: "Rollout governance and scale planning" },
];

export default function RoboticsDeliverablesSection() {
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
      {/* Blue glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 512,
          height: 512,
          borderRadius: 9999,
          background: "rgba(43,127,255,0.05)",
          filter: "blur(82px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1216,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {/* Left — header */}
        <FadeUp trigger="scroll" delay={0}>
          <div
            style={{
              flex: "1 0 0",
              minWidth: 300,
              maxWidth: 389,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
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
              {/* Lightbulb icon */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1.5A3.5 3.5 0 0 0 4.5 8v.5h5V8A3.5 3.5 0 0 0 7 1.5Z" stroke="#4A99F5" strokeWidth="1.2" />
                <path d="M5 9.5h4M5.5 11h3" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                Deliverables
              </span>
            </div>

            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
              {"What We "}
              <span
                style={{
                  backgroundImage: ROYAL_SHINE,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Deliver
              </span>
            </h2>

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
              Six structured work products that take you from concept to operating robotics at scale.
            </p>
          </div>
        </FadeUp>

        {/* Right — 6 cards */}
        <div
          style={{
            flex: "1 0 0",
            minWidth: 300,
            maxWidth: 787,
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          {DELIVERABLES.map(({ num, icon, title }, i) => (
            <FadeUp key={num} trigger="scroll" delay={i * 0.07}>
              <div
                style={{
                  flex: "1 0 0",
                  minWidth: 200,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                {/* Icon row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", height: 40 }}>
                  {/* Icon square */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundImage: ROYAL_SHINE,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" width={18} height={18} style={{ display: "block" }} />
                  </div>
                  {/* Number */}
                  <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: "#4A6080", whiteSpace: "nowrap" }}>
                    {num}
                  </span>
                </div>
                {/* Title */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, margin: 0 }}>
                  {title}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
