import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { api } from "@/lib/api/api-client";
import { Product } from "@/data/products";

const Products = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    api.products.getAll().then(setProductsList).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-jost">
      <Navigation />
      
      {/* Spacer for fixed nav */}
      <div className="h-24 bg-transparent" />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h1 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900">
            Our Coffee Collection
          </h1>
          <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed">
            Sourced ethically, roasted to perfection. Explore our full range of artisanal dark, medium and espresso roasts.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsList.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-stretch group hover:translate-y-[-4px]"
            >
              {/* Product Image Link */}
              <Link to={`/product/${product.id}`} className="block relative flex justify-center items-center h-48 mb-6 overflow-hidden rounded-xl">
                <div className="absolute w-32 h-32 bg-zinc-50 rounded-full filter blur-xl group-hover:scale-125 transition-all duration-300" />
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 bg-zinc-900 text-white rounded-full">
                  {product.size}
                </span>
              </Link>

              {/* Title & Info */}
              <div className="space-y-2 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                      {product.grind}
                    </span>
                    <div className="flex items-center space-x-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-zinc-700">4.9</span>
                    </div>
                  </div>

                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-fredoka text-lg font-bold text-zinc-900 hover:text-zinc-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-zinc-500 text-xs font-inter leading-relaxed mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Pricing and Action row */}
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-zinc-50">
                  <span className="font-fredoka text-lg font-bold text-zinc-900">
                    {formatPrice(product.price)}
                  </span>
                  
                  <button
                    onClick={() => addToCart(product as any)}
                    className="bg-zinc-900 hover:bg-zinc-800 text-white p-2.5 rounded-full transition-all duration-200 shadow-sm"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
