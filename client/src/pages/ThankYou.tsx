import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Home, MessageCircle, ShoppingBag, Truck, Clipboard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderRef = searchParams.get("ref") || `zelani_order_${Date.now()}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderRef);
    setCopied(true);
    toast.success("Order reference copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center py-16 px-4 text-zinc-800">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-[#fefaf0] border border-[#c89547]/30 rounded-full mb-8 animate-scale-in">
          <CheckCircle className="h-12 w-12 text-[#b37e38]" />
        </div>
        
        <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-lg text-zinc-650 mb-8 leading-relaxed">
          Your payment has been processed successfully. We're excited to roast and pack your premium coffee beans!
        </p>

        {/* Order Reference Box */}
        <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm mb-6 flex flex-col items-center justify-center gap-3">
          <p className="text-xs uppercase tracking-widest font-bold text-zinc-400">Order Reference</p>
          <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-5 py-2">
            <span className="font-mono text-sm sm:text-base font-semibold text-zinc-800">{orderRef}</span>
            <button 
              onClick={handleCopy} 
              className="text-zinc-450 hover:text-zinc-700 transition-colors shrink-0 ml-1.5"
              title="Copy Reference"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Clipboard className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="font-fredoka font-bold text-zinc-900 text-lg mb-4">What's Next?</h2>
          <ul className="text-left text-zinc-600 space-y-3 font-medium text-sm">
            <li className="flex items-start">
              <span className="text-[#b37e38] mr-2">✓</span>
              You will receive an email confirmation with invoice details shortly.
            </li>
            <li className="flex items-start">
              <span className="text-[#b37e38] mr-2">✓</span>
              We will freshly prepare and package your coffee order within 1-2 business days.
            </li>
            <li className="flex items-start">
              <span className="text-[#b37e38] mr-2">✓</span>
              You can track your order status in real time on our shipment tracking system.
            </li>
          </ul>
        </div>

        {/* Track Your Order Section */}
        <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm p-8 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#fefaf0] border border-[#c89547]/20 rounded-full mb-4">
            <Truck className="h-6 w-6 text-[#b37e38]" />
          </div>
          <h2 className="font-fredoka font-bold text-zinc-900 text-lg mb-2">Track Your Order</h2>
          <p className="text-zinc-550 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Use your order reference to follow the processing, roasting, packaging, and delivery phases of your shipment.
          </p>
          <Button
            onClick={() => navigate(`/track?ref=${orderRef}`)}
            size="lg"
            className="bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full px-8"
          >
            <Truck className="mr-2 h-5 w-5" />
            Track My Order Status
          </Button>
        </div>

        <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="font-fredoka font-bold text-zinc-900 text-lg mb-2">Love Your Coffee?</h2>
          <p className="text-zinc-550 text-sm mb-6">
            We'd love to hear from you! Order more of your favorites or reach out to us on WhatsApp for custom requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/products")}
              size="lg"
              className="bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full px-8"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Again
            </Button>
            <Button
              onClick={() => window.open("https://wa.me/254777405410", "_blank")}
              variant="outline"
              size="lg"
              className="border-zinc-300 text-zinc-700 hover:bg-zinc-50 rounded-full px-8"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact on WhatsApp
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            variant="outline"
            className="border-zinc-300 text-zinc-700 rounded-full px-8"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </div>

        <p className="mt-12 text-xs text-zinc-400">
          Questions about your order? Contact us at{" "}
          <a href="mailto:info@zelanicoffee.com" className="text-[#b37e38] hover:underline font-semibold">
            info@zelanicoffee.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
