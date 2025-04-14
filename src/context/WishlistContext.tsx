
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/utils/mockData";
import { toast } from "sonner";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    // Check if product already exists
    if (!isInWishlist(product.id)) {
      setItems([...items, product]);
      toast.success("Added to wishlist");
    } else {
      toast.info("Item already in wishlist");
    }
  };

  const removeFromWishlist = (productId: number) => {
    setItems(items.filter((item) => item.id !== productId));
    toast.info("Removed from wishlist");
  };

  const isInWishlist = (productId: number) => {
    return items.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
