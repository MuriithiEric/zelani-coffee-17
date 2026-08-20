import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface CartButtonProps {
  onClick: () => void;
  className?: string;
}

export const CartButton = ({ onClick, className }: CartButtonProps) => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={`relative hover:opacity-80 transition-opacity ${className || "text-foreground"}`}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-gold-500 text-coffee-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
};
