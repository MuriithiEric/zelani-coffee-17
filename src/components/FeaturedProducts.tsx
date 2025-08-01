
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Dark Roast",
      description: "Our signature dark roast from Mt. Kenya highlands. Rich, full-bodied with chocolate undertones and bright acidity.",
      image: "/lovable-uploads/4c88326b-c4a8-48f1-8877-1c643256d8bf.png",
      rating: 4.9,
      origin: "Mt. Kenya"
    },
    {
      id: 2,
      name: "Premium Medium Roast",
      description: "Pure Arabica from Mwirua, Kirinyaga County. Bright floral notes with hints of citrus and wine.",
      image: "/lovable-uploads/5df176de-0b1d-46e9-b1ae-d4641f01c915.png",
      rating: 4.8,
      origin: "Kirinyaga"
    },
    {
      id: 3,
      name: "Zelani Coffee Collection",
      description: "100% pure Arabica supporting local farmers. Well-balanced coffee with exceptional clarity and fairchain practices.",
      image: "/lovable-uploads/6fcd7107-6cd4-4614-be92-a694e1243d0c.png",
      rating: 4.9,
      origin: "Kenya"
    }
  ];

  return (
    <section id="products" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-800 mb-4">
            Our Coffee Collection
          </h2>
          <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of 100% pure Arabica coffee, 
            sourced from the highlands of Mt. Kenya with fairchain practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover-lift coffee-shadow border-0">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold-500 text-coffee-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.origin}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? "text-gold-500 fill-current" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-coffee-600 font-medium">
                    {product.rating}
                  </span>
                </div>
                
                <h3 className="font-playfair text-xl font-semibold text-coffee-800 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-coffee-600 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
