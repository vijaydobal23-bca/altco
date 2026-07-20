import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-stone-50 border border-yellow-200/60 rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-stone-900">Edit Product</h2>
          <button id="close-modal-btn" onClick={onClose} className="text-stone-400 hover:text-stone-900 transition font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "description"].map((field) => (
            <div key={field} className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 capitalize">{field}</label>
              {field === "description" ? (
                <textarea
                  id={`edit-${field}`}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition resize-none shadow-sm"
                />
              ) : (
                <input
                  id={`edit-${field}`}
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                />
              )}
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            {["price", "stock"].map((field) => (
              <div key={field} className="space-y-1">
                <label className="block text-xs font-bold text-stone-700 capitalize">{field}</label>
                <input
                  id={`edit-${field}`}
                  type="number"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 capitalize">Category</label>
              <select
                id="edit-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
              >
                <option value="protein">Protein</option>
                <option value="oats">Oats</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700 capitalize">Quantity</label>
              <div className="flex gap-2">
                <input
                  id="edit-qty-value"
                  type="number"
                  name="qtyValue"
                  value={form.qtyValue}
                  onChange={handleChange}
                  min="0"
                  className="w-2/3 px-3 py-2.5 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                />
                <select
                  id="edit-qty-unit"
                  name="qtyUnit"
                  value={form.qtyUnit}
                  onChange={handleChange}
                  className="w-1/3 px-2 py-2.5 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                >
                  <option value="kg">kg</option>
                  <option value="gram">gram</option>
                  <option value="liter">liter</option>
                  <option value="ml">ml</option>
                </select>
              </div>
            </div>
          </div>
          <button
            id="save-edit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-bold text-sm transition-all shadow-md shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ProductList() {
  const { products, loading, loadProducts, handleUpdate, handleDelete } = useProduct();
  const navigate = useNavigate();
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  async function onDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    await handleDelete(id);
  }

  async function onSave(id, data) {
    const result = await handleUpdate(id, data);
    if (result.success) setEditTarget(null);
  }

  return (
    <div className="min-h-screen bg-white p-6 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full opacity-40 blur-3xl" />
      </div>

      {editTarget && (
        <EditModal
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={onSave}
          loading={loading}
        />
      )}

      {/* Header */}
      <div className="relative max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <button
            id="back-to-dashboard-btn"
            onClick={() => navigate("/seller")}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-bold text-sm transition-colors mb-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </button>
          <h1 className="text-2xl font-black text-stone-900">My Products</h1>
        </div>
        <Link
          to="/seller/create"
          id="add-product-link"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-bold text-sm transition-all shadow-md shadow-yellow-400/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {loading && !products.length ? (
          <div className="flex items-center justify-center h-64">
            <svg className="w-8 h-8 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <svg className="w-16 h-16 text-stone-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
            <p className="text-stone-500 font-medium text-sm">No products yet.</p>
            <Link to="/seller/create" className="mt-3 text-amber-500 hover:text-amber-400 font-bold text-sm transition-colors">
              Create your first product →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                id={`product-card-${product._id}`}
                className="backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl overflow-hidden hover:border-yellow-300/80 transition-all duration-200 group shadow-sm hover:shadow-md hover:bg-white"
              >
                {/* Product Image */}
                <div className="h-44 bg-stone-100 overflow-hidden border-b border-yellow-100/50">
                  {product.images ? (
                    <img src={product.images} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-stone-900 font-black text-sm truncate">{product.name}</h3>
                  <p className="text-stone-500 font-medium text-xs mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-amber-500 font-black text-sm">₹{product.price}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${product.stock > 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-5">
                    <button
                      id={`edit-btn-${product._id}`}
                      onClick={() => setEditTarget(product)}
                      className="flex-1 py-2 rounded-xl bg-white border border-yellow-200/60 hover:bg-yellow-50/50 text-stone-700 hover:text-stone-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      id={`delete-btn-${product._id}`}
                      onClick={() => onDelete(product._id)}
                      className="flex-1 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all border border-red-200 flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
