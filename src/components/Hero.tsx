import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0 parallax-bg">
        <img
          src="/lovable-uploads/f42a61be-a3d1-4468-969e-6f230e8f47e9.png"
          alt="Zelani Coffee - Premium Kenyan Arabica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-espresso-900/85 via-espresso-800/70 to-forest-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-sand-100 mb-6 animate-fade-in tracking-tight">
            Coffee for the
            <span className="block text-gradient mt-2">Curious Nomad</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-sand-200 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Born in Kirinyaga, roasted for adventure. 100% Kenyan Arabica 
            crafted with purpose and ethical sourcing.
          </p>

          <div className="flex justify-center animate-scale-in">
            <Button 
              size="lg" 
              onClick={scrollToProducts}
              className="bg-forest-600 hover:bg-forest-700 text-sand-50 font-semibold px-10 py-6 text-lg hover-lift rounded-full transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Floating stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 animate-float">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sand-300 font-playfair">100%</div>
              <div className="text-sand-400 text-sm md:text-base mt-1">Kenyan Arabica</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sand-300 font-playfair">Kirinyaga</div>
              <div className="text-sand-400 text-sm md:text-base mt-1">Highlands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sand-300 font-playfair">Ethical</div>
              <div className="text-sand-400 text-sm md:text-base mt-1">Sourcing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-sand-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-sand-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
