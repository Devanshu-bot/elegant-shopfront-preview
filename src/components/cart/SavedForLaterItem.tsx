
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wishlist } from "@/types/cart";
import { Link } from "react-router-dom";

interface SavedForLaterItemProps {
  item: Wishlist;
}

export const SavedForLaterItem = ({ item }: SavedForLaterItemProps) => {
  const { moveToCart } = useCart();
  
  return (
    <div className="flex gap-3 items-center py-3 border-b border-gray-100">
      <Link to={`/products/${item.productId}`} className="h-16 w-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex-grow min-w-0">
        <Link to={`/products/${item.productId}`} className="block">
          <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
        </Link>
        <p className="text-sm font-medium text-gray-900 mt-1">₹{item.price.toFixed(0)}</p>
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={() => moveToCart(item.productId)}
          className="p-2 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
          variant="ghost"
          size="icon"
        >
          <ShoppingBag size={18} />
        </Button>
      </div>
    </div>
  );
};
