"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

const DELIVERABLES = [
  { num: "01", title: "Task definition and environment constraints", icon: "/images/dlv-ico-01.svg" },
  { num: "02", title: "Pilot readiness plan with KPIs", icon: "/images/dlv-ico-02.svg" },
  { num: "03", title: "SOPs and training approach", icon: "/images/dlv-ico-03.svg" },
  { num: "04", title: "Maintenance/service readiness and escalation", icon: "/images/dlv-ico-04.svg" },
  { num: "05", title: "Workflow integration into reporting and operations", icon: "/images/dlv-ico-05.svg" },
  { num: "06", title: "Rollout governance and scale planning", icon: "/images/dlv-ico-06.svg" },
];

interface DeliverablesContent {
  chip?: string;
  heading?: string;
  heading_highlight?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: any[];
  background_color?: string;
}

export default function RoboticsDeliverablesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as DeliverablesContent;
  const chip = c.chip || "Deliverables";
  const sectionHeading = c.heading || "What We ";
  const headingHighlight = c.heading_highlight || "Deliver";
  const sectionDescription = c.description || "Six structured work products that take you from concept to operating robotics at scale.";
  // Merge WP items with defaults so num/title/icon always exist
  const rawItems = c.items ?? DELIVERABLES;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deliverables = (Array.isArray(rawItems) ? rawItems : Object.values(rawItems)).map((item: any, i: number) => ({
    ...DELIVERABLES[i],
    ...item,
    icon: item?.icon || DELIVERABLES[i]?.icon || "/images/dlv-ico-01.svg",
  }));
  return (
    <section
      className="max-sm:!px-6 max-sm:!py-10"
      style={{
        position: "relative",
        background: c.background_color || "#070E24",
        paddingTop: 80,
        paddingBottom: 80,
        paddingLeft: 112,
        paddingRight: 112,
        overflow: "hidden",
      }}
    >
      {/* Blue glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 512,
          height: 512,
          borderRadius: 9999,
          background: "rgba(43,127,255,0.05)",
          filter: "blur(82px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="max-sm:!flex-col max-sm:!gap-8"
        style={{
          position: "relative",
          maxWidth: 1216,
          margin: "0 auto",
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {/* Left — header */}
        <FadeUp trigger="scroll" delay={0}>
          <div
            className="max-sm:!w-full max-sm:!max-w-full"
            style={{
              width: 389,
              maxWidth: 389,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {/* Chip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                background: "rgba(43,127,255,0.1)",
                border: "1px solid rgba(43,127,255,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dlv-chip-icon.svg" alt="" width={14} height={14} />
              <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "nowrap" }}>
                {chip}
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", margin: 0 }}>
              {sectionHeading}
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

            {/* Body */}
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
              {sectionDescription}
            </p>
          </div>
        </FadeUp>

        {/* Right — 6 cards in 3-column grid */}
        <div
          className="max-sm:!grid-cols-2"
          style={{
            flex: 1,
            minWidth: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {deliverables.map(({ num, title, icon }, i) => (
            <FadeUp key={num || i} trigger="scroll" delay={i * 0.07}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  padding: 24,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {/* Icon row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", height: 40 }}>
                  {/* Icon */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon || DELIVERABLES[i]?.icon || "/images/dlv-ico-01.svg"} alt="" width={40} height={40} style={{ flexShrink: 0, borderRadius: 12 }} />
                  {/* Number */}
                  <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, color: "#4A6080", whiteSpace: "nowrap" }}>
                    {num}
                  </span>
                </div>
                {/* Title */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, margin: 0 }}>
                  {title}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
