
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/utils/mockData";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Products = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <Link 
                to={`/products/${product.id}`} 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="relative h-[200px] overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0].src} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-product-accent">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-sm">
                      {product.rating.toFixed(1)} 
                      <span className="text-gray-500 ml-1">
                        ({product.reviewCount})
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
