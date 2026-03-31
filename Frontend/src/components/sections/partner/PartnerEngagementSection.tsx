"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgGroup   = "https://www.figma.com/api/mcp/asset/b6bf082e-42aa-45db-8a45-0e3d942907f0";
const imgGroup1  = "https://www.figma.com/api/mcp/asset/a67c2ef1-f930-4de6-ab89-0e7286943c00";
const imgVector  = "https://www.figma.com/api/mcp/asset/dc15c176-3180-4264-83eb-4d184ecd2c38"; // chevron
const imgVector1 = "https://www.figma.com/api/mcp/asset/f3306cf1-0b6b-4000-bc14-5096a474aa1c"; // team icon parts
const imgVector2 = "https://www.figma.com/api/mcp/asset/f4a90533-3943-4f98-8632-a4d7c59afa55";
const imgVector3 = "https://www.figma.com/api/mcp/asset/e175ed92-bea0-4a6e-905f-8086309829bd";
const imgVector4 = "https://www.figma.com/api/mcp/asset/9795e159-a5d8-4c2b-80d7-07f7b37aaeca";
const imgIcon    = "https://www.figma.com/api/mcp/asset/f853f3dd-3eb9-4459-b7fb-a9b92958253b"; // blue bullet
const imgIcon1   = "https://www.figma.com/api/mcp/asset/9f0de558-2f47-43b0-b8eb-d5a006a00c31"; // green bullet
const imgIcon2   = "https://www.figma.com/api/mcp/asset/64a8ed1c-46c8-4efa-be41-92c85c01664f"; // orange bullet

const MODELS = [
  {
    label: "Model A",
    labelColor: "#4A99F5",
    title: "Partner-led Governance",
    desc: "You have a team/vendor who builds. We ensure delivery happens correctly.",
    border: "rgba(43,127,255,0.2)",
    glow: "rgba(59,130,246,0.4)",
    bulletIcon: imgIcon,
    items: [
      "Roadmap, scope control, acceptance criteria",
      "Architecture and governance",
      "Rollout and adoption design",
    ],
  },
  {
    label: "Model B",
    labelColor: "#00BC7D",
    title: "Co-build Delivery",
    desc: "You have a team/vendor who builds. We ensure delivery happens correctly.",
    border: "rgba(0,188,125,0.2)",
    glow: "rgba(16,185,129,0.4)",
    bulletIcon: imgIcon1,
    items: [
      "Shared backlog and priorities",
      "Rapid iteration and weekly checkpoints",
      "Production readiness baked into each sprint",
    ],
  },
  {
    label: "Model C",
    labelColor: "#FF8904",
    title: "Build & Handover",
    desc: "We build MVP modules or key components and hand over to your team.",
    border: "rgba(255,105,0,0.2)",
    glow: "rgba(249,115,22,0.4)",
    bulletIcon: imgIcon2,
    items: [
      "Fully working MVP modules or components",
      "Training and operational ownership setup",
    ],
  },
];

function TeamIcon() {
  return (
    <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "62.5%", right: "33.33%", bottom: "12.5%", left: "8.33%" }}>
        <div style={{ position: "absolute", inset: "-16.67% -7.14%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "12.5%", right: "45.83%", bottom: "54.17%", left: "20.83%" }}>
        <div style={{ position: "absolute", inset: "-12.5%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector2} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "63.04%", right: "8.33%", bottom: "12.5%", left: "79.17%" }}>
        <div style={{ position: "absolute", inset: "-17.04% -33.33% -17.04% -33.34%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector3} />
        </div>
      </div>
      <div style={{ position: "absolute", top: "13.04%", right: "20.8%", bottom: "54.67%", left: "66.67%" }}>
        <div style={{ position: "absolute", inset: "-12.91% -33.25%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector4} />
        </div>
      </div>
    </div>
  );
}

export default function PartnerEngagementSection() {
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
      {/* Blue glow center */}
      <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 512, height: 512, borderRadius: 9999, background: "rgba(43,127,255,0.05)", filter: "blur(82px)", pointerEvents: "none" }} />

      {/* Deco bottom-left */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: 0, left: 0, width: 397, height: 413, overflow: "hidden", pointerEvents: "none" }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0 0 -55.69% -53.15%",
            maskImage: `url('${imgGroup}')`,
            maskSize: "397px 413px",
            maskPosition: "211px 0px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgGroup}')`,
            WebkitMaskSize: "397px 413px",
            WebkitMaskPosition: "211px 0px",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={imgGroup1} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", flexDirection: "column", gap: 64, alignItems: "center" }}>

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
              <TeamIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>Engagement models</span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, margin: 0, textAlign: "center", color: "#fff", width: "100%" }}>
              {"How We "}
              <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Engage
              </span>
            </h2>
            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0, width: "100%" }}>
              Three flexible models to match how your organisation prefers to work.
            </p>
          </div>
        </FadeUp>

        {/* 3 model cards */}
        {/* NOTE: backdropFilter must NOT be inside a FadeUp (motion.div with opacity animation).
            Framer-motion's opacity animation promotes the element to a compositing layer,
            which prevents backdrop-filter from sampling content behind it.
            Fix: glass card = plain div (direct flex child), FadeUp lives INSIDE animating content only. */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", width: "100%" }}>
          {MODELS.map(({ label, labelColor, title, desc, border, glow, bulletIcon, items }, i) => (
            // Plain div is the flex item — no opacity animation — backdropFilter works correctly
            <div
              key={label}
              style={{
                flex: "1 1 0%", minWidth: 300,
                display: "flex", flexDirection: "column",
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${border}`,
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                boxShadow: `0px 0px 20px 0px ${glow}`,
                overflow: "clip",
              }}
            >
              {/* FadeUp wraps only the inner content — opacity animation is isolated here */}
              <FadeUp trigger="scroll" delay={i * 0.08}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center", padding: 32 }}>

                  {/* Top section — divider bottom */}
                  <div
                    style={{
                      display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start",
                      width: "100%", paddingBottom: 24,
                      borderBottom: "1px solid #1E2E48",
                    }}
                  >
                    <p style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: labelColor, textAlign: "center", margin: 0, width: "100%" }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: "#fff", textAlign: "center", margin: 0, width: "100%" }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, textAlign: "center", margin: 0, width: "100%" }}>
                      {desc}
                    </p>
                  </div>

                  {/* Bullet items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                    {items.map((text) => (
                      <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ position: "relative", width: 16, height: 16, flexShrink: 0, marginTop: 3 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" src={bulletIcon} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} />
                        </div>
                        <p style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    style={{
                      fontFamily: font, fontSize: 16, color: "#fff", textDecoration: "none",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                      padding: "12px 24px", borderRadius: 8, width: "100%",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Contact Us
                    {/* Chevron right */}
                    <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0, overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: "25%", left: "33.33%", right: "35.83%", bottom: "25%" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
                      </div>
                    </div>
                  </a>

                </div>
              </FadeUp>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
