import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart, Coffee } from "lucide-react";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyNow = () => {
    setIsProcessing(true);
    
    // @ts-ignore - IntaSend is loaded via script tag
    const checkout = new window.IntaSend({
      publicAPIKey: "ISPubKey_test_732bfd7f-a0e1-4845-9a65-47d8385684eb",
      live: false
    });

    checkout
      .on("COMPLETE", (response: any) => {
        console.log("Payment completed:", response);
        window.location.href = "/thank-you";
      })
      .on("FAILED", (response: any) => {
        console.log("Payment failed:", response);
        setIsProcessing(false);
      })
      .on("IN-PROGRESS", () => {
        console.log("Payment in progress");
      });

    checkout.collect({
      amount: product.price,
      currency: "KES",
      api_ref: `zelani_${product.id}_${Date.now()}`,
      email: "",
      first_name: "",
      last_name: "",
      phone_number: ""
    });
  };

  return (
    <>
      <Card className="overflow-hidden hover-lift card-shadow border-0 bg-card">
        <div className="relative overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-playfair text-2xl font-semibold text-espresso-800">
              {product.name}
            </h3>
            <Coffee className="h-6 w-6 text-forest-600 flex-shrink-0 ml-2" />
          </div>
          
          <p className="text-espresso-600 mb-4 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-2 mb-4">
            <span className="text-xs px-3 py-1 bg-sand-200 text-espresso-700 rounded-full">
              {product.grind}
            </span>
            <span className="text-xs px-3 py-1 bg-forest-100 text-forest-800 rounded-full">
              {product.size}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-xs text-espresso-500 mb-2 font-medium">Tasting Notes:</p>
            <div className="flex flex-wrap gap-1">
              {product.tastingNotes.map((note, idx) => (
                <span key={idx} className="text-xs text-espresso-600 italic">
                  {note}{idx < product.tastingNotes.length - 1 ? " •" : ""}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-sand-300">
            <span className="font-playfair text-2xl font-bold text-espresso-800">
              KES {product.price.toLocaleString()}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="border-forest-600 text-forest-700 hover:bg-forest-50"
              >
                Learn More
              </Button>
              <Button
                size="sm"
                onClick={handleBuyNow}
                disabled={isProcessing}
                className="bg-forest-600 hover:bg-forest-700 text-sand-50"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {isProcessing ? "Processing..." : "Buy Now"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-playfair text-3xl text-espresso-800">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-base text-espresso-600 pt-2">
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
              <h4 className="font-semibold text-espresso-800 mb-2">Product Details</h4>
              <p className="text-espresso-600 leading-relaxed">{product.details}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-espresso-800 mb-2">Grind Type</h4>
                <p className="text-espresso-600">{product.grind}</p>
              </div>
              <div>
                <h4 className="font-semibold text-espresso-800 mb-2">Size</h4>
                <p className="text-espresso-600">{product.size}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-espresso-800 mb-2">Tasting Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note, idx) => (
                  <span key={idx} className="px-3 py-1 bg-sand-200 text-espresso-700 rounded-full text-sm">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="font-playfair text-3xl font-bold text-espresso-800">
                KES {product.price.toLocaleString()}
              </span>
              <Button
                onClick={handleBuyNow}
                disabled={isProcessing}
                size="lg"
                className="bg-forest-600 hover:bg-forest-700 text-sand-50"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isProcessing ? "Processing..." : "Buy Now"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
