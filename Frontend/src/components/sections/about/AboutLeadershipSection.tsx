"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const LOGO = "/images/about-aieat-logo.png";

function WaveLines() {
  return (
    <svg
      className="absolute left-0 top-0 h-full w-1/2 opacity-30"
      viewBox="0 0 720 290"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {[0, 22, 44, 66, 88, 110, 132, 154, 176, 198, 220].map((offset, i) => (
        <path
          key={i}
          d={`M -60 ${50 + offset} C 80 ${30 + offset} 160 ${70 + offset} 280 ${45 + offset} S 480 ${20 + offset} 600 ${50 + offset} S 740 ${80 + offset} 800 ${55 + offset}`}
          stroke="#4A99F5"
          strokeWidth={i % 3 === 0 ? "1.2" : "0.6"}
          strokeOpacity={i % 3 === 0 ? "0.9" : "0.5"}
        />
      ))}
    </svg>
  );
}

function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(148,185,255,0.55) 1.5px, transparent 1.5px)",
        backgroundSize: "14px 14px",
        maskImage:
          "radial-gradient(ellipse 48% 85% at 76% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 48% 85% at 76% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, transparent 70%)",
      }}
    />
  );
}

interface AboutLeadershipContent {
  heading?: string;
  description?: string;
  logo_image?: string;
  background_color?: string;
  background_image?: string;
}

export default function AboutLeadershipSection({ content }: { content?: AboutLeadershipContent }) {
  const heading = content?.heading ?? "Leadership Credibility";
  const description = content?.description ??
    "AI-AI-AI is led by Dr. Chanwit Boonchuay, President of the AI Entrepreneur Association of Thailand (AIEAT), in partnership with Synapses, with strong Computer Vision ecosystem experience through SELEN.";
  const logoSrc = wpImageUrl((content?.logo_image as string) || LOGO);
  const bgColor = (content?.background_color as string) || "";
  const bgImage = (content?.background_image as string) ? wpImageUrl(content!.background_image!) : "";
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: bgColor || "linear-gradient(110deg, #0e1d60 0%, #1a3a90 35%, #1e42a0 55%, #152e80 100%)",
      }}
    >
      {bgImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <WaveLines />
      <DotGrid />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-wrap items-center gap-6 max-sm:flex-col">

          {/* Left — display heading + body */}
          <div className="flex flex-1 min-w-[312px] max-sm:min-w-0 flex-col gap-6">
            <FadeUp trigger="scroll" delay={0}>
              <h2
                style={{
                  fontFamily: font,
                  fontSize: "clamp(36px, 4vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.5%, #8B95C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  maxWidth: 803,
                }}
              >
                {heading}
              </h2>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.1}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.75 }}>
                {description}
              </p>
            </FadeUp>
          </div>

          {/* Right — AIEAT logo (white) */}
          <FadeUp trigger="scroll" delay={0.15} className="shrink-0 max-sm:w-full">
            <div style={{ width: 389, height: 98 }} className="relative max-sm:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="AI Entrepreneur Association of Thailand"
                className="size-full object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
