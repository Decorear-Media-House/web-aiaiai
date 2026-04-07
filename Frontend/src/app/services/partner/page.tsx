import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import PartnerHeroSection from "@/components/sections/partner/PartnerHeroSection";
import PartnerStatementSection from "@/components/sections/partner/PartnerStatementSection";
import PartnerMeaningSection from "@/components/sections/partner/PartnerMeaningSection";
import PartnerOutcomesSection from "@/components/sections/partner/PartnerOutcomesSection";
import PartnerPhasesSection from "@/components/sections/partner/PartnerPhasesSection";
import PartnerDeliverablesSection from "@/components/sections/partner/PartnerDeliverablesSection";
import PartnerEngagementSection from "@/components/sections/partner/PartnerEngagementSection";
import PartnerProcessSection from "@/components/sections/partner/PartnerProcessSection";
import PartnerFAQSection from "@/components/sections/partner/PartnerFAQSection";
import PartnerCTASection from "@/components/sections/partner/PartnerCTASection";
import { getPageMeta, getPageSEO, ensureArray, textareaToArray } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("partner", "AI Solution Partner | Ai-Ai-Ai", "Roadmap to MVP to production deployment—delivered with governance, integration, and operational constraints in mind.");
}

export default async function PartnerPage() {
  const m = await getPageMeta("partner");

  /* ── Legacy fallback: page_sections JSON ── */
  if (m._legacy) {
    const s = m as Record<string, Record<string, unknown>>;
    return (
      <>
        <Navbar />
        <main>
          <PartnerHeroSection content={s?.hero} />
          <PartnerStatementSection content={s?.statement} />
          <PartnerMeaningSection content={s?.meaning} />
          <PartnerOutcomesSection content={s?.outcomes} />
          <PartnerPhasesSection content={s?.phases} />
          <PartnerDeliverablesSection content={s?.deliverables} />
          <PartnerEngagementSection content={s?.engagement} />
          <PartnerProcessSection content={s?.process} />
          <PartnerFAQSection content={s?.faq} />
          <PartnerCTASection content={s?.cta} />
        </main>
      </>
    );
  }

  /* ── JetEngine meta fields → component props ── */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const hero: any = {
    chip: m.ptr_hero_chip,
    heading: m.ptr_hero_heading,
    description: m.ptr_hero_description,
    stats: ensureArray(m.ptr_hero_stats),
    cta_primary: m.ptr_hero_cta_primary,
    cta_secondary: m.ptr_hero_cta_secondary,
    hero_background_image: m.ptr_hero_background_image,
    background_color: m.ptr_hero_background_color,
  };

  const statement: any = {
    heading: m.ptr_statement_heading,
    description: m.ptr_statement_description,
    paragraphs: textareaToArray(m.ptr_statement_paragraphs),
    background_color: m.ptr_statement_background_color,
  };

  const meaning: any = {
    label: m.ptr_meaning_label,
    heading: m.ptr_meaning_heading,
    heading_highlight: m.ptr_meaning_heading_highlight,
    description: m.ptr_meaning_description,
    items: ensureArray(m.ptr_meaning_items),
    background_color: m.ptr_meaning_background_color,
  };

  const outcomes: any = {
    label: m.ptr_outcomes_label,
    heading: m.ptr_outcomes_heading,
    heading_highlight: m.ptr_outcomes_heading_highlight,
    description: m.ptr_outcomes_description,
    cards: ensureArray(m.ptr_outcomes_cards),
    background_color: m.ptr_outcomes_background_color,
  };

  const phases: any = {
    label: m.ptr_phases_label,
    heading: m.ptr_phases_heading,
    heading_highlight: m.ptr_phases_heading_highlight,
    description: m.ptr_phases_description,
    phases: ensureArray(m.ptr_phases_phases),
    background_color: m.ptr_phases_background_color,
  };

  const deliverables: any = {
    label: m.ptr_deliverables_label,
    heading: m.ptr_deliverables_heading,
    heading_highlight: m.ptr_deliverables_heading_highlight,
    description: m.ptr_deliverables_description,
    items: ensureArray(m.ptr_deliverables_items),
    background_color: m.ptr_deliverables_background_color,
  };

  const engagement: any = {
    label: m.ptr_engagement_label,
    heading: m.ptr_engagement_heading,
    heading_highlight: m.ptr_engagement_heading_highlight,
    description: m.ptr_engagement_description,
    models: ensureArray(m.ptr_engagement_models),
    background_color: m.ptr_engagement_background_color,
  };

  const process: any = {
    label: m.ptr_process_label,
    heading: m.ptr_process_heading,
    heading_highlight: m.ptr_process_heading_highlight,
    description: m.ptr_process_description,
    steps: ensureArray(m.ptr_process_steps),
    background_color: m.ptr_process_background_color,
  };

  const faq: any = {
    label: m.ptr_faq_label,
    heading: m.ptr_faq_heading,
    heading_highlight: m.ptr_faq_heading_highlight,
    description: m.ptr_faq_description,
    items: ensureArray(m.ptr_faq_items),
    background_color: m.ptr_faq_background_color,
  };

  const cta: any = {
    heading: m.ptr_cta_heading,
    heading_highlight: m.ptr_cta_heading_highlight,
    description: m.ptr_cta_description,
    cta_primary: m.ptr_cta_cta_primary,
    cta_secondary: m.ptr_cta_cta_secondary,
    background_image: m.ptr_cta_background_image,
    background_color: m.ptr_cta_background_color,
  };

  return (
    <>
      <Navbar />
      <main>
        <PartnerHeroSection content={hero} />
        <PartnerStatementSection content={statement} />
        <PartnerMeaningSection content={meaning} />
        <PartnerOutcomesSection content={outcomes} />
        <PartnerPhasesSection content={phases} />
        <PartnerDeliverablesSection content={deliverables} />
        <PartnerEngagementSection content={engagement} />
        <PartnerProcessSection content={process} />
        <PartnerFAQSection content={faq} />
        <PartnerCTASection content={cta} />
      </main>
    </>
  );
}
