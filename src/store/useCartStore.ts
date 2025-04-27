
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';
import { supabase } from '@/integrations/supabase/client';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  isSubmitting: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, newQty: number) => void;
  clearCart: () => void;
  initiateCheckout: () => Promise<{ success: boolean; orderUrl?: string; error?: string }>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      isSubmitting: false,

      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.productId === newItem.productId);
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.productId === newItem.productId
                ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                : item
            )
          };
        }
        
        return { items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }] };
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.productId !== productId)
      })),

      updateQuantity: (productId, newQty) => {
        if (newQty <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: newQty }
              : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      initiateCheckout: async () => {
        const items = get().items;
        if (items.length === 0) {
          return { success: false, error: "Your cart is empty" };
        }

        try {
          set({ isSubmitting: true });
          
          // Calculate order details
          const orderData = {
            items: items.map(item => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            })),
            amount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            currency: "INR"
          };

          // Call Supabase Edge Function to create a Razorpay order
          const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
            body: orderData
          });

          if (error) {
            throw new Error(error.message || 'Failed to create order');
          }

          // Return success with the order URL to be used to open Razorpay checkout
          return { 
            success: true, 
            orderUrl: data.checkoutUrl 
          };
          
        } catch (error) {
          console.error("Checkout error:", error);
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'Checkout failed'
          };
        } finally {
          set({ isSubmitting: false });
        }
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
