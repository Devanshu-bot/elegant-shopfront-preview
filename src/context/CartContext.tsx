
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, ProductVariant } from "@/types/product";
import { toast } from "sonner";

export interface CartItem {
  id: number;
  product: Product;
  color?: ProductVariant;
  size?: ProductVariant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  applyPromoCode: (code: string) => void;
  promoDiscount: number;
  estimatedDeliveryDays: number;
  saveForLater: (itemId: number) => void;
  savedItems: CartItem[];
  moveToCart: (itemId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState(3);

  const addToCart = (item: CartItem) => {
    // Check if product already exists with same variants
    const existingItemIndex = items.findIndex(
      (i) => 
        i.product.id === item.product.id && 
        i.color?.id === item.color?.id && 
        i.size?.id === item.size?.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setItems(updatedItems);
      toast.success("Item quantity updated in cart");
    } else {
      // Add new item
      setItems([...items, item]);
      toast.success("Item added to cart");
    }
  };

  const removeFromCart = (itemId: number) => {
    setItems(items.filter((_, index) => index !== itemId));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    const updatedItems = [...items];
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    updatedItems[itemId].quantity = quantity;
    setItems(updatedItems);
    toast.info("Quantity updated");
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const saveForLater = (itemId: number) => {
    const itemToSave = items[itemId];
    setSavedItems([...savedItems, itemToSave]);
    setItems(items.filter((_, index) => index !== itemId));
    toast.success("Item saved for later");
  };

  const moveToCart = (itemId: number) => {
    const itemToMove = savedItems[itemId];
    addToCart(itemToMove);
    setSavedItems(savedItems.filter((_, index) => index !== itemId));
  };

  const applyPromoCode = (code: string) => {
    // Simple promo code logic - in real app would validate against backend
    const validPromoCodes: Record<string, number> = {
      'WELCOME10': 10,
      'SPRING25': 25,
      'SAVE15': 15
    };
    
    if (code in validPromoCodes) {
      setPromoDiscount(validPromoCodes[code]);
      toast.success(`Promo code applied! ${validPromoCodes[code]}% discount`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  const discount = subtotal * (promoDiscount / 100);
  const tax = (subtotal - discount) * 0.07; // 7% tax rate
  const totalPrice = subtotal - discount + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        applyPromoCode,
        promoDiscount,
        estimatedDeliveryDays,
        saveForLater,
        savedItems,
        moveToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
