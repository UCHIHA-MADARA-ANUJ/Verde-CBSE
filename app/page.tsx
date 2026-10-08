import ScenePreloader, { SceneSlot } from "./components/ScenePreloader";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import StatsStrip from "./components/StatsStrip";
import Pillars from "./components/Pillars";
import Manifesto from "./components/Manifesto";
import CustomCursor from "./components/CustomCursor";
import TowerStory from "./components/TowerStory";
import Telemetry from "./components/Telemetry";
import SensingSection from "./components/SensingSection";
import BoardSection from "./components/BoardSection";
import SpecExplorer from "./components/SpecExplorer";
import Timeline from "./components/Timeline";
import Faq from "./components/Faq";
import TeamSection from "./components/TeamSection";
import Closing from "./components/Closing";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";

export default function Home() {
  return (
    <ScenePreloader>
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <div className="bg-noise" />
      <div className="scanline-fx" />
      <Nav />

      <main id="main" className="relative z-10">
        <Hero />
        <Manifesto />
        <StatsStrip />
        <Pillars />
        <TowerStory />
        <Telemetry />
        <SensingSection />
        <BoardSection />
        <SpecExplorer />
        <Timeline />
        <Faq />
        <TeamSection />
        <Closing />
      </main>

      <Footer />

      {/* keeps the tower warm for the hero-less opening; never visible */}
      <div className="sr-only" aria-hidden>
        <SceneSlot id="tower" className="w-0 h-0" />
      </div>
    </ScenePreloader>
  );
}
