
import { Facebook, Instagram, Twitter } from "lucide-react";

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Custom YouTube Icon Component
const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61578138203234", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/zelanicoffee/", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/zelanicoffee", label: "X" },
    { icon: TikTokIcon, href: "https://tiktok.com/@zelanicoffee", label: "TikTok" },
    { icon: YouTubeIcon, href: "https://www.youtube.com/@zelanicoffee", label: "YouTube" }
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
                src="/lovable-uploads/zelani-logo.jpeg" 
                alt="Zelani Coffee Logo" 
                className="h-12 w-12 object-contain"
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
                  target="_blank"
                  rel="noopener noreferrer"
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
