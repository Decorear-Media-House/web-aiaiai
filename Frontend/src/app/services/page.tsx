import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import ServicesHeroSection from "@/components/sections/services/ServicesHeroSection";
import ServicesOutcomesSection from "@/components/sections/services/ServicesOutcomesSection";
import ServicesOverviewSection from "@/components/sections/services/ServicesOverviewSection";
import ServicesRoboticsSection from "@/components/sections/services/ServicesRoboticsSection";
import ServicesSecuritySection from "@/components/sections/services/ServicesSecuritySection";
import ServicesAISolutionSection from "@/components/sections/services/ServicesAISolutionSection";
import ServicesInitiativesSection from "@/components/sections/services/ServicesInitiativesSection";
import ServicesGuidanceSection from "@/components/sections/services/ServicesGuidanceSection";

export const metadata: Metadata = {
  title: "Services | Ai-Ai-Ai",
  description: "AI services built around measurable outcomes — from roadmap to production deployment.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHeroSection />
        <ServicesOutcomesSection />
        <ServicesOverviewSection />
        <ServicesRoboticsSection />
        <ServicesSecuritySection />
        <ServicesAISolutionSection />
        <ServicesInitiativesSection />
        <ServicesGuidanceSection />
      </main>
    </>
  );
}
