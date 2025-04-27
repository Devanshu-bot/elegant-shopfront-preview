
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CategoryCard } from "@/components/home/CategoryCard";
import { allCategories } from "@/data/mockData";

export default function Categories() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center h-16 px-4">
          <Link to="/" className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold -ml-8">
            All categories
          </h1>
        </div>
      </header>

      <div className="pt-16 px-4">
        {allCategories.map((group) => (
          <section key={group.group} className="mt-8">
            <h2 className="text-lg font-semibold mb-4">{group.group}</h2>
            <div className="flex overflow-x-auto gap-6 -mx-4 px-4 no-scrollbar">
              {group.items.map((category) => (
                <Link key={category.slug} to={`/category/${category.slug}`}>
                  <CategoryCard 
                    category={{
                      id: category.slug,
                      name: category.name,
                      image: category.image
                    }} 
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
