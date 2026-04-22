import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

interface SecondSectionContent {
  heading?: string;
  paragraphs?: string[];
  section_background_image?: string;
  cta_primary_text?: string;
  cta_primary_url?: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
}

export default function SecondSection({ content }: { content?: SecondSectionContent }) {
  const heading = (content?.heading as string) ?? "AI-AI-AI Co., Ltd.";
  const bgImage = wpImageUrl((content?.section_background_image as string) || "/images/section2-bg.png");
  const paragraphs = (content?.paragraphs as string[]) ?? [
    "AI-AI-AI Co., Ltd. helps organizations adopt AI in a practical, outcome-driven way. We operate as an AI Solution Partner (and AI development partner) to take ideas from AI strategy and roadmap through PoC, MVP, and production deployment\u2014with strong focus on integration, governance, and operating reality.",
    "We also deliver specialized solutions in Computer Vision security / AI video analytics and humanoid robotics deployment (AgiBot with enhanced AI capability).",
  ];
  const ctaPrimaryText = content?.cta_primary_text || "About Us";
  const ctaPrimaryUrl = content?.cta_primary_url || "/about";
  const ctaSecondaryText = content?.cta_secondary_text || "Contact Us";
  const ctaSecondaryUrl = content?.cta_secondary_url || "/#contact";
  return (
    <section className="relative overflow-hidden max-sm:!min-h-0" style={{ minHeight: 498 }}>

      {/* Full background image */}
      <Image
        src={bgImage}
        alt="AI-AI-AI"
        fill
        unoptimized={bgImage.startsWith("http")}
        className="z-0 object-cover"
        sizes="100vw"
        priority
      />

      {/* Full-bleed dark scrim over photo (reference: ~55–60% black) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{ background: "rgba(0,0,0,0.58)" }}
      />

      {/* Content — left aligned, padding 80px 112px */}
      <div className="relative z-[2] flex items-center max-sm:!py-10 max-sm:!px-4 max-lg:!px-8 mx-auto" style={{ padding: "80px 112px", maxWidth: 1440 }}>
        <div className="flex flex-col gap-6 max-sm:gap-5" style={{ maxWidth: 560 }}>

          {/* Heading + paragraphs — gap 16px */}
          <div className="flex flex-col gap-4">
            <FadeUp trigger="scroll" delay={0}>
              <h2 className="max-sm:!text-[26px]" style={{ fontFamily: font, fontSize: 32, color: "#fff", fontWeight: 400, lineHeight: 1.3 }}>
                {heading}
              </h2>
            </FadeUp>

            <FadeUp trigger="scroll" delay={0.1}>
              <div className="flex flex-col gap-4">
                {paragraphs.map((text, i) => (
                  <p key={i} className="max-sm:!text-[14px]" style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                    {text}
                  </p>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* CTA buttons — no chevrons, gap 16px */}
          <FadeUp trigger="scroll" delay={0.2}>
            <div className="flex items-center gap-4 w-full">
              <a href={ctaPrimaryUrl}
                className="inline-flex items-center justify-center transition-opacity hover:opacity-90 flex-1 min-w-px"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  background: "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  border: "1px solid #4A99F5",
                  borderRadius: 8,
                  padding: "12px 24px",
                  boxShadow: "0px 2px 12px rgba(0,119,255,0.8)",
                }}>
                {ctaPrimaryText}
              </a>
              <a href={ctaSecondaryUrl}
                className="inline-flex items-center justify-center transition-opacity hover:opacity-80 shrink-0"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  padding: "12px 24px",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}>
                {ctaSecondaryText}
              </a>
            </div>
          </FadeUp>

        </div>
      </div>

    </section>
  );
}
