
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Minus, Plus, MapPin, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice,
    saveForLater,
  } = useCart();
  const navigate = useNavigate();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Sample delivery address - in a real app this would come from user profile
  const deliveryAddress = {
    line1: "666 Infernal Lane",
    line2: "Underworld District, Hellfire Realm",
    city: "Abyssal Depths",
    state: "Hades"
  };

  const handleQuantityChange = (productId: number, newQty: number) => {
    if (newQty > 0) {
      updateQuantity(productId, newQty);
    } else {
      // Ask for confirmation before removing item
      if (confirm("Remove this item from your cart?")) {
        removeFromCart(productId);
      }
    }
  };

  const handleSaveForLater = (productId: number) => {
    saveForLater(productId);
    toast.success("Item saved for later");
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    toast.info("Redirecting to payment gateway...");
    
    // In a real implementation, you would:
    // 1. Call your Supabase edge function to create a Razorpay order
    // 2. Use the returned order ID to initialize Razorpay checkout
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you'd normally initialize Razorpay
      // const options = {
      //   key: "rzp_test_yourkey",
      //   amount: totalPrice * 100, // Razorpay expects amount in paise
      //   currency: "INR",
      //   name: "Your Store",
      //   description: "Purchase",
      //   order_id: "order_id_from_server",
      //   handler: function(response) {
      //     // Handle successful payment
      //   }
      // };
      // const rzp = new Razorpay(options);
      // rzp.open();
      
      toast.success("Payment feature will be implemented with Supabase integration");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment initiation failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Calculate savings if any
  const regularPrice = items.reduce((sum, item) => sum + (item.price * item.quantity * 1.2), 0); // Assuming 20% discount
  const savings = regularPrice - totalPrice;
  const hasSavings = savings > 0;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow pb-24">
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
            <div className="flex-grow">
              {items.map((item) => (
                <div key={item.productId} className="p-4 border-b">
                  <div className="flex">
                    <div className="h-24 w-24 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-lg font-medium mt-1">₹{item.price.toFixed(0)}</p>
                          <p className="text-sm text-green-600 mt-1">In stock</p>
                        </div>
                        <button 
                          onClick={() => handleSaveForLater(item.productId)}
                          className="p-2 rounded-full bg-gray-100"
                        >
                          <Heart size={18} className="text-gray-700" />
                        </button>
                      </div>
                      
                      {/* Quantity selector */}
                      <div className="mt-3">
                        <div className="inline-flex items-center border rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            className="px-3 py-1 border-r"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            className="px-3 py-1 border-l"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery address section */}
            <div className="p-4 mt-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-2 h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Delivering to home</h3>
                    <p className="text-gray-600 mt-1">
                      {deliveryAddress.line1}, {deliveryAddress.line2}, {deliveryAddress.city}, {deliveryAddress.state}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Payment summary fixed at the bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-600">To pay</p>
                  <p className="text-xl font-bold">₹{totalPrice.toFixed(0)}</p>
                </div>
                <Button 
                  className="px-8 py-2 bg-pink-200 text-black hover:bg-pink-300 rounded-full"
                  disabled={isProcessingPayment}
                  onClick={handlePayment}
                >
                  {isProcessingPayment ? "Processing..." : "Pay online"}
                </Button>
              </div>
              
              {hasSavings && (
                <p className="text-center text-sm text-green-600">
                  Saving ₹{savings.toFixed(0)}
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
