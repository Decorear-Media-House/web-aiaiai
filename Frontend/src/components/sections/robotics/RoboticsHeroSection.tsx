"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

/** Robot icon matching the Figma Label component icon */
function RobotIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      {/* Head */}
      <rect x="3.5" y="4.67" width="7" height="5.25" rx="1.5" stroke="#4A99F5" strokeWidth="1.0" />
      {/* Antenna */}
      <rect x="5.25" y="2.33" width="3.5" height="2.34" rx="1" stroke="#4A99F5" strokeWidth="1.0" />
      {/* Left arm */}
      <line x1="1.17" y1="8.17" x2="3.5" y2="8.17" stroke="#4A99F5" strokeWidth="1.0" strokeLinecap="round" />
      {/* Right arm */}
      <line x1="10.5" y1="8.17" x2="12.83" y2="8.17" stroke="#4A99F5" strokeWidth="1.0" strokeLinecap="round" />
      {/* Left eye */}
      <line x1="5.25" y1="7.58" x2="5.25" y2="8.75" stroke="#4A99F5" strokeWidth="1.0" strokeLinecap="round" />
      {/* Right eye */}
      <line x1="8.75" y1="7.58" x2="8.75" y2="8.75" stroke="#4A99F5" strokeWidth="1.0" strokeLinecap="round" />
    </svg>
  );
}

interface HeroContent {
  chip?: string;
  heading?: string;
  description?: string;
  cta_primary?: string;
  cta_primary_url?: string;
  cta_secondary?: string;
  cta_secondary_url?: string;
  hero_background_image?: string;
  background_color?: string;
}

export default function RoboticsHeroSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as HeroContent;
  // Decode HTML entities from WordPress (e.g. &amp; → &)
  const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#8217;/g, "'").replace(/&#8211;/g, "–");
  const chip = decode(c.chip ?? "AI-Enhanced Humanoid Robotics");
  const heading = decode(c.heading ?? "Embodied AI & Humanoid Robotic Solution");
  const description = decode(c.description ?? "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, scalable planning, and rollout.");
  const ctaPrimary = c.cta_primary || "Contact Us";
  const ctaPrimaryUrl = c.cta_primary_url || "/#contact";
  const ctaSecondary = c.cta_secondary || "All Services";
  const ctaSecondaryUrl = c.cta_secondary_url || "/services";
  const bgImage = wpImageUrl((c.hero_background_image as string) || "");
  const bgColor = c.background_color ?? "#070E24";

  return (
    <section className="relative overflow-hidden" style={{ background: bgColor }}>
      {/* Background image — fills entire section */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bgImage} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A1430 0%, #102050 50%, #1A4494 100%)" }} />
        )}
        {/* Gradient fade to bottom — matches Figma: 54% transparent → 100% solid */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(7,14,36,0) 54%, rgba(7,14,36,1) 100%)" }} />
      </div>

      {/* Content — row layout matching Figma (row, gap 80px, fill width/height) */}
      <div
        className="relative max-sm:!px-6 max-sm:!pt-[120px] max-sm:!pb-10"
        style={{ maxWidth: 1440, margin: "0 auto", paddingTop: 140, paddingBottom: 40, paddingLeft: 112, paddingRight: 112 }}
      >
        <div
          className="max-sm:!flex-col max-sm:!gap-10"
          style={{ display: "flex", alignItems: "center", gap: 80 }}
        >
          {/* Left column — chip + heading + description (fills width) */}
          <div className="flex flex-col gap-8" style={{ flex: "1 0 0" }}>
            {/* Content block with 24px gap */}
            <div className="flex flex-col gap-6">
              {/* Chip */}
              <FadeUp trigger="mount" delay={0}>
                <div
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 self-start"
                  style={{
                    background: "rgba(43,127,255,0.1)",
                    border: "1px solid rgba(43,127,255,0.2)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                  }}
                >
                  <RobotIcon />
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{chip}</span>
                </div>
              </FadeUp>

              {/* Heading — 48px gradient text with text shadow */}
              <FadeUp trigger="mount" delay={0.05}>
                <h1
                  className="max-sm:!text-[28px] max-sm:!leading-[1.3]"
                  style={{
                    fontFamily: font,
                    fontSize: 48,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    margin: 0,
                    backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31%, #fff 62%, #8B95C5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    filter: "drop-shadow(0px 2px 12px rgba(0,0,0,0.5))",
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

          {/* Right column — empty space for the background image to show through */}
          <div className="max-sm:!hidden" style={{ flex: "1 0 0" }} aria-hidden="true" />
        </div>

        {/* CTA buttons */}
        <FadeUp trigger="mount" delay={0.15}>
          <div className="flex flex-wrap gap-4 mt-8 max-sm:mt-4">
            <a
              href={ctaPrimaryUrl}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
              style={{
                fontFamily: font,
                fontSize: 16,
                color: "#fff",
                backgroundImage: "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                border: "1px solid #4A99F5",
                boxShadow: "0px 2px 12px rgba(0,119,255,0.8)",
              }}
            >
              {ctaPrimary}
            </a>
            <a
              href={ctaSecondaryUrl}
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
              {ctaSecondary}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
