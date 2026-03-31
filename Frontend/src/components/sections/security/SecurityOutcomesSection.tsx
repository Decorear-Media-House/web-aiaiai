"use client";

import { useState } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/security/
const imgContainer = "https://www.figma.com/api/mcp/asset/64149b23-4dab-4375-b01f-8a0535e426d7";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/8fdb0c91-51e8-4282-a990-b20416c51483";
const imgCheckCircle2 = "https://www.figma.com/api/mcp/asset/51338eae-34ac-4a93-943a-8664a3b2bb5e";
const imgChevronDown = "https://www.figma.com/api/mcp/asset/9c05650b-2605-4e3e-8ebf-86c1d971dc8f";
const imgChevronRight = "https://www.figma.com/api/mcp/asset/373e3e56-9568-4c06-8270-49616c4a4234";
const imgOIcon = "https://www.figma.com/api/mcp/asset/f43ab423-7b75-4f9a-a403-a0011d2a3aad";
const imgOIcon1 = "https://www.figma.com/api/mcp/asset/f48bf6b4-347a-4dba-abd4-bb5303ebce2a";
const imgOIcon2 = "https://www.figma.com/api/mcp/asset/8afd9017-182b-4406-b94a-73885bea6d68";
const imgOIcon3 = "https://www.figma.com/api/mcp/asset/a61d92da-3ec4-4f32-b440-c2c91ab16ab9";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgCheckCircle2} alt="" width={16} height={16} className="shrink-0" />
      <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

const ACCORDION = [
  {
    icon: imgOIcon,
    iconBg: "linear-gradient(135deg, rgb(0, 184, 219) 0%, rgb(21, 93, 252) 100%)",
    title: "Security improvement",
    checks: [
      "Detect events consistently based on site rules and zones",
      "Reduce time-to-response through alert workflows",
      "Standardize incident handling across shifts",
    ],
  },
  {
    icon: imgOIcon1,
    iconBg: "linear-gradient(135deg, rgb(142, 81, 255) 0%, rgb(21, 93, 252) 100%)",
    title: "Asset protection & loss reduction",
    checks: null,
  },
  {
    icon: imgOIcon2,
    iconBg: "linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(0, 184, 219) 100%)",
    title: "Operational improvement",
    checks: null,
  },
  {
    icon: imgOIcon3,
    iconBg: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(0, 146, 184) 100%)",
    title: "Cost reduction",
    checks: null,
  },
];

export default function SecurityOutcomesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative" style={{ background: "#070E24", overflowX: "clip" }}>
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

      <Container className="relative py-20">
        <div className="flex flex-wrap gap-10 items-start">

          {/* Left — stacked photos */}
          <FadeUp trigger="scroll" delay={0.1} className="flex-1 min-w-[300px]">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: 596 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgContainer} alt="Security platform" className="absolute inset-0 size-full object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgContainer1} alt="" className="absolute inset-0 size-full object-cover" aria-hidden="true" />
            </div>
          </FadeUp>

          {/* Right — content */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-8">
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
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Outcomes</span>
                </div>

                <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  What this Platform{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(176deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Achieves
                  </span>
                </h2>
              </div>
            </FadeUp>

            {/* Accordion */}
            <div className="flex flex-col gap-3">
              {ACCORDION.map(({ icon, iconBg, title, checks }, i) => {
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
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={icon} alt="" width={18} height={18} />
                        </div>
                        <span style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, flex: 1 }}>
                          {title}
                        </span>
                        {/* Chevron */}
                        <div
                          className="shrink-0 size-6"
                          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(-90deg)", transition: "transform 0.25s ease" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={isOpen ? imgChevronDown : imgChevronRight} alt="" width={24} height={24} />
                        </div>
                      </button>

                      {/* Expanded body */}
                      {isOpen && checks && (
                        <div
                          className="flex flex-col gap-2 px-5 pb-5"
                          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <div className="pt-5 flex flex-col gap-2">
                            {checks.map((text) => (
                              <CheckItem key={text} text={text} />
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
