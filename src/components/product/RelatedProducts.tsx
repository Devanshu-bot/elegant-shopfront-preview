
import { RelatedProduct } from "@/types/product";
import { Star } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    setIsScrolling(true);
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
    
    // Update scroll position for controlling button visibility
    setTimeout(() => {
      setScrollPosition(container.scrollLeft);
      setIsScrolling(false);
    }, 300);
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrolling) return;
    setScrollPosition(scrollContainerRef.current.scrollLeft);
  };

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      
      <div className="relative">
        {/* Left scroll button */}
        <button 
          onClick={() => scroll('left')}
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 transition-all",
            scrollPosition <= 10 ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          disabled={scrollPosition <= 10}
          aria-label="Scroll left"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Products scroll container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x"
          onScroll={handleScroll}
        >
          {products.map((product) => (
            <Link 
              to={`/products/${product.id}`}
              key={product.id}
              className="min-w-[240px] md:min-w-[280px] snap-start bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex-shrink-0 border border-gray-100"
            >
              <div className="relative h-[200px] overflow-hidden bg-gray-100">
                <img 
                  src={product.imageSrc} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1 truncate">{product.name}</h3>
                <p className="text-lg font-bold text-product-accent mb-2">
                  ${product.price.toFixed(2)}
                </p>
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
        
        {/* Right scroll button */}
        <button 
          onClick={() => scroll('right')}
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 transition-all",
            scrollContainerRef.current && 
            (scrollPosition + scrollContainerRef.current.offsetWidth >= scrollContainerRef.current.scrollWidth - 10) 
              ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          aria-label="Scroll right"
        >
          <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
