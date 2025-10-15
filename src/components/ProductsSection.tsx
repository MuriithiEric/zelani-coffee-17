import { ProductCard } from "./ProductCard";

export const ProductsSection = () => {
  const products = [
    {
      id: "whole-beans-250g",
      name: "Whole Beans",
      description: "Pure Arabica from Kirinyaga highlands. Perfect for those who prefer to grind fresh.",
      price: 1200,
      image: "/lovable-uploads/4c88326b-c4a8-48f1-8877-1c643256d8bf.png",
      grind: "Whole Beans",
      size: "250g",
      tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
      details: "Our whole bean coffee preserves maximum freshness and flavor complexity. Sourced from smallholder farmers in Kirinyaga County, these beans are carefully hand-picked at peak ripeness and processed using traditional methods that honor generations of coffee expertise."
    },
    {
      id: "ground-250g",
      name: "Ground Coffee",
      description: "Pre-ground for convenience without compromising quality. Ready to brew.",
      price: 1200,
      image: "/lovable-uploads/5df176de-0b1d-46e9-b1ae-d4641f01c915.png",
      grind: "Medium Ground",
      size: "250g",
      tastingNotes: ["Caramel", "Floral Notes", "Wine"],
      details: "Expertly ground to medium consistency, perfect for pour-over, drip, or French press methods. This ground coffee maintains the vibrant character of our Kirinyaga beans while offering the convenience of ready-to-brew coffee for your daily ritual."
    },
    {
      id: "drip-bags-10pack",
      name: "Drip Bags",
      description: "Portable single-serve drip bags. Coffee on the go, crafted with care.",
      price: 1500,
      image: "/lovable-uploads/6fcd7107-6cd4-4614-be92-a694e1243d0c.png",
      grind: "Drip Bag",
      size: "10-pack",
      tastingNotes: ["Bright Acidity", "Berry", "Honey"],
      details: "Ten individually wrapped drip bags for the nomad in you. Each bag contains perfectly portioned, freshly ground coffee that brews directly in your cup. Ideal for travel, office, or camping — just add hot water and experience specialty coffee anywhere."
    },
    {
      id: "sampler-trio-3x100g",
      name: "Sampler Trio",
      description: "Three 100g bags showcasing our range. Explore the full Zelani experience.",
      price: 1800,
      image: "/lovable-uploads/f6ce5f0e-3daa-4d78-ae9e-8fef11b33995.png",
      grind: "Variety",
      size: "3×100g",
      tastingNotes: ["Multi-profile", "Discovery Pack", "Full Range"],
      details: "A curated collection featuring three distinct roast profiles from our Kirinyaga origins. This sampler includes light, medium, and dark roasts (100g each) so you can discover your favorite expression of Kenyan Arabica. Perfect for gifting or personal exploration."
    }
  ];

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-espresso-800 mb-4">
            Our Coffee Collection
          </h2>
          <p className="text-xl text-espresso-600 max-w-2xl mx-auto">
            Ethically sourced, expertly roasted. Choose your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
