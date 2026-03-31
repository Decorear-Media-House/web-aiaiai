"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/services/
const imgChevronRight = "https://www.figma.com/api/mcp/asset/cdf8162d-d27b-4902-8b01-4b74094b9954";

const ROYAL_SHINE = "linear-gradient(163deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

const INITIATIVES = [
  "Workflow automation with approvals, audit logs, and role-based access",
  "Document intelligence pipelines: extraction → validation → routing",
  "Executive dashboards and alerts: signal → decision → action",
  "AI video analytics packs: restricted zones, anomalies, event rules",
  "Incident workflows: detect → alert → escalate → evidence → report",
  "Robotics pilots: readiness checklist, SOPs, training, escalation flows, integration",
];

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ServicesInitiativesSection() {
  return (
    <section className="relative" style={{ background: "#102050" }}>
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{ background: "rgba(21,93,252,0.1)", filter: "blur(64px)", width: 400, height: 400, top: 0, left: 294 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 rounded-full"
        style={{ background: "rgba(34,52,254,0.1)", filter: "blur(64px)", width: 365, height: 365 }}
        aria-hidden="true"
      />

      <Container className="relative py-20">
        <div className="flex flex-wrap gap-10 items-start">

          {/* Left sidebar */}
          <div className="w-[286px] shrink-0 flex flex-col gap-6 max-lg:w-full sticky top-[88px] self-start">
            <FadeUp trigger="scroll" delay={0}>
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
                <SparkleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Initiatives</span>
              </div>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.05}>
              <div className="flex flex-col gap-1">
                <p style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>Example</p>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: 32,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    backgroundImage: "linear-gradient(90deg, #51A2FF 0%, #53EAFD 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Initiatives
                </p>
              </div>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.1}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                Examples of deliverables we commonly support across all three service lines.
              </p>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.15}>
              <a
                href="#contact"
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
                Contact Us <ChevronRight />
              </a>
            </FadeUp>
          </div>

          {/* Right — initiative cards */}
          <div className="flex-1 min-w-[350px] flex flex-col gap-4">
            {INITIATIVES.map((text, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.06}>
                <div className="flex gap-4 items-start">
                  {/* Circle + vertical line */}
                  <div className="flex flex-col items-center gap-1 shrink-0 self-stretch">
                    <div
                      className="flex items-center justify-center rounded-full size-8 shrink-0"
                      style={{
                        background: "rgba(43,127,255,0.1)",
                        border: "1px solid rgba(43,127,255,0.2)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgChevronRight} alt="" width={14} height={14} />
                    </div>
                    {i < INITIATIVES.length - 1 && (
                      <div
                        className="flex-1 w-px min-h-[16px]"
                        style={{ background: "linear-gradient(to bottom, #fff, rgba(255,255,255,0))" }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <p style={{ fontFamily: font, fontSize: 20, color: "#fff", lineHeight: 1.5 }}>{text}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
