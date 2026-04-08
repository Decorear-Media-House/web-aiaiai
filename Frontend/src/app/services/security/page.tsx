import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import SecurityHeroSection from "@/components/sections/security/SecurityHeroSection";
import SecurityOutcomesSection from "@/components/sections/security/SecurityOutcomesSection";
import SecurityIncludedSection from "@/components/sections/security/SecurityIncludedSection";
import SecurityPhasesSection from "@/components/sections/security/SecurityPhasesSection";
import SecurityCTASection from "@/components/sections/security/SecurityCTASection";
import { getPageMeta, getPageSEO, ensureArray, textareaToArray } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("security", "AI Security Platform & Solution | Ai-Ai-Ai", "Computer Vision analytics, alerting, and incident workflows that convert cameras into operational intelligence.");
}

export default async function SecurityPage() {
  const m = await getPageMeta("security");

  // If legacy page_sections format, use old mapping
  if (m._legacy) {
    const s = m as Record<string, Record<string, unknown>>;
    return (
      <>
        <Navbar />
        <main>
          <SecurityHeroSection content={s.hero} />
          <SecurityOutcomesSection content={s.outcomes} />
          <SecurityIncludedSection content={s.included} />
          <SecurityPhasesSection content={s.phases} />
          <SecurityCTASection content={s.cta} />
        </main>
      </>
    );
  }

  // JetEngine meta → component props mapping
  const hero: any = {
    chip: m.sec_hero_chip,
    heading: m.sec_hero_heading,
    description: m.sec_hero_description,
    cta_primary: m.sec_hero_cta_primary,
    cta_secondary: m.sec_hero_cta_secondary,
    detection_title: m.sec_hero_detection_title,
    detection_subtitle: m.sec_hero_detection_subtitle,
    wpImageUrl: m.sec_hero_bg_image,
    wpContainerImageUrl: m.sec_hero_card_image,
    wpContainerImageMobileUrl: m.sec_hero_card_mobile_image,
    background_color: m.sec_hero_bg_color,
    stats: ensureArray(m.sec_hero_stats).length > 0 ? ensureArray(m.sec_hero_stats) : undefined,
  };

  const outcomes: any = {
    chip: m.sec_outcomes_chip,
    heading: m.sec_outcomes_heading,
    heading_highlight: m.sec_outcomes_heading_hl,
    wpImageUrl: m.sec_outcomes_image,
    wpImageMobileUrl: m.sec_outcomes_mobile_image,
    background_color: m.sec_outcomes_bg_color,
    accordion: ensureArray(m.sec_outcomes_accordion).map((item: Record<string, unknown>) => ({
      iconBg: item.icon_gradient,
      title: item.title,
      checks: textareaToArray(item.checks),
    })),
  };

  const included: any = {
    chip: m.sec_included_chip,
    heading: m.sec_included_heading,
    heading_highlight: m.sec_included_heading_hl,
    description: m.sec_included_description,
    background_color: m.sec_included_bg_color,
    pillars: ensureArray(m.sec_included_pillars).map((p: Record<string, unknown>) => ({
      title: p.title,
      items: textareaToArray(p.items),
    })),
    card1_image: ensureArray(m.sec_included_pillars)[0]?.card_image,
    card2_image: ensureArray(m.sec_included_pillars)[1]?.card_image,
    card3_image: ensureArray(m.sec_included_pillars)[2]?.card_image,
    card1_mobile_image: ensureArray(m.sec_included_pillars)[0]?.card_mobile_image,
    card2_mobile_image: ensureArray(m.sec_included_pillars)[1]?.card_mobile_image,
    card3_mobile_image: ensureArray(m.sec_included_pillars)[2]?.card_mobile_image,
  };

  const phases: any = {
    chip: m.sec_phases_chip,
    heading: m.sec_phases_heading,
    description: m.sec_phases_description,
    background_color: m.sec_phases_bg_color,
    phases: ensureArray(m.sec_phases_items),
  };

  const cta: any = {
    heading: m.sec_cta_heading,
    heading_highlight: m.sec_cta_heading_hl,
    description: m.sec_cta_description,
    chips: textareaToArray(m.sec_cta_chips).length > 0 ? textareaToArray(m.sec_cta_chips) : undefined,
    cta_primary: m.sec_cta_primary,
    cta_secondary: m.sec_cta_secondary,
    background_image: m.sec_cta_bg_image,
    background_color: m.sec_cta_bg_color,
  };

  return (
    <>
      <Navbar />
      <main>
        <SecurityHeroSection content={hero} />
        <SecurityOutcomesSection content={outcomes} />
        <SecurityIncludedSection content={included} />
        <SecurityPhasesSection content={phases} />
        <SecurityCTASection content={cta} />
      </main>
    </>
  );
}
