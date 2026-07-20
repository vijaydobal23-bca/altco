import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchAllProducts } from "../services/home.api";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";

/* ─── Sort options ─────────────────────────────────────────────────────────── */
const SORT_OPTIONS = [
  { label: "Recommended", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
];

/* ─── Product Card ─────────────────────────────────────────────────────────── */
function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.find((i) => i._id === product._id);
  const inStock = product.stock > 0;

  // Fake discount for UI matching
  const originalPrice = Math.floor(product.price * 1.4);

  return (
    <div
      id={`store-product-${product._id}`}
      className="group relative flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-1 bg-transparent rounded-[2rem] border border-white/20 shadow-sm overflow-hidden"
    >
      {/* ── Top Right Wishlist Icon ── */}
      <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-blue-900 transition-colors">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </div>

      {/* ── Image Zone ── */}
      <div className="relative w-full aspect-[4/5] overflow-hidden border-b rounded-xl border-white/20">
        {product.images ? (
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <svg
              className="w-12 h-12 text-white/30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.5h16.5A1.5 1.5 0 0121.75 6v12a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V6a1.5 1.5 0 011.5-1.5z"
              />
            </svg>
          </div>
        )}

        {/* Subtle gradient to blend image into background */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-500 to-transparent opacity-80" />
      </div>

      {/* ── Info Zone ── */}
      <div className="flex flex-col items-center justify-center p-5 pt-2 relative z-10 text-center">
        <h3 className="text-[17px] font-serif text-white truncate w-full">
          {product.name}
        </h3>

        <div className="w-6 h-[2px] bg-white/50 my-2.5" />

        <p className="text-[10px] uppercase tracking-[0.2em] text-purple-200 font-bold">
          {product.seller?.sellerInfo?.storeName || "COLLECTION"}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="font-bold text-white">
            Rs. {product.price?.toLocaleString()}
          </span>
          <span className="text-purple-300/60 line-through text-xs">
            Rs. {originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2 w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              inStock && addToCart(product);
            }}
            disabled={!inStock}
            className={`flex-1 py-2 flex items-center justify-center text-[10px] sm:text-xs font-bold border rounded transition-colors uppercase tracking-widest ${
              inStock
                ? "bg-transparent text-white border-white/50 hover:bg-white hover:text-purple-900"
                : "bg-transparent text-white/30 border-white/20 cursor-not-allowed"
            }`}
          >
            {inCart ? "In Cart" : inStock ? "Add" : "Sold"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (inStock && !inCart) addToCart(product);
            }}
            disabled={!inStock}
            className={`flex-1 py-2 flex items-center justify-center text-[10px] sm:text-xs font-bold border rounded transition-colors uppercase tracking-widest ${
              inStock
                ? "bg-white text-purple-900 border-white hover:bg-purple-100"
                : "bg-transparent text-white/30 border-white/20 cursor-not-allowed"
            }`}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Skeleton Card ────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="flex flex-col animate-pulse bg-transparent rounded-[2rem] border border-white/20 overflow-hidden">
      <div className="w-full aspect-[4/5] bg-white/5" />
      <div className="p-5 pt-4 flex flex-col items-center">
        <div className="h-5 bg-white/10 rounded w-2/3" />
        <div className="w-6 h-[2px] bg-white/10 my-2.5" />
        <div className="h-3 bg-white/10 rounded w-1/3" />
        <div className="h-4 bg-white/10 rounded w-1/2 mt-3" />

        <div className="mt-4 flex gap-2 w-full">
          <div className="h-8 bg-white/10 rounded flex-1" />
          <div className="h-8 bg-white/10 rounded flex-1" />
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
  const [category, setCategory] = useState("all");

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
  let filtered = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());

    const productCategory =
      typeof p.category === "string" ? p.category : p.category?.name || "";
    const matchesCategory =
      category === "all" ||
      productCategory.toLowerCase().includes(category.toLowerCase()) ||
      p.name?.toLowerCase().includes(category.toLowerCase()) ||
      p.description?.toLowerCase().includes(category.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  /* Sort */
  if (sort === "price_asc")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "newest") filtered = [...filtered].reverse();

  return (
    <div className="min-h-screen bg-blue-500 text-white px-5">
      <Navbar />

      {/* ── Minimal Header ── */}
      <div className="border-b border-white/10 bg-blue-500 backdrop-blur-md pt-6 pb-4 sticky top-16 z-30">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-baseline gap-2 mb-4">
            <h1 className="text-base font-bold text-white">ALT Store</h1>
            <span className="text-sm text-blue-200">
              - {products.length} items
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar max-w-full">
              {["all", "drinks", "oats", "protein"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                    category === cat
                      ? "bg-white text-purple-900 shadow-sm"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-3 pr-8 py-2 border border-white/20 rounded text-sm w-48 sm:w-64 focus:outline-none focus:border-white transition-colors bg-white/10 text-white placeholder-purple-300"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 border border-white/20 rounded px-3 py-2 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                <span className="text-sm text-white whitespace-nowrap">
                  Sort by :{" "}
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm font-bold text-white bg-transparent focus:outline-none cursor-pointer outline-none w-full appearance-none"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option
                      key={o.value}
                      value={o.value}
                      className="text-stone-900"
                    >
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Products Grid ── */}
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-white/30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">
              {search ? "No results found" : "No products yet"}
            </h3>
            <p className="text-purple-200 text-sm mb-6">
              {search
                ? `We couldn't find anything matching "${search}".`
                : "Check back soon for new arrivals."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="px-6 py-2.5 rounded border border-white text-white font-bold text-sm hover:bg-white hover:text-purple-900 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StorePage;
