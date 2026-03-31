import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Mwangi",
    location: "Nairobi, Kenya",
    quote:
      "Zelani Coffee has completely changed my morning routine. The dark roast is bold, rich, and absolutely perfect. Knowing it comes straight from Kirinyaga makes every cup feel special.",
  },
  {
    name: "James Ochieng",
    location: "Mombasa, Kenya",
    quote:
      "I've tried many Kenyan coffees, but Zelani stands out. The medium roast has this beautiful complexity — caramel, florals, and a wine-like finish that keeps me coming back.",
  },
  {
    name: "Amina Hassan",
    location: "Kisumu, Kenya",
    quote:
      "As a coffee enthusiast, I appreciate Zelani's commitment to ethical sourcing. The quality is exceptional and I love supporting smallholder farmers with every purchase.",
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-coffee-900 text-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-12 w-12 text-gold-400 mx-auto mb-8 opacity-60" />

          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-xl md:text-2xl leading-relaxed text-cream-100 mb-8 font-light italic">
              "{testimonials[current].quote}"
            </p>
            <div>
              <p className="font-semibold text-gold-400 text-lg">
                {testimonials[current].name}
              </p>
              <p className="text-cream-300 text-sm">
                {testimonials[current].location}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              variant="ghost"
              size="sm"
              onClick={prev}
              className="text-cream-200 hover:text-gold-400 hover:bg-coffee-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-gold-400 w-6" : "bg-cream-300/40"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={next}
              className="text-cream-200 hover:text-gold-400 hover:bg-coffee-800"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
