
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button className="lg:hidden p-2 rounded-md hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 font-bold text-2xl text-product-accent cursor-pointer"
            onClick={() => navigate('/')}
          >
            ELEGANCE
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-product-accent cursor-pointer">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-product-accent cursor-pointer">Shop</Link>
            <Link to="/products" className="text-gray-700 hover:text-product-accent cursor-pointer">Categories</Link>
            <a className="text-gray-700 hover:text-product-accent cursor-pointer">About</a>
            <a className="text-gray-700 hover:text-product-accent cursor-pointer">Contact</a>
          </nav>
          
          {/* Right icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => user ? navigate('/auth/change-password') : navigate('/auth/login')}
              >
                <User className="h-5 w-5" />
              </button>
            </div>

            <Link 
              to="/cart"
              className="p-2 rounded-md hover:bg-gray-100 relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-product-accent text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
