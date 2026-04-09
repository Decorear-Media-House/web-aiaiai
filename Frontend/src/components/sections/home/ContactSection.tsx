"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

/* ── Icons ───────────────────────────────────────────────────────── */
function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1L8.2 5.8L13 7L8.2 8.2L7 13L5.8 8.2L1 7L5.8 5.8L7 1Z" stroke="#00B9F2" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 4H4C2.896 4 2 4.895 2 6V18C2 19.105 2.896 20 4 20H20C21.105 20 22 19.105 22 18V6C22 4.895 21.105 4 20 4Z" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 7L13.03 12.7C12.721 12.893 12.364 12.996 12 12.996C11.636 12.996 11.279 12.893 10.97 12.7L2 7" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.428 21.929 12.217 22 12 22C11.783 22 11.572 21.929 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.878 4.843 5.843 6.343 4.343C7.843 2.843 9.878 2 12 2C14.122 2 16.157 2.843 17.657 4.343C19.157 5.843 20 7.878 20 10Z" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13C13.657 13 15 11.657 15 10C15 8.343 13.657 7 12 7C10.343 7 9 8.343 9 10C9 11.657 10.343 13 12 13Z" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Form field components ──────────────────────────────────────── */
const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "12px 16px",
  fontFamily: font,
  fontSize: 15,
  color: "#fff",
  outline: "none",
} as const;

const labelStyle = {
  fontFamily: font,
  fontSize: 13,
  color: "#8099BE",
  marginBottom: 8,
  display: "block",
} as const;

/* ── Types ──────────────────────────────────────────────────────── */
interface ContactContent {
  label?: string;
  heading?: string;
  description?: string;
  email?: string;
  address?: string;
  google_map_url?: string;
  background_color?: string;
  recaptcha_site_key?: string;
}

/* ── Component ──────────────────────────────────────────────────── */
export default function ContactSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as ContactContent;
  const label = c.label || "Get In Touch";
  const heading = c.heading || "Contact Us";
  const description =
    c.description ||
    "Tell us what you want to achieve—cost reduction, revenue growth, compliance improvement, security enhancement, or operational automation. We'll review your input and reach out with a practical next step.";
  const contactEmail = c.email || "info@ai-ai-ai.co";
  const contactAddress =
    c.address ||
    "1104/2 4th floor, Pattanakarn Road,\nSuan Luang, Bangkok, Thailand 10250";
  const isDev = process.env.NODE_ENV === "development";
  const recaptchaSiteKey = isDev ? "" : (c.recaptcha_site_key || "");
  const backgroundColor = c.background_color || "#070E24";
  const mapUrl = c.google_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0!2d100.6308!3d13.7230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzIyLjgiTiAxMDDCsDM3JzUwLjkiRQ!5e0!3m2!1sen!2sth!4v1700000000000";

  // Split heading into white part + last word (gradient)
  const headingWords = heading.split(" ");
  const headingGradient = headingWords.length > 1 ? headingWords.pop()! : "";
  const headingWhite = headingWords.join(" ") + (headingGradient ? " " : "");
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", company: "", role: "", message: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef<HTMLDivElement>(null);

  // Load reCAPTCHA script
  useEffect(() => {
    if (!recaptchaSiteKey) return;
    if (document.querySelector('script[src*="recaptcha"]')) return;
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [recaptchaSiteKey]);

  const renderRecaptcha = useCallback(() => {
    if (!recaptchaRef.current || !recaptchaSiteKey) return;
    if (recaptchaRef.current.childNodes.length > 0) return;
    try {
      (window as any).grecaptcha.render(recaptchaRef.current, {
        sitekey: recaptchaSiteKey,
        theme: "dark",
        callback: (token: string) => setRecaptchaToken(token),
        "expired-callback": () => setRecaptchaToken(""),
      });
    } catch { /* already rendered */ }
  }, [recaptchaSiteKey]);

  useEffect(() => {
    (window as any).onRecaptchaLoad = renderRecaptcha;
    if ((window as any).grecaptcha?.render) renderRecaptcha();
  }, [renderRecaptcha]);

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!form.fullName.trim()) newErrors.fullName = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.company.trim()) newErrors.company = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (recaptchaSiteKey && !recaptchaToken) {
      setSubmitResult({ ok: false, message: "Please complete the reCAPTCHA." });
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitResult(null);
    try {
      const wpApi = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://aiaiai-cms.decorear.com";
      const res = await fetch(`${wpApi}/wp-json/aiaiai/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          role: form.role,
          message: form.message,
          recaptchaToken,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitResult({ ok: true, message: "Message sent successfully!" });
        setForm({ fullName: "", email: "", phone: "", company: "", role: "", message: "", terms: false });
        setRecaptchaToken("");
        if ((window as any).grecaptcha) (window as any).grecaptcha.reset();
      } else {
        setSubmitResult({ ok: false, message: data.message || "Failed to send. Please try again." });
      }
    } catch {
      setSubmitResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-20" style={{ background: backgroundColor }}>

      {/* Blobs */}
      <div className="pointer-events-none absolute" style={{
        width: 384, height: 384, left: 0, top: 0,
        background: "rgba(21,93,252,0.08)", borderRadius: 999, filter: "blur(128px)",
      }} />
      <div className="pointer-events-none absolute" style={{
        width: 256, height: 256, right: 0, bottom: 0,
        background: "rgba(0,184,219,0.08)", borderRadius: 999, filter: "blur(128px)",
      }} />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-col gap-10">

          {/* Header */}
          <FadeUp trigger="scroll" delay={0}>
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start rounded-lg px-3 py-2"
                style={{ background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)" }}>
                <SparkleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em" }}>
                  {label}
                </span>
              </div>

              <h2 className="max-sm:!text-[26px]" style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3 }}>
                <span style={{ color: "#fff" }}>{headingWhite}</span>
                {headingGradient && (
                  <span style={{
                    backgroundImage: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>{headingGradient}</span>
                )}
              </h2>
            </div>
          </FadeUp>

          {/* Two-column layout */}
          <div className="flex gap-6 max-lg:flex-col">

            {/* Left — Info + Map */}
            <div className="lg:basis-[596px] lg:shrink-0 lg:grow-0 max-lg:w-full">
            <FadeUp trigger="scroll" delay={0.05} className="flex flex-col gap-8 min-w-0">

              <p style={{ fontFamily: font, fontSize: 15, color: "#8099BE", lineHeight: 1.7 }}>
                {description}
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex shrink-0 items-center justify-center rounded-xl"
                    style={{ width: 48, height: 48, background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)" }}>
                    <MailIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontFamily: font, fontSize: 12, color: "#4A6080" }}>Email</span>
                    <a href={`mailto:${contactEmail}`} style={{ fontFamily: font, fontSize: 15, color: "#fff" }}
                      className="hover:opacity-80 transition-opacity">
                      {contactEmail}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex shrink-0 items-center justify-center rounded-xl"
                    style={{ width: 48, height: 48, background: "rgba(43,127,255,0.1)", border: "1px solid rgba(43,127,255,0.2)" }}>
                    <MapPinIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontFamily: font, fontSize: 12, color: "#4A6080" }}>Address</span>
                    <p style={{ fontFamily: font, fontSize: 15, color: "#fff", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {contactAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="relative overflow-hidden rounded-2xl h-[360px] max-sm:h-[240px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: 16 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location map"
                />
              </div>
            </FadeUp>
            </div>

            {/* Right — Form */}
            <div className="flex-1 min-w-0">
            <FadeUp trigger="scroll" delay={0.1}>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-2xl p-8 max-sm:p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

                {/* Full name */}
                <div>
                  <label style={labelStyle}>Full name <span style={{ color: "#EF4444" }}>*</span></label>
                  <input
                    type="text" value={form.fullName} onChange={set("fullName")}
                    placeholder="Full name..."
                    style={{ ...inputStyle, ...(errors.fullName ? { borderColor: "#EF4444" } : {}) }}
                    className="placeholder-[#4A6080] focus:border-[rgba(74,153,245,0.4)]"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div>
                    <label style={labelStyle}>Email <span style={{ color: "#EF4444" }}>*</span></label>
                    <input type="email" value={form.email} onChange={set("email")}
                      placeholder="Email Address..."
                      style={{ ...inputStyle, ...(errors.email ? { borderColor: "#EF4444" } : {}) }}
                      className="placeholder-[#4A6080] focus:border-[rgba(74,153,245,0.4)]"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone (optional)</label>
                    <input type="tel" value={form.phone} onChange={set("phone")}
                      placeholder="+66..."
                      style={{ ...inputStyle }}
                      className="placeholder-[#4A6080] focus:border-[rgba(74,153,245,0.4)]"
                    />
                  </div>
                </div>

                {/* Company + Role */}
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div>
                    <label style={labelStyle}>Company / Organization <span style={{ color: "#EF4444" }}>*</span></label>
                    <input type="text" value={form.company} onChange={set("company")}
                      placeholder="Company / Organization..."
                      style={{ ...inputStyle, ...(errors.company ? { borderColor: "#EF4444" } : {}) }}
                      className="placeholder-[#4A6080] focus:border-[rgba(74,153,245,0.4)]"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Role / Title (optional)</label>
                    <input type="text" value={form.role} onChange={set("role")}
                      placeholder="Role / Title..."
                      style={{ ...inputStyle }}
                      className="placeholder-[#4A6080] focus:border-[rgba(74,153,245,0.4)]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={form.message} onChange={set("message")}
                    placeholder="Type your message..."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                    className="placeholder-[#4A6080] focus:border-[rgba(74,153,245,0.4)]"
                  />
                </div>

                {/* reCAPTCHA */}
                {recaptchaSiteKey && <div ref={recaptchaRef} />}

                {/* Terms */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="shrink-0 flex items-center justify-center rounded-[4px] cursor-pointer"
                    style={{
                      width: 20, height: 20,
                      background: form.terms ? "rgba(43,127,255,0.3)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${form.terms ? "rgba(74,153,245,0.6)" : "rgba(255,255,255,0.2)"}`,
                    }}
                    onClick={() => setForm(p => ({ ...p, terms: !p.terms }))}
                  >
                    {form.terms && (
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5L4.5 8.5L11 1.5" stroke="#4A99F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontFamily: font, fontSize: 13, color: "#8099BE" }}>I accept the Terms</span>
                </label>

                {/* Submit result */}
                {submitResult && (
                  <div
                    className="rounded-lg px-4 py-3"
                    style={{
                      background: submitResult.ok ? "rgba(0,188,125,0.1)" : "rgba(239,68,68,0.1)",
                      border: `1px solid ${submitResult.ok ? "rgba(0,188,125,0.3)" : "rgba(239,68,68,0.3)"}`,
                      color: submitResult.ok ? "#00BC7D" : "#EF4444",
                      fontFamily: font,
                      fontSize: 14,
                    }}
                  >
                    {submitResult.message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{
                    fontFamily: font, fontSize: 15, color: "#fff",
                    padding: "12px 24px",
                    background: "linear-gradient(90deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                    border: "1px solid rgba(74,153,245,1.0)",
                    borderRadius: 8,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Sending..." : "Submit"}
                  {!submitting && <SendIcon />}
                </button>

              </form>
            </FadeUp>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
