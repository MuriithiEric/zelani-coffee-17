import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Star } from "lucide-react";

export const BestSellingSection = () => {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const products = [
    {
      id: "double-espresso",
      name: "Double Espresso",
      rank: "#1 Selling",
      description: "Double Espresso is a double shot of espresso that is made with double amount of coffee.",
      price: 59.99,
      image: "/lovable-uploads/4c88326b-c4a8-48f1-8877-1c643256d8bf.png",
      grind: "Standard",
      size: "Double Shot"
    },
    {
      id: "caramel-frappe",
      name: "Caramel Frappe",
      rank: "#2 Selling",
      description: "Caramel Frappe is a delicious blended coffee drink made with caramel sauce, milk and coffee.",
      price: 12.99,
      image: "/lovable-uploads/5df176de-0b1d-46e9-b1ae-d4641f01c915.png",
      grind: "Blended",
      size: "Regular"
    },
    {
      id: "iced-coffee",
      name: "Iced Coffee",
      rank: "#3 Selling",
      description: "Iced Coffee is a cold coffee drink made with brewed coffee, milk and sugar.",
      price: 9.99,
      image: "/lovable-uploads/6fcd7107-6cd4-4614-be92-a694e1243d0c.png",
      grind: "Standard",
      size: "Regular"
    }
  ];

  return (
    <section id="menu" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900">
            Best Selling Coffee
          </h2>
          <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed">
            A slice of heaven. Buy Zelani Coffee from the convenience of your own home and office.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-50/50 hover:bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-stretch group hover:translate-y-[-4px]"
            >
              {/* Product Rank Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold px-3 py-1 bg-white border border-zinc-100 rounded-full text-zinc-600">
                  {product.rank}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-zinc-700">4.9</span>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative flex justify-center items-center h-48 mb-6 overflow-hidden">
                <div className="absolute w-32 h-32 bg-zinc-200/40 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Description */}
              <div className="space-y-2 flex-grow">
                <h3 className="font-fredoka text-xl font-bold text-zinc-900">
                  {product.name}
                </h3>
                <p className="text-zinc-500 text-xs font-inter leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Footer Row: Price & Buy Button */}
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-zinc-100/50">
                <span className="font-fredoka text-xl font-bold text-zinc-900">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition-all duration-200 shadow-sm"
                >
                  ORDER NOW
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
