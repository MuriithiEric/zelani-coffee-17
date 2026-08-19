
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, ChevronRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="find-us" className="bg-white text-zinc-800 border-t border-zinc-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-zinc-100">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <img
                src="/lovable-uploads/zelani-star-logo.png"
                alt="Zelani Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-playfair italic font-extrabold text-2xl text-zinc-900 tracking-wide">
                Zelani
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              We made it our mission to create community everyday and grow custom, lasting relationships with our staff, 
              our suppliers and of course you, our customers.
            </p>
          </div>

          {/* Store Locations (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-fredoka text-lg font-bold text-zinc-900">
              Store Locations
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Find your nearest Zelani Coffee store with opening hours, location and contact details.
            </p>
            <button className="flex items-center space-x-1 text-sm font-bold text-zinc-900 hover:text-zinc-700 transition-colors">
              <span>FIND LOCATION</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Contact & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-fredoka text-lg font-bold text-zinc-900">
                Contact Zelani Coffee!
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:alowishus@gmail.com"
                  className="flex items-center space-x-3 text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  <div className="bg-zinc-50 p-2 rounded-full border border-zinc-100">
                    <Mail className="h-4 w-4 text-zinc-800" />
                  </div>
                  <span>alowishus@gmail.com</span>
                </a>
                
                <a
                  href="tel:+110234254243"
                  className="flex items-center space-x-3 text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  <div className="bg-zinc-50 p-2 rounded-full border border-zinc-100">
                    <Phone className="h-4 w-4 text-zinc-800" />
                  </div>
                  <span>+110 234 254 243</span>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="bg-white border border-zinc-200 p-2.5 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-200 shadow-sm"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Newsletter 10% Off Subscription Form */}
            <div className="space-y-3 pt-2">
              <h4 className="font-fredoka text-sm font-bold text-zinc-900">
                Get 10% Off!
              </h4>
              <p className="text-xs text-zinc-500">
                Subscribe to our newsletter for 10% off on all products and exclusive roastery updates.
              </p>
              <div className="flex max-w-xs bg-zinc-50 rounded-full border border-zinc-200 p-1">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-transparent border-0 outline-0 px-3 py-2 text-xs flex-grow text-zinc-800 placeholder-zinc-400"
                />
                <button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-zinc-400 text-xs">
          <p>© Copyright 2026 Zelani Coffee</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-zinc-600 transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-zinc-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
