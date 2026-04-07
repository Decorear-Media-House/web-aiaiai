import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import RoboticsHeroSection from "@/components/sections/robotics/RoboticsHeroSection";
import RoboticsUseCasesSection from "@/components/sections/robotics/RoboticsUseCasesSection";
import RoboticsOutcomesSection from "@/components/sections/robotics/RoboticsOutcomesSection";
import RoboticsDeliverablesSection from "@/components/sections/robotics/RoboticsDeliverablesSection";
import RoboticsCTASection from "@/components/sections/robotics/RoboticsCTASection";
import { getPageMeta, getPageSEO, ensureArray, textareaToArray } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("humanoid", "AI-Enhanced Humanoid Robotics Solution | Ai-Ai-Ai", "Deployment-ready embodied & humanoid robotics with pilot planning, training, SOPs, integration, and scalable rollout.");
}

export default async function RoboticsPage() {
  const m = await getPageMeta("humanoid");

  /* ── Legacy fallback: page_sections JSON ── */
  if (m._legacy) {
    const s = m as Record<string, Record<string, unknown>>;
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

  /* ── JetEngine meta fields → component props ── */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const hero: any = {
    chip: m.hum_hero_chip,
    heading: m.hum_hero_heading,
    description: m.hum_hero_description,
    stats: ensureArray(m.hum_hero_stats),
    cta_primary: m.hum_hero_cta_primary,
    cta_secondary: m.hum_hero_cta_secondary,
    hero_background_image: m.hum_hero_bg_image,
    background_color: m.hum_hero_bg_color,
  };

  // Robots stored as JSON string (nested specs/features too complex for repeater)
  let robots: any[] = [];
  try {
    const json = m.hum_robots_json as string;
    if (json) robots = JSON.parse(json);
  } catch { /* ignore */ }
  if (!robots.length) robots = ensureArray(m.hum_robots);

  const useCases: any = { robots };

  const outcomes: any = {
    chip: m.hum_outcomes_chip,
    heading: m.hum_outcomes_heading,
    heading_highlight: m.hum_outcomes_heading_highlight,
    description: m.hum_outcomes_description,
    accordion_items: ensureArray(m.hum_outcomes_accordion_items),
    background_color: m.hum_outcomes_background_color,
    outcomes_image: m.hum_outcomes_image,
  };

  const deliverables: any = {
    chip: m.hum_deliverables_chip,
    heading: m.hum_deliverables_heading,
    heading_highlight: m.hum_deliverables_heading_highlight,
    description: m.hum_deliverables_description,
    items: ensureArray(m.hum_deliverables_items),
    background_color: m.hum_deliverables_background_color,
  };

  const cta: any = {
    heading: m.hum_cta_heading,
    heading_highlight: m.hum_cta_heading_highlight,
    description: m.hum_cta_description,
    chips: textareaToArray(m.hum_cta_chips),
    cta_primary: m.hum_cta_cta_primary,
    cta_secondary: m.hum_cta_cta_secondary,
    background_image: m.hum_cta_background_image,
    background_color: m.hum_cta_background_color,
  };

  return (
    <>
      <Navbar />
      <main>
        <RoboticsHeroSection content={hero} />
        <RoboticsUseCasesSection content={useCases} />
        <RoboticsOutcomesSection content={outcomes} />
        <RoboticsDeliverablesSection content={deliverables} />
        <RoboticsCTASection content={cta} />
      </main>
    </>
  );
}
