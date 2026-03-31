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

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/about-edge-ai.jpg
const PHOTO = "https://www.figma.com/api/mcp/asset/50f718c6-e4f3-4dc7-afa4-870244699ec2";

const EDGES = [
  {
    icon: "https://www.figma.com/api/mcp/asset/aac2a607-3c97-4dd9-b9b0-974b541297b4",
    title: "Partner-Led Delivery",
    desc: "We operate as your AI Solution Partner, not just advisors.",
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/3d57078d-0413-42ab-b724-fc3d014384b3",
    title: "Production-Minded Execution",
    desc: "Integration, monitoring, rollout planning, and governance built in.",
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/e5be080b-58b5-44f9-8e78-50bac112c88d",
    title: "Computer Vision Depth",
    desc: "Security operations design with a strong SELEN ecosystem foundation.",
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/7ffceb8c-d595-48a6-a372-b52e9aa143b2",
    title: "Lean and Scalable",
    desc: "Structured playbooks and partner ecosystem execution.",
  },
] as const;

export default function AboutEdgeSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-0 top-0 size-[400px] rounded-full"
          style={{ background: "rgba(21,93,252,0.1)", filter: "blur(64px)" }} />
        <div className="absolute bottom-0 right-0 size-[365px] rounded-full"
          style={{ background: "rgba(34,52,254,0.1)", filter: "blur(64px)" }} />
      </div>

      <Container className="relative py-20">
        <div className="flex flex-wrap items-center gap-6">

          {/* Left — label + heading + 2×2 cards */}
          <div className="flex flex-1 min-w-[312px] flex-col gap-10">
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
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>Our Edge</span>
                </div>

                <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  What makes us{" "}
                  <span
                    style={{
                      backgroundImage: "linear-gradient(162.8deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Different
                  </span>
                </h2>
              </div>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.1}>
              <div className="flex flex-wrap gap-4">
                {EDGES.map((edge, i) => (
                  <div
                    key={edge.title}
                    className="flex flex-1 min-w-[312px] gap-4 items-start rounded-2xl p-[17px]"
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
                      <img src={edge.icon} alt="" width={24} height={24} />
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
          <FadeUp trigger="scroll" delay={0.15} className="shrink-0">
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                width: 389,
                height: 368,
                boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTO} alt="AI technology" className="size-full object-cover" />
            </div>
          </FadeUp>

        </div>
      </Container>
    </section>
  );
}
