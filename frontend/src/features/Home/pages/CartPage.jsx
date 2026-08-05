import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useCartPage } from "../hooks/useCartPage";

function CartPage() {
  const {
    cartItems,
    loading,
    actionLoading,
    totalItems,
    totalPrice,
    handleRemove,
    handleUpdateQty,
    handleClearCart,
    navigate,
  } = useCartPage();

  if (loading) {
    return (
      <div className="min-h-screen bg-bluee-500 ">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <svg
            className="w-8 h-8 animate-spin text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-blue-500 text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
          <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-white/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-purple-200 text-sm mb-8">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/store"
            className="px-8 py-3.5 rounded-full border border-white text-white font-bold text-sm hover:bg-white hover:text-purple-900 transition-colors tracking-widest uppercase"
          >
            Browse Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-500 text-white">
      <Navbar />
      <div className="max-w-[1200px] mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif text-white">Your Cart</h1>
            <p className="text-purple-200 text-sm mt-1">
              {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/orders"
              className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white bg-white/10 hover:bg-white hover:text-purple-900 border border-white/20 px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              Order History
            </Link>

            <Link
              to="/notifications"
              className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-white bg-white/10 hover:bg-white hover:text-purple-900 border border-white/20 px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              notification
            </Link>
            <button
              id="clear-cart-btn"
              onClick={handleClearCart}
              disabled={actionLoading}
              className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-purple-200 hover:text-white transition-colors disabled:opacity-50"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                id={`cart-item-${item._id}`}
                className="group relative flex flex-col transition-all duration-500 hover:-translate-y-1 bg-transparent rounded-[2rem] border border-white/20 shadow-sm overflow-hidden"
              >
                {/* ── Top Right Remove Icon ── */}
                <button
                  onClick={() => handleRemove(item._id)}
                  disabled={actionLoading}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-purple-900 transition-colors disabled:opacity-50"
                  title="Remove from cart"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* ── Image Zone ── */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  {item.images ? (
                    <img
                      src={item.images}
                      alt={item.name}
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
                <div className="flex flex-col p-4 pt-3 relative z-10 w-full">
                  <div className="flex justify-between items-end w-full mb-1">
                    <div className="flex flex-col min-w-0 pr-3 text-left">
                      <h3 className="text-base font-serif text-white truncate w-full">
                        {item.name}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-purple-200 font-bold mt-0.5 truncate w-full">
                        {item.description || "ITEM"}
                      </p>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="font-bold text-white text-sm">
                        Rs. {item.price?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Buy Controls */}
                  <div className="mt-3 flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between w-full border border-white/20 rounded-full px-2 py-1">
                      <button
                        onClick={() => handleUpdateQty(item._id, item.qty - 1)}
                        disabled={actionLoading}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 font-black transition-all disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="font-bold text-white text-xs">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item._id, item.qty + 1)}
                        disabled={actionLoading}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-white/10 font-black transition-all disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center justify-between w-full px-2 py-1">
                      <span className="text-[10px] text-purple-200 uppercase tracking-widest font-bold">
                        Subtotal
                      </span>
                      <span className="text-sm text-white font-bold">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/checkout", { state: { singleItem: item } })
                      }
                      className="w-full py-2 flex items-center justify-center text-[10px] sm:text-xs font-bold border rounded-full transition-colors uppercase tracking-widest bg-white text-purple-900 border-white hover:bg-purple-100"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 bg-transparent border border-white/20 rounded-[2rem] p-6 shadow-sm">
              <h2 className="text-xl font-serif text-white mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-purple-200 font-medium truncate mr-2">
                      {item.name} × {item.qty}
                    </span>
                    <span className="text-white font-bold flex-shrink-0">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white font-bold text-lg">Total</span>
                  <span className="text-white font-bold text-xl">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                id="checkout-btn"
                className="w-full py-3.5 rounded-full bg-white text-purple-900 font-bold text-[11px] uppercase tracking-widest transition-all shadow-md block text-center hover:bg-purple-100"
              >
                Proceed to Checkout →
              </Link>
              <Link
                to="/store"
                className="block text-center mt-4 text-[11px] font-bold uppercase tracking-widest text-purple-300 hover:text-white transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
