import { ProductPage } from "@/components/product/ProductPage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
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

export default Index;
