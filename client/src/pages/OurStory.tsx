import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Heart, Coffee, Users, TrendingUp, Sparkles, MapPin, Compass, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const OurStory = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-inter selection:bg-[#dfc5a3]/40 selection:text-zinc-950 flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-zinc-950 overflow-hidden text-center">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=1920"
            alt="Artisanal African Coffee Heritage"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-950"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/90"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dfc5a3]/15 border border-[#dfc5a3]/30 text-[#dfc5a3] text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Zelani Story</span>
          </div>

          <h1 className="font-fredoka text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.15]">
            It Started With a <br className="hidden sm:inline" />
            <span className="text-[#dfc5a3]">Cup of Coffee.</span>
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Not a business plan. Not an investment. Not even a brand. <br className="hidden md:inline" />
            Just pure generosity.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button className="bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950 rounded-full px-8 py-6 text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all">
                Taste the Coffee
              </Button>
            </Link>
            <Link to="/impact">
              <Button variant="outline" className="border-white/25 hover:border-white/50 text-white bg-white/5 hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium tracking-wide">
                View 2030 Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Ethiopian Inspiration & Free Coffee */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-md">
                <Heart className="w-3.5 h-3.5" />
                <span>Chapter 01 · Origin</span>
              </div>
              
              <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
                Generosity in a Nairobi Kitchen
              </h2>

              <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                After visiting Ethiopia — the birthplace of coffee — Patrick Githinji Muriithi returned to Kenya with new friendships, unforgettable experiences, and an unexpected supply of exceptional coffee.
              </p>

              <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                Friends he had made in Ethiopia would visit Kenya and bring him a kilogram or two of coffee. Before long, more than eight kilograms were sitting in his kitchen. Patrick couldn't possibly drink it all.
              </p>

              <div className="bg-[#faf9f6] border-l-4 border-[#dfc5a3] p-6 rounded-r-2xl my-6">
                <p className="font-medium italic text-zinc-800 text-lg">
                  "Friends and acquaintances would ask if he had coffee, and he would generously give them a kilogram or two — free of charge. Then they came back. And asked for more. They came back again. And again."
                </p>
              </div>

              <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                By the third visit, Patrick recognized something profound: this wasn't just generosity. It was demand. People weren't returning because the coffee was free — they were returning because they loved it. That was when the entrepreneur recognized an opportunity.
              </p>

              <div className="pt-2 font-fredoka text-xl font-bold text-zinc-950">
                Zelani Coffee was born.
              </div>
            </div>

            {/* Visual Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1200"
                  alt="Pouring freshly brewed coffee"
                  className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white p-4 backdrop-blur-md bg-black/40 rounded-2xl border border-white/15">
                  <div className="text-sm font-semibold tracking-wide text-[#dfc5a3]">ADDIS ABABA TO NAIROBI</div>
                  <div className="text-xs text-zinc-200 mt-1">From a kitchen gift between friends to an authentic specialty brand.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter 2: The Pivot (2020 - 2021) */}
      <section className="py-24 bg-[#faf9f6] relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 bg-zinc-200/60 px-3 py-1 rounded-md">
              <Compass className="w-3.5 h-3.5" />
              <span>Chapter 02 · The Defining Decision</span>
            </div>
            <h2 className="font-fredoka text-3xl sm:text-5xl font-bold text-zinc-900">
              When the World Changed, <br />
              We Chose Kenya.
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
              In the beginning, Patrick sourced coffee directly from Addis Ababa and introduced it to customers across Nairobi. The business was personal, relationship-driven, and small.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-zinc-200/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg">
                2020
              </div>
              <h3 className="font-fredoka text-xl font-bold text-zinc-900">The Disruption</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                COVID-19 disrupted international travel and cross-border supply chains, forcing Patrick to rethink everything. Rather than stopping, he adapted and began exploring local sources.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-zinc-200/60 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg">
                2021
              </div>
              <h3 className="font-fredoka text-xl font-bold text-zinc-900">The Crossroads</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                As Ethiopian coffee prices rose to unsustainable levels, Patrick faced a defining crossroads: rely on expensive external supply, or build Zelani around extraordinary local coffee at home.
              </p>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#dfc5a3] text-zinc-950 flex items-center justify-center font-bold text-lg">
                Today
              </div>
              <h3 className="font-fredoka text-xl font-bold text-white">He Chose Kenya</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Patrick chose to anchor Zelani in the volcanic soils of Mount Kenya and Kirinyaga County, championing local smallholders and crafting world-class 100% Arabica roasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Rooted in Kenya & The Farmers Market */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Mosaic */}
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-100">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200"
                  alt="Farmers market coffee stand and brewing"
                  className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-zinc-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Marula Green Market · Karen, Nairobi</span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                <MapPin className="w-3.5 h-3.5" />
                <span>Chapter 03 · Community</span>
              </div>

              <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
                From Marula Lane to a Thriving Community
              </h2>

              <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                In 2022, Patrick launched Zelani Coffee at the Organic Farmers Market in Karen, hosted at the Kenya Society for the Protection and Care for Animals (KSPCA).
              </p>

              <div className="space-y-3 py-2">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#dfc5a3]" />
                  <span className="font-medium text-zinc-800">It started with artisanal coffee bags.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#dfc5a3]" />
                  <span className="font-medium text-zinc-800">Then came cold-brewed and ready-to-drink beverages.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#dfc5a3]" />
                  <span className="font-medium text-zinc-800">Then came loyal customers who became our community.</span>
                </div>
              </div>

              <p className="text-zinc-600 leading-relaxed text-base sm:text-lg">
                Today, Zelani Coffee is one of the most sought-after brands at what is now known as the <strong>Marula Green Market on Marula Lane in Karen</strong>. But for us, this is only the beginning.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter 4: Three People, One Vision */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#dfc5a3] bg-[#dfc5a3]/10 px-3.5 py-1.5 rounded-full border border-[#dfc5a3]/20">
              <Users className="w-3.5 h-3.5" />
              <span>Our Foundational Pillars</span>
            </div>
            <h2 className="font-fredoka text-4xl sm:text-5xl font-bold tracking-tight">
              Three People. One Vision.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              We design every bean, relationship, and experience around three core stakeholders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* For the Farmer */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-700/50 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-[#dfc5a3]">
                  <Coffee className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#dfc5a3]">Pillar 01</div>
                <h3 className="font-fredoka text-2xl font-bold text-white">For the Farmer</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Exceptional coffee begins at origin. The farmer should not simply be the beginning of the supply chain, but an integral recipient of the value created from it.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Zelani celebrates the people, volcanic soil, and craftsmanship behind African coffee while building stronger, equitable opportunities at origin.
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 mt-6 text-xs text-[#dfc5a3] font-medium">
                Great coffee deserves great value at origin.
              </div>
            </div>

            {/* For the Customer */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-700/50 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-[#dfc5a3]">
                  <Award className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#dfc5a3]">Pillar 02</div>
                <h3 className="font-fredoka text-2xl font-bold text-white">For the Customer</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We want to change the way people experience coffee. Introducing coffee with genuine character, provenance, and a story worth knowing.
                </p>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-zinc-300 italic text-sm">
                  "I didn't know coffee could taste like this."
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Coffee shouldn't simply wake you up. It should inspire you.
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 mt-6 text-xs text-[#dfc5a3] font-medium">
                Specialty taste that elevates every morning.
              </div>
            </div>

            {/* For the Investor */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-700/50 transition-all duration-300">
              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-800/40 flex items-center justify-center text-[#dfc5a3]">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#dfc5a3]">Pillar 03</div>
                <h3 className="font-fredoka text-2xl font-bold text-white">For the Investor</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  There is a much bigger opportunity behind the cup. Africa produces the world's finest coffee, yet few African brands have achieved genuine global recognition.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Zelani is built as a scalable African consumer brand across specialty roasts, ready-to-drink beverages, cafés, hospitality, retail, and global exports.
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-800/80 mt-6 text-xs text-[#dfc5a3] font-medium">
                Participate in a globally recognised African brand.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter 5: Our Biggest Ambition & Manifesto */}
      <section className="py-24 bg-[#faf9f6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-zinc-200/80 p-8 sm:p-14 shadow-xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-100 px-4 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Our Horizon</span>
            </div>

            <h2 className="font-fredoka text-3xl sm:text-5xl font-bold text-zinc-900 leading-tight">
              Africa's Most Recognizable <br />
              Coffee Brand Globally
            </h2>

            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              We are not trying to build just another Kenyan coffee company. We are creating a brand born in Kenya, rooted in African coffee culture, built to meet global standards, and designed to travel far beyond our borders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-5 rounded-2xl bg-[#faf9f6] border border-zinc-100">
                <div className="font-fredoka font-bold text-lg text-zinc-900 mb-1">Own Roastery</div>
                <div className="text-xs text-zinc-500 leading-relaxed">State-of-the-art roasting facilities to control quality and profile.</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#faf9f6] border border-zinc-100">
                <div className="font-fredoka font-bold text-lg text-zinc-900 mb-1">Café Network</div>
                <div className="text-xs text-zinc-500 leading-relaxed">Spaces where guests taste exceptional coffee and experience its origin story.</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#faf9f6] border border-zinc-100">
                <div className="font-fredoka font-bold text-lg text-zinc-900 mb-1">Global Reach</div>
                <div className="text-xs text-zinc-500 leading-relaxed">Exporting Kenyan coffee excellence directly to international connoisseurs.</div>
              </div>
            </div>

            {/* Manifesto Box */}
            <div className="bg-zinc-950 text-white rounded-2xl p-8 space-y-4">
              <div className="text-xs uppercase tracking-widest text-[#dfc5a3] font-semibold">
                The Zelani Creed
              </div>
              <p className="font-fredoka text-xl sm:text-2xl font-bold leading-relaxed text-zinc-100">
                "Born from generosity. Built on relationships. <br />
                Rooted in Kenya. Inspired by Africa. Created for the world."
              </p>
            </div>

            {/* Call to Actions */}
            <div className="pt-6 flex flex-wrap justify-center items-center gap-4">
              <Link to="/products">
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wide shadow-md">
                  Shop Our Roasts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/impact">
                <Button variant="outline" className="border-zinc-300 hover:bg-zinc-100 text-zinc-900 rounded-full px-8 py-6 text-sm font-semibold tracking-wide">
                  Explore 2030 Impact Goals
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
