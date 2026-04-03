"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

interface CTAContent {
  heading?: string;
  heading_highlight?: string;
  description?: string;
  chips?: string[];
  cta_primary?: string;
  cta_secondary?: string;
}

const DEFAULT_CHIPS = ["Target environment", "Robot model", "Task description"];

export default function RoboticsCTASection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as CTAContent;
  const heading = c.heading ?? "Tell us the environment and ";
  const headingHighlight = c.heading_highlight ?? "target tasks.";
  const description = c.description ?? "We\u2019ll propose a pilot approach.";
  const chips = c.chips ?? DEFAULT_CHIPS;
  const ctaPrimary = c.cta_primary ?? "Contact Us";
  const ctaSecondary = c.cta_secondary ?? "All Services";
  return (
    <section className="relative" style={{ background: "#070E24" }}>
      {/* 40px sides → 1360px card at 1440px viewport */}
      <div style={{ maxWidth: 1440, margin: "0 auto", paddingLeft: 40, paddingRight: 40, paddingBottom: 40 }}>
        <FadeUp trigger="scroll" delay={0}>
          {/* Bordered card with video background */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {/* Video background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 size-full object-cover pointer-events-none"
              aria-hidden="true"
            >
              <source src="/videos/CTA-Loop.mp4" type="video/mp4" />
            </video>

            {/* Content */}
            <div className="relative flex flex-wrap gap-y-10 items-center justify-between px-20 py-10 w-full max-w-[1200px] mx-auto">

              {/* Left — headline + chips */}
              <div className="flex-1 min-w-[300px] max-w-[672px] flex flex-col gap-5">
                <div>
                  <p style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, color: "#fff" }}>
                    {heading}
                    <span style={{ color: "#00BAF2" }}>{headingHighlight}</span>
                  </p>
                </div>
                <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                  {description}
                </p>
                {/* Glass chips */}
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <div
                      key={chip}
                      className="inline-flex items-center rounded-lg px-4 py-2 shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                      }}
                    >
                      <span style={{ fontFamily: font, fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>{chip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — CTAs */}
              <div className="flex flex-col gap-4 items-end justify-center shrink-0">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition-opacity hover:opacity-90 whitespace-nowrap"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    backgroundImage: ROYAL_SHINE,
                    border: "1px solid #4A99F5",
                    boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                    textDecoration: "none",
                  }}
                >
                  {ctaPrimary}
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition-opacity hover:opacity-80 whitespace-nowrap"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    background: "rgba(10,19,47,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    textDecoration: "none",
                  }}
                >
                  {ctaSecondary}
                </a>
              </div>

            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
