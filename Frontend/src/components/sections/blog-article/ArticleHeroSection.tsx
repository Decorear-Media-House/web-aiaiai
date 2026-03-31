"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.334 1.333V4" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.666 1.333V4" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.667 2.667H3.333A1.333 1.333 0 002 4v9.333a1.333 1.333 0 001.333 1.334h9.334A1.333 1.333 0 0014 13.333V4a1.333 1.333 0 00-1.333-1.333z" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6.667h12" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface ArticleHeroProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  backgroundImage: string;
}

export default function ArticleHeroSection({
  category,
  title,
  excerpt,
  author,
  date,
  backgroundImage,
}: ArticleHeroProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(16,32,80,0.8), #070E24)" }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-4 pb-20 pt-[140px] max-w-[906px]">
          {/* Category label */}
          <FadeUp trigger="mount" delay={0}>
            <div
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
              style={{
                background: "rgba(0,0,0,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ fontFamily: font, fontSize: 12, color: "#fff", lineHeight: 1.5 }}>
                {category}
              </span>
            </div>
          </FadeUp>

          {/* Title */}
          <FadeUp trigger="mount" delay={0.1}>
            <h1
              style={{
                fontFamily: font,
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#fff",
                textShadow: "0px 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {title}
            </h1>
          </FadeUp>

          {/* Excerpt */}
          <FadeUp trigger="mount" delay={0.15}>
            <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
              {excerpt}
            </p>
          </FadeUp>

          {/* Author & date */}
          <FadeUp trigger="mount" delay={0.2}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{ width: 32, height: 32, backgroundImage: ROYAL_SHINE }}
                >
                  <span style={{ fontFamily: font, fontSize: 13, color: "#fff", fontWeight: 400 }}>ai</span>
                </div>
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A6080", lineHeight: 1.5 }}>
                  Written by:
                </span>
                <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5 }}>
                  {author}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A6080", lineHeight: 1.5 }}>
                  Published:
                </span>
                <CalendarIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5 }}>
                  {date}
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
