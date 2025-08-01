
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with coffee image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/f42a61be-a3d1-4468-969e-6f230e8f47e9.png"
          alt="Premium Kenyan coffee beans"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/80 via-coffee-800/60 to-coffee-700/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Pure Kenyan
            <span className="block text-gradient">Arabica Coffee</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-cream-100 mb-8 max-w-2xl mx-auto animate-fade-in">
            From the highlands of Mt. Kenya to your cup. Experience 100% pure Arabica coffee 
            that supports fairchain practices and Kenyan farmers.
          </p>

          <div className="flex justify-center animate-scale-in">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-coffee-900 font-semibold px-8 py-3 text-lg hover-lift">
              Discover Our Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Floating coffee stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-float">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400 font-playfair">100%</div>
              <div className="text-cream-200 text-sm md:text-base">Pure Arabica</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400 font-playfair">Mt. Kenya</div>
              <div className="text-cream-200 text-sm md:text-base">Highlands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gold-400 font-playfair">Fair</div>
              <div className="text-cream-200 text-sm md:text-base">Trade Coffee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream-200 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cream-200 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
