import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InstagramCTA = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-widest text-coffee-500 mb-2">Instagram</p>
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-coffee-800 mb-6">
          Follow @zelanicoffee
        </h2>
        <Button
          asChild
          size="lg"
          className="bg-gold-500 hover:bg-gold-600 text-coffee-900"
        >
          <a
            href="https://www.instagram.com/zelanicoffee/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Follow Us on Instagram
          </a>
        </Button>
      </div>
    </section>
  );
};
