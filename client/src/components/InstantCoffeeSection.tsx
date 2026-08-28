import { Button } from "@/components/ui/button";

export const InstantCoffeeSection = () => {
  return (
    <section id="download-app" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
              Instant Coffee <br />
              At Your Home
            </h2>
                        <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed max-w-xl">
              Zelani Delicious Coffee is a coffee shop that sells high quality coffee and food. 
              We use high quality ingredients to make our coffee and food. Order now and enjoy your food.
            </p>

            <div className="pt-2">
              <Button
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
              >
                DOWNLOAD APP
              </Button>
            </div>
          </div>

          {/* Right Column: App Mockup Images */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Background circular ornaments */}
            <div className="absolute w-[80%] h-[80%] bg-zinc-50/80 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-[450px] sm:max-w-[500px] hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl">
              <img
                src="/lovable-uploads/66c47dcd-7926-49ed-b2ce-71fda3bf3012.png"
                alt="Zelani Coffee Mobile App Mockup Screens"
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
