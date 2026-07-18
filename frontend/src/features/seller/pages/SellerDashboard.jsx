import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProduct } from "../hooks/useProduct";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl p-5 flex items-center gap-4 shadow-sm">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-stone-500 text-xs font-bold">{label}</p>
        <p className="text-stone-900 text-xl font-black mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function SellerDashboard() {
  const { user, handleLogout } = useAuth();
  const { products, loading, loadProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function onLogout() {
    handleLogout();
    navigate("/login");
  }

  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto p-6">
        {/* Top Nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-stone-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-stone-900 font-bold text-sm">{user?.name}</p>
              <p className="text-stone-500 text-xs capitalize font-medium">{user?.role} Dashboard</p>
            </div>
          </div>
          <button
            id="logout-btn"
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-white border border-yellow-200/60 text-sm font-bold transition-all shadow-sm bg-white/50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{user?.name?.split(" ")[0]}</span> 👋
          </h1>
          <p className="text-stone-600 text-sm mt-1 font-medium">Here's what's happening with your store today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>}
            label="Total Products"
            value={loading ? "…" : products.length}
            color="bg-yellow-50"
          />
          <StatCard
            icon={<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>}
            label="Total Stock"
            value={loading ? "…" : totalStock}
            color="bg-emerald-100"
          />
          <StatCard
            icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
            label="Out of Stock"
            value={loading ? "…" : outOfStock}
            color="bg-red-100"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            to="/seller/create"
            id="quick-create-btn"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-bold text-sm transition-all shadow-md shadow-yellow-400/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Product
          </Link>
          <Link
            to="/seller/products"
            id="quick-manage-btn"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/70 hover:bg-white border border-yellow-200/60 text-stone-900 font-bold text-sm transition-all shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Manage Products
          </Link>
        </div>

        {/* Recent Products */}
        <div className="backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-stone-900">Recent Products</h2>
            <Link to="/seller/products" className="text-amber-500 hover:text-amber-400 text-sm font-bold transition-colors">
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <svg className="w-8 h-8 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-stone-500 text-sm font-medium">No products yet.</p>
              <Link to="/seller/create" className="mt-2 inline-block text-amber-500 hover:text-amber-400 text-sm font-bold transition-colors">
                Add your first product →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  id={`recent-product-${product._id}`}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/50 border border-yellow-100 hover:border-yellow-300 hover:bg-white transition-all shadow-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
                    {product.images ? (
                      <img src={product.images} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-stone-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-stone-900 text-sm font-bold truncate">{product.name}</p>
                    <p className="text-stone-500 text-xs truncate font-medium mt-0.5">{product.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-amber-500 text-sm font-black">₹{product.price}</p>
                    <p className={`text-xs font-bold mt-1 ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
