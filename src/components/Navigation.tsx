import { useState, useEffect } from "react";
import { Menu, X, Phone, UserPlus } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/Cart/CartButton";
import { CartSheet } from "@/components/Cart/CartSheet";
import { useCurrency } from "@/contexts/CurrencyContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Products", href: "/products" },
    { label: "Our Speciality", href: "/#speciality" },
    { label: "Find Us", href: "/#find-us" },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    if (item.href.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate(item.href);
      } else {
        const id = item.href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(item.href);
    }
  };

  const isHomePage = location.pathname === "/";
  const showSolidNav = scrolled || !isHomePage;

  return (
    <nav className={`fixed top-0 w-full z-50 py-3 transition-all duration-350 ${
      showSolidNav 
        ? "bg-white/95 backdrop-blur-md shadow-md border-b border-zinc-200/45" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Zelani Coffee */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="/lovable-uploads/zelani-logo.jpeg"
              alt="Zelani Coffee Logo"
              className="h-11 w-11 object-contain rounded-full transition-transform duration-300 hover:scale-105"
            />
            <span className={`font-fredoka text-xl font-bold tracking-wide transition-colors duration-300 ${
              showSolidNav ? "text-zinc-900" : "text-white"
            }`}>
              Zelani Coffee
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`transition-colors duration-200 font-medium text-sm tracking-wide ${
                    showSolidNav 
                      ? "text-zinc-700 hover:text-zinc-950" 
                      : "text-zinc-200 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Currency Switcher */}
              <div className={`flex items-center space-x-1 border rounded-full p-1 transition-all ${
                showSolidNav 
                  ? "border-zinc-300 bg-white/70 backdrop-blur-sm shadow-sm" 
                  : "border-zinc-750 bg-black/40 backdrop-blur-sm"
              }`}>
                <button
                  onClick={() => setCurrency("GBP")}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    currency === "GBP" 
                      ? (showSolidNav ? "bg-zinc-950 text-white shadow-sm" : "bg-[#dfc5a3] text-zinc-955") 
                      : (showSolidNav ? "text-zinc-500 hover:text-zinc-800" : "text-zinc-300 hover:text-white")
                  }`}
                >
                  £
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    currency === "USD" 
                      ? (showSolidNav ? "bg-zinc-950 text-white shadow-sm" : "bg-[#dfc5a3] text-zinc-955") 
                      : (showSolidNav ? "text-zinc-500 hover:text-zinc-800" : "text-zinc-300 hover:text-white")
                  }`}
                >
                  $
                </button>
              </div>

              {/* Cart Button Wrapper */}
              <div className={`p-1.5 rounded-full transition-all border ${
                showSolidNav 
                  ? "bg-white shadow-sm hover:shadow-md border-zinc-200/50" 
                  : "bg-black/40 border-zinc-800 hover:bg-black/60"
              }`}>
                <CartButton 
                  onClick={() => setIsCartOpen(true)} 
                  className={showSolidNav ? "text-zinc-850" : "text-white"}
                />
              </div>

              {/* Phone Action Button */}
              <a
                href="tel:+1234567890"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                  showSolidNav 
                    ? "bg-zinc-900 hover:bg-zinc-800 text-white" 
                    : "bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950"
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>+1 234 567 890</span>
              </a>

              {/* Register Link */}
              <Link
                to="/register"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm border ${
                  showSolidNav
                    ? "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-900"
                    : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                }`}
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center gap-3">
            {/* Currency Switcher (Mobile) */}
            <div className={`flex items-center space-x-1 border rounded-full p-0.5 transition-all ${
              showSolidNav 
                ? "border-zinc-200 bg-white shadow-sm" 
                : "border-zinc-800 bg-black/30 backdrop-blur-sm"
            }`}>
              <button
                onClick={() => setCurrency("GBP")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currency === "GBP" 
                    ? (showSolidNav ? "bg-zinc-900 text-white" : "bg-[#dfc5a3] text-zinc-955") 
                    : (showSolidNav ? "text-zinc-650" : "text-zinc-400")
                }`}
              >
                £
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currency === "USD" 
                    ? (showSolidNav ? "bg-zinc-900 text-white" : "bg-[#dfc5a3] text-zinc-955") 
                    : (showSolidNav ? "text-zinc-650" : "text-zinc-400")
                }`}
              >
                $
              </button>
            </div>

            {/* Mobile Cart Wrapper */}
            <div className={`p-1 rounded-full shadow-sm transition-all border ${
              showSolidNav ? "bg-white border-zinc-200/50" : "bg-black/40 border-zinc-800"
            }`}>
              <CartButton 
                onClick={() => setIsCartOpen(true)} 
                className={showSolidNav ? "text-zinc-850" : "text-white"}
              />
            </div>

            {/* Hamburger Trigger */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors border ${
                showSolidNav 
                  ? "text-zinc-800 bg-zinc-100 border-zinc-200" 
                  : "text-white bg-white/10 border-white/10"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 bg-white rounded-xl shadow-lg mt-2 border border-zinc-100">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-4 py-2.5 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-2 border-t border-zinc-100 px-4 space-y-2">
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-zinc-850 text-white py-3 rounded-full text-sm font-semibold"
                >
                  <Phone className="h-4 w-4" />
                  <span>+1 234 567 890</span>
                </a>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 py-3 rounded-full text-sm font-semibold transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};
