import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/254777405410", "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg animate-float"
        size="lg"
      >
        <MessageCircle className="h-6 w-6 mr-2" />
        Order Here
      </Button>
    </div>
  );
};