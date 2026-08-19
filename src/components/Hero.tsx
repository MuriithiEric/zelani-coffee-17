import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Image with Blurred Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1600"
          alt="Premium Coffee Beans Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#faf9f6]/95 lg:bg-gradient-to-r lg:from-[#faf9f6]/98 lg:via-[#faf9f6]/90 lg:to-[#faf9f6]/60 backdrop-blur-[6px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Heading and Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:pr-8">
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-zinc-200/50 shadow-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold tracking-wider text-zinc-700 uppercase">
                Best Coffee in Town
              </span>
            </div>

            <h1 className="font-fredoka text-5xl sm:text-6xl md:text-7xl font-bold text-zinc-900 leading-[1.08] tracking-tight relative">
              Zelani <br />
              <span className="text-zinc-800">Delicious</span> <br />
              <span className="relative inline-block">
                Coffee
                <span className="absolute -right-12 top-2 md:top-4 bg-amber-100 border border-amber-300/40 text-amber-800 rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold font-playfair italic shadow-sm">
                  100%
                </span>
              </span>
            </h1>

            <p className="text-zinc-700 font-inter text-base sm:text-lg max-w-lg leading-relaxed font-medium">
              A slice of heaven. Buy Zelani Coffee from the convenience of your own home and office.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Button
                onClick={scrollToMenu}
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ORDER NOW
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-zinc-300 hover:bg-zinc-50 hover:border-zinc-400 text-zinc-700 rounded-full px-8 py-6 text-sm font-semibold tracking-wider transition-all duration-200"
              >
                BOOK A TABLE
              </Button>
            </div>
          </div>




        </div>
      </div>
    </section>
  );
};
