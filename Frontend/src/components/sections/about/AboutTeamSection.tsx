"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const CEO_PHOTO = "/images/about-ceo.png";
const CTO_PHOTO = "/images/about-cto.png";
const COO_PHOTO = "/images/about-coo.png";

const ROYAL_SHINE = "linear-gradient(148deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

const CEO_TAGS = ["AI Strategy", "AIEAT President", "Robotics"] as const;

function InitialsPlaceholder({ name, height }: { name: string; height: number }) {
  const initials = name
    .split(" ")
    .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "100%",
        height,
        background: "linear-gradient(135deg, #1A2744 0%, #0E1A33 100%)",
        border: "1px solid rgba(74,153,245,0.15)",
      }}
    >
      <span
        style={{
          fontFamily: font,
          fontSize: 48,
          color: "rgba(74,153,245,0.4)",
          fontWeight: 400,
          userSelect: "none",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

function CardGlassFooter({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div
      className="w-full p-8"
      style={{
        background: "rgba(7,14,36,0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}

interface AboutTeamContent {
  label?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  description?: string;
  ceoName?: string;
  ceoRole?: string;
  ceoBio?: string;
  ceoTags?: string[];
  ctoName?: string;
  ctoRole?: string;
  cooName?: string;
  cooRole?: string;
  ceo_photo_image?: string;
  cto_photo_image?: string;
  coo_photo_image?: string;
  ceo_photo_mobile_image?: string;
  cto_photo_mobile_image?: string;
  coo_photo_mobile_image?: string;
}

export default function AboutTeamSection({ content }: { content?: AboutTeamContent }) {
  const label = content?.label ?? "Our People";
  const headingPrefix = content?.headingPrefix ?? "Management ";
  const headingHighlight = content?.headingHighlight ?? "Team";
  const sectionDescription = content?.description ??
    "Experienced leaders bringing together AI strategy, engineering depth, and operational excellence.";
  const ceoName = content?.ceoName ?? "Dr. Chanwit Boonchuay";
  const ceoRole = content?.ceoRole ?? "CEO";
  const ceoBio = content?.ceoBio ??
    "President of the AI Entrepreneur Association of Thailand (AIEAT). With decades of experience in AI strategy and implementation, Dr. Chanwit leads Ai-Ai-Ai\u0027s vision of making AI adoption practical and production-ready across Southeast Asia.";
  const ceoTags = content?.ceoTags ?? CEO_TAGS;
  const ctoName = content?.ctoName ?? "Sivarat Malapet";
  const ctoRole = content?.ctoRole ?? "CTO";
  const cooName = content?.cooName ?? "Keerati Luengwattanakit";
  const cooRole = content?.cooRole ?? "COO";

  const ceoPhoto = wpImageUrl((content?.ceo_photo_image as string) || CEO_PHOTO);
  const ctoPhoto = wpImageUrl((content?.cto_photo_image as string) || CTO_PHOTO);
  const cooPhoto = wpImageUrl((content?.coo_photo_image as string) || COO_PHOTO);
  const ceoPhotoMobile = (content?.ceo_photo_mobile_image as string) ? wpImageUrl(content!.ceo_photo_mobile_image!) : ceoPhoto;
  const ctoPhotoMobile = (content?.cto_photo_mobile_image as string) ? wpImageUrl(content!.cto_photo_mobile_image!) : ctoPhoto;
  const cooPhotoMobile = (content?.coo_photo_mobile_image as string) ? wpImageUrl(content!.coo_photo_mobile_image!) : cooPhoto;

  return (
    <section className="relative overflow-hidden" style={{ background: "#070E24" }}>
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(74,153,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(74,153,245,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Top center glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 size-[600px] rounded-full"
        aria-hidden="true"
        style={{ background: "rgba(21,93,252,0.1)", filter: "blur(96px)" }}
      />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-col gap-12 items-center">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4 items-center text-center max-w-[596px]">
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
                </svg>
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{label}</span>
              </div>

              <h2 style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                {headingPrefix}
                <span style={{ backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {headingHighlight}
                </span>
              </h2>

              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                {sectionDescription}
              </p>
            </div>
          </FadeUp>

          {/* Card layout: CEO wider, CTO+COO equal */}
          <div className="flex w-full gap-6 max-lg:flex-col">

            {/* CEO */}
            <FadeUp trigger="scroll" delay={0.1} className="w-full max-w-[493px] max-lg:max-w-full">
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col h-full"
                style={{ border: "1px solid #1E2E48" }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden h-[300px] max-sm:h-[280px]">
                  {ceoPhoto ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <picture className="absolute inset-0 size-full">
                      <source media="(max-width: 640px)" srcSet={ceoPhotoMobile} />
                      <img src={ceoPhoto} alt={ceoName} className="size-full object-cover object-top" />
                    </picture>
                  ) : (
                    <InitialsPlaceholder name={ceoName} height={300} />
                  )}
                </div>
                {/* Footer */}
                <CardGlassFooter>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline gap-2 whitespace-nowrap">
                      <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {ceoRole}
                      </span>
                      <span style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>
                        {ceoName}
                      </span>
                    </div>
                    <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5, textAlign: "center" }}>
                      {ceoBio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {ceoTags.map((tag) => (
                        <div
                          key={tag}
                          className="inline-flex items-center rounded-lg px-4 py-2"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                          <span style={{ fontFamily: font, fontSize: 12, color: "#fff" }}>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardGlassFooter>
              </div>
            </FadeUp>

            {/* CTO */}
            <FadeUp trigger="scroll" delay={0.15} className="flex-1 max-lg:w-full">
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col h-[584px] max-sm:h-[400px] min-w-[240px]"
                style={{ border: "1px solid #1E2E48" }}
              >
                {ctoPhoto ? (
                  <picture className="absolute inset-0 size-full">
                    <source media="(max-width: 640px)" srcSet={ctoPhotoMobile} />
                    <img src={ctoPhoto} alt={ctoName} className="size-full object-cover object-top" />
                  </picture>
                ) : (
                  <InitialsPlaceholder name={ctoName} height={584} />
                )}
                <div className="mt-auto relative">
                  <CardGlassFooter centered>
                    <div className="flex items-baseline gap-2 justify-center whitespace-nowrap">
                      <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {ctoRole}
                      </span>
                      <span style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>
                        {ctoName}
                      </span>
                    </div>
                  </CardGlassFooter>
                </div>
              </div>
            </FadeUp>

            {/* COO */}
            <FadeUp trigger="scroll" delay={0.2} className="flex-1 max-lg:w-full">
              <div
                className="relative overflow-hidden rounded-2xl flex flex-col h-[584px] max-sm:h-[400px] min-w-[240px]"
                style={{ border: "1px solid #1E2E48" }}
              >
                {cooPhoto ? (
                  <picture className="absolute inset-0 size-full">
                    <source media="(max-width: 640px)" srcSet={cooPhotoMobile} />
                    <img src={cooPhoto} alt={cooName} className="size-full object-cover object-top" />
                  </picture>
                ) : (
                  <InitialsPlaceholder name={cooName} height={584} />
                )}
                <div className="mt-auto relative">
                  <CardGlassFooter centered>
                    <div className="flex items-baseline gap-2 justify-center whitespace-nowrap">
                      <span style={{ fontFamily: font, fontSize: 24, lineHeight: 1.4, backgroundImage: ROYAL_SHINE, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {cooRole}
                      </span>
                      <span style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>
                        {cooName}
                      </span>
                    </div>
                  </CardGlassFooter>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </Container>
    </section>
  );
}
