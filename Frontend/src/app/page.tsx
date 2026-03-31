import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/sections/home/HeroSection";
import SecondSection from "@/components/sections/home/SecondSection";
import ThirdSection from "@/components/sections/home/ThirdSection";
import FourthSection from "@/components/sections/home/FourthSection";
import FifthSection from "@/components/sections/home/FifthSection";
import SixthSection from "@/components/sections/home/SixthSection";
import SeventhSection from "@/components/sections/home/SeventhSection";
import ContactSection from "@/components/sections/home/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />
        <SeventhSection />
        <ContactSection />
      </main>
    </>
  );
}
