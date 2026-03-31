"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local asset in /public/images/partner/
const imgContainer    = "https://www.figma.com/api/mcp/asset/0f79cad4-b6fb-4e58-978c-8cff1f8da672";
const imgCheckCircle2 = "https://www.figma.com/api/mcp/asset/f75c8fa9-26a2-423b-83c5-818b5b3d6004";

// Sparkle icon vectors
const imgVector  = "https://www.figma.com/api/mcp/asset/953157ff-b6ec-4691-a7ff-3497b348bccc";
const imgVector1 = "https://www.figma.com/api/mcp/asset/4f6d76f9-6eeb-4450-aa44-63867db4aeac";
const imgVector2 = "https://www.figma.com/api/mcp/asset/ab73b2ca-7301-4b25-9ff6-93a641af4c2d";
const imgVector3 = "https://www.figma.com/api/mcp/asset/590086a9-c07a-4d7a-b407-0b3f668fd4c4";
const imgVector4 = "https://www.figma.com/api/mcp/asset/424e0d4d-3ac8-4ecf-96ba-b248ef8ba2b7";

const CHECK_ITEMS = [
  "Choose high-impact use cases",
  "Define measurable outcomes",
  "Design integration and governance",
  "Deliver in phases from PoC to production",
  "Operationalize monitoring and continuous improvement",
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

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgCheckCircle2} alt="" width={16} height={16} style={{ flexShrink: 0, marginTop: 3 }} />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
    </div>
  );
}

export default function PartnerMeaningSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#102050",
        borderTop: "2px solid rgba(0,0,0,0)",
        overflow: "hidden",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
      }}
    >
      {/* Blue glow bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 512,
          height: 512,
          borderRadius: 9999,
          background: "rgba(36,123,255,0.05)",
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
          gap: "40px 60px",
          alignItems: "flex-start",
        }}
      >
        {/* Left — photo card */}
        <div style={{ flex: "1 0 0", minWidth: 312, position: "relative" }}>
          <FadeUp trigger="scroll" delay={0}>
            <div
              style={{
                height: 550,
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgContainer}
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
        </div>

        {/* Right — content */}
        <div style={{ flex: "1 0 0", minWidth: 312, display: "flex", flexDirection: "column", gap: 32 }}>
          <FadeUp trigger="scroll" delay={0.06}>
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                <SparkleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                  What this means
                </span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                {"What "}
                <span
                  style={{
                    backgroundImage: ROYAL_SHINE,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  &ldquo;AI Solution Partner&rdquo;
                </span>
                {" means"}
              </h2>

              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>
                AI Solution Partner is designed for organizations that want AI to ship and stick.
              </p>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            {/* Divider + lead-in */}
            <div style={{ borderTop: "1px solid #4A6080", paddingTop: 20 }}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5, margin: 0 }}>
                We don&rsquo;t stop at strategy. We help you:
              </p>
            </div>
          </FadeUp>

          {/* Check items */}
          <FadeUp trigger="scroll" delay={0.14}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CHECK_ITEMS.map((text) => (
                <CheckItem key={text} text={text} />
              ))}
            </div>
          </FadeUp>

          {/* Quote card */}
          <FadeUp trigger="scroll" delay={0.18}>
            <div
              style={{
                padding: 24,
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>
                &ldquo;This is how AI becomes part of your operating model — not a one-time experiment.&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
