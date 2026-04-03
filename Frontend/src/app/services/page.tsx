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
import { getPageContent, getPageSEO } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("services", "Services | Ai-Ai-Ai", "AI services built around measurable outcomes — from roadmap to production deployment.");
}

export default async function ServicesPage() {
  const page = await getPageContent("services");
  const s = page?.sections as Record<string, Record<string, unknown>> | undefined;

  return (
    <>
      <Navbar />
      <main>
        <ServicesHeroSection content={s?.hero} />
        <ServicesOutcomesSection content={s?.outcomes} />
        <ServicesOverviewSection content={s?.overview} />
        <ServicesRoboticsSection content={s?.robotics} />
        <ServicesSecuritySection content={s?.security} />
        <ServicesAISolutionSection content={s?.ai_solution} />
        <ServicesInitiativesSection content={s?.initiatives} />
        <ServicesGuidanceSection content={s?.guidance} />
      </main>
    </>
  );
}
