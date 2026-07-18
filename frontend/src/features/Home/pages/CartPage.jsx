import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../home.context";

function CartPage() {
  const { cartItems, removeFromCart, updateQty, totalItems, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
          <div className="w-24 h-24 rounded-3xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-stone-900 mb-2">Your cart is empty</h2>
          <p className="text-stone-500 font-medium mb-8">Looks like you haven't added anything yet.</p>
          <Link
            to="/store"
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-black transition-all shadow-md shadow-yellow-400/20"
          >
            Browse Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-stone-900">Your Cart</h1>
            <p className="text-stone-500 font-medium mt-1">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          </div>
          <button
            id="clear-cart-btn"
            onClick={clearCart}
            className="text-sm font-bold text-red-500 hover:text-red-400 transition-colors"
          >
            Clear all
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                id={`cart-item-${item._id}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-yellow-100 shadow-sm hover:border-amber-200 transition-all"
              >
                <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                  {item.images ? (
                    <img src={item.images} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-stone-900 font-black text-sm truncate">{item.name}</p>
                  <p className="text-stone-500 text-xs font-medium mt-0.5 truncate">{item.description}</p>
                  <p className="text-amber-500 font-black text-sm mt-1">₹{item.price?.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    id={`qty-dec-${item._id}`}
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="w-8 h-8 rounded-lg border border-yellow-200 flex items-center justify-center text-stone-700 hover:bg-yellow-50 font-black transition-all"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-black text-stone-900 text-sm">{item.qty}</span>
                  <button
                    id={`qty-inc-${item._id}`}
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="w-8 h-8 rounded-lg border border-yellow-200 flex items-center justify-center text-stone-700 hover:bg-yellow-50 font-black transition-all"
                  >
                    +
                  </button>
                </div>

                <div className="text-right flex-shrink-0 min-w-16">
                  <p className="text-stone-900 font-black text-sm">₹{(item.price * item.qty).toLocaleString()}</p>
                </div>

                <button
                  id={`remove-${item._id}`}
                  onClick={() => removeFromCart(item._id)}
                  className="text-stone-400 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 bg-white border border-yellow-200/60 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-black text-stone-900 mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-stone-600 font-medium truncate mr-2">{item.name} × {item.qty}</span>
                    <span className="text-stone-900 font-bold flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-yellow-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-900 font-black">Total</span>
                  <span className="text-amber-500 font-black text-xl">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                id="checkout-btn"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-black text-sm transition-all shadow-md shadow-yellow-400/20"
              >
                Proceed to Checkout →
              </button>
              <Link
                to="/store"
                className="block text-center mt-4 text-sm font-bold text-stone-500 hover:text-amber-500 transition-colors"
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
