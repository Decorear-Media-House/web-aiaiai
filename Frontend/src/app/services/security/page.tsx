import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import SecurityHeroSection from "@/components/sections/security/SecurityHeroSection";
import SecurityOutcomesSection from "@/components/sections/security/SecurityOutcomesSection";
import SecurityIncludedSection from "@/components/sections/security/SecurityIncludedSection";
import SecurityPhasesSection from "@/components/sections/security/SecurityPhasesSection";
import SecurityCTASection from "@/components/sections/security/SecurityCTASection";

export const metadata: Metadata = {
  title: "AI Security Platform & Solution | Ai-Ai-Ai",
  description: "Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <SecurityHeroSection />
        <SecurityOutcomesSection />
        <SecurityIncludedSection />
        <SecurityPhasesSection />
        <SecurityCTASection />
      </main>
    </>
  );
}
