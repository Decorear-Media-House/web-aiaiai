"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

function SparkleIcon({ color = "#4A99F5" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill={color} />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

const PHOTO = "/images/about-edge-photo.png";


const EDGES = [
  {
    title: "Partner-Led Delivery",
    desc: "We operate as your AI Solution Partner, not just advisors.",
  },
  {
    title: "Production-Minded Execution",
    desc: "Integration, monitoring, rollout planning, and governance built in.",
  },
  {
    title: "Computer Vision Depth",
    desc: "Security operations design with a strong SELEN ecosystem foundation.",
  },
  {
    title: "Lean and Scalable",
    desc: "Structured playbooks and partner ecosystem execution.",
  },
] as const;

interface AboutEdgeContent {
  label?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  edges?: Array<{ title: string; desc?: string; description?: string; icon_image?: string }>;
  edge_photo_image?: string;
}

const DEFAULT_ICONS = [
  "/images/edge-icon-1.svg",
  "/images/edge-icon-2.svg",
  "/images/edge-icon-3.svg",
  "/images/edge-icon-4.svg",
];

export default function AboutEdgeSection({ content }: { content?: AboutEdgeContent }) {
  const label = content?.label ?? "Our Edge";
  const headingPrefix = content?.headingPrefix ?? "What makes us ";
  const headingHighlight = content?.headingHighlight ?? "Different";
  const rawEdges = content?.edges ?? EDGES;
  const edges = rawEdges.map((e, i) => ({
    title: e.title,
    desc: e.desc || (e as Record<string, string>).description || "",
    iconSrc: wpImageUrl((e as Record<string, string>).icon_image || DEFAULT_ICONS[i] || DEFAULT_ICONS[0]),
  }));
  const bgImage = wpImageUrl((content?.edge_photo_image as string) || PHOTO);
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-0 size-[400px] rounded-full"
          style={{ background: "rgba(21,93,252,0.1)", filter: "blur(64px)" }} />
        <div className="absolute bottom-0 right-0 size-[365px] rounded-full"
          style={{ background: "rgba(34,52,254,0.1)", filter: "blur(64px)" }} />
      </div>

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-wrap items-center gap-6 max-sm:flex-col">

          {/* Left — label + heading + 2×2 cards */}
          <div className="flex flex-1 min-w-[312px] max-sm:min-w-0 flex-col gap-10">
            <FadeUp trigger="scroll" delay={0}>
              <div className="flex flex-col gap-4">
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
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{label}</span>
                </div>

                <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  {headingPrefix}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(162.8deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
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

            <FadeUp trigger="scroll" delay={0.1}>
              <div className="flex flex-wrap gap-4 max-sm:flex-col">
                {edges.map((edge, i) => (
                  <div
                    key={edge.title}
                    className="flex flex-1 min-w-[312px] max-sm:min-w-0 gap-4 items-start rounded-2xl p-[17px]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    {/* Icon box */}
                    <div
                      className="flex shrink-0 items-center justify-center rounded-xl"
                      style={{
                        width: 48, height: 48,
                        background: "rgba(43,127,255,0.1)",
                        border: "1px solid rgba(43,127,255,0.2)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={edge.iconSrc} alt="" width={24} height={24} />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-2">
                      <p style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5 }}>
                        {edge.title}
                      </p>
                      <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                        {edge.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — photo */}
          <FadeUp trigger="scroll" delay={0.15} className="shrink-0 max-sm:w-full">
            <div
              className="overflow-hidden rounded-2xl max-sm:w-full max-sm:h-auto"
              style={{
                width: 389,
                height: 368,
                boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bgImage} alt="AI technology" className="size-full object-cover" />
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
