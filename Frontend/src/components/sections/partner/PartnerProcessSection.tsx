"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgSection = "https://www.figma.com/api/mcp/asset/c044f736-55a6-4e19-b2a6-db914aea4cc3";
const imgVector  = "https://www.figma.com/api/mcp/asset/68285692-a46a-44c2-8d81-9970abbd9f8d";
const imgVector1 = "https://www.figma.com/api/mcp/asset/8f399adb-7335-407e-8fdf-f443cb1c3a79";
const imgLine2   = "https://www.figma.com/api/mcp/asset/36273fa2-cb86-42ac-a09e-6b6fd15af5eb"; // solid line (outer steps)
const imgLine3   = "https://www.figma.com/api/mcp/asset/78a314f4-f834-4b77-9c66-ba401ec2dad5"; // dashed line (inner steps)
const imgIcon    = "https://www.figma.com/api/mcp/asset/acf89fad-2a66-45aa-ba81-675a999755c7";
const imgIcon1   = "https://www.figma.com/api/mcp/asset/8b6b9f7e-f97d-4c36-a9c8-655a7d92989a";
const imgIcon2   = "https://www.figma.com/api/mcp/asset/f3e6e025-295b-4d04-9db4-d2c60b07dac3";
const imgIcon3   = "https://www.figma.com/api/mcp/asset/4338baa8-546d-40c5-ba9b-91e308234e32";
const imgIcon4   = "https://www.figma.com/api/mcp/asset/fbc267eb-bd2e-4499-b29d-559c99358b5b";
const imgIcon5   = "https://www.figma.com/api/mcp/asset/4f432859-1d12-4dcc-8476-0740cac34c0c";

const STEPS = [
  {
    title: "Assess & Discover",
    body: "We clarify: the business objective, process bottlenecks, data landscape, constraints, risk posture, and success criteria.",
    icon: imgIcon,
    line: imgLine2, // outer step — solid line
  },
  {
    title: "Roadmap",
    body: "We prioritize: use cases, delivery phases, dependencies, integration plan, and governance model — so AI has an operational home.",
    icon: imgIcon1,
    line: imgLine3,
  },
  {
    title: "PoC",
    body: "We validate feasibility quickly: prove that the idea works with real constraints without overbuilding.",
    icon: imgIcon2,
    line: imgLine3,
  },
  {
    title: "MVP",
    body: "We build the first operational version: integrated into workflows with role-based access and practical UI/alerts.",
    icon: imgIcon3,
    line: imgLine3,
  },
  {
    title: "Production Deployment",
    body: "We deploy with monitoring, change control, training, and rollout plan — so users adopt it and operations can maintain it.",
    icon: imgIcon4,
    line: imgLine3,
  },
  {
    title: "Scale",
    body: "We expand coverage: more use cases, more sites, higher performance, and improved governance based on real usage.",
    icon: imgIcon5,
    line: imgLine2, // outer step — solid line
  },
];

/** 3-bar list icon used in the chip */
function ListIcon() {
  return (
    <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ position: "absolute", bottom: "50%", left: "8.35%", right: "8.26%", top: "8.33%" }}>
        <div style={{ position: "absolute", inset: "-10% -5%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
        </div>
      </div>
      {/* Middle bar */}
      <div style={{ position: "absolute", bottom: "29.17%", left: "8.33%", right: "8.33%", top: "50%" }}>
        <div style={{ position: "absolute", inset: "-20.01% -5%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
      {/* Bottom bar */}
      <div style={{ position: "absolute", top: "70.83%", right: "8.33%", bottom: "8.34%", left: "8.33%" }}>
        <div style={{ position: "absolute", inset: "-20.01% -5%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
    </div>
  );
}

/** Horizontal connector line flanking the icon */
function ConnectorLine({ src }: { src: string }) {
  return (
    <div style={{ flex: "1 0 0", height: 0, minWidth: 1, position: "relative" }}>
      <div style={{ position: "absolute", top: -1, right: 0, bottom: 0, left: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={src} />
      </div>
    </div>
  );
}

export default function PartnerProcessSection() {
  return (
    <section
      style={{
        position: "relative",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
      }}
    >
      {/* Full-bleed background image + dark gradient overlay */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={imgSection}
          style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,16,40,0.3) 0%, #081028 100%)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40, alignItems: "center", width: "100%" }}>

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
              <ListIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>Process</span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, margin: 0, textAlign: "center", color: "#fff" }}>
              How We Work
            </h2>
            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              Six structured phases from discovery to scale — with delivery and governance built in from the start.
            </p>
          </div>
        </FadeUp>

        {/* 6 step columns */}
        {/* NOTE: backdropFilter is on plain divs (not inside FadeUp opacity wrappers) to avoid compositing layer isolation */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
          {STEPS.map(({ title, body, icon, line }, i) => (
            <div
              key={title}
              style={{ flex: "1 1 0%", minWidth: 300, display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}
            >
              {/* Icon row: line — icon square — line */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", width: "100%", flexShrink: 0 }}>
                <ConnectorLine src={line} />
                {/* Royal Shine icon square */}
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    backgroundImage: ROYAL_SHINE,
                    boxShadow: "0px 0px 24px 0px rgba(59,130,246,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" src={icon} style={{ width: 24, height: 24, display: "block" }} />
                </div>
                <ConnectorLine src={line} />
              </div>

              {/* Glass card — plain div so backdropFilter works */}
              <div
                style={{
                  width: "100%",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                  overflow: "clip",
                  flexShrink: 0,
                }}
              >
                <FadeUp trigger="scroll" delay={i * 0.06}>
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                    <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", margin: 0, textAlign: "center", width: "100%" }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0, textAlign: "center", width: "100%" }}>
                      {body}
                    </p>
                  </div>
                </FadeUp>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
