import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../home.context";
import toast from "react-hot-toast";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    paymentMethod: "COD",
  });

  if (cartItems.length === 0 && !loading && !paymentStep) {
    navigate("/cart");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.address || !formData.phone) {
      toast.error("Please fill in address and phone.");
      return;
    }

    setLoading(true);
    setPaymentStep(true);

    // Fake Payment Loader
    setTimeout(async () => {
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

          await api.post("/orders", {
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
        clearCart();
        navigate("/store");
      } catch (error) {
        console.error(error);
        toast.error("Failed to place order.");
        setPaymentStep(false);
      } finally {
        setLoading(false);
      }
    }, 2500); // 2.5s fake delay
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* Fake Payment Loader Overlay */}
      {paymentStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <svg className="w-16 h-16 text-amber-400 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <h2 className="text-xl font-black text-stone-900">Processing Payment...</h2>
            <p className="text-stone-500 font-medium">Please do not refresh the page</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black text-stone-900 mb-8">Checkout</h1>

        <div className="bg-white border border-yellow-200/60 rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="123 Main St, Apartment 4B..."
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="UPI">Online Payment (UPI)</option>
              </select>
            </div>

            <div className="border-t border-stone-100 pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-500 font-bold">Amount to Pay</span>
                <span className="text-2xl font-black text-amber-500">₹{totalPrice.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-black transition-all shadow-md shadow-yellow-400/20"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
