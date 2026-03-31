"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/services/
const imgContainer = "https://www.figma.com/api/mcp/asset/baf34762-cdce-4268-9617-67e35d243f53";
const imgCheckCircle = "https://www.figma.com/api/mcp/asset/6d96eedf-e220-4781-aec5-be8e42d6564e";

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

export default function ServicesSecuritySection() {
  return (
    <section className="relative" style={{ background: "#070E24" }}>
      {/* Green glow blobs */}
      <div
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{ background: "rgba(21,252,60,0.1)", filter: "blur(64px)", width: 400, height: 400 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 rounded-full"
        style={{ background: "rgba(21,252,60,0.1)", filter: "blur(64px)", width: 365, height: 365 }}
        aria-hidden="true"
      />

      <Container className="relative py-20">
        <div className="flex flex-wrap gap-x-[60px] gap-y-10 items-start">

          {/* Left — photo */}
          <FadeUp trigger="scroll" delay={0.1} className="flex-1 min-w-[312px]">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                height: 540,
                boxShadow: "4px 4px 32px 0px rgba(21,252,60,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgContainer} alt="AI security operations center" className="size-full object-cover" />
            </div>
          </FadeUp>

          {/* Right — content */}
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
                      backgroundImage: "linear-gradient(to right, #00bc7d, #00bba7)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    02
                  </span>
                  <div
                    className="inline-flex items-center rounded-lg px-4 py-2"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                    }}
                  >
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff" }}>Security</span>
                  </div>
                </div>

                <h2 style={{ fontFamily: font, fontSize: 48, fontWeight: 400, lineHeight: 1.2, color: "#fff" }}>
                  AI Security Platform
                </h2>
                <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                  AI video analytics for security operations and asset protection.
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
                  <p style={{ fontFamily: font, fontSize: 16, color: "#00BC7D", lineHeight: 1.5 }}>What it is</p>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                    Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.
                  </p>
                </div>

                {/* Check items */}
                <div className="flex flex-col gap-2">
                  <CheckItem text="Improved detection and response" />
                  <CheckItem text="Reduced loss risk and better evidence capture" />
                  <CheckItem text="Operational visibility across sites" />
                  <CheckItem text="Reduced monitoring cost through prioritization" />
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
                  Explore Security Platform <ChevronRight />
                </a>
              </div>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
