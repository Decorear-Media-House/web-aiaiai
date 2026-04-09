"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";
const ROYAL_TEXT = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/* Phase 1: Target/Bullseye */
function PilotIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Phase 2: Bar chart */
function ExpandIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 17V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 17V5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 17V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Phase 3: Lightning bolt */
function RolloutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.00048 14.0002C3.81125 14.0008 3.62571 13.9477 3.46543 13.8471C3.30516 13.7465 3.17671 13.6025 3.09503 13.4318C3.01335 13.2611 2.98177 13.0707 3.00398 12.8828C3.02619 12.6949 3.10126 12.5171 3.22048 12.3702L13.1205 2.17016C13.1947 2.08444 13.2959 2.02652 13.4075 2.0059C13.519 1.98527 13.6342 2.00318 13.7342 2.05667C13.8342 2.11016 13.9131 2.19606 13.9578 2.30027C14.0026 2.40448 14.0106 2.52081 13.9805 2.63016L12.0605 8.65016C12.0039 8.80169 11.9849 8.96468 12.0051 9.12517C12.0253 9.28566 12.0841 9.43884 12.1766 9.57159C12.269 9.70434 12.3923 9.81268 12.5358 9.88732C12.6793 9.96197 12.8387 10.0007 13.0005 10.0002H20.0005C20.1897 9.99952 20.3752 10.0526 20.5355 10.1532C20.6958 10.2538 20.8242 10.3978 20.9059 10.5685C20.9876 10.7392 21.0192 10.9296 20.997 11.1175C20.9748 11.3054 20.8997 11.4832 20.7805 11.6302L10.8805 21.8302C10.8062 21.9159 10.705 21.9738 10.5935 21.9944C10.482 22.0151 10.3668 21.9972 10.2668 21.9437C10.1667 21.8902 10.0879 21.8043 10.0431 21.7001C9.9984 21.5958 9.9904 21.4795 10.0205 21.3702L11.9405 15.3502C11.9971 15.1986 12.0161 15.0356 11.9959 14.8752C11.9757 14.7147 11.9168 14.5615 11.8244 14.4287C11.732 14.296 11.6087 14.1876 11.4652 14.113C11.3217 14.0384 11.1622 13.9996 11.0005 14.0002H4.00048Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* Chip icon: Lightning bolt */
function DevelopmentChipIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/images/sec-dev-chip-ico.svg" alt="" width={14} height={14} />
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
  const chip = c.chip || "Development";
  const sectionHeading = c.heading || "How Deployments Usually Run";
  const sectionDescription = c.description || "A structured three-phase approach from initial pilot through full-scale rollout.";
  const phases = c.phases ?? PHASES;
  const bgColor = c.background_color || "#070E24";
  return (
    <section className="relative" style={{ background: bgColor, overflowX: "clip" }}>
      {/* Faint center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
        style={{ background: "rgba(43,127,255,0.05)", filter: "blur(82px)", width: 512, height: 512 }}
        aria-hidden="true"
      />

      <Container className="relative py-20 max-sm:py-10">
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

              <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", textAlign: "center" }}>
                {sectionHeading}
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#90A1B9", lineHeight: 1.5, textAlign: "center" }}>
                {sectionDescription}
              </p>
            </div>
          </FadeUp>

          {/* Phase cards */}
          <div className="flex flex-wrap gap-6 items-start justify-center w-full max-sm:flex-col">
            {phases.map(({ phase, title, subtitle, description }, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="flex-1 min-w-[240px] max-sm:!min-w-0 max-sm:w-full max-sm:!flex-none flex flex-col gap-8 items-start">
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
                    className="max-sm:!text-[32px]"
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
                  <h3 className="max-sm:!text-[20px]" style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", textAlign: "center" }}>{typeof title === "string" ? title.replace(/&amp;/g, "&") : title}</h3>
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
