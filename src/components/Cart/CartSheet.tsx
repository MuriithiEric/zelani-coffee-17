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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./CartItem";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KES_TO_USD = 0.0077;

const EAST_AFRICA = ["UG", "TZ", "RW", "ET"];

const COUNTRIES = [
  { code: "KE", name: "Kenya" },
  { code: "UG", name: "Uganda" },
  { code: "TZ", name: "Tanzania" },
  { code: "RW", name: "Rwanda" },
  { code: "ET", name: "Ethiopia" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "ZA", name: "South Africa" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "CH", name: "Switzerland" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "BR", name: "Brazil" },
  { code: "OTHER", name: "Other Country" },
];

function getShippingInfo(countryCode: string) {
  if (countryCode === "KE") {
    return { label: "Delivery within Kenya", cost: 500, currency: "KES" as const };
  }
  if (EAST_AFRICA.includes(countryCode)) {
    return { label: "Regional Shipping (East Africa)", cost: 2000, currency: "KES" as const };
  }
  return { label: "International Shipping via DHL Express", cost: 35, currency: "USD" as const };
}

function formatPrice(amount: number, currency: "KES" | "USD") {
  return `${currency} ${amount.toLocaleString(undefined, { minimumFractionDigits: currency === "USD" ? 2 : 0, maximumFractionDigits: 2 })}`;
}

export const CartSheet = ({ open, onOpenChange }: CartSheetProps) => {
  const { items, getCartTotal, clearCart } = useCart();
  const [country, setCountry] = useState<string>("");
  const [paypalRedirected, setPaypalRedirected] = useState(false);
  const navigate = useNavigate();

  const productTotalKES = getCartTotal();
  const shipping = country ? getShippingInfo(country) : null;
  const isInternational = shipping?.currency === "USD";

  const productSubtotal = isInternational
    ? Math.round(productTotalKES * KES_TO_USD * 100) / 100
    : productTotalKES;

  const shippingCost = shipping?.cost ?? 0;
  const orderTotal = productSubtotal + shippingCost;
  const displayCurrency: "KES" | "USD" = isInternational ? "USD" : "KES";

  const handlePayNow = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!country) {
      toast.error("Please select your country to continue");
      return;
    }

    // Save order to database
    const orderRef = `zelani_order_${Date.now()}`;
    try {
      const { error: orderError } = await supabase.from("orders").insert({
        order_reference: orderRef,
        total_amount: orderTotal,
        currency: displayCurrency,
        payment_status: "pending",
        customer_email: "muraypatrick@gmail.com",
      });

      if (!orderError) {
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
    } catch {
      // Non-blocking — order recording is best-effort
    }

    // Build PayPal standard purchase link
    const totalForPaypal = displayCurrency === "USD"
      ? orderTotal.toFixed(2)
      : Math.round(orderTotal).toString();

    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick` +
      `&business=muraypatrick@gmail.com` +
      `&amount=${totalForPaypal}` +
      `&currency_code=${displayCurrency}` +
      `&item_name=Zelani+Coffee+Order`;
    window.open(paypalUrl, "_blank");
    setPaypalRedirected(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
    onOpenChange(false);
    setPaypalRedirected(false);
    setCountry("");
    navigate("/thank-you");
  };

  if (items.length === 0 && !paypalRedirected) {
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

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}

          {/* Country selector */}
          <div className="pt-2">
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Shipping Country <span className="text-destructive">*</span>
            </label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="flex-col space-y-3 border-t border-border pt-4">
          {paypalRedirected ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                You've been redirected to PayPal to complete your payment.
                Once payment is confirmed, return here and click
                "I've Completed Payment" to receive your order confirmation.
              </p>
              <Button
                onClick={handlePaymentComplete}
                size="lg"
                className="w-full bg-gold-500 hover:bg-gold-600 text-coffee-900"
              >
                I've Completed Payment
              </Button>
            </div>
          ) : (
            <>
              {!country ? (
                <p className="text-sm text-muted-foreground text-center py-2">
                  Select your country to see shipping costs
                </p>
              ) : (
                <>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Products Subtotal</span>
                    <span className="text-foreground">
                      {formatPrice(productSubtotal, displayCurrency)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-muted-foreground">{shipping!.label}</span>
                      {isInternational && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Estimated 3–5 business days via DHL Express
                        </p>
                      )}
                    </div>
                    <span className="text-foreground">
                      {formatPrice(shippingCost, displayCurrency)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-gold-600">
                      {formatPrice(orderTotal, displayCurrency)}
                    </span>
                  </div>
                </>
              )}

              <Button
                onClick={handlePayNow}
                disabled={!country}
                size="lg"
                className="w-full bg-gold-500 hover:bg-gold-600 text-coffee-900"
              >
                {country
                  ? `Pay ${formatPrice(orderTotal, displayCurrency)}`
                  : "Proceed to Checkout"}
              </Button>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
