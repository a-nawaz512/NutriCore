// frontend/src/modules/product/hooks/useDeleteProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductFn } from "../api/product.api";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductFn,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      // Force the table to refresh and drop the deleted item
      queryClient.invalidateQueries({ queryKey: ["products"] }); 
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Failed to delete product";
      toast.error(errorMessage);
    },
  });
};