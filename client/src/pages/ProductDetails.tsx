import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useCart } from "@/hooks/useCart";
import { Star, ChevronLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import { api } from "@/lib/api/api-client";
import { Product } from "@/data/products";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    api.products.getAll().then(setProductsList).catch(console.error);
  }, [id]);

  const product = productsList.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex flex-col font-jost justify-between">
        <Navigation />
        <div className="text-center py-40">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="text-zinc-600 underline">Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related products
  const relatedProducts = productsList.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product as any, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-jost">
      <Navigation />
      
      {/* Spacer for fixed nav */}
      <div className="h-24 bg-transparent" />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-900 transition-colors mb-12"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="text-sm font-semibold">Back</span>
        </button>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-zinc-100">
          {/* Left Column: Product Image */}
          <div className="lg:col-span-6 bg-white border border-zinc-100 rounded-[2.5rem] p-12 flex justify-center items-center h-[400px] sm:h-[500px] relative overflow-hidden shadow-sm">
            <div className="absolute w-[80%] h-[80%] bg-zinc-50 rounded-full filter blur-2xl pointer-events-none" />
            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Column: Information */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div className="flex items-center space-x-4">
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-900 text-white rounded-full">
                {product.size}
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full">
                {product.grind}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-zinc-800">4.9 (1k+ reviews)</span>
              </div>
            </div>

            <h1 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900">
              {product.name}
            </h1>

            <span className="font-fredoka text-3xl font-bold text-zinc-900">
              {formatPrice(product.price)}
            </span>

            <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Tasting Notes */}
            {product.tastingNotes && product.tastingNotes.length > 0 && (
              <div className="space-y-2 w-full">
                <h4 className="font-fredoka text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                  Tasting Notes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tastingNotes.map((note, index) => (
                    <span key={index} className="bg-zinc-50 border border-zinc-100 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-700">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detail Paragraph */}
            <div className="space-y-2">
              <h4 className="font-fredoka text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                Product Details
              </h4>
              <p className="text-zinc-500 text-xs font-inter leading-relaxed max-w-xl">
                {product.details}
              </p>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-4 border-t border-zinc-100">
              {/* Quantity Counter */}
              <div className="flex items-center justify-between border border-zinc-200 rounded-full p-1 bg-zinc-50 max-w-[140px]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="bg-white border border-zinc-150 p-2 rounded-full hover:bg-zinc-100 shadow-sm"
                >
                  <Minus className="h-4 w-4 text-zinc-700" />
                </button>
                <span className="font-fredoka font-bold text-lg px-4 text-zinc-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="bg-white border border-zinc-150 p-2 rounded-full hover:bg-zinc-100 shadow-sm"
                >
                  <Plus className="h-4 w-4 text-zinc-700" />
                </button>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddToCart}
                className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-10 py-5 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products section */}
        <div className="pt-20 space-y-12">
          <h2 className="font-fredoka text-3xl font-bold text-zinc-900">
            Related Coffee Roasts
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-stretch group"
              >
                <Link to={`/product/${p.id}`} className="block relative flex justify-center items-center h-40 mb-4 overflow-hidden rounded-xl">
                  <div className="absolute w-24 h-24 bg-zinc-50 rounded-full filter blur-xl group-hover:scale-125 transition-all duration-300" />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    {p.grind}
                  </span>
                  <Link to={`/product/${p.id}`} className="block">
                    <h3 className="font-fredoka text-base font-bold text-zinc-900 hover:text-zinc-600 transition-colors truncate">
                      {p.name}
                    </h3>
                  </Link>
                  <span className="font-fredoka text-sm font-bold text-zinc-800 block">
                    {formatPrice(p.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
