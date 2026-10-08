import ScenePreloader, { SceneSlot } from "./components/ScenePreloader";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import StatsStrip from "./components/StatsStrip";
import VelocityMarquee from "./components/VelocityMarquee";
import SideRail from "./components/SideRail";
import Comparison from "./components/Comparison";
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
      <SideRail />
      <div className="bg-noise" />
      <div className="scanline-fx" />
      <Nav />

      <main id="main" className="relative z-10">
        <Hero />

        <VelocityMarquee
          items={["AUTONOMOUS", "SEALED LOOP", "ON-DEVICE AI", "ZERO SOIL"]}
          baseVelocity={2.2}
        />

        <Manifesto />
        <StatsStrip />
        <Pillars />

        <VelocityMarquee
          items={["95% LESS WATER", "20 SITES", "4 TIERS", "1 FOOTPRINT"]}
          baseVelocity={-1.8}
        />

        <HorizontalDeck />
        <TowerStory />
        <LiveTerminal />
        <Telemetry />
        <Comparison />
        <SensingSection />
        <BoardSection />

        <VelocityMarquee
          items={["ESP8266", "TENSORFLOW LITE", "FIREBASE", "RS485 NPK", "KICAD PCB"]}
          baseVelocity={2.8}
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
