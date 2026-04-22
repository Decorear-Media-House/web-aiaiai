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
import { getPageMeta, getPageSEO, ensureArray, textareaToArray } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("services", "Services | AI-AI-AI", "AI services built around measurable outcomes — from roadmap to production deployment.");
}

export default async function ServicesPage() {
  const m = await getPageMeta("services");

  /* ── Legacy fallback: page_sections JSON ── */
  if (m._legacy) {
    const s = m as Record<string, Record<string, unknown>>;
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

  /* ── JetEngine meta fields → component props ── */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const hero: any = {
    label: m.svc_hero_label,
    heading: m.svc_hero_heading,
    description: m.svc_hero_description,
    cta_primary_text: m.svc_hero_cta_primary_text,
    cta_primary_href: m.svc_hero_cta_primary_href,
    cta_secondary_text: m.svc_hero_cta_secondary_text,
    cta_secondary_href: m.svc_hero_cta_secondary_href,
    background_image: m.svc_hero_background_image,
    background_color: m.svc_hero_background_color,
  };

  const outcomes: any = {
    label: m.svc_outcomes_label,
    heading_line1: m.svc_outcomes_heading_line1,
    heading_line2: m.svc_outcomes_heading_line2,
    description: m.svc_outcomes_description,
    background_color: m.svc_outcomes_background_color,
    outcome1_image: m.svc_outcomes_outcome1_image,
    outcome2_image: m.svc_outcomes_outcome2_image,
    outcome3_image: m.svc_outcomes_outcome3_image,
    outcome4_image: m.svc_outcomes_outcome4_image,
    outcome5_image: m.svc_outcomes_outcome5_image,
  };

  const overview: any = {
    heading: m.svc_overview_heading,
    subtitle: m.svc_overview_subtitle,
    description: m.svc_overview_description,
    background_image: m.svc_overview_background_image,
  };

  const robotics: any = {
    number: m.svc_robotics_number,
    label: m.svc_robotics_label,
    heading: m.svc_robotics_heading,
    subtitle: m.svc_robotics_subtitle,
    what_it_is: m.svc_robotics_what_it_is,
    check_items: textareaToArray(m.svc_robotics_check_items).length > 0 ? textareaToArray(m.svc_robotics_check_items) : undefined,
    cta_text: m.svc_robotics_cta_text,
    cta_href: m.svc_robotics_cta_href,
    section_image: m.svc_robotics_section_image,
    background_color: m.svc_robotics_background_color,
  };

  const security: any = {
    number: m.svc_security_number,
    label: m.svc_security_label,
    heading: m.svc_security_heading,
    subtitle: m.svc_security_subtitle,
    what_it_is: m.svc_security_what_it_is,
    check_items: textareaToArray(m.svc_security_check_items).length > 0 ? textareaToArray(m.svc_security_check_items) : undefined,
    cta_text: m.svc_security_cta_text,
    cta_href: m.svc_security_cta_href,
    section_image: m.svc_security_section_image,
    background_color: m.svc_security_background_color,
  };

  const ai_solution: any = {
    number: m.svc_ai_solution_number,
    label: m.svc_ai_solution_label,
    heading: m.svc_ai_solution_heading,
    subtitle: m.svc_ai_solution_subtitle,
    what_it_is: m.svc_ai_solution_what_it_is,
    outcomes_enabled: textareaToArray(m.svc_ai_solution_outcomes_enabled).length > 0 ? textareaToArray(m.svc_ai_solution_outcomes_enabled) : undefined,
    use_case_categories: textareaToArray(m.svc_ai_solution_use_case_categories).length > 0 ? textareaToArray(m.svc_ai_solution_use_case_categories) : undefined,
    cta_text: m.svc_ai_solution_cta_text,
    cta_href: m.svc_ai_solution_cta_href,
    section_image: m.svc_ai_solution_section_image,
    background_color: m.svc_ai_solution_background_color,
  };

  const initiatives: any = {
    label: m.svc_initiatives_label,
    heading_line1: m.svc_initiatives_heading_line1,
    heading_line2: m.svc_initiatives_heading_line2,
    description: m.svc_initiatives_description,
    cta_text: m.svc_initiatives_cta_text,
    cta_href: m.svc_initiatives_cta_href,
    initiatives: textareaToArray(m.svc_initiatives_initiatives).length > 0 ? textareaToArray(m.svc_initiatives_initiatives) : undefined,
    background_color: m.svc_initiatives_background_color,
  };

  const guidance: any = {
    label: m.svc_guidance_label,
    heading: m.svc_guidance_heading,
    heading_highlight: m.svc_guidance_heading_highlight,
    description: m.svc_guidance_description,
    cards: ensureArray(m.svc_guidance_cards).length > 0 ? ensureArray(m.svc_guidance_cards) : undefined,
    cta_prompt: m.svc_guidance_cta_prompt,
    cta_text: m.svc_guidance_cta_text,
    cta_href: m.svc_guidance_cta_href,
    background_image: m.svc_guidance_background_image,
    background_color: m.svc_guidance_background_color,
  };

  return (
    <>
      <Navbar />
      <main>
        <ServicesHeroSection content={hero} />
        <ServicesOutcomesSection content={outcomes} />
        <ServicesOverviewSection content={overview} />
        <ServicesRoboticsSection content={robotics} />
        <ServicesSecuritySection content={security} />
        <ServicesAISolutionSection content={ai_solution} />
        <ServicesInitiativesSection content={initiatives} />
        <ServicesGuidanceSection content={guidance} />
      </main>
    </>
  );
}
