"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(163deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgVector        = "https://www.figma.com/api/mcp/asset/a7b0de5e-eb9a-446b-ba53-defa1a502c49";  // chevron icon
const imgVector1       = "https://www.figma.com/api/mcp/asset/61b2c103-dc8b-44f2-97b7-4f5c18c90976";  // bulb top
const imgVector2       = "https://www.figma.com/api/mcp/asset/0e9d2f96-703a-41f9-8e24-7ee6e5730a76";  // bulb base
const imgVector3       = "https://www.figma.com/api/mcp/asset/e31717fa-24e0-42fd-b131-f3ac29d06e39";  // bulb dot
const imgChevronRight  = "https://www.figma.com/api/mcp/asset/ef5a12c3-cb20-4f0e-8f46-19cfca10f285";  // open state chevron
const imgChevronRight1 = "https://www.figma.com/api/mcp/asset/b3582b7f-53a2-41b8-a12c-b83f75129919"; // closed state chevron

const FAQS = [
  {
    q: "Do you only work with large enterprises?",
    a: "No. We support organizations of different sizes as long as there's a clear outcome and owner.",
  },
  {
    q: "We don't have clean data. Can we start?",
    a: "Yes. We assess your data landscape as part of discovery. Data quality is a constraint we plan around, not a prerequisite.",
  },
  {
    q: "Can you guarantee ROI?",
    a: "We don't guarantee specific figures, but every engagement is anchored to measurable outcomes. We define success criteria upfront and track them throughout.",
  },
  {
    q: "Will you replace our internal team?",
    a: "No. We work alongside your team. Depending on the engagement model, we govern, co-build, or hand over — always with your team's long-term ownership in mind.",
  },
];

/** Lightbulb / idea icon used in the chip */
function IdeaIcon() {
  return (
    <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
      {/* Bulb body */}
      <div style={{ position: "absolute", bottom: "41.67%", left: "25%", right: "25%", top: "8.33%" }}>
        <div style={{ position: "absolute", inset: "-8.33%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector1} />
        </div>
      </div>
      {/* Bulb base */}
      <div style={{ position: "absolute", bottom: "25%", left: "37.5%", right: "37.5%", top: "75%" }}>
        <div style={{ position: "absolute", top: "-0.58px", right: "-16.67%", bottom: "-0.58px", left: "-16.67%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector2} />
        </div>
      </div>
      {/* Bulb bottom dot */}
      <div style={{ position: "absolute", top: "91.67%", right: "41.67%", bottom: "8.33%", left: "41.67%" }}>
        <div style={{ position: "absolute", top: "-0.58px", right: "-25%", bottom: "-0.58px", left: "-25%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector3} />
        </div>
      </div>
    </div>
  );
}

export default function PartnerFAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

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
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>FAQs</span>
            </div>

            {/* Heading — 48px display */}
            <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, margin: 0, color: "#fff" }}>
              {"Frequently asked "}
              <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                questions
              </span>
            </h2>

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
              We have compiled frequently asked questions about how AI solutions are implemented in real operations to help you better understand the process and how to work effectively with our team.
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
              Still have questions? Contact us
              {/* Chevron right */}
              <div style={{ position: "relative", width: 24, height: 24, flexShrink: 0, overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "25%", bottom: "25%", left: "33.33%", right: "35.83%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
                </div>
              </div>
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
                    {/* Chevron: open = rotate 90° (↓), closed = rotate -90° (↑) */}
                    <div
                      style={{
                        width: 24, height: 24, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)",
                        transition: "transform 0.25s ease",
                      }}
                    >
                      <div style={{ position: "relative", width: 24, height: 24 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          src={isOpen ? imgChevronRight : imgChevronRight1}
                          style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }}
                        />
                      </div>
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
