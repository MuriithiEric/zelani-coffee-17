import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";

const ThreadsIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.0007 0C10.7416 0 9.53936 0.174366 8.39763 0.518659C7.25589 0.862952 6.18237 1.37894 5.17706 2.06663C4.17175 2.75432 3.25735 3.60624 2.43384 4.62237C1.61033 5.6385 0.942065 6.7877 0.429035 8.07005C-0.0839956 9.3524 -0.158728 10.6666 0.20484 12.0125C0.568407 13.3584 1.2587 14.544 2.27575 15.5693C3.2928 16.5946 4.54583 17.2605 6.03482 17.5668C7.52382 17.8731 8.94856 17.7533 10.309 17.2076C11.6695 16.6619 12.716 15.8601 13.4485 14.8021C13.5687 14.6309 13.6826 14.4571 13.7901 14.2807C13.8821 14.1332 13.9786 13.9877 14.0797 13.8443C14.0797 13.8443 14.0797 13.8443 14.0797 13.8443C13.9421 13.9031 13.8016 13.963 13.6582 14.0241C12.8227 14.3804 11.954 14.6195 11.0521 14.7416C10.1502 14.8637 9.25199 14.8569 8.35759 14.7212C7.4632 14.5855 6.64757 14.3312 5.91071 13.9582C5.17384 13.5852 4.54519 13.123 4.02476 12.5716C3.50433 12.0203 3.12036 11.4019 2.87285 10.7164C2.62534 10.0309 2.54462 9.29744 2.63068 8.51608C2.71675 7.73473 2.99613 7.02534 3.46882 6.38787C3.94151 5.7504 4.56837 5.23441 5.34938 4.8399C6.13039 4.44539 7.00101 4.21557 7.96122 4.15042C8.92143 4.08527 9.87875 4.15494 10.8331 4.35941C11.7876 4.56388 12.6375 4.89868 13.3828 5.3638C14.1281 5.82892 14.6989 6.4258 15.0954 7.15444C15.4918 7.88307 15.6883 8.64454 15.685 9.43888C15.685 10.0381 15.5492 10.5985 15.2777 11.1201C15.0061 11.6417 14.6468 12.0722 14.1997 12.4116C13.7527 12.751 13.2504 12.9774 12.6929 13.0911C12.1354 13.2048 11.5546 13.2526 10.9506 13.2346C10.5065 13.2209 10.0634 13.1417 9.6212 12.9972C9.17904 12.8527 8.76159 12.6465 8.36885 12.3786C7.9761 12.1107 7.64448 11.7842 7.37397 11.3991C7.10345 11.014 6.96023 10.5843 6.9443 10.1099C6.92837 9.63554 7.04278 9.19124 7.28754 8.77701C7.5323 8.36278 7.89376 8.02644 8.37194 7.76801C8.85012 7.50958 9.38794 7.36979 9.98545 7.34863C10.583 7.32747 11.1627 7.42006 11.7247 7.6264C12.2867 7.83273 12.7547 8.12196 13.1288 8.49409L14.7334 6.84074C14.0724 6.18529 13.3108 5.67027 12.4485 5.29567C11.5862 4.92107 10.6385 4.73377 9.60538 4.73377C8.55248 4.73377 7.58782 4.93319 6.7114 5.33203C5.83498 5.73087 5.09555 6.27581 4.4931 6.96684C3.89066 7.65787 3.44754 8.46193 3.16374 9.37902C2.87994 10.2961 2.7681 11.2359 2.82823 12.1983C2.88836 13.1607 3.12261 14.0538 3.53097 14.8778C3.93933 15.7018 4.51268 16.398 5.25102 16.9664C5.98935 17.5348 6.84581 17.9355 7.82038 18.1685C8.79496 18.4015 9.80556 18.4735 10.8522 18.3844C11.8989 18.2954 12.8741 18.043 13.7779 17.6272C14.6817 17.2113 15.4674 16.6576 16.135 15.9662C16.8026 15.2748 17.3377 14.4757 17.7403 13.5689C18.1429 12.6621 18.3758 11.6966 18.4391 10.6724C18.5024 9.64825 18.398 8.65345 18.1259 7.68798C17.8538 6.72251 17.4243 5.8647 16.8375 5.11456C16.2507 4.36442 15.5458 3.75338 14.7229 3.28143C13.9001 2.80948 13.011 2.53503 12.0558 2.45806C11.1006 2.38109 10.1587 2.46497 9.23014 2.7097C8.30159 2.95443 7.46487 3.32832 6.71997 3.83138C5.97508 4.33444 5.34002 4.94548 4.8148 5.6645C4.28958 6.38352 3.89674 7.18269 3.63628 8.06201C3.37582 8.94133 3.29294 9.86558 3.38763 10.8348C3.48232 11.8039 3.75845 12.6787 4.21601 13.4593C4.67357 14.2399 5.28929 14.8878 6.06317 15.4029C6.83705 15.9181 7.74205 16.2753 8.77817 16.4746C9.81429 16.6739 10.8756 16.6908 11.9621 16.5252C13.0486 16.3596 14.0306 16.027 14.9082 15.5273C15.7858 15.0276 16.5204 14.3986 17.112 13.6402C17.7036 12.8818 18.127 12.0315 18.3821 11.0894C18.6372 10.1472 18.7302 9.17228 18.6611 8.16461C18.5919 7.15694 18.3563 6.20815 17.9542 5.31825C17.5521 4.42835 17.0093 3.65545 16.3259 2.99955C15.6425 2.34365 14.8519 1.83403 13.954 1.47068C13.0561 1.10733 12.0527 0.923483 10.9439 0.919137C11.2965 0.919137 11.6491 0.919137 12.0007 0.919137V0Z"/>
  </svg>
);

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
              <div className="space-y-2.5">
                <a
                  href="tel:+254777405410"
                  className="flex items-center space-x-3 text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  <div className="bg-zinc-50 p-2 rounded-full border border-zinc-100">
                    <Phone className="h-4 w-4 text-zinc-800" />
                  </div>
                  <span>+254 777 405 410</span>
                </a>

                <a
                  href="https://wa.me/254777405410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-zinc-500 hover:text-zinc-900 text-sm transition-colors"
                >
                  <div className="bg-zinc-50 p-2 rounded-full border border-zinc-100 text-green-600">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span>WhatsApp (+254 777 405 410)</span>
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {[
                {
                  name: "Instagram",
                  icon: Instagram,
                  href: "https://www.instagram.com/zelanicoffee/",
                },
                {
                  name: "Threads",
                  icon: ThreadsIcon,
                  href: "https://www.threads.com/@zelanicoffee",
                },
                {
                  name: "Facebook",
                  icon: Facebook,
                  href: "https://web.facebook.com/profile.php?id=61578138203234&sk=directory_intro",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="bg-white border border-zinc-200 p-2.5 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-200 shadow-sm flex items-center justify-center text-zinc-700"
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
