"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const CHIPS = ["Target outcome", "Current constraints", "Preferred pace"];

export default function PartnerCTASection({ content }: { content?: Record<string, unknown> }) {
  const heading = (content?.heading as string) ?? "Tell us your target outcome ";
  const headingHighlight = (content?.headingHighlight as string) ?? "and constraints.";
  const description = (content?.description as string) ??
    "We\u2019ll propose a practical next step: discovery, roadmap, pilot, or MVP scope.";
  const primaryCta = (content?.primaryCta as string) ?? "Contact Us";
  const primaryCtaUrl = (content?.primaryCtaUrl as string) || "/#contact";
  const secondaryCta = (content?.secondaryCta as string) ?? "All Services";
  const secondaryCtaUrl = (content?.secondaryCtaUrl as string) || "/services";
  return (
    <section
      className="max-sm:!px-4 max-sm:!pb-4"
      style={{
        background: "#070E24",
        paddingBottom: 40,
        paddingLeft: 40,
        paddingRight: 40,
      }}
    >
      {/* Rounded card with video background */}
      <div
        className="max-sm:!px-6 max-sm:!py-8"
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.2)",
          paddingLeft: 80,
          paddingRight: 80,
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/videos/CTA-Loop.mp4" type="video/mp4" />
        </video>

        {/* Content row */}
        <div
          className="max-sm:!flex-col max-sm:!items-stretch max-sm:!gap-8"
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 40px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT — heading + body + chips */}
          <FadeUp trigger="scroll" delay={0} className="min-w-[300px] flex-[1_0_0] max-sm:!min-w-0 max-sm:!w-full">
            <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start", maxWidth: 672 }}>
              {/* Heading */}
              <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, margin: 0, color: "#fff" }}>
                {heading}
                <span style={{ color: "#00BAF2" }}>{headingHighlight}</span>
              </h2>
              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>
                {description}
              </p>
              {/* Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                {CHIPS.map((label) => (
                  <div
                    key={label}
                    style={{
                      display: "inline-flex", alignItems: "center",
                      padding: "8px 16px", borderRadius: 8,
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* RIGHT — two buttons (desktop: stacked right; mobile: full-width row, equal split) */}
          <FadeUp trigger="scroll" delay={0.08} className="max-sm:!w-full sm:shrink-0">
            <div className="flex w-full flex-col items-end justify-center gap-4 max-sm:!flex-row max-sm:!items-stretch max-sm:!gap-4">
              {/* Primary CTA */}
              <a
                href={primaryCtaUrl}
                className="max-sm:!min-w-0 max-sm:!flex-1"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "12px 24px", borderRadius: 8,
                  backgroundImage: "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  border: "1px solid #4A99F5",
                  boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                  fontFamily: font, fontSize: 16, color: "#fff", textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
                {primaryCta}
              </a>
              {/* Secondary CTA */}
              <a
                href={secondaryCtaUrl}
                className="max-sm:!min-w-0 max-sm:!flex-1"
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "12px 24px", borderRadius: 8,
                  background: "rgba(10,19,47,0.4)",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: font, fontSize: 16, color: "#fff", textDecoration: "none", whiteSpace: "nowrap",
                }}
              >
                {secondaryCta}
              </a>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
