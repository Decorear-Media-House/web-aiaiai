"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

interface OverviewContent {
  heading?: string;
  subtitle?: string;
  description?: string;
  background_image?: string;
}

export default function ServicesOverviewSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as OverviewContent;
  const heading = c.heading ?? "Service Overview";
  const subtitle = c.subtitle ?? "(Long-form cards)";
  const description = c.description ?? "Three focused service lines — each designed to deploy, govern, and scale AI in your real operations.";
  const bgImage = c.background_image ? wpImageUrl(c.background_image) : "";

  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Background image or video */}
      {bgImage ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgImage} alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover pointer-events-none"
          aria-hidden="true"
        >
          <source src="/videos/CTA-Loop.mp4" type="video/mp4" />
        </video>
      )}
      {/* Colour overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(14,42,96,0.6)" }} aria-hidden="true" />

      <Container className="relative py-20 max-sm:py-10 flex flex-col items-center">
        <div className="flex flex-col gap-6 items-center text-center max-w-[596px] w-full">
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-2 items-center">
              <h2
                style={{
                  fontFamily: font,
                  fontSize: "clamp(36px, 4vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.5%, #8B95C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "none",
                }}
              >
                {heading}
              </h2>
              <p style={{ fontFamily: font, fontSize: 16, fontWeight: 400, lineHeight: 1.5, color: "#C0CEEA" }}>
                {subtitle}
              </p>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
              {description}
            </p>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
