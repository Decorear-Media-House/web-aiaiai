"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(170deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5" />
        <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p style={{ fontFamily: font, fontSize: 16, color: "#E8EEF8", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

interface AISolutionContent {
  number?: string;
  label?: string;
  heading?: string;
  subtitle?: string;
  what_it_is?: string;
  outcomes_enabled?: string[];
  use_case_categories?: string[];
  cta_text?: string;
  cta_href?: string;
  section_image?: string;
  background_color?: string;
}

const DEFAULT_OUTCOMES = [
  "Labor efficiency and throughput improvement",
  "SOP-driven consistency and reduced variance",
  "Safety/governance and service readiness",
  "Rollout readiness for scaling",
];

const DEFAULT_USE_CASES = [
  "Workflow automation with approvals",
  "Decision support dashboards",
  "Classification/triage at scale",
  "AI integration into existing systems",
];

export default function ServicesAISolutionSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as AISolutionContent;
  const number = c.number ?? "03";
  const label = c.label ?? "AI Solution Partner";
  const heading = c.heading ?? "AI Solution Partner";
  const subtitle = c.subtitle ?? "Your AI development partner — from roadmap to production.";
  const whatItIs = c.what_it_is ?? "A partner-led engagement that combines AI consulting and implementation support to deliver PoC/MVP and deploy AI into real operations.";
  const outcomesEnabled = c.outcomes_enabled ?? DEFAULT_OUTCOMES;
  const useCaseCategories = c.use_case_categories ?? DEFAULT_USE_CASES;
  const ctaText = c.cta_text ?? "Explore AI Solution Partner";
  const ctaHref = c.cta_href ?? "#";
  const bgColor = c.background_color ?? "#1E2E48";
  return (
    <section className="relative" style={{ background: bgColor }}>
      {/* Orange glow blobs */}
      <div
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{ background: "rgba(252,90,21,0.1)", filter: "blur(64px)", width: 400, height: 400 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 rounded-full"
        style={{ background: "rgba(252,90,21,0.1)", filter: "blur(64px)", width: 365, height: 365 }}
        aria-hidden="true"
      />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-wrap gap-x-[60px] gap-y-10 items-center max-sm:flex-col-reverse">

          {/* Left — content */}
          <div className="flex-1 min-w-[312px] flex flex-col gap-6">
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-4">
                {/* Number + label */}
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: font,
                      fontSize: 48,
                      fontWeight: 400,
                      lineHeight: 1.2,
                      backgroundImage: "linear-gradient(to right, #ff8904, #ff6467)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {number}
                  </span>
                  <div
                    className="inline-flex items-center rounded-lg px-4 py-2"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff" }}>{label}</span>
                  </div>
                </div>

                <h2 className="max-sm:text-[32px]" style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, color: "#fff" }}>
                  {heading}
                </h2>
                <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                  {subtitle}
                </p>
              </div>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.1}>
              <div className="flex flex-col gap-6">
                {/* What it is card */}
                <div
                  className="rounded-2xl p-6 flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p style={{ fontFamily: font, fontSize: 16, color: "#FF8904", lineHeight: 1.5 }}>What it is</p>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                    {whatItIs}
                  </p>
                </div>

                {/* Outcomes enabled */}
                <div
                  className="flex flex-col gap-4 pb-6"
                  style={{ borderBottom: "1px solid #4A6080" }}
                >
                  <p style={{ fontFamily: font, fontSize: 14, color: "#8099BE", lineHeight: 1.5 }}>Outcomes enabled</p>
                  <div className="flex flex-col gap-2">
                    {outcomesEnabled.map((item, i) => (
                      <CheckItem key={i} text={item} />
                    ))}
                  </div>
                </div>

                {/* Common use-case categories */}
                <div className="flex flex-col gap-4">
                  <p style={{ fontFamily: font, fontSize: 14, color: "#8099BE", lineHeight: 1.5 }}>Common use-case categories</p>
                  <div className="flex flex-col gap-2">
                    {useCaseCategories.map((item, i) => (
                      <CheckItem key={i} text={item} />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-1 rounded-lg px-6 py-3 transition-opacity hover:opacity-90 self-start"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    backgroundImage: ROYAL_SHINE,
                    border: "1px solid #4A99F5",
                    boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                  }}
                >
                  {ctaText} <ChevronRight />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — photo */}
          <FadeUp trigger="scroll" delay={0.15} className="flex-1 min-w-[312px] max-sm:w-full max-sm:min-w-0">
            <div
              className="rounded-2xl overflow-hidden max-sm:h-[200px]"
              style={{
                height: 806,
                boxShadow: "4px 4px 32px 0px rgba(153,92,77,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={wpImageUrl((c.section_image as string) || "/images/placeholder.jpg")} alt="AI solution partner team meeting" className="size-full object-cover" />
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
