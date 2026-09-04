import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Users, 
  TrendingUp, 
  GraduationCap, 
  Trees, 
  Repeat, 
  Coffee, 
  HeartHandshake, 
  Compass, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Impact = () => {
  const trajectoryMilestones = [
    {
      year: "2026",
      farmers: "50",
      focus: "Establish relationships & baseline",
      detail: "Form initial partnerships with smallholders in Kirinyaga & Mount Kenya, establishing direct communication and benchmark quality standards."
    },
    {
      year: "2027",
      farmers: "100",
      focus: "Expand sourcing & launch financial literacy",
      detail: "Double our farmer network and roll out core financial literacy modules on budgeting, saving, and managing seasonal harvest cashflows."
    },
    {
      year: "2028",
      farmers: "175",
      focus: "Strengthen farmer programs & sustainability",
      detail: "Deepen regenerative farming practices, scale tree planting, and test initial quality-based farmer incentives."
    },
    {
      year: "2029",
      farmers: "275",
      focus: "Expand washing-station operations & community impact",
      detail: "Establish dedicated washing-station infrastructure and expand community support programs reaching hundreds of families."
    },
    {
      year: "2030",
      farmers: "400",
      focus: "Establish a mature, measurable impact network",
      detail: "A fully realized ecosystem with 400+ farmers, audited premiums, Barista Academy graduates, and responsible coffee tourism."
    }
  ];

  const targets = [
    {
      number: "01",
      icon: Users,
      title: "400+ Trusted Farmers",
      summary: "Build a trusted network of approximately 400 farmers by 2030.",
      description: "Our priority is not simply the number of farmers, but the strength, depth, and quality of the relationships we build with each smallholder family."
    },
    {
      number: "02",
      icon: TrendingUp,
      title: "Better Farmer Value",
      summary: "Transparent quality-based farmer premiums through washing stations.",
      description: "Once our washing stations are established, we introduce transparent premiums returning more value to origin. We will measure and report actual premiums paid."
    },
    {
      number: "03",
      icon: GraduationCap,
      title: "Financial Literacy for 400+",
      summary: "Practical training covering saving, budgeting & seasonal income.",
      description: "Empowering farmers with practical financial skills to bridge harvest cycles, invest in family prosperity, and achieve long-term financial security."
    },
    {
      number: "04",
      icon: Trees,
      title: "4,000+ Trees Planted",
      summary: "Agroforestry and tree planting growing with our farmer network.",
      description: "Planting indigenous and shade trees to safeguard volcanic soils, enhance biodiversity, and mitigate climate risks in coffee-growing regions."
    },
    {
      number: "05",
      icon: Repeat,
      title: "Circular Packaging",
      summary: "Rewarding customer packaging returns with loyalty points & discounts.",
      description: "We are establishing a dedicated packaging-return program, measuring and publishing the exact volume of packages returned and responsibly recovered."
    },
    {
      number: "06",
      icon: Coffee,
      title: "Zelani Barista Academy",
      summary: "Empowering 100+ youth with barista, coffee, and hospitality skills.",
      description: "Progressively training young Kenyans in specialty coffee brewing, hospitality excellence, and entrepreneurship to create careers in the coffee ecosystem."
    },
    {
      number: "07",
      icon: HeartHandshake,
      title: "Community Giving Back",
      summary: "500+ families reached with clothing, shoes, and community support.",
      description: "Continuing our hands-on support in coffee regions, including shoe and clothing donations, seasonal support, and grassroots family assistance."
    },
    {
      number: "08",
      icon: Compass,
      title: "Journey With Us",
      summary: "Connecting 250+ travelers with coffee farms, culture, and people.",
      description: "Developing responsible, ethical coffee tourism that bridges coffee consumers directly with the farmers, communities, and terroir behind their cup."
    }
  ];

  const trackedMetrics = [
    "Farmers reached & supported",
    "Farmer premiums paid above market rates",
    "Financial literacy program graduates",
    "Trees planted & nurtured",
    "Packages recovered through circular incentives",
    "Young baristas trained at the Academy",
    "Families supported with community aid",
    "Coffee enthusiasts experiencing Journey With Us"
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-900 font-inter selection:bg-[#dfc5a3]/40 selection:text-zinc-950 flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-28 pb-20 bg-zinc-950 overflow-hidden text-center">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1607681034540-2c46cc71896d?auto=format&fit=crop&q=80&w=1920"
            alt="Coffee Farmers In Kenya"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-zinc-950"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/90"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#dfc5a3]/15 border border-[#dfc5a3]/30 text-[#dfc5a3] text-xs font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zelani Impact 2030</span>
          </div>

          <h1 className="font-fredoka text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.15]">
            From Farm. To Cup. <br className="hidden sm:inline" />
            <span className="text-[#dfc5a3]">To Future.</span>
          </h1>

          <p className="text-zinc-300 text-lg sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Our impact journey will grow alongside Zelani Coffee. Rather than pursuing growth at any cost, our objective is to build a strong, sustainable and measurable network.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a href="#targets">
              <Button className="bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950 rounded-full px-8 py-6 text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all">
                Explore 8 Targets
              </Button>
            </a>
            <a href="#roadmap">
              <Button variant="outline" className="border-white/25 hover:border-white/50 text-white bg-white/5 hover:bg-white/10 rounded-full px-8 py-6 text-sm font-medium tracking-wide">
                2026-2030 Roadmap
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 2030 SMART Objective Banner */}
      <section className="py-16 bg-white border-b border-zinc-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-[#faf9f6] border border-amber-900/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfc5a3]/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100/70 px-3.5 py-1 rounded-full">
                Our 2030 SMART Objective
              </span>

              <h2 className="font-fredoka text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 max-w-3xl mx-auto leading-snug">
                By December 2030, Zelani Coffee aims to work with approximately 400 farmers while creating measurable impact across farmer value, financial literacy, conservation, youth development, and community support.
              </h2>

              <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
                We are starting with approximately 50 farmers in 2026 and progressively expanding as our sourcing, washing-station and market capacity grows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory Roadmap (2026-2030) */}
      <section id="roadmap" className="py-24 bg-[#faf9f6] relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 bg-zinc-200/70 px-3.5 py-1 rounded-full">
              Growth Trajectory
            </span>
            <h2 className="font-fredoka text-3xl sm:text-5xl font-bold text-zinc-900">
              Our 5-Year Farmer Growth Journey
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              A deliberate, sustainable scaling path where each step deepens our impact and relationship with farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {trajectoryMilestones.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                  idx === 4
                    ? "bg-zinc-900 text-white border-zinc-800 shadow-xl md:scale-105"
                    : "bg-white text-zinc-900 border-zinc-200/70 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-2xl font-bold font-fredoka ${idx === 4 ? "text-[#dfc5a3]" : "text-amber-700"}`}>
                      {item.year}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      idx === 4 ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-700"
                    }`}>
                      {item.farmers} Farmers
                    </span>
                  </div>

                  <h3 className={`font-fredoka text-base font-bold mb-2 ${idx === 4 ? "text-white" : "text-zinc-900"}`}>
                    {item.focus}
                  </h3>

                  <p className={`text-xs leading-relaxed ${idx === 4 ? "text-zinc-300" : "text-zinc-500"}`}>
                    {item.detail}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t text-[11px] font-semibold uppercase tracking-wider ${
                  idx === 4 ? "border-zinc-800 text-[#dfc5a3]" : "border-zinc-100 text-zinc-400"
                }`}>
                  Phase 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 8 Targets Grid */}
      <section id="targets" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full">
              Commitments
            </span>
            <h2 className="font-fredoka text-3xl sm:text-5xl font-bold text-zinc-900">
              Our 8 Targets for 2030
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base">
              Concrete, verifiable initiatives that create lasting value for farming families and our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targets.map((target, idx) => (
              <div
                key={idx}
                className="bg-[#faf9f6] border border-zinc-200/80 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-amber-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                      <target.icon className="w-6 h-6" />
                    </div>
                    <span className="font-fredoka text-xs font-bold text-zinc-400">
                      TARGET {target.number}
                    </span>
                  </div>

                  <h3 className="font-fredoka text-xl font-bold text-zinc-900">
                    {target.title}
                  </h3>

                  <p className="font-medium text-xs text-amber-800 leading-snug">
                    {target.summary}
                  </p>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {target.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-1.5 text-xs text-zinc-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2030 Measurable Goal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accountability Section */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#dfc5a3] bg-[#dfc5a3]/10 px-3.5 py-1.5 rounded-full border border-[#dfc5a3]/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Accountability</span>
              </div>

              <h2 className="font-fredoka text-3xl sm:text-5xl font-bold text-white leading-tight">
                Impact Should Be Measured, Not Simply Claimed.
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
                Each year, we will review our progress against these targets and report our actual results publicly. If we exceed a target, we will celebrate and report the higher achievement.
              </p>

              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                <p className="text-[#dfc5a3] font-fredoka text-lg font-semibold">
                  "Our targets are not ceilings. They are commitments we intend to beat."
                </p>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                We believe in total transparency. Rather than making unsubstantiated marketing statements about farmer welfare, we hold ourselves to rigorous annual reporting.
              </p>
            </div>

            {/* Right: What we measure */}
            <div className="lg:col-span-6">
              <div className="bg-zinc-900 border border-zinc-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
                <h3 className="font-fredoka text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dfc5a3]" />
                  What We Measure & Report Annually:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trackedMetrics.map((metric, i) => (
                    <div key={i} className="flex items-start gap-3 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800/60">
                      <CheckCircle2 className="w-4 h-4 text-[#dfc5a3] shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-300 leading-snug">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Promise & Closing Banner */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 bg-zinc-100 px-4 py-1.5 rounded-full">
            Our Promise
          </span>

          <h2 className="font-fredoka text-3xl sm:text-5xl font-bold text-zinc-900">
            Start. Measure. Improve. Grow.
          </h2>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            We are not promising to change everything overnight. We are promising to start, measure, improve, and grow. Meaningful impact is not created by making the biggest promise — it is created by keeping the promises you make, and doing more whenever you can.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold tracking-wide shadow-md">
                Support Farmers · Buy Coffee
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/our-story">
              <Button variant="outline" className="border-zinc-300 hover:bg-zinc-100 text-zinc-900 rounded-full px-8 py-6 text-sm font-semibold tracking-wide">
                Read Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impact;
