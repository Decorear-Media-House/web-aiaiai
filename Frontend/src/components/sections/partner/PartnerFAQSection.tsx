"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(163deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Lightbulb / idea icon used in the chip */
function IdeaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1.5A3.5 3.5 0 0 0 4.5 8v.5h5V8A3.5 3.5 0 0 0 7 1.5Z" stroke="#4A99F5" strokeWidth="1.2" />
      <path d="M5 9.5h4M5.5 11h3" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const FAQS = [
  {
    q: "Do you only work with large enterprises?",
    a: "No. We support organizations of different sizes as long as there\u2019s a clear outcome and owner.",
  },
  {
    q: "We don\u2019t have clean data. Can we start?",
    a: "Yes. We assess your data landscape as part of discovery. Data quality is a constraint we plan around, not a prerequisite.",
  },
  {
    q: "Can you guarantee ROI?",
    a: "We don\u2019t guarantee specific figures, but every engagement is anchored to measurable outcomes. We define success criteria upfront and track them throughout.",
  },
  {
    q: "Will you replace our internal team?",
    a: "No. We work alongside your team. Depending on the engagement model, we govern, co-build, or hand over \u2014 always with your team\u2019s long-term ownership in mind.",
  },
];

export default function PartnerFAQSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "FAQs";
  const heading = (content?.heading as string) ?? "Frequently asked ";
  const headingHighlight = (content?.headingHighlight as string) ?? "questions";
  const description = (content?.description as string) ??
    "We have compiled frequently asked questions about how AI solutions are implemented in real operations to help you better understand the process and how to work effectively with our team.";
  const ctaText = (content?.ctaText as string) ?? "Still have questions? Contact us";
  const bgColor = (content?.background_color as string) ?? "#070E24";
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      style={{
        position: "relative",
        background: bgColor,
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
          position: "absolute", top: 0, left: 0,
          width: 512, height: 512, borderRadius: 9999,
          background: "rgba(43,127,255,0.05)", filter: "blur(82px)", pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1216, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "flex-start" }}>

        {/* LEFT — label + heading + body + CTA */}
        <FadeUp trigger="scroll" delay={0}>
          <div style={{ display: "flex", flexDirection: "column", gap: 25, alignItems: "flex-start", width: 389, maxWidth: 389, minWidth: 300 }}>

            {/* Chip */}
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 16px", borderRadius: 8,
                background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <IdeaIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>{chipLabel}</span>
            </div>

            {/* Heading — 48px display */}
            <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, margin: 0, color: "#fff" }}>
              {heading}
              <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {headingHighlight}
              </span>
            </h2>

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
              {description}
            </p>

            {/* CTA button */}
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                padding: "12px 24px", borderRadius: 8,
                backgroundImage: "linear-gradient(171deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                border: "1px solid #4A99F5",
                boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                fontFamily: font, fontSize: 16, color: "#fff", textDecoration: "none", whiteSpace: "nowrap",
              }}
            >
              {ctaText}
              <ChevronRightIcon />
            </a>

          </div>
        </FadeUp>

        {/* RIGHT — accordion list */}
        <FadeUp trigger="scroll" delay={0.08} className="flex-[1_0_0] min-w-[300px]">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map(({ q, a }, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={q}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    style={{
                      display: "flex", gap: 16, alignItems: "center",
                      padding: 20, width: "100%",
                      background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    }}
                  >
                    <p style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, margin: 0 }}>
                      {q}
                    </p>
                    {/* Chevron: open = rotate 90 (down), closed = rotate -90 (up) */}
                    <div
                      style={{
                        width: 24, height: 24, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
                        transition: "transform 0.25s ease",
                        color: "#fff",
                      }}
                    >
                      <ChevronRightIcon />
                    </div>
                  </button>

                  {/* Answer — shown when open */}
                  {isOpen && (
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        padding: 20,
                      }}
                    >
                      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
