"use client";

import FadeUp from "@/components/animations/FadeUp";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(160deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

// TODO: Replace with local assets in /public/images/partner/
const imgHeader6    = "https://www.figma.com/api/mcp/asset/71a70910-f64e-442c-a0b8-1771234c26db";
const imgContainer  = "https://www.figma.com/api/mcp/asset/39c5ad71-5864-4be1-a38e-f6a98a34f163";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/d0bf82a0-3c77-4e57-bd5a-bbc14c6c89de";
const imgGroup      = "https://www.figma.com/api/mcp/asset/d0c3bb29-b464-4806-87ca-0bc32f1c22ac";
const imgGroup1     = "https://www.figma.com/api/mcp/asset/b01c1fe4-bc41-49ce-804b-a386d784c475";
const imgVector     = "https://www.figma.com/api/mcp/asset/5c1c1e75-878c-4dab-a52f-bed95e83d45c";
const imgVector2    = "https://www.figma.com/api/mcp/asset/788a2305-dcc2-4bfa-b750-e9e74e2e991a";
const imgVector3    = "https://www.figma.com/api/mcp/asset/1e0ee616-47e6-455d-be9a-5e8b1e977c89";
const imgVector4    = "https://www.figma.com/api/mcp/asset/6223df23-b282-487f-9eb0-5ffc742e3316";

const STATS = [
  { top: "PoC → MVP",       bottom: "Validated Delivery" },
  { top: "Governed",        bottom: "From Day One"       },
  { top: "Operationalized", bottom: "Not Just Strategy"  },
];

export default function PartnerHeroSection() {
  return (
    <section
      style={{
        position: "relative",
        height: 656,
        overflow: "hidden",
        background: "#070E24",
      }}
    >
      {/* Background image + gradient overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgHeader6}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(16,32,80,0.8), #070E24)",
          }}
        />
      </div>

      {/* Deco bottom-left corner */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 224,
          height: 511,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-12.62% -0.06% -13.18% -52.66%",
            maskImage: `url('${imgGroup}')`,
            maskSize: "224px 511px",
            maskPosition: "117.963px 64.491px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgGroup}')`,
            WebkitMaskSize: "224px 511px",
            WebkitMaskPosition: "117.963px 64.491px",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imgGroup1}
            style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", maxWidth: "none" }}
          />
        </div>
      </div>

      {/* Content — absolute fill, pt-140 pb-80 px-112 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: 140,
          paddingBottom: 80,
          paddingLeft: 112,
          paddingRight: 112,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1216,
            display: "flex",
            gap: 60,
            alignItems: "stretch",
          }}
        >
          {/* Left — photo card */}
          <div style={{ flex: "1 0 0", minWidth: 0, position: "relative", alignSelf: "stretch" }}>
            <FadeUp trigger="mount" delay={0} className="h-full">
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "4px 4px 32px 0px rgba(0,119,255,0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={imgContainer}
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", objectFit: "cover", borderRadius: 16, display: "block", pointerEvents: "none" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  src={imgContainer1}
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", objectFit: "cover", borderRadius: 16, display: "block", pointerEvents: "none" }}
                />
              </div>
            </FadeUp>
          </div>

          {/* Right — text column */}
          <div
            style={{
              flex: "1 0 0",
              maxWidth: 493,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            {/* Chip + Heading + Body */}
            <FadeUp trigger="mount" delay={0.05}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start", width: "100%" }}>
                {/* Chip */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    borderRadius: 8,
                    padding: "8px 16px",
                    background: "rgba(43,127,255,0.1)",
                    border: "1px solid rgba(43,127,255,0.2)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  {/* Team icon */}
                  <div style={{ position: "relative", width: 14, height: 14, flexShrink: 0, overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "62.5%", right: "33.33%", bottom: "12.5%", left: "8.33%" }}>
                      <div style={{ position: "absolute", inset: "-16.67% -7.14%" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector} />
                      </div>
                    </div>
                    <div style={{ position: "absolute", top: "12.5%", right: "45.83%", bottom: "54.17%", left: "20.83%" }}>
                      <div style={{ position: "absolute", inset: "-12.5%" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector2} />
                      </div>
                    </div>
                    <div style={{ position: "absolute", top: "63.04%", right: "8.33%", bottom: "12.5%", left: "79.17%" }}>
                      <div style={{ position: "absolute", inset: "-17.04% -33.33% -17.04% -33.34%" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector3} />
                      </div>
                    </div>
                    <div style={{ position: "absolute", top: "13.04%", right: "20.8%", bottom: "54.67%", left: "66.67%" }}>
                      <div style={{ position: "absolute", inset: "-12.91% -33.25%" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt="" style={{ display: "block", width: "100%", height: "100%", maxWidth: "none" }} src={imgVector4} />
                      </div>
                    </div>
                  </div>
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", whiteSpace: "pre" }}>
                    From Roadmap to Production — Delivered
                  </span>
                </div>

                {/* Heading */}
                <h1
                  style={{
                    fontFamily: font,
                    fontSize: 48,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    margin: 0,
                    backgroundImage: "linear-gradient(90deg, #fff 0%, #8B95C5 31.25%, #fff 61.54%, #8B95C5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  AI Solution Partner
                </h1>

                {/* Body */}
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, margin: 0 }}>
                  Roadmap to MVP to production deployment—delivered with governance, integration, and operational constraints in mind.
                </p>
              </div>
            </FadeUp>

            {/* CTAs */}
            <FadeUp trigger="mount" delay={0.1}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <a
                  href="#contact"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    padding: "12px 24px",
                    backgroundImage: ROYAL_SHINE,
                    border: "1px solid #4A99F5",
                    boxShadow: "0px 2px 12px 0px rgba(0,119,255,0.8)",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  Contact Us
                </a>
                <a
                  href="/services"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    padding: "12px 24px",
                    background: "rgba(10,19,47,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  All Services
                </a>
              </div>
            </FadeUp>

            {/* Stat chips */}
            <FadeUp trigger="mount" delay={0.15}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, width: "100%" }}>
                {STATS.map(({ top, bottom }) => (
                  <div
                    key={top}
                    style={{
                      flex: "1 0 0",
                      minWidth: 100,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      padding: "16px 32px",
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: font,
                        fontSize: 16,
                        lineHeight: 1.5,
                        whiteSpace: "nowrap",
                        backgroundImage: ROYAL_SHINE,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {top}
                    </span>
                    <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5, whiteSpace: "nowrap" }}>
                      {bottom}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
