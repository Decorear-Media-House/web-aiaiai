"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

export default function PartnerStatementSection({ content }: { content?: Record<string, unknown> }) {
  const textWhite = (content?.textWhite as string) ?? "Share your objective and constraints. ";
  const textHighlight = (content?.textHighlight as string) ?? "We\u2019ll propose a practical first step.";

  return (
    <section
      style={{
        background: "#070E24",
        paddingTop: 40,
        paddingBottom: 60,
        paddingLeft: 112,
        paddingRight: 112,
      }}
    >
      <div style={{ maxWidth: 1216, margin: "0 auto" }}>
        <FadeUp trigger="scroll" delay={0}>
          <div style={{ maxWidth: 850, width: "100%" }}>
            <p
              style={{
                fontFamily: font,
                fontSize: 48,
                fontWeight: 400,
                lineHeight: 1.2,
                margin: 0,
                textAlign: "center",
                color: "#fff",
              }}
            >
              {textWhite}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #ff8904 0%, #ff6467 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {textHighlight}
              </span>
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
