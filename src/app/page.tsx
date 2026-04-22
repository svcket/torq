import GlobalChrome from "@/components/ui/GlobalChrome";
import HeroCarousel from "@/components/sections/HeroCarousel";
import IdentityEventsSequence from "@/components/sections/IdentityEventsSequence";
import MovementGallery from "@/components/sections/MovementGallery";
import Merchandise from "@/components/sections/Merchandise";
import SceneryHero from "@/components/sections/SceneryHero";
import ArchiveGallery from "@/components/sections/ArchiveGallery";
import StoriesEditorial from "@/components/sections/StoriesEditorial";
import BrandsFaqSequence from "@/components/sections/BrandsFaqSequence";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Global persistent chrome — fixed, z:100, scroll-zone aware */}
      <GlobalChrome />

      <main>
        <HeroCarousel />
        <IdentityEventsSequence />
        <MovementGallery />
        <Merchandise />
        <SceneryHero />
        <ArchiveGallery />
        <StoriesEditorial />
        <BrandsFaqSequence />
      </main>
    </>
  );
}
