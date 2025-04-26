
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Wishlist } from '@/types/cart';
import { useCartStore } from './useCartStore';
import { toast } from 'sonner';

interface WishlistState {
  items: Wishlist[];
  isLoading: boolean;
  addToWishlist: (item: Wishlist) => void;
  removeFromWishlist: (productId: number) => void;
  moveToCart: (productId: number) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addToWishlist: (item) => set((state) => {
        if (state.items.some(i => i.productId === item.productId)) {
          toast.error('Item already in wishlist');
          return state;
        }
        toast.success('Added to wishlist');
        return { items: [...state.items, item] };
      }),

      removeFromWishlist: (productId) => set((state) => ({
        items: state.items.filter(item => item.productId !== productId)
      })),

      moveToCart: (productId) => {
        const item = get().items.find(item => item.productId === productId);
        if (item) {
          useCartStore.getState().addItem({
            ...item,
            quantity: 1,
          });
          get().removeFromWishlist(productId);
          toast.success('Moved to cart');
        }
      }
    }),
    {
      name: 'wishlist-storage'
    }
  )
);
