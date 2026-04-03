"use client";

import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

function SparkleIcon({ color = "#FFA2A2" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill={color} />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

export default function AboutMissionSection({ content }: { content?: Record<string, unknown> }) {
  const label = (content?.label as string) ?? "Our Mission";
  const headingWhite1 = (content?.headingWhite1 as string) ?? "We exist to ";
  const headingHighlight = (content?.headingHighlight as string) ?? "close the gap";
  const headingWhite2 = (content?.headingWhite2 as string) ?? " between AI ambition and AI in production.";
  const description = (content?.description as string) ??
    "Most organizations already see the potential of AI. What they lack is a structured path from idea to operating system—built around their constraints, not a vendor's roadmap.";
  const bgImage = wpImageUrl((content?.mission_background_image as string) || "/images/about-mission-bg-3ce2d2.png");
  const bgImageMobile = (content?.mission_background_mobile_image as string) ? wpImageUrl(content!.mission_background_mobile_image as string) : "";

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 382 }}>

      {/* Background image — uses <picture> for desktop/mobile swap */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <picture className="absolute inset-0 w-full h-full">
        {bgImageMobile && <source media="(max-width: 640px)" srcSet={bgImageMobile} />}
        <img src={bgImage} alt="" className="w-full h-full object-cover" />
      </picture>

      {/* Gradient overlay — dark left, transparent right */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(270deg, rgba(7,17,47,0) 0%, rgba(7,17,47,1) 100%)",
        }}
      />

      {/* Content — left aligned */}
      <div className="relative flex items-center py-10 px-6 sm:py-20 sm:px-[112px] md:mx-auto" style={{ minHeight: 382,maxWidth:1440 }}>
        <div className="flex flex-col gap-6 max-lg:max-w-full" style={{ maxWidth: 560 }}>

          <FadeUp trigger="scroll" delay={0}>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 w-fit"
              style={{
                background: "rgba(251,44,54,0.1)",
                border: "1px solid rgba(251,44,54,0.2)",
              }}
            >
              <SparkleIcon />
              <span style={{ fontFamily: font, fontSize: 12, color: "#FFA2A2", letterSpacing: "0.04em" }}>
                {label}
              </span>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
              <span style={{ color: "#fff" }}>{headingWhite1}</span>
              <span style={{
                backgroundImage: "linear-gradient(90deg, #FF8904 0%, #FF6467 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{headingHighlight}</span>
              <span style={{ color: "#fff" }}>{headingWhite2}</span>
            </h2>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.2}>
            <p style={{ fontFamily: font, fontSize: 16, color: "#C0CED8", lineHeight: 1.75 }}>
              {description}
            </p>
          </FadeUp>

        </div>
      </div>

    </section>
  );
}
