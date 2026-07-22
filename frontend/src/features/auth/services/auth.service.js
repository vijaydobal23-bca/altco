import axios from "axios";

const api = axios.create({
  baseURL: "https://altco-1.onrender.com",
  withCredentials: true, // Send cookies with every request
});

export async function register(name, email, password, role, storeName) {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
    role,
    storeName,
  });
  return response.data;
}

export async function login(email, password) {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
}

export async function getMe() {
  const response = await api.get("/api/auth/getme");
  return response.data;
}

export async function logout() {
  const response = await api.post("/api/auth/logout");
  return response.data;
}