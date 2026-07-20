import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import toast from "react-hot-toast";

function CreateProduct() {
  const navigate = useNavigate();
  const { handleCreate, loading } = useProduct();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "protein",
    qtyValue: "",
    qtyUnit: "kg",
  });
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, description, price, stock, category, qtyValue, qtyUnit } = formData;

    if (!name || !description || !price || !stock || !category || !qtyValue) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!imageFile) {
      toast.error("Please select a product image.");
      return;
    }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("price", price);
    fd.append("stock", stock);
    fd.append("category", category);
    fd.append("qty", `${qtyValue} ${qtyUnit}`);
    fd.append("image", imageFile);

    const result = await handleCreate(fd);
    if (result.success) {
      navigate("/seller/products");
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full opacity-40 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <button
          id="back-btn"
          onClick={() => navigate("/seller")}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-bold text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl shadow-xl p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">Add New Product</h1>
            <p className="text-sm text-stone-500 font-medium mt-1">Fill in the details to list your product</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Product Image</label>
              <div
                id="image-upload-area"
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center h-48 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                  preview ? "border-amber-400 bg-white" : "border-yellow-300 bg-white/50 hover:border-amber-400 hover:bg-white"
                }`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-xl p-2" />
                ) : (
                  <>
                    <svg className="w-10 h-10 text-amber-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.5h16.5A1.5 1.5 0 0121.75 6v12a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V6a1.5 1.5 0 011.5-1.5z" />
                    </svg>
                    <p className="text-sm font-bold text-stone-600">Click to upload image</p>
                    <p className="text-xs font-medium text-stone-400 mt-1">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
              <input
                id="image-file-input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Product Name */}
            <div className="space-y-1.5">
              <label htmlFor="product-name" className="block text-sm font-bold text-stone-700">Product Name</label>
              <input
                id="product-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Headphones"
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="product-description" className="block text-sm font-bold text-stone-700">Description</label>
              <textarea
                id="product-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition resize-none shadow-sm"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="product-price" className="block text-sm font-bold text-stone-700">Price (₹)</label>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="product-stock" className="block text-sm font-bold text-stone-700">Stock</label>
                <input
                  id="product-stock"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                />
              </div>
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="product-category" className="block text-sm font-bold text-stone-700">Category</label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                >
                  <option value="protein">Protein</option>
                  <option value="oats">Oats</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-stone-700">Quantity</label>
                <div className="flex gap-2">
                  <input
                    id="product-qty-value"
                    type="number"
                    name="qtyValue"
                    value={formData.qtyValue}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    min="0"
                    className="w-2/3 px-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                  />
                  <select
                    id="product-qty-unit"
                    name="qtyUnit"
                    value={formData.qtyUnit}
                    onChange={handleChange}
                    className="w-1/3 px-2 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition shadow-sm"
                  >
                    <option value="kg">kg</option>
                    <option value="gram">gram</option>
                    <option value="liter">liter</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              id="create-product-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-bold text-sm tracking-wide shadow-lg shadow-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Uploading…
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
