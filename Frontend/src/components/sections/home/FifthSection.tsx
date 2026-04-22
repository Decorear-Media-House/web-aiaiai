"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

/* ── Brand mark background ─────────────────────────────────────────── */

function BrandMark() {
  return (
    <svg viewBox="0 0 931 464" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      className="w-full h-full">
      <path d="M461.5 406L360 406L594.404 0L695.904 0L461.5 406Z" fill="url(#bm_g0)" />
      <path d="M696.5 0L595 0L829.404 406L930.904 406L696.5 0Z" fill="url(#bm_g1)" />
      <path d="M101.5 464L0 464L234.404 58L335.904 58L101.5 464Z" fill="url(#bm_g2)" />
      <path d="M336.5 58L235 58L469.404 464L570.904 464L336.5 58Z" fill="url(#bm_g3)" />
      <path d="M528.5 58L427 58L661.404 464L762.904 464L528.5 58Z" fill="url(#bm_g4)" />
      <defs>
        <linearGradient id="bm_g0" x1="418.5" y1="406" x2="568.586" y2="-34.116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0C5CB8" /><stop offset="1" stopColor="#062883" />
        </linearGradient>
        <linearGradient id="bm_g1" x1="653.5" y1="0" x2="803.586" y2="440.116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A99F5" /><stop offset="0.5" stopColor="#2D7AE8" /><stop offset="1" stopColor="#1A4494" />
        </linearGradient>
        <linearGradient id="bm_g2" x1="58.5" y1="464" x2="208.586" y2="23.884" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0C5CB8" /><stop offset="1" stopColor="#062883" />
        </linearGradient>
        <linearGradient id="bm_g3" x1="293.5" y1="58" x2="443.586" y2="498.116" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A99F5" /><stop offset="0.5" stopColor="#2D7AE8" /><stop offset="1" stopColor="#1A4494" />
        </linearGradient>
        <linearGradient id="bm_g4" x1="507.5" y1="58" x2="636.358" y2="494.068" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4A99F5" stopOpacity="0" /><stop offset="0.364" stopColor="#2D7AE8" /><stop offset="1" stopColor="#1A4494" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Icons ─────────────────────────────────────────────────────────── */

function AwardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="5.5" r="3.5" stroke="#00B9F2" strokeWidth="1.2" />
      <path d="M4.5 8.5L3.5 12.5L7 11L10.5 12.5L9.5 8.5" stroke="#00B9F2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CostIcon() {
  return (
    <img src="/images/impact-icons/cost.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function RevenueIcon() {
  return (
    <img src="/images/impact-icons/revenue.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function ComplianceIcon() {
  return (
    <img src="/images/impact-icons/compliance.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function SecurityIcon() {
  return (
    <img src="/images/impact-icons/security.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function AutomationIcon() {
  return (
    <img src="/images/impact-icons/automation.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */

const OUTCOME_AREAS = [
  { label: "Cost Reduction", color: "#2B7FFF" },
  { label: "Revenue Growth", color: "#00BC7D" },
  { label: "Compliance & Governance", color: "#8E51FF" },
  { label: "Security & Asset Protection", color: "#FF8904" },
  { label: "Operational Automation", color: "#00B8DB" },
];

const IMPACT_CARDS = [
  {
    icon: <CostIcon />,
    iconBg: "rgba(43,127,255,0.12)",
    glowColor: "rgba(43,127,255,0.12)",
    glowShadow: "0 0 32px rgba(43,127,255,0.15), inset 0 0 32px rgba(43,127,255,0.04)",
    borderColor: "rgba(43,127,255,0.25)",
    headingGradient: "linear-gradient(90deg, #2B7FFF 0%, #00B8DB 100%)",
    title: "Cost Reduction",
    items: [
      "Reduce manual work through automation and AI-assisted triage",
      "Shorten cycle times and increase throughput",
      "Reduce monitoring overhead via automated detection and prioritization",
    ],
  },
  {
    icon: <RevenueIcon />,
    iconBg: "rgba(0,188,125,0.12)",
    glowColor: "rgba(0,188,125,0.08)",
    glowShadow: "0 0 32px rgba(0,188,125,0.15), inset 0 0 32px rgba(0,188,125,0.04)",
    borderColor: "rgba(0,188,125,0.25)",
    headingGradient: "linear-gradient(90deg, #00BC7D 0%, #00BBA7 100%)",
    title: "Revenue Growth",
    items: [
      "Improve execution by converting signals into decisions and actions",
      "Increase conversion by enabling faster, smarter responses",
      "Strengthen performance management with visibility and feedback loops",
    ],
  },
  {
    icon: <ComplianceIcon />,
    iconBg: "rgba(142,81,255,0.12)",
    glowColor: "rgba(142,81,255,0.08)",
    glowShadow: "0 0 32px rgba(142,81,255,0.15), inset 0 0 32px rgba(142,81,255,0.04)",
    borderColor: "rgba(142,81,255,0.25)",
    headingGradient: "linear-gradient(90deg, #8E51FF 0%, #AD46FF 100%)",
    title: "Compliance & Governance",
    items: [
      "Establish audit-ready workflows, traceability, and evidence trails",
      "Apply access controls and approvals",
      "Create responsible AI boundaries for safe operational adoption",
    ],
  },
  {
    icon: <SecurityIcon />,
    iconBg: "rgba(255,137,4,0.12)",
    glowColor: "rgba(255,137,4,0.08)",
    glowShadow: "0 0 32px rgba(255,137,4,0.15), inset 0 0 32px rgba(255,137,4,0.04)",
    borderColor: "rgba(255,137,4,0.25)",
    headingGradient: "linear-gradient(90deg, #FF8904 0%, #FF6467 100%)",
    title: "Security & Asset Protection",
    items: [
      "Detect incidents earlier and respond faster",
      "Reduce loss risk with consistent workflows and evidence capture",
      "Improve situational awareness across sites, shifts, and zones",
    ],
  },
  {
    icon: <AutomationIcon />,
    iconBg: "rgba(0,184,219,0.12)",
    glowColor: "rgba(0,184,219,0.08)",
    glowShadow: "0 0 32px rgba(0,184,219,0.15), inset 0 0 32px rgba(0,184,219,0.04)",
    borderColor: "rgba(0,184,219,0.25)",
    headingGradient: "linear-gradient(90deg, #00B8DB 0%, #2B7FFF 100%)",
    title: "Operational Automation",
    items: [
      "Improve labor efficiency and repeatability",
      "Reduce variance with SOP-driven operations",
      "Scale through playbooks and readiness checklists",
    ],
  },
] as const;

/* ── Types ────────────────────────────────────────────────────────── */

interface FifthSectionContent {
  label?: string;
  heading?: string;
  description?: string;
  decorative_image?: string;
}

/* ── Component ────────────────────────────────────────────────────── */

export default function FifthSection({ content }: { content?: Record<string, unknown> } = {}) {
  const cms = content as FifthSectionContent | undefined;

  const label = cms?.label ?? "Impact";
  const heading = cms?.heading ?? "Outcomes We Deliver";
  const description =
    cms?.description ??
    "Every engagement is measured against real business outcomes—not just technical milestones.";
  const decorativeImage = wpImageUrl((cms?.decorative_image as string) || "") || "/images/outcomes-robot-4f223f.png";

  // Split heading into white part + gradient part at last two words
  const headingWords = heading.split(" ");
  const gradientPart = headingWords.length > 2 ? headingWords.slice(-2).join(" ") : heading;
  const whitePart = headingWords.length > 2 ? headingWords.slice(0, -2).join(" ") + " " : "";
  return (
    <section className="relative" style={{ background: "#070E24", overflow: "clip" }}>

      {/* AAA Vector — behind robot, bottom left */}
      <div
        className="pointer-events-none absolute max-lg:hidden"
        style={{
          bottom: -340,
          left: 0,
          width: 720,
          height: 720,
          opacity: 0.92,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/aaa-vector.svg"
          alt=""
          className="w-full h-full"
          style={{ objectFit: "contain", objectPosition: "bottom left", transform: "scaleX(-1) rotate(-90deg)" }}
        />
      </div>

      {/* Robot image — bottom left (uploaded via WordPress) */}
      {decorativeImage && (
        <div
          className="pointer-events-none absolute max-lg:hidden"
          style={{
            bottom: 0,
            left: 0,
            width: 458,
            height: 573,
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={decorativeImage}
            alt=""
            className="w-full h-full"
            style={{ objectFit: "contain", objectPosition: "bottom left" }}
          />
        </div>
      )}

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute" style={{
        width: 400, height: 400, left: 200, top: -80,
        background: "rgba(21,93,252,0.08)", borderRadius: 999, filter: "blur(128px)",
      }} />
      <div className="pointer-events-none absolute" style={{
        width: 365, height: 365, right: 0, bottom: 80,
        background: "rgba(34,52,254,0.08)", borderRadius: 999, filter: "blur(128px)",
      }} />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex gap-[60px] max-lg:flex-col max-sm:gap-8">

          {/* ── Left sidebar ── */}
          <div className="relative shrink-0 max-lg:w-full lg:w-[286px]" style={{ zIndex: 2 }}>
            <div>
            <FadeUp trigger="scroll" delay={0} className="flex flex-col gap-6">

              {/* Label + heading */}
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-1.5"
                  style={{ background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)" }}>
                  <AwardIcon />
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em" }}>
                    {label}
                  </span>
                </div>

                <h2 className="max-sm:!text-[26px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
                  {whitePart && <span style={{ color: "#fff" }}>{whitePart}</span>}
                  <span style={{
                    backgroundImage: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{gradientPart}</span>
                </h2>
              </div>

              <p style={{ fontFamily: font, fontSize: 15, color: "#8099BE", lineHeight: 1.7 }}>
                {description}
              </p>

              {/* Outcome areas card */}
              <div className="flex flex-col gap-3 rounded-[14px] p-4"
                style={{ background: "rgba(7,14,36,0.4)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
                <p style={{ fontFamily: font, fontSize: 13, color: "#4A6080" }}>Outcome Areas</p>
                <div className="flex flex-col gap-2">
                  {OUTCOME_AREAS.map((area) => (
                    <div key={area.label} className="flex items-center gap-3">
                      <span className="shrink-0 rounded-full" style={{
                        width: 8, height: 8,
                        background: area.color,
                      }} />
                      <span style={{ fontFamily: font, fontSize: 13, color: "#C0CEDA", lineHeight: 1.5 }}>
                        {area.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </FadeUp>
            </div>
          </div>

          {/* ── Right: impact cards ── */}
          <div className="flex flex-1 flex-col min-w-0">
            {IMPACT_CARDS.map((card, i) => (
              <FadeUp key={card.title} trigger="scroll" delay={0.05 * i}>

                {/* Card with gradient glow */}
                <div
                  className="flex gap-6 rounded-2xl p-6 max-sm:flex-col max-sm:gap-6"
                  style={{
                    background: `rgba(255,255,255,0.03)`,
                    border: `1px solid ${card.borderColor}`,
                    boxShadow: card.glowShadow,
                  }}
                >
                  {/* Icon box */}
                  <div className="flex shrink-0 items-center justify-center rounded-xl"
                    style={{ width: 48, height: 48, background: card.iconBg, border: `1px solid ${card.borderColor}` }}>
                    {card.icon}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 min-w-0">
                    <h3 style={{
                      fontFamily: font, fontSize: 20, fontWeight: 400, lineHeight: 1.3,
                      backgroundImage: card.headingGradient,
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                      {card.title}
                    </h3>
                    <ul className="flex flex-col gap-1">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-[7px] shrink-0 rounded-full"
                            style={{ width: 5, height: 5, background: "rgba(192,206,234,0.5)" }} />
                          <span style={{ fontFamily: font, fontSize: 14, color: "#C0CEDA", lineHeight: 1.65 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Vertical separator between cards */}
                {i < IMPACT_CARDS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div style={{
                      width: 1,
                      height: 20,
                      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
                    }} />
                  </div>
                )}
              </FadeUp>
            ))}
          </div>

        </div>
      </Container>

    </section>
  );
}
