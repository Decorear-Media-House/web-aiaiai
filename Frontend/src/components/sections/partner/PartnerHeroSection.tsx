"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Team / people icon */
function TeamIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="5" cy="4" r="2" stroke="#4A99F5" strokeWidth="1.2"/>
      <circle cx="10" cy="4" r="1.5" stroke="#4A99F5" strokeWidth="1.2"/>
      <path d="M1 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 8c1.7 0 3 1.3 3 3" stroke="#4A99F5" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

const STATS = [
  { top: "PoC \u2192 MVP",       bottom: "Validated Delivery" },
  { top: "Governed",        bottom: "From Day One"       },
  { top: "Operationalized", bottom: "Not Just Strategy"  },
];

export default function PartnerHeroSection({ content }: { content?: Record<string, unknown> }) {
  const chipLabel = (content?.chipLabel as string) ?? "From Roadmap to Production \u2014 Delivered";
  const heading = (content?.heading as string) ?? "AI Solution Partner";
  const description = (content?.description as string) ??
    "Roadmap to MVP to production deployment\u2014delivered with governance, integration, and operational constraints in mind.";
  const primaryCta = (content?.primaryCta as string) ?? "Contact Us";
  const secondaryCta = (content?.secondaryCta as string) ?? "All Services";
  const bgImage = wpImageUrl((content?.hero_background_image as string) || "");
  const containerImage = wpImageUrl((content?.container_image as string) || "");
  const bgColor = (content?.background_color as string) ?? "#070E24";
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

      {/* Deco bottom-left corner — decorative gradient arc */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 224,
          height: 511,
          overflow: "hidden",
          pointerEvents: "none",
          background: "linear-gradient(40deg, rgba(43,127,255,0.08) 0%, transparent 60%)",
        }}
      />

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
            gap: 60,
            alignItems: "stretch",
          }}
        >
          {/* Left — photo card */}
          <div style={{ flex: "1 0 0", minWidth: 0, position: "relative", alignSelf: "stretch" }}>
            <FadeUp trigger="mount" delay={0} className="h-full">
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
                }}
              >
                {containerImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt=""
                    src={containerImage}
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", objectFit: "cover", borderRadius: 16, display: "block", pointerEvents: "none" }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #0A1430 0%, #1A2A50 50%, #0E1E3E 100%)",
                    }}
                  />
                )}
              </div>
            </FadeUp>
          </div>

          {/* Right — text column */}
          <div
            style={{
              flex: "1 0 0",
              maxWidth: 493,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            {/* Chip + Heading + Body */}
            <FadeUp trigger="mount" delay={0.05}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", width: "100%" }}>
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
                  <TeamIcon />
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "pre" }}>
                    {chipLabel}
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
                    textShadow: "none",
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

            {/* CTAs */}
            <FadeUp trigger="mount" delay={0.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
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
                  {primaryCta}
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
                  {secondaryCta}
                </a>
              </div>
            </FadeUp>

            {/* Stat chips */}
            <FadeUp trigger="mount" delay={0.15}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, width: "100%" }}>
                {STATS.map(({ top, bottom }) => (
                  <div
                    key={top}
                    style={{
                      flex: "1 0 0",
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
                      textAlign: "center",
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
          </div>
        </div>
      </div>
    </section>
  );
}
