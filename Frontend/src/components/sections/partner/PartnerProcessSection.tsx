"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Layers/stack icon used in the chip (matches Figma) */
function LayersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1L13 4.5L7 8L1 4.5L7 1Z" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 7L7 10.5L13 7" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 9.5L7 13L13 9.5" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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

// 6 unique step icons matching Figma
const STEP_ICONS = [
  // 1. Assess — target/crosshair
  <svg key="1" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.33" stroke="#fff" strokeWidth="1.67"/><circle cx="10" cy="10" r="5" stroke="#fff" strokeWidth="1.67"/><circle cx="10" cy="10" r="1.67" stroke="#fff" strokeWidth="1.67"/></svg>,
  // 2. Roadmap — map
  <svg key="2" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.5 2.7v12.5M12.5 4.8v12.5" stroke="#fff" strokeWidth="1.67" strokeLinecap="round"/><path d="M2.96 4.77l3.79-1.9a3.17 3.17 0 011.49 0l3.51 1.76a3.17 3.17 0 001.49 0l3.04-1.53a.83.83 0 011.22.74v10.64a.83.83 0 01-.46.74l-3.79 1.9a3.17 3.17 0 01-1.49 0l-3.51-1.76a3.17 3.17 0 00-1.49 0l-3.05 1.53a.83.83 0 01-1.21-.74V5.52c0-.15.04-.31.12-.44a.83.83 0 01.34-.27z" stroke="#fff" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // 3. PoC — lightning bolt
  <svg key="3" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.67 12l-3.34-2 10-8.33-2.5 7.5h5.83L6.67 18.33l2.5-6.33H6.67z" stroke="#fff" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // 4. MVP — code brackets
  <svg key="4" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15 13.33L18.33 10 15 6.67M5 6.67L1.67 10 5 13.33M12.08 3.33L7.92 16.67" stroke="#fff" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // 5. Production — layers/stack
  <svg key="5" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.83 5.91l5.84 3.91a3.17 3.17 0 001.66 0l5.84-3.91a.83.83 0 000-1.42L11.33.58a3.17 3.17 0 00-1.66 0L3.83 4.49a.83.83 0 000 1.42z" stroke="#fff" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.83 10l5.84 3.91a3.17 3.17 0 001.66 0L17.17 10M3.83 15l5.84 3.91a3.17 3.17 0 001.66 0L17.17 15" stroke="#fff" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // 6. Scale — globe
  <svg key="6" width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" stroke="#fff" strokeWidth="1.67"/><path d="M10 0C7.43 2.7 6 6.28 6 10s1.43 7.3 4 10c2.57-2.7 4-6.28 4-10S12.57 2.7 10 0z" stroke="#fff" strokeWidth="1.67"/><path d="M0 10h20" stroke="#fff" strokeWidth="1.67"/></svg>,
];

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
  const bgImage = wpImageUrl((content?.background_image as string) || (content?.section_background_image as string) || "");
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
        {/* No overlay — show background image clearly */}
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
              <LayersIcon />
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
              {/* Icon square only — no connector lines */}
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div
                  style={{
                    width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                    backgroundImage: ROYAL_SHINE,
                    boxShadow: "0px 0px 24px 0px rgba(59,130,246,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {STEP_ICONS[i] || <StepIcon />}
                </div>
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
