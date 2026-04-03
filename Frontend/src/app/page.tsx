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
import { getPageContent, getPageSEO } from "@/lib/wordpress";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("home", "Ai-Ai-Ai | AI Solution Partner", "Thailand's AI Solution Partner — from roadmap to production deployment.");
}

export default async function Home() {
  const page = await getPageContent("home");
  const s = page?.sections as Record<string, Record<string, unknown>> | undefined;

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
