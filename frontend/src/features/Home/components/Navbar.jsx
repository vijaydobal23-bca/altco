import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCart } from "../home.context";

function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-yellow-200/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-300 to-amber-400 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-stone-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-lg font-black text-stone-900 tracking-tight">ECOM</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <Link
            id="nav-home"
            to="/"
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive("/")
                ? "bg-yellow-100 text-amber-700"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
            }`}
          >
            Home
          </Link>
          <Link
            id="nav-store"
            to="/store"
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive("/store")
                ? "bg-yellow-100 text-amber-700"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
            }`}
          >
            Store
          </Link>
          {user ? (
            <Link
              id="nav-dashboard"
              to={user.role === "seller" ? "/seller" : "/"}
              className="px-4 py-2 rounded-xl text-sm font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              id="nav-login"
              to="/login"
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive("/login")
                  ? "bg-yellow-100 text-amber-700"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Cart Icon */}
        <Link
          id="nav-cart"
          to="/cart"
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-bold text-sm transition-all shadow-sm shadow-yellow-400/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stone-900 text-white text-xs font-black flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
