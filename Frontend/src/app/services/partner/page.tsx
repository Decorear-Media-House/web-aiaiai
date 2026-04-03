import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import PartnerHeroSection from "@/components/sections/partner/PartnerHeroSection";
import PartnerStatementSection from "@/components/sections/partner/PartnerStatementSection";
import PartnerMeaningSection from "@/components/sections/partner/PartnerMeaningSection";
import PartnerOutcomesSection from "@/components/sections/partner/PartnerOutcomesSection";
import PartnerPhasesSection from "@/components/sections/partner/PartnerPhasesSection";
import PartnerDeliverablesSection from "@/components/sections/partner/PartnerDeliverablesSection";
import PartnerEngagementSection from "@/components/sections/partner/PartnerEngagementSection";
import PartnerProcessSection from "@/components/sections/partner/PartnerProcessSection";
import PartnerFAQSection from "@/components/sections/partner/PartnerFAQSection";
import PartnerCTASection from "@/components/sections/partner/PartnerCTASection";
import { getPageContent, getPageSEO } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("partner", "AI Solution Partner | Ai-Ai-Ai", "Roadmap to MVP to production deployment—delivered with governance, integration, and operational constraints in mind.");
}

export default async function PartnerPage() {
  const page = await getPageContent("partner");
  const s = page?.sections as Record<string, Record<string, unknown>> | undefined;

  return (
    <>
      <Navbar />
      <main>
        <PartnerHeroSection content={s?.hero} />
        <PartnerStatementSection content={s?.statement} />
        <PartnerMeaningSection content={s?.meaning} />
        <PartnerOutcomesSection content={s?.outcomes} />
        <PartnerPhasesSection content={s?.phases} />
        <PartnerDeliverablesSection content={s?.deliverables} />
        <PartnerEngagementSection content={s?.engagement} />
        <PartnerProcessSection content={s?.process} />
        <PartnerFAQSection content={s?.faq} />
        <PartnerCTASection content={s?.cta} />
      </main>
    </>
  );
}
