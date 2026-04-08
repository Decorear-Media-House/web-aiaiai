"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5"/>
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Generic icon for accordion items — simple shape on gradient background */
function AccordionIcon({ gradient }: { gradient: string }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundImage: gradient,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2v14M2 9h14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

const ACCORDION_ITEMS = [
  {
    label: "Labor efficiency & cost reduction",
    iconGradient: "linear-gradient(135deg, #00BC7D 0%, #0092B8 100%)",
    items: [
      "Automate repetitive tasks to improve throughput",
      "Reduce operational load for routine work",
      "Focus people on exceptions and higher-value tasks",
    ],
  },
  {
    label: "Operational consistency",
    iconGradient: "linear-gradient(135deg, #2B7FFF 0%, #00B8DB 100%)",
    items: [
      "SOP-driven routines improve repeatability",
      "Reduce variance across shifts/sites",
    ],
  },
  {
    label: "Safety & governance",
    iconGradient: "linear-gradient(135deg, #00B8DB 0%, #155DFC 100%)",
    items: [
      "Training and readiness planning",
      "Escalation paths and service readiness",
      "Boundaries and fallback procedures",
    ],
  },
  {
    label: "Scalability",
    iconGradient: "linear-gradient(135deg, #8E51FF 0%, #155DFC 100%)",
    items: [
      "Rollout checklists and readiness criteria",
      "Monitoring and operational management approach",
      "Scale playbooks for multi-site expansion",
    ],
  },
];

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <CheckCircleIcon />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
    </div>
  );
}

interface OutcomesContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  accordion_items?: typeof ACCORDION_ITEMS;
  background_color?: string;
  outcomes_image?: string;
}

export default function RoboticsOutcomesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as OutcomesContent;
  const chip = c.chip ?? "Outcomes";
  const sectionHeading = c.heading ?? "What Robotics ";
  const headingHighlight = c.heading_highlight ?? "Achieves";
  const sectionDescription = c.description ?? "Structured deployment unlocks measurable operational improvements — from day one through full-scale rollout.";
  const rawAccordion = c.accordion_items ?? ACCORDION_ITEMS;
  const accordionItems: typeof ACCORDION_ITEMS = Array.isArray(rawAccordion) ? rawAccordion : Object.values(rawAccordion);
  const outcomesImage = c.outcomes_image ? wpImageUrl(c.outcomes_image) : "";
  const [open, setOpen] = useState(0);

  return (
    <section
      style={{
        position: "relative",
        background: c.background_color ?? "#1E2E48",
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

      <Container className="relative py-20 max-sm:py-10">
        <div
          className="max-sm:!flex-col max-sm:!gap-8"
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
              className="max-sm:!min-w-0 max-sm:!max-w-full"
              style={{
                flex: "1 0 0",
                minWidth: 300,
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
                    {chip}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                  {sectionHeading}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #ff8904 0%, #ff6467 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {headingHighlight}
                  </span>
                </h2>

                {/* Body */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                  {sectionDescription}
                </p>
              </div>

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  height: 260,
                  width: "100%",
                  maxHeight: "100%",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: outcomesImage ? undefined : "linear-gradient(135deg, #0A1430 0%, #1A2A50 50%, #0E1E3E 100%)",
                }}
              >
                {outcomesImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={outcomesImage} alt="Robotics outcomes" className="absolute inset-0 size-full object-cover" />
                )}
              </div>
            </div>
          </FadeUp>

          {/* Right column — accordion */}
          <div className="max-sm:!min-w-0" style={{ flex: "1 0 0", minWidth: 300, display: "flex", flexDirection: "column", gap: 12 }}>
            {accordionItems.map(({ label, iconGradient, items }, i) => (
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
                    <div style={{ opacity: open === i ? 1 : 0.6, transition: "opacity 0.2s" }}>
                      <AccordionIcon gradient={iconGradient} />
                    </div>
                    <span style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                      {label}
                    </span>
                    {/* Chevron */}
                    <div style={{ width: 24, height: 24, flexShrink: 0, transform: open === i ? "rotate(90deg)" : "rotate(-90deg)", transition: "transform 0.2s", color: "#fff" }}>
                      <ChevronRightIcon />
                    </div>
                  </button>

                  {/* Expanded content */}
                  {open === i && items && (Array.isArray(items) ? items : Object.values(items)).length > 0 && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {(Array.isArray(items) ? items : Object.values(items as Record<string, string>)).map((text, j) => (
                        <CheckItem key={j} text={text} />
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
