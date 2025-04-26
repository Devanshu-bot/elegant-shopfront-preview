
import { Category } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: Category[];
}

export function CategoryTabs({ categories }: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto gap-2 p-4 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          className={cn(
            "px-6 py-2 rounded-full whitespace-nowrap",
            category.name === "Apparel"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900"
          )}
        >
          {category.name}
        </button>
      ))}
      <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-900 whitespace-nowrap flex items-center gap-1">
        <span>Show more</span>
        <span className="text-lg">⋯</span>
      </button>
    </div>
  );
}
