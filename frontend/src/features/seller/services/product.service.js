import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

export async function fetchSellerProducts() {
  const res = await api.get("/api/products/seller");
  return res.data;
}

export async function createProduct(formData) {
  const res = await api.post("/api/products/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateProduct(id, data) {
  const res = await api.put(`/api/products/${id}`, data);
  return res.data;
}

export async function deleteProduct(id) {
  const res = await api.delete(`/api/products/${id}`);
  return res.data;
}
