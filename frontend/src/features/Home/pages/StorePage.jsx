import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchAllProducts } from "../services/home.api";
import { useCart } from "../home.context";
import toast from "react-hot-toast";

/* ─── Sort options ─────────────────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { label: "Featured", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
];

/* ─── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.find((i) => i._id === product._id);
  const inStock = product.stock > 0;

  return (
    <div
      id={`store-product-${product._id}`}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm
                 hover:shadow-xl hover:border-amber-200/80 transition-all duration-400 flex flex-col
                 hover:-translate-y-1"
    >
      {/* ── Image Zone ── */}
      <div className="relative h-60 bg-gradient-to-br from-stone-50 to-amber-50/40 overflow-hidden">
        {product.images ? (
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-14 h-14 text-stone-200" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.5h16.5A1.5 1.5 0 0121.75 6v12a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V6a1.5 1.5 0 011.5-1.5z" />
            </svg>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick-add button — slides up on hover */}
        {inStock && (
          <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              id={`quick-add-${product._id}`}
              onClick={() => addToCart(product)}
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400
                         hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-black text-sm
                         transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {inCart ? "Add Another" : "Add to Cart"}
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {!inStock && (
            <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-sm text-red-500 text-xs font-black shadow-sm border border-red-100">
              Sold Out
            </span>
          )}
          {inCart && (
            <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-stone-900 text-xs font-black shadow-sm">
              In Cart ✓
            </span>
          )}
        </div>

        {/* Stock count — top right */}
        {inStock && product.stock <= 5 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-sm text-amber-600 text-xs font-black shadow-sm border border-yellow-200">
            Only {product.stock} left!
          </span>
        )}
      </div>

      {/* ── Info Zone ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Store name */}
        {product.seller?.sellerInfo?.storeName && (
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
            <p className="text-xs font-bold text-amber-600 truncate">{product.seller.sellerInfo.storeName}</p>
          </div>
        )}

        <h3 className="text-stone-900 font-black text-sm mb-1.5 line-clamp-2 leading-snug">{product.name}</h3>
        <p className="text-stone-400 text-xs font-medium line-clamp-2 mb-4 leading-relaxed flex-1">{product.description}</p>

        {/* Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div>
            <span className="text-xl font-black text-stone-900">₹{product.price?.toLocaleString()}</span>
          </div>

          <button
            id={`buy-now-${product._id}`}
            onClick={() => inStock && addToCart(product)}
            disabled={!inStock}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all
              ${inStock
                ? "bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 shadow-sm shadow-amber-400/20 hover:shadow-md hover:shadow-amber-400/30"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
              }`}
          >
            {inStock ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now
              </>
            ) : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Card ────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm animate-pulse">
      <div className="h-60 bg-stone-100" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-stone-100 rounded-full w-1/3" />
        <div className="h-4 bg-stone-100 rounded-full w-3/4" />
        <div className="h-3 bg-stone-100 rounded-full w-full" />
        <div className="h-3 bg-stone-100 rounded-full w-5/6" />
        <div className="flex justify-between items-center pt-3 border-t border-stone-100">
          <div className="h-6 bg-stone-100 rounded-full w-1/4" />
          <div className="h-8 bg-stone-100 rounded-xl w-1/4" />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────────── */
function StorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchAllProducts();
        setProducts(data.products || []);
      } catch (err) {
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* Filter */
  let filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  /* Sort */
  if (sort === "price_asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "newest") filtered = [...filtered].reverse();

  const inStockCount = products.filter((p) => p.stock > 0).length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="relative bg-white border-b border-stone-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[500px] h-full bg-gradient-to-l from-amber-50 to-transparent" />
          <div className="absolute right-32 top-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl" />
          <div className="absolute right-0 bottom-0 w-px h-full bg-yellow-200 translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-px bg-amber-400" />
                <span className="text-amber-600 text-xs font-black tracking-widest uppercase">Collection</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-stone-900 tracking-tight mb-3">
                Our Store
              </h1>
              <p className="text-stone-500 font-medium text-base max-w-md">
                Carefully curated products from our verified sellers. Quality guaranteed.
              </p>
              {/* Stats pills */}
              <div className="flex flex-wrap gap-3 mt-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {products.length} Products
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {inStockCount} In Stock
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  id="store-search"
                  type="text"
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900
                             placeholder-stone-400 text-sm font-medium focus:outline-none focus:ring-2
                             focus:ring-amber-400/50 focus:border-amber-400/50 transition shadow-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-4 flex items-center text-stone-400 hover:text-stone-700 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Controls Bar ── */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Result count */}
          <p className="text-stone-500 text-sm font-bold hidden sm:block">
            {loading ? "Loading…" : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
          </p>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort */}
            <select
              id="store-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm font-bold text-stone-700 bg-transparent border border-stone-200 rounded-xl px-3 py-1.5
                         focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* View toggle */}
            <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
              <button
                id="view-grid"
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-amber-400 text-stone-900" : "text-stone-400 hover:bg-stone-50"}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </button>
              <button
                id="view-list"
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list" ? "bg-amber-400 text-stone-900" : "text-stone-400 hover:bg-stone-50"}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-3xl bg-stone-50 border border-stone-200 flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-stone-300" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-stone-900 font-black text-xl mb-2">
              {search ? "No results found" : "No products yet"}
            </h3>
            <p className="text-stone-400 font-medium text-sm mb-6">
              {search ? `We couldn't find anything matching "${search}".` : "Check back soon — our sellers are adding products."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 text-stone-900 font-black text-sm transition-all"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-4">
            {filtered.map((product) => (
              <ListCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── List Card ─────────────────────────────────────────────────────────────── */
function ListCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.find((i) => i._id === product._id);
  const inStock = product.stock > 0;

  return (
    <div
      id={`store-list-${product._id}`}
      className="group flex items-center gap-5 p-4 bg-white rounded-3xl border border-stone-100
                 shadow-sm hover:shadow-md hover:border-amber-200/70 transition-all duration-300"
    >
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-stone-50 to-amber-50 overflow-hidden flex-shrink-0 border border-stone-100">
        {product.images ? (
          <img src={product.images} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-stone-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {product.seller?.sellerInfo?.storeName && (
          <p className="text-xs font-bold text-amber-500 mb-0.5">{product.seller.sellerInfo.storeName}</p>
        )}
        <h3 className="text-stone-900 font-black text-sm truncate">{product.name}</h3>
        <p className="text-stone-400 text-xs font-medium line-clamp-1 mt-0.5">{product.description}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${inStock ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-500 border border-red-200"}`}>
            {inStock ? `${product.stock} in stock` : "Sold out"}
          </span>
          {inCart && (
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-50 text-amber-600 border border-amber-200">
              In cart ✓
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="text-lg font-black text-stone-900">₹{product.price?.toLocaleString()}</span>
        <button
          id={`list-buy-${product._id}`}
          onClick={() => inStock && addToCart(product)}
          disabled={!inStock}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all
            ${inStock
              ? "bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 shadow-sm shadow-amber-400/20"
              : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}
        >
          {inStock ? "Buy Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}

export default StorePage;
