"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

interface ThirdSectionCard {
  title: string;
  description: string;
  card_image?: string;
}

interface ThirdSectionContent {
  label?: string;
  headingWhite?: string;
  headingGradient?: string;
  description?: string;
  cards?: ThirdSectionCard[];
}

const DEFAULT_LABEL = "AI is easy to demo. Hard to deploy.";
const DEFAULT_HEADING_WHITE = "The Problem";
const DEFAULT_HEADING_GRADIENT = "We Solve";
const DEFAULT_DESCRIPTION =
  "Most organizations face at least one of these realities before they can scale AI.";

const DEFAULT_CARDS: ThirdSectionCard[] = [
  {
    title: "Stuck at PoC",
    description: "No one owns integration and rollout — AI pilots never reach production.",
  },
  {
    title: "Too Many Use Cases",
    description: "Teams can't prioritize without certainty on ROI or a clear starting point.",
  },
  {
    title: "No Operational Control",
    description: "Missing auditability, approval flows, and human-in-the-loop guardrails.",
  },
  {
    title: "Security Gaps",
    description: "Cameras alone aren't enough — teams need actionable intelligence and workflows.",
  },
  {
    title: "Data Not Ready",
    description: "Data exists but isn't structured, governed, or production-grade.",
  },
  {
    title: "Physical Automation Risk",
    description: "Deploying robots requires safety SOPs, maintenance plans, and escalation paths.",
  },
];

const CARD_IMAGES = [
  "/images/card1-bg.png",
  "/images/card2-bg.png",
  "/images/card3-bg.png",
  "/images/card4-bg.png",
  "/images/card5-bg.png",
  "/images/card6-bg.png",
];

const CARD_W = 286;
const CARD_H = 312;
const CARD_GAP = 24;
const VISIBLE = 4;

function AlertTriangleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6.128 2.44L1.19 10.75A1 1 0 0 0 2.063 12.25h9.875a1 1 0 0 0 .874-1.5L7.873 2.44a1 1 0 0 0-1.745 0Z"
        stroke="#FFA2A2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      />
      <line x1="7" y1="5.5" x2="7" y2="8.25" stroke="#FFA2A2" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="9.75" r="0.6" fill="#FFA2A2" />
    </svg>
  );
}

export default function ThirdSection({ content }: { content?: Record<string, unknown> }) {
  const wp = content as ThirdSectionContent | undefined;

  const label = wp?.label ?? DEFAULT_LABEL;
  const headingWhite = wp?.headingWhite ?? DEFAULT_HEADING_WHITE;
  const headingGradient = wp?.headingGradient ?? DEFAULT_HEADING_GRADIENT;
  const description = wp?.description ?? DEFAULT_DESCRIPTION;
  const cards = (wp?.cards ?? DEFAULT_CARDS).map((card, i) => ({
    title: card.title,
    desc: card.description,
    img: card.card_image ? wpImageUrl(card.card_image) : (CARD_IMAGES[i] ?? CARD_IMAGES[0]),
  }));

  const MAX_OFFSET = Math.max(cards.length - VISIBLE, 0);
  const NUM_DOTS = MAX_OFFSET + 1;

  const [active, setActive] = useState(0);
  const translateX = Math.min(active, MAX_OFFSET) * (CARD_W + CARD_GAP);

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > SWIPE_THRESHOLD) setActive((p) => Math.min(p + 1, MAX_OFFSET));
    else if (delta < -SWIPE_THRESHOLD) setActive((p) => Math.max(p - 1, 0));
    touchStartX.current = null;
  }

  // Mouse drag support
  const mouseStartX = useRef<number | null>(null);
  function handleMouseDown(e: React.MouseEvent) {
    mouseStartX.current = e.clientX;
  }
  function handleMouseUp(e: React.MouseEvent) {
    if (mouseStartX.current === null) return;
    const delta = mouseStartX.current - e.clientX;
    if (delta > SWIPE_THRESHOLD) setActive((p) => Math.min(p + 1, MAX_OFFSET));
    else if (delta < -SWIPE_THRESHOLD) setActive((p) => Math.max(p - 1, 0));
    mouseStartX.current = null;
  }

  return (
    <section className="relative overflow-hidden" style={{ background: "#102050" }}>

      {/* Decorative blue blobs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 400, height: 400, right: -80, top: 80,
          background: "rgba(21,59,252,0.1)",
          borderRadius: 999,
          filter: "blur(128px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          width: 400, height: 400, right: -80, bottom: 80,
          background: "rgba(21,59,252,0.1)",
          borderRadius: 999,
          filter: "blur(128px)",
        }}
      />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* ── Header ── */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col items-center gap-4">
              {/* Red label chip */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
                style={{
                  background: "rgba(251,44,54,0.1)",
                  border: "1px solid rgba(251,44,54,0.2)",
                }}
              >
                <AlertTriangleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#FFA2A2", letterSpacing: "0.04em" }}>
                  {label}
                </span>
              </div>

              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
                <span style={{ color: "#fff" }}>{headingWhite}</span>
                <span style={{
                  backgroundImage: "linear-gradient(90deg, #FF8904 0%, #FF6467 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{" "}{headingGradient}</span>
              </h2>

              <p className="max-w-[560px]" style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.6 }}>
                {description}
              </p>
            </div>
          </FadeUp>

          {/* ── Carousel ── */}
          <FadeUp trigger="scroll" delay={0.1} className="w-full">
            <div className="flex flex-col gap-6">
              {/* Track */}
              <div
                className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ gap: CARD_GAP, transform: `translateX(-${translateX}px)` }}
                >
                  {cards.map((card) => (
                    <div
                      key={card.title}
                      className="relative shrink-0 overflow-hidden"
                      style={{ width: CARD_W, height: CARD_H, borderRadius: 16 }}
                    >
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        unoptimized={card.img.startsWith("http")}
                        className="object-cover"
                        sizes="286px"
                      />
                      {/* Text overlay — bottom of card with blur */}
                      <div
                        className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6"
                        style={{
                          background: "rgba(7,14,36,0.6)",
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: font, fontSize: 16, fontWeight: 400, lineHeight: 1.4,
                            backgroundImage: "linear-gradient(90deg, #FF8904 0%, #FF6467 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {card.title}
                        </p>
                        <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEDA", lineHeight: 1.6 }}>
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot indicators — 3 dots for 3 scroll positions */}
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: NUM_DOTS }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to position ${i + 1}`}
                    style={{
                      width: i === active ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      background: i === active ? "#4A99F5" : "rgba(74,153,245,0.25)",
                      border: "none", padding: 0, cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </FadeUp>


        </div>
      </Container>
    </section>
  );
}
