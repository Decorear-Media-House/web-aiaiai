"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import DarkVeil from "@/components/backgrounds/DarkVeil";
import { wpImageUrl } from "@/lib/wordpress";

function ChevronRight() {
  return (
    <svg viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-3" aria-hidden="true">
      <path d="M1 1L7 6.5L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

interface HeroContent {
  label?: string;
  heading?: string;
  description?: string;
  cta_text?: string;
  cta_subtext?: string;
  stats?: { value: string; label: string }[];
  brand_logo_image?: string;
}

const DEFAULT_STATS = [
  { value: "3+", label: "AI Solutions" },
  { value: "100%", label: "Outcome-Driven" },
  { value: "PoC→", label: "Production" },
  { value: "24/7", label: "AI Operations" },
];

const font = "var(--font-faculty-glyphic), sans-serif";

const HEADING_GRADIENT = "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.5%, #8B95C5 100%)";
const ROYAL_SHINE = "linear-gradient(148deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

export default function HeroSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as HeroContent;
  const label = c.label ?? "AI Solution Partner · Thailand";
  const heading = c.heading ?? "Your AI Solution Partner from roadmap to production deployment.";
  const description = c.description ?? "We help organizations adopt practical AI that reduces cost, increases revenue, strengthens compliance, and improves security—through AI Solution Partner delivery, AI video-analytics security, and humanoid robotics solutions.";
  const ctaText = c.cta_text ?? "Contact Us";
  const ctaSubtext = c.cta_subtext ?? "Share your goal and constraints. Our team will reach out.";
  const stats = c.stats ?? DEFAULT_STATS;
  const brandLogoImage = c.brand_logo_image ? wpImageUrl(c.brand_logo_image) : "/images/aaa-vector.svg";
  return (
    <section
      className="relative overflow-hidden max-sm:min-h-0"
      style={{ minHeight: 800, paddingTop: 72, background: "#070E24" }}
    >
      {/* DarkVeil WebGL background */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <DarkVeil
          speed={2}
          scanlineFrequency={0.5}
          hueShift={25}
          noiseIntensity={0.03}
          scanlineIntensity={0.15}
          warpAmount={0.5}
          resolutionScale={0.8}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(7,14,36,0.85) 0%, rgba(7,14,36,0.6) 50%, rgba(7,14,36,0.4) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-[10%] top-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 500, height: 500, background: "rgba(21,93,252,0.12)", filter: "blur(80px)" }}
        aria-hidden="true"
      />

      <Container className="relative h-full">
        <div className="flex h-full w-full items-center py-[60px] max-sm:py-10">

          {/* Left column */}
          <div className="flex flex-col justify-center gap-8 max-w-[600px] w-full">

            <FadeUp trigger="mount" delay={0}>
              {/* Label chip */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 w-fit"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <SparkleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em" }}>
                  {label}
                </span>
              </div>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.1}>
              <h1
                className="max-w-[560px] max-sm:max-w-full"
                style={{
                  fontFamily: font,
                  fontSize: "clamp(36px, 3.5vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  backgroundImage: HEADING_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {heading}
              </h1>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.2}>
              <p
                className="max-w-[540px] max-sm:max-w-full"
                style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}
              >
                {description}
              </p>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.3}>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 sm:w-fit w-full"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    background: ROYAL_SHINE,
                    border: "1px solid #4A99F5",
                    borderRadius: 8,
                    padding: "12px 24px",
                    boxShadow: "0 2px 12px rgba(0,119,255,0.8)",
                  }}
                >
                  {ctaText}
                  <span className="hidden sm:flex">
                    <ChevronRight />
                  </span>
                </a>
                <p style={{ fontFamily: font, fontSize: 12, color: "#8099BE" }}>
                  {ctaSubtext}
                </p>
              </div>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.4}>
              {/* Separator */}
              <div className="w-full h-px mb-6" style={{ background: "rgba(255,255,255,0.1)" }} />

              {/* Stats — 2×2 grid on mobile, single row with dividers on desktop */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:flex sm:gap-0">
                {stats.map((stat, i) => (
                  <div key={stat.value} className="flex items-start">
                    {/* Vertical divider — desktop only */}
                    {i > 0 && (
                      <div className="hidden sm:block mt-1 h-10 w-px mx-8 shrink-0" style={{ background: "rgba(255,255,255,0.12)" }} />
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span style={{
                        fontFamily: font,
                        fontSize: 24,
                        lineHeight: 1.4,
                        backgroundImage: ROYAL_SHINE,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                        {stat.value}
                      </span>
                      <span style={{ fontFamily: font, fontSize: 14, color: "#90A1B9" }}>
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>

      {/* Brand mark — desktop only */}
      <div
        className="pointer-events-none absolute max-lg:hidden"
        style={{
          bottom: -20,
          right: -160,
          width: "clamp(650px, 61.1vw, 1170px)",
          height: "clamp(325px, 30.55vw, 585px)",
          opacity: 0.92,
        }}
        aria-hidden="true"
      >
        <FadeUp trigger="mount" delay={0.2} className="w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandLogoImage}
            alt=""
            className="w-full h-full"
            style={{ objectFit: "contain", objectPosition: "bottom right" }}
          />
        </FadeUp>
      </div>
    </section>
  );
}
