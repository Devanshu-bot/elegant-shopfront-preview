
import { Link } from "react-router-dom";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductCard } from "@/components/home/ProductCard";
import { CategoryCard } from "@/components/home/CategoryCard";
import { 
  categories, 
  bannerSlides, 
  latestProducts, 
  shoppingCategories, 
  dealsProducts 
} from "@/data/mockData";

export default function Home() {
  return (
    <div className="pb-20">
      <CategoryTabs categories={categories} />

      <div className="px-4">
        <HeroCarousel slides={bannerSlides} />

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Latest Products</h2>
          <div className="flex overflow-x-auto gap-4 -mx-4 px-4 no-scrollbar">
            {latestProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="w-32 flex-shrink-0"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Keep shopping for</h2>
          <div className="flex overflow-x-auto gap-6 -mx-4 px-4 no-scrollbar">
            {shoppingCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CategoryCard key={category.id} category={category} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Deals for you</h2>
          <div className="grid grid-cols-2 gap-4">
            {dealsProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`}>
                <ProductCard product={product} showDetails />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
