import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutMissionSection from "@/components/sections/about/AboutMissionSection";
import AboutPhilosophySection from "@/components/sections/about/AboutPhilosophySection";
import AboutEdgeSection from "@/components/sections/about/AboutEdgeSection";
import AboutLeadershipSection from "@/components/sections/about/AboutLeadershipSection";
import AboutTeamSection from "@/components/sections/about/AboutTeamSection";
import { getPageContent, getPageSEO } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("about", "About Us | Ai-Ai-Ai", "Learn about Ai-Ai-Ai Co., Ltd. — Thailand's AI Solution Partner from roadmap to production deployment.");
}

export default async function AboutPage() {
  const page = await getPageContent("about");
  const s = page?.sections as Record<string, Record<string, unknown>> | undefined;

  return (
    <>
      <Navbar />
      <main>
        <AboutHeroSection content={s?.hero} />
        <AboutMissionSection content={s?.mission} />
        <AboutPhilosophySection content={s?.philosophy} />
        <AboutEdgeSection content={s?.edge} />
        <AboutLeadershipSection content={s?.leadership} />
        <AboutTeamSection content={s?.team} />
      </main>
    </>
  );
}
