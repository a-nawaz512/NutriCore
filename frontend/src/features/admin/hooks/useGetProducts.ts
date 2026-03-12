// frontend/src/modules/product/hooks/useGetProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getProductsFn } from "../api/product.api";

export const useGetProducts = (params: { page: number; limit: number; search: string }) => {
  return useQuery({
    // Adding params to the queryKey ensures TanStack refetches when page or search changes
    queryKey: ["products", params], 
    queryFn: () => getProductsFn(params),
    // Optional: Keep previous data on the screen while fetching the next page
    placeholderData: (previousData) => previousData, 
  });
};