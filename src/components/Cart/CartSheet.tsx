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
    console.log("[IntaSend Debug] === PAYMENT COMPLETE EVENT ===");
    console.log("[IntaSend Debug] Full response:", JSON.stringify(response, null, 2));
    console.log("[IntaSend Debug] Tracking ID:", response?.tracking_id);
    console.log("[IntaSend Debug] State:", response?.state);
    
    try {
      const orderRef = `zelani_order_${Date.now()}`;
      console.log("[IntaSend Debug] Creating order with reference:", orderRef);
      
      const orderData = {
        order_reference: orderRef,
        total_amount: getCartTotal(),
        currency: "KES",
        payment_status: "completed",
        intasend_tracking_id: response.tracking_id,
      };
      console.log("[IntaSend Debug] Order data:", orderData);
      
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error("[IntaSend Debug] Order creation error:", orderError);
        throw orderError;
      }
      
      console.log("[IntaSend Debug] Order created successfully:", order);

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
        grind: item.product.grind,
        size: item.product.size,
      }));
      
      console.log("[IntaSend Debug] Order items to insert:", orderItems);

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("[IntaSend Debug] Order items error:", itemsError);
        throw itemsError;
      }
      
      console.log("[IntaSend Debug] Order items inserted successfully");

      clearCart();
      setIsProcessing(false);
      console.log("[IntaSend Debug] Redirecting to thank you page...");
      window.location.href = `/thank-you?order=${orderRef}`;
    } catch (error) {
      console.error("[IntaSend Debug] Error storing order:", error);
      toast.error("Payment successful but order storage failed");
      setIsProcessing(false);
    }
  }, [items, getCartTotal, clearCart]);

  // Initialize IntaSend SDK
  useEffect(() => {
    console.log("[IntaSend Debug] === COMPONENT MOUNTED ===");
    console.log("[IntaSend Debug] window.IntaSend available:", typeof window.IntaSend !== "undefined");
    console.log("[IntaSend Debug] intasendRef.current:", intasendRef.current);
    
    if (typeof window.IntaSend !== "undefined" && !intasendRef.current) {
      console.log("[IntaSend Debug] Initializing IntaSend SDK...");
      
      const config = {
        publicAPIKey: "ISPubKey_test_732bfd7f-a0e1-4845-9a65-47d8385684eb",
        live: false,
      };
      console.log("[IntaSend Debug] SDK config:", config);
      
      intasendRef.current = new window.IntaSend(config);
      console.log("[IntaSend Debug] SDK instance created:", intasendRef.current);

      console.log("[IntaSend Debug] Registering event handlers...");
      intasendRef.current
        .on("COMPLETE", (response: any) => {
          console.log("[IntaSend Debug] COMPLETE event received");
          handlePaymentComplete(response);
        })
        .on("FAILED", (error: any) => {
          console.error("[IntaSend Debug] === PAYMENT FAILED EVENT ===");
          console.error("[IntaSend Debug] Error details:", JSON.stringify(error, null, 2));
          toast.error("Payment failed. Please try again.");
          setIsProcessing(false);
        })
        .on("IN-PROGRESS", (data: any) => {
          console.log("[IntaSend Debug] === PAYMENT IN-PROGRESS EVENT ===");
          console.log("[IntaSend Debug] Progress data:", data);
        });
      
      console.log("[IntaSend Debug] Event handlers registered successfully");
    } else if (typeof window.IntaSend === "undefined") {
      console.warn("[IntaSend Debug] IntaSend SDK not loaded on page!");
    }
  }, [handlePaymentComplete]);

  const handleCheckout = () => {
    console.log("[IntaSend Debug] === CHECKOUT BUTTON CLICKED ===");
    console.log("[IntaSend Debug] Cart items:", items);
    console.log("[IntaSend Debug] Items count:", items.length);
    
    if (items.length === 0) {
      console.log("[IntaSend Debug] Cart is empty, aborting");
      toast.error("Your cart is empty");
      return;
    }

    console.log("[IntaSend Debug] Checking IntaSend availability...");
    console.log("[IntaSend Debug] window.IntaSend:", typeof window.IntaSend);
    console.log("[IntaSend Debug] intasendRef.current:", intasendRef.current);

    if (!window.IntaSend) {
      console.error("[IntaSend Debug] IntaSend not available on window!");
      toast.error("Payment system is not available. Please refresh the page.");
      return;
    }

    if (!intasendRef.current) {
      console.log("[IntaSend Debug] Re-initializing IntaSend SDK...");
      const config = {
        publicAPIKey: "ISPubKey_test_732bfd7f-a0e1-4845-9a65-47d8385684eb",
        live: false,
      };
      
      intasendRef.current = new window.IntaSend(config);
      console.log("[IntaSend Debug] SDK re-initialized:", intasendRef.current);

      intasendRef.current
        .on("COMPLETE", (response: any) => {
          console.log("[IntaSend Debug] COMPLETE event (re-init handler)");
          handlePaymentComplete(response);
        })
        .on("FAILED", (error: any) => {
          console.error("[IntaSend Debug] FAILED event (re-init handler):", error);
          toast.error("Payment failed. Please try again.");
          setIsProcessing(false);
        })
        .on("IN-PROGRESS", (data: any) => {
          console.log("[IntaSend Debug] IN-PROGRESS event (re-init handler):", data);
        });
    }

    setIsProcessing(true);
    const total = getCartTotal();
    const orderRef = `zelani_order_${Date.now()}`;

    const checkoutConfig = {
      amount: total,
      currency: "KES",
      api_ref: orderRef,
    };
    
    console.log("[IntaSend Debug] === INITIATING CHECKOUT ===");
    console.log("[IntaSend Debug] Checkout config:", checkoutConfig);
    console.log("[IntaSend Debug] Total amount:", total);
    console.log("[IntaSend Debug] Order reference:", orderRef);

    try {
      console.log("[IntaSend Debug] Calling intasendRef.current.checkout()...");
      intasendRef.current.checkout(checkoutConfig);
      console.log("[IntaSend Debug] checkout() called successfully - waiting for payment modal");
    } catch (error) {
      console.error("[IntaSend Debug] checkout() threw an error:", error);
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
