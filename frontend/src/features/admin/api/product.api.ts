// frontend/src/modules/product/api/product.api.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/products";

export const createProductFn = async (formData: FormData) => {
  const response = await axios.post(API_URL, formData, {
    withCredentials: true,
  });

  return response.data;
};

export const getProductsFn = async (params: { page: number; limit: number; search: string }) => {
  const response = await axios.get(API_URL, {
    params, // Axios will automatically build the query string: ?page=1&limit=5&search=abc
    withCredentials: true,
  });
  return response.data;
};

export const deleteProductFn = async (productId: string) => {
  const response = await axios.delete(`${API_URL}/${productId}`, {
    withCredentials: true,
  });
  return response.data;
};

// ==========================================
// NEW: FUNCTIONS FOR THE EDIT FLOW
// ==========================================

export const getSingleProductFn = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

// Notice we pass an object containing both the ID and the FormData
export const updateProductFn = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axios.patch(`${API_URL}/${id}`, formData, {
    withCredentials: true,
  });
  return response.data;
};