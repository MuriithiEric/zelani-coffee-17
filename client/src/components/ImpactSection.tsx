import { Sprout, Users, Award, Heart } from "lucide-react";

export const ImpactSection = () => {
  const impacts = [
    {
      icon: Sprout,
      title: "Agronomy Training",
      description: "Teaching modern farming techniques while respecting traditional methods"
    },
    {
      icon: Users,
      title: "Post-Harvest Excellence",
      description: "Training in processing, drying, and quality control for premium beans"
    },
    {
      icon: Award,
      title: "Quality Standards",
      description: "Helping farmers meet international specialty coffee standards"
    },
    {
      icon: Heart,
      title: "Fair Partnerships",
      description: "Direct relationships that ensure farmers receive fair compensation"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-coffee-900 text-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Empowering Farmers
          </h2>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto">
            We train farmers in agronomy, post-harvest practices, and quality control — 
            building sustainable futures one harvest at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impacts.map((impact, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-coffee-800/50 backdrop-blur-sm hover-lift"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-400 rounded-full mb-4">
                <impact.icon className="h-8 w-8 text-coffee-900" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3 text-cream-100">
                {impact.title}
              </h3>
              <p className="text-cream-200 text-sm leading-relaxed">
                {impact.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-coffee-800/30 backdrop-blur-sm rounded-lg p-8 max-w-3xl">
            <p className="text-lg text-cream-100 leading-relaxed">
              Every bag you purchase directly supports our farmer training programs. Together, 
              we're not just growing coffee — we're cultivating expertise, sustainability, and 
              economic opportunity in rural Kenya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
