"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5"/>
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Decode common HTML entities from WordPress */
function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const ACCORDION_ITEMS = [
  {
    label: "Labor efficiency & cost reduction",
    icon: "/images/ac-ico-02.svg",
    items: [
      "Automate repetitive tasks to improve throughput",
      "Reduce operational load for routine work",
      "Focus people on exceptions and higher-value tasks",
    ],
  },
  {
    label: "Operational consistency",
    icon: "/images/ac-ico-05.svg",
    items: [
      "SOP-driven routines improve repeatability",
      "Reduce variance across shifts/sites",
    ],
  },
  {
    label: "Safety & governance",
    icon: "/images/ac-ico-01.svg",
    items: [
      "Training and readiness planning",
      "Escalation paths and service readiness",
      "Boundaries and fallback procedures",
    ],
  },
  {
    label: "Scalability",
    icon: "/images/ac-ico-06.svg",
    items: [
      "Rollout checklists and readiness criteria",
      "Monitoring and operational management approach",
      "Scale playbooks for multi-site expansion",
    ],
  },
];

function CheckItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <CheckCircleIcon />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, margin: 0 }}>{text}</p>
    </div>
  );
}

const DEFAULT_ICONS = ["/images/ac-ico-02.svg", "/images/ac-ico-05.svg", "/images/ac-ico-01.svg", "/images/ac-ico-06.svg"];

interface OutcomesContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accordion_items?: any[];
  background_color?: string;
  outcomes_image?: string;
}

export default function RoboticsOutcomesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as OutcomesContent;
  const chip = c.chip ?? "Outcomes";
  const sectionHeading = c.heading ?? "What Robotics ";
  const headingHighlight = c.heading_highlight ?? "Achieves";
  const sectionDescription = c.description ?? "Structured deployment unlocks measurable operational improvements — from day one through full-scale rollout.";
  const rawAccordion = c.accordion_items ?? ACCORDION_ITEMS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accordionItems: any[] = (Array.isArray(rawAccordion) ? rawAccordion : Object.values(rawAccordion)).map((item: any, i: number) => ({
    ...ACCORDION_ITEMS[i],
    ...item,
    icon: item.icon || DEFAULT_ICONS[i] || DEFAULT_ICONS[0],
  }));
  const outcomesImage = c.outcomes_image ? wpImageUrl(c.outcomes_image) : "";
  const [open, setOpen] = useState<Set<number>>(new Set([0, 1, 2, 3]));

  return (
    <section
      style={{
        position: "relative",
        background: c.background_color ?? "#1E2E48",
        overflow: "hidden",
      }}
    >
      {/* Orange glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: "rgba(252,90,21,0.1)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />
      {/* Orange glow bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: "rgba(252,90,21,0.1)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />

      <Container className="relative py-20 max-sm:py-10">
        <div
          className="max-sm:!flex-col max-sm:!gap-8"
          style={{
            display: "flex",
            gap: 40,
            alignItems: "flex-start",
            maxWidth: 1216,
            margin: "0 auto",
          }}
        >
          {/* Left column — fixed narrow width */}
          <FadeUp trigger="scroll" delay={0}>
            <div
              className="max-sm:!w-full max-sm:!max-w-full"
              style={{
                width: 374,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 32,
                alignItems: "flex-start",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                {/* Chip */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    gap: 8,
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "rgba(251,44,54,0.1)",
                    border: "1px solid rgba(251,44,54,0.2)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Bar-chart icon */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1.75 1.75V11.0833C1.75 11.3928 1.87292 11.6895 2.09171 11.9083C2.3105 12.1271 2.60725 12.25 2.91667 12.25H12.25" stroke="#FFA2A2" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.5 9.91667V5.25" stroke="#FFA2A2" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.583 9.917V2.917" stroke="#FFA2A2" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.667 9.917V8.167" stroke="#FFA2A2" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontFamily: font, fontSize: 12, color: "#FFA2A2", whiteSpace: "nowrap" }}>
                    {chip}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
                  {sectionHeading}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #ff8904 0%, #ff6467 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {headingHighlight}
                  </span>
                </h2>

                {/* Body */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                  {sectionDescription}
                </p>
              </div>

              {/* Photo */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  height: 260,
                  width: "100%",
                  maxHeight: "100%",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: outcomesImage ? undefined : "linear-gradient(135deg, #0A1430 0%, #1A2A50 50%, #0E1E3E 100%)",
                }}
              >
                {outcomesImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={outcomesImage} alt="Robotics outcomes" className="absolute inset-0 size-full object-cover" />
                )}
              </div>
            </div>
          </FadeUp>

          {/* Right column — accordion */}
          <div className="max-sm:!min-w-0 max-sm:!w-full" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {accordionItems.map(({ label, icon, items }, i) => {
              const isOpen = open.has(i);
              const toggle = () => setOpen(prev => {
                const next = new Set(prev);
                if (next.has(i)) next.delete(i); else next.add(i);
                return next;
              });
              return (
              <FadeUp key={label} trigger="scroll" delay={i * 0.07}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  {/* Header row */}
                  <button
                    onClick={toggle}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      padding: 20,
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {/* Icon */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" width={40} height={40} style={{ flexShrink: 0, borderRadius: 12, opacity: isOpen ? 1 : 0.6, transition: "opacity 0.2s" }} />
                    <span style={{ flex: 1, fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                      {decode(label)}
                    </span>
                    {/* Chevron */}
                    <div style={{ width: 24, height: 24, flexShrink: 0, transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)", transition: "transform 0.2s", color: "#fff" }}>
                      <ChevronRightIcon />
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isOpen && items && (() => {
                    const list: string[] = Array.isArray(items)
                      ? items
                      : typeof items === "string"
                        ? items.split("\n").map((s: string) => s.trim()).filter(Boolean)
                        : typeof items === "object"
                          ? Object.values(items as Record<string, string>)
                          : [];
                    return list.length > 0 ? (
                    <div
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {list.map((text, j) => (
                        <CheckItem key={j} text={decode(text)} />
                      ))}
                    </div>
                    ) : null;
                  })()}
                </div>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
