
import { Coffee, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const footerLinks = {
    "Coffee": ["Kenyan Arabica", "Premium Blends", "Single Origin", "Fair Trade"],
    "About": ["Our Story", "Farm to Cup", "Sustainability", "Farmers"],
    "Support": ["Contact Us", "FAQ", "Shipping Info", "Returns"]
  };

  return (
    <footer className="bg-coffee-900 text-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/67d30343-8f62-4dd8-995c-f4ebbb149ca1.png" 
                alt="Zelani Coffee Logo" 
                className="h-8 w-8"
              />
              <span className="font-playfair text-2xl font-bold text-cream-100">
                Zelani Coffee
              </span>
            </div>
            <p className="text-cream-200 mb-6 max-w-md">
              100% pure Arabica coffee from the highlands of Mt. Kenya. 
              Supporting fairchain practices and promoting sustainability in coffee farming.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-coffee-800 p-2 rounded-lg hover:bg-coffee-700 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-cream-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-cream-100 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-cream-200 hover:text-gold-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-coffee-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream-200 text-sm">
            © 2025 Zelani Coffee. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-cream-200 hover:text-gold-400 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-cream-200 hover:text-gold-400 text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
