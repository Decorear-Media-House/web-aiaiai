"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl as toPublicUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="10" cy="10" r="9" stroke="#4A99F5" strokeWidth="1.5"/>
      <path d="M6 10l3 3 5-5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true">
      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SecurityImprovementIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l7 4v5c0 4.5-3 8.25-7 9.5-4-1.25-7-5-7-9.5V7l7-4z" stroke="#fff" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AssetProtectionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.5"/>
      <path d="M3 10h18" stroke="#fff" strokeWidth="1.5"/>
      <path d="M7 14h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function OperationalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5"/>
      <path d="M12 7v5l3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CostReductionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18L18 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4 12l4-4 4 4 4-4 4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const ACCORDION_ICONS = [
  <SecurityImprovementIcon key="si" />,
  <AssetProtectionIcon key="ap" />,
  <OperationalIcon key="oi" />,
  <CostReductionIcon key="cr" />,
];

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircleIcon />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

const ACCORDION = [
  {
    iconBg: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)",
    title: "Security improvement",
    checks: [
      "Detect events consistently based on site rules and zones",
      "Reduce time-to-response through alert workflows",
      "Standardize incident handling across shifts",
    ],
  },
  {
    iconBg: "linear-gradient(135deg, rgb(142, 81, 255) 0%, rgb(21, 93, 252) 100%)",
    title: "Asset protection & loss reduction",
    checks: [
      "Improve coverage and consistency",
      "Capture evidence snapshots automatically",
      "Reduce \"missed incidents\" with prioritization",
    ],
  },
  {
    iconBg: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(0, 184, 219) 100%)",
    title: "Operational improvement",
    checks: [
      "Convert camera events into operational signals",
      "Create multi-site visibility for management",
      "Align detection and response to SOPs",
    ],
  },
  {
    iconBg: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 146, 184) 100%)",
    title: "Cost reduction",
    checks: [
      "Reduce monitoring workload",
      "Prioritize incidents so teams focus on what matters",
      "Improve efficiency across sites with dashboards",
    ],
  },
];

interface OutcomesContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  accordion?: typeof ACCORDION;
  background_color?: string;
  wpImageUrl?: string;
  wpImageMobileUrl?: string;
}

export default function SecurityOutcomesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as OutcomesContent;
  const chip = c.chip || "Outcomes";
  const sectionHeading = c.heading || "What this Platform ";
  const headingHighlight = c.heading_highlight || "Achieves";
  const accordion = c.accordion ?? ACCORDION;
  const bgColor = c.background_color || "#070E24";
  const imageUrl = c.wpImageUrl ? toPublicUrl(c.wpImageUrl) : "";
  const mobileImageUrl = c.wpImageMobileUrl ? toPublicUrl(c.wpImageMobileUrl) : "";
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative" style={{ background: bgColor, overflowX: "clip" }}>
      {/* Decorative triangle — bottom left */}
      <div
        className="pointer-events-none absolute max-lg:hidden"
        style={{ bottom: 0, left: 0, width: 397, height: 413, zIndex: 0 }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/deco-triangle.svg" alt="" className="w-full h-full" />
      </div>
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{ background: "rgba(43,127,255,0.2)", filter: "blur(64px)", width: 400, height: 400 }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 rounded-full"
        style={{ background: "rgba(43,127,255,0.2)", filter: "blur(64px)", width: 400, height: 400 }}
        aria-hidden="true"
      />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-wrap gap-10 items-start max-sm:flex-col">

          {/* Left — photo area */}
          <FadeUp trigger="scroll" delay={0.1} className="flex-1 min-w-[300px] max-sm:w-full max-sm:!min-w-0 max-sm:!flex-none">
            <div
              className="relative rounded-2xl overflow-hidden max-sm:!h-[200px] max-sm:!w-[100%]"
              style={{ height: 596 }}
            >
              {(imageUrl || mobileImageUrl) ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Security platform" className={`absolute inset-0 size-full object-cover ${mobileImageUrl ? "max-sm:hidden" : ""}`} />
                  {mobileImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mobileImageUrl} alt="Security platform" className="absolute inset-0 size-full object-cover hidden max-sm:block" />
                  )}
                </>
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A132F 0%, #1A4494 50%, #0A132F 100%)" }} />
              )}
            </div>
          </FadeUp>

          {/* Right — content */}
          <div className="flex-1 min-w-[300px] max-sm:!min-w-0 max-sm:!flex-none max-sm:w-full flex flex-col gap-8">
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-4">
                {/* Label chip */}
                <div
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 self-start"
                  style={{
                    background: "rgba(43,127,255,0.1)",
                    border: "1px solid rgba(43,127,255,0.2)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  <SparkleIcon />
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{chip}</span>
                </div>

                <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  {sectionHeading}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(176deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {headingHighlight}
                  </span>
                </h2>
              </div>
            </FadeUp>

            {/* Accordion */}
            <div className="flex flex-col gap-3">
              {accordion.map(({ iconBg, title, checks }, i) => {
                const isOpen = openIndex === i;
                return (
                  <FadeUp key={i} trigger="scroll" delay={i * 0.07}>
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? -1 : i)}
                        className="w-full flex items-center gap-4 p-5 text-left"
                        style={{ cursor: "pointer" }}
                        aria-expanded={isOpen}
                      >
                        {/* Icon */}
                        <div
                          className="flex items-center justify-center rounded-xl shrink-0"
                          style={{
                            width: 40,
                            height: 40,
                            backgroundImage: iconBg,
                            opacity: isOpen ? 1 : 0.6,
                          }}
                        >
                          {ACCORDION_ICONS[i]}
                        </div>
                        <span style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, flex: 1 }}>
                          {title}
                        </span>
                        {/* Chevron */}
                        <div
                          className="shrink-0 flex items-center justify-center"
                          style={{ width: 24, height: 24, color: "#8099BE", transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.25s ease" }}
                        >
                          <ChevronDownIcon />
                        </div>
                      </button>

                      {/* Expanded body */}
                      {isOpen && checks && (
                        <div
                          className="flex flex-col gap-2 px-5 pb-5"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <div className="pt-5 flex flex-col gap-2">
                            {(Array.isArray(checks) ? checks : Object.values(checks as Record<string, string>)).map((text, idx) => (
                              <CheckItem key={idx} text={text} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
