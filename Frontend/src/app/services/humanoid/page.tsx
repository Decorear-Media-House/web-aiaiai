import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import RoboticsHeroSection from "@/components/sections/robotics/RoboticsHeroSection";
import RoboticsUseCasesSection from "@/components/sections/robotics/RoboticsUseCasesSection";
import RoboticsOutcomesSection from "@/components/sections/robotics/RoboticsOutcomesSection";
import RoboticsDeliverablesSection from "@/components/sections/robotics/RoboticsDeliverablesSection";
import RoboticsCTASection from "@/components/sections/robotics/RoboticsCTASection";

export const metadata: Metadata = {
  title: "AI-Enhanced Humanoid Robotics Solution | Ai-Ai-Ai",
  description: "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, and scalable rollout.",
};

export default function RoboticsPage() {
  return (
    <>
      <Navbar />
      <main>
        <RoboticsHeroSection />
        <RoboticsUseCasesSection />
        <RoboticsOutcomesSection />
        <RoboticsDeliverablesSection />
        <RoboticsCTASection />
      </main>
    </>
  );
}
