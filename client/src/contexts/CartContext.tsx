import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api/api-client";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  grind: string;
  size: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("zelani-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(api.isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(api.isAuthenticated());
    };
    window.addEventListener("zelani-auth-change", handleAuthChange);
    return () => {
      window.removeEventListener("zelani-auth-change", handleAuthChange);
    };
  }, []);

  // Sync / Load cart depending on auth status
  useEffect(() => {
    if (isAuthenticated) {
      const syncCart = async () => {
        try {
          // Get the guest cart from localStorage
          const savedCart = localStorage.getItem("zelani-cart");
          const localItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

          // Sync local items to database
          if (localItems.length > 0) {
            for (const item of localItems) {
              await api.cart.addOrUpdate(
                item.product.id,
                item.quantity,
                item.product.grind,
                item.product.size
              );
            }
          }

          // Fetch final merged/saved cart from DB
          const dbItems = await api.cart.get();
          const formatted = dbItems.map((item: any) => ({
            product: {
              id: item.product.id,
              name: item.product.name,
              price: item.product.price,
              image: item.product.image,
              grind: item.grind || item.product.grind,
              size: item.size || item.product.size,
              description: item.product.description,
            },
            quantity: item.quantity,
          }));
          setItems(formatted);
        } catch (error) {
          console.error("Failed to sync cart with database:", error);
        }
      };

      syncCart();
    } else {
      // If logging out or not logged in, retrieve guest cart from local storage
      const savedCart = localStorage.getItem("zelani-cart");
      setItems(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem("zelani-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      let newItems;
      if (existingItem) {
        newItems = currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...currentItems, { product, quantity }];
      }

      // Sync to database
      if (api.isAuthenticated()) {
        const targetQty = existingItem ? existingItem.quantity + quantity : quantity;
        api.cart.addOrUpdate(product.id, targetQty, product.grind, product.size).catch(console.error);
      }

      toast.success(existingItem ? `Updated ${product.name} quantity` : `Added ${product.name} to cart`);
      return newItems;
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((i) => i.product.id === productId);
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`);
        if (api.isAuthenticated()) {
          api.cart.removeItem(productId, item.product.grind, item.product.size).catch(console.error);
        }
      }
      return currentItems.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) => {
      const item = currentItems.find((i) => i.product.id === productId);
      if (item && api.isAuthenticated()) {
        api.cart.addOrUpdate(productId, quantity, item.product.grind, item.product.size).catch(console.error);
      }

      return currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("zelani-cart");
    if (api.isAuthenticated()) {
      api.cart.clear().catch(console.error);
    }
  };

  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
