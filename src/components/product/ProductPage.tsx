
import { mockProduct } from "@/utils/mockData";
import { ProductGallery } from "./ProductGallery";
import { ProductDetails } from "./ProductDetails";
import { ReviewSection } from "./ReviewSection";
import { RelatedProducts } from "./RelatedProducts";

export function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 mb-8">
        <a href="#" className="hover:text-gray-700">Home</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-gray-700">Furniture</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Lounge Chairs</span>
      </nav>

      {/* Product Layout - Gallery and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <ProductGallery images={mockProduct.images} />
        <ProductDetails product={mockProduct} />
      </div>

      {/* Reviews Section */}
      <ReviewSection 
        reviews={mockProduct.reviews} 
        rating={mockProduct.rating} 
        reviewCount={mockProduct.reviewCount} 
      />

      {/* Related Products */}
      <RelatedProducts products={mockProduct.relatedProducts} />
    </div>
  );
}
