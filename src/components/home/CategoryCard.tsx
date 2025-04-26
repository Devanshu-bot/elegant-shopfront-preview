
import { ShoppingCategory } from "@/data/mockData";

interface CategoryCardProps {
  category: ShoppingCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="mt-2 text-sm">{category.name}</span>
    </div>
  );
}
