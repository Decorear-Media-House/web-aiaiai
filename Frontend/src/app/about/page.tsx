import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutMissionSection from "@/components/sections/about/AboutMissionSection";
import AboutPhilosophySection from "@/components/sections/about/AboutPhilosophySection";
import AboutEdgeSection from "@/components/sections/about/AboutEdgeSection";
import AboutLeadershipSection from "@/components/sections/about/AboutLeadershipSection";
import AboutTeamSection from "@/components/sections/about/AboutTeamSection";

export const metadata: Metadata = {
  title: "About Us | Ai-Ai-Ai",
  description: "Learn about Ai-Ai-Ai Co., Ltd. — Thailand's AI Solution Partner from roadmap to production deployment.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHeroSection />
        <AboutMissionSection />
        <AboutPhilosophySection />
        <AboutEdgeSection />
        <AboutLeadershipSection />
        <AboutTeamSection />
      </main>
    </>
  );
}
