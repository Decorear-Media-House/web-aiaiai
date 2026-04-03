"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

import { wpImageUrl } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

function CheckCircleIcon({ color = "#4A99F5" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckItem({ text, color }: { text: string; color?: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircleIcon color={color} />
      <p style={{ fontFamily: font, fontSize: 16, color: "#E8EEF8", lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

function InfoCard({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 w-full"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <p style={{ fontFamily: font, fontSize: 16, color, lineHeight: 1.5 }} className="mb-4">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function OutcomeIcon({
  children,
  gradient,
  shadow,
}: {
  children: React.ReactNode;
  gradient: string;
  shadow: string;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl size-10 sm:size-12"
      style={{ backgroundImage: gradient, boxShadow: `0px 2px 12px 0px ${shadow}` }}
    >
      {children}
    </div>
  );
}

interface OutcomesContent {
  label?: string;
  heading_line1?: string;
  heading_line2?: string;
  description?: string;
  background_color?: string;
  outcome1_image?: string;
  outcome2_image?: string;
  outcome3_image?: string;
  outcome4_image?: string;
  outcome5_image?: string;
}

export default function ServicesOutcomesSection({ content }: { content?: Record<string, unknown> }) {
  const c = (content ?? {}) as OutcomesContent;
  const label = c.label ?? "What We Deliver";
  const headingLine1 = c.heading_line1 ?? "Outcomes";
  const headingLine2 = c.heading_line2 ?? "We Deliver";
  const description = c.description ?? "Every engagement starts with the outcome you need. We map the right service to your specific goal.";
  const bgColor = c.background_color ?? "#070E24";
  return (
    <section className="relative" style={{ background: bgColor, overflowX: "clip" }}>
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          background: "rgba(21,93,252,0.1)",
          filter: "blur(64px)",
          width: 400,
          height: 400,
          top: -1,
          left: 293,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          background: "rgba(34,52,254,0.1)",
          filter: "blur(64px)",
          width: 365,
          height: 365,
          bottom: -1,
          right: -1,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          background: "rgba(34,155,254,0.1)",
          filter: "blur(64px)",
          width: 365,
          height: 365,
          bottom: 1927,
          right: -1,
        }}
        aria-hidden="true"
      />

      <Container className="relative py-20 max-sm:py-10">
        <div className="flex flex-wrap gap-10 items-start max-w-[1216px] w-full max-sm:flex-col">

          {/* ─── Left sidebar ─── */}
          <div className="w-[286px] shrink-0 flex flex-col gap-6 max-lg:w-full max-sm:w-full sticky top-[88px] max-sm:static self-start">
            {/* Label chip */}
            <FadeUp trigger="scroll" delay={0}>
              <div
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                style={{
                  background: "rgba(43,127,255,0.1)",
                  border: "1px solid rgba(43,127,255,0.2)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <SparkleIcon />
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>{label}</span>
              </div>
            </FadeUp>

            {/* Heading */}
            <FadeUp trigger="scroll" delay={0.05}>
              <div className="flex flex-col gap-1">
                <p style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  {headingLine1}
                </p>
                <p
                  style={{
                    fontFamily: font,
                    fontSize: 32,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    backgroundImage: "linear-gradient(90deg, #51A2FF 0%, #53EAFD 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {headingLine2}
                </p>
              </div>
            </FadeUp>

            {/* Description */}
            <FadeUp trigger="scroll" delay={0.1}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                {description}
              </p>
            </FadeUp>

            {/* Outcome areas legend */}
            <FadeUp trigger="scroll" delay={0.15}>
              <div
                className="rounded-[14px] p-4 flex flex-col gap-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                }}
              >
                <p style={{ fontFamily: font, fontSize: 14, color: "#4A6080", lineHeight: 1.5 }}>
                  Outcome Areas
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Cost Reduction", gradient: "linear-gradient(to right, #2b7fff, #00b8db)", id: "outcome-cost-reduction" },
                    { label: "Revenue Growth", gradient: "linear-gradient(to right, #00bc7d, #00bba7)", id: "outcome-revenue-growth" },
                    { label: "Compliance & Governance", gradient: "linear-gradient(to right, #8e51ff, #ad46ff)", id: "outcome-compliance" },
                    { label: "Security & Asset Protection", gradient: "linear-gradient(to right, #ff8904, #ff6467)", id: "outcome-security" },
                    { label: "Operational Automation", gradient: "linear-gradient(to right, #00b8db, #2b7fff)", id: "outcome-automation" },
                  ].map(({ label, gradient, id }) => (
                    <a key={label} href={`#${id}`} className="flex items-center gap-3 group transition-opacity hover:opacity-70">
                      <div
                        className="shrink-0 size-2 rounded-full"
                        style={{ backgroundImage: gradient }}
                      />
                      <p style={{ fontFamily: font, fontSize: 14, color: "#C0CEEA", lineHeight: 1.5 }}>{label}</p>
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* ─── Right content — 5 outcome blocks ─── */}
          <div className="flex-1 min-w-[220px] flex flex-col gap-12">

            {/* Outcome 1 — Cost Reduction */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-cost-reduction" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    gradient="linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)"
                    shadow="rgba(0,119,255,0.8)"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </OutcomeIcon>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#4A99F5", lineHeight: 1.5 }}>Outcome 1</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Cost Reduction</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[620px] max-sm:h-[300px] max-sm:max-w-full max-sm:min-w-0 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#1A4494] to-[#4A99F5]">
                    {c.outcome1_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={wpImageUrl(c.outcome1_image)} alt="" className="size-full object-cover" />
                    )}
                  </div>
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4 justify-end">
                    <InfoCard title="What it usually means" color="#4A99F5">
                      <CheckItem color="#4A99F5" text="Removing repetitive manual steps" />
                      <CheckItem color="#4A99F5" text="Reducing time on review, triage, and routing" />
                      <CheckItem color="#4A99F5" text="Increasing throughput without adding headcount" />
                      <CheckItem color="#4A99F5" text="Reducing monitoring effort in security operations" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#4A99F5">
                      <CheckItem color="#4A99F5" text="AI Solution Partner: workflow automation, decision support, intelligent routing" />
                      <CheckItem color="#4A99F5" text="Security Platform: automated detection and prioritization reduces monitoring" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#4A99F5">
                      <CheckItem color="#4A99F5" text="Automated workflow and approval paths" />
                      <CheckItem color="#4A99F5" text="Dashboards showing cycle time, workload, and bottlenecks" />
                      <CheckItem color="#4A99F5" text="Governance and controls for safe automation" />
                    </InfoCard>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Outcome 2 — Revenue Growth */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-revenue-growth" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    gradient="linear-gradient(to right, #00bc7d, #00bba7)"
                    shadow="rgba(0,255,178,0.8)"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 6h6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </OutcomeIcon>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#00BC7D", lineHeight: 1.5 }}>Outcome 2</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Revenue Growth</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#00BC7D">
                      <CheckItem color="#00BC7D" text="Converting signals into actions faster" />
                      <CheckItem color="#00BC7D" text="Improving conversion by better decision timing and targeting" />
                      <CheckItem color="#00BC7D" text="Enabling frontline execution with insight loops" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#00BC7D">
                      <CheckItem color="#00BC7D" text="AI Solution Partner: insight engines, dashboards, prioritization, optimization loops" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#00BC7D">
                      <CheckItem color="#00BC7D" text="Signal dashboards and alerting" />
                      <CheckItem color="#00BC7D" text="Playbooks for response and escalation" />
                      <CheckItem color="#00BC7D" text="KPI loop for continuous improvement" />
                    </InfoCard>
                  </div>
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[528px] max-sm:h-[300px] max-sm:max-w-full max-sm:min-w-0 rounded-2xl overflow-hidden shrink-0 relative bg-gradient-to-br from-[#00bc7d] to-[#00bba7]">
                    {c.outcome2_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={wpImageUrl(c.outcome2_image)} alt="" className="absolute inset-0 size-full object-cover" />
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Outcome 3 — Compliance & Governance */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-compliance" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    gradient="linear-gradient(to right, #8e51ff, #ad46ff)"
                    shadow="rgba(123,0,255,0.8)"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </OutcomeIcon>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#9962FF", lineHeight: 1.5 }}>Outcome 3</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Compliance &amp; Governance</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[562px] max-sm:h-[300px] max-sm:max-w-full max-sm:min-w-0 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#8e51ff] to-[#ad46ff]">
                    {c.outcome3_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={wpImageUrl(c.outcome3_image)} alt="" className="size-full object-cover" />
                    )}
                  </div>
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#9962FF">
                      <CheckItem color="#9962FF" text="Traceability and audit logs" />
                      <CheckItem color="#9962FF" text="Role-based access control and approvals" />
                      <CheckItem color="#9962FF" text="Evidence capture and exception handling" />
                      <CheckItem color="#9962FF" text="Responsible AI boundaries" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#9962FF">
                      <CheckItem color="#9962FF" text="AI Solution Partner: governance-first roadmap + production deployment discipline" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#9962FF">
                      <CheckItem color="#9962FF" text="Governance pack: access, logging, risk controls" />
                      <CheckItem color="#9962FF" text="Audit-ready workflows with evidence trails" />
                      <CheckItem color="#9962FF" text="SOP alignment and operational ownership" />
                    </InfoCard>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Outcome 4 — Security & Asset Protection */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-security" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    gradient="linear-gradient(to right, #ff8904, #ff6467)"
                    shadow="rgba(255,94,0,0.8)"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" stroke="#fff" strokeWidth="1.5"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </OutcomeIcon>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#FF8904", lineHeight: 1.5 }}>Outcome 4</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Security &amp; Asset Protection</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#FF8904">
                      <CheckItem color="#FF8904" text="Faster detection and response" />
                      <CheckItem color="#FF8904" text="Fewer incidents and less loss risk" />
                      <CheckItem color="#FF8904" text="Multi-site situational awareness and consistent rules" />
                      <CheckItem color="#FF8904" text="Evidence snapshots and incident reporting" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#FF8904">
                      <CheckItem color="#FF8904" text="Security Platform &amp; Solution" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#FF8904">
                      <CheckItem color="#FF8904" text="Analytics packs (zones, anomalies, event rules)" />
                      <CheckItem color="#FF8904" text="Incident workflows and escalation" />
                      <CheckItem color="#FF8904" text="Multi-site dashboard and reporting" />
                    </InfoCard>
                  </div>
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[538px] max-sm:h-[300px] max-sm:max-w-full max-sm:min-w-0 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#ff8904] to-[#ff6467]">
                    {c.outcome4_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={wpImageUrl(c.outcome4_image)} alt="" className="size-full object-cover" />
                    )}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Outcome 5 — Operational Automation */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-automation" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    gradient="linear-gradient(to right, #00b8db, #2b7fff)"
                    shadow="rgba(0,136,255,0.8)"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#fff" strokeWidth="1.5"/></svg>
                  </OutcomeIcon>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#00B8DB", lineHeight: 1.5 }}>Outcome 5</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Operational Automation</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[504px] max-sm:h-[300px] max-sm:max-w-full max-sm:min-w-0 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-[#00b8db] to-[#2b7fff]">
                    {c.outcome5_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={wpImageUrl(c.outcome5_image)} alt="" className="size-full object-cover" />
                    )}
                  </div>
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#00B8DB">
                      <CheckItem color="#00B8DB" text="Deploying robotics with readiness, safety, training, and SOPs" />
                      <CheckItem color="#00B8DB" text="Ensuring maintenance and escalation flows exist" />
                      <CheckItem color="#00B8DB" text="Integrating robotic activity into operational reporting" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#00B8DB">
                      <CheckItem color="#00B8DB" text="Embodied &amp; Humanoid Robotic Solution" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#00B8DB">
                      <CheckItem color="#00B8DB" text="Pilot readiness plan" />
                      <CheckItem color="#00B8DB" text="SOP and training materials" />
                      <CheckItem color="#00B8DB" text="Integration and scale playbooks" />
                    </InfoCard>
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </Container>
    </section>
  );
}
