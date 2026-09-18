import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { useCart } from "@/hooks/useCart";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{item.product.name}</h4>
        <p className="text-sm text-muted-foreground">
          {item.product.grind} • {item.product.size}
        </p>
        <p className="text-sm font-semibold text-[#b37e38] mt-1">
          {formatPrice(item.product.price * item.quantity)}
        </p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.product.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
