import { useCallback } from "react";
import { useSellerContext } from "../seller.context";
import {
  fetchSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import toast from "react-hot-toast";

export function useProduct() {
  const { products, setProducts, loading, setLoading } = useSellerContext();

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSellerProducts();
      setProducts(data.products || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setProducts]);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      const data = await createProduct(formData);
      setProducts((prev) => [data.product, ...prev]);
      toast.success("Product created!");
      return { success: true, product: data.product };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      setLoading(true);
      const data = await updateProduct(id, payload);
      setProducts((prev) => prev.map((p) => (p._id === id ? data.product : p)));
      toast.success("Product updated!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted.");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, loadProducts, handleCreate, handleUpdate, handleDelete };
}
