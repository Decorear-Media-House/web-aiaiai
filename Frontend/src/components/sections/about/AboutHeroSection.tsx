"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

/** Label icon — Figma “Award”; simple star badge reads clearly at 14px */
function AwardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M7 1.25L8.25 4.2L11.5 4.55L9.1 6.65L9.75 9.85L7 8.2L4.25 9.85L4.9 6.65L2.5 4.55L5.75 4.2L7 1.25Z"
        stroke="#4A99F5"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

const HEADING_GRADIENT =
  "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.54%, #8B95C5 100%)";

const BG_IMAGE = "/images/about-hero-bg.png";

/** WP often omits newlines or sends "AboutAI-AI-AI …" — force Figma two-line title */
function aboutHeroHeadingLines(raw: string): string[] {
  const text = raw.trim().replace(/\r/g, "");
  if (!text) return [""];

  if (/<br\s*\/?>/i.test(text)) {
    return text
      .split(/<br\s*\/?>/i)
      .map((s) => s.replace(/<[^>]*>/g, "").trim())
      .filter(Boolean);
  }

  const byNl = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (byNl.length >= 2) return byNl;

  const single = byNl[0] ?? text;
  const m = single.match(/^About\s*(.+)$/i);
  if (m?.[1]?.trim()) {
    return ["About", m[1].trim()];
  }
  return [single];
}

export default function AboutHeroSection({ content }: { content?: Record<string, unknown> }) {
  const bgImage = wpImageUrl((content as any)?.hero_background_image || BG_IMAGE);
  const label = (content?.label as string) ?? "About Us";
  const heading = (content?.heading as string) ?? "About \nAI-AI-AI Co., Ltd.";
  const headingLines = aboutHeroHeadingLines(heading);
  const description = (content?.description as string) ??
    "AI-AI-AI Co., Ltd. is a Thailand-based AI company delivering AI Solution Partner engagements from roadmap to production deployment, plus AI video analytics security and humanoid robotics solutions.";
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(16,32,80,0.85), rgba(7,14,36,0.85))" }}
        />
      </div>

      <Container className="relative flex items-end max-sm:!min-h-0" style={{ minHeight: 394 }}>
        <div className="flex w-full flex-wrap items-end gap-6 pb-20 pt-[140px] max-sm:pt-[100px] max-sm:pb-10 max-sm:!flex-col max-sm:!items-start max-sm:gap-4 max-lg:flex-col max-lg:items-start">

          {/* Left column — Figma 90:8573: chip + gradient display heading (content from CMS) */}
          <div className="flex min-w-[300px] max-w-[596px] flex-1 flex-col items-start gap-6 max-sm:!min-w-0 max-sm:w-full max-sm:gap-6">
            <FadeUp trigger="mount" delay={0} className="w-full">
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <AwardIcon />
                <span style={{ fontFamily: font, fontSize: 12, lineHeight: 1.5, color: "#4A99F5", whiteSpace: "nowrap" }}>
                  {label}
                </span>
              </div>
            </FadeUp>

            <FadeUp trigger="mount" delay={0.1} className="w-full">
              <h1
                className="max-sm:!text-[28px] max-sm:!leading-[1.2]"
                style={{
                  fontFamily: font,
                  fontSize: 48,
                  fontWeight: 400,
                  lineHeight: 1.2,
                  margin: 0,
                  maxWidth: "100%",
                  backgroundImage: HEADING_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))",
                }}
              >
                {headingLines.map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </FadeUp>
          </div>

          {/* Right column — description */}
          <div className="flex flex-1 min-w-[300px] max-sm:!min-w-0 max-sm:w-full items-end">
            <FadeUp trigger="mount" delay={0.2}>
              <p className="max-sm:!text-[14px]" style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.75 }}>
                {description}
              </p>
            </FadeUp>
          </div>

        </div>
      </Container>
    </section>
  );
}
