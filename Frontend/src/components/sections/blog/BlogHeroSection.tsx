"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

function SparkleIcon({ color = "#4A99F5" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill={color} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.875 11.875C9.63642 11.875 11.875 9.63642 11.875 6.875C11.875 4.11358 9.63642 1.875 6.875 1.875C4.11358 1.875 1.875 4.11358 1.875 6.875C1.875 9.63642 4.11358 11.875 6.875 11.875Z" stroke="#8099BE" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.125 13.125L10.4375 10.4375" stroke="#8099BE" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

interface BlogHeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function BlogHeroSection({ search, onSearchChange }: BlogHeroSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/images/blog-hero-bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(16,32,80,0.8), #070E24)" }}
        />
      </div>

      <Container className="relative">
        <div className="flex flex-col gap-6 pb-20 pt-[140px] max-w-[493px]">
          {/* Label badge */}
          <div className="flex flex-col gap-4">
            <FadeUp trigger="mount" delay={0}>
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <SparkleIcon color="#4A99F5" />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", lineHeight: 1.5 }}>
                  Insights &amp; Updates
                </span>
              </div>
            </FadeUp>

            {/* Title */}
            <FadeUp trigger="mount" delay={0.1}>
              <h1
                style={{
                  fontFamily: font,
                  fontSize: "clamp(36px, 4vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.5%, #8B95C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0px 2px 8px rgba(0,0,0,0.8)",
                }}
              >
                Blog
              </h1>
            </FadeUp>

            {/* Description */}
            <FadeUp trigger="mount" delay={0.15}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                Practical thinking on AI delivery, governance, security, and robotics — from the people doing the work.
              </p>
            </FadeUp>
          </div>

          {/* Search input */}
          <FadeUp trigger="mount" delay={0.2}>
            <div
              className="flex items-center gap-2 w-full rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <SearchIcon />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none w-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: "#fff",
                }}
              />
              <style>{`
                input::placeholder { color: #8099BE; }
              `}</style>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
