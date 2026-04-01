import { CheckCircle, Home, MessageCircle, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gold-500 rounded-full mb-8 animate-scale-in">
          <CheckCircle className="h-12 w-12 text-coffee-900" />
        </div>
        
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-900 mb-4">
          Thank You for Your Order!
        </h1>
        
        <p className="text-xl text-coffee-700 mb-8 leading-relaxed">
          Your payment has been processed successfully. We're excited to get your 
          Zelani Coffee on its way to you!
        </p>
        
        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <h2 className="font-semibold text-coffee-800 text-lg mb-4">What's Next?</h2>
          <ul className="text-left text-coffee-600 space-y-3">
            <li className="flex items-start">
              <span className="text-gold-600 mr-2">✓</span>
              You'll receive an email confirmation with your order details
            </li>
            <li className="flex items-start">
              <span className="text-gold-600 mr-2">✓</span>
              We'll prepare your fresh coffee and ship it within 1-2 business days
            </li>
            <li className="flex items-start">
              <span className="text-gold-600 mr-2">✓</span>
              Expect delivery within 3-5 business days in Kenya
            </li>
          </ul>
        </div>

        {/* Track Your Order Section */}
        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-100 rounded-full mb-4">
            <Truck className="h-6 w-6 text-gold-700" />
          </div>
          <h2 className="font-semibold text-coffee-800 text-lg mb-4">Track Your Order</h2>
          <p className="text-coffee-600 mb-6">
            Once your order is dispatched, you will receive a DHL waybill number via email. 
            Use it on our tracking page to follow your shipment in real time.
          </p>
          <Button
            onClick={() => navigate("/track")}
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-coffee-900"
          >
            <Truck className="mr-2 h-5 w-5" />
            Track My Shipment
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
          <h2 className="font-semibold text-coffee-800 text-lg mb-4">Love Your Coffee?</h2>
          <p className="text-coffee-600 mb-6">
            We'd love to hear from you! Order more of your favorites or reach out to us on WhatsApp for special requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/#products")}
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-coffee-900"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Again
            </Button>
            <Button
              onClick={() => window.open("https://wa.me/254777405410", "_blank")}
              variant="outline"
              size="lg"
              className="border-coffee-600 text-coffee-800 hover:bg-coffee-50"
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
            className="border-coffee-600 text-coffee-800"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
        </div>

        <p className="mt-12 text-sm text-coffee-500">
          Questions about your order? Contact us at{" "}
          <a href="mailto:info@zelanicoffee.com" className="text-gold-600 hover:underline">
            info@zelanicoffee.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
