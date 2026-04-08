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
    chip: m.hum_hero_chip || undefined,
    heading: m.hum_hero_heading || undefined,
    description: m.hum_hero_description || undefined,
    cta_primary: m.hum_hero_cta_primary || undefined,
    cta_primary_url: m.hum_hero_cta_primary_url || undefined,
    cta_secondary: m.hum_hero_cta_secondary || undefined,
    cta_secondary_url: m.hum_hero_cta_secondary_url || undefined,
    hero_background_image: m.hum_hero_bg_image || undefined,
    background_color: m.hum_hero_bg_color || undefined,
  };

  // Robots stored as JSON string (nested specs/features too complex for repeater)
  let robots: any[] = [];
  try {
    const json = m.hum_robots_json as string;
    if (json) robots = JSON.parse(json);
  } catch { /* ignore */ }
  if (!robots.length) {
    const arr = ensureArray(m.hum_robots);
    if (arr.length > 0) robots = arr;
  }

  const useCases: any = robots.length > 0 ? { robots } : {};

  const rawAccordion = ensureArray(m.hum_outcomes_accordion);
  const outcomes: any = {
    chip: m.hum_outcomes_chip || undefined,
    heading: m.hum_outcomes_heading || undefined,
    heading_highlight: m.hum_outcomes_heading_hl || undefined,
    description: m.hum_outcomes_description || undefined,
    accordion_items: rawAccordion.length > 0 ? rawAccordion : undefined,
    background_color: m.hum_outcomes_bg_color || undefined,
    outcomes_image: m.hum_outcomes_image || undefined,
  };

  const rawDeliverables = ensureArray(m.hum_deliverables_items);
  const deliverables: any = {
    chip: m.hum_deliverables_chip || undefined,
    heading: m.hum_deliverables_heading || undefined,
    heading_highlight: m.hum_deliverables_heading_hl || undefined,
    description: m.hum_deliverables_description || undefined,
    items: rawDeliverables.length > 0 ? rawDeliverables : undefined,
    background_color: m.hum_deliverables_bg_color || undefined,
  };

  const rawChips = textareaToArray(m.hum_cta_chips);
  const cta: any = {
    heading: m.hum_cta_heading || undefined,
    heading_highlight: m.hum_cta_heading_hl || undefined,
    description: m.hum_cta_description || undefined,
    chips: rawChips.length > 0 ? rawChips : undefined,
    cta_primary: m.hum_cta_primary || undefined,
    cta_primary_url: m.hum_cta_primary_url || undefined,
    cta_secondary: m.hum_cta_secondary || undefined,
    cta_secondary_url: m.hum_cta_secondary_url || undefined,
    background_image: m.hum_cta_bg_image || undefined,
    background_color: m.hum_cta_bg_color || undefined,
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
