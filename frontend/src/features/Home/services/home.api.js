import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

export async function fetchAllProducts() {
  const res = await api.get("/api/products/all");
  return res.data;
}

// Cart APIs
export const getCart = () => api.get("/api/cart");
export const addToCartApi = (productId, quantity) => api.post("/api/cart/add", { productId, quantity });
export const removeFromCartApi = (productId) => api.delete(`/api/cart/remove/${productId}`);
export const updateCartQtyApi = (productId, quantity) => api.put(`/api/cart/update/${productId}`, { quantity });
export const clearCartApi = () => api.delete("/api/cart/clear");

// Order APIs
export const placeOrderApi = (orderData) => api.post("/api/orders", orderData);
