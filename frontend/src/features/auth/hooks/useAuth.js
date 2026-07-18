import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe } from "../services/auth.service";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContextProvider");
  }
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister(name, email, password, role, storeName) {
    try {
      setLoading(true);
      const data = await register(name, email, password, role, storeName);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(email, password) {
    try {
      setLoading(true);
      const data = await login(email, password);
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    try {
      setLoading(true);
      const data = await getMe();
      setUser(data.user);
      return { success: true, data };
    } catch (err) {
      setUser(null);
      return { success: false };
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
  }

  return {
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
    user,
    setUser,
    loading,
  };
}