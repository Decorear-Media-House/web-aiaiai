"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/services/
const imgContainer = "https://www.figma.com/api/mcp/asset/ae90c667-d8ae-46a0-ae24-c2c37731f76c";
const imgCheckCircle = "https://www.figma.com/api/mcp/asset/75b5bada-1616-4ded-bab2-e09c3309b2e0";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgCheckCircle} alt="" width={16} height={16} className="shrink-0 mt-0.5" />
      <p style={{ fontFamily: font, fontSize: 16, color: "#E8EEF8", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

export default function ServicesAISolutionSection() {
  return (
    <section className="relative" style={{ background: "#1E2E48" }}>
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

      <Container className="relative py-20">
        <div className="flex flex-wrap gap-x-[60px] gap-y-10 items-center">

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
                    03
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
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff" }}>AI Solution Partner</span>
                  </div>
                </div>

                <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, color: "#fff" }}>
                  AI Solution Partner
                </h2>
                <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                  Your AI development partner — from roadmap to production.
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
                    A partner-led engagement that combines AI consulting and implementation support to deliver PoC/MVP and deploy AI into real operations.
                  </p>
                </div>

                {/* Outcomes enabled */}
                <div
                  className="flex flex-col gap-4 pb-6"
                  style={{ borderBottom: "1px solid #4A6080" }}
                >
                  <p style={{ fontFamily: font, fontSize: 14, color: "#8099BE", lineHeight: 1.5 }}>Outcomes enabled</p>
                  <div className="flex flex-col gap-2">
                    <CheckItem text="Labor efficiency and throughput improvement" />
                    <CheckItem text="SOP-driven consistency and reduced variance" />
                    <CheckItem text="Safety/governance and service readiness" />
                    <CheckItem text="Rollout readiness for scaling" />
                  </div>
                </div>

                {/* Common use-case categories */}
                <div className="flex flex-col gap-4">
                  <p style={{ fontFamily: font, fontSize: 14, color: "#8099BE", lineHeight: 1.5 }}>Common use-case categories</p>
                  <div className="flex flex-col gap-2">
                    <CheckItem text="Workflow automation with approvals" />
                    <CheckItem text="Decision support dashboards" />
                    <CheckItem text="Classification/triage at scale" />
                    <CheckItem text="AI integration into existing systems" />
                  </div>
                </div>

                {/* CTA */}
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
                  Explore AI Solution Partner <ChevronRight />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right — photo */}
          <FadeUp trigger="scroll" delay={0.15} className="flex-1 min-w-[312px]">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                height: 806,
                boxShadow: "4px 4px 32px 0px rgba(153,92,77,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgContainer} alt="AI solution partner team meeting" className="size-full object-cover" />
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
