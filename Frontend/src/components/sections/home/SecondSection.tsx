import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";
import { wpImageUrl } from "@/lib/wordpress";

function ChevronRight() {
  return (
    <svg viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-3" aria-hidden="true">
      <path d="M1 1L7 6.5L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

interface SecondSectionContent {
  heading?: string;
  paragraphs?: string[];
  section_background_image?: string;
}

export default function SecondSection({ content }: { content?: SecondSectionContent }) {
  const heading = (content?.heading as string) ?? "Ai-Ai-Ai Co., Ltd.";
  const bgImage = wpImageUrl((content?.section_background_image as string) || "/images/section2-bg.png");
  const paragraphs = (content?.paragraphs as string[]) ?? [
    "Ai-Ai-Ai Co., Ltd. helps organizations adopt AI in a practical, outcome-driven way. We operate as an AI Solution Partner (and AI development partner) to take ideas from AI strategy and roadmap through PoC, MVP, and production deployment—with strong focus on integration, governance, and operating reality.",
    "We also deliver specialized solutions in Computer Vision security\u00a0/ AI video analytics and humanoid robotics deployment (AgiBo) with innovative AI capabilities.",
  ];
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 498 }}>

      {/* Full background image */}
      <Image
        src={bgImage}
        alt="Ai-Ai-Ai team"
        fill
        unoptimized={bgImage.startsWith("http")}
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Gradient overlay — dark left, transparent right (image shows through on right) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(270deg, rgba(7,17,47,0) 0%, rgba(7,17,47,1) 100%)",
        }}
      />

      {/* Content — left aligned */}
      <div className="relative flex items-center py-20 px-[112px] max-lg:px-8 max-sm:px-6" style={{ minHeight: 498 }}>
        <div className="flex flex-col gap-6" style={{ maxWidth: 560 }}>

          <FadeUp trigger="scroll" delay={0}>
            <h2 style={{ fontFamily: font, fontSize: 32, color: "#fff", fontWeight: 400, lineHeight: 1.3 }}>
              {heading}
            </h2>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            <div className="flex flex-col gap-4">
              {paragraphs.map((text, i) => (
                <p key={i} style={{ fontFamily: font, fontSize: 16, color: "#C0CED8", lineHeight: 1.75 }}>
                  {text}
                </p>
              ))}
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.2}>
            <div className="flex items-center gap-4 pt-2 max-sm:flex-col max-sm:items-start">
              <a href="/about"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  background: "linear-gradient(148deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                  border: "1px solid #4A99F5",
                  borderRadius: 8,
                  padding: "10px 20px",
                  boxShadow: "0 4px 16px rgba(74,153,245,0.25)",
                }}>
                About Us <ChevronRight />
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 transition-colors hover:bg-white/10"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: 8,
                  padding: "10px 20px",
                }}>
                Contact Us <ChevronRight />
              </a>
            </div>
          </FadeUp>

        </div>
      </div>

    </section>
  );
}
