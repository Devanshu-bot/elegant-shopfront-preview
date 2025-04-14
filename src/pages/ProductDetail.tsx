
import { ProductPage } from "@/components/product/ProductPage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const location = useLocation();

  // Scroll to top when the page loads or route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductPage />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
