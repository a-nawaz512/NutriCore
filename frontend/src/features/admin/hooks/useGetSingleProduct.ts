// frontend/src/modules/product/hooks/useGetSingleProduct.ts
import { useQuery } from "@tanstack/react-query";
import { getSingleProductFn } from "../api/product.api";

export const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProductFn(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};