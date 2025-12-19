import { useEffect, useState, useRef, useCallback } from "react";
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
  const intasendRef = useRef<any>(null);

  const handlePaymentComplete = useCallback(async (response: any) => {
    console.log("Payment completed:", response);
    
    try {
      const orderRef = `zelani_order_${Date.now()}`;
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_reference: orderRef,
          total_amount: getCartTotal(),
          currency: "KES",
          payment_status: "completed",
          intasend_tracking_id: response.tracking_id,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        grind: item.product.grind,
        size: item.product.size,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      setIsProcessing(false);
      window.location.href = `/thank-you?order=${orderRef}`;
    } catch (error) {
      console.error("Error storing order:", error);
      toast.error("Payment successful but order storage failed");
      setIsProcessing(false);
    }
  }, [items, getCartTotal, clearCart]);

  // Initialize IntaSend SDK
  useEffect(() => {
    if (typeof window.IntaSend !== "undefined" && !intasendRef.current) {
      intasendRef.current = new window.IntaSend({
        publicAPIKey: "ISPubKey_test_732bfd7f-a0e1-4845-9a65-47d8385684eb",
        live: false,
      });

      intasendRef.current
        .on("COMPLETE", handlePaymentComplete)
        .on("FAILED", (error: any) => {
          console.error("Payment failed:", error);
          toast.error("Payment failed. Please try again.");
          setIsProcessing(false);
        })
        .on("IN-PROGRESS", () => {
          console.log("Payment in progress");
        });
    }
  }, [handlePaymentComplete]);

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!window.IntaSend) {
      toast.error("Payment system is not available. Please refresh the page.");
      return;
    }

    if (!intasendRef.current) {
      intasendRef.current = new window.IntaSend({
        publicAPIKey: "ISPubKey_test_732bfd7f-a0e1-4845-9a65-47d8385684eb",
        live: false,
      });

      intasendRef.current
        .on("COMPLETE", handlePaymentComplete)
        .on("FAILED", (error: any) => {
          console.error("Payment failed:", error);
          toast.error("Payment failed. Please try again.");
          setIsProcessing(false);
        })
        .on("IN-PROGRESS", () => {
          console.log("Payment in progress");
        });
    }

    setIsProcessing(true);
    const total = getCartTotal();
    const orderRef = `zelani_order_${Date.now()}`;

    // Use programmatic checkout
    intasendRef.current.checkout({
      amount: total,
      currency: "KES",
      api_ref: orderRef,
    });
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
