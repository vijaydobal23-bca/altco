import { useState } from "react";
import Navbar from "./Navbar";
import { useCheckoutPage } from "../hooks/useCheckoutPage";

/* ─── Animated Icons ─────────────────────────────────────────────────────── */
const IconUPI = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <rect width="48" height="48" rx="10" fill="#5E35B1" />
    <text x="50%" y="58%" textAnchor="middle" fontSize="18" fontWeight="bold" fill="white" dominantBaseline="middle">U</text>
  </svg>
);

const IconCard = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <rect width="48" height="48" rx="10" fill="#1565C0" />
    <rect x="6" y="14" width="36" height="24" rx="4" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
    <rect x="6" y="20" width="36" height="6" fill="white" fillOpacity="0.3" />
    <rect x="10" y="30" width="8" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
    <rect x="22" y="30" width="5" height="3" rx="1.5" fill="white" fillOpacity="0.7" />
  </svg>
);

const IconNetbanking = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <rect width="48" height="48" rx="10" fill="#00695C" />
    <path d="M24 10L38 18H10L24 10Z" fill="white" fillOpacity="0.8" />
    <rect x="12" y="20" width="4" height="14" rx="1" fill="white" fillOpacity="0.8" />
    <rect x="22" y="20" width="4" height="14" rx="1" fill="white" fillOpacity="0.8" />
    <rect x="32" y="20" width="4" height="14" rx="1" fill="white" fillOpacity="0.8" />
    <rect x="10" y="34" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.8" />
  </svg>
);

const IconCOD = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
    <rect width="48" height="48" rx="10" fill="#E65100" />
    <circle cx="24" cy="24" r="12" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
    <text x="50%" y="54%" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" dominantBaseline="middle">₹</text>
  </svg>
);

/* ─── Payment Modal ──────────────────────────────────────────────────────── */
function PaymentModal({ amount, contact, onClose, onSuccess }) {
  const [step, setStep] = useState("methods");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [bank, setBank] = useState("");

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      setTimeout(onSuccess, 1200);
    }, 2200);
  };

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const methodReady = () => {
    if (selectedMethod === "upi") return upiId.length > 5;
    if (selectedMethod === "card") return cardData.number.replace(/\s/g,"").length === 16 && cardData.expiry.length === 5 && cardData.cvv.length === 3 && cardData.name.length > 2;
    if (selectedMethod === "netbanking") return bank !== "";
    return false;
  };

  const banks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Bank", "Bank of Baroda", "Punjab National Bank", "Canara Bank"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => step === "methods" && onClose()}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0f0f13] rounded-2xl shadow-2xl overflow-hidden border border-white/10"
        style={{ animation: "modalIn 0.25s cubic-bezier(.34,1.56,.64,1)" }}>
        
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-amber-500/30">
                A
              </div>
              <div>
                <p className="font-bold text-white text-sm">Altco Store</p>
                <p className="text-white/50 text-xs">Secure Checkout</p>
              </div>
            </div>
            {step === "methods" && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Amount */}
          <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/50 text-xs mb-1">Amount to Pay</p>
            <div className="flex items-baseline gap-1">
              <span className="text-white/70 text-lg">₹</span>
              <span className="text-3xl font-black text-white tracking-tight">{amount.toLocaleString()}</span>
            </div>
            <p className="text-white/40 text-xs mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
              256-bit SSL Encrypted · {contact}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === "methods" && (
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Choose Payment Method</p>

              <div className="space-y-2">
                {[
                  { id: "upi", label: "UPI", sub: "Pay via any UPI app", Icon: IconUPI },
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, MasterCard, RuPay", Icon: IconCard },
                  { id: "netbanking", label: "Net Banking", sub: "All Indian Banks", Icon: IconNetbanking },
                ].map(({ id, label, sub, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedMethod(selectedMethod === id ? null : id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left ${
                      selectedMethod === id
                        ? "border-amber-400/60 bg-amber-400/8 shadow-md shadow-amber-400/10"
                        : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <Icon />
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{label}</p>
                      <p className="text-white/40 text-xs">{sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedMethod === id ? "border-amber-400 bg-amber-400" : "border-white/20"
                    }`}>
                      {selectedMethod === id && (
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* UPI Input */}
              {selectedMethod === "upi" && (
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10"
                  style={{ animation: "slideDown 0.2s ease" }}>
                  <label className="text-white/60 text-xs font-semibold mb-2 block">Enter UPI ID</label>
                  <div className="flex gap-2">
                    <input
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/60 focus:bg-white/15 transition-all"
                    />
                    <button className="px-3 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 rounded-lg text-purple-300 text-xs font-semibold transition-colors">
                      Verify
                    </button>
                  </div>

                </div>
              )}

              {/* Card Input */}
              {selectedMethod === "card" && (
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
                  style={{ animation: "slideDown 0.2s ease" }}>
                  {/* Card Preview */}
                  <div className="relative h-36 rounded-xl overflow-hidden p-5"
                    style={{ background: "linear-gradient(135deg, #1565C0 0%, #0d47a1 50%, #311b92 100%)" }}>
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: "radial-gradient(circle at 70% 20%, white 0%, transparent 50%)" }} />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-6 rounded bg-amber-400/80 flex items-center justify-center">
                          <div className="w-5 h-4 rounded bg-amber-500/60" />
                        </div>
                        <svg className="w-12 text-white/60" viewBox="0 0 60 24" fill="none">
                          <circle cx="22" cy="12" r="10" fill="#EB001B" fillOpacity="0.8" />
                          <circle cx="38" cy="12" r="10" fill="#F79E1B" fillOpacity="0.8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">Card Number</p>
                        <p className="text-white font-mono text-base tracking-widest">
                          {cardData.number || "•••• •••• •••• ••••"}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/40 text-xs">Card Holder</p>
                          <p className="text-white text-sm font-semibold">{cardData.name || "YOUR NAME"}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs">Expiry</p>
                          <p className="text-white text-sm font-semibold">{cardData.expiry || "MM/YY"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <input
                    value={cardData.number}
                    onChange={e => setCardData(d => ({ ...d, number: formatCardNumber(e.target.value) }))}
                    placeholder="Card Number"
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm font-mono placeholder-white/30 focus:outline-none focus:border-amber-400/60 transition-all"
                  />
                  <input
                    value={cardData.name}
                    onChange={e => setCardData(d => ({ ...d, name: e.target.value.toUpperCase() }))}
                    placeholder="Name on Card"
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/60 transition-all"
                  />
                  <div className="flex gap-3">
                    <input
                      value={cardData.expiry}
                      onChange={e => setCardData(d => ({ ...d, expiry: formatExpiry(e.target.value) }))}
                      placeholder="MM/YY"
                      className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/60 transition-all"
                    />
                    <input
                      value={cardData.cvv}
                      onChange={e => setCardData(d => ({ ...d, cvv: e.target.value.replace(/\D/g,"").slice(0,3) }))}
                      placeholder="CVV"
                      type="password"
                      className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-400/60 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Netbanking Input */}
              {selectedMethod === "netbanking" && (
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10"
                  style={{ animation: "slideDown 0.2s ease" }}>
                  <label className="text-white/60 text-xs font-semibold mb-2 block">Select Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {banks.map(b => (
                      <button
                        key={b}
                        onClick={() => setBank(b)}
                        className={`py-2.5 px-3 rounded-lg text-xs text-left border transition-all ${
                          bank === b ? "border-amber-400/60 bg-amber-400/10 text-amber-300" : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pay Button */}
              {selectedMethod && (
                <button
                  onClick={handlePay}
                  disabled={!methodReady()}
                  className="mt-5 w-full py-4 rounded-xl font-black text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: methodReady()
                      ? "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
                      : "#333",
                    color: "white",
                    boxShadow: methodReady() ? "0 8px 25px rgba(245,158,11,0.35)" : "none",
                    animation: methodReady() ? "pulse-glow 2s infinite" : "none",
                  }}
                >
                  Pay ₹{amount.toLocaleString()} →
                </button>
              )}
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-400 animate-spin" />
                <div className="absolute inset-3 rounded-full bg-amber-400/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white font-black text-xl mb-2">Processing Payment</h3>
              <p className="text-white/50 text-sm">Securely verifying your transaction...</p>
              <div className="flex gap-1.5 mt-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-amber-400"
                    style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full bg-green-500/20" style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }} />
                <div className="relative w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-green-400 font-black text-xl mb-2">Payment Successful!</h3>
              <p className="text-white/50 text-sm">Redirecting to your orders...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
          <span className="text-xs text-white/30 font-medium">256-bit Encrypted · Secured by AltPay</span>
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.92) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes ping { 75%,100% { transform:scale(1.8); opacity:0; } }
        @keyframes pulse-glow { 0%,100% { box-shadow:0 8px 25px rgba(245,158,11,0.35); } 50% { box-shadow:0 8px 35px rgba(245,158,11,0.55); } }
      `}</style>
    </div>
  );
}

/* ─── Checkout Page ──────────────────────────────────────────────────────── */
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

  const [focusedField, setFocusedField] = useState(null);

  if (cartItems.length === 0 && !loading && !showRazorpay) {
    navigate("/cart");
    return null;
  }

  const deliveryFee = totalPrice >= 500 ? 0 : 49;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen relative" style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0d0d15 100%)" }}>
      <Navbar />

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      {showRazorpay && (
        <PaymentModal
          amount={grandTotal}
          contact={formData.phone}
          onClose={() => setShowRazorpay(false)}
          onSuccess={placeOrder}
        />
      )}

      {loading && !showRazorpay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin" />
            <p className="text-white/60 text-sm">Placing your order...</p>
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto px-4 py-10 pt-28">
        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/10">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-black text-white">Checkout</h1>
          </div>
          <p className="text-white/40 text-sm ml-12">Fill in your details to complete the order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ─── Left: Form ─────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Delivery Info Card */}
            <div className="rounded-2xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}>
              <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Delivery Information</h2>
                  <p className="text-white/40 text-xs">Where should we deliver?</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Address */}
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">
                    Delivery Address <span className="text-red-400">*</span>
                  </label>
                  <div className={`relative rounded-xl border transition-all duration-200 ${
                    focusedField === "address" ? "border-amber-400/60" : "border-white/10"
                  }`}>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("address")}
                      onBlur={() => setFocusedField(null)}
                      rows={3}
                      placeholder="House no., Street, Area, City, Pincode..."
                      className="w-full px-4 py-3.5 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    />
                    {focusedField === "address" && (
                      <div className="absolute bottom-3 right-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <div className={`flex rounded-xl border overflow-hidden transition-all duration-200 ${
                    focusedField === "phone" ? "border-amber-400/60" : "border-white/10"
                  }`} style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2 px-4 border-r border-white/10">
                      <span className="text-white/70 text-sm font-semibold">🇮🇳</span>
                      <span className="text-white/50 text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="9876 543 210"
                      className="flex-1 px-4 py-3.5 bg-transparent text-white text-sm placeholder-white/25 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="rounded-2xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}>
              <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-400/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Payment Method</h2>
                  <p className="text-white/40 text-xs">How would you like to pay?</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      value: "UPI",
                      label: "Online Payment",
                      sub: "Cards, UPI, Net Banking",
                      Icon: () => (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      ),
                      badge: "Instant",
                      badgeColor: "bg-green-500/15 text-green-400",
                    },
                    {
                      value: "COD",
                      label: "Cash on Delivery",
                      sub: "Pay when it arrives",
                      Icon: () => (
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        </div>
                      ),
                      badge: "+₹49 fee",
                      badgeColor: "bg-amber-500/15 text-amber-400",
                    },
                  ].map(({ value, label, sub, Icon, badge, badgeColor }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChange({ target: { name: "paymentMethod", value } })}
                      className={`relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        formData.paymentMethod === value
                          ? "border-amber-400/50 shadow-lg shadow-amber-400/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                      style={{
                        background: formData.paymentMethod === value
                          ? "rgba(245,158,11,0.08)"
                          : "rgba(255,255,255,0.03)",
                      }}
                    >
                      {formData.paymentMethod === value && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center">
                          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <Icon />
                      <div>
                        <p className="text-white font-bold text-sm">{label}</p>
                        <p className="text-white/40 text-xs mt-0.5">{sub}</p>
                        <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}>
                          {badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === "UPI" && (
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-purple-300 text-xs">A secure payment window will open to complete your transaction.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Right: Order Summary ────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="rounded-2xl border border-white/10 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)" }}>
                <div className="px-6 py-4 border-b border-white/8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-400/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-sm">Order Summary</h2>
                    <p className="text-white/40 text-xs">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-3 max-h-52 overflow-y-auto"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                          <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-white/40 text-xs">Qty: {item.qty}</p>
                      </div>
                      <p className="text-white text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="px-6 pb-4 space-y-2 border-t border-white/8 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Subtotal</span>
                    <span className="text-white">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-400 font-semibold">FREE</span>
                    ) : (
                      <span className="text-white">₹{deliveryFee}</span>
                    )}
                  </div>
                  {deliveryFee === 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-green-400/80">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      You saved ₹49 on delivery!
                    </div>
                  )}

                  <div className="pt-3 mt-2 border-t border-white/8">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-amber-400">₹{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button
                    onClick={handleCheckoutClick}
                    disabled={loading || showRazorpay}
                    className="w-full py-4 rounded-xl font-black text-base text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                      boxShadow: "0 8px 30px rgba(245,158,11,0.3)",
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f87171 100%)" }} />
                    <span className="relative flex items-center justify-center gap-2">
                      {formData.paymentMethod === "UPI" ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Pay ₹{grandTotal.toLocaleString()} Securely
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Place Order · COD
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-white/30 text-xs mt-3 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                    Secured · Encrypted · Trusted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
