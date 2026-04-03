"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

interface HeroContent {
  chip?: string;
  heading?: string;
  description?: string;
  stats?: { top: string; bottom: string }[];
  cta_primary?: string;
  cta_secondary?: string;
  hero_background_image?: string;
  background_color?: string;
}

const DEFAULT_STATS = [
  { top: "Pilot-Ready",  bottom: "Planning"   },
  { top: "SOP-Driven",   bottom: "Operations" },
  { top: "Multi-Site",   bottom: "Scalability" },
];

export default function RoboticsHeroSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as HeroContent;
  const chip = c.chip ?? "AI-Enhanced Humanoid Robotics";
  const heading = c.heading ?? "AI-Enhanced Embodied & Humanoid Robotics Solution";
  const description = c.description ?? "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, scalable planning, and rollout.";
  const stats = c.stats ?? DEFAULT_STATS;
  const ctaPrimary = c.cta_primary ?? "Contact Us";
  const ctaSecondary = c.cta_secondary ?? "All Services";
  const bgImage = wpImageUrl((c.hero_background_image as string) || "");
  const bgColor = c.background_color ?? "#070E24";
  return (
    <section
      style={{
        position: "relative",
        height: 656,
        overflow: "hidden",
        background: bgColor,
      }}
    >
      {/* Background image + gradient overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgImage}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #0A1430 0%, #102050 50%, #1A4494 100%)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(16,32,80,0.8), #070E24)",
          }}
        />
      </div>

      {/* Content — absolute fill, pt-140 pb-80 px-112 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: 140,
          paddingBottom: 80,
          paddingLeft: 112,
          paddingRight: 112,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1216,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Single centered column, max-w-699px */}
          <div
            style={{
              flex: 1,
              maxWidth: 699,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "center",
            }}
          >
            {/* Chip + Heading + Body */}
            <FadeUp trigger="mount" delay={0}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
                {/* Chip */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    borderRadius: 8,
                    padding: "8px 16px",
                    background: "rgba(43,127,255,0.1)",
                    border: "1px solid rgba(43,127,255,0.2)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Robot icon (simplified SVG matching the Figma robot outline) */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="8" height="7" rx="1.5" stroke="#4A99F5" strokeWidth="1.2" />
                    <rect x="5" y="2" width="4" height="2.5" rx="1" stroke="#4A99F5" strokeWidth="1.2" />
                    <line x1="1.5" y1="6.5" x2="3" y2="6.5" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="11" y1="6.5" x2="12.5" y2="6.5" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="5.5" y1="11" x2="5.5" y2="13" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1="8.5" y1="11" x2="8.5" y2="13" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                    {chip}
                  </span>
                </div>

                {/* Heading */}
                <h1
                  style={{
                    fontFamily: font,
                    fontSize: 48,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    margin: 0,
                    textAlign: "center",
                    backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.54%, #8B95C5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {heading}
                </h1>

                {/* Body */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center", margin: 0 }}>
                  {description}
                </p>
              </div>
            </FadeUp>

            {/* Stat chips */}
            <FadeUp trigger="mount" delay={0.08}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {stats.map(({ top, bottom }) => (
                  <div
                    key={top}
                    style={{
                      minWidth: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      padding: "16px 32px",
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: 16,
                        lineHeight: 1.5,
                        whiteSpace: "nowrap",
                        backgroundImage: ROYAL_SHINE,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {top}
                    </span>
                    <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                      {bottom}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* CTAs */}
            <FadeUp trigger="mount" delay={0.14}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", alignItems: "center" }}>
                <a
                  href="#contact"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    padding: "12px 24px",
                    backgroundImage: ROYAL_SHINE,
                    border: "1px solid #4A99F5",
                    boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  {ctaPrimary}
                </a>
                <a
                  href="/services"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    padding: "12px 24px",
                    background: "rgba(10,19,47,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  {ctaSecondary}
                </a>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
