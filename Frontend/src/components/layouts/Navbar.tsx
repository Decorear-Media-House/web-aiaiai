"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Container from "./Container";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(148deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

const SERVICES = [
  { label: "AI Security Guard Solution", href: "/services/security" },
  { label: "AI-Enhanced Humanoid Robotics", href: "/services/humanoid" },
  { label: "AI Solution Partner", href: "/services/partner" },
] as const;

function ChevronDown() {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}

/* ─── CTA Button (desktop) ─────────────────────────────────── */
function GetInTouchButton({ href = "#", className = "" }: { href?: string; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center transition-opacity hover:opacity-90 ${className}`}
      style={{
        fontFamily: font,
        fontSize: 16,
        color: "#fff",
        background: ROYAL_SHINE,
        border: "1px solid #4A99F5",
        borderRadius: 8,
        padding: "8px 16px",
        boxShadow: "0 4px 16px rgba(74,153,245,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      Get in Touch
    </a>
  );
}

/* ─── Send Button (mobile CTA icon) ───────────────────────── */
function SendButton({ href = "#" }: { href?: string }) {
  return (
    <a
      href={href}
      aria-label="Get in Touch"
      className="flex items-center justify-center transition-opacity hover:opacity-90 shrink-0"
      style={{
        width: 44,
        height: 44,
        background: ROYAL_SHINE,
        border: "1px solid #4A99F5",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(74,153,245,0.3)",
      }}
    >
      <SendIcon />
    </a>
  );
}

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesBtnRef = useRef<HTMLAnchorElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (servicesBtnRef.current) {
      const rect = servicesBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
    setServicesOpen(true);
  };

  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  /* Recalculate dropdown position whenever it opens */
  useEffect(() => {
    if (servicesOpen && servicesBtnRef.current) {
      const rect = servicesBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
  }, [servicesOpen]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Nav bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: "rgba(7,14,36,0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          height: 72,
        }}
      >
        <Container className="flex h-full items-center justify-between">

          {/* Logo + tagline */}
          <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Ai-Ai-Ai Home">
            <Image src="/images/aiaiai-logo.svg" alt="ai·ai·ai" width={160} height={26} priority />
            <span
              className="hidden sm:block"
              style={{ fontFamily: font, fontSize: 12, color: "#4A99F5", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
            >
              AI Solution Partner
            </span>
          </a>

          {/* ── Desktop nav + CTA grouped right ── */}
          <div className="hidden md:flex items-center gap-8">

            {/* Home (active) */}
            <a
              href="/"
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#4A99F5" }}
            >
              Home
            </a>

            {/* Services dropdown trigger */}
            <div
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <a
                ref={servicesBtnRef}
                href="/services"
                className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services <ChevronDown />
              </a>
            </div>

            <a href="/about" className="transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}>
              About Us
            </a>

            <a href="/blog" className="transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}>
              Blog
            </a>

            {/* CTA — part of the right group */}
            <GetInTouchButton />
          </div>

          {/* ── Mobile right controls ── */}
          <div className="flex md:hidden items-center gap-4">
            <SendButton />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-1"
              style={{ color: "#fff" }}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>

        </Container>
      </nav>

      {/* ── Desktop services dropdown (fixed, outside nav stacking context so backdrop-filter works) ── */}
      {servicesOpen && (
        <div
          className="fixed z-50"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
          onMouseEnter={openServices}
          onMouseLeave={closeServices}
        >
          <div
            style={{
              minWidth: 241,
              background: "rgba(10,20,60,0.45)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(74,153,245,0.15)",
              borderRadius: 12,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 8px 32px rgba(26,68,148,0.35)",
            }}
          >
            {SERVICES.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ fontFamily: font, fontSize: 16, lineHeight: "24px", color: "#fff" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4A99F5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile dropdown menu ── */}
      {mobileOpen && (
        <div
          className="fixed left-0 right-0 z-40 md:hidden"
          style={{
            top: 72,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <div className="flex flex-col items-center gap-4 px-6 pt-7 pb-6">
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              Home
            </a>
            <a
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              Services
            </a>
            <a
              href="/services/security"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              AI Security Platform &amp; Solution
            </a>
            <a
              href="/services/humanoid"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              AI-Enhanced Humanoid Robotic
            </a>
            <a
              href="/services/partner"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              AI Solution Partner
            </a>
            <a
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              Blog
            </a>
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center h-6 transition-opacity hover:opacity-80"
              style={{ fontFamily: font, fontSize: 16, color: "#fff" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
