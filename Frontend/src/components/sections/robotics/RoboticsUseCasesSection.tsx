"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5" />
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7L8 5z" /></svg>
      </div>
    </div>
  );
}

interface Robot {
  name: string;
  header_image?: string;
  title?: string;
  description?: string;
  video_thumb?: string;
  specs?: { label: string; value: string }[];
  features?: { title: string; items: string[]; feature_image?: string }[];
  note?: string;
}

interface UseCasesContent {
  robots?: Robot[];
}

const DEFAULT_ROBOTS: Robot[] = [
  { name: "AGIBOT X2 ULTRA", title: "Embodied AI & Humanoid Robotic Solution", description: "An intelligent humanoid robot with advanced capabilities." },
  { name: "AGIBOT D1 EDU", title: "Embodied AI & Humanoid Robotic Solution", description: "A compact, fast, and highly agile robot." },
  { name: "A2 ULTRA", title: "Embodied AI & Humanoid Robotic Solution", description: "A large-scale humanoid robot for commercial deployment." },
  { name: "AGIBOT G2", title: "Embodied AI & Humanoid Robotic Solution", description: "Industrial-grade intelligent humanoid robot." },
];

export default function RoboticsUseCasesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as UseCasesContent;
  const rawRobots = c.robots ?? DEFAULT_ROBOTS;
  const robots: Robot[] = Array.isArray(rawRobots) ? rawRobots : Object.values(rawRobots);
  const [activeTab, setActiveTab] = useState(0);
  const robot = robots[activeTab] || robots[0];

  if (!robot) return null;

  const specs: { label: string; value: string }[] = Array.isArray(robot.specs) ? robot.specs : robot.specs ? Object.values(robot.specs) : [];
  const features: { title: string; items: string[]; feature_image?: string }[] = Array.isArray(robot.features) ? robot.features : robot.features ? Object.values(robot.features) : [];

  return (
    <>
      {/* ── Tab Selector ── */}
      <section style={{ background: "#070E24" }}>
        <Container className="pb-6 pt-0">
          <div className="flex justify-center">
            <div
              className="inline-flex items-center p-2 rounded-full flex-wrap gap-1 justify-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {robots.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="max-sm:text-sm max-sm:px-4 max-sm:py-2"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: activeTab === i ? "#fff" : "#90A1B9",
                    padding: "12px 24px",
                    borderRadius: 99,
                    border: "none",
                    cursor: "pointer",
                    background: activeTab === i ? "#2D7AE8" : "transparent",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s",
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Header with BG image ── */}
      <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
        {robot.header_image && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wpImageUrl(robot.header_image)} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(7,14,36,0) 0%, rgba(7,14,36,1) 100%)" }} />
          </div>
        )}
        <div className="relative" style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 112px" }}>
          <div className="flex gap-20 items-start max-lg:flex-col max-sm:gap-8" style={{ maxWidth: 1216 }}>
            {/* Left — text */}
            <div className="flex-1 min-w-[300px] flex flex-col gap-6 max-sm:min-w-0">
              <FadeUp trigger="scroll" delay={0}>
                <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  {robot.title}
                </h2>
              </FadeUp>
              <FadeUp trigger="scroll" delay={0.05}>
                <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                  {robot.description}
                </p>
              </FadeUp>
            </div>
            {/* Right — video thumbnails */}
            {robot.video_thumb && (
              <FadeUp trigger="scroll" delay={0.1} className="shrink-0 max-sm:w-full">
                <div className="flex gap-4 max-sm:flex-col">
                  <div className="relative rounded-2xl overflow-hidden w-[356px] h-[200px] max-sm:w-full max-sm:h-[180px]" style={{ boxShadow: "4px 4px 32px rgba(0,119,255,0.3)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={wpImageUrl(robot.video_thumb)} alt="Video" className="size-full object-cover" />
                    <PlayButton />
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      {specs.length > 0 && (
        <section style={{ background: "#070E24" }}>
          <Container className="py-10 max-sm:py-6">
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-6">
                <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: "#fff" }}>Specifications:</h3>
                {/* Table-style layout like Figma */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {specs.map((spec, i) => {
                    const s = typeof spec === "object" ? spec : { label: "", value: String(spec) };
                    return (
                      <div
                        key={i}
                        className="flex max-sm:flex-col"
                        style={{ borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                      >
                        <div className="w-[300px] max-sm:w-full shrink-0 px-6 py-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                          <span style={{ fontFamily: font, fontSize: 14, color: "#4A99F5", lineHeight: 1.5 }}>{s.label}</span>
                        </div>
                        <div className="flex-1 px-6 py-4">
                          <span style={{ fontFamily: font, fontSize: 14, color: "#fff", lineHeight: 1.5 }}>{s.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>
      )}

      {/* ── Key Features ── */}
      {features.length > 0 && (
        <section
          style={{ background: "#070E24" }}
          className="border-t"
        >
          {/* Gradient top border */}
          <div style={{ height: 1, background: "linear-gradient(90deg, rgba(43,127,255,0) 0%, rgba(43,127,255,0.5) 50%, rgba(43,127,255,0) 100%)" }} />

          <Container className="py-10 max-sm:py-6">
            <div className="flex flex-col gap-8">
              <FadeUp trigger="scroll" delay={0}>
                <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: "#fff" }}>Key Features:</h3>
              </FadeUp>

              {/* Features grid — 2 columns with images */}
              <div className="flex flex-wrap gap-6">
                {features.map((feature, i) => {
                  const featureItems: string[] = Array.isArray(feature.items) ? feature.items : feature.items ? Object.values(feature.items) : [];
                  return (
                    <FadeUp key={i} trigger="scroll" delay={i * 0.08} className="flex-1 min-w-[280px] max-sm:min-w-full">
                      <div className="flex flex-col gap-4">
                        {/* Feature image */}
                        {feature.feature_image && (
                          <div className="relative rounded-2xl overflow-hidden h-[240px] max-sm:h-[180px]" style={{ boxShadow: "4px 4px 24px rgba(0,0,0,0.3)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={wpImageUrl(feature.feature_image)} alt="" className="size-full object-cover" />
                          </div>
                        )}
                        {/* Title + items */}
                        <h4 style={{ fontFamily: font, fontSize: 20, fontWeight: 400, color: "#fff" }}>{feature.title}</h4>
                        <div className="flex flex-col gap-2">
                          {featureItems.map((item, j) => (
                            <div key={j} className="flex items-start gap-2">
                              <CheckCircleIcon />
                              <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEEA", lineHeight: 1.5 }}>{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>

              {/* Note */}
              {robot.note && (
                <FadeUp trigger="scroll" delay={0.2}>
                  <p style={{ fontFamily: font, fontSize: 14, color: "#8099BE", lineHeight: 1.5, fontStyle: "italic" }}>
                    Note: {robot.note}
                  </p>
                </FadeUp>
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
