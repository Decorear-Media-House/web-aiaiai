"use client";

import FadeUp from "@/components/animations/FadeUp";

function SparkleIcon({ color = "#FFA2A2" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill={color} />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/about-mission-bg.jpg
const BG_IMAGE = "https://www.figma.com/api/mcp/asset/03632a0b-893f-41c2-ba4d-db86236097fb";

export default function AboutMissionSection() {
  return (
    <section className="flex min-h-[382px] max-lg:flex-col" style={{ background: "#1A4494" }}>

      {/* Left — photo with gradient overlay */}
      <div className="relative w-1/2 overflow-hidden max-lg:w-full max-lg:min-h-[320px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BG_IMAGE}
          alt="AI partner meeting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to left, #1A4494 0%, rgba(26,68,148,0) 60%)" }}
        />
      </div>

      {/* Right — text content */}
      <div className="flex w-1/2 items-center max-lg:w-full" style={{ background: "#1A4494" }}>
        <div
          className="flex w-full flex-col gap-6 py-20 pl-10 pr-[112px] max-lg:px-8 max-lg:py-14 max-sm:px-4"
          style={{ maxWidth: 720 }}
        >
          <FadeUp trigger="scroll" delay={0}>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
              style={{
                background: "rgba(251,44,54,0.1)",
                border: "1px solid rgba(251,44,54,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <SparkleIcon color="#FFA2A2" />
              <span style={{ fontFamily: font, fontSize: 12, color: "#FFA2A2" }}>Our Mission</span>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            <h2 style={{ fontFamily: font, fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 400, lineHeight: 1.3 }}>
              <span style={{ color: "#fff" }}>Make AI adoption </span>
              <span
                style={{
                  backgroundImage: "linear-gradient(to right, #FF8904, #FF6467)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                practical, outcome-driven,{" "}
              </span>
              <span style={{ color: "#fff" }}>and production-ready.</span>
            </h2>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.2}>
            <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.75 }}>
              We believe AI should work in the real world — not just in demos. Every engagement
              we take on is designed to end with a deployed, operating system that your team
              can run, measure, and grow.
            </p>
          </FadeUp>
        </div>
      </div>

    </section>
  );
}
