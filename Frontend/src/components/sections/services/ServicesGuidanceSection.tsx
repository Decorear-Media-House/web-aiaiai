"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

import { wpImageUrl } from "@/lib/wordpress";
import React from "react";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(167deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

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

function CostIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 14C3.81 14 3.63 13.95 3.46 13.85C3.3 13.75 3.18 13.6 3.09 13.43C3.01 13.26 2.98 13.07 3 12.88C3.03 12.7 3.1 12.52 3.22 12.37L8.12 7.17C8.19 7.08 8.3 7.03 8.41 7.01C8.52 6.99 8.63 7 8.73 7.06C8.83 7.11 8.91 7.2 8.96 7.3C9 7.4 9.01 7.52 8.98 7.63L8.06 10.65C8 10.8 7.98 10.96 8 11.13C8.02 11.29 8.08 11.44 8.18 11.57C8.27 11.7 8.39 11.81 8.54 11.89C8.68 11.96 8.84 12 9 12H13C13.19 12 13.37 12.05 13.54 12.15C13.7 12.25 13.82 12.4 13.91 12.57C13.99 12.74 14.02 12.93 14 13.12C13.97 13.31 13.9 13.48 13.78 13.63L8.88 18.83C8.81 18.92 8.7 18.97 8.59 18.99C8.48 19.02 8.37 19 8.27 18.94C8.17 18.89 8.09 18.8 8.04 18.7C8 18.6 7.99 18.48 8.02 18.37L8.94 15.35C9 15.2 9.02 15.04 9 14.88C8.98 14.71 8.92 14.56 8.82 14.43C8.73 14.3 8.61 14.19 8.46 14.11C8.32 14.04 8.16 14 8 14H4Z" stroke="#00BAF2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RoboticsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="#4A99F5" strokeWidth="1.5" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#4A99F5" strokeWidth="1.5" />
    </svg>
  );
}

const DEFAULT_CARDS: { icon: React.ReactNode; title: string; body: string }[] = [
  {
    icon: <CostIcon />,
    title: "Need to reduce cost fast?",
    body: "Start with AI Solution Partner discovery & roadmap with one MVP target.",
  },
  {
    icon: <SecurityIcon />,
    title: "Need security improvement?",
    body: "Start with AI Security Solution pilot on 1–2 sites.",
  },
  {
    icon: <RoboticsIcon />,
    title: "Exploring robotics?",
    body: "Start with pilot readiness and task definition for Embodied & Humanoid Robotics.",
  },
];

interface GuidanceContent {
  label?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  cards?: { icon?: React.ReactNode; title: string; body: string }[];
  cta_prompt?: string;
  cta_text?: string;
  cta_href?: string;
  background_image?: string;
  background_color?: string;
}

export default function ServicesGuidanceSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as GuidanceContent;
  const label = c.label ?? "Getting Started";
  const heading = c.heading ?? "\u201cWhere to start\u201d";
  const headingHighlight = c.heading_highlight ?? "Guidance";
  const description = c.description ?? "If you\u2019re unsure where to begin, pick the path that matches your most urgent goal.";
  const cards = (Array.isArray(c.cards) && c.cards.length > 0) ? c.cards : DEFAULT_CARDS;
  const ctaPrompt = c.cta_prompt ?? "Ready to discuss your specific challenge?";
  const ctaText = c.cta_text ?? "Contact Us Today";
  const ctaHref = c.cta_href ?? "/#contact";
  const bgImage = wpImageUrl((c.background_image as string) || "") || "/images/services-guidance-bg.png";
  const bgColor = c.background_color || "#102050";
  return (
    <section className="relative overflow-x-clip" style={{ background: bgColor }}>
      {/* Background image + overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {bgImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bgImage} alt="" className="absolute inset-0 size-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: "rgba(16,32,80,0.5)" }} />
      </div>

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-col gap-10 items-center">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[700px]">
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
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{label}</span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.2, color: "#fff", textAlign: "center" }}>
                {heading}{" "}
                <span
                  style={{
                    backgroundImage: ROYAL_SHINE,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {headingHighlight}
                </span>
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>
                {description}
              </p>
            </div>
          </FadeUp>

          {/* Cards */}
          <div className="flex flex-wrap gap-6 items-start justify-center w-full">
            {cards.map(({ icon, title, body }, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="flex-1 min-w-[312px] max-sm:!min-w-0 max-sm:w-full">
                <div
                  className="flex flex-col gap-4 rounded-2xl p-6 h-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="flex items-center justify-center rounded-[14px] size-12 shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {icon}
                  </div>
                  <h3 className="max-sm:!text-xl" style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff" }}>{title}</h3>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* CTA */}
          <FadeUp trigger="scroll" delay={0.3}>
            <div className="flex flex-col items-center gap-5">
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>
                {ctaPrompt}
              </p>
              <a
                href={ctaHref}
                className="inline-flex items-center gap-1 rounded-lg px-6 py-3 transition-opacity hover:opacity-90"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  backgroundImage: ROYAL_SHINE,
                  border: "1px solid #4A99F5",
                  boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                }}
              >
                {ctaText} <ChevronRight />
              </a>
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
