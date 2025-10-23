import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart, Coffee, Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsModalOpen(false);
    setQuantity(1);
  };

  return (
    <>
      <Card className="overflow-hidden hover-lift coffee-shadow border-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-gold-500 text-coffee-900 px-3 py-1 rounded-full text-sm font-semibold">
            {product.grind}
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-playfair text-xl font-semibold text-coffee-800">
              {product.name}
            </h3>
            <Coffee className="h-5 w-5 text-gold-600 flex-shrink-0 ml-2" />
          </div>
          
          <p className="text-coffee-600 mb-3 text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>

          <div className="flex gap-2 mb-3">
            <span className="text-xs px-2 py-1 bg-cream-200 text-coffee-700 rounded-full">
              {product.size}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-xs text-coffee-500 mb-1 font-medium">Tasting Notes:</p>
            <div className="flex flex-wrap gap-1">
              {product.tastingNotes.map((note, idx) => (
                <span key={idx} className="text-xs text-coffee-600 italic">
                  {note}{idx < product.tastingNotes.length - 1 ? " •" : ""}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-cream-300">
            <div className="flex items-center justify-between">
              <span className="font-playfair text-2xl font-bold text-coffee-800">
                KES {product.price.toLocaleString()}
              </span>
            </div>
            
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 border-gold-600 text-gold-700 hover:bg-gold-50"
              >
                Learn More
              </Button>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-coffee-900 flex items-center justify-center gap-1.5 whitespace-nowrap px-2"
              >
                <ShoppingCart className="h-4 w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">Add to Cart</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-playfair text-3xl text-coffee-800">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-base text-coffee-600 pt-2">
              {product.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            
            <div>
              <h4 className="font-semibold text-coffee-800 mb-2">Product Details</h4>
              <p className="text-coffee-600 leading-relaxed">{product.details}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-coffee-800 mb-2">Grind Type</h4>
                <p className="text-coffee-600">{product.grind}</p>
              </div>
              <div>
                <h4 className="font-semibold text-coffee-800 mb-2">Size</h4>
                <p className="text-coffee-600">{product.size}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-coffee-800 mb-2">Tasting Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note, idx) => (
                  <span key={idx} className="px-3 py-1 bg-cream-200 text-coffee-700 rounded-full text-sm">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-gold-600">
                KES {product.price.toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-gold-500 hover:bg-gold-600 text-coffee-900"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add {quantity} to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
