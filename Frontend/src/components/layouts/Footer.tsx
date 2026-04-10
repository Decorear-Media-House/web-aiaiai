import Image from "next/image";
import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const NAV_LINKS = [
  { label: "Home", href: "/", active: true },
  { label: "About Us", href: "/about", active: false },
  { label: "Blog", href: "/blog", active: false },
  { label: "Contact", href: "/#contact", active: false },
];

const SERVICE_LINKS = [
  { label: "All Services", href: "/services" },
  { label: "AI Security Guard Solution", href: "/services/security" },
  { label: "Embodied AI & Humanoid Robotic Solution", href: "/services/humanoid" },
  { label: "AI Solution Partner", href: "/services/partner" },
];

/* ── Inline Icons (24x24) ───────────────────────────────────────── */

function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.74 20.99 20.48 21 20.22 21C10.07 21 1.73 12.66 1.73 2.5C1.73 2.24 1.74 1.98 1.76 1.73C1.8 1.17 2.25 0.73 2.81 0.73H5.81C6.33 0.73 6.77 1.12 6.82 1.64C6.87 2.11 6.97 2.57 7.12 3.02C7.28 3.51 7.15 4.05 6.78 4.42L5.5 5.7C6.87 8.3 8.97 10.4 11.57 11.77L12.85 10.49C13.22 10.12 13.76 9.99 14.25 10.15C14.7 10.3 15.16 10.4 15.63 10.45C16.15 10.5 16.54 10.94 16.54 11.46V14.46" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LineIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M12 2C6.48 2 2 5.58 2 10C2 13.03 3.97 15.67 6.93 17.15L6.5 20.5C6.47 20.74 6.62 20.97 6.85 21.04C6.9 21.06 6.96 21.06 7.01 21.06C7.19 21.06 7.36 20.97 7.46 20.82L9.53 17.63C10.33 17.79 11.16 17.88 12 17.88C17.52 17.88 22 14.3 22 9.88C22 5.58 17.52 2 12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Component ──────────────────────────────────────────────────── */

interface FooterProps {
  background_image?: string;
  email_label?: string;
  email_url?: string;
  phone_label?: string;
  phone_url?: string;
  line_label?: string;
  line_url?: string;
  copyright?: string;
}

export default function Footer({ background_image, email_label, email_url, phone_label, phone_url, line_label, line_url, copyright }: FooterProps = {}) {
  const bgImage = background_image ? wpImageUrl(background_image) : "/images/footer-bg.png";
  const emailText = email_label || "info@ai-ai-ai.co";
  const emailHref = email_url || "mailto:info@ai-ai-ai.co";
  const phoneText = phone_label || "(66) 82 335 2444";
  const phoneHref = phone_url || "tel:+66823352444";
  const lineText = line_label || "Contact us via LINE";
  const lineHref = line_url || "#";
  const copyrightText = copyright || "© 2026 Ai-Ai-Ai Co., Ltd. All rights reserved. | Powered by Decorear";

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#070e24", borderTop: "1px solid rgba(43,127,255,0.1)" }}
    >
      {/* Background image */}
      <Image
        src={bgImage}
        alt=""
        fill
        unoptimized={bgImage.startsWith("http")}
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(163deg, rgba(7,14,36,0.9) 0%, rgba(16,32,80,0.9) 50%, rgba(26,68,148,0.9) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full px-[112px] max-lg:px-8 max-sm:px-4" style={{ maxWidth: 1440 }}>
        <div className="flex flex-col pt-20 pb-6 max-sm:!pt-10 max-sm:!pb-4" style={{ gap: 40 }}>

          {/* ── Main row ── */}
          <div className="flex gap-20 flex-wrap max-lg:flex-col max-sm:!gap-10">

            {/* Left: Logo + company name + address */}
            <div className="flex flex-col shrink-0 max-sm:!min-w-0" style={{ maxWidth: 389, minWidth: 300, flex: "1 0 0", gap: 32 }}>
              <div style={{ width: "fit-content" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aiaiai-logo.svg"
                  alt="ai·ai·ai"
                  width={300}
                  height={46}
                  className="max-sm:!w-[200px] max-sm:!h-auto"
                />
              </div>
              <div className="flex flex-col" style={{ gap: 24 }}>
                <p className="max-sm:!text-[24px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, color: "#4A99F5", lineHeight: 1.3 }}>
                  Ai-Ai-Ai Co., Ltd.
                </p>
                <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                  1104/2 4th floor, Pattanakarn Road, Suan Luang, Bangkok, Thailand 10250
                </p>
              </div>
            </div>

            {/* Right: 3 nav columns */}
            <div className="flex flex-1 flex-wrap gap-6 min-w-[327px] max-sm:!min-w-0 max-sm:!gap-8">

              {/* Company */}
              <div className="flex flex-col flex-1 min-w-[140px]" style={{ gap: 20 }}>
                <span style={{ fontFamily: font, fontSize: 14, color: "#4A6080" }}>Company:</span>
                <ul className="flex flex-col" style={{ gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
                  {NAV_LINKS.map(({ label, href, active }) => (
                    <li key={label}>
                      <a
                        href={href}
                        style={{
                          fontFamily: font,
                          fontSize: 16,
                          color: active ? "#4A99F5" : "#ffffff",
                          textDecoration: "none",
                        }}
                        className="hover:opacity-80 transition-opacity"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="flex flex-col flex-1 min-w-[140px]" style={{ gap: 24 }}>
                <span style={{ fontFamily: font, fontSize: 14, color: "#4A6080" }}>Services:</span>
                <ul className="flex flex-col" style={{ gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
                  {SERVICE_LINKS.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        style={{ fontFamily: font, fontSize: 16, color: "#ffffff", textDecoration: "none" }}
                        className="hover:opacity-80 transition-opacity"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="flex flex-col flex-1 min-w-[140px]" style={{ gap: 20 }}>
                <span style={{ fontFamily: font, fontSize: 14, color: "#4A6080" }}>Contact:</span>
                <div className="flex flex-col" style={{ gap: 12 }}>
                  {/* Email */}
                  <a
                    href={emailHref}
                    className="flex items-center hover:opacity-80 transition-opacity"
                    style={{ gap: 8, textDecoration: "none" }}
                  >
                    <EmailIcon />
                    <span style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5 }}>{emailText}</span>
                  </a>
                  {/* Phone */}
                  {phoneText && (
                    <a
                      href={phoneHref}
                      className="flex items-center hover:opacity-80 transition-opacity"
                      style={{ gap: 8, textDecoration: "none" }}
                    >
                      <PhoneIcon />
                      <span style={{ fontFamily: font, fontSize: 16, color: "#ffffff", lineHeight: 1.5 }}>{phoneText}</span>
                    </a>
                  )}
                  {/* LINE */}
                  {lineText && (
                    <a
                      href={lineHref}
                      className="flex items-center hover:opacity-80 transition-opacity"
                      style={{ gap: 8, textDecoration: "none" }}
                    >
                      <LineIcon />
                      <span style={{ fontFamily: font, fontSize: 16, color: "#ffffff", lineHeight: 1.5 }}>{lineText}</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ── Copyright bar ── */}
          <div
            style={{
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p style={{ fontFamily: font, fontSize: 14, color: "#4A6080", textAlign: "center" }}>
              {copyrightText}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
