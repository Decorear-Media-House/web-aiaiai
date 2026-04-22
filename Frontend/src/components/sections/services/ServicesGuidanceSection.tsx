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
      <path d="M4.00048 13.9997C3.81125 14.0003 3.62571 13.9473 3.46543 13.8467C3.30516 13.746 3.17671 13.602 3.09503 13.4313C3.01335 13.2606 2.98177 13.0703 3.00398 12.8823C3.02619 12.6944 3.10126 12.5166 3.22048 12.3697L13.1205 2.16967C13.1947 2.08396 13.2959 2.02603 13.4075 2.00541C13.519 1.98478 13.6342 2.00269 13.7342 2.05618C13.8342 2.10967 13.9131 2.19557 13.9578 2.29978C14.0026 2.40399 14.0106 2.52032 13.9805 2.62967L12.0605 8.64967C12.0039 8.8012 11.9849 8.96419 12.0051 9.12468C12.0253 9.28517 12.0841 9.43836 12.1766 9.5711C12.269 9.70385 12.3923 9.81219 12.5358 9.88684C12.6793 9.96148 12.8387 10.0002 13.0005 9.99967H20.0005C20.1897 9.99903 20.3752 10.0521 20.5355 10.1527C20.6958 10.2533 20.8242 10.3973 20.9059 10.568C20.9876 10.7387 21.0192 10.9291 20.997 11.117C20.9748 11.3049 20.8997 11.4827 20.7805 11.6297L10.8805 21.8297C10.8062 21.9154 10.705 21.9733 10.5935 21.9939C10.482 22.0146 10.3668 21.9967 10.2668 21.9432C10.1667 21.8897 10.0879 21.8038 10.0431 21.6996C9.9984 21.5954 9.9904 21.479 10.0205 21.3697L11.9405 15.3497C11.9971 15.1982 12.0161 15.0352 11.9959 14.8747C11.9757 14.7142 11.9168 14.561 11.8244 14.4282C11.732 14.2955 11.6087 14.1872 11.4652 14.1125C11.3217 14.0379 11.1622 13.9991 11.0005 13.9997H4.00048Z" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.0002 13.0003C20.0002 18.0003 16.5002 20.5003 12.3402 21.9503C12.1224 22.0241 11.8857 22.0205 11.6702 21.9403C7.5002 20.5003 4.0002 18.0003 4.0002 13.0003V6.00025C4.0002 5.73504 4.10555 5.48068 4.29309 5.29315C4.48063 5.10561 4.73498 5.00025 5.0002 5.00025C7.0002 5.00025 9.5002 3.80025 11.2402 2.28025C11.4521 2.09925 11.7215 1.9998 12.0002 1.9998C12.2788 1.9998 12.5483 2.09925 12.7602 2.28025C14.5102 3.81025 17.0002 5.00025 19.0002 5.00025C19.2654 5.00025 19.5198 5.10561 19.7073 5.29315C19.8948 5.48068 20.0002 5.73504 20.0002 6.00025V13.0003Z" stroke="#4A99F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RoboticsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.9998 3.99982H5.99982C4.89525 3.99982 3.99982 4.89525 3.99982 5.99982V17.9998C3.99982 19.1044 4.89525 19.9998 5.99982 19.9998H17.9998C19.1044 19.9998 19.9998 19.1044 19.9998 17.9998V5.99982C19.9998 4.89525 19.1044 3.99982 17.9998 3.99982Z" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 9H10C9.44772 9 9 9.44772 9 10V14C9 14.5523 9.44772 15 10 15H14C14.5523 15 15 14.5523 15 14V10C15 9.44772 14.5523 9 14 9Z" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 2.00018V4.00018" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20.0002V22.0002" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.00018 15H4.00018" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.00018 9H4.00018" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.0002 15H22.0002" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.0002 9H22.0002" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 2.00018V4.00018" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20.0002V22.0002" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const label = c.label || "Getting Started";
  const heading = c.heading || "\u201cWhere to start\u201d";
  const headingHighlight = c.heading_highlight || "Guidance";
  const description = c.description || "If you\u2019re unsure where to begin, pick the path that matches your most urgent goal.";
  const cards = (Array.isArray(c.cards) && c.cards.length > 0) ? c.cards : DEFAULT_CARDS;
  const ctaPrompt = c.cta_prompt || "Ready to discuss your specific challenge?";
  const ctaText = c.cta_text || "Contact Us Today";
  const ctaHref = c.cta_href || "/#contact";
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
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="w-full sm:flex-1 sm:min-w-[312px]">
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
