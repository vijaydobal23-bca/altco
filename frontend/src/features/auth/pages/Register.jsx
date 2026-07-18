import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",    // "buyer" | "seller"
    storeName: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, role, storeName } = formData;

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (role === "seller" && !storeName.trim()) {
      toast.error("Store name is required for seller accounts.");
      return;
    }

    const result = await handleRegister(
      name,
      email,
      password,
      role,
      role === "seller" ? storeName : undefined
    );

    if (result.success) {
      toast.success("Account created! Welcome 🎉");
      const role = result.data?.user?.role;
      navigate(role === "seller" ? "/seller" : "/");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/70 border border-yellow-200/60 rounded-3xl shadow-xl p-8">
          {/* Brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center shadow-md mb-4">
              <svg className="w-7 h-7 text-stone-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Create an account</h1>
            <p className="text-sm text-stone-600 mt-1">Join ECOM as a buyer or seller</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ── Role selector ── */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-stone-700">I want to join as</p>
              <div className="grid grid-cols-2 gap-3">
                {/* Buyer */}
                <label
                  htmlFor="role-buyer"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm ${
                    formData.role === "buyer"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-yellow-200/50 bg-white/50 hover:border-yellow-300"
                  }`}
                >
                  <input
                    id="role-buyer"
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={handleChange}
                    className="accent-yellow-500 w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-bold text-stone-900">Buyer</p>
                    <p className="text-xs text-stone-500 font-medium">Shop products</p>
                  </div>
                </label>

                {/* Seller */}
                <label
                  htmlFor="role-seller"
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 shadow-sm ${
                    formData.role === "seller"
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-yellow-200/50 bg-white/50 hover:border-yellow-300"
                  }`}
                >
                  <input
                    id="role-seller"
                    type="radio"
                    name="role"
                    value="seller"
                    checked={formData.role === "seller"}
                    onChange={handleChange}
                    className="accent-yellow-500 w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-bold text-stone-900">Seller</p>
                    <p className="text-xs text-stone-500 font-medium">List products</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="reg-name" className="block text-sm font-medium text-stone-700">
                Full name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-yellow-500/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/60 transition shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="reg-email" className="block text-sm font-medium text-stone-700">
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-yellow-500/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="reg-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/60 transition shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="reg-password" className="block text-sm font-medium text-stone-700">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-yellow-500/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  id="reg-password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/60 transition shadow-sm"
                />
              </div>
            </div>

            {/* Store Name — only shown when role is seller */}
            {formData.role === "seller" && (
              <div className="space-y-1.5">
                <label htmlFor="reg-store-name" className="block text-sm font-medium text-stone-700">
                  Store name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-yellow-500/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                    </svg>
                  </span>
                  <input
                    id="reg-store-name"
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="My Awesome Store"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-yellow-200/80 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-yellow-400/60 transition shadow-sm"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-bold text-sm tracking-wide shadow-lg shadow-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-yellow-200/60" />
            <span className="text-xs text-stone-400 font-medium">Already a member?</span>
            <div className="flex-1 h-px bg-yellow-200/60" />
          </div>

          <p className="text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-500 hover:text-amber-400 font-bold transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
