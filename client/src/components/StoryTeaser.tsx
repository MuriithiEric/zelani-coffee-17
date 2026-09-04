import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, Coffee, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StoryTeaser = () => {
  return (
    <section className="py-24 bg-[#faf9f6] overflow-hidden relative">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#dfc5a3]/20 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with layered cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200/60 max-w-lg mx-auto">
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=900"
                alt="Brewing artisanal Zelani Coffee"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs uppercase tracking-widest text-[#dfc5a3] font-semibold mb-1">
                  Born From Generosity
                </div>
                <div className="font-fredoka text-lg sm:text-xl font-bold">
                  "It started with a cup of coffee. Not a business plan."
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-2 lg:-right-4 bg-white border border-zinc-100 p-4 rounded-2xl shadow-xl z-20 items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Karen Farmers Market</div>
                <div className="text-[11px] text-zinc-500">Marula Green Market, Nairobi</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Teaser */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100/70 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story</span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
              From a Nairobi Kitchen to Africa's Global Stage
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              When Patrick returned from Ethiopia with exceptional coffee, he gave it away to friends. But when they kept coming back again and again, he realized it wasn't just generosity — it was genuine love for extraordinary coffee.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-white border border-zinc-200 mt-0.5 text-amber-700">
                  <Heart className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
                  <strong>Born from Generosity:</strong> Sourced through deep friendships and built on authentic trust.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-white border border-zinc-200 mt-0.5 text-amber-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed">
                  <strong>Rooted in Kenya:</strong> Sourced from Mount Kenya's volcanic soils and celebrated at Karen's Marula Green Market.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/our-story">
                <Button 
                  size="lg"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg group"
                >
                  <span>READ OUR FULL STORY</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
