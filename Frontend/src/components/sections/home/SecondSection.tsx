import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

function ChevronRight() {
  return (
    <svg viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-3" aria-hidden="true">
      <path d="M1 1L7 6.5L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const font = "var(--font-faculty-glyphic), sans-serif";

export default function SecondSection() {
  return (
    <section className="flex min-h-[498px] max-lg:flex-col" style={{ background: "#1A4494" }}>

      {/* Left — photo with gradient overlay, exactly half the section */}
      <div className="relative w-1/2 overflow-hidden max-lg:w-full max-lg:min-h-[320px]">
        <Image
          src="/images/section2-bg.png"
          alt="Ai-Ai-Ai team"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to left, rgba(26,68,148,1) 0%, rgba(26,68,148,0) 60%)" }} />
      </div>

      {/* Right — text content, exactly half with container-aware padding */}
      <div className="flex w-1/2 items-center max-lg:w-full" style={{ background: "#1A4494" }}>
        {/*
          Mirror the Container logic for just the right half:
          On 1440px screen the full container is 1216px (112px each side).
          The right half starts at the midpoint (720px from left edge of screen).
          We give it pl-[112px] to align text with the container grid,
          and pr-[112px] to match the right edge.
        */}
        <div
          className="flex w-full flex-col gap-6 py-20 pl-[112px] pr-[112px] max-lg:px-8 max-lg:py-14 max-sm:px-4"
          style={{ maxWidth: 720 }}
        >
          <FadeUp trigger="scroll" delay={0}>
            <h2 style={{ fontFamily: font, fontSize: 32, color: "#fff", fontWeight: 400, lineHeight: 1.3 }}>
              Ai-Ai-Ai Co., Ltd.
            </h2>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.1}>
            <div className="flex flex-col gap-4">
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CED8", lineHeight: 1.75 }}>
                Ai-Ai-Ai Co., Ltd. helps organizations adopt AI in a practical,
                outcome-driven way. We operate as an AI Solution Partner (and AI
                development partner) to take ideas from AI strategy and roadmap
                through PoC, MVP, and production deployment—with strong focus on
                integration, governance, and operating reality.
              </p>
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CED8", lineHeight: 1.75 }}>
                We also deliver specialized solutions in Computer Vision security&nbsp;/
                AI video analytics and humanoid robotics deployment (AgiBo) with
                innovative AI capabilities.
              </p>
            </div>
          </FadeUp>

          <FadeUp trigger="scroll" delay={0.2}>
            <div className="flex items-center gap-4 pt-2">
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
