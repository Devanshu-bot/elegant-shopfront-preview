
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";

const OrderSuccess = () => {
  const { clearCart } = useCartStore();
  
  // Clear cart when order is successful
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed and will be shipped soon.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/profile">
                View My Orders
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
