import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import Calculator from "@/components/Calculator";
import InfoSections from "@/components/InfoSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FeatureCards />
      <Calculator />
      <InfoSections />
      <Footer />
    </div>
  );
}
