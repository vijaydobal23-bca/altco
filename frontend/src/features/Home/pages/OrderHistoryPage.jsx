import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 text-white px-5 pb-10">
      <Navbar />
      
      <div className="max-w-[1000px] mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-blue-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors mb-3"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Cart
            </Link>
            <h1 className="text-3xl font-serif text-white">Order History</h1>
            <p className="text-blue-200 text-sm mt-1">
              {orders.length} order{orders.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <svg className="w-8 h-8 animate-spin text-white/50" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center rounded-[2rem] border border-white/20 bg-white/5 shadow-sm">
              <svg className="w-12 h-12 text-white/30 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-white font-bold text-xl mb-2">No orders found</h3>
              <p className="text-blue-200 text-sm mb-6">Looks like you haven't bought anything yet.</p>
              <Link
                to="/store"
                className="px-8 py-3.5 rounded-full border border-white text-white font-bold text-sm hover:bg-white hover:text-blue-900 transition-colors tracking-widest uppercase"
              >
                Browse Store
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:border-white/40 group"
              >
                {/* Decorative Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-white/30 transition-all duration-700" />
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 sm:px-10 sm:py-8 border-b border-white/10 bg-black/5">
                  <div>
                    <h3 className="text-white font-serif text-2xl sm:text-3xl">Order #{order._id.substring(order._id.length - 8)}</h3>
                    <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                      Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md border
                        ${order.status === "PENDING" ? "bg-amber-400/20 text-amber-100 border-amber-400/50" :
                          order.status === "SHIPPED" ? "bg-blue-400/20 text-blue-100 border-blue-400/50" :
                          order.status === "DELIVERED" ? "bg-emerald-400/20 text-emerald-100 border-emerald-400/50" :
                          "bg-red-400/20 text-red-100 border-red-400/50"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                
                {/* Body Section */}
                <div className="p-6 sm:p-10 space-y-8">
                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-[2px] bg-white/50" />
                        <p className="text-blue-200 font-bold text-xs uppercase tracking-[0.2em]">Delivery Details</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <p className="text-white font-bold text-lg mb-1">{order.phone}</p>
                        <p className="text-blue-100 text-sm leading-relaxed opacity-80">{order.destinationAddress}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-[2px] bg-white/50" />
                        <p className="text-blue-200 font-bold text-xs uppercase tracking-[0.2em]">Payment Summary</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Method</p>
                            <p className="text-white font-bold">{order.paymentMethod}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                            <p className={`font-black text-xs uppercase tracking-widest ${order.paymentStatus === "PAID" ? "text-emerald-300" : "text-amber-300"}`}>
                              {order.paymentStatus}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Total Amount</p>
                          <p className="text-3xl font-black text-white tracking-tight">Rs. {order.totalAmount?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-[2px] bg-white/50" />
                      <p className="text-blue-200 font-bold text-xs uppercase tracking-[0.2em]">Items Ordered ({order.items?.length || 0})</p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="group/item flex items-center gap-4 bg-black/20 border border-white/10 p-3 rounded-[1.5rem] hover:bg-white/10 transition-all duration-300">
                          <div className="w-20 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 relative">
                            {item.product?.images ? (
                              <img src={item.product.images} alt={item.product.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="font-serif text-white text-lg truncate mb-1">{item.product?.name || "Unknown Product"}</h4>
                            <div className="flex items-center gap-3">
                              <span className="text-blue-200 text-sm font-bold">Rs. {item.product?.price?.toLocaleString() || 0}</span>
                              <span className="text-white/30 text-xs">×</span>
                              <span className="text-white font-black text-sm bg-white/10 px-2 py-0.5 rounded-md">{item.quantity}</span>
                            </div>
                          </div>
                          <div className="pr-4 text-right hidden sm:block">
                            <p className="text-white font-bold text-sm">Rs. {((item.product?.price || 0) * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
