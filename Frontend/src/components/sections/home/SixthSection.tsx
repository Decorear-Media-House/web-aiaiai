import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

/* ── Phase Icons ────────────────────────────────────────────────────── */

function AssessIcon() {
  return (
    <Image src="/images/process-icons/step-01.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function RoadmapIcon() {
  return (
    <Image src="/images/process-icons/step-02.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function PocIcon() {
  return (
    <Image src="/images/process-icons/step-03.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function MvpIcon() {
  return (
    <Image src="/images/process-icons/step-04.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function ProductionIcon() {
  return (
    <Image src="/images/process-icons/step-05.svg" alt="" width={24} height={24} aria-hidden="true" />
  );
}

function ScaleIcon() {
  return (
    <Image src="/images/process-icons/step-06.svg" alt="" width={24} height={24} aria-hidden="true" />
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

/* ── Types ─────────────────────────────────────────────────────────── */

interface SixthSectionContent {
  label?: string;
  heading?: string;
  description?: string;
  side_panel_image?: string;
  cta_text?: string;
  cta_url?: string;
}

/* ── Component ──────────────────────────────────────────────────────── */

export default function SixthSection({ content }: { content?: Record<string, unknown> }) {
  const c = content as SixthSectionContent | undefined;
  const label = c?.label ?? "Our Process";
  const heading = c?.heading ?? "How We Work";
  const description =
    c?.description ??
    "A structured, outcome-driven delivery process—from initial discovery through scale.";
  const sidePanelImage = c?.side_panel_image ? wpImageUrl(c.side_panel_image) : "/images/howwework-side.png";
  const ctaText = c?.cta_text || "Contact Us";
  const ctaUrl = c?.cta_url || "#contact";

  /* Split heading into white part + gradient part (last two words) */
  const words = heading.split(" ");
  const gradientText = words.length > 1 ? words.slice(-2).join(" ") : heading;
  const whiteText = words.length > 1 ? words.slice(0, -2).join(" ") + " " : "";
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#070E24",
        borderTop: "2px solid transparent",
        borderImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(43,127,255,0.5) 50%, rgba(0,0,0,0) 100%) 1",
      }}
    >

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute" style={{
        width: 256, height: 256, left: 0, top: 105,
        background: "rgba(21,93,252,0.1)", borderRadius: 999, filter: "blur(128px)",
      }} />
      <div className="pointer-events-none absolute" style={{
        width: 256, height: 256, right: 0, bottom: 0,
        background: "rgba(127,34,254,0.1)", borderRadius: 999, filter: "blur(128px)",
      }} />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-col gap-10 max-sm:gap-8">

          {/* ── Header ── */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 max-sm:items-center max-sm:text-center">
              <div className="inline-flex items-center gap-2 self-start max-sm:self-center rounded-lg px-3 py-2"
                style={{ background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z"
                    stroke="#00B9F2" strokeWidth="1.1" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em" }}>
                  {label}
                </span>
              </div>

              <h2 className="max-sm:!text-[26px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
                <span style={{ color: "#fff" }}>{whiteText}</span>
                <span style={{
                  backgroundImage: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>{gradientText}</span>
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.6 }}>
                {description}
              </p>
            </div>
          </FadeUp>

          {/* ── Main layout ── */}
          <div className="flex gap-6 max-lg:flex-col">

            {/* Phase cards grid — 2 columns */}
            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1 lg:basis-[803px] lg:shrink-0 lg:grow-0">
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
                    <h3 className="max-sm:!text-[20px]" style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: "#fff", lineHeight: 1.4 }}>
                      {phase.title}
                    </h3>

                    {/* Description */}
                    <p className="max-sm:!text-[14px]" style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                      {phase.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Right panel — image + CTA (below cards on mobile) */}
            <FadeUp trigger="scroll" delay={0.2} className="flex-1 min-h-[400px] max-lg:min-h-[320px] max-sm:min-h-[250px]">
              <div className="relative flex flex-col justify-end overflow-hidden rounded-2xl h-full" style={{ minHeight: 400 }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 size-full object-cover"
                >
                  <source src="/videos/a2-ultra.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(15,16,49,0) 0%, rgba(15,16,49,0.8) 100%)" }} />

                {/* Contact CTA */}
                <div className="relative flex flex-col gap-4 p-6">
                  <p style={{ fontFamily: font, fontSize: 15, color: "#C0CEDA", lineHeight: 1.6 }}>
                    More Information, please contact us.
                  </p>
                  <a
                    href={ctaUrl}
                    className="flex items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-90"
                    style={{
                      fontFamily: font, fontSize: 15, color: "#fff",
                      padding: "12px 24px",
                      background: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                      border: "1px solid rgba(74,153,245,1.0)",
                      borderRadius: 8,
                    }}
                  >
                    {ctaText}
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
