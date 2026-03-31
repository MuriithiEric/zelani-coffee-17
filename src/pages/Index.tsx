
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { StorySection } from "@/components/StorySection";
import { ProductsSection } from "@/components/ProductsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { MissionBanner } from "@/components/MissionBanner";
import { ImpactSection } from "@/components/ImpactSection";
import { InstagramCTA } from "@/components/InstagramCTA";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <StorySection />
      <ProductsSection />
      <TestimonialsSection />
      <MissionBanner />
      <ImpactSection />
      <InstagramCTA />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
