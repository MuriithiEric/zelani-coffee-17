
import { Award, Globe, Heart, Users } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Kenyan Highlands",
      description: "Sourced from the highlands of Mt. Kenya, specifically Mwirua in Kirinyaga County for exceptional quality."
    },
    {
      icon: Award,
      title: "100% Arabica",
      description: "Pure Arabica coffee beans, carefully selected and expertly roasted to bring out the finest flavors."
    },
    {
      icon: Heart,
      title: "Fairchain Practices",
      description: "We advocate for the rights of farmers and cooperatives, promoting fair trade and sustainability."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "Supporting Kenyan coffee farmers while bringing rich, great-tasting coffee into homes worldwide."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-800 mb-6">
              From Farm to Cup
              <span className="block text-coffee-600">Kenyan Excellence</span>
            </h2>
            
            <p className="text-lg text-coffee-600 mb-8 leading-relaxed">
              Zelani Coffee is a Kenyan brand offering 100% pure Arabica coffee, inspired by Ethiopia, 
              the birthplace of coffee. We support fairchain practices, advocating for the rights of 
              farmers and cooperatives in Kenya, bringing rich, great-tasting coffee into homes while 
              promoting fair trade and sustainability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-coffee-100 p-2 rounded-lg">
                    <feature.icon className="h-6 w-6 text-coffee-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-coffee-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/lovable-uploads/9a61cff0-6d68-4c5f-9ee6-1aadee53d834.png"
              alt="Coffee farmer harvesting coffee cherries in Kenya"
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl coffee-shadow"
            />
            <div className="absolute -bottom-6 -left-6 bg-gold-500 text-coffee-900 p-6 rounded-xl coffee-shadow">
              <div className="text-3xl font-bold font-playfair">Mt. Kenya</div>
              <div className="text-sm font-medium">Kirinyaga County</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
