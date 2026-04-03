"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5"/>
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

const CHECK_ITEMS = [
  "Choose high-impact use cases",
  "Define measurable outcomes",
  "Design integration and governance",
  "Deliver in phases from PoC to production",
  "Operationalize monitoring and continuous improvement",
];

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <CheckCircleIcon />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
    </div>
  );
}

export default function PartnerMeaningSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "What this means";
  const headingPrefix = (content?.headingPrefix as string) ?? "What ";
  const headingHighlight = (content?.headingHighlight as string) ?? "\u201cAI Solution Partner\u201d";
  const headingSuffix = (content?.headingSuffix as string) ?? " means";
  const description = (content?.description as string) ??
    "AI Solution Partner is designed for organizations that want AI to ship and stick.";
  const leadIn = (content?.leadIn as string) ?? "We don\u2019t stop at strategy. We help you:";
  const checkItems = (content?.checkItems as string[]) ?? CHECK_ITEMS;
  const quote = (content?.quote as string) ??
    "\u201cThis is how AI becomes part of your operating model \u2014 not a one-time experiment.\u201d";
  const containerImage = wpImageUrl((content?.container_image as string) || "");
  const bgColor = (content?.background_color as string) ?? "#102050";
  return (
    <section
      style={{
        position: "relative",
        background: bgColor,
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
              {containerImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={containerImage}
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
                  {chipLabel}
                </span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                {headingPrefix}
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
                {headingSuffix}
              </h2>

              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>
                {description}
              </p>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            {/* Divider + lead-in */}
            <div style={{ borderTop: "1px solid #4A6080", paddingTop: 20 }}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5, margin: 0 }}>
                {leadIn}
              </p>
            </div>
          </FadeUp>

          {/* Check items */}
          <FadeUp trigger="scroll" delay={0.14}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {checkItems.map((text) => (
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
                {quote}
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
