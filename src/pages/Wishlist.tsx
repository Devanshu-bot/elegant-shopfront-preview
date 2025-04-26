
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    if (item) {
      addToCart({
        id: item.productId,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1
      });
      
      toast.success("Added to cart!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Heart className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your wishlist yet.</p>
            <Button onClick={() => navigate('/')} className="bg-product-accent hover:bg-product-secondary">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => (
                <div key={product.productId} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-64 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover"
                    />
                    <button 
                      onClick={() => removeFromWishlist(product.productId)}
                      className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50"
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h2>
                    <div className="flex items-center mb-3">
                      <span className="text-product-accent font-medium">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => navigate('/')}
                        variant="outline" 
                        className="flex-1 text-sm"
                      >
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-product-accent hover:bg-product-secondary text-sm"
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={() => navigate('/')} variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
