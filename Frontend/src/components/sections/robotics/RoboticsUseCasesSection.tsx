"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

interface Robot {
  name: string;
  header_image?: string;
  title?: string;
  description?: string;
  video_thumb?: string;
  feature_icons?: string[];
  video_thumb_2?: string;
  specs?: { label: string; value: string }[];
  features?: { title: string; items: string[]; feature_image?: string }[];
  note?: string;
}

interface UseCasesContent {
  robots?: Robot[];
}

const DEFAULT_ROBOTS: Robot[] = [
  {
    name: "AGIBOT X2 ULTRA",
    title: "Embodied AI & Humanoid Robotic Solution",
    description: "An intelligent humanoid robot with advanced capabilities in movement, interaction, and environmental awareness. Designed for versatile applications across multiple industries, it is suitable for offices, shopping malls, retail stores, exhibitions, or educational and scientific environments. The robot also supports various customization options to extend its capabilities for different use cases.",
    feature_icons: ["/images/feature-icon-1.svg", "/images/feature-icon-2.svg"],
    specs: [
      { label: "Height / Weight / Arm Payload", value: "131 cm / 37 kg / 3 kg" },
      { label: "Battery", value: "1 hour charging / up to 2 hours usage per cycle" },
      { label: "Intelligent Perception", value: "RGBD Camera + RGB Camera + Interaction Camera + LiDAR" },
      { label: "Processing Unit", value: "High-performance NVIDIA Orin NX 16GB" },
      { label: "Interaction Capability", value: "Supports interactive responses" },
      { label: "Degrees of Freedom (DOF)", value: "Full body: 31 / Arms: 7" },
    ],
    features: [
      {
        title: "Entertainment & Commercial Performance",
        items: [
          "Supports various activities such as TikTok dancing, drumming, and electric guitar playing",
          "Enables synchronized group performances with multiple robots",
        ],
      },
      {
        title: "Automatic Presentation & Interaction",
        items: [
          "Welcomes guests, guides visitors, and provides intelligent responses",
          "Recognizes faces and initiates conversations automatically",
          "Demonstrates over 30 pre-programmed actions with diverse assembly configurations",
          "Adjustable voice system, facial expressions, and flexible motion control",
        ],
      },
    ],
    note: "Recommended operation time: 7\u20138 minutes per session, with a rest period of 20 minutes.",
  },
  {
    name: "AGIBOT D1 EDU",
    title: "Embodied AI & Humanoid Robotic Solution",
    description: "A compact, fast, and highly agile robot designed for dynamic environments. It features a self-learning motion system, allowing it to adapt to various terrains. Capable of operating efficiently across different conditions, it supports continuous development and full customization.",
    feature_icons: ["/images/feature-icon-d1-1.svg", "/images/feature-icon-d1-2.svg", "/images/feature-icon-d1-3.svg", "/images/feature-icon-d1-4.svg"],
    specs: [
      { label: "Weight", value: "15 kg" },
      { label: "Maximum Payload", value: "8 kg" },
      { label: "Battery", value: "1 hour charging / up to 2 hours usage" },
      { label: "Step Climbing Ability", value: "> 16 cm" },
      { label: "Maximum Speed", value: "3.7 m/s" },
      { label: "Maximum Jump Height", value: "35 cm" },
    ],
    features: [
      {
        title: "AI-Enhanced Learning",
        items: ["Capable of navigating complex environments such as uneven terrain and stairs, with strong balance and anti-tipping capabilities."],
      },
      {
        title: "High-Performance Power System",
        items: ["Advanced joint system with industry-leading performance, delivering up to 2 kW/kg power density for exceptional mobility."],
      },
      {
        title: "Dynamic Mobility",
        items: ["Lightweight design combined with high agility, enabling flexible movement in constrained and complex environments."],
      },
      {
        title: "Expandable & Customizable",
        items: ["Equipped with standard expansion interfaces to support secondary development and personalized customization."],
      },
    ],
    note: "It is recommended to allow the robot to rest after extended operation (approximately 30 minutes).",
  },
  {
    name: "A2 ULTRA",
    title: "Embodied AI & Humanoid Robotic Solution",
    description: "A large-scale humanoid robot designed for full commercial deployment in industrial environments. It meets international certification standards including CR, CE-MD, CE-RED, and FCC, and has already been deployed in more than 20 leading companies worldwide.",
    feature_icons: ["/images/feature-icon-a2-1.svg", "/images/feature-icon-a2-2.svg"],
    specs: [
      { label: "Height / Weight", value: "169 cm / 69 kg" },
      { label: "Walking Speed", value: "0.8 m/s" },
      { label: "Battery", value: "1 hour charging / up to 3 hours usage per cycle" },
      { label: "Perception System", value: "LiDAR + Fisheye Camera + RGBD Camera + RGB Camera" },
      { label: "Processing Unit", value: "High-performance NVIDIA Jetson Orin" },
      { label: "Intelligent System", value: "Intelligent interaction with built-in skill package" },
      { label: "Degrees of Freedom", value: "40 (Arms: 7 / Legs: 6 / Hands: 6)" },
    ],
    features: [
      {
        title: "Professional Reception & Service Assistant",
        items: [
          "Provides intelligent greetings, VIP services, and guided assistance",
          "Recognizes faces, delivers personalized greetings, and can serve drinks",
          "Supports over 10 facial expressions and more than 100 motion combinations",
        ],
      },
      {
        title: "Brand Promotion & Event Hosting",
        items: [
          "Customizable appearance, personality, and voice interaction",
          "Supports brand promotion and social media content creation",
          "Capable of remembering faces and engaging in interactive communication",
        ],
      },
    ],
  },
  {
    name: "AGIBOT G2",
    title: "Embodied AI & Humanoid Robotic Solution",
    description: "Industrial-grade intelligent humanoid robot with fully modular structure and 100% humanoid form. Powered by the intelligent Genie RL system for rapid deployment.",
    feature_icons: ["/images/feature-icon-g2-1.svg", "/images/feature-icon-g2-2.svg", "/images/feature-icon-g2-3.svg", "/images/feature-icon-g2-4.svg"],
    specs: [
      { label: "Height / Weight", value: "185 cm" },
      { label: "Power System", value: "Single charge usage over 2 hours" },
      { label: "Performance", value: "Each arm can handle up to 5 kg" },
      { label: "Battery Life", value: "Up to 4 hours (dual batteries, 1652 Wh)" },
      { label: "Degrees of Freedom", value: "Total 26 (7 per arm, 5 per leg, 4 waist, 3 head)" },
      { label: "Processing Unit", value: "NVIDIA Jetson T5000, AI up to 2070 TFLOPS" },
      { label: "Sensor System", value: "2x 3D LiDAR, 3x Fisheye, 3x RGB-D, 1x Stereo" },
      { label: "Durability", value: "Dust and water resistance IP42" },
    ],
    features: [
      {
        title: "Industrial-Grade Durability",
        items: ["Full 100% humanoid structure with IP42 protection, suitable for real industrial environments."],
      },
      {
        title: "High Precision",
        items: ["Advanced force control enabling assembly precision at millimeter-level."],
      },
      {
        title: "Ready-to-Deploy System",
        items: ["Pre-trained AI model with Genie RL for quick adaptation to production lines."],
      },
      {
        title: "Human-Like Intelligent Interaction",
        items: ["Natural conversation and real-time interaction, including eye-gaze tracking and facial expressions."],
      },
    ],
  },
];

/** Feature icon — SVG files from Figma per robot, fallback to generic gradient box */
function FeatureIcon({ src }: { src?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="shrink-0" width={40} height={40} />
    );
  }
  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M15 6.5L7 14.5L3 10.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function RoboticsUseCasesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as UseCasesContent;
  const rawRobots = c.robots ?? DEFAULT_ROBOTS;
  const robots: Robot[] = Array.isArray(rawRobots) ? rawRobots : Object.values(rawRobots);
  if (robots.length === 0) return null;

  return (
    <>
      {/* ── Tab Selector (anchor links) ── */}
      <section style={{ background: "#070E24" }}>
        <div
          className="mx-auto max-sm:!px-4"
          style={{ maxWidth: 1440, padding: "40px 112px 0" }}
        >
          <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center">
              <div
                className="inline-flex items-center p-2 rounded-full flex-wrap gap-1 justify-center max-sm:!rounded-2xl max-sm:!gap-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                }}
              >
                {robots.map((r, i) => (
                  <a
                    key={i}
                    href={`#robot-${i}`}
                    className="max-sm:!text-xs max-sm:!px-3 max-sm:!py-2"
                    style={{
                      fontFamily: font,
                      fontSize: 16,
                      color: i === 0 ? "#fff" : "#90A1B9",
                      padding: "12px 24px",
                      borderRadius: 99,
                      border: "none",
                      cursor: "pointer",
                      background: i === 0 ? "#2D7AE8" : "transparent",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                    }}
                  >
                    {r.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Robot Use Cases (displayed sequentially) ── */}
      {robots.map((robot, robotIdx) => {
        const specs: { label: string; value: string }[] = Array.isArray(robot.specs) ? robot.specs : robot.specs ? Object.values(robot.specs) : [];
        const features: { title: string; items: string[]; feature_image?: string }[] = Array.isArray(robot.features) ? robot.features : robot.features ? Object.values(robot.features) : [];
        const featureImages = features.filter((f) => f.feature_image).map((f) => f.feature_image!);
        const leftImage = featureImages[0] || "";
        const rightImage = featureImages[1] || "";

        return (
          <div key={robotIdx} id={`robot-${robotIdx}`}>

      {/* ── Header with BG image ── */}
      <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
        {robot.header_image && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wpImageUrl(robot.header_image)} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, rgba(7,14,36,0) 0%, rgba(7,14,36,1) 100%)" }} />
          </div>
        )}
        <div
          className="relative max-sm:!px-4 max-sm:!py-10"
          style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 112px" }}
        >
          <div className="flex flex-wrap items-end gap-6 max-sm:!flex-col max-sm:!items-start max-sm:!gap-8">
            {/* Content — left column max ~500px, right side is bg image showing through */}
            <div className="flex flex-col gap-6 max-sm:w-full" style={{ maxWidth: 500 }}>
              {/* Logo pill — white rounded pill with AIAIAI logo SVG (matches Figma: padding 12px 24px, borderRadius 24px, white bg) */}
              <FadeUp trigger="scroll" delay={0}>
                <div
                  className="inline-flex items-center self-start"
                  style={{ background: "#fff", borderRadius: 24, padding: "12px 24px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/aiaiai-logo-dark.svg" alt="AIAIAI" style={{ height: 19, width: 120, display: "block" }} />
                </div>
              </FadeUp>

              <FadeUp trigger="scroll" delay={0.03}>
                <h2
                  className="max-sm:!text-[28px] max-sm:!leading-[1.3]"
                  style={{
                    fontFamily: font,
                    fontSize: 48,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: "#fff",
                    textShadow: "0px 2px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  {robot.title}
                </h2>
              </FadeUp>
              <FadeUp trigger="scroll" delay={0.06}>
                <p style={{ fontFamily: font, fontSize: 16, color: "#E8EEF8", lineHeight: 1.5 }}>
                  {robot.description}
                </p>
              </FadeUp>

              {/* Video thumbnails */}
              {robot.video_thumb && (
                <FadeUp trigger="scroll" delay={0.09}>
                  <div className="flex gap-2.5 max-sm:flex-col max-sm:w-full">
                    <div
                      className="relative rounded-3xl overflow-hidden max-sm:w-full max-sm:h-[180px]"
                      style={{ width: 356, height: 200, boxShadow: "0px 4px 12px rgba(0,119,255,0.5)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={wpImageUrl(robot.video_thumb)} alt="Video" className="size-full object-cover" />
                    </div>
                    {robot.video_thumb_2 && (
                      <div
                        className="relative rounded-3xl overflow-hidden max-sm:hidden"
                        style={{ width: 120, height: 200, boxShadow: "0px 4px 12px rgba(0,119,255,0.5)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={wpImageUrl(robot.video_thumb_2)} alt="Video" className="size-full object-cover" />
                      </div>
                    )}
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Specifications ── */}
      {specs.length > 0 && (
        <section style={{ background: "#070E24" }}>
          <div
            className="mx-auto max-sm:!px-4 max-sm:!py-6"
            style={{ maxWidth: 1440, padding: "40px 112px" }}
          >
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-6">
                <h3 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>Specifications:</h3>
                {/* Table-style layout like Figma */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {specs.map((spec, i) => {
                    const s = typeof spec === "object" ? spec : { label: "", value: String(spec) };
                    const hasAltBg = i % 2 === 0;
                    return (
                      <div
                        key={i}
                        className="flex max-sm:flex-col"
                        style={{ background: hasAltBg ? "rgba(255,255,255,0.04)" : "transparent" }}
                      >
                        <div className="w-1/2 max-sm:!w-full shrink-0 px-6 py-2 max-sm:!py-2 max-sm:!pb-0">
                          <span style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>{s.label}</span>
                        </div>
                        <div className="w-1/2 max-sm:!w-full px-6 py-2 max-sm:!py-2">
                          <span style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>{s.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── Key Features ── */}
      {features.length > 0 && (
        <section style={{ background: "#070E24" }}>
          {/* Gradient top border */}
          <div style={{ height: 1, background: "linear-gradient(90deg, rgba(43,127,255,0) 0%, rgba(43,127,255,0.5) 50%, rgba(43,127,255,0) 100%)" }} />

          <div
            className="mx-auto max-sm:!px-4 max-sm:!py-6"
            style={{ maxWidth: 1440, padding: "40px 112px 80px" }}
          >
            <div className="flex flex-wrap gap-6 items-start max-sm:!flex-col">
              {/* Left column — heading + feature list + note */}
              <div className="flex-1 min-w-[300px] flex flex-col gap-10 max-sm:min-w-0 max-sm:w-full">
                <FadeUp trigger="scroll" delay={0}>
                  <h3 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>Key Features:</h3>
                </FadeUp>

                {/* Feature items list */}
                <div className="flex flex-col gap-8">
                  {features.map((feature, i) => {
                    const featureItems: string[] = Array.isArray(feature.items) ? feature.items : feature.items ? Object.values(feature.items) : [];
                    return (
                      <FadeUp key={i} trigger="scroll" delay={i * 0.06}>
                        <div className="flex gap-6 items-start">
                          <FeatureIcon src={robot.feature_icons?.[i] || "/images/feature-icon-1.svg"} />
                          <div className="flex flex-col gap-2">
                            <h4 style={{ fontFamily: font, fontSize: 20, fontWeight: 400, lineHeight: 1.4, color: "#fff" }}>{feature.title}</h4>
                            <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEEA", lineHeight: 1.5, whiteSpace: "pre-line" }}>
                              {featureItems.join("\n")}
                            </p>
                          </div>
                        </div>
                      </FadeUp>
                    );
                  })}
                </div>

                {/* Note — below features on the left */}
                {robot.note && (
                  <FadeUp trigger="scroll" delay={0.2}>
                    <div
                      className="px-6 py-3 rounded-2xl"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5 }}>
                        Note: {robot.note}
                      </p>
                    </div>
                  </FadeUp>
                )}
              </div>

              {/* Right column — 2 feature images stacked (width 493px) */}
              <div className="flex flex-col gap-6 max-sm:w-full" style={{ width: 493, flexShrink: 0 }}>
                {featureImages.map((img, i) => (
                  <FadeUp key={i} trigger="scroll" delay={0.1 + i * 0.05}>
                    <div className="relative rounded-3xl overflow-hidden w-full" style={{ height: 330 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={wpImageUrl(img)} alt="" className="size-full object-cover" />
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

          </div>
        );
      })}
    </>
  );
}
