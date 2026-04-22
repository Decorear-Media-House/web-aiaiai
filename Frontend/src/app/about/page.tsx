import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutMissionSection from "@/components/sections/about/AboutMissionSection";
import AboutPhilosophySection from "@/components/sections/about/AboutPhilosophySection";
import AboutEdgeSection from "@/components/sections/about/AboutEdgeSection";
import AboutLeadershipSection from "@/components/sections/about/AboutLeadershipSection";
import AboutTeamSection from "@/components/sections/about/AboutTeamSection";
import { getPageMeta, getPageSEO, ensureArray, textareaToArray } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("about", "About Us | AI-AI-AI", "Learn about AI-AI-AI Co., Ltd. — Thailand's AI Solution Partner from roadmap to production deployment.");
}

export default async function AboutPage() {
  const m = await getPageMeta("about");

  /* ── Legacy fallback: page_sections JSON ── */
  if (m._legacy) {
    const s = m as Record<string, Record<string, unknown>>;
    return (
      <>
        <Navbar />
        <main>
          <AboutHeroSection content={s?.hero} />
          <AboutMissionSection content={s?.mission} />
          <AboutPhilosophySection content={s?.philosophy} />
          <AboutEdgeSection content={s?.edge} />
          <AboutLeadershipSection content={s?.leadership} />
          <AboutTeamSection content={s?.team} />
        </main>
      </>
    );
  }

  /* ── JetEngine meta fields → component props ── */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const hero: any = {
    label: m.about_hero_label,
    heading: m.about_hero_heading,
    description: m.about_hero_description,
    hero_background_image: m.about_hero_background_image,
  };

  const mission: any = {
    label: m.about_mission_label,
    headingWhite1: m.about_mission_headingWhite1,
    headingHighlight: m.about_mission_headingHighlight,
    headingWhite2: m.about_mission_headingWhite2,
    description: m.about_mission_description,
    background_image: m.about_mission_background_image,
    background_mobile_image: m.about_mission_background_mobile_image,
  };

  const philosophy: any = {
    label: m.about_philosophy_label,
    headingPrefix: m.about_philosophy_headingPrefix,
    headingHighlight: m.about_philosophy_headingHighlight,
    subtitle: m.about_philosophy_subtitle,
    introText: m.about_philosophy_introText,
    items: (() => {
      const raw = ensureArray(m.about_philosophy_principles || m.about_philosophy_items);
      return raw.length > 0 ? raw : undefined;
    })(),
    background_color: m.about_philosophy_background_color,
  };

  const edge: any = {
    label: m.about_edge_label,
    headingPrefix: m.about_edge_headingPrefix,
    headingHighlight: m.about_edge_headingHighlight,
    edges: (() => {
      const raw = ensureArray(m.about_edge_edges).filter((e: any) => e.title || e.label);
      return raw.length > 0 ? raw : undefined;
    })(),
    edge_photo_image: m.about_edge_photo_image,
  };

  const leadership: any = {
    heading: m.about_leadership_heading,
    description: m.about_leadership_description,
    logo_image: m.about_leadership_logo_image,
    background_color: m.about_leadership_background_color,
    background_image: m.about_leadership_background_image,
  };

  const team: any = {
    label: m.about_team_label,
    headingPrefix: m.about_team_headingPrefix,
    headingHighlight: m.about_team_headingHighlight,
    description: m.about_team_sectionDescription || m.about_team_description,
    ceoName: m.about_team_ceoName,
    ceoRole: m.about_team_ceoRole,
    ceoBio: m.about_team_ceoBio,
    ceoTags: textareaToArray(m.about_team_ceoTags).length > 0 ? textareaToArray(m.about_team_ceoTags) : undefined,
    ctoName: m.about_team_ctoName,
    ctoRole: m.about_team_ctoRole,
    cooName: m.about_team_cooName,
    cooRole: m.about_team_cooRole,
    ceo_photo_image: m.about_team_ceo_photo_image,
    cto_photo_image: m.about_team_cto_photo_image,
    coo_photo_image: m.about_team_coo_photo_image,
    ceo_photo_mobile_image: m.about_team_ceo_photo_mobile_image,
    cto_photo_mobile_image: m.about_team_cto_photo_mobile_image,
    coo_photo_mobile_image: m.about_team_coo_photo_mobile_image,
  };

  return (
    <>
      <Navbar />
      <main>
        <AboutHeroSection content={hero} />
        <AboutMissionSection content={mission} />
        <AboutPhilosophySection content={philosophy} />
        <AboutEdgeSection content={edge} />
        <AboutLeadershipSection content={leadership} />
        <AboutTeamSection content={team} />
      </main>
    </>
  );
}
