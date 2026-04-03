import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

interface ServiceItem {
  label: string;
  heading: string;
  description: string;
  cta: string;
  href: string;
  card_background_image?: string;
}

interface FourthSectionContent {
  label?: string;
  heading?: string;
  description?: string;
  items?: ServiceItem[];
}

const DEFAULT_SERVICES = [
  {
    image: "/images/service1-security.png",
    href: "/services/security",
    overlayColor: "rgba(27,12,35,0.55)",
    overlayHoverColor: "rgba(27,12,35,0.78)",
    label: "Computer Vision · Analytics",
    heading: "AI Security Guard Solution",
    headingGradient: "linear-gradient(90deg, #8E51FF 0%, #AD46FF 100%)",
    description:
      "Computer Vision and AI video analytics / AI video surveillance for event detection, alerts, and incident workflows.",
    cta: "Explore Security Platform",
  },
  {
    image: "/images/service2-robotics.png",
    href: "/services/humanoid",
    overlayColor: "rgba(36,11,7,0.55)",
    overlayHoverColor: "rgba(36,11,7,0.78)",
    label: "AgiBot · Robotics · Automation",
    heading: "AI-Enhanced Humanoid Robotics",
    headingGradient: "linear-gradient(90deg, #FF8904 0%, #FF6467 100%)",
    description:
      "AgiBot humanoid robotics deployment and workflow integration with enhanced AI capability designed for operational readiness and scale.",
    cta: "Explore Robotics",
  },
  {
    image: "/images/service3-ai-partner.png",
    href: "/services/partner",
    overlayColor: "rgba(7,14,36,0.55)",
    overlayHoverColor: "rgba(7,14,36,0.78)",
    label: "Strategy · PoC · Production",
    heading: "AI Solution Partner",
    headingGradient: "linear-gradient(90deg, #2B7FFF 0%, #00B8DB 100%)",
    description:
      "AI consulting and hands-on delivery: AI roadmap → PoC → MVP → production deployment, built for real operations.",
    cta: "Explore AI Solution Partner",
  },
];

function GoalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="#4A99F5" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="3.5" stroke="#4A99F5" strokeWidth="1.2" />
      <circle cx="7" cy="7" r="1" fill="#4A99F5" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z" stroke="white" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

export default function FourthSection({ content }: { content?: FourthSectionContent }) {
  const headerLabel = (content?.label as string) ?? "Our Services";
  const headerHeading = (content?.heading as string) ?? "What We Do";
  const headerDescription =
    (content?.description as string) ??
    "Three specialized AI solution lines designed to deliver measurable outcomes across security, automation, and digital transformation.";
  const contentItems = content?.items as ServiceItem[] | undefined;

  const SERVICES = DEFAULT_SERVICES.map((svc, i) => ({
    ...svc,
    image: contentItems?.[i]?.card_background_image ? wpImageUrl(contentItems[i].card_background_image!) : svc.image,
    label: contentItems?.[i]?.label ?? svc.label,
    heading: contentItems?.[i]?.heading ?? svc.heading,
    description: contentItems?.[i]?.description ?? svc.description,
    cta: contentItems?.[i]?.cta ?? svc.cta,
    href: contentItems?.[i]?.href ?? svc.href,
  }));

  return (
    <section style={{ background: "#060D29" }}>

      {/* ── Top header band ── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(90deg, #060D29 0%, #071536 50%, #060D29 100%)" }}
      >
        {/* Decorative grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74,153,245,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74,153,245,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <Container className="relative py-20 max-sm:py-10">
          <FadeUp trigger="scroll" delay={0}>
            <div className="relative flex flex-col items-center gap-4 text-center">
              {/* Label */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                }}
              >
                <GoalIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em" }}>
                  {headerLabel}
                </span>
              </div>

              {/* h2 */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
                <span style={{ color: "#fff" }}>{headerHeading.split(" ").slice(0, -1).join(" ")}{headerHeading.includes(" ") ? " " : ""}</span>
                <span style={{
                  backgroundImage: "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{headerHeading.split(" ").pop()}</span>
              </h2>

              {/* Body */}
              <p className="max-w-[560px]" style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.6 }}>
                {headerDescription}
              </p>
            </div>
          </FadeUp>
        </Container>
      </div>

      {/* ── 3-column services row ── */}
      <div className="flex max-lg:flex-col">
        {SERVICES.map((svc, i) => (
          <FadeUp key={svc.heading} trigger="scroll" delay={i * 0.1} className="flex-1 max-lg:w-full">
            {/* Whole card is a link */}
            <a
              href={svc.href}
              className="group relative flex flex-col justify-end overflow-hidden max-lg:min-h-[500px] block"
              style={{
                minHeight: 616,
                borderLeft: i > 0 ? "1px solid rgba(74,96,128,0.4)" : undefined,
              }}
            >
              {/* Background photo — scales up on hover */}
              <Image
                src={svc.image}
                alt={svc.heading}
                fill
                unoptimized={svc.image.startsWith("http")}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />

              {/* Gradient overlay on image */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(16,32,80,0.1) 0%, rgba(0,0,0,0.5) 100%)" }}
              />

              {/* Content panel — darkens on hover */}
              <div
                className="relative flex flex-col items-center gap-6 p-10 text-center transition-colors duration-500"
                style={{
                  background: svc.overlayColor,
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Extra dark layer that fades in on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "rgba(0,0,0,0.28)" }}
                />

                {/* Inner content */}
                <div className="relative flex flex-col items-center gap-4 text-center">
                  {/* Label badge */}
                  <div
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <SparklesIcon />
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff", letterSpacing: "0.04em" }}>
                      {svc.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3
                    style={{
                      fontFamily: font, fontSize: 22, fontWeight: 400, lineHeight: 1.3,
                      backgroundImage: svc.headingGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {svc.heading}
                  </h3>

                  {/* Description */}
                  <p style={{ fontFamily: font, fontSize: 15, color: "#C0CEDA", lineHeight: 1.7 }}>
                    {svc.description}
                  </p>

                  {/* Text CTA */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: 15,
                        backgroundImage: svc.headingGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {svc.cta}
                    </span>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
                      <defs>
                        <linearGradient id={`cta-chevron-${i}`} x1="0" y1="0" x2="1" y2="0">
                          <stop stopColor={svc.headingGradient.match(/#\w+/g)?.[0] ?? "#fff"} />
                          <stop offset="1" stopColor={svc.headingGradient.match(/#\w+/g)?.[1] ?? "#fff"} />
                        </linearGradient>
                      </defs>
                      <path d="M1 1L6 6L1 11" stroke={`url(#cta-chevron-${i})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </FadeUp>
        ))}
      </div>

    </section>
  );
}
