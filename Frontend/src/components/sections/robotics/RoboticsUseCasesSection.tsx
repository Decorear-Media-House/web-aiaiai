"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5" />
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

  const specs: { label: string; value: string }[] = Array.isArray(robot.specs) ? robot.specs : robot.specs ? Object.values(robot.specs) : [];
  const features: { title: string; items: string[]; feature_image?: string }[] = Array.isArray(robot.features) ? robot.features : robot.features ? Object.values(robot.features) : [];

  return (
    <>
      {/* Tab Selector */}
      <section className="relative" style={{ background: "#070E24" }}>
        <Container className="py-10 max-sm:py-6">
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-10 items-center max-sm:gap-6">
              {/* Pill tab switcher */}
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
                    className="transition-colors max-sm:text-sm max-sm:px-4 max-sm:py-2"
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
                    }}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Header with background image */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 300 }}
      >
        {robot.header_image && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wpImageUrl(robot.header_image)} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(7,14,36,0) 0%, rgba(7,14,36,1) 100%)" }} />
          </div>
        )}
        <Container className="relative py-20 max-sm:py-10">
          <div className="max-w-[600px] flex flex-col gap-6">
            <FadeUp trigger="scroll" delay={0}>
              <h2 className="max-sm:text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                {robot.title}
              </h2>
            </FadeUp>
            <FadeUp trigger="scroll" delay={0.05}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                {robot.description}
              </p>
            </FadeUp>
            {robot.video_thumb && (
              <FadeUp trigger="scroll" delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden w-[356px] h-[200px] max-sm:w-full max-sm:h-[180px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={wpImageUrl(robot.video_thumb)} alt="Video preview" className="size-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7L8 5z" /></svg>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </Container>
      </section>

      {/* Specifications */}
      {specs.length > 0 && (
        <section style={{ background: "#070E24" }}>
          <Container className="py-10 max-sm:py-6">
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-6">
                <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: "#fff" }}>Specifications</h3>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 p-4 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{typeof spec === "object" ? spec.label : ""}</span>
                      <span style={{ fontFamily: font, fontSize: 16, color: "#fff" }}>{typeof spec === "object" ? spec.value : String(spec)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <section style={{ background: "#070E24", borderTop: "1px solid rgba(43,127,255,0.15)" }}>
          <Container className="py-10 max-sm:py-6">
            <div className="flex flex-col gap-8">
              <FadeUp trigger="scroll" delay={0}>
                <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: "#fff" }}>Key Features</h3>
              </FadeUp>
              <div className="flex flex-wrap gap-6">
                {features.map((feature, i) => {
                  const featureItems: string[] = Array.isArray(feature.items) ? feature.items : feature.items ? Object.values(feature.items) : [];
                  return (
                    <FadeUp key={i} trigger="scroll" delay={i * 0.08} className="flex-1 min-w-[280px]">
                      <div
                        className="rounded-2xl overflow-hidden h-full flex flex-col"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {/* Feature image */}
                        {feature.feature_image && (
                          <div className="relative h-[200px] max-sm:h-[150px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={wpImageUrl(feature.feature_image)} alt="" className="size-full object-cover" />
                          </div>
                        )}
                        <div className="p-6 flex flex-col gap-4">
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
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
              {robot.note && (
                <FadeUp trigger="scroll" delay={0.2}>
                  <p className="italic" style={{ fontFamily: font, fontSize: 14, color: "#8099BE", lineHeight: 1.5 }}>
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
