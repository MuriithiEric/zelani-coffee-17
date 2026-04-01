import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/Cart/CartButton";
import { CartSheet } from "@/components/Cart/CartSheet";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Story", href: "#story" },
    { label: "Products", href: "#products" },
    { label: "Impact", href: "#impact" },
    { label: "Contact", href: "#contact" },
    { label: "Track Order", href: "/track", isRoute: true },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/zelani-logo.jpeg" 
              alt="Zelani Coffee Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="font-playfair text-2xl font-bold text-coffee-800">
              Zelani Coffee
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              (item as any).isRoute ? (
                <button
                  key={item.label}
                  onClick={() => navigate(item.href)}
                  className="text-foreground hover:text-coffee-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-foreground hover:text-coffee-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              )
            )}
            <CartButton onClick={() => setIsCartOpen(true)} />
          </div>

          {/* Mobile menu button and cart */}
          <div className="md:hidden flex items-center gap-2">
            <CartButton onClick={() => setIsCartOpen(true)} />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-coffee-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) =>
                (item as any).isRoute ? (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.href); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 text-foreground hover:text-coffee-600 transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 text-foreground hover:text-coffee-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
};
