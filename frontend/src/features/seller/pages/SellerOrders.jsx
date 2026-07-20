import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId, newStatus) {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/seller")}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-bold text-sm transition-colors mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <h1 className="text-2xl font-black text-stone-900">Manage Orders</h1>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="w-8 h-8 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl">
            <h3 className="text-stone-900 font-black text-lg mb-1">No Orders Yet</h3>
            <p className="text-stone-500 font-medium text-sm">When customers buy your products, they will appear here.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
            >
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-stone-900 font-black text-sm">Order ID: {order._id.substring(order._id.length - 8)}</h3>
                    <p className="text-stone-500 text-xs font-medium">Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-black
                    ${order.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                      order.status === "SHIPPED" ? "bg-blue-100 text-blue-700" :
                      order.status === "DELIVERED" ? "bg-emerald-100 text-emerald-700" :
                      "bg-red-100 text-red-700"}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm bg-white/50 p-4 rounded-2xl border border-stone-100">
                  <div>
                    <p className="text-stone-400 font-medium text-xs">Customer Details</p>
                    <p className="text-stone-900 font-bold">{order.user?.username || "Unknown Customer"}</p>
                    <p className="text-stone-600">{order.phone}</p>
                    <p className="text-stone-600 mt-1 line-clamp-2">{order.destinationAddress}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 font-medium text-xs">Payment Info</p>
                    <p className="text-stone-900 font-bold">{order.paymentMethod}</p>
                    <p className={`font-bold mt-1 ${order.paymentStatus === "PAID" ? "text-emerald-600" : "text-amber-600"}`}>
                      {order.paymentStatus}
                    </p>
                    <p className="text-lg font-black text-stone-900 mt-2">₹{order.totalAmount?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-stone-700 font-bold text-sm">Items Ordered:</p>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-white border border-stone-100 p-2.5 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden border border-stone-200">
                          {item.product?.images ? (
                            <img src={item.product.images} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-stone-200" />
                          )}
                        </div>
                        <span className="font-bold text-stone-900">{item.product?.name || "Unknown Product"}</span>
                      </div>
                      <span className="text-stone-500 font-medium">Qty: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full md:w-48 flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6">
                {order.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateStatus(order._id, "SHIPPED")}
                      className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-bold transition-colors border border-blue-200"
                    >
                      Mark as Shipped
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "CANCELLED")}
                      className="w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold transition-colors border border-red-200"
                    >
                      Cancel Order
                    </button>
                  </>
                )}
                
                {order.status === "SHIPPED" && (
                  <button
                    onClick={() => updateStatus(order._id, "DELIVERED")}
                    className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-sm font-bold transition-colors border border-emerald-200"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SellerOrders;
