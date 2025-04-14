
import { useParams } from "react-router-dom";
import { mockProducts } from "@/utils/mockData";
import { ProductGallery } from "./ProductGallery";
import { ProductDetails } from "./ProductDetails";
import { ReviewSection } from "./ReviewSection";
import { RelatedProducts } from "./RelatedProducts";
import { Product } from "@/types/product";

export function ProductPage() {
  // Get product ID from URL parameters
  const { productId } = useParams();
  
  // Find the product based on ID or use the first product as default
  const product: Product = productId 
    ? mockProducts.find(p => p.id === Number(productId)) || mockProducts[0]
    : mockProducts[0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-8">
        <a href="/" className="hover:text-gray-700">Home</a>
        <span className="mx-2">/</span>
        <a href="/products" className="hover:text-gray-700">{product.category || "Products"}</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.subcategory || product.name}</span>
      </nav>

      {/* Product Layout - Gallery and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <ProductGallery images={product.images} />
        <ProductDetails product={product} />
      </div>

      {/* Reviews Section */}
      <ReviewSection 
        reviews={product.reviews} 
        rating={product.rating} 
        reviewCount={product.reviewCount} 
      />

      {/* Related Products */}
      <RelatedProducts products={product.relatedProducts} />
    </div>
  );
}
