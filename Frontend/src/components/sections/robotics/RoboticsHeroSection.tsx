"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

interface HeroContent {
  chip?: string;
  heading?: string;
  description?: string;
  hero_background_image?: string;
  background_color?: string;
}

export default function RoboticsHeroSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as HeroContent;
  const chip = c.chip ?? "AI-Enhanced Humanoid Robotics";
  const heading = c.heading ?? "Embodied AI & Humanoid Robotic Solution";
  const description = c.description ?? "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, scalable planning, and rollout.";
  const bgImage = wpImageUrl((c.hero_background_image as string) || "");
  const bgColor = c.background_color ?? "#070E24";

  return (
    <section className="relative overflow-hidden" style={{ background: bgColor }}>
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bgImage} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A1430 0%, #102050 50%, #1A4494 100%)" }} />
        )}
        {/* Gradient fade to bottom */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(7,14,36,0) 54%, rgba(7,14,36,1) 100%)" }} />
      </div>

      {/* Content — left-aligned like Figma */}
      <div
        className="relative max-sm:!px-6 max-sm:!pt-[120px] max-sm:!pb-10"
        style={{ maxWidth: 1440, margin: "0 auto", paddingTop: 140, paddingBottom: 40, paddingLeft: 112, paddingRight: 112 }}
      >
        <div className="max-w-[600px] flex flex-col gap-6">
          {/* Chip */}
          <FadeUp trigger="mount" delay={0}>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 self-start"
              style={{
                background: "rgba(43,127,255,0.1)",
                border: "1px solid rgba(43,127,255,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="8" height="7" rx="1.5" stroke="#4A99F5" strokeWidth="1.2" />
                <rect x="5" y="2" width="4" height="2.5" rx="1" stroke="#4A99F5" strokeWidth="1.2" />
                <line x1="1.5" y1="6.5" x2="3" y2="6.5" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="11" y1="6.5" x2="12.5" y2="6.5" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{chip}</span>
            </div>
          </FadeUp>

          {/* Heading */}
          <FadeUp trigger="mount" delay={0.05}>
            <h1
              className="max-sm:!text-[28px] max-sm:!leading-[1.3]"
              style={{
                fontFamily: font,
                fontSize: 48,
                fontWeight: 400,
                lineHeight: 1.2,
                margin: 0,
                backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.54%, #8B95C5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {heading}
            </h1>
          </FadeUp>

          {/* Description */}
          <FadeUp trigger="mount" delay={0.1}>
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
              {description}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
