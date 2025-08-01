
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
