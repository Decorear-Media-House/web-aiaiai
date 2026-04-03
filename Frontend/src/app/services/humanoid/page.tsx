import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import RoboticsHeroSection from "@/components/sections/robotics/RoboticsHeroSection";
import RoboticsUseCasesSection from "@/components/sections/robotics/RoboticsUseCasesSection";
import RoboticsOutcomesSection from "@/components/sections/robotics/RoboticsOutcomesSection";
import RoboticsDeliverablesSection from "@/components/sections/robotics/RoboticsDeliverablesSection";
import RoboticsCTASection from "@/components/sections/robotics/RoboticsCTASection";
import { getPageContent, getPageSEO } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("humanoid", "AI-Enhanced Humanoid Robotics Solution | Ai-Ai-Ai", "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, and scalable rollout.");
}

export default async function RoboticsPage() {
  const page = await getPageContent("humanoid");
  const s = page?.sections as Record<string, Record<string, unknown>> | undefined;

  return (
    <>
      <Navbar />
      <main>
        <RoboticsHeroSection content={s?.hero} />
        <RoboticsUseCasesSection content={s?.useCases} />
        <RoboticsOutcomesSection content={s?.outcomes} />
        <RoboticsDeliverablesSection content={s?.deliverables} />
        <RoboticsCTASection content={s?.cta} />
      </main>
    </>
  );
}
