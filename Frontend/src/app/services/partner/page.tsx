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

export const metadata: Metadata = {
  title: "AI Solution Partner | Ai-Ai-Ai",
  description: "Roadmap to MVP to production deployment—delivered with governance, integration, and operational constraints in mind.",
};

export default function PartnerPage() {
  return (
    <>
      <Navbar />
      <main>
        <PartnerHeroSection />
        <PartnerStatementSection />
        <PartnerMeaningSection />
        <PartnerOutcomesSection />
        <PartnerPhasesSection />
        <PartnerDeliverablesSection />
        <PartnerEngagementSection />
        <PartnerProcessSection />
        <PartnerFAQSection />
        <PartnerCTASection />
      </main>
    </>
  );
}
