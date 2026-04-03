"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 4v5c0 4.5-3 8.25-7 9.5-4-1.25-7-5-7-9.5V7l7-4z" stroke="#fff" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

interface HeroContent {
  chip?: string;
  heading?: string;
  description?: string;
  stats?: { top: string; bottom: string }[];
  cta_primary?: string;
  cta_secondary?: string;
  detection_title?: string;
  detection_subtitle?: string;
  background_color?: string;
  wpImageUrl?: string;
  wpContainerImageUrl?: string;
}

const DEFAULT_STATS = [
  { top: "Real-time",  bottom: "Detection"  },
  { top: "Multi-site", bottom: "Coverage"   },
  { top: "Automated",  bottom: "Workflows"  },
];

export default function SecurityHeroSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as HeroContent;
  const chip = c.chip ?? "AI Security Solution";
  const heading = c.heading ?? "AI Security Platform & Solution";
  const description = c.description ?? "Computer Vision + AI video analytics for detection, alerts, and incident workflows — designed for real security operations.";
  const stats = c.stats ?? DEFAULT_STATS;
  const ctaPrimary = c.cta_primary ?? "Contact Us";
  const ctaSecondary = c.cta_secondary ?? "All Services";
  const detectionTitle = c.detection_title ?? "AI-Powered Detection";
  const detectionSubtitle = c.detection_subtitle ?? "Camera \u2192 Alert \u2192 Incident \u2192 Report";
  const bgColor = c.background_color ?? "#070E24";
  const wpImageUrl = c.wpImageUrl;
  const wpContainerImageUrl = c.wpContainerImageUrl;
  return (
    <section
      style={{
        position: "relative",
        height: 656,
        overflow: "hidden",
        background: bgColor,
      }}
    >
      {/* ── Background image + gradient overlay ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {wpImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={wpImageUrl}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(16,32,80,0.85), rgba(7,14,36,0.85))",
          }}
        />
      </div>

      {/* ── Deco — bottom-right corner ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 224,
          height: 511,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <svg width="224" height="511" viewBox="0 0 224 511" fill="none" style={{ opacity: 0.15 }}>
          <line x1="0" y1="0" x2="224" y2="511" stroke="#4A99F5" strokeWidth="0.5" />
          <line x1="56" y1="0" x2="224" y2="383" stroke="#4A99F5" strokeWidth="0.5" />
          <line x1="112" y1="0" x2="224" y2="255" stroke="#4A99F5" strokeWidth="0.5" />
          <line x1="168" y1="0" x2="224" y2="128" stroke="#4A99F5" strokeWidth="0.5" />
          <line x1="0" y1="128" x2="224" y2="511" stroke="#4A99F5" strokeWidth="0.5" />
          <line x1="0" y1="255" x2="224" y2="511" stroke="#4A99F5" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ── Content — absolute fill, inset padding matches Figma ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: 140,
          paddingBottom: 80,
          paddingLeft: 112,
          paddingRight: 112,
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* Inner row */}
        <div
          style={{
            display: "flex",
            gap: 60,
            alignItems: "center",
            width: "100%",
            maxWidth: 1216,
            margin: "0 auto",
          }}
        >

          {/* ── Left column ── */}
          <div style={{ flex: 1, maxWidth: 493, display: "flex", flexDirection: "column", gap: 32 }}>

            <FadeUp trigger="mount" delay={0}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
                    alignSelf: "flex-start",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
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
                    backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.54%, #8B95C5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {heading}
                </h1>

                {/* Body */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                  {description}
                </p>
              </div>
            </FadeUp>

            {/* Stat chips */}
            <FadeUp trigger="mount" delay={0.08}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {stats.map(({ top, bottom }) => (
                  <div
                    key={top}
                    style={{
                      flex: "1 0 100px",
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
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
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

          {/* ── Right column — stretches full available height ── */}
          <div style={{ flex: 1, alignSelf: "stretch", minWidth: 0 }}>
          <FadeUp trigger="mount" delay={0.14} className="h-full">
            <div
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 24,
                boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
              }}
            >
              {/* Photo */}
              {wpContainerImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={wpContainerImageUrl}
                  alt="AI security monitoring center"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    pointerEvents: "none",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, #0A132F 0%, #1A4494 100%)",
                  }}
                />
              )}
              {/* Glassmorphism bottom bar */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  columnGap: 40,
                  rowGap: 8,
                  alignItems: "center",
                  paddingLeft: 16,
                  paddingRight: 24,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderRadius: 16,
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* ShieldCheck + text */}
                <div style={{ flex: "1 0 160px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundImage: ROYAL_SHINE,
                      boxShadow: "0px 0px 16px 0px rgba(59,130,246,0.5)",
                    }}
                  >
                    <ShieldCheckIcon />
                  </div>
                  <div>
                    <p style={{ fontFamily: font, fontSize: 14, color: "#fff", lineHeight: 1.5, margin: 0 }}>{detectionTitle}</p>
                    <p style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>{detectionSubtitle}</p>
                  </div>
                </div>
                {/* Live badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    borderRadius: 99,
                    padding: "4px 12px",
                    background: "rgba(239,68,68,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", display: "inline-block" }} />
                  <span style={{ fontFamily: font, fontSize: 12, color: "#EF4444", lineHeight: 1.5, whiteSpace: "nowrap" }}>Live</span>
                </div>
              </div>
            </div>
          </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
