"use client";

import { useState, useCallback, useEffect } from "react";
import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE =
  "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/** Decode HTML entities from WordPress (e.g. &amp; → &) */
const decode = (s: string) =>
  s
    ?.replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#038;/g, "&") ?? "";

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div
        className="flex items-center justify-center"
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5.5 2.75L18.33 11L5.5 19.25V2.75Z" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}

function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity"
        style={{
          fontSize: 32,
          lineHeight: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close"
      >
        ✕
      </button>
      <video
        autoPlay
        controls
        playsInline
        className="max-w-[90vw] max-h-[85vh] rounded-2xl"
        style={{ boxShadow: "0 0 60px rgba(0,119,255,0.3)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

interface Robot {
  name: string;
  header_image?: string;
  title?: string;
  description?: string;
  video_thumb?: string;
  video_url?: string;
  feature_icons?: string[];
  video_thumb_2?: string;
  video_url_2?: string;
  specs?: { label: string; value: string }[];
  features?: { title: string; items: string[]; feature_image?: string }[];
  feature_images?: string[];
  note?: string;
}

interface UseCasesContent {
  robots?: Robot[];
}

const DEFAULT_ROBOTS: Robot[] = [
  {
    name: "AGIBOT X2 ULTRA",
    title: "Embodied AI & Humanoid Robotic Solution",
    description:
      "An intelligent humanoid robot with advanced capabilities in movement, interaction, and environmental awareness. Designed for versatile applications across multiple industries, it is suitable for offices, shopping malls, retail stores, exhibitions, or educational and scientific environments. The robot also supports various customization options to extend its capabilities for different use cases.",
    video_thumb: "/images/video-thumb-ai1.png",
    video_url: "/videos/ai1.mp4",
    video_thumb_2: "/images/video-thumb-ai2.png",
    video_url_2: "/videos/ai2.mp4",
    feature_icons: ["/images/feature-icon-1.svg", "/images/feature-icon-2.svg"],
    specs: [
      {
        label: "Height / Weight / Arm Payload",
        value: "131 cm / 37 kg / 3 kg",
      },
      {
        label: "Battery",
        value: "1 hour charging / up to 2 hours usage per cycle",
      },
      {
        label: "Intelligent Perception",
        value: "RGBD Camera + RGB Camera + Interaction Camera + LiDAR",
      },
      {
        label: "Processing Unit",
        value: "High-performance NVIDIA Orin NX 16GB",
      },
      {
        label: "Interaction Capability",
        value: "Supports interactive responses",
      },
      { label: "Degrees of Freedom (DOF)", value: "Full body: 31 / Arms: 7" },
    ],
    features: [
      {
        title: "Entertainment & Commercial Performance",
        items: [
          "· Supports various activities such as TikTok dancing, drumming, and electric guitar playing",
          "· Enables synchronized group performances with multiple robots",
        ],
      },
      {
        title: "Automatic Presentation & Interaction",
        items: [
          "· Welcomes guests, guides visitors, and provides intelligent responses",
          "· Recognizes faces and initiates conversations automatically",
          "· Demonstrates over 30 pre-programmed actions with diverse assembly configurations",
          "· Adjustable voice system, facial expressions, and flexible motion control",
        ],
      },
    ],
    note: "Recommended operation time: 7\u20138 minutes per session, with a rest period of 20 minutes.",
  },
  {
    name: "AGIBOT D1 EDU",
    title: "Embodied AI & Humanoid Robotic Solution",
    description:
      "A compact, fast, and highly agile robot designed for dynamic environments. It features a self-learning motion system, allowing it to adapt to various terrains. Capable of operating efficiently across different conditions, it supports continuous development and full customization.",
    feature_icons: [
      "/images/feature-icon-d1-1.svg",
      "/images/feature-icon-d1-2.svg",
      "/images/feature-icon-d1-3.svg",
      "/images/feature-icon-d1-4.svg",
    ],
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
        items: [
          "Capable of navigating complex environments such as uneven terrain and stairs, with strong balance and anti-tipping capabilities.",
        ],
      },
      {
        title: "High-Performance Power System",
        items: [
          "Advanced joint system with industry-leading performance, delivering up to 2 kW/kg power density for exceptional mobility.",
        ],
      },
      {
        title: "Dynamic Mobility",
        items: [
          "Lightweight design combined with high agility, enabling flexible movement in constrained and complex environments.",
        ],
      },
      {
        title: "Expandable & Customizable",
        items: [
          "Equipped with standard expansion interfaces to support secondary development and personalized customization.",
        ],
      },
    ],
    note: "It is recommended to allow the robot to rest after extended operation (approximately 30 minutes).",
  },
  {
    name: "A2 ULTRA",
    title: "Embodied AI & Humanoid Robotic Solution",
    description:
      "A large-scale humanoid robot designed for full commercial deployment in industrial environments. It meets international certification standards including CR, CE-MD, CE-RED, and FCC, and has already been deployed in more than 20 leading companies worldwide.",
    feature_icons: [
      "/images/feature-icon-a2-1.svg",
      "/images/feature-icon-a2-2.svg",
    ],
    specs: [
      { label: "Height / Weight", value: "169 cm / 69 kg" },
      { label: "Walking Speed", value: "0.8 m/s" },
      {
        label: "Battery",
        value: "1 hour charging / up to 3 hours usage per cycle",
      },
      {
        label: "Perception System",
        value: "LiDAR + Fisheye Camera + RGBD Camera + RGB Camera",
      },
      {
        label: "Processing Unit",
        value: "High-performance NVIDIA Jetson Orin",
      },
      {
        label: "Intelligent System",
        value: "Intelligent interaction with built-in skill package",
      },
      {
        label: "Degrees of Freedom",
        value: "40 (Arms: 7 / Legs: 6 / Hands: 6)",
      },
    ],
    features: [
      {
        title: "Professional Reception & Service Assistant",
        items: [
          "· Provides intelligent greetings, VIP services, and guided assistance for visitors",
          "· Recognizes faces, delivers personalized greetings, and can serve drinks or items",
          "· Supports over 10 facial expressions and more than 100 motion combinations",
        ],
      },
      {
        title: "Brand Promotion & Event Hosting",
        items: [
          "· Customizable appearance, personality, movement programs, and voice interaction",
          "· Supports brand promotion activities and social media content creation",
          "· Welcomes guests, guides visitors, and provides intelligent responses",
          "· Capable of remembering faces and engaging in interactive communication",
        ],
      },
    ],
  },
  {
    name: "AGIBOT G2",
    title: "Embodied AI & Humanoid Robotic Solution",
    description:
      "Upgrade your operations with Agibot G2, an industrial-grade intelligent humanoid robot (Industrial-Grade Interactive Embodied Operation Robot). Designed with a fully modular structure and 100% humanoid form, it supports flexible component assembly and is powered by the intelligent Genie RL system for rapid deployment. It offers advanced communication capabilities, facial expression display, assisted operations, and natural human-like interaction.",
    feature_icons: [
      "/images/feature-icon-g2-1.svg",
      "/images/feature-icon-g2-2.svg",
      "/images/feature-icon-g2-3.svg",
      "/images/feature-icon-g2-4.svg",
    ],
    specs: [
      { label: "Height / Weight", value: "185 cm" },
      { label: "Power System", value: "Single charge usage over 2 hours" },
      { label: "Performance", value: "Each arm can handle up to 5 kg" },
      {
        label: "Battery Life",
        value: "Up to 4 hours (dual batteries, 1652 Wh)",
      },
      {
        label: "Degrees of Freedom",
        value: "Total 26 (7 per arm, 5 per leg, 4 waist, 3 head)",
      },
      {
        label: "Processing Unit",
        value: "NVIDIA Jetson T5000, AI up to 2070 TFLOPS",
      },
      {
        label: "Sensor System",
        value: "2x 3D LiDAR, 3x Fisheye, 3x RGB-D, 1x Stereo",
      },
      { label: "Durability", value: "Dust and water resistance IP42" },
    ],
    features: [
      {
        title: "Industrial-Grade Durability",
        items: [
          "Full 100% humanoid structure with IP42 protection, suitable for real industrial environments.",
        ],
      },
      {
        title: "High Precision",
        items: [
          "Advanced force control enabling assembly precision at millimeter-level.",
        ],
      },
      {
        title: "Ready-to-Deploy System",
        items: [
          "Pre-trained AI model with Genie RL for quick adaptation to production lines.",
        ],
      },
      {
        title: "Human-Like Intelligent Interaction",
        items: [
          "Natural conversation and real-time interaction, including eye-gaze tracking and facial expressions.",
        ],
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
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        background:
          "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15 6.5L7 14.5L3 10.5"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function RoboticsUseCasesSection({
  content,
}: {
  content?: Record<string, unknown>;
}) {
  const c = (content ?? {}) as UseCasesContent;
  const rawRobots = c.robots ?? DEFAULT_ROBOTS;
  const robots: Robot[] = Array.isArray(rawRobots)
    ? rawRobots
    : Object.values(rawRobots);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const tabRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Track which robot section is in view
  useEffect(() => {
    const sections = robots.map((_, i) =>
      document.getElementById(`robot-${i}`),
    );
    if (sections.every((s) => !s)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActiveTab(idx);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, [robots]);

  if (robots.length === 0) return null;

  return (
    <>
      {lightboxSrc && (
        <VideoLightbox src={lightboxSrc} onClose={closeLightbox} />
      )}
      {/* ── Sentinel for sticky detection ── */}
      <div ref={tabRef} style={{ height: 0 }} />
      {/* ── Tab Selector — sticky top ── */}
      <div
        className="sticky z-40 hidden md:block"
        style={{
          top: 72,
          paddingBottom: 40,
          background: isSticky ? "rgba(7,14,36,0.85)" : "#070E24",
          backdropFilter: isSticky ? "blur(16px)" : "none",
          WebkitBackdropFilter: isSticky ? "blur(16px)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          className="mx-auto lg:pt-10 lg:px-28 lg:pb-0"
          style={{ maxWidth: 1440 }}
        >
          <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center">
              <div
                className="inline-flex items-center p-2 rounded-full flex-wrap gap-1 justify-center"
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
                    style={{
                      fontFamily: font,
                      fontSize: 16,
                      color: i === activeTab ? "#fff" : "#90A1B9",
                      padding: "12px 24px",
                      borderRadius: 99,
                      border: "none",
                      cursor: "pointer",
                      background: i === activeTab ? "#2D7AE8" : "transparent",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      transition: "background 0.3s, color 0.3s",
                    }}
                  >
                    {r.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── All Robot Use Cases (displayed sequentially) ── */}
      {robots.map((robot, robotIdx) => {
        const specs: { label: string; value: string }[] = Array.isArray(
          robot.specs,
        )
          ? robot.specs
          : robot.specs
            ? Object.values(robot.specs)
            : [];
        const features: {
          title: string;
          items: string[];
          feature_image?: string;
        }[] = Array.isArray(robot.features)
          ? robot.features
          : robot.features
            ? Object.values(robot.features)
            : [];
        let featureImages = features
          .filter((f) => f.feature_image)
          .map((f) => f.feature_image!);
        // Fallback: use images from robot.feature_images array if features don't have them
        if (featureImages.length === 0 && Array.isArray(robot.feature_images)) {
          featureImages = robot.feature_images.filter(Boolean);
        }
        const leftImage = featureImages[0] || "";
        const rightImage = featureImages[1] || "";
        const isFirstRobot = robotIdx === 0;

        return (
          <div key={robotIdx} id={`robot-${robotIdx}`}>
            {/* ── Header with BG image ── */}
            <section
              className="relative overflow-hidden"
              style={{ background: "#070E24" }}
            >
              {robot.header_image && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={wpImageUrl(robot.header_image)}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                  />
                  {/* Dark gradient for dark-bg robots, no gradient for light-bg (G2) */}
                  {robotIdx !== 3 && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(270deg, rgba(7,14,36,0) 0%, rgba(7,14,36,1) 100%)",
                      }}
                    />
                  )}
                </div>
              )}
              <div
                className="relative max-sm:!px-4 max-sm:!py-10"
                style={{
                  maxWidth: 1440,
                  margin: "0 auto",
                  padding: "80px 112px",
                }}
              >
                <div className="flex flex-wrap items-end gap-6 max-sm:!flex-col max-sm:!items-start max-sm:!gap-8">
                  <div
                    className="flex flex-col gap-6 max-sm:w-full"
                    style={{ maxWidth: 596 }}
                  >
                    {/* Logo pill */}
                    <FadeUp trigger="scroll" delay={0}>
                      <div
                        className="inline-flex items-center self-start"
                        style={{
                          background: "#fff",
                          borderRadius: 24,
                          padding: "12px 24px",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/aiaiai-logo-dark.svg"
                          alt="AIAIAI"
                          style={{ height: 19, width: 120, display: "block" }}
                        />
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
                          color: robotIdx === 3 ? "#1E2E48" : "#fff",
                          textShadow:
                            robotIdx === 3
                              ? "none"
                              : "0px 2px 12px rgba(0,0,0,0.5)",
                        }}
                      >
                        {robotIdx === 3
                          ? decode(robot.name || "")
                          : decode(robot.title || "")}
                      </h2>
                    </FadeUp>
                    <FadeUp trigger="scroll" delay={0.06}>
                      <p
                        style={{
                          fontFamily: font,
                          fontSize: 16,
                          color: robotIdx === 3 ? "#4A6080" : "#E8EEF8",
                          lineHeight: 1.5,
                        }}
                      >
                        {decode(robot.description || "")}
                      </p>
                    </FadeUp>

                    {/* Video thumbnails with lightbox */}
                    {robot.video_thumb && (
                      <FadeUp trigger="scroll" delay={0.09}>
                        <div className="flex gap-2.5 w-full">
                          <button
                            onClick={() =>
                              robot.video_url && setLightboxSrc(robot.video_url)
                            }
                            className="relative rounded-3xl overflow-hidden flex-1 min-w-0"
                            style={{
                              height: 200,
                              boxShadow: "0px 4px 12px rgba(0,119,255,0.5)",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={wpImageUrl(robot.video_thumb)}
                              alt="Video"
                              className="size-full object-cover"
                            />
                            <PlayButton />
                          </button>
                          {robot.video_thumb_2 && (
                            <button
                              onClick={() =>
                                robot.video_url_2 &&
                                setLightboxSrc(robot.video_url_2)
                              }
                              className="relative rounded-3xl overflow-hidden shrink-0 max-sm:!w-[120px]"
                              style={{
                                width: 120,
                                height: 200,
                                boxShadow: "0px 4px 12px rgba(0,119,255,0.5)",
                                border: "none",
                                padding: 0,
                                cursor: "pointer",
                              }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={wpImageUrl(robot.video_thumb_2)}
                                alt="Video"
                                className="size-full object-cover"
                              />
                              <PlayButton />
                            </button>
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
                      <h3
                        className="max-sm:!text-[24px]"
                        style={{
                          fontFamily: font,
                          fontSize: 32,
                          fontWeight: 400,
                          lineHeight: 1.3,
                          color: "#fff",
                        }}
                      >
                        Specifications:
                      </h3>
                      {/* Table-style layout like Figma */}
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {specs.map((spec, i) => {
                          const s =
                            typeof spec === "object"
                              ? spec
                              : { label: "", value: String(spec) };
                          const hasAltBg = i % 2 === 0;
                          return (
                            <div
                              key={i}
                              className="flex"
                              style={{
                                background: hasAltBg
                                  ? "rgba(255,255,255,0.04)"
                                  : "transparent",
                              }}
                            >
                              <div className="w-1/2 shrink-0 px-4 py-2">
                                <span
                                  style={{
                                    fontFamily: font,
                                    fontSize: 16,
                                    color: "#8099BE",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {s.label}
                                </span>
                              </div>
                              <div className="w-1/2 px-4 py-2">
                                <span
                                  style={{
                                    fontFamily: font,
                                    fontSize: 16,
                                    color: "#fff",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {s.value}
                                </span>
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
                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, rgba(43,127,255,0) 0%, rgba(43,127,255,0.5) 50%, rgba(43,127,255,0) 100%)",
                  }}
                />

                <div
                  className="mx-auto max-sm:!px-4 max-sm:!py-6"
                  style={{ maxWidth: 1440, padding: "40px 112px 80px" }}
                >
                  <div className="flex flex-wrap gap-6 items-start max-sm:!flex-col max-sm:!items-stretch">
                    {/* Left column — heading + feature list + feature image */}
                    <div className="flex-1 min-w-[300px] flex flex-col gap-10 max-sm:!min-w-0 max-sm:!w-full">
                      <FadeUp trigger="scroll" delay={0}>
                        <div className="flex flex-col gap-4">
                          <h3
                            className="max-sm:!text-[24px]"
                            style={{
                              fontFamily: font,
                              fontSize: 32,
                              fontWeight: 400,
                              lineHeight: 1.3,
                              color: "#fff",
                            }}
                          >
                            Key Features:
                          </h3>
                        </div>
                      </FadeUp>

                      {/* Feature items list — gap 32px */}
                      <div className="flex flex-col gap-8">
                        {features.map((feature, i) => {
                          const featureItems: string[] = Array.isArray(
                            feature.items,
                          )
                            ? feature.items
                            : feature.items
                              ? Object.values(feature.items)
                              : [];
                          return (
                            <FadeUp key={i} trigger="scroll" delay={i * 0.06}>
                              <div className="flex gap-6 items-start">
                                <FeatureIcon
                                  src={
                                    robot.feature_icons?.[i] ||
                                    DEFAULT_ROBOTS[robotIdx]?.feature_icons?.[
                                      i
                                    ] ||
                                    "/images/feature-icon-1.svg"
                                  }
                                />
                                <div className="flex flex-col gap-2">
                                  <h4
                                    style={{
                                      fontFamily: font,
                                      fontSize: 24,
                                      fontWeight: 400,
                                      lineHeight: 1.4,
                                      color: "#fff",
                                    }}
                                  >
                                    {decode(feature.title)}
                                  </h4>
                                  <div className="flex flex-col gap-1">
                                    {featureItems.map((item, j) => {
                                      const decoded = decode(item);
                                      const hasBullet = /^[·•]\s*/.test(
                                        decoded,
                                      );
                                      const text = decoded.replace(
                                        /^[·•]\s*/,
                                        "",
                                      );
                                      return (
                                        <p
                                          key={j}
                                          style={{
                                            fontFamily: font,
                                            fontSize: 16,
                                            color: "#C0CEEA",
                                            lineHeight: 1.5,
                                          }}
                                        >
                                          {hasBullet && (
                                            <span
                                              style={{
                                                color: "#fff",
                                                marginRight: 8,
                                              }}
                                            >
                                              ·
                                            </span>
                                          )}
                                          {text}
                                        </p>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </FadeUp>
                          );
                        })}
                      </div>

                      {/* Note — below features (D1 EDU / G2 style: features left, images right) */}
                      {!isFirstRobot && robotIdx !== 2 && robot.note && (
                        <FadeUp trigger="scroll" delay={0.2}>
                          <div
                            className="rounded-2xl"
                            style={{
                              padding: "12px 24px",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: font,
                                fontSize: 16,
                                color: "#fff",
                                lineHeight: 1.5,
                              }}
                            >
                              <span style={{ color: "#4A99F5" }}>Note:</span>{" "}
                              {robot.note}
                            </p>
                          </div>
                        </FadeUp>
                      )}

                      {/* Feature image below features (X2 ULTRA) — single full-width */}
                      {isFirstRobot && (
                        <FadeUp trigger="scroll" delay={0.15}>
                          <div
                            className="relative rounded-3xl overflow-hidden w-full"
                            style={{ height: 200 }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                leftImage
                                  ? wpImageUrl(leftImage)
                                  : "/images/feature-image-left.png"
                              }
                              alt=""
                              className="size-full object-cover"
                            />
                          </div>
                        </FadeUp>
                      )}
                      {/* Feature images (A2 ULTRA) — 2 GIFs row */}
                      {robotIdx === 2 && (
                        <FadeUp trigger="scroll" delay={0.15}>
                          <div className="flex gap-6 w-full">
                            <div
                              className="relative rounded-3xl overflow-hidden flex-1 min-w-0"
                              style={{ height: 200 }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/images/a2-feature-1.gif"
                                alt=""
                                className="size-full object-cover"
                              />
                            </div>
                            <div
                              className="relative rounded-3xl overflow-hidden flex-1 min-w-0"
                              style={{ height: 200 }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/images/a2-feature-2.gif"
                                alt=""
                                className="size-full object-cover"
                              />
                            </div>
                          </div>
                        </FadeUp>
                      )}
                    </div>

                    {/* Right column */}
                    <div
                      className="flex flex-col items-center gap-6 max-sm:!w-full max-sm:!flex-shrink"
                      style={{ width: 596, flexShrink: 0 }}
                    >
                      {isFirstRobot || robotIdx === 2 ? (
                        <>
                          {/* X2 ULTRA / A2 ULTRA: robot image right */}
                          <FadeUp trigger="scroll" delay={0.1}>
                            <div
                              className="relative overflow-hidden max-sm:!w-full max-sm:!h-[280px]"
                              style={{ width: 596, height: "100%" }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={
                                  isFirstRobot
                                    ? "/images/feature-robot-right.png"
                                    : featureImages[0]
                                      ? wpImageUrl(featureImages[0])
                                      : "/images/feature-robot-right.png"
                                }
                                alt=""
                                className="size-full object-contain object-bottom"
                              />
                            </div>
                          </FadeUp>
                          {/* Note — below image */}
                          {robot.note && (
                            <FadeUp trigger="scroll" delay={0.2}>
                              <div
                                className="w-full rounded-2xl"
                                style={{
                                  padding: "12px 24px",
                                  background: "rgba(255,255,255,0.04)",
                                  border: "1px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                <p
                                  style={{
                                    fontFamily: font,
                                    fontSize: 16,
                                    color: "#fff",
                                    lineHeight: 1.5,
                                    textAlign: "left",
                                  }}
                                >
                                  <span style={{ color: "#4A99F5" }}>
                                    Note:
                                  </span>{" "}
                                  {robot.note}
                                </p>
                              </div>
                            </FadeUp>
                          )}
                        </>
                      ) : (
                        <>
                          {/* D1 EDU / G2: 2 feature images — stacked on desktop, row on mobile */}
                          <FadeUp trigger="scroll" delay={0.1}>
                            <div className="flex flex-col gap-6">
                              {featureImages.map((img, i) => (
                                <div
                                  key={i}
                                  className="relative rounded-3xl overflow-hidden max-sm:!w-full max-sm:!h-[220px]"
                                  style={{ width: 493, height: 330 }}
                                >
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={wpImageUrl(img)}
                                    alt=""
                                    className="size-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </FadeUp>
                        </>
                      )}
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
