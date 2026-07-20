import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart from backend on mount
  useEffect(() => {
    fetchInitialCart();
  }, []);

  async function fetchInitialCart() {
    try {
      const res = await api.get("/cart");
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
      }
    } catch (err) {
      console.error("Failed to load initial cart", err);
    }
  }

  // Sync backend cart into context (called by CartPage after API fetch)
  function syncCart(items) {
    setCartItems(items);
  }

  async function addToCart(product) {
    try {
      const existing = cartItems.find((item) => item._id === product._id);
      
      // Check stock before making API call
      if (existing && existing.qty + 1 > product.stock) {
        toast.error("Out of stock!");
        return;
      }
      if (!existing && product.stock < 1) {
        toast.error("Out of stock!");
        return;
      }

      // Add to backend
      const res = await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });

      if (res.data.success) {
        // Update local state for immediate feedback
        setCartItems((prev) => {
          if (existing) {
            toast.success(`${product.name} quantity updated!`);
            return prev.map((item) =>
              item._id === product._id
                ? { ...item, qty: item.qty + 1 }
                : item
            );
          } else {
            toast.success(`${product.name} added to cart!`);
            return [...prev, { ...product, qty: 1 }];
          }
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please login to add items to cart.");
      } else {
        toast.error(err.response?.data?.message || "Failed to add to cart");
      }
    }
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  }

  function updateQty(productId, qty) {
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    const product = cartItems.find((item) => item._id === productId);
    if (product && qty > product.stock) {
      toast.error("Out of stock!");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, qty } : item))
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        syncCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartContextProvider");
  return ctx;
}
