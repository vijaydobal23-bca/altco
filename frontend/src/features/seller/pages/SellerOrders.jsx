import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "") + "/api",
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
    <div className="min-h-screen bg-blue-500 text-white p-6 relative overflow-hidden pb-20">

      <div className="relative max-w-5xl mx-auto mb-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <button
            onClick={() => navigate("/seller")}
            className="flex items-center gap-2 text-blue-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors mb-4 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <h1 className="text-4xl font-serif text-white tracking-tight">Manage Orders</h1>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto space-y-6">
        {loading ? (
          <div className="flex justify-center py-32">
            <svg className="w-10 h-10 animate-spin text-white/50" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white/5 border border-white/10 rounded-2xl">
            <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
            <h3 className="text-white font-serif text-2xl mb-2">No Orders Yet</h3>
            <p className="text-blue-200 text-sm tracking-wide">When customers buy your products, they will appear here.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="relative overflow-hidden bg-white/8 border border-white/15 rounded-2xl p-5 sm:p-7 shadow-md transition-all duration-300 hover:border-white/25 hover:bg-white/10 flex flex-col md:flex-row gap-8"
            >

              <div className="flex-1 space-y-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-white font-serif text-xl">Order #{order._id.substring(order._id.length - 8)}</h3>
                    <p className="text-blue-200 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border shadow-lg
                    ${order.status === "PENDING" ? "bg-amber-500/20 text-amber-100 border-amber-500/30" :
                      order.status === "SHIPPED" ? "bg-blue-500/20 text-blue-100 border-blue-500/30" :
                      order.status === "DELIVERED" ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/30" :
                      "bg-red-500/20 text-red-100 border-red-500/30"}`}>
                    {order.status}
                  </span>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-black/15 rounded-xl border border-white/10">
                  <div>
                    <p className="text-blue-200 font-bold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-blue-300/50 inline-block"></span>
                      Customer Details
                    </p>
                    <p className="text-white font-serif text-lg">{order.user?.name || "Unknown Customer"}</p>
                    <p className="text-blue-100 text-sm mt-1">{order.phone}</p>
                    <p className="text-blue-200 text-xs mt-2 line-clamp-2 leading-relaxed">{order.destinationAddress}</p>
                  </div>
                  <div>
                    <p className="text-blue-200 font-bold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-blue-300/50 inline-block"></span>
                      Payment Info
                    </p>
                    <p className="text-white font-bold text-sm tracking-wide">{order.paymentMethod}</p>
                    <p className={`font-black text-[10px] uppercase tracking-widest mt-1 ${order.paymentStatus === "PAID" ? "text-emerald-300" : "text-amber-300"}`}>
                      {order.paymentStatus}
                    </p>
                    <p className="text-2xl font-black text-white tracking-tight mt-4">₹{order.totalAmount?.toLocaleString()}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 pt-2">
                  <p className="text-blue-200 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-6 h-[2px] bg-blue-300/50 inline-block"></span>
                    Items Ordered
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/8 transition-colors">
                        <div className="w-16 h-16 bg-black/20 rounded-xl overflow-hidden flex-shrink-0">
                          {item.product?.images ? (
                            <img src={item.product.images} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-serif text-white text-base truncate mb-1">{item.product?.name || "Unknown Product"}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-200 text-xs">Qty</span>
                            <span className="text-white font-black text-xs bg-white/10 px-2 py-0.5 rounded-md">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full md:w-56 flex flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 relative z-10">
                <p className="text-center md:text-left text-blue-200 font-bold text-[10px] uppercase tracking-widest hidden md:block mb-2">Actions</p>
                {order.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => updateStatus(order._id, "SHIPPED")}
                      className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-[10px] uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Ship Order
                    </button>
                    <button
                      onClick={() => updateStatus(order._id, "CANCELLED")}
                      className="w-full py-3.5 rounded-xl bg-red-700 hover:bg-red-600 text-white border border-red-900 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </>
                )}
                
                {order.status === "SHIPPED" && (
                  <button
                    onClick={() => updateStatus(order._id, "DELIVERED")}
                    className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-900 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Mark Delivered
                  </button>
                )}
                
                {(order.status === "DELIVERED" || order.status === "CANCELLED") && (
                  <div className="py-4 text-center">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">No actions available</p>
                  </div>
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
