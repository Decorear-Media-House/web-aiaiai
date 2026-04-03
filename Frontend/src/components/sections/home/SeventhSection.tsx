import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

interface SeventhSectionContent {
  heading?: string;
  description?: string;
  background_video?: string;
}

const TAGS = ["Cost Reduction", "Revenue Growth", "Compliance", "Security", "Automation"];

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z"
        stroke="white" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
      <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SeventhSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as SeventhSectionContent;
  const heading = c.heading || "Ready to ship AI that produces outcomes?";
  const description =
    c.description ||
    "Tell us what outcome matters most\u2014cost, revenue, compliance, security, or automation\u2014and we\u2019ll propose a practical first step";
  const backgroundVideo = c.background_video ? wpImageUrl(c.background_video) : "/videos/CTA-Loop.mp4";

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 494 }}>

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 size-full object-cover pointer-events-none"
        aria-hidden="true"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Dark blue tint overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(14,42,95,0.6)" }} />

      {/* Central blue glow bloom */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 494, height: 494,
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(26,68,148,1.0)",
          borderRadius: "50%",
          filter: "blur(247px)",
          opacity: 0.7,
        }}
      />

      <Container className="relative py-20 max-sm:py-10">
        <FadeUp trigger="scroll" delay={0}>
          <div className="flex flex-col items-center gap-10 text-center">

            {/* Text + tags */}
            <div className="flex flex-col items-center gap-6" style={{ maxWidth: 596 }}>
              {/* Headline */}
              <h2
                style={{
                  fontFamily: font,
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  backgroundImage: "linear-gradient(135deg, #fff 0%, #8B95C5 31%, #fff 62%, #8B95C5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {heading}
              </h2>

              {/* Subtext */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEDA", lineHeight: 1.6 }}>
                {description}
              </p>

              {/* Outcome tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {TAGS.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <SparkleIcon />
                    <span style={{ fontFamily: font, fontSize: 13, color: "#fff" }}>
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-4 max-sm:flex-col max-sm:w-full">
              {/* Primary — Get Started */}
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-90 max-sm:w-full"
                style={{
                  fontFamily: font, fontSize: 15, color: "#fff",
                  padding: "12px 24px",
                  background: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  border: "1px solid rgba(74,153,245,1.0)",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                }}
              >
                Get Started
                <ChevronRight />
              </a>

              {/* Secondary — About Us */}
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-80 max-sm:w-full"
                style={{
                  fontFamily: font, fontSize: 15, color: "#fff",
                  padding: "12px 24px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                }}
              >
                About Us
                <ChevronRight />
              </a>
            </div>

          </div>
        </FadeUp>
      </Container>

    </section>
  );
}
