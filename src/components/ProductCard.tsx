import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  grind: string;
  size: string;
  tastingNotes: string[];
  details: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleAddToCart = () => {
    addToCart(product as any, 1);
  };

  return (
    <div className="bg-zinc-50/50 hover:bg-white border border-zinc-100 rounded-[2.5rem] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-stretch group hover:translate-y-[-4px]">
      
      {/* Header Row: Grind and Rating */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-semibold px-2.5 py-1 bg-white border border-zinc-150 rounded-full text-zinc-650 tracking-wider uppercase">
          {product.grind}
        </span>
        <div className="flex items-center space-x-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-zinc-700">4.9</span>
        </div>
      </div>

      {/* Product Image Link */}
      <Link to={`/product/${product.id}`} className="relative flex justify-center items-center h-48 mb-6 overflow-hidden rounded-2xl">
        <div className="absolute w-32 h-32 bg-zinc-100/50 rounded-full blur-xl group-hover:scale-125 transition-transform duration-300" />
        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 bg-zinc-900 text-white rounded-full">
          {product.size}
        </span>
      </Link>

      {/* Title & Description */}
      <div className="space-y-2 flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-fredoka text-xl font-bold text-zinc-900 hover:text-zinc-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-zinc-500 text-xs font-inter leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Footer Row: Price & Buy Button */}
      <div className="flex justify-between items-center pt-6 mt-6 border-t border-zinc-100/50">
        <span className="font-fredoka text-xl font-bold text-zinc-900">
          {formatPrice(product.price, true)}
        </span>
        <button
          onClick={handleAddToCart}
          className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition-all duration-200 shadow-sm"
        >
          ORDER NOW
        </button>
      </div>

    </div>
  );
};
