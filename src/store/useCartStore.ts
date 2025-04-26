
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, newQty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.productId === newItem.productId);
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.productId === newItem.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.productId !== productId)
      })),

      updateQuantity: (productId, newQty) => set((state) => ({
        items: state.items.map(item =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, newQty) }
            : item
        )
      })),

      clearCart: () => set({ items: [] })
    }),
    {
      name: 'cart-storage'
    }
  )
);
