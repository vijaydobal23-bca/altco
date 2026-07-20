import { createContext, useState, useEffect } from "react";
import { getCart } from "./services/home.api";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Fetch initial cart exactly once
  useEffect(() => {
    async function initCart() {
      try {
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
        }
      } catch (err) {
        console.error("Failed to load initial cart", err);
      }
    }
    initCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
