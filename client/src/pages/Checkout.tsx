import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/contexts/CurrencyContext";
import { api } from "@/lib/api/api-client";
import { toast } from "sonner";
import { ShieldCheck, Tag, Info, Sparkles, MessageCircle, Check } from "lucide-react";

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
];

function getShippingInfo(countryCode: string) {
  if (countryCode === "KE") {
    return { label: "Delivery within Kenya", cost: 5.00 };
  }
  if (EAST_AFRICA.includes(countryCode)) {
    return { label: "Regional Shipping (East Africa)", cost: 15.00 };
  }
  return { label: "International Shipping via DHL Express", cost: 35.00 };
}

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();
  const { currency, formatPrice } = useCurrency();
  const navigate = useNavigate();

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Add products before checking out.");
      navigate("/");
    }
  }, [items, navigate]);

  // Form State
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("KE");

  // Real User Authentication State
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(api.isAuthenticated());
  const [currentUser, setCurrentUser] = useState<any>(api.getSessionUser());

  useEffect(() => {
    const syncAuth = () => {
      const isAuth = api.isAuthenticated();
      const user = api.getSessionUser();
      setIsUserLoggedIn(isAuth);
      setCurrentUser(user);

      if (user) {
        if (!email && user.email) {
          setEmail(user.email);
        }
        if (!fullName) {
          const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
          if (name) {
            setFullName(name);
          }
        }
      }
    };

    syncAuth();
    window.addEventListener("zelani-auth-change", syncAuth);
    return () => window.removeEventListener("zelani-auth-change", syncAuth);
  }, []);

  // Payment Selection: 'paypal' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "whatsapp">("paypal");
  const [isProcessing, setIsProcessing] = useState(false);

  // Pricing calculations (all product prices in cart are base USD values)
  const productSubtotal = getCartTotal();
  const shipping = getShippingInfo(country);
  const shippingCost = shipping.cost;

  // Apply 10% discount if logged in
  const discountRate = isUserLoggedIn ? 0.10 : 0.0;
  const discountAmount = productSubtotal * discountRate;
  const orderTotal = productSubtotal - discountAmount + shippingCost;
  const displayCurrency = currency;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !fullName || !phone || !streetAddress || !city || !postalCode) {
      toast.error("Please fill in all shipping details");
      return;
    }

    setIsProcessing(true);
    const orderRef = `zelani_order_${Date.now()}`;

    // Insert order to database
    try {
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.product.price,
        grind: item.product.grind || null,
        size: item.product.size || null,
      }));

      const createdOrder = await api.orders.create({
        orderReference: orderRef,
        totalAmount: orderTotal,
        currency: displayCurrency,
        paymentStatus: "pending",
        customerEmail: email,
        customerPhone: phone,
        items: orderItems,
      });

      // Initiate payment record in database
      await api.payments.initiate({
        orderId: (createdOrder as any).id,
        paymentMethod: paymentMethod,
        amount: orderTotal,
        currency: displayCurrency,
        phoneNumber: phone || undefined,
      });

      clearCart();

      if (paymentMethod === "paypal") {
        toast.info("Order placed! Redirecting to PayPal to pay muraypatrick@gmail.com...");
        const paypalAmount = (currency === "GBP" ? orderTotal * 0.78 : orderTotal).toFixed(2);
        const paypalCurrency = currency;
        const returnUrl = `${window.location.origin}/thank-you?ref=${orderRef}`;
        const cancelUrl = window.location.href;
        const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=muraypatrick@gmail.com&item_name=${encodeURIComponent(`Zelani Coffee Order ${orderRef}`)}&amount=${paypalAmount}&currency_code=${paypalCurrency}&return=${encodeURIComponent(returnUrl)}&cancel_return=${encodeURIComponent(cancelUrl)}`;

        setTimeout(() => {
          window.location.href = paypalUrl;
        }, 1000);
      } else {
        // WhatsApp order
        toast.success("Order placed! Opening WhatsApp to complete your order...");
        const countryName = COUNTRIES.find((c) => c.code === country)?.name || country;
        const itemsList = items
          .map((i) => `• ${i.quantity}x ${i.product.name} (${i.product.size || "Standard"}, ${i.product.grind || "Whole Bean"}) - ${formatPrice(i.product.price * i.quantity)}`)
          .join("\n");

        const msgLines = [
          `*New Zelani Coffee Order* ☕`,
          `*Order Reference:* ${orderRef}`,
          ``,
          `*Customer Details:*`,
          `• Name: ${fullName}`,
          `• Phone: ${phone}`,
          `• Email: ${email}`,
          `• Delivery Address: ${streetAddress}, ${city}, ${postalCode}, ${countryName}`,
          ``,
          `*Order Items:*`,
          itemsList,
          ``,
          `*Total Amount:* ${formatPrice(orderTotal)}`,
          ``,
          `Please confirm my order and send payment instructions. Thank you!`
        ];

        const waText = encodeURIComponent(msgLines.join("\n"));
        const waUrl = `https://wa.me/254777405410?text=${waText}`;

        setTimeout(() => {
          window.open(waUrl, "_blank");
          navigate(`/thank-you?ref=${orderRef}`);
        }, 800);
      }
    } catch (err: any) {
      console.error("Error saving order & payment: ", err);
      toast.error(err.message || "Failed to save order or process payment.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-800">
      <Navigation />

      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-zinc-900 mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Checkout Form and Payment */}
            <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-6">
              
              {/* Promo Sign-in / Member Discount Banner */}
              <div className={`border rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all ${
                isUserLoggedIn 
                  ? "bg-amber-50/70 border-amber-200" 
                  : "bg-[#2a221b]/5 border-zinc-200"
              }`}>
                <div className="bg-[#dfc5a3]/20 p-3 rounded-full shrink-0">
                  <Sparkles className="h-6 w-6 text-[#b37e38]" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-zinc-900 text-base flex items-center gap-2">
                    {isUserLoggedIn ? (
                      <>
                        10% Member Discount Applied! <Check className="h-4 w-4 text-green-600 inline shrink-0" />
                      </>
                    ) : (
                      "Sign In or Register for 10% Off!"
                    )}
                  </p>
                  <p className="text-zinc-600 text-sm">
                    {isUserLoggedIn ? (
                      <>
                        Welcome back{currentUser?.firstName ? `, ${currentUser.firstName}` : ""}. Your 10% membership discount has been automatically applied to this order.
                      </>
                    ) : (
                      "Create an account or sign in to claim an instant 10% discount on all items in your order."
                    )}
                  </p>
                </div>
                {!isUserLoggedIn && (
                  <Button
                    type="button"
                    onClick={() => navigate("/register?redirect=/checkout")}
                    className="rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shrink-0 transition-all bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950 shadow-sm flex items-center gap-1.5"
                  >
                    Sign In / Register
                  </Button>
                )}
              </div>

              {/* Shipping Details */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm space-y-4">
                <h3 className="font-fredoka text-xl font-bold text-zinc-900 mb-2">
                  Shipping Address Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                      Full Name
                    </label>
                    <Input
                      required
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-full h-11 border-zinc-200 focus:border-zinc-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                      Email Address
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-full h-11 border-zinc-200 focus:border-zinc-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                      Phone Number
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="+254 712 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-full h-11 border-zinc-200 focus:border-zinc-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                      Shipping Country
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-4 h-11 text-sm text-zinc-800 outline-none focus:bg-white focus:border-zinc-400 transition-all"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                    Street Address
                  </label>
                  <Input
                    required
                    placeholder="123 Coffee Lane, Suite A"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="rounded-full h-11 border-zinc-200 focus:border-zinc-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                      City
                    </label>
                    <Input
                      required
                      placeholder="Nairobi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-full h-11 border-zinc-200 focus:border-zinc-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                      Postal / ZIP Code
                    </label>
                    <Input
                      required
                      placeholder="00100"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="rounded-full h-11 border-zinc-200 focus:border-zinc-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm space-y-6">
                <div>
                  <h3 className="font-fredoka text-xl font-bold text-zinc-900">
                    Payment Method
                  </h3>
                  <p className="text-zinc-500 text-xs mt-1">
                    Select your preferred payment option
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all gap-2 ${
                      paymentMethod === "paypal"
                        ? "border-[#c89547] bg-[#fefaf0] text-[#b37e38] shadow-sm"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    <span className="font-playfair italic font-extrabold text-2xl leading-none text-[#003087]">
                      PayPal
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Order by PayPal
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("whatsapp")}
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all gap-2 ${
                      paymentMethod === "whatsapp"
                        ? "border-[#25D366] bg-[#f0fdf4] text-green-700 shadow-sm"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    <MessageCircle className="h-7 w-7 text-[#25D366]" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Order via WhatsApp
                    </span>
                  </button>
                </div>

                {/* PayPal Instructions */}
                {paymentMethod === "paypal" && (
                  <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-3 animate-scale-in text-left">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-[#b37e38] shrink-0 mt-0.5" />
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-zinc-900">
                          PayPal Direct Payment to <span className="font-mono text-[#b37e38] font-bold">muraypatrick@gmail.com</span>
                        </p>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          When you click <strong>Place Order & Pay with PayPal</strong>, you will be redirected to PayPal's secure portal to pay directly to <span className="font-mono font-semibold text-zinc-800">muraypatrick@gmail.com</span>. Once payment completes, a <strong>DHL Express shipment & courier pickup</strong> will be automatically booked with real-time tracking.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-600 gap-1">
                      <span>Total to pay via PayPal:</span>
                      <span className="font-bold text-zinc-900 text-sm">
                        {formatPrice(orderTotal)}
                      </span>
                    </div>
                  </div>
                )}

                {/* WhatsApp Instructions */}
                {paymentMethod === "whatsapp" && (
                  <div className="p-5 bg-green-50/60 rounded-2xl border border-green-200/80 space-y-3 animate-scale-in text-left">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-1.5 rounded-full text-green-700 shrink-0 mt-0.5">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-zinc-900">
                          Direct WhatsApp Order with <span className="font-mono text-green-700 font-bold">+254 777 405 410</span>
                        </p>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          Clicking <strong>Place Order via WhatsApp</strong> will open WhatsApp directly with our team on <strong className="font-mono text-zinc-800">+254 777 405 410</strong>. Your order reference, items, and delivery address will be pre-filled automatically for immediate dispatch and payment confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Right side: Order Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-zinc-150 shadow-sm space-y-6 sticky top-28">
                <h3 className="font-fredoka text-xl font-bold text-zinc-900 pb-2 border-b border-zinc-100">
                  Order Summary
                </h3>

                {/* Items list */}
                <div className="space-y-4 max-h-[30vh] overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-start gap-4 text-sm">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-zinc-900">{item.product.name}</p>
                        <p className="text-xs text-zinc-500">
                          Size: {item.product.size} • Grind: {item.product.grind}
                        </p>
                        <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="font-medium">{formatPrice(productSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-lg">
                      <span className="flex items-center gap-1.5">
                        <Tag className="h-4 w-4" />
                        10% Membership Off
                      </span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <div className="space-y-0.5">
                      <span className="text-zinc-500">Shipping</span>
                      <p className="text-[10px] text-zinc-400">{shipping.label}</p>
                    </div>
                    <span className="font-medium">{formatPrice(shippingCost)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-zinc-900">Total</span>
                    <span className="text-2xl font-extrabold text-[#c89547]">
                      {formatPrice(orderTotal)}
                    </span>
                  </div>
                </div>

                {/* Order trigger */}
                <Button
                  onClick={handleCheckoutSubmit}
                  disabled={isProcessing}
                  size="lg"
                  className={`w-full text-white rounded-full py-6 font-semibold shadow-md transition-all flex items-center justify-center gap-2 ${
                    paymentMethod === "whatsapp"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-[#c89547] hover:bg-[#b37e38]"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {paymentMethod === "paypal" ? "Connecting to PayPal..." : "Preparing WhatsApp Order..."}
                    </>
                  ) : (
                    <>
                      {paymentMethod === "whatsapp" ? (
                        <>
                          <MessageCircle className="h-5 w-5" />
                          Place Order via WhatsApp
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-5 w-5" />
                          Place Order & Pay with PayPal
                        </>
                      )}
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-zinc-550 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                  Secure SSL checkout processed with Zelani systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
