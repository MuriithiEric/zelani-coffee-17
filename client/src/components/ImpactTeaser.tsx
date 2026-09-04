import { Link } from "react-router-dom";
import { ArrowRight, Trees, Users, GraduationCap, Repeat, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ImpactTeaser = () => {
  const statHighlights = [
    {
      icon: Users,
      value: "400+",
      label: "Farmers Network",
      sublabel: "Quality-focused relationships"
    },
    {
      icon: Trees,
      value: "4,000+",
      label: "Trees Planted",
      sublabel: "Agroforestry in coffee regions"
    },
    {
      icon: GraduationCap,
      value: "100+",
      label: "Academy Youths",
      sublabel: "Barista & hospitality skills"
    },
    {
      icon: Repeat,
      value: "Circular",
      label: "Packaging Rewards",
      sublabel: "Loyalty incentives for return"
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Subtle radial ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dfc5a3]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#dfc5a3] bg-[#dfc5a3]/10 px-3.5 py-1.5 rounded-full border border-[#dfc5a3]/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Zelani Impact 2030</span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-5xl font-bold tracking-tight">
            From Farm. To Cup. <span className="text-[#dfc5a3]">To Future.</span>
          </h2>

          <p className="text-zinc-400 font-inter text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Rather than pursuing growth at any cost, our objective is to build a strong, sustainable and measurable network of coffee farmers and communities.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statHighlights.map((stat, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 text-center space-y-3 hover:border-amber-700/50 hover:bg-zinc-900 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 mx-auto flex items-center justify-center text-[#dfc5a3] group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="font-fredoka text-3xl sm:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="font-semibold text-sm text-zinc-200">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-500">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button & Note */}
        <div className="text-center space-y-4">
          <Link to="/impact">
            <Button
              size="lg"
              className="bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950 rounded-full px-8 py-6 text-sm font-semibold tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              <span>EXPLORE 2030 IMPACT GOALS</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="text-xs text-zinc-500">
            Commitments we intend to beat · Measured annually
          </div>
        </div>

      </div>
    </section>
  );
};
