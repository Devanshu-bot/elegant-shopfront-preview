import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import LoginScreen from "./pages/auth/LoginScreen";
import RegisterScreen from "./pages/auth/RegisterScreen";
import VerifyScreen from "./pages/auth/VerifyScreen";
import ForgotPasswordScreen from "./pages/auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./pages/auth/ResetPasswordScreen";
import { BottomNav } from "./components/navigation/BottomNav";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/login" element={<LoginScreen />} />
              <Route path="/auth/register" element={<RegisterScreen />} />
              <Route path="/auth/verify" element={<VerifyScreen />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordScreen />} />
              <Route path="/auth/reset-password" element={<ResetPasswordScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
