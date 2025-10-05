import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import RegionPills from "@/components/RegionPills";
import Calculator from "@/components/Calculator";
import InfoSections from "@/components/InfoSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeatureCards />
      <RegionPills />
      <Calculator />
      <InfoSections />
      <Footer />
    </div>
  );
}
