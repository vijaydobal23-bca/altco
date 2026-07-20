import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./useCart";
import { placeOrderApi } from "../services/home.api";
import toast from "react-hot-toast";

export function useCheckoutPage() {
  const { cartItems: contextCartItems, totalPrice: contextTotalPrice, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showRazorpay, setShowRazorpay] = useState(false);

  // If a single item was passed via router state, use it instead of the whole cart
  const singleItem = location.state?.singleItem;
  const cartItems = singleItem ? [singleItem] : contextCartItems;
  const totalPrice = singleItem ? singleItem.price * singleItem.qty : contextTotalPrice;

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    paymentMethod: "UPI", // Default to Online Payment for Razorpay
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    if (!formData.address || !formData.phone) {
      toast.error("Please fill in address and phone.");
      return;
    }

    if (formData.paymentMethod === "UPI") {
      setShowRazorpay(true);
    } else {
      placeOrder();
    }
  };

  const placeOrder = async () => {
    setLoading(true);
    try {
      // Group cart items by seller
      const sellerGroups = cartItems.reduce((acc, item) => {
        const sellerId = item.seller?._id || item.seller;
        if (!acc[sellerId]) acc[sellerId] = [];
        acc[sellerId].push(item);
        return acc;
      }, {});

      // Place an order for each seller
      const entries = Object.entries(sellerGroups).filter(
        ([sellerId]) => sellerId && sellerId !== "undefined" && sellerId !== "null"
      );

      if (entries.length === 0) {
        throw new Error("Product seller info is missing. Please re-add items to cart.");
      }

      for (const [sellerId, items] of entries) {
        const amount = items.reduce((sum, i) => sum + i.price * i.qty, 0);
        const orderItems = items.map((i) => ({
          product: i._id,
          quantity: i.qty,
        }));

        await placeOrderApi({
          sellerId,
          totalAmount: amount,
          address: formData.address,
          phone: formData.phone,
          items: orderItems,
          paymentMethod: formData.paymentMethod,
          paymentStatus: formData.paymentMethod === "UPI" ? "PAID" : "PENDING",
        });
      }

      toast.success("Order placed successfully!");
      if (singleItem) {
        removeFromCart(singleItem._id);
      } else {
        clearCart();
      }
      setShowRazorpay(false);
      navigate("/store");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
      setShowRazorpay(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    totalPrice,
    loading,
    showRazorpay,
    setShowRazorpay,
    formData,
    handleChange,
    handleCheckoutClick,
    placeOrder,
    navigate,
  };
}
