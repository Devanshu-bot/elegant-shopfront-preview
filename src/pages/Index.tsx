
import { Navigate } from "react-router-dom";
import { mockProducts } from "@/utils/mockData";

const Index = () => {
  // Get the first product ID for redirection
  const firstProductId = mockProducts[0]?.id || 1;
  
  // Redirect to the product detail page
  return <Navigate to={`/products/${firstProductId}`} replace />;
};

export default Index;
