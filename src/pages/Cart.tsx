
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/components/cart/CartItem";
import { SavedForLaterItem } from "@/components/cart/SavedForLaterItem";
import { AddressSelector } from "@/components/cart/AddressSelector";
import { BillSummary } from "@/components/cart/BillSummary";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/useCartStore";

const Cart = () => {
  const { 
    items, 
    totalItems, 
    totalPrice,
    savedItems
  } = useCart();
  
  const { isSubmitting, initiateCheckout } = useCartStore();
  const navigate = useNavigate();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleCheckout = async () => {
    const result = await initiateCheckout();
    
    if (result.success && result.orderUrl) {
      // In a real app, you would redirect to Razorpay using the orderUrl
      // window.location.href = result.orderUrl;
      
      // For now, we'll show a toast notification
      toast.info("Redirecting to Razorpay payment gateway...");
      
      // Simulate a successful payment after a delay
      setTimeout(() => {
        toast.success("Payment successful!");
        navigate("/order-success");
      }, 2000);
    } else {
      toast.error(result.error || "Failed to initialize checkout");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <Header />
      
      <main className="flex-grow">
        {/* Back button and title */}
        <div className="px-4 py-3 flex items-center border-b">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-2 p-1 rounded-full"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 h-64">
            <p className="text-lg text-gray-500 mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/')} className="bg-product-accent hover:bg-product-secondary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Cart items */}
            <div className="p-4">
              <h2 className="font-medium text-lg mb-2">Cart ({totalItems} items)</h2>
              <div className="space-y-1">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </div>
            
            {/* Saved for later */}
            {savedItems.length > 0 && (
              <div className="px-4 pb-4">
                <h2 className="font-medium text-lg mb-2">Saved for later ({savedItems.length})</h2>
                <div className="space-y-1">
                  {savedItems.map((item) => (
                    <SavedForLaterItem key={item.productId} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Address selection */}
            <AddressSelector />

            {/* Bill Summary */}
            <div className="p-4 pb-28">
              <BillSummary subtotal={totalPrice} totalAmount={totalPrice} />
            </div>
          </div>
        )}
      </main>

      {/* Payment summary fixed at the bottom */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">To pay</p>
              <p className="text-xl font-bold">₹{totalPrice.toFixed(0)}</p>
            </div>
            <Button 
              className="px-8 py-2 bg-pink-200 text-black hover:bg-pink-300 rounded-full"
              disabled={isSubmitting || items.length === 0}
              onClick={handleCheckout}
            >
              {isSubmitting ? "Processing..." : "Pay online"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
