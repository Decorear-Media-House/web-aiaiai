"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local asset in /public/images/security/
const imgContainer  = "https://www.figma.com/api/mcp/asset/9ef75583-2418-44dd-8231-d061f207b38a";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/1f324093-3366-4184-a597-f76aa7795d85";
const imgContainer2 = "https://www.figma.com/api/mcp/asset/89502a52-67bc-455d-8674-3b74cc821d03";
const imgContainer3 = "https://www.figma.com/api/mcp/asset/f3fa04ed-de76-4c85-9f53-ead5edfc8cc4";
const imgContent    = "https://www.figma.com/api/mcp/asset/f8ebf495-66a5-435a-8bc8-2d5b3b502bb1";
const imgVertical   = "https://www.figma.com/api/mcp/asset/6e5f05c2-5233-4318-8d93-c22e5d93fea3";
const imgHorizontal = "https://www.figma.com/api/mcp/asset/f035ef83-4142-4aad-97f6-b4f36fb9f285";
const imgCheckCircle2 = "https://www.figma.com/api/mcp/asset/0a1696fd-2298-4ab1-b66f-d37af1be96c3";
const imgIncIcon  = "https://www.figma.com/api/mcp/asset/47c9b92c-609d-4eda-931d-2e25e7dc153f";
const imgIncIcon1 = "https://www.figma.com/api/mcp/asset/a122360a-b4de-498c-920d-0f90a59daffd";
const imgIncIcon2 = "https://www.figma.com/api/mcp/asset/e70db749-8a88-40f1-9237-ed1a2730304e";

const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imgCheckCircle2} alt="" width={16} height={16} className="shrink-0 mt-0.5" />
      <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEEA", lineHeight: "22.75px" }}>{text}</p>
    </div>
  );
}

const PILLARS = [
  {
    // Column 1 — has two stacked photos
    photos: [imgContainer, imgContainer1],
    icon: imgIncIcon,
    title: "Analytics packs (examples)",
    items: [
      "Restricted area / zone monitoring",
      "Anomaly detection (site-defined patterns)",
      "Event triggers (rules-based)",
      "Identity/track-based workflows (as permitted by requirements)",
    ],
  },
  {
    photos: [imgContainer2],
    icon: imgIncIcon1,
    title: "Workflows and operations",
    items: [
      "Alert routing and escalation",
      "Incident reporting and evidence capture",
      "Dashboards and performance reporting",
      "SOP alignment and operational playbooks",
    ],
  },
  {
    photos: [imgContainer3],
    icon: imgIncIcon2,
    title: "Deployment readiness",
    items: [
      "Site assessment and camera mapping",
      "Pilot design and success criteria",
      "Rollout strategy across sites and camera groups",
      "Governance (roles, access, retention practices)",
    ],
  },
];

export default function SecurityIncludedSection() {
  return (
    <section className="relative overflow-x-clip" style={{ background: "#1A4494" }}>
      {/* Background grid pattern — 20% opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute"
          style={{
            width: 1920,
            height: 1440,
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            maskImage: `url('${imgContent}')`,
            maskSize: "1440px 1440px",
            maskPosition: "240px 0px",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url('${imgContent}')`,
            WebkitMaskSize: "1440px 1440px",
            WebkitMaskPosition: "240px 0px",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgVertical}   alt="" className="absolute inset-0 size-full max-w-none" style={{ display: "block" }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgHorizontal} alt="" className="absolute inset-0 size-full max-w-none" style={{ display: "block" }} />
        </div>
      </div>

      <Container className="relative py-20">
        <div className="flex flex-col gap-10 items-center max-w-[1216px] mx-auto">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center">
              {/* Chip */}
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="3" stroke="white" strokeWidth="1.2" />
                  <circle cx="7" cy="7" r="1" fill="white" />
                </svg>
                <span style={{ fontFamily: font, fontSize: 12, color: "#fff", whiteSpace: "nowrap" }}>
                  What&rsquo;s Included
                </span>
              </div>

              {/* Heading */}
              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff", textAlign: "center" }}>
                What the Solution{" "}
                <span style={{ color: "#00BAF2" }}>Includes</span>
              </h2>

              {/* Body */}
              <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5, textAlign: "center" }}>
                Three pillars that work together to turn cameras into an operational intelligence system.
              </p>
            </div>
          </FadeUp>

          {/* 3-column pillars */}
          <div className="flex flex-wrap gap-6 items-start w-full">
            {PILLARS.map(({ photos, icon, title, items }, i) => (
              <FadeUp key={i} trigger="scroll" delay={i * 0.1} className="flex-1 min-w-[260px] flex flex-col gap-6">

                {/* Photo card */}
                <div
                  className="relative rounded-2xl overflow-hidden flex items-end shrink-0 w-full"
                  style={{ paddingTop: 180, paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }}
                >
                  {/* Photos */}
                  {photos.map((src, pi) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={pi}
                      src={src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 size-full max-w-none object-cover pointer-events-none rounded-2xl"
                      style={{ display: "block" }}
                    />
                  ))}
                  {/* Icon */}
                  <div
                    className="relative flex items-center justify-center rounded-xl shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundImage: ROYAL_SHINE,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={icon} alt="" width={24} height={24} />
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-6">
                  <h3 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, lineHeight: 1.4, color: "#fff", margin: 0 }}>
                    {title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {items.map((text) => (
                      <CheckItem key={text} text={text} />
                    ))}
                  </div>
                </div>

              </FadeUp>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
