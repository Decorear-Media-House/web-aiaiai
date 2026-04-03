import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import SecurityHeroSection from "@/components/sections/security/SecurityHeroSection";
import SecurityOutcomesSection from "@/components/sections/security/SecurityOutcomesSection";
import SecurityIncludedSection from "@/components/sections/security/SecurityIncludedSection";
import SecurityPhasesSection from "@/components/sections/security/SecurityPhasesSection";
import SecurityCTASection from "@/components/sections/security/SecurityCTASection";
import { getPageContent, getPageSEO } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("security", "AI Security Platform & Solution | Ai-Ai-Ai", "Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.");
}

export default async function SecurityPage() {
  const page = await getPageContent("security");
  const s = page?.sections as Record<string, Record<string, unknown>> | undefined;

  return (
    <>
      <Navbar />
      <main>
        <SecurityHeroSection content={s?.hero} />
        <SecurityOutcomesSection content={s?.outcomes} />
        <SecurityIncludedSection content={s?.included} />
        <SecurityPhasesSection content={s?.phases} />
        <SecurityCTASection content={s?.cta} />
      </main>
    </>
  );
}
