import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useUserStore();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("You've been logged out");
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Only show hamburger menu on non-home routes
  const showHamburgerMenu = location.pathname !== '/';

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex-shrink-0 font-bold text-2xl text-product-accent cursor-pointer"
            onClick={() => navigate('/')}
          >
            pie
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-100 hidden md:block">
              <Search className="h-5 w-5" />
            </button>

            <div className="relative">
              <Link
                to="/profile"
                className="p-2 rounded-md hover:bg-gray-100 flex items-center"
              >
                <User className="h-5 w-5" />
                {isAuthenticated && (
                  <span className="ml-2 text-sm hidden md:inline">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                )}
              </Link>
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
