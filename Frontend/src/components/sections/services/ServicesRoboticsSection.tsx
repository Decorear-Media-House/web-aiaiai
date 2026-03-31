"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/services/
const imgContainer = "https://www.figma.com/api/mcp/asset/28c0177c-8d18-4f67-ab74-5dfda351f7c9";
const imgCheckCircle = "https://www.figma.com/api/mcp/asset/1e45dc2b-9e84-4540-bc4b-1694f2b7a5ca";

const ROYAL_SHINE = "linear-gradient(167deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgCheckCircle} alt="" width={16} height={16} className="shrink-0 mt-0.5" />
      <p style={{ fontFamily: font, fontSize: 16, color: "#E8EEF8", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

export default function ServicesRoboticsSection() {
  return (
    <section className="relative" style={{ background: "#102050" }}>
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{ background: "rgba(21,93,252,0.1)", filter: "blur(64px)", width: 400, height: 400 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 rounded-full"
        style={{ background: "rgba(34,52,254,0.1)", filter: "blur(64px)", width: 365, height: 365 }}
        aria-hidden="true"
      />

      <Container className="relative py-20">
        <div className="flex flex-wrap gap-x-[60px] gap-y-10 items-start">

          {/* Left column */}
          <div className="flex-1 min-w-[312px] flex flex-col gap-6">
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-4">
                {/* Number + label row */}
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: font,
                      fontSize: 48,
                      fontWeight: 400,
                      lineHeight: 1.2,
                      backgroundImage: "linear-gradient(129deg, #2B7FFF 0%, #00D3F3 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    01
                  </span>
                  <div
                    className="inline-flex items-center rounded-lg px-4 py-2"
                    style={{
                      background: "rgba(43,127,255,0.1)",
                      border: "1px solid rgba(43,127,255,0.2)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Robotics</span>
                  </div>
                </div>

                {/* Title + subtitle */}
                <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, color: "#fff" }}>
                  Embodied &amp; Humanoid Robotic Solution
                </h2>
                <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                  Humanoid robotics deployment with workflow integration.
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
                  <p style={{ fontFamily: font, fontSize: 16, color: "#00BAF2", lineHeight: 1.5 }}>What it is</p>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                    End-to-end enablement for humanoid robotics pilots and deployments: readiness planning, SOPs, training, integration, and scale playbooks.
                  </p>
                </div>

                {/* Check items */}
                <div className="flex flex-col gap-2">
                  <CheckItem text="Labor efficiency and throughput improvement" />
                  <CheckItem text="SOP-driven consistency and reduced variance" />
                  <CheckItem text="Safety/governance and service readiness" />
                  <CheckItem text="Rollout readiness for scaling" />
                </div>

                {/* CTA button */}
                <a
                  href="#"
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
                  Explore Robotics <ChevronRight />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right column — photo */}
          <FadeUp trigger="scroll" delay={0.15} className="flex-1 min-w-[312px]">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                height: 604,
                boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgContainer} alt="Humanoid robot working alongside a human engineer" className="size-full object-cover" />
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
