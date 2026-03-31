"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local assets in /public/images/
const CEO_PHOTO = "https://www.figma.com/api/mcp/asset/dbb8c075-bc3d-4c0b-ad1d-0cdb181eb36f";
const CTO_PHOTO = "https://www.figma.com/api/mcp/asset/7977f311-308b-45f0-8dc8-6c16b43a662d";
const COO_PHOTO = "https://www.figma.com/api/mcp/asset/bcd98651-8b65-41a1-a65c-d4a09e4546df";

const ROYAL_SHINE = "linear-gradient(148deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

const CEO_TAGS = ["AI Strategy", "AIEAT President", "Robotics"] as const;

function CardGlassFooter({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div
      className="w-full p-8"
      style={{
        background: "rgba(7,14,36,0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}

export default function AboutTeamSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,153,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,153,245,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Top center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 size-[600px] rounded-full"
        aria-hidden="true"
        style={{ background: "rgba(21,93,252,0.1)", filter: "blur(96px)" }}
      />

      <Container className="relative py-20">
        <div className="flex flex-col gap-12 items-center">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[596px]">
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
                </svg>
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Our People</span>
              </div>

              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                Management{" "}
                <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Team
                </span>
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                Experienced leaders bringing together AI strategy, engineering depth, and operational excellence.
              </p>
            </div>
          </FadeUp>

          {/* 3-column card grid */}
          <div className="grid w-full gap-6 max-lg:grid-cols-1" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>

            {/* CEO */}
            <FadeUp trigger="scroll" delay={0.1}>
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col h-full"
                style={{ border: "1px solid #1E2E48" }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: 300 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CEO_PHOTO} alt="Dr. Chanwit Boonchuay" className="absolute inset-0 size-full object-cover" />
                </div>
                {/* Footer */}
                <CardGlassFooter>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        CEO
                      </span>
                      <span style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>
                        Dr. Chanwit Boonchuay
                      </span>
                    </div>
                    <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>
                      President of the AI Entrepreneur Association of Thailand (AIEAT). With decades of experience in AI strategy and implementation, Dr. Chanwit leads Ai-Ai-Ai&apos;s vision of making AI adoption practical and production-ready across Southeast Asia.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {CEO_TAGS.map((tag) => (
                        <div
                          key={tag}
                          className="inline-flex items-center rounded-lg px-4 py-2"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <span style={{ fontFamily: font, fontSize: 12, color: "#fff" }}>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardGlassFooter>
              </div>
            </FadeUp>

            {/* CTO */}
            <FadeUp trigger="scroll" delay={0.15}>
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col"
                style={{ border: "1px solid #1E2E48", height: 584 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CTO_PHOTO} alt="Sivarat Malapet" className="absolute inset-0 size-full object-cover" />
                <div className="mt-auto relative">
                  <CardGlassFooter centered>
                    <div className="flex flex-wrap items-baseline gap-2 justify-center">
                      <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        CTO
                      </span>
                      <span style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>
                        Sivarat Malapet
                      </span>
                    </div>
                  </CardGlassFooter>
                </div>
              </div>
            </FadeUp>

            {/* COO */}
            <FadeUp trigger="scroll" delay={0.2}>
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col"
                style={{ border: "1px solid #1E2E48", height: 584 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={COO_PHOTO} alt="Keerati Luengwattanakit" className="absolute inset-0 size-full object-cover" />
                <div className="mt-auto relative">
                  <CardGlassFooter centered>
                    <div className="flex flex-wrap items-baseline gap-2 justify-center">
                      <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        COO
                      </span>
                      <span style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>
                        Keerati Luengwattanakit
                      </span>
                    </div>
                  </CardGlassFooter>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </Container>
    </section>
  );
}
