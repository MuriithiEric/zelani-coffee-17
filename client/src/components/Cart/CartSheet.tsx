import { ShoppingCart, ArrowRight } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, getCartTotal } = useCart();
  const navigate = useNavigate();

  const productTotalKES = getCartTotal();

  const handleProceedToCheckout = () => {
    onOpenChange(false);
    navigate("/checkout");
  };

  const formatPrice = (amount: number) => {
    return `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  if (items.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#faf9f6]">
          <SheetHeader className="pb-4 border-b border-zinc-100">
            <SheetTitle className="font-fredoka text-xl font-bold text-zinc-900">
              Shopping Cart
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-[#2a221b]/5 p-6 rounded-full mb-4">
              <ShoppingCart className="h-12 w-12 text-zinc-400" />
            </div>
            <p className="text-lg font-bold text-zinc-800 mb-1">
              Your cart is empty
            </p>
            <p className="text-sm text-zinc-500 mb-6 max-w-xs">
              Add some delicious coffee beans or roast packs to get started!
            </p>
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full px-6"
            >
              Continue Shopping
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#faf9f6] p-0">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-zinc-100">
          <SheetHeader>
            <SheetTitle className="font-fredoka text-xl font-bold text-zinc-900 flex items-center gap-2">
              <span>Shopping Cart</span>
              <span className="bg-[#c89547]/10 text-[#b37e38] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {items.reduce((acc, curr) => acc + curr.quantity, 0)} items
              </span>
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Scrollable Items Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl p-3 border border-zinc-100 shadow-sm">
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* Footer Sums and Actions */}
        <div className="p-6 border-t border-zinc-100 bg-white space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500 font-medium">Subtotal</span>
            <span className="text-zinc-900 font-bold text-base">
              {formatPrice(productTotalKES)}
            </span>
          </div>

          <p className="text-[11px] text-zinc-400">
            Shipping costs, payment options, and membership discounts will be applied at the checkout.
          </p>

          <Separator />

          <SheetFooter className="flex-col gap-2 pt-1 sm:space-x-0 w-full">
            <Button
              onClick={handleProceedToCheckout}
              size="lg"
              className="w-full bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full py-6 font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="w-full text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 rounded-full"
            >
              Keep Shopping
            </Button>
          </SheetFooter>
        </div>

      </SheetContent>
    </Sheet>
  );
};
