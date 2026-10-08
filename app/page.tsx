import ScenePreloader, { SceneSlot } from "./components/ScenePreloader";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import StatsStrip from "./components/StatsStrip";
import MegaMarquee from "./components/MegaMarquee";
import Pillars from "./components/Pillars";
import HorizontalDeck from "./components/HorizontalDeck";
import TowerStory from "./components/TowerStory";
import LiveTerminal from "./components/LiveTerminal";
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

        <MegaMarquee
          items={["AUTONOMOUS", "SEALED LOOP", "ON-DEVICE AI", "ZERO SOIL"]}
          duration={38}
        />

        <Manifesto />
        <StatsStrip />
        <Pillars />

        <MegaMarquee
          items={["95% LESS WATER", "20 SITES", "4 TIERS", "1 FOOTPRINT"]}
          reverse
          duration={46}
        />

        <HorizontalDeck />
        <TowerStory />
        <LiveTerminal />
        <Telemetry />
        <SensingSection />
        <BoardSection />

        <MegaMarquee
          items={["ESP8266", "TENSORFLOW LITE", "FIREBASE", "RS485 NPK", "KICAD PCB"]}
          duration={34}
        />

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
