import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";
import { getCart, removeFromCartApi, updateCartQtyApi, clearCartApi } from "../services/home.api";
import toast from "react-hot-toast";

export function useCartPage() {
  const { syncCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    try {
      setLoading(true);
      const res = await getCart();
      if (res.data.success) {
        const items = (res.data.cart?.items || []).map((item) => ({
          cartItemId: item._id,
          _id: item.product?._id,
          name: item.product?.name,
          description: item.product?.description,
          price: item.product?.price,
          images: item.product?.images,
          stock: item.product?.stock,
          seller: item.product?.seller,
          qty: item.quantity,
        }));
        setCartItems(items);
        syncCart(items);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("Failed to load cart.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(productId) {
    setActionLoading(true);
    try {
      await removeFromCartApi(productId);
      const updated = cartItems.filter((i) => i._id !== productId);
      setCartItems(updated);
      syncCart(updated);
      toast.success("Item removed from cart.");
    } catch {
      toast.error("Failed to remove item.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUpdateQty(productId, newQty) {
    setActionLoading(true);
    try {
      await updateCartQtyApi(productId, newQty);
      const updated = cartItems
        .map((i) => (i._id === productId ? { ...i, qty: newQty } : i))
        .filter((i) => i.qty > 0);
      setCartItems(updated);
      syncCart(updated);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update qty.");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleClearCart() {
    setActionLoading(true);
    try {
      await clearCartApi();
      setCartItems([]);
      clearCart();
      toast.success("Cart cleared.");
    } catch {
      toast.error("Failed to clear cart.");
    } finally {
      setActionLoading(false);
    }
  }

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return {
    cartItems,
    loading,
    actionLoading,
    totalItems,
    totalPrice,
    handleRemove,
    handleUpdateQty,
    handleClearCart,
    navigate,
  };
}
