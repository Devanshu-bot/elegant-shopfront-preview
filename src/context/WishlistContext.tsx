
import React, { createContext, useContext, ReactNode } from 'react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Wishlist } from '@/types/cart';

interface WishlistContextType {
  items: any[];
  addToWishlist: (item: any) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const wishlistStore = useWishlistStore();
  
  const addToWishlist = (item: any) => {
    const wishlistItem: Wishlist = {
      productId: item.id,
      name: item.name,
      image: item.images?.[0]?.src || item.image,
      price: item.price
    };
    wishlistStore.addToWishlist(wishlistItem);
  };

  const isInWishlist = (productId: number) => {
    return wishlistStore.items.some(item => item.productId === productId);
  };

  const value = {
    items: wishlistStore.items,
    addToWishlist,
    removeFromWishlist: wishlistStore.removeFromWishlist,
    isInWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
