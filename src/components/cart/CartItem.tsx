
import { useCart } from "@/context/CartContext";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types/cart";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity, saveForLater } = useCart();
  
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
        <p className="text-xs text-green-600 mt-0.5">In stock</p>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Button
          onClick={() => saveForLater(item.productId)}
          className="p-2 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
          variant="ghost"
          size="icon"
        >
          <Heart size={16} />
        </Button>
        <div className="inline-flex items-center border rounded-md">
          {item.quantity > 1 ? (
            <Button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="px-2 py-1 h-8 border-r border-gray-200 bg-white hover:bg-gray-50 text-black rounded-none rounded-l-md"
              variant="ghost"
              size="icon"
            >
              <Minus size={14} />
            </Button>
          ) : (
            <Button
              onClick={() => removeFromCart(item.productId)}
              className="px-2 py-1 h-8 border-r border-gray-200 bg-white hover:bg-gray-50 text-black rounded-none rounded-l-md"
              variant="ghost"
              size="icon"
            >
              <Trash2 size={14} className="text-red-500" />
            </Button>
          )}
          <span className="px-3 py-1 text-sm">{item.quantity}</span>
          <Button
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            className="px-2 py-1 h-8 border-l border-gray-200 bg-white hover:bg-gray-50 text-black rounded-none rounded-r-md"
            variant="ghost"
            size="icon"
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};
