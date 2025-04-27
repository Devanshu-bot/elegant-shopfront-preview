
import React, { createContext, useContext, ReactNode } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { CartItem } from '@/types/cart';
import { toast } from 'sonner';
import { useWishlistStore } from '@/store/useWishlistStore';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  promoDiscount: number;
  applyPromoCode: (code: string) => void;
  estimatedDeliveryDays: number;
  saveForLater: (productId: number) => void;
  savedItems: any[];
  moveToCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartStore = useCartStore();
  const wishlistStore = useWishlistStore();
  
  // Calculate total items
  const totalItems = cartStore.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const subtotal = cartStore.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = 0; // Will implement later
  const totalPrice = subtotal - (subtotal * (promoDiscount / 100));
  
  // Dummy data for now
  const estimatedDeliveryDays = 3;
  const savedItems = wishlistStore.items;

  const addToCart = (item: any) => {
    cartStore.addItem({
      productId: item.product?.id || item.id || Date.now(),
      name: item.product?.name || item.name,
      image: item.product?.images?.[0]?.src || item.image,
      price: item.product?.price || item.price,
      quantity: item.quantity || 1,
      color: item.color,
      size: item.size
    });
    toast.success('Added to cart');
  };

  const applyPromoCode = (code: string) => {
    if (code === 'WELCOME10') {
      toast.success('Promo code applied: 10% off');
    } else if (code === 'SPRING25') {
      toast.success('Promo code applied: 25% off');
    } else if (code === 'SAVE15') {
      toast.success('Promo code applied: 15% off');
    } else {
      toast.error('Invalid promo code');
    }
  };

  const saveForLater = (productId: number) => {
    const item = cartStore.items.find(item => item.productId === productId);
    if (item) {
      // First add to wishlist
      wishlistStore.addToWishlist({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
      });
      
      // Then remove from cart
      cartStore.removeItem(productId);
    }
  };

  const moveToCart = (productId: number) => {
    const item = wishlistStore.items.find(item => item.productId === productId);
    if (item) {
      cartStore.addItem({
        productId: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
      });
      
      // Remove from wishlist
      wishlistStore.removeFromWishlist(productId);
      
      toast.success('Item moved to cart');
    }
  };

  const value = {
    items: cartStore.items,
    addToCart,
    removeFromCart: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
    totalItems,
    totalPrice,
    promoDiscount,
    applyPromoCode,
    estimatedDeliveryDays,
    saveForLater,
    savedItems,
    moveToCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
