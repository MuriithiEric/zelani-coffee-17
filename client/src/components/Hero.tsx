import { Coffee, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1600"
          alt="Premium Dark Coffee Beans Background"
          className="w-full h-full object-cover opacity-45 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-950/90"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/85"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
        {/* Subtitle with Coffee Icon */}
        <div className="flex items-center gap-2 text-[#dfc5a3] text-xs sm:text-sm uppercase tracking-widest font-medium mb-4 select-none">
          <Coffee className="h-4.5 w-4.5 text-[#dfc5a3]" />
          <span>Crafted with love, served with passion</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-fredoka text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl drop-shadow-sm">
          Discover the Journey of <br className="hidden sm:inline" /> your Coffee
        </h1>

        {/* Subtext Description */}
        <p className="text-zinc-400 font-inter text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-5 mb-8 font-light">
          Explore roasters, trace origins, and build your coffee passport with Bean trace.
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-2xl bg-[#2a221b]/40 backdrop-blur-md border border-amber-900/20 rounded-full p-1.5 flex items-center shadow-2xl focus-within:border-amber-700/40 transition-all duration-300">
          <input
            type="text"
            placeholder="Search for roasters or coffees..."
            className="w-full bg-transparent pl-5 pr-3 py-3 text-white placeholder-zinc-500 focus:outline-none text-sm sm:text-base"
          />
          <Button className="bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950 rounded-full px-8 py-3.5 h-auto font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 shrink-0 shadow-md">
            Search
          </Button>
        </div>

        {/* Scan Button */}
        <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#dfc5a3]/30 hover:border-[#dfc5a3]/60 bg-[#2a221b]/10 hover:bg-[#2a221b]/30 text-[#dfc5a3] text-xs sm:text-sm font-medium tracking-widest transition-all duration-300 mt-8 uppercase shadow-inner">
          <Scan className="h-4.5 w-4.5" />
          <span>Scan Coffee Code</span>
        </button>
      </div>
    </section>
  );
};
