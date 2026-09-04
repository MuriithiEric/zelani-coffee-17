import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="find-us" className="bg-white text-zinc-800 border-t border-zinc-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-zinc-100">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2.5">
              <img
                src="/lovable-uploads/zelani-logo.jpeg"
                alt="Zelani Coffee Logo"
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="font-fredoka font-bold text-2xl text-zinc-900 tracking-wide">
                Zelani Coffee
              </span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Born from generosity. Built on relationships. Rooted in Kenya. Inspired by Africa. Created for the world.
            </p>
            <div className="pt-2 text-xs text-zinc-400">
              From Farm · To Cup · To Future
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-fredoka text-lg font-bold text-zinc-900">
              Explore Zelani
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/our-story" className="text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#dfc5a3]" />
                  <span>Our Story</span>
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#dfc5a3]" />
                  <span>Impact 2030</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#dfc5a3]" />
                  <span>Our Products</span>
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-zinc-600 hover:text-zinc-950 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#dfc5a3]" />
                  <span>Track Your Order</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Locations & Community (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-fredoka text-lg font-bold text-zinc-900">
              Find Us
            </h3>
            <div className="space-y-3 text-sm text-zinc-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong>Marula Green Market</strong><br />
                  Marula Lane, Karen<br />
                  Nairobi, Kenya
                </div>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Kirinyaga County & Mt. Kenya smallholder origin partners.
              </p>
            </div>
          </div>

          {/* Contact & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h3 className="font-fredoka text-lg font-bold text-zinc-900">
                Connect With Us
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:contact@zelanicoffee.com"
                  className="flex items-center space-x-3 text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  <div className="bg-zinc-50 p-2 rounded-full border border-zinc-100">
                    <Mail className="h-4 w-4 text-zinc-800" />
                  </div>
                  <span>contact@zelanicoffee.com</span>
                </a>
                
                <a
                  href="tel:+254700000000"
                  className="flex items-center space-x-3 text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  <div className="bg-zinc-50 p-2 rounded-full border border-zinc-100">
                    <Phone className="h-4 w-4 text-zinc-800" />
                  </div>
                  <span>+254 700 000 000</span>
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
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-zinc-400 text-xs">
          <p>© Copyright 2026 Zelani Coffee · All Rights Reserved</p>
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
