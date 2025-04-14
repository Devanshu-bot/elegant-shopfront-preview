
import { useState } from "react";
import { Product, ProductVariant } from "@/utils/mockData";
import { ProductVariants } from "./ProductVariants";
import { Star, Truck, ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<ProductVariant | null>(
    product.variants.colors.find(v => v.inStock) || null
  );
  const [selectedSize, setSelectedSize] = useState<ProductVariant | null>(
    product.variants.sizes.find(v => v.inStock) || null
  );
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      id: Date.now(), // Unique id for cart item
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });

    console.log("Adding to cart:", {
      product: product.name,
      color: selectedColor?.name,
      size: selectedSize?.name,
      quantity,
    });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="w-full">
      {/* Product Name and Rating */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-product-accent">
            ${product.price.toFixed(2)}
          </span>
          
          {product.originalPrice && (
            <>
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            </>
          )}
        </div>
      </div>

      {/* Product Description */}
      <p className="text-gray-700 mb-8">{product.description}</p>

      {/* Color Variants */}
      <ProductVariants
        title="Color"
        variants={product.variants.colors}
        type="color"
        onSelect={setSelectedColor}
      />

      {/* Size Variants */}
      <ProductVariants
        title="Size"
        variants={product.variants.sizes}
        type="size"
        onSelect={setSelectedSize}
      />

      {/* Quantity Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50"
            disabled={quantity <= 1}
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 h-10 border-t border-b border-gray-300 text-center focus:ring-0 focus:outline-none"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-product-accent text-white py-3 px-6 rounded-lg font-medium hover:bg-product-secondary transition-colors flex items-center justify-center"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          onClick={handleWishlistToggle}
          variant="outline"
          className={`flex items-center justify-center py-3 px-6 border rounded-lg font-medium transition-colors ${
            isInWishlist(product.id) 
              ? "bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100" 
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Heart 
            className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? "fill-pink-500 text-pink-500" : ""}`} 
          />
          {isInWishlist(product.id) ? "Saved to Wishlist" : "Save to Wishlist"}
        </Button>
      </div>

      {/* Shipping Info */}
      <div className="flex items-center py-4 border-t border-b border-gray-200 mb-8">
        <Truck className="w-5 h-5 text-gray-600 mr-3" />
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Free shipping</span> on orders over $50
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Estimated delivery: 3-5 business days
          </p>
        </div>
      </div>

      {/* Product Details List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Product Details</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {product.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
