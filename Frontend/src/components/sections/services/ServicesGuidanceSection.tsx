"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/services/
const imgSection = "https://www.figma.com/api/mcp/asset/1409388b-3d6e-4bbf-8146-d026c4f30149";
const imgGuideIcon = "https://www.figma.com/api/mcp/asset/1b68ab6d-0328-4abf-a2b5-41c296e8d2ff";
const imgIcon = "https://www.figma.com/api/mcp/asset/ff6415b5-feca-4f83-9063-d4fecbf10315";
const imgGuideIcon1 = "https://www.figma.com/api/mcp/asset/a28b5ad1-f42c-468f-b786-560268744481";

const ROYAL_SHINE = "linear-gradient(167deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARDS = [
  {
    icon: imgGuideIcon,
    title: "Need to reduce cost fast?",
    body: "Start with AI Solution Partner discovery & roadmap with one MVP target.",
  },
  {
    icon: imgIcon,
    title: "Need security improvement?",
    body: "Start with AI Security Solution pilot on 1–2 sites.",
  },
  {
    icon: imgGuideIcon1,
    title: "Exploring robotics?",
    body: "Start with pilot readiness and task definition for Embodied & Humanoid Robotics.",
  },
];

export default function ServicesGuidanceSection() {
  return (
    <section className="relative overflow-x-clip">
      {/* Background image + overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSection} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(16,32,80,0.5)" }} />
      </div>

      <Container className="relative py-20">
        <div className="flex flex-col gap-10 items-center">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[700px]">
              {/* Label chip */}
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
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Getting Started</span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.2, color: "#fff", textAlign: "center" }}>
                &ldquo;Where to start&rdquo;{" "}
                <span
                  style={{
                    backgroundImage: ROYAL_SHINE,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Guidance
                </span>
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>
                If you&rsquo;re unsure where to begin, pick the path that matches your most urgent goal.
              </p>
            </div>
          </FadeUp>

          {/* Cards */}
          <div className="flex flex-wrap gap-6 items-start justify-center w-full">
            {CARDS.map(({ icon, title, body }, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="flex-1 min-w-[312px]">
                <div
                  className="flex flex-col gap-4 rounded-2xl p-6 h-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="flex items-center justify-center rounded-[14px] size-12 shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" width={24} height={24} />
                  </div>
                  <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff" }}>{title}</h3>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp trigger="scroll" delay={0.3}>
            <div className="flex flex-col items-center gap-5">
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>
                Ready to discuss your specific challenge?
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  backgroundImage: ROYAL_SHINE,
                  border: "1px solid #4A99F5",
                  boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                }}
              >
                Contact Us Today <ChevronRight />
              </a>
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
