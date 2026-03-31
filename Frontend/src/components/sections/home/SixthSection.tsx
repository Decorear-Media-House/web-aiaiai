import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

/* ── Phase Icons ────────────────────────────────────────────────────── */

function AssessIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M23 31C27.4183 31 31 27.4183 31 23C31 18.5817 27.4183 15 23 15C18.5817 15 23 31 23 31Z" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="23" cy="23" r="8" stroke="#51A2FF" strokeWidth="2"/>
      <path d="M33 33L28.7 28.7" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RoadmapIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M26.1 17.55C26.38 17.69 26.69 17.76 27 17.76C27.31 17.76 27.62 17.69 27.89 17.55L31.55 15.72C31.71 15.65 31.84 15.53 31.93 15.38C32.02 15.24 32.07 15.07 32.07 14.9V23.24C32.07 23.41 32.02 23.57 31.93 23.72C31.84 23.87 31.71 23.98 31.55 24.06L27.89 25.89C27.62 26.03 27.31 26.1 27 26.1C26.69 26.1 26.38 26.03 26.1 25.89L22.44 24.06C22.29 23.98 22.16 23.87 22.07 23.72C21.98 23.57 21.93 23.41 21.93 23.24V14.9C21.93 14.73 21.98 14.57 22.07 14.42C22.16 14.27 22.29 14.16 22.44 14.08L26.1 12.24" stroke="#A684FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27 17.76V32.76" stroke="#A684FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 15.24V30.24" stroke="#A684FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PocIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M26 14V20C26 20.34 26.08 20.67 26.25 20.96L31.76 31.04C31.92 31.34 32.01 31.69 32 32.03C31.99 32.38 31.9 32.72 31.73 33.02C31.56 33.32 31.31 33.57 31.02 33.74C30.72 33.91 30.39 34 30.05 34H17.95C17.61 34 17.28 33.91 16.98 33.74C16.69 33.57 16.44 33.32 16.27 33.02C16.1 32.72 16.01 32.38 16 32.03C15.99 31.69 16.08 31.34 16.24 31.04L21.75 20.96C21.92 20.67 22 20.34 22 20V14" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.45 27H29.55" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.5 14H27.5" stroke="#00BAF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MvpIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M23 33.73C23.3 33.91 23.65 34 24 34C24.35 34 24.7 33.91 25 33.73L32 29.73C32.3 29.56 32.56 29.3 32.73 28.99C32.91 28.68 33 28.34 33 27.99V20.01C33 19.66 32.91 19.32 32.73 19.01C32.56 18.7 32.3 18.44 32 18.27L25 14.27C24.7 14.09 24.35 14 24 14C23.65 14 23.3 14.09 23 14.27L16 18.27C15.7 18.44 15.44 18.7 15.27 19.01C15.09 19.32 15 19.66 15 20.01V27.99C15 28.34 15.09 28.68 15.27 28.99C15.44 29.3 15.7 29.56 16 29.73L23 33.73Z" stroke="#00D492" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 34V24" stroke="#00D492" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.29 19L24 24L32.71 19" stroke="#00D492" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProductionIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M16.5 28.5C15 29.76 14.5 33.5 14.5 33.5C14.5 33.5 18.24 33 19.5 31.5C20.21 30.66 20.2 29.37 19.41 28.59C18.62 27.8 17.22 27.8 16.5 28.5Z" stroke="#FF8904" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 27L21 24C21.53 22.62 22.2 21.3 23 20.05C24.17 18.19 25.79 16.65 27.71 15.59C29.64 14.53 31.8 13.97 34 14C34 16.2 33.47 18.36 32.41 20.29C31.35 22.21 29.81 23.83 27.95 25L24 27Z" stroke="#FF8904" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 24H16C16 24 16.55 20.97 18 20C19.62 18.92 23 20 23 20" stroke="#FF8904" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 27V32C24 32 27.03 31.45 28 30C29.08 28.38 28 25 28 25" stroke="#FF8904" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M34 19L25.5 27.5L20.5 22.5L14 29" stroke="#FF637E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 19H34V25" stroke="#FF637E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Data ───────────────────────────────────────────────────────────── */

const PHASES = [
  {
    step: "Step 01",
    stepGradient: "linear-gradient(90deg, #2B7FFF 0%, #00D3F3 100%)",
    iconBg: "rgba(43,127,255,0.1)",
    borderColor: "rgba(43,127,255,0.12)",
    boxShadow: "0px 0px 25px 0px rgba(59,130,246,0.15)",
    numberGradient: "linear-gradient(129deg, #2B7FFF 0%, #00D3F3 100%)",
    icon: <AssessIcon />,
    title: "Assess & Discover",
    number: "01",
    description:
      "We clarify: the business objective, process bottlenecks, data landscape, constraints, risk posture, and success criteria.",
  },
  {
    step: "Step 02",
    stepGradient: "linear-gradient(90deg, #8E51FF 0%, #2B7FFF 100%)",
    iconBg: "rgba(142,81,255,0.1)",
    borderColor: "rgba(142,81,255,0.12)",
    boxShadow: "0px 0px 25px 0px rgba(139,92,246,0.15)",
    numberGradient: "linear-gradient(138deg, #8E51FF 0%, #2B7FFF 100%)",
    icon: <RoadmapIcon />,
    title: "Roadmap",
    number: "02",
    description:
      "We prioritize: use cases, delivery phases, dependencies, integration plan, and governance model—so AI has an operational home.",
  },
  {
    step: "Step 03",
    stepGradient: "linear-gradient(90deg, #00B8DB 0%, #00D5BE 100%)",
    iconBg: "rgba(0,184,219,0.1)",
    borderColor: "rgba(0,184,219,0.12)",
    boxShadow: "0px 0px 25px 0px rgba(6,182,212,0.15)",
    numberGradient: "linear-gradient(138deg, #00B8DB 0%, #00D5BE 100%)",
    icon: <PocIcon />,
    title: "PoC",
    number: "03",
    description:
      "We validate feasibility quickly: prove that the idea works with real constraints without overbuilding.",
  },
  {
    step: "Step 04",
    stepGradient: "linear-gradient(90deg, #00BC7D 0%, #00B8DB 100%)",
    iconBg: "rgba(0,188,125,0.1)",
    borderColor: "rgba(0,188,125,0.12)",
    boxShadow: "0px 0px 25px 0px rgba(16,185,129,0.15)",
    numberGradient: "linear-gradient(138deg, #00BC7D 0%, #00B8DB 100%)",
    icon: <MvpIcon />,
    title: "MVP",
    number: "04",
    description:
      "We build the first operational version: integrated into workflows with role-based access and practical UI/alerts.",
  },
  {
    step: "Step 05",
    stepGradient: "linear-gradient(90deg, #FF8904 0%, #FF6467 100%)",
    iconBg: "rgba(255,105,0,0.1)",
    borderColor: "rgba(255,105,0,0.12)",
    boxShadow: "0px 0px 25px 0px rgba(249,115,22,0.15)",
    numberGradient: "linear-gradient(138deg, #FF6900 0%, #FF2056 100%)",
    icon: <ProductionIcon />,
    title: "Production Deployment",
    number: "05",
    description:
      "We deploy with monitoring, change control, training, and rollout plan—so users adopt it and operations can maintain it.",
  },
  {
    step: "Step 06",
    stepGradient: "linear-gradient(90deg, #FF2056 0%, #8E51FF 100%)",
    iconBg: "rgba(255,32,86,0.1)",
    borderColor: "rgba(255,32,86,0.12)",
    boxShadow: "0px 0px 25px 0px rgba(244,63,94,0.15)",
    numberGradient: "linear-gradient(137deg, #FF2056 0%, #8E51FF 100%)",
    icon: <ScaleIcon />,
    title: "Scale",
    number: "06",
    description:
      "We expand coverage: more use cases, more sites, higher performance, and improved governance based on real usage.",
  },
] as const;

/* ── Component ──────────────────────────────────────────────────────── */

export default function SixthSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute" style={{
        width: 256, height: 256, left: 0, top: 105,
        background: "rgba(21,93,252,0.1)", borderRadius: 999, filter: "blur(128px)",
      }} />
      <div className="pointer-events-none absolute" style={{
        width: 256, height: 256, right: 0, bottom: 0,
        background: "rgba(127,34,254,0.1)", borderRadius: 999, filter: "blur(128px)",
      }} />

      <Container className="relative py-20">
        <div className="flex flex-col gap-10">

          {/* ── Header ── */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2"
                style={{ background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z"
                    stroke="#00B9F2" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em" }}>
                  Our Process
                </span>
              </div>

              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
                <span style={{ color: "#fff" }}>How </span>
                <span style={{
                  backgroundImage: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>We Work</span>
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.6 }}>
                A structured, outcome-driven delivery process—from initial discovery through scale.
              </p>
            </div>
          </FadeUp>

          {/* ── Main layout ── */}
          <div className="flex gap-6 max-lg:flex-col">

            {/* Phase cards grid — 2 columns */}
            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1" style={{ flex: "0 0 803px" }}>
              {PHASES.map((phase, i) => (
                <FadeUp key={phase.title} trigger="scroll" delay={0.05 * i}>
                  <div
                    className="flex flex-col gap-4 rounded-2xl p-6 h-full"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid ${phase.borderColor}`,
                      boxShadow: phase.boxShadow,
                    }}
                  >
                    {/* Icon row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* Icon bg */}
                        <div className="flex items-center justify-center rounded-xl shrink-0"
                          style={{ width: 48, height: 48, background: phase.iconBg }}>
                          {phase.icon}
                        </div>
                        {/* Step label pill */}
                        <span
                          className="rounded-lg px-2 py-1"
                          style={{
                            background: phase.stepGradient,
                            fontFamily: font,
                            fontSize: 12,
                            fontWeight: 400,
                            color: "#070E24",
                          }}
                        >
                          {phase.step}
                        </span>
                      </div>
                      {/* Decorative step number */}
                      <span style={{
                        fontFamily: font, fontSize: 48, fontWeight: 400,
                        lineHeight: 1.2, opacity: 0.2,
                        backgroundImage: phase.numberGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}>
                        {phase.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: "#fff", lineHeight: 1.4 }}>
                      {phase.title}
                    </h3>

                    {/* Description */}
                    <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                      {phase.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Right panel — image + CTA */}
            <FadeUp trigger="scroll" delay={0.2} className="flex-1 min-h-[400px] max-lg:min-h-[320px]">
              <div className="relative flex flex-col justify-end overflow-hidden rounded-2xl h-full" style={{ minHeight: 400 }}>
                <Image
                  src="/images/howwework-side.png"
                  alt="How we work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 389px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(15,16,49,0) 0%, rgba(15,16,49,0.8) 100%)" }} />

                {/* Contact CTA */}
                <div className="relative flex flex-col gap-4 p-6">
                  <p style={{ fontFamily: font, fontSize: 15, color: "#C0CEDA", lineHeight: 1.6 }}>
                    More Information, please contact us.
                  </p>
                  <a
                    href="#"
                    className="flex items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-90"
                    style={{
                      fontFamily: font, fontSize: 15, color: "#fff",
                      padding: "12px 24px",
                      background: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                      border: "1px solid rgba(74,153,245,1.0)",
                      borderRadius: 8,
                    }}
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </Container>

    </section>
  );
}
