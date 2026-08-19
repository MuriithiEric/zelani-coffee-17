import { Button } from "@/components/ui/button";

export const FavouriteCoffeeSection = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="py-24 bg-[#faf9f6] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Lined-up Coffee Cups */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Soft decorative background shadow blob */}
            <div className="absolute w-[80%] h-[80%] bg-zinc-200/40 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-[420px] sm:max-w-[480px] hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl">
              <img
                src="/lovable-uploads/9a61cff0-6d68-4c5f-9ee6-1aadee53d834.png"
                alt="Three Zelani Coffee Cups"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Column: Content and Button */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
              Order Your <br />
              Favourite Coffee
            </h2>
            
            <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed max-w-xl">
              Zelani Delicious Coffee is a coffee shop that sells high quality coffee and food. 
              We use high quality ingredients to make our coffee and food. Order now and enjoy your food.
            </p>

            <div className="pt-2">
              <Button
                onClick={scrollToMenu}
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
              >
                ORDER NOW
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
