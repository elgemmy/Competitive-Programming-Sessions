import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TopicsGrid from "@/components/TopicsGrid";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TopicsGrid />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
}
