import { useState } from "react";
import Navbar from "../components/Navbar";
import { useCheckoutPage } from "../hooks/useCheckoutPage";

/* ─── Razorpay Duplicate Modal ─────────────────────────────────────────────── */
function RazorpayModal({ amount, contact, onClose, onSuccess }) {
  const [step, setStep] = useState("methods"); // 'methods' | 'processing' | 'success'

  const handlePay = (method) => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }, 2000); // 2s processing time
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => step === "methods" && onClose()}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-blue-600 px-5 py-6 text-white relative">
          {step === "methods" && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center font-black text-blue-600 text-lg shadow-sm">
              A
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Altco Store</h3>
              <p className="text-blue-100 text-xs">Test Merchant</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-blue-100 text-sm mb-0.5">Amount to pay</p>
            <p className="text-2xl font-black">₹{amount.toLocaleString()}</p>
          </div>
        </div>

        {/* Contact Info Strip */}
        {step === "methods" && (
          <div className="bg-stone-50 px-5 py-3 flex items-center justify-between border-b border-stone-200">
            <div className="flex items-center gap-2 text-stone-600 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>{contact}</span>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="bg-white min-h-[300px]">
          {step === "methods" && (
            <div>
              <p className="px-5 py-3 text-xs font-bold text-stone-400 uppercase tracking-wider">Payment Methods</p>
              
              <button onClick={() => handlePay('upi')} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-stone-50 border-b border-stone-100 transition">
                <div className="w-10 h-10 border border-stone-200 rounded flex items-center justify-center p-1 bg-white">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="w-full h-full object-contain" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-stone-900 font-bold text-sm">UPI</p>
                  <p className="text-stone-500 text-xs mt-0.5">Google Pay, PhonePe & More</p>
                </div>
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button onClick={() => handlePay('card')} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-stone-50 border-b border-stone-100 transition">
                <div className="w-10 h-10 border border-stone-200 rounded flex items-center justify-center bg-white text-stone-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-stone-900 font-bold text-sm">Card</p>
                  <p className="text-stone-500 text-xs mt-0.5">Visa, MasterCard, RuPay</p>
                </div>
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button onClick={() => handlePay('netbanking')} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-stone-50 transition">
                <div className="w-10 h-10 border border-stone-200 rounded flex items-center justify-center bg-white text-stone-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-stone-900 font-bold text-sm">Netbanking</p>
                  <p className="text-stone-500 text-xs mt-0.5">All Indian banks</p>
                </div>
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center h-[300px] text-center px-6">
              <svg className="w-12 h-12 text-blue-600 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <h3 className="text-stone-900 font-black text-lg mb-1">Processing Payment</h3>
              <p className="text-stone-500 text-sm">Please wait while we securely process your transaction.</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center h-[300px] text-center px-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-green-600 font-black text-xl mb-1">Payment Successful</h3>
              <p className="text-stone-500 text-sm">Redirecting to store...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 p-4 flex items-center justify-center gap-2 border-t border-stone-200">
          <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Secured by RazorFake</span>
        </div>
      </div>
    </div>
  );
}
/* ──────────────────────────────────────────────────────────────────────────── */

function CheckoutPage() {
  const {
    cartItems,
    totalPrice,
    loading,
    showRazorpay,
    setShowRazorpay,
    formData,
    handleChange,
    handleCheckoutClick,
    placeOrder,
    navigate,
  } = useCheckoutPage();

  if (cartItems.length === 0 && !loading && !showRazorpay) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Navbar />
      
      {showRazorpay && (
        <RazorpayModal 
          amount={totalPrice} 
          contact={formData.phone}
          onClose={() => setShowRazorpay(false)}
          onSuccess={placeOrder}
        />
      )}

      {loading && !showRazorpay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
           <svg className="w-16 h-16 text-amber-400 animate-spin mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black text-stone-900 mb-8">Checkout</h1>

        <div className="bg-white border border-yellow-200/60 rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleCheckoutClick} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="123 Main St, Apartment 4B..."
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-stone-700">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              >
                <option value="UPI">Online Payment (Cards, UPI, Netbanking)</option>
                <option value="COD">Cash on Delivery (COD)</option>
              </select>
            </div>

            <div className="border-t border-stone-100 pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-stone-500 font-bold">Amount to Pay</span>
                <span className="text-2xl font-black text-amber-500">₹{totalPrice.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                disabled={loading || showRazorpay}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 hover:to-amber-300 text-stone-900 font-black transition-all shadow-md shadow-yellow-400/20"
              >
                {formData.paymentMethod === "UPI" ? "Pay Now securely" : "Place Order (COD)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
