"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";
const ROYAL_TEXT = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function PilotIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.5"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v18M3 12h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="#fff" strokeWidth="1.5"/>
    </svg>
  );
}

function RolloutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DevelopmentChipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 4.5v7L12 18l-8-4.5v-7L12 2z" stroke="#4A99F5" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

const PHASE_ICONS = [
  <PilotIcon key="p1" />,
  <ExpandIcon key="p2" />,
  <RolloutIcon key="p3" />,
];

const PHASES = [
  {
    phase: "Phase 1",
    title: "Pilot & Validate",
    subtitle: "1\u20132 sites",
    description: "Validate detection usefulness, alert quality, and workflow fit.",
  },
  {
    phase: "Phase 2",
    title: "Expand Analytics Packs",
    subtitle: null,
    description: "Add analytics packs and improve SOP integration.",
  },
  {
    phase: "Phase 3",
    title: "Scale Rollout",
    subtitle: null,
    description: "Roll out to more sites with standard playbooks and dashboards.",
  },
];

interface PhasesContent {
  chip?: string;
  heading?: string;
  description?: string;
  phases?: typeof PHASES;
  background_color?: string;
}

export default function SecurityPhasesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as PhasesContent;
  const chip = c.chip ?? "Development";
  const sectionHeading = c.heading ?? "How Deployments Usually Run";
  const sectionDescription = c.description ?? "A structured three-phase approach from initial pilot through full-scale rollout.";
  const phases = c.phases ?? PHASES;
  return (
    <section className="relative" style={{ background: "#070E24", overflowX: "clip" }}>
      {/* Faint center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
        style={{ background: "rgba(43,127,255,0.05)", filter: "blur(82px)", width: 512, height: 512 }}
        aria-hidden="true"
      />

      <Container className="relative py-20">
        <div className="flex flex-col gap-10 items-center max-w-[1216px] mx-auto">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center">
              {/* Label chip */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <DevelopmentChipIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{chip}</span>
              </div>

              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", textAlign: "center" }}>
                {sectionHeading}
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#90A1B9", lineHeight: 1.5, textAlign: "center" }}>
                {sectionDescription}
              </p>
            </div>
          </FadeUp>

          {/* Phase cards */}
          <div className="flex flex-wrap gap-6 items-start justify-center w-full">
            {phases.map(({ phase, title, subtitle, description }, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="flex-1 min-w-[240px] flex flex-col gap-8 items-start">
                {/* Icon row with horizontal lines */}
                <div className="flex gap-2.5 items-center justify-center w-full">
                  {/* Left line */}
                  <div className="flex-1 h-px min-w-0" style={{ background: "rgba(74,153,245,0.3)" }} />
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-2xl shrink-0"
                    style={{
                      width: 52,
                      height: 52,
                      backgroundImage: ROYAL_SHINE,
                      boxShadow: "0px 0px 24px 0px rgba(59,130,246,0.4)",
                    }}
                  >
                    {PHASE_ICONS[i]}
                  </div>
                  {/* Right line */}
                  <div className="flex-1 h-px min-w-0" style={{ background: "rgba(74,153,245,0.3)" }} />
                </div>

                {/* Phase number */}
                <div className="w-full text-center">
                  <span
                    style={{
                      fontFamily: font,
                      fontSize: 48,
                      fontWeight: 400,
                      lineHeight: 1.2,
                      backgroundImage: ROYAL_TEXT,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {phase}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="rounded-2xl p-6 flex flex-col gap-2 items-center w-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", textAlign: "center" }}>{title}</h3>
                  {subtitle && (
                    <p style={{ fontFamily: font, fontSize: 14, color: "#00BAF2", lineHeight: 1.5, textAlign: "center" }}>{subtitle}</p>
                  )}
                  <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>{description}</p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
