// frontend/src/modules/product/hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductFn } from "../api/product.api";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductFn,
    onSuccess: (data) => {
      console.log("Successfully created product:", data);
      
      // If you have a query fetching all products, this forces it to refresh 
      // so the new product instantly appears in your table
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
      
      // Redirect back to the dashboard
      navigate("/admin/dashboard/products");
    },
    onError: (error) => {
      console.error("Failed to create product:", error);
      // You can trigger your global error toast here
    },
  });
};