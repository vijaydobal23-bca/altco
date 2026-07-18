import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function fetchAllProducts() {
  const res = await api.get("/api/products/all");
  return res.data;
}
