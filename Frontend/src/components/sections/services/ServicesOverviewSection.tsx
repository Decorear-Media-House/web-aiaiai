"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

export default function ServicesOverviewSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Video background */}
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
      {/* Colour overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(14,42,96,0.5)" }} aria-hidden="true" />

      <Container className="relative py-20 flex flex-col items-center">
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
                Service Overview
              </h2>
              <p style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#C0CEEA" }}>
                (Long-form cards)
              </p>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
              Three focused service lines — each designed to deploy, govern, and scale AI in your real operations.
            </p>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
