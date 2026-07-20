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
      navigate("/seller"); // Navigate directly back to the dashboard now
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 text-white p-6 relative overflow-hidden pb-20">
      {/* Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-400/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="relative max-w-2xl mx-auto mb-8 pt-6">
        <button
          onClick={() => navigate("/seller")}
          className="flex items-center gap-2 text-blue-200 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 w-fit"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[2.5rem] shadow-2xl p-8 sm:p-10">
          
          {/* Title */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-2">Add New Product</h1>
            <p className="text-sm text-blue-200 font-medium tracking-wide">Fill in the details below to list a new item on the store.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Product Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center h-48 rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                  preview ? "border-white/40 bg-black/20" : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-2xl p-2" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.5h16.5A1.5 1.5 0 0121.75 6v12a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V6a1.5 1.5 0 011.5-1.5z" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-white tracking-wide">Click to upload image</p>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200 mt-2">PNG, JPG up to 5MB</p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Product Name */}
            <div className="space-y-1.5">
              <label htmlFor="product-name" className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Product Name</label>
              <input
                id="product-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Headphones"
                className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-sm"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="product-description" className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Description</label>
              <textarea
                id="product-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product..."
                rows={3}
                className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition resize-none shadow-sm"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="product-price" className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Price (₹)</label>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="product-stock" className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Stock</label>
                <input
                  id="product-stock"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-sm"
                />
              </div>
            </div>

            {/* Category & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="product-category" className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest">Category</label>
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-sm appearance-none"
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
                    id="product-qty-value"
                    type="number"
                    name="qtyValue"
                    value={formData.qtyValue}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    min="0"
                    className="w-2/3 px-5 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-blue-300/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-sm"
                  />
                  <select
                    id="product-qty-unit"
                    name="qtyUnit"
                    value={formData.qtyUnit}
                    onChange={handleChange}
                    className="w-1/3 px-3 py-4 rounded-2xl bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition shadow-sm appearance-none text-center"
                  >
                    <option value="kg" className="text-black">kg</option>
                    <option value="gram" className="text-black">g</option>
                    <option value="liter" className="text-black">L</option>
                    <option value="ml" className="text-black">ml</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-6 rounded-full bg-white text-blue-900 font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Uploading…
                </>
              ) : (
                "Publish Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
