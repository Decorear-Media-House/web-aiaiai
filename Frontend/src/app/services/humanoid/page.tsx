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

  // Robots: merge JetEngine repeater (simple editable fields) with JSON (complex nested specs/features)
  let robots: any[] = [];
  let jsonRobots: any[] = [];
  try {
    const json = m.hum_robots_json as string;
    if (json) jsonRobots = JSON.parse(json);
  } catch { /* ignore */ }
  const repeaterArr = ensureArray(m.hum_robots);
  if (repeaterArr.length > 0) {
    robots = repeaterArr.map((rep: any, i: number) => {
      const base = jsonRobots[i] || {};
      const merged = { ...base, ...rep };
      // Read features from separate meta key (not inside repeater)
      const separateFeatures = m[`hum_robot_${i}_features`] as string;
      if (separateFeatures && typeof separateFeatures === "string" && separateFeatures.trim()) {
        merged.features_json = separateFeatures;
      }
      // Collect feature images from repeater fields
      const feat1 = (rep as any).feature_image_1;
      const feat2 = (rep as any).feature_image_2;
      if (feat1 || feat2) {
        merged.feature_images = [feat1, feat2].filter(Boolean);
      }
      // Parse specs from "label|value" per line format
      if (typeof merged.specs === "string" && merged.specs.trim()) {
        merged.specs = merged.specs.split("\n").filter((l: string) => l.trim()).map((l: string) => {
          const [label, ...rest] = l.split("|");
          return { label: label.trim(), value: rest.join("|").trim() };
        });
      }
      // Parse features from multiple formats
      if (typeof merged.features_json === "string" && merged.features_json.trim()) {
        const raw = merged.features_json.trim();
        if (raw.startsWith("[")) {
          // JSON format (legacy)
          try { merged.features = JSON.parse(raw); } catch { /* keep existing */ }
        } else if (raw.includes("##")) {
          // Markdown format: "## title\n- item1\n- item2"
          const features: { title: string; items: string[] }[] = [];
          let current: { title: string; items: string[] } | null = null;
          // Strip HTML tags from wp_editor
          const clean = raw.replace(/<[^>]+>/g, "\n");
          for (const line of clean.split("\n")) {
            const trimmed = line.trim();
            if (trimmed.startsWith("##")) {
              if (current) features.push(current);
              current = { title: trimmed.replace(/^#+\s*/, ""), items: [] };
            } else if (trimmed.startsWith("-") && current) {
              current.items.push(trimmed.replace(/^-\s*/, ""));
            }
          }
          if (current) features.push(current);
          if (features.length > 0) merged.features = features;
        } else {
          // Pipe format: "title|item1|item2" per line
          merged.features = raw.split("\n").filter((l: string) => l.trim()).map((l: string) => {
            const [title, ...items] = l.split("|").map((s: string) => s.trim());
            return { title, items: items.filter(Boolean) };
          });
        }
      }
      return merged;
    });
  } else if (jsonRobots.length > 0) {
    robots = jsonRobots;
  }

  // Inject video defaults for first robot if WP doesn't provide video URLs
  if (robots.length > 0) {
    robots[0] = {
      ...robots[0],
      video_thumb: robots[0].video_thumb || "/images/video-thumb-ai1.png",
      video_url: robots[0].video_url || "/videos/ai1.mp4",
      video_thumb_2: robots[0].video_thumb_2 || "/images/video-thumb-ai2.png",
      video_url_2: robots[0].video_url_2 || "/videos/ai2.mp4",
    };
  }
  // Inject video URL for second robot (D1 EDU) if missing
  if (robots.length > 1) {
    robots[1] = {
      ...robots[1],
      video_url: robots[1].video_url || "/videos/d1-edu.mp4",
    };
  }
  // Inject video data for third robot (A2 ULTRA) if missing
  if (robots.length > 2) {
    robots[2] = {
      ...robots[2],
      video_thumb: robots[2].video_thumb || "/images/video-thumb-a2.png",
      video_url: robots[2].video_url || "/videos/a2-ultra-demo.mp4",
    };
  }
  // Inject video data for fourth robot (AGIBOT G2) if missing
  if (robots.length > 3) {
    robots[3] = {
      ...robots[3],
      video_thumb: robots[3].video_thumb || "/images/video-thumb-g2.png",
      video_url: robots[3].video_url || "/videos/agibot-g2.mp4",
    };
  }

  // Add bullet prefix to feature items if missing (robot 0 = X2 ULTRA, robot 2 = A2 ULTRA)
  for (const idx of [0, 2]) {
    if (robots.length > idx && robots[idx].features) {
      const feats = Array.isArray(robots[idx].features) ? robots[idx].features : Object.values(robots[idx].features);
      robots[idx].features = feats.map((f: any) => ({
        ...f,
        items: (Array.isArray(f.items) ? f.items : []).map((item: string) =>
          /^[·•]/.test(item) ? item : `· ${item}`
        ),
      }));
    }
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
