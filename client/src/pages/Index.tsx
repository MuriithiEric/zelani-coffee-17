
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ExploreSection } from "@/components/ExploreSection";
import { FavouriteCoffeeSection } from "@/components/FavouriteCoffeeSection";
import { InstantCoffeeSection } from "@/components/InstantCoffeeSection";
import { CustomerReviewsSection } from "@/components/CustomerReviewsSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ContactForm } from "@/components/ContactForm";
import { BestSellingSection } from "@/components/BestSellingSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <Hero />
      <ExploreSection />
      <FavouriteCoffeeSection />
      <InstantCoffeeSection />
      <CustomerReviewsSection />
      <ProductsSection />
      <ContactForm />
      <BestSellingSection />
      <Footer />
    </div>
  );
};

export default Index;
