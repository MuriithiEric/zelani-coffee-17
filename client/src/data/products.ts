export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // base price (KES for original products, USD/GBP base for best sellers)
  image: string;
  grind: string;
  size: string;
  tastingNotes: string[];
  details: string;
  isKes?: boolean;
}

export const products: Product[] = [
  // Best Sellers
  {
    id: "double-espresso",
    name: "Double Espresso",
    description: "Double Espresso is a double shot of espresso that is made with double amount of coffee.",
    price: 59.99,
    image: "/lovable-uploads/4c88326b-c4a8-48f1-8877-1c643256d8bf.png",
    grind: "Standard",
    size: "Double Shot",
    tastingNotes: ["Intense", "Rich Cocoa"],
    details: "Double Espresso is a double shot of espresso that is made with double amount of coffee. Perfectly extracted to bring out the maximum concentration of coffee flavor, crema, and body."
  },
  {
    id: "caramel-frappe",
    name: "Caramel Frappe",
    description: "Caramel Frappe is a delicious blended coffee drink made with caramel sauce, milk and coffee.",
    price: 12.99,
    image: "/lovable-uploads/5df176de-0b1d-46e9-b1ae-d4641f01c915.png",
    grind: "Blended",
    size: "Regular",
    tastingNotes: ["Sweet Caramel", "Vanilla", "Milk"],
    details: "Caramel Frappe is a delicious blended coffee drink made with caramel sauce, milk and coffee. Blended to icy perfection and topped with rich caramel drizzle."
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    description: "Iced Coffee is a cold coffee drink made with brewed coffee, milk and sugar.",
    price: 9.99,
    image: "/lovable-uploads/6fcd7107-6cd4-4614-be92-a694e1243d0c.png",
    grind: "Standard",
    size: "Regular",
    tastingNotes: ["Sweet", "Refreshing Milk"],
    details: "Iced Coffee is a cold coffee drink made with brewed coffee, milk and sugar. Served over ice to keep you refreshed throughout the day."
  },
  // Previous Products (original 8 products)
  {
    id: "premium-dark-roast-1kg",
    name: "Premium Dark Roast (1kg)",
    description: "Bold and rich Arabica from Kirinyaga highlands. Our largest size for true dark roast enthusiasts.",
    price: 2700,
    image: "/lovable-uploads/premium-dark-roast-1kg.jpeg",
    grind: "Whole Beans",
    size: "1kg",
    tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
    details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully hand-picked at peak ripeness and roasted to perfection.",
    isKes: true
  },
  {
    id: "premium-dark-roast-125g",
    name: "Premium Dark Roast (125g)",
    description: "Bold and rich Arabica from Kirinyaga highlands. Perfect starter size to discover our bold dark roast.",
    price: 400,
    image: "/lovable-uploads/premium-dark-roast-125g.jpeg",
    grind: "Whole Beans",
    size: "125g",
    tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
    details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. This compact 125g package is perfect for trying our signature dark roast.",
    isKes: true
  },
  {
    id: "premium-dark-roast-500g",
    name: "Premium Dark Roast (500g)",
    description: "Bold and rich Arabica from Kirinyaga highlands. The ideal mid-size option for regular dark roast drinkers.",
    price: 1400,
    image: "/lovable-uploads/premium-dark-roast-500g.jpeg",
    grind: "Whole Beans",
    size: "500g",
    tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
    details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. Sourced from smallholder farmers in Kirinyaga County, these whole beans are carefully roasted to perfection.",
    isKes: true
  },
  {
    id: "premium-dark-roast-250g",
    name: "Premium Dark Roast (250g)",
    description: "Bold and rich Arabica from Kirinyaga highlands. The classic mid-size for everyday enjoyment.",
    price: 750,
    image: "/lovable-uploads/premium-dark-roast-250g.jpeg",
    grind: "Whole Beans",
    size: "250g",
    tastingNotes: ["Dark Chocolate", "Black Cherry", "Citrus"],
    details: "Our Premium Dark Roast delivers bold, intense flavors with a full body. This versatile 250g package is perfect for everyday coffee lovers.",
    isKes: true
  },
  {
    id: "premium-medium-roast-1kg",
    name: "Premium Medium Roast (1kg)",
    description: "Perfectly balanced Arabica with bright, complex flavors. Our largest size for true coffee enthusiasts.",
    price: 2700,
    image: "/lovable-uploads/premium-medium-roast-1kg.jpeg",
    grind: "Medium Ground",
    size: "1kg",
    tastingNotes: ["Caramel", "Floral Notes", "Wine"],
    details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. Expertly ground to medium consistency, this coffee showcases the vibrant character of Kirinyaga beans.",
    isKes: true
  },
  {
    id: "premium-medium-roast-125g",
    name: "Premium Medium Roast (125g)",
    description: "Perfectly balanced Arabica with bright, complex flavors. Perfect starter size to discover our signature roast.",
    price: 400,
    image: "/lovable-uploads/premium-medium-roast-125g.jpeg",
    grind: "Medium Ground",
    size: "125g",
    tastingNotes: ["Caramel", "Floral Notes", "Wine"],
    details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. This compact 125g package is perfect for trying our signature roast.",
    isKes: true
  },
  {
    id: "premium-medium-roast-500g",
    name: "Premium Medium Roast (500g)",
    description: "Perfectly balanced Arabica with bright, complex flavors. The ideal mid-size option for regular coffee drinkers.",
    price: 1400,
    image: "/lovable-uploads/premium-medium-roast-500g.jpeg",
    grind: "Medium Ground",
    size: "500g",
    tastingNotes: ["Caramel", "Floral Notes", "Wine"],
    details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. Expertly ground to medium consistency, showing sweet caramel notes.",
    isKes: true
  },
  {
    id: "premium-medium-roast-250g",
    name: "Premium Medium Roast (250g)",
    description: "Perfectly balanced Arabica with bright, complex flavors. The classic mid-size for everyday enjoyment.",
    price: 750,
    image: "/lovable-uploads/premium-medium-roast-250g.jpeg",
    grind: "Medium Ground",
    size: "250g",
    tastingNotes: ["Caramel", "Floral Notes", "Wine"],
    details: "Our Premium Medium Roast strikes the perfect balance between acidity and body. This versatile 250g package is perfect for everyday coffee lovers.",
    isKes: true
  }
];
