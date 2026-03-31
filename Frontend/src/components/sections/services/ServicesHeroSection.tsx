"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/services-hero-bg.jpg
const BG_IMAGE = "https://www.figma.com/api/mcp/asset/ff37b26e-34f2-4556-9757-f27c80fa75cc";

const ROYAL_SHINE = "linear-gradient(158deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

export default function ServicesHeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Background image + gradient overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={BG_IMAGE} alt="" className="absolute inset-0 size-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(16,32,80,0.85), rgba(7,14,36,0.85))" }}
        />
      </div>

      <Container className="relative flex items-end" style={{ minHeight: 394 }}>
        <div className="flex w-full flex-wrap items-end gap-6 pb-20 pt-[140px] max-lg:flex-col max-lg:items-start">

          {/* Left column — label + heading */}
          <div className="flex flex-1 min-w-[300px] flex-col gap-6">
            <FadeUp trigger="mount" delay={0}>
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <SparkleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>AI Solution Partner</span>
              </div>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.1}>
              <h1
                style={{
                  fontFamily: font,
                  fontSize: "clamp(36px, 4vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.5%, #8B95C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Services built around<br />measurable outcomes.
              </h1>
            </FadeUp>
          </div>

          {/* Right column — description + CTAs */}
          <div className="flex flex-1 min-w-[300px] flex-col gap-8 justify-end">
            <FadeUp trigger="mount" delay={0.2}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.75 }}>
                {`We don't start with "AI features." We start with outcomes you need. Then define the right delivery pathway and operational model — roadmap, architecture, and rollout plan — so AI can be deployed, governed, and scaled.`}
              </p>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.3}>
              <div className="flex flex-wrap gap-4 items-center">
                {/* Primary button */}
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    backgroundImage: ROYAL_SHINE,
                    border: "1px solid #4A99F5",
                    boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                  }}
                >
                  About Us
                </a>
                {/* Ghost button */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  Contact Us
                </a>
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
