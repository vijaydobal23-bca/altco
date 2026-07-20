import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useProduct } from "../hooks/useProduct";

function StatCard({ icon, label, value }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-5 flex items-center gap-4 shadow-sm hover:bg-white/20 transition-colors">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 text-white shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-white text-2xl font-black mt-1">{value}</p>
      </div>
    </div>
  );
}

function EditModal({ product, onClose, onSave, loading }) {
  const [form, setForm] = useState(() => {
    const qtyParts = (product.qty || "").split(" ");
    return {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category || "protein",
      qtyValue: qtyParts[0] || "",
      qtyUnit: qtyParts[1] || "kg",
    };
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { ...form, qty: `${form.qtyValue} ${form.qtyUnit}` };
    delete data.qtyValue;
    delete data.qtyUnit;
    onSave(product._id, data);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-blue-600/90 border border-white/20 rounded-[2rem] shadow-2xl p-8 relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h2 className="text-2xl font-serif text-white">Edit Product</h2>
          <button onClick={onClose} className="text-blue-200 hover:text-white transition font-bold bg-white/10 p-2 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {["name", "description"].map((field) => (
            <div key={field} className="space-y-1.5">
              <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">{field}</label>
              {field === "description" ? (
                <textarea
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition resize-none placeholder-blue-300/50"
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition placeholder-blue-300/50"
                />
              )}
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {["price", "stock"].map((field) => (
              <div key={field} className="space-y-1.5">
                <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">{field}</label>
                <input
                  type="number"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition placeholder-blue-300/50"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition appearance-none"
              >
                <option value="protein" className="text-black">Protein</option>
                <option value="oats" className="text-black">Oats</option>
                <option value="drinks" className="text-black">Drinks</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Quantity</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="qtyValue"
                  value={form.qtyValue}
                  onChange={handleChange}
                  min="0"
                  className="w-2/3 px-3 py-3 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                />
                <select
                  name="qtyUnit"
                  value={form.qtyUnit}
                  onChange={handleChange}
                  className="w-1/3 px-2 py-3 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition appearance-none text-center"
                >
                  <option value="kg" className="text-black">kg</option>
                  <option value="gram" className="text-black">g</option>
                  <option value="liter" className="text-black">L</option>
                  <option value="ml" className="text-black">ml</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SellerDashboard() {
  const { user, handleLogout } = useAuth();
  const { products, loading, loadProducts, handleUpdate, handleDelete } = useProduct();
  const navigate = useNavigate();
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function onLogout() {
    handleLogout();
    navigate("/login");
  }

  async function onDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    await handleDelete(id);
  }

  async function onSave(id, data) {
    const result = await handleUpdate(id, data);
    if (result.success) setEditTarget(null);
  }

  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-blue-500 text-white relative overflow-hidden pb-20">
      
      {editTarget && (
        <EditModal
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={onSave}
          loading={loading}
        />
      )}

      {/* Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-400/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto p-6 pt-10">
        
        {/* Top Nav */}
        <div className="flex items-center justify-between mb-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg">{user?.name}</p>
              <p className="text-blue-200 text-[10px] uppercase tracking-[0.2em]">{user?.role} Dashboard</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-serif text-white mb-2">
            Welcome, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-blue-100 text-sm tracking-wide">Manage your elegant storefront from one place.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" /></svg>}
            label="Total Products"
            value={loading ? "…" : products.length}
          />
          <StatCard
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>}
            label="Total Stock"
            value={loading ? "…" : totalStock}
          />
          <StatCard
            icon={<svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
            label="Out of Stock"
            value={loading ? "…" : outOfStock}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-12">
          <Link
            to="/seller/create"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-900 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create Product
          </Link>
          <Link
            to="/seller/orders"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-widest transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Manage Orders
          </Link>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-serif text-white">Your Products</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent ml-4" />
          </div>

          {loading && !products.length ? (
            <div className="flex items-center justify-center h-64">
              <svg className="w-10 h-10 animate-spin text-white/50" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center border border-white/10 rounded-[2rem] bg-white/5">
              <svg className="w-16 h-16 text-white/20 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
              <p className="text-blue-200 font-bold tracking-widest uppercase text-sm mb-4">No products yet.</p>
              <Link to="/seller/create" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold text-xs uppercase tracking-widest transition-colors">
                Add your first product
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group relative flex flex-col backdrop-blur-xl bg-white/10 border border-white/20 rounded-[2rem] overflow-hidden hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]"
                >
                  {/* Image */}
                  <div className="h-48 w-full bg-black/20 overflow-hidden relative">
                    {product.images ? (
                      <img src={product.images} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-600/80 to-transparent opacity-80" />
                    <span className={`absolute top-4 right-4 text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-widest backdrop-blur-md border ${product.stock > 0 ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/30" : "bg-red-500/20 text-red-100 border-red-500/30"}`}>
                      {product.stock > 0 ? `${product.stock} left` : "Empty"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 pt-2 flex flex-col flex-1 relative z-10">
                    <h3 className="text-white font-serif text-xl mb-1 truncate">{product.name}</h3>
                    <p className="text-blue-200 text-xs line-clamp-2 leading-relaxed mb-4 flex-1">{product.description}</p>
                    <p className="text-white font-black text-2xl mb-6">₹{product.price}</p>
                    
                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => setEditTarget(product)}
                        className="flex-1 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-blue-900 border border-white/20 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(product._id)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white border border-red-500/30 transition-colors flex-shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
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
