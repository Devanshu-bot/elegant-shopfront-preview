
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            isActive('/') ? 'text-product-accent' : 'text-gray-500'
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/search"
          className={`flex flex-col items-center justify-center ${
            isActive('/search') ? 'text-product-accent' : 'text-gray-500'
          }`}
        >
          <Search size={20} />
          <span className="text-xs mt-1">Search</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center justify-center ${
            isActive('/cart') ? 'text-product-accent' : 'text-gray-500'
          }`}
        >
          <ShoppingBag size={20} />
          <span className="text-xs mt-1">Cart</span>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center ${
            isActive('/profile') ? 'text-product-accent' : 'text-gray-500'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
