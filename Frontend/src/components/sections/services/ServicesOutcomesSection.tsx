"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";

const font = "var(--font-faculty-glyphic), sans-serif";

// TODO: Replace with local assets in /public/images/services/
const imgContainer = "https://www.figma.com/api/mcp/asset/3c23231c-2267-4dc9-b44d-fd8eb524384a";
const imgContainer1 = "https://www.figma.com/api/mcp/asset/4b084f3a-ca46-4e76-88b4-4945891eab6b";
const imgContainer3 = "https://www.figma.com/api/mcp/asset/0a15ebbf-047e-4ed5-bc1d-0947b5a7c29c";
const imgContainer4 = "https://www.figma.com/api/mcp/asset/f9b9a63e-ecae-48d5-8448-d00eb99cd5b5";
const imgContainer5 = "https://www.figma.com/api/mcp/asset/0453cfbd-f15e-4d0b-8647-f092b55d6db3";
const imgOutcomeIcon = "https://www.figma.com/api/mcp/asset/3ac30dfb-9bef-4bef-b8bf-5cd4ff573f29";
const imgOutcomeIcon1 = "https://www.figma.com/api/mcp/asset/45236b56-96a9-46fa-a247-1719e6dbdcbd";
const imgOutcomeIcon2 = "https://www.figma.com/api/mcp/asset/e4c3c4e5-b5ea-4153-803f-912d47709605";
const imgOutcomeIcon3 = "https://www.figma.com/api/mcp/asset/7fe1cf06-c188-4ba5-9888-fef40869a597";
const imgOutcomeIcon4 = "https://www.figma.com/api/mcp/asset/6c40d718-746f-4034-b034-89b669b72643";
const imgCheckCircle2 = "https://www.figma.com/api/mcp/asset/7513550b-2247-44c0-af2b-90b5e6b09541";
const imgCheckCircle3 = "https://www.figma.com/api/mcp/asset/26362a96-f6dd-4511-907d-eafa4f4785a6";
const imgCheckCircle4 = "https://www.figma.com/api/mcp/asset/ee8733b1-a031-4bfc-8138-d109afcc03c5";
const imgCheckCircle5 = "https://www.figma.com/api/mcp/asset/a1c4132c-1930-4170-a06c-ff2fc034386a";
const imgCheckCircle6 = "https://www.figma.com/api/mcp/asset/b1f5b290-974d-49bf-8955-0226971589f1";

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#4A99F5" />
    </svg>
  );
}

function CheckItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-start gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" width={16} height={16} className="shrink-0 mt-0.5" />
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
  src,
  gradient,
  shadow,
}: {
  src: string;
  gradient: string;
  shadow: string;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl size-10 sm:size-12"
      style={{ backgroundImage: gradient, boxShadow: `0px 2px 12px 0px ${shadow}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={24} height={24} />
    </div>
  );
}

export default function ServicesOutcomesSection() {
  return (
    <section className="relative" style={{ background: "#070E24", overflowX: "clip" }}>
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

      <Container className="relative py-20">
        <div className="flex flex-wrap gap-10 items-start max-w-[1216px] w-full">

          {/* ─── Left sidebar ─── */}
          <div className="w-[286px] shrink-0 flex flex-col gap-6 max-lg:w-full sticky top-[88px] self-start">
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
                <span style={{ fontFamily: font, fontSize: 12, color: "#4A99F5" }}>What We Deliver</span>
              </div>
            </FadeUp>

            {/* Heading */}
            <FadeUp trigger="scroll" delay={0.05}>
              <div className="flex flex-col gap-1">
                <p style={{ fontFamily: font, fontSize: 32, fontWeight: 400, lineHeight: 1.3, color: "#fff" }}>
                  Outcomes
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
                  We Deliver
                </p>
              </div>
            </FadeUp>

            {/* Description */}
            <FadeUp trigger="scroll" delay={0.1}>
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                Every engagement starts with the outcome you need. We map the right service to your specific goal.
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
                    src={imgOutcomeIcon}
                    gradient="linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)"
                    shadow="rgba(0,119,255,0.8)"
                  />
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#4A99F5", lineHeight: 1.5 }}>Outcome 1</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Cost Reduction</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[620px] rounded-2xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgContainer} alt="" className="size-full object-cover" />
                  </div>
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4 justify-end">
                    <InfoCard title="What it usually means" color="#4A99F5">
                      <CheckItem icon={imgCheckCircle2} text="Removing repetitive manual steps" />
                      <CheckItem icon={imgCheckCircle2} text="Reducing time on review, triage, and routing" />
                      <CheckItem icon={imgCheckCircle2} text="Increasing throughput without adding headcount" />
                      <CheckItem icon={imgCheckCircle2} text="Reducing monitoring effort in security operations" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#4A99F5">
                      <CheckItem icon={imgCheckCircle2} text="AI Solution Partner: workflow automation, decision support, intelligent routing" />
                      <CheckItem icon={imgCheckCircle2} text="Security Platform: automated detection and prioritization reduces monitoring" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#4A99F5">
                      <CheckItem icon={imgCheckCircle2} text="Automated workflow and approval paths" />
                      <CheckItem icon={imgCheckCircle2} text="Dashboards showing cycle time, workload, and bottlenecks" />
                      <CheckItem icon={imgCheckCircle2} text="Governance and controls for safe automation" />
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
                    src={imgOutcomeIcon1}
                    gradient="linear-gradient(to right, #00bc7d, #00bba7)"
                    shadow="rgba(0,255,178,0.8)"
                  />
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#00BC7D", lineHeight: 1.5 }}>Outcome 2</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Revenue Growth</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#00BC7D">
                      <CheckItem icon={imgCheckCircle3} text="Converting signals into actions faster" />
                      <CheckItem icon={imgCheckCircle3} text="Improving conversion by better decision timing and targeting" />
                      <CheckItem icon={imgCheckCircle3} text="Enabling frontline execution with insight loops" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#00BC7D">
                      <CheckItem icon={imgCheckCircle3} text="AI Solution Partner: insight engines, dashboards, prioritization, optimization loops" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#00BC7D">
                      <CheckItem icon={imgCheckCircle3} text="Signal dashboards and alerting" />
                      <CheckItem icon={imgCheckCircle3} text="Playbooks for response and escalation" />
                      <CheckItem icon={imgCheckCircle3} text="KPI loop for continuous improvement" />
                    </InfoCard>
                  </div>
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[528px] rounded-2xl overflow-hidden shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgContainer1} alt="" className="absolute inset-0 size-full object-cover" />
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Outcome 3 — Compliance & Governance */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-compliance" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    src={imgOutcomeIcon2}
                    gradient="linear-gradient(to right, #8e51ff, #ad46ff)"
                    shadow="rgba(123,0,255,0.8)"
                  />
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#9962FF", lineHeight: 1.5 }}>Outcome 3</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Compliance &amp; Governance</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[562px] rounded-2xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgContainer3} alt="" className="size-full object-cover" />
                  </div>
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#9962FF">
                      <CheckItem icon={imgCheckCircle4} text="Traceability and audit logs" />
                      <CheckItem icon={imgCheckCircle4} text="Role-based access control and approvals" />
                      <CheckItem icon={imgCheckCircle4} text="Evidence capture and exception handling" />
                      <CheckItem icon={imgCheckCircle4} text="Responsible AI boundaries" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#9962FF">
                      <CheckItem icon={imgCheckCircle4} text="AI Solution Partner: governance-first roadmap + production deployment discipline" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#9962FF">
                      <CheckItem icon={imgCheckCircle4} text="Governance pack: access, logging, risk controls" />
                      <CheckItem icon={imgCheckCircle4} text="Audit-ready workflows with evidence trails" />
                      <CheckItem icon={imgCheckCircle4} text="SOP alignment and operational ownership" />
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
                    src={imgOutcomeIcon3}
                    gradient="linear-gradient(to right, #ff8904, #ff6467)"
                    shadow="rgba(255,94,0,0.8)"
                  />
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#FF8904", lineHeight: 1.5 }}>Outcome 4</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Security &amp; Asset Protection</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#FF8904">
                      <CheckItem icon={imgCheckCircle5} text="Faster detection and response" />
                      <CheckItem icon={imgCheckCircle5} text="Fewer incidents and less loss risk" />
                      <CheckItem icon={imgCheckCircle5} text="Multi-site situational awareness and consistent rules" />
                      <CheckItem icon={imgCheckCircle5} text="Evidence snapshots and incident reporting" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#FF8904">
                      <CheckItem icon={imgCheckCircle5} text="Security Platform &amp; Solution" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#FF8904">
                      <CheckItem icon={imgCheckCircle5} text="Analytics packs (zones, anomalies, event rules)" />
                      <CheckItem icon={imgCheckCircle5} text="Incident workflows and escalation" />
                      <CheckItem icon={imgCheckCircle5} text="Multi-site dashboard and reporting" />
                    </InfoCard>
                  </div>
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[538px] rounded-2xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgContainer4} alt="" className="size-full object-cover" />
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Outcome 5 — Operational Automation */}
            <FadeUp trigger="scroll" delay={0}>
              <div id="outcome-automation" className="flex flex-col gap-6 scroll-mt-[88px]">
                <div className="flex items-center gap-4">
                  <OutcomeIcon
                    src={imgOutcomeIcon4}
                    gradient="linear-gradient(to right, #00b8db, #2b7fff)"
                    shadow="rgba(0,136,255,0.8)"
                  />
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: font, fontSize: 14, color: "#00B8DB", lineHeight: 1.5 }}>Outcome 5</p>
                    <p style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4 }}>Operational Automation</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-start">
                  {/* Photo */}
                  <div className="flex-1 min-w-[270px] max-w-[282px] h-[504px] rounded-2xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgContainer5} alt="" className="size-full object-cover" />
                  </div>
                  {/* Cards */}
                  <div className="flex-1 min-w-[270px] flex flex-col gap-4">
                    <InfoCard title="What it usually means" color="#00B8DB">
                      <CheckItem icon={imgCheckCircle6} text="Deploying robotics with readiness, safety, training, and SOPs" />
                      <CheckItem icon={imgCheckCircle6} text="Ensuring maintenance and escalation flows exist" />
                      <CheckItem icon={imgCheckCircle6} text="Integrating robotic activity into operational reporting" />
                    </InfoCard>
                    <InfoCard title="Best-fit services" color="#00B8DB">
                      <CheckItem icon={imgCheckCircle6} text="Embodied &amp; Humanoid Robotic Solution" />
                    </InfoCard>
                    <InfoCard title="Typical deliverables" color="#00B8DB">
                      <CheckItem icon={imgCheckCircle6} text="Pilot readiness plan" />
                      <CheckItem icon={imgCheckCircle6} text="SOP and training materials" />
                      <CheckItem icon={imgCheckCircle6} text="Integration and scale playbooks" />
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
