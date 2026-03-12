// frontend/src/modules/product/hooks/useUpdateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductFn } from "../api/product.api";
import { useNavigate } from "react-router-dom";

export const useUpdateProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductFn,
    onSuccess: (data) => {
      // Refresh the products list and the specific product cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", data.data._id] });
      
      navigate("/admin/dashboard/products");
    },
  });
};