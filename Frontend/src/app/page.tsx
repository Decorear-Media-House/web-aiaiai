import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/sections/home/HeroSection";
import SecondSection from "@/components/sections/home/SecondSection";
import ThirdSection from "@/components/sections/home/ThirdSection";
import FourthSection from "@/components/sections/home/FourthSection";
import FifthSection from "@/components/sections/home/FifthSection";
import SixthSection from "@/components/sections/home/SixthSection";
import SeventhSection from "@/components/sections/home/SeventhSection";
import ContactSection from "@/components/sections/home/ContactSection";
import { getPageMeta, getPageSEO, ensureArray, textareaToArray } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("home", "Ai-Ai-Ai | AI Solution Partner", "Thailand's AI Solution Partner — from roadmap to production deployment.");
}

export default async function Home() {
  const m = await getPageMeta("home");

  /* ── Legacy fallback: page_sections JSON ── */
  if (m._legacy) {
    const s = m as Record<string, Record<string, unknown>>;
    return (
      <>
        <Navbar />
        <main>
          <HeroSection content={s?.hero} />
          <SecondSection content={s?.about} />
          <ThirdSection content={s?.problems} />
          <FourthSection content={s?.services} />
          <FifthSection content={s?.outcomes} />
          <SixthSection content={s?.process} />
          <SeventhSection content={s?.cta} />
          <ContactSection content={s?.contact} />
        </main>
      </>
    );
  }

  /* ── JetEngine meta fields → component props ── */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const hero: any = {
    label: m.home_hero_label,
    heading: m.home_hero_heading,
    description: m.home_hero_description,
    cta_text: m.home_hero_cta_text,
    cta_subtext: m.home_hero_cta_subtext,
    stats: ensureArray(m.home_hero_stats),
    brand_logo_image: m.home_hero_brand_logo_image,
  };

  const about: any = {
    heading: m.home_about_heading,
    paragraphs: textareaToArray(m.home_about_paragraphs),
    section_background_image: m.home_about_section_background_image,
  };

  const problems: any = {
    label: m.home_problems_label,
    headingWhite: m.home_problems_headingWhite,
    headingGradient: m.home_problems_headingGradient,
    description: m.home_problems_description,
    cards: ensureArray(m.home_problems_cards),
  };

  const services: any = {
    label: m.home_services_label,
    heading: m.home_services_heading,
    description: m.home_services_description,
    items: ensureArray(m.home_services_items),
  };

  const outcomes: any = {
    label: m.home_outcomes_label,
    heading: m.home_outcomes_heading,
    description: m.home_outcomes_description,
    decorative_image: m.home_outcomes_decorative_image,
  };

  const process: any = {
    label: m.home_process_label,
    heading: m.home_process_heading,
    description: m.home_process_description,
    side_panel_image: m.home_process_side_panel_image,
  };

  const cta: any = {
    heading: m.home_cta_heading,
    description: m.home_cta_description,
    background_video: m.home_cta_background_video,
  };

  const contact: any = {
    label: m.home_contact_label,
    heading: m.home_contact_heading,
    description: m.home_contact_description,
    email: m.home_contact_email,
    address: m.home_contact_address,
    google_map_url: m.home_contact_google_map_url,
    background_color: m.home_contact_background_color,
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection content={hero} />
        <SecondSection content={about} />
        <ThirdSection content={problems} />
        <FourthSection content={services} />
        <FifthSection content={outcomes} />
        <SixthSection content={process} />
        <SeventhSection content={cta} />
        <ContactSection content={contact} />
      </main>
    </>
  );
}
