import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { api } from "@/lib/api/api-client";
import { toast } from "sonner";
import { CreditCard, ShieldCheck, Tag, Info, AlertCircle, Sparkles, Smartphone, Check } from "lucide-react";

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

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();
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

  // Sign In / Registration Discount
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(api.isAuthenticated());

  // Payment Selection: 'card' | 'paypal' | 'mpesa'
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "mpesa">("card");

  // Card payment details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // M-Pesa phone number
  const [mpesaPhone, setMpesaPhone] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "sending" | "waiting" | "success">("idle");

  // Pricing calculations
  const productTotalKES = getCartTotal();
  const shipping = getShippingInfo(country);
  const isInternational = shipping.currency === "USD";

  const productSubtotal = isInternational
    ? Math.round(productTotalKES * KES_TO_USD * 100) / 100
    : productTotalKES;

  // Apply 10% discount if logged in
  const discountRate = isUserLoggedIn ? 0.10 : 0.0;
  const discountAmount = productSubtotal * discountRate;
  const shippingCost = shipping.cost;
  const orderTotal = productSubtotal - discountAmount + shippingCost;
  const displayCurrency: "KES" | "USD" = isInternational ? "USD" : "KES";

  const formatPrice = (amount: number) => {
    return `${displayCurrency} ${amount.toLocaleString(undefined, {
      minimumFractionDigits: displayCurrency === "USD" ? 2 : 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !fullName || !phone || !streetAddress || !city || !postalCode) {
      toast.error("Please fill in all shipping details");
      return;
    }

    if (paymentMethod === "card") {
      if (cardNumber.length < 16 || !cardExpiry || cardCvv.length < 3) {
        toast.error("Please fill in valid card details");
        return;
      }
    }

    if (paymentMethod === "mpesa") {
      if (!mpesaPhone) {
        toast.error("Please enter a valid M-Pesa phone number");
        return;
      }
    }

    setIsProcessing(true);

    if (paymentMethod === "mpesa") {
      setMpesaStatus("sending");
      toast.info("Sending M-Pesa STK Push prompt to your phone...");
      
      // Simulate STK Push prompt
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setMpesaStatus("waiting");
      toast.info("Waiting for customer to enter M-Pesa PIN on their phone...");

      // Simulate PIN input and confirmation
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setMpesaStatus("success");
      toast.success("M-Pesa payment received successfully!");
    } else {
      // Simulate Card or PayPal processing
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success("Payment completed successfully!");
    }

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

      // Also create payment record via simulated gateway initiation
      await api.payments.initiate({
        orderId: (createdOrder as any).id,
        paymentMethod: paymentMethod,
        amount: orderTotal,
        currency: displayCurrency,
        phoneNumber: phone || undefined,
      });

      setIsProcessing(false);
      clearCart();
      navigate(`/thank-you?ref=${orderRef}`);
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
              
              {/* Promo Sign-in Banner */}
              <div className={`border rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all ${
                isUserLoggedIn 
                  ? "bg-amber-50/50 border-amber-200/60" 
                  : "bg-[#2a221b]/5 border-zinc-200"
              }`}>
                <div className="bg-[#dfc5a3]/20 p-3 rounded-full shrink-0">
                  <Sparkles className="h-6 w-6 text-[#b37e38]" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-zinc-900 text-base">
                    {isUserLoggedIn ? "10% Discount Applied! 🎉" : "Sign in / Register for 10% Off!"}
                  </p>
                  <p className="text-zinc-650 text-sm">
                    {isUserLoggedIn 
                      ? "Thank you for being a registered member of Zelani Coffee. Your membership discount has been applied." 
                      : "Create or log into your account to claim a 10% discount on all checkout items."}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                    isUserLoggedIn 
                      ? "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                      : "bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950"
                  }`}
                >
                  {isUserLoggedIn ? "Switch to Guest" : "Simulate Sign-in"}
                </Button>
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
                    Select your preferred secure payment option
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all gap-1.5 ${
                      paymentMethod === "card"
                        ? "border-[#c89547] bg-[#fefaf0] text-[#b37e38]"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    <CreditCard className="h-6 w-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all gap-1.5 ${
                      paymentMethod === "paypal"
                        ? "border-[#c89547] bg-[#fefaf0] text-[#b37e38]"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    <span className="font-playfair italic font-extrabold text-lg leading-none">PayPal</span>
                    <span className="text-xs font-bold uppercase tracking-wider">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all gap-1.5 ${
                      paymentMethod === "mpesa"
                        ? "border-[#c89547] bg-[#fefaf0] text-[#b37e38]"
                        : "border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">M-Pesa</span>
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 p-4 bg-zinc-50 rounded-xl border border-zinc-150 animate-scale-in">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                        Card Number
                      </label>
                      <Input
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        maxLength={16}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                        className="bg-white rounded-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                          Expiry Date
                        </label>
                        <Input
                          placeholder="MM/YY"
                          value={cardExpiry}
                          maxLength={5}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-white rounded-full"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                          CVV / CVC
                        </label>
                        <Input
                          placeholder="123"
                          type="password"
                          value={cardCvv}
                          maxLength={4}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          className="bg-white rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Instructions */}
                {paymentMethod === "paypal" && (
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-150 space-y-2 animate-scale-in">
                    <div className="flex items-start gap-2.5">
                      <Info className="h-5 w-5 text-[#b37e38] shrink-0 mt-0.5" />
                      <p className="text-sm text-zinc-650">
                        After clicking "Place Order", you will be redirected to PayPal's secure portal to complete checkout. Once done, you'll be redirected back to Zelani Coffee.
                      </p>
                    </div>
                  </div>
                )}

                {/* M-Pesa Phone Field */}
                {paymentMethod === "mpesa" && (
                  <div className="space-y-4 p-4 bg-zinc-50 rounded-xl border border-zinc-150 animate-scale-in">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                        M-Pesa Mobile Number
                      </label>
                      <Input
                        required={paymentMethod === "mpesa"}
                        placeholder="e.g. 254712345678"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value.replace(/\D/g, ""))}
                        className="bg-white rounded-full"
                      />
                      <p className="text-xs text-zinc-500 pl-1">
                        Use international format without the "+" symbol (e.g. 254700000000).
                      </p>
                    </div>

                    {mpesaStatus !== "idle" && (
                      <div className="border border-[#c89547]/30 bg-amber-50/40 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          {mpesaStatus === "success" ? (
                            <div className="bg-green-150 p-1.5 rounded-full">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <span className="h-5 w-5 border-2 border-[#b37e38]/30 border-t-[#b37e38] rounded-full animate-spin" />
                          )}
                          <p className="text-sm font-semibold text-zinc-800">
                            {mpesaStatus === "sending" && "Initializing STK Push prompt..."}
                            {mpesaStatus === "waiting" && "Waiting for M-Pesa PIN input..."}
                            {mpesaStatus === "success" && "M-Pesa confirmation received!"}
                          </p>
                        </div>
                        <p className="text-xs text-zinc-650">
                          {mpesaStatus === "sending" && "We are requesting a payment checkout prompt for your mobile number."}
                          {mpesaStatus === "waiting" && "Please check your phone screen for the prompt asking you to enter your M-Pesa PIN to authorize this transaction."}
                        </p>
                      </div>
                    )}
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
                        {formatPrice(
                          (isInternational
                            ? Math.round(item.product.price * KES_TO_USD * 100) / 100
                            : item.product.price) * item.quantity
                        )}
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
                  className="w-full bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full py-6 font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Checkout...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Place Order & Pay
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
