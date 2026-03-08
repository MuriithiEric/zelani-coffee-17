import { ProductCard } from "./ProductCard";

export const ProductsSection = () => {
  const products = [
    {
      id: "premium-dark-roast-1kg",
      name: "Premium Dark Roast",
      description: "Bold and rich Arabica from Kirinyaga highlands. Our largest size for true dark roast enthusiasts.",
      price: 2700,
      image: "/lovable-uploads/premium-dark-roast-1kg.jpeg",
      grind: "Whole Beans",
      size: "1kg",
      tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
      details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. This 1kg package offers exceptional value for dark roast lovers who want to stock up on their favorite coffee. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully hand-picked at peak ripeness and roasted to perfection, bringing out deep chocolate notes and a satisfying richness that dark roast lovers crave."
    },
    {
      id: "premium-dark-roast-125g",
      name: "Premium Dark Roast",
      description: "Bold and rich Arabica from Kirinyaga highlands. Perfect starter size to discover our bold dark roast.",
      price: 400,
      image: "/lovable-uploads/premium-dark-roast-125g.jpeg",
      grind: "Whole Beans",
      size: "125g",
      tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
      details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. This compact 125g package is perfect for trying our signature dark roast or for those who prefer smaller quantities to ensure maximum freshness. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully hand-picked at peak ripeness and roasted to perfection, bringing out deep chocolate notes and a satisfying richness that dark roast lovers crave."
    },
    {
      id: "premium-dark-roast-500g",
      name: "Premium Dark Roast",
      description: "Bold and rich Arabica from Kirinyaga highlands. The ideal mid-size option for regular dark roast drinkers.",
      price: 1400,
      image: "/lovable-uploads/premium-dark-roast-500g.jpeg",
      grind: "Whole Beans",
      size: "500g",
      tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
      details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. This 500g package offers a great balance between value and freshness for regular coffee drinkers. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully hand-picked at peak ripeness and roasted to perfection, bringing out deep chocolate notes and a satisfying richness that dark roast lovers crave."
    },
    {
      id: "premium-dark-roast-250g",
      name: "Premium Dark Roast",
      description: "Bold and rich Arabica from Kirinyaga highlands. The classic mid-size for everyday enjoyment.",
      price: 750,
      image: "/lovable-uploads/premium-dark-roast-250g.jpeg",
      grind: "Whole Beans",
      size: "250g",
      tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
      details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. This versatile 250g package is perfect for everyday coffee lovers who want a balanced size that maintains freshness while providing enough coffee for daily brewing. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully hand-picked at peak ripeness and roasted to perfection, bringing out deep chocolate notes and a satisfying richness that dark roast lovers crave."
    },
    {
      id: "premium-medium-roast-1kg",
      name: "Premium Medium Roast",
      description: "Perfectly balanced Arabica with bright, complex flavors. Our largest size for true coffee enthusiasts.",
      price: 2700,
      image: "/lovable-uploads/premium-medium-roast-1kg.jpeg",
      grind: "Medium Ground",
      size: "1kg",
      tastingNotes: ["Caramel", "Floral Notes", "Wine"],
      details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. This 1kg package offers exceptional value for coffee lovers who want to stock up on their favorite roast. Expertly ground to medium consistency, this coffee showcases the vibrant character of Kirinyaga beans with sweet caramel notes, delicate florals, and wine-like complexity. Perfect for pour-over, drip, or French press methods."
    },
    {
      id: "premium-medium-roast-125g",
      name: "Premium Medium Roast",
      description: "Perfectly balanced Arabica with bright, complex flavors. Perfect starter size to discover our signature roast.",
      price: 350,
      image: "/lovable-uploads/premium-medium-roast-125g.jpeg",
      grind: "Medium Ground",
      size: "125g",
      tastingNotes: ["Caramel", "Floral Notes", "Wine"],
      details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. This compact 125g package is perfect for trying our signature roast or for those who prefer smaller quantities to ensure maximum freshness. Expertly ground to medium consistency, this coffee showcases the vibrant character of Kirinyaga beans with sweet caramel notes, delicate florals, and wine-like complexity. Perfect for pour-over, drip, or French press methods."
    },
    {
      id: "premium-medium-roast-500g",
      name: "Premium Medium Roast",
      description: "Perfectly balanced Arabica with bright, complex flavors. The ideal mid-size option for regular coffee drinkers.",
      price: 1250,
      image: "/lovable-uploads/premium-medium-roast-500g.jpeg",
      grind: "Medium Ground",
      size: "500g",
      tastingNotes: ["Caramel", "Floral Notes", "Wine"],
      details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. This 500g package offers a great balance between value and freshness for regular coffee drinkers. Expertly ground to medium consistency, this coffee showcases the vibrant character of Kirinyaga beans with sweet caramel notes, delicate florals, and wine-like complexity. Perfect for pour-over, drip, or French press methods."
    },
    {
      id: "premium-medium-roast-250g",
      name: "Premium Medium Roast",
      description: "Perfectly balanced Arabica with bright, complex flavors. The classic mid-size for everyday enjoyment.",
      price: 650,
      image: "/lovable-uploads/premium-medium-roast-250g.jpeg",
      grind: "Medium Ground",
      size: "250g",
      tastingNotes: ["Caramel", "Floral Notes", "Wine"],
      details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. This versatile 250g package is perfect for everyday coffee lovers who want a balanced size that maintains freshness while providing enough coffee for daily brewing. Expertly ground to medium consistency, this coffee showcases the vibrant character of Kirinyaga beans with sweet caramel notes, delicate florals, and wine-like complexity. Perfect for pour-over, drip, or French press methods."
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
