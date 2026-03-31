"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

function LightbulbIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 1C4.79 1 3 2.79 3 5c0 1.48.81 2.77 2 3.46V10h4V8.46C10.19 7.77 11 6.48 11 5c0-2.21-1.79-4-4-4z" fill="#4A99F5" />
      <path d="M5 11h4M5.5 12.5h3" stroke="#4A99F5" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

const PRINCIPLES = [
  { num: "01", label: "People and processes" },
  { num: "02", label: "Governance and controls" },
  { num: "03", label: "Data and integration" },
  { num: "04", label: "Monitoring and continuous improvement" },
] as const;

export default function AboutPhilosophySection() {
  return (
    <section style={{ background: "#102050" }}>
      <Container className="py-[60px]">
        <div className="flex flex-wrap gap-6 items-start">

          {/* Left — label + heading + subtitle */}
          <div className="flex flex-col gap-4 min-w-[286px]" style={{ maxWidth: 286 }}>
            <FadeUp trigger="scroll" delay={0}>
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <LightbulbIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Philosophy</span>
              </div>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.1}>
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                How we{" "}
                <span style={{ color: "#4A99F5" }}>Think</span>
              </h2>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.2}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                AI is not just a model. AI is a system inside operations.
              </p>
            </FadeUp>
          </div>

          {/* Right — intro text + 2×2 cards */}
          <div className="flex flex-1 min-w-[312px] flex-col gap-6">
            <FadeUp trigger="scroll" delay={0.1}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                {`That's why we focus on delivery patterns that work in real organizations — not just technically impressive prototypes.`}
              </p>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {PRINCIPLES.map((p) => (
                  <div
                    key={p.num}
                    className="flex flex-1 min-w-[312px] items-center gap-3 rounded-xl px-[17px] py-[9px]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ fontFamily: font, fontSize: 24, color: "#4A99F5", lineHeight: 1.4, flexShrink: 0 }}>
                      {p.num}
                    </span>
                    <span style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
