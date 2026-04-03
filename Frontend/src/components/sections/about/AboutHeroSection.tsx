"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

function SparkleIcon({ color = "#4A99F5" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill={color} />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

const BG_IMAGE = "/images/about-hero-bg.png";

export default function AboutHeroSection({ content }: { content?: Record<string, unknown> }) {
  const bgImage = wpImageUrl((content as any)?.hero_background_image || BG_IMAGE);
  const label = (content?.label as string) ?? "About Us";
  const heading = (content?.heading as string) ?? "About \nAi-Ai-Ai Co., Ltd.";
  const description = (content?.description as string) ??
    "Ai-Ai-Ai Co., Ltd. is a Thailand-based AI company delivering AI Solution Partner engagements from roadmap to production deployment, plus AI video analytics security and humanoid robotics solutions.";
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(16,32,80,0.85), rgba(7,14,36,0.85))" }}
        />
      </div>

      <Container className="relative flex items-end" style={{ minHeight: 394 }}>
        <div className="flex w-full flex-wrap items-end gap-6 pb-20 pt-[140px] max-sm:pt-[120px] max-sm:pb-10 max-lg:flex-col max-lg:items-start">

          {/* Left column — label + title */}
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
                <SparkleIcon color="#4A99F5" />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{label}</span>
              </div>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.1}>
              <h1
                style={{
                  fontFamily: font,
                  fontSize: 32,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "#fff",
                }}
              >
                {heading.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </FadeUp>
          </div>

          {/* Right column — description */}
          <div className="flex flex-1 min-w-[300px] items-end">
            <FadeUp trigger="mount" delay={0.2}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.75 }}>
                {description}
              </p>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
