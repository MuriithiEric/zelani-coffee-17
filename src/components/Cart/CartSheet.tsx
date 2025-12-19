import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);


  const handleCheckout = async () => {
    console.log("[IntaSend Debug] === CHECKOUT BUTTON CLICKED ===");
    console.log("[IntaSend Debug] Cart items:", items);
    console.log("[IntaSend Debug] Items count:", items.length);
    
    if (items.length === 0) {
      console.log("[IntaSend Debug] Cart is empty, aborting");
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    const total = getCartTotal();
    const orderRef = `zelani_order_${Date.now()}`;

    console.log("[IntaSend Debug] === INITIATING CHECKOUT API CALL ===");
    console.log("[IntaSend Debug] Total amount:", total);
    console.log("[IntaSend Debug] Order reference:", orderRef);

    try {
      // Call IntaSend Checkout API directly
      const payload = {
        public_key: "ISPubKey_test_732bfd7f-a0e1-4845-9a65-47d8385684eb",
        amount: total,
        currency: "KES",
        api_ref: orderRef,
        redirect_url: `${window.location.origin}/thank-you?order=${orderRef}`,
      };
      
      console.log("[IntaSend Debug] API payload:", payload);
      
      const response = await fetch("https://sandbox.intasend.com/api/v1/checkout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      console.log("[IntaSend Debug] API response status:", response.status);
      
      const data = await response.json();
      console.log("[IntaSend Debug] API response data:", data);
      
      if (data.url) {
        console.log("[IntaSend Debug] Redirecting to checkout URL:", data.url);
        
        // Store order in database before redirecting
        const orderData = {
          order_reference: orderRef,
          total_amount: total,
          currency: "KES",
          payment_status: "pending",
          intasend_tracking_id: data.id || null,
        };
        
        const { error: orderError } = await supabase
          .from("orders")
          .insert(orderData);

        if (orderError) {
          console.error("[IntaSend Debug] Order creation error:", orderError);
        } else {
          // Store order items
          const orderResult = await supabase
            .from("orders")
            .select("id")
            .eq("order_reference", orderRef)
            .single();
          
          if (orderResult.data) {
            const orderItems = items.map((item) => ({
              order_id: orderResult.data.id,
              product_id: item.product.id,
              product_name: item.product.name,
              quantity: item.quantity,
              unit_price: item.product.price,
              grind: item.product.grind,
              size: item.product.size,
            }));
            
            await supabase.from("order_items").insert(orderItems);
          }
        }
        
        // Clear cart and redirect to IntaSend checkout
        clearCart();
        window.location.href = data.url;
      } else {
        console.error("[IntaSend Debug] No checkout URL in response:", data);
        toast.error("Failed to create checkout session");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("[IntaSend Debug] API call error:", error);
      toast.error("Failed to initiate payment");
      setIsProcessing(false);
    }
  };

  const total = getCartTotal();

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Add some delicious coffee to get started!
            </p>
            <Button onClick={() => onOpenChange(false)}>Continue Shopping</Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({items.length} items)</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <SheetFooter className="flex-col space-y-4 border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-gold-600">
              KES {total.toLocaleString()}
            </span>
          </div>
          
          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            size="lg"
            className="w-full bg-gold-500 hover:bg-gold-600 text-coffee-900"
          >
            {isProcessing ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
