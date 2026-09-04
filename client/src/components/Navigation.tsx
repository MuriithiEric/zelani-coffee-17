import { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  Phone, 
  UserPlus, 
  ShoppingBag, 
  LogOut, 
  ChevronDown
} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/Cart/CartButton";
import { CartSheet } from "@/components/Cart/CartSheet";
import { useCurrency } from "@/contexts/CurrencyContext";
import { api } from "@/lib/api/api-client";
import { toast } from "sonner";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  const handleLogout = () => {
    api.auth.logout();
    toast.success("Successfully logged out.");
    navigate("/");
  };

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

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(api.isAuthenticated());
    };
    window.addEventListener("zelani-auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("zelani-auth-change", handleAuthChange);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsAboutOpen(false);
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const aboutDropdownItems = [
    { label: "Our Story", href: "/our-story" },
    { label: "Impact 2030", href: "/impact" },
    { label: "Our Speciality", href: "/#speciality" },
    { label: "Find Us", href: "/#find-us" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setIsAboutOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname !== "/") {
        navigate(href);
      } else {
        const id = href.replace("/#", "");
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
    }
  };

  const isHomePage = location.pathname === "/";
  const showSolidNav = scrolled || !isHomePage;
  const isAboutActive = 
    location.pathname === "/our-story" || 
    location.pathname === "/impact" || 
    (isHomePage && (location.hash === "#speciality" || location.hash === "#find-us"));

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
            className="flex items-center space-x-2.5 cursor-pointer shrink-0"
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

          {/* Desktop Navigation (Simple, Clean, Minimalist Navbar) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-5 lg:space-x-7">
              
              {/* Home Link */}
              <button
                onClick={() => handleLinkClick("/")}
                className={`transition-colors duration-200 font-medium text-sm tracking-wide ${
                  location.pathname === "/" && !location.hash
                    ? (showSolidNav ? "text-zinc-950 font-bold border-b-2 border-zinc-900 pb-0.5" : "text-[#dfc5a3] font-bold border-b-2 border-[#dfc5a3] pb-0.5")
                    : (showSolidNav ? "text-zinc-600 hover:text-zinc-950" : "text-zinc-200 hover:text-white")
                }`}
              >
                Home
              </button>

              {/* Our Products Link */}
              <button
                onClick={() => handleLinkClick("/products")}
                className={`transition-colors duration-200 font-medium text-sm tracking-wide ${
                  location.pathname === "/products"
                    ? (showSolidNav ? "text-zinc-950 font-bold border-b-2 border-zinc-900 pb-0.5" : "text-[#dfc5a3] font-bold border-b-2 border-[#dfc5a3] pb-0.5")
                    : (showSolidNav ? "text-zinc-600 hover:text-zinc-950" : "text-zinc-200 hover:text-white")
                }`}
              >
                Our Products
              </button>

              {/* About & Impact Simple Dropdown Trigger */}
              <div 
                ref={dropdownRef}
                className="relative py-2"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className={`flex items-center gap-1 transition-colors duration-200 font-medium text-sm tracking-wide ${
                    isAboutActive
                      ? (showSolidNav ? "text-zinc-950 font-bold border-b-2 border-zinc-900 pb-0.5" : "text-[#dfc5a3] font-bold border-b-2 border-[#dfc5a3] pb-0.5")
                      : (showSolidNav ? "text-zinc-600 hover:text-zinc-950" : "text-zinc-200 hover:text-white")
                  }`}
                  aria-expanded={isAboutOpen}
                >
                  <span>About & Impact</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAboutOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Simple Clean Dropdown Menu (No icons, no badges, no top section) */}
                {isAboutOpen && (
                  <div className="absolute top-full left-0 pt-1.5 w-44 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                    <div className="bg-white rounded-xl shadow-xl border border-zinc-200 py-1.5 overflow-hidden">
                      {aboutDropdownItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <button
                            key={item.label}
                            onClick={() => handleLinkClick(item.href)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors block ${
                              isActive 
                                ? "bg-zinc-100 text-zinc-950 font-semibold" 
                                : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 font-medium"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Track Order Link */}
              <button
                onClick={() => handleLinkClick("/track")}
                className={`transition-colors duration-200 font-medium text-sm tracking-wide ${
                  location.pathname === "/track"
                    ? (showSolidNav ? "text-zinc-950 font-bold border-b-2 border-zinc-900 pb-0.5" : "text-[#dfc5a3] font-bold border-b-2 border-[#dfc5a3] pb-0.5")
                    : (showSolidNav ? "text-zinc-600 hover:text-zinc-950" : "text-zinc-200 hover:text-white")
                }`}
              >
                Track Order
              </button>

            </div>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center space-x-3">
              
              {/* Currency Switcher */}
              <div className={`flex items-center space-x-1 border rounded-full p-1 transition-all ${
                showSolidNav 
                  ? "border-zinc-300 bg-white/80 backdrop-blur-sm shadow-sm" 
                  : "border-zinc-700 bg-black/40 backdrop-blur-sm"
              }`}>
                <button
                  onClick={() => setCurrency("GBP")}
                  className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${
                    currency === "GBP" 
                      ? (showSolidNav ? "bg-zinc-950 text-white shadow-sm" : "bg-[#dfc5a3] text-zinc-950") 
                      : (showSolidNav ? "text-zinc-500 hover:text-zinc-800" : "text-zinc-300 hover:text-white")
                  }`}
                >
                  £
                </button>
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-2 py-0.5 rounded-full text-xs font-bold transition-all ${
                    currency === "USD" 
                      ? (showSolidNav ? "bg-zinc-950 text-white shadow-sm" : "bg-[#dfc5a3] text-zinc-950") 
                      : (showSolidNav ? "text-zinc-500 hover:text-zinc-800" : "text-zinc-300 hover:text-white")
                  }`}
                >
                  $
                </button>
              </div>

              {/* Cart Button Wrapper */}
              <div className={`p-1.5 rounded-full transition-all border ${
                showSolidNav 
                  ? "bg-white shadow-sm hover:shadow-md border-zinc-200/60" 
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
                className={`hidden xl:flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm ${
                  showSolidNav 
                    ? "bg-zinc-900 hover:bg-zinc-800 text-white" 
                    : "bg-[#dfc5a3] hover:bg-[#d0b38e] text-zinc-950"
                }`}
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+1 234 567 890</span>
              </a>

              {/* Register / Orders & Sign Out Links */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/orders"
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm border ${
                      showSolidNav
                        ? "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-900"
                        : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    }`}
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Orders</span>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    size="sm"
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm border h-auto ${
                      showSolidNav
                        ? "bg-white hover:bg-red-50 hover:text-red-650 hover:border-red-200 border-zinc-200 text-zinc-700"
                        : "bg-white/10 hover:bg-red-950/25 hover:text-red-300 hover:border-red-800/30 border-white/20 text-white"
                    }`}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Link
                  to="/register"
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm border ${
                    showSolidNav
                      ? "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-900"
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  }`}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Register</span>
                </Link>
              )}
            </div>

          </div>

          {/* Mobile menu trigger and controls */}
          <div className="md:hidden flex items-center gap-2.5">
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
                    ? (showSolidNav ? "bg-zinc-900 text-white" : "bg-[#dfc5a3] text-zinc-950") 
                    : (showSolidNav ? "text-zinc-650" : "text-zinc-400")
                }`}
              >
                £
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  currency === "USD" 
                    ? (showSolidNav ? "bg-zinc-900 text-white" : "bg-[#dfc5a3] text-zinc-950") 
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
              className={`transition-colors border p-2 h-auto ${
                showSolidNav 
                  ? "text-zinc-800 bg-zinc-100 border-zinc-200" 
                  : "text-white bg-white/10 border-white/10"
              }`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2">
            <div className="p-4 space-y-2 bg-white rounded-2xl shadow-xl border border-zinc-100 max-h-[80vh] overflow-y-auto">
              
              {/* Home */}
              <button
                onClick={() => handleLinkClick("/")}
                className={`block w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  location.pathname === "/" && !location.hash
                    ? "bg-zinc-100 text-zinc-950 font-bold"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Home
              </button>

              {/* Our Products */}
              <button
                onClick={() => handleLinkClick("/products")}
                className={`block w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  location.pathname === "/products"
                    ? "bg-zinc-100 text-zinc-950 font-bold"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Our Products
              </button>

              {/* About & Impact Mobile Section */}
              <div className="border border-zinc-100 rounded-xl p-2 bg-zinc-50/60">
                <button
                  onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  className="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500"
                >
                  <span>About & Impact</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMobileAboutOpen ? "rotate-180" : ""}`} />
                </button>

                {isMobileAboutOpen && (
                  <div className="space-y-1 pt-1.5">
                    {aboutDropdownItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleLinkClick(item.href)}
                        className="w-full text-left px-3 py-2 rounded-lg bg-white border border-zinc-100 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Track Order */}
              <button
                onClick={() => handleLinkClick("/track")}
                className={`block w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  location.pathname === "/track"
                    ? "bg-zinc-100 text-zinc-950 font-bold"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                Track Order
              </button>

              {/* Mobile Auth & Contact */}
              <div className="pt-3 border-t border-zinc-100 space-y-2">
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 rounded-full text-xs font-semibold shadow-sm"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>+1 234 567 890</span>
                </a>

                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/orders"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 py-2.5 rounded-full text-xs font-semibold transition-colors"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Orders</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-650 py-2.5 rounded-full text-xs font-semibold border border-red-200 transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 py-2.5 rounded-full text-xs font-semibold transition-colors"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Register</span>
                  </Link>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};
