
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockProduct } from "@/utils/mockData";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, SlidersHorizontal, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Create multiple products based on the mock product
const generateProducts = () => {
  const products = [];
  const baseProduct = mockProduct;
  
  // Create 12 products with slight variations
  for (let i = 1; i <= 12; i++) {
    products.push({
      ...baseProduct,
      id: i,
      name: `${baseProduct.name} ${i % 3 === 0 ? 'Premium' : i % 2 === 0 ? 'Deluxe' : 'Classic'}`,
      price: baseProduct.price - (i % 3) * 10 + (i % 5) * 15,
      originalPrice: i % 2 === 0 ? baseProduct.originalPrice : undefined,
      discount: i % 2 === 0 ? baseProduct.discount : undefined,
    });
  }
  
  return products;
};

const Products = () => {
  const products = generateProducts();
  const navigate = useNavigate();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8">
          <a href="#" className="hover:text-gray-700">Home</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">All Products</span>
        </nav>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">All Products</h1>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className={viewMode === 'grid' ? "bg-gray-100" : ""}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={viewMode === 'list' ? "bg-gray-100" : ""}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <SlidersHorizontal className="h-5 w-5 text-gray-500" />
              </div>
              
              {/* Filter Sections */}
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-product-accent" />
                      <span className="ml-2 text-gray-700">Under $100</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-product-accent" defaultChecked />
                      <span className="ml-2 text-gray-700">$100 - $300</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-product-accent" />
                      <span className="ml-2 text-gray-700">$300 - $500</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-product-accent" />
                      <span className="ml-2 text-gray-700">Above $500</span>
                    </label>
                  </div>
                </div>
                
                {/* Color */}
                <div>
                  <h3 className="font-medium mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockProduct.variants.colors.map((color) => (
                      <button
                        key={color.id}
                        className="h-8 w-8 rounded-full border-2 border-gray-200 p-0.5 focus:outline-none"
                        style={{ backgroundColor: color.value }}
                        aria-label={`Filter by ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Size */}
                <div>
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="flex flex-wrap gap-1">
                    {mockProduct.variants.sizes.map((size) => (
                      <button
                        key={size.id}
                        className="h-9 min-w-[2.5rem] rounded border border-gray-200 px-2 text-sm focus:outline-none hover:border-gray-300"
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div 
                      className="relative h-64 bg-gray-100 cursor-pointer" 
                      onClick={() => navigate('/')}
                    >
                      <img 
                        src={product.images[0].src} 
                        alt={product.name} 
                        className="h-full w-full object-cover"
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          isInWishlist(product.id) 
                            ? removeFromWishlist(product.id)
                            : addToWishlist(product);
                        }}
                        className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:bg-gray-50"
                      >
                        <Heart 
                          className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} 
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <h2 
                        className="text-lg font-medium text-gray-900 mb-1 cursor-pointer" 
                        onClick={() => navigate('/')}
                      >
                        {product.name}
                      </h2>
                      <div className="flex items-center mb-3">
                        <span className="text-product-accent font-medium">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="ml-2 text-gray-500 line-through text-sm">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button className="w-full bg-product-accent hover:bg-product-secondary">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div 
                        className="sm:w-56 h-56 bg-gray-100 cursor-pointer" 
                        onClick={() => navigate('/')}
                      >
                        <img 
                          src={product.images[0].src} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow p-5 flex flex-col">
                        <div className="flex justify-between">
                          <h2 
                            className="text-lg font-medium text-gray-900 mb-1 cursor-pointer" 
                            onClick={() => navigate('/')}
                          >
                            {product.name}
                          </h2>
                          <button 
                            onClick={() => {
                              isInWishlist(product.id) 
                                ? removeFromWishlist(product.id)
                                : addToWishlist(product);
                            }}
                            className="ml-2"
                          >
                            <Heart 
                              className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-pink-500 text-pink-500" : "text-gray-400"}`} 
                            />
                          </button>
                        </div>
                        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center mb-3">
                          <span className="text-product-accent font-medium">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="ml-2 text-gray-500 line-through text-sm">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-auto pt-3 flex space-x-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => navigate('/')}
                          >
                            View Details
                          </Button>
                          <Button className="flex-1 bg-product-accent hover:bg-product-secondary">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
