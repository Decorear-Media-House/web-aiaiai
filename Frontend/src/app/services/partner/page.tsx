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
    chipLabel: m.ptr_hero_chipLabel,
    heading: m.ptr_hero_heading,
    description: m.ptr_hero_description,
    primaryCta: m.ptr_hero_primaryCta,
    secondaryCta: m.ptr_hero_secondaryCta,
    hero_background_image: m.ptr_hero_hero_background_image,
    container_image: m.ptr_hero_container_image,
    background_color: m.ptr_hero_background_color,
  };

  const statement: any = {
    textWhite: m.ptr_statement_textWhite,
    textHighlight: m.ptr_statement_textHighlight,
  };

  const meaning: any = {
    chipLabel: m.ptr_meaning_chipLabel,
    headingPrefix: m.ptr_meaning_headingPrefix,
    headingHighlight: m.ptr_meaning_headingHighlight,
    headingSuffix: m.ptr_meaning_headingSuffix,
    description: m.ptr_meaning_description,
    leadIn: m.ptr_meaning_leadIn,
    checkItems: textareaToArray(m.ptr_meaning_checkItems).length > 0 ? textareaToArray(m.ptr_meaning_checkItems) : undefined,
    quote: m.ptr_meaning_quote,
    container_image: m.ptr_meaning_container_image,
    background_color: m.ptr_meaning_background_color,
  };

  const outcomes: any = {
    chipLabel: m.ptr_outcomes_chipLabel,
    heading: m.ptr_outcomes_heading,
    headingHighlight: m.ptr_outcomes_headingHighlight,
    description: m.ptr_outcomes_description,
    section_image: m.ptr_outcomes_section_image,
    background_color: m.ptr_outcomes_background_color,
  };

  const phases: any = {
    chipLabel: m.ptr_phases_chipLabel,
    heading: m.ptr_phases_heading,
    headingHighlight: m.ptr_phases_headingHighlight,
    description: m.ptr_phases_description,
  };

  const deliverables: any = {
    chipLabel: m.ptr_deliverables_chipLabel,
    heading: m.ptr_deliverables_heading,
    headingHighlight: m.ptr_deliverables_headingHighlight,
    description: m.ptr_deliverables_description,
    container_image: m.ptr_deliverables_container_image,
    background_image: m.ptr_deliverables_background_image,
  };

  const engagement: any = {
    chipLabel: m.ptr_engagement_chipLabel,
    heading: m.ptr_engagement_heading,
    headingHighlight: m.ptr_engagement_headingHighlight,
    description: m.ptr_engagement_description,
  };

  const process: any = {
    chipLabel: m.ptr_process_chipLabel,
    heading: m.ptr_process_heading,
    headingHighlight: m.ptr_process_headingHighlight,
    description: m.ptr_process_description,
    background_image: m.ptr_process_background_image,
  };

  const faq: any = {
    chipLabel: m.ptr_faq_chipLabel,
    heading: m.ptr_faq_heading,
    headingHighlight: m.ptr_faq_headingHighlight,
    description: m.ptr_faq_description,
    ctaText: m.ptr_faq_ctaText,
    background_image: m.ptr_faq_background_image,
    background_color: m.ptr_faq_background_color,
  };

  const cta: any = {
    heading: m.ptr_cta_heading,
    headingHighlight: m.ptr_cta_headingHighlight,
    description: m.ptr_cta_description,
    primaryCta: m.ptr_cta_primaryCta,
    secondaryCta: m.ptr_cta_secondaryCta,
    background_image: m.ptr_cta_background_image,
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
