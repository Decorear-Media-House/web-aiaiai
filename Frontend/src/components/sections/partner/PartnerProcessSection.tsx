"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** 3-bar list icon used in the chip */
function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 3h10M2 7h10M2 11h10" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/** Generic step icon — white shape on gradient background */
function StepIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="#fff" strokeWidth="1.3"/>
      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Horizontal connector line flanking the icon */
function ConnectorLine({ dashed }: { dashed?: boolean }) {
  return (
    <div style={{ flex: "1 0 0", height: 0, minWidth: 1, position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          height: 1,
          borderTop: dashed
            ? "2px dashed rgba(43,127,255,0.3)"
            : "2px solid rgba(43,127,255,0.4)",
        }}
      />
    </div>
  );
}

const STEPS = [
  {
    title: "Assess & Discover",
    body: "We clarify: the business objective, process bottlenecks, data landscape, constraints, risk posture, and success criteria.",
    dashed: false,
  },
  {
    title: "Roadmap",
    body: "We prioritize: use cases, delivery phases, dependencies, integration plan, and governance model \u2014 so AI has an operational home.",
    dashed: true,
  },
  {
    title: "PoC",
    body: "We validate feasibility quickly: prove that the idea works with real constraints without overbuilding.",
    dashed: true,
  },
  {
    title: "MVP",
    body: "We build the first operational version: integrated into workflows with role-based access and practical UI/alerts.",
    dashed: true,
  },
  {
    title: "Production Deployment",
    body: "We deploy with monitoring, change control, training, and rollout plan \u2014 so users adopt it and operations can maintain it.",
    dashed: true,
  },
  {
    title: "Scale",
    body: "We expand coverage: more use cases, more sites, higher performance, and improved governance based on real usage.",
    dashed: false,
  },
];

export default function PartnerProcessSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "Process";
  const heading = (content?.heading as string) ?? "How We Work";
  const description = (content?.description as string) ??
    "Six structured phases from discovery to scale \u2014 with delivery and governance built in from the start.";
  const bgImage = wpImageUrl((content?.section_background_image as string) || "");
  const bgColor = (content?.background_color as string) ?? "#081028";
  return (
    <section
      style={{
        position: "relative",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
        background: bgColor,
      }}
    >
      {/* Full-bleed background image + dark gradient overlay */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            src={bgImage}
            style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #0A1430 0%, #102050 50%, #081028 100%)",
            }}
          />
        )}
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
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>{chipLabel}</span>
            </div>
            {/* Heading */}
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, margin: 0, textAlign: "center", color: "#fff" }}>
              {heading}
            </h2>
            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
              {description}
            </p>
          </div>
        </FadeUp>

        {/* 6 step columns */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", alignItems: "flex-start", width: "100%" }}>
          {STEPS.map(({ title, body, dashed }, i) => (
            <div
              key={title}
              style={{ flex: "1 1 0%", minWidth: 300, display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}
            >
              {/* Icon row: line — icon square — line */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", width: "100%", flexShrink: 0 }}>
                <ConnectorLine dashed={dashed} />
                {/* Royal Shine icon square */}
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    backgroundImage: ROYAL_SHINE,
                    boxShadow: "0px 0px 24px 0px rgba(59,130,246,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <StepIcon />
                </div>
                <ConnectorLine dashed={dashed} />
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
