
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  showDetails?: boolean;
}

export function ProductCard({ product, showDetails = false }: ProductCardProps) {
  return (
    <div className="relative group">
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {showDetails && (
        <div className="mt-2">
          <h3 className="font-medium text-sm">{product.name}</h3>
          {product.price && (
            <p className="text-sm text-gray-600">${product.price}</p>
          )}
        </div>
      )}
    </div>
  );
}
