import { useState } from "react";
import Navbar from "./Navbar";
import { useCheckoutPage } from "../hooks/useCheckoutPage";

/* ─── Payment Modal ──────────────────────────────────────────────────────── */
function PaymentModal({ amount, contact, onClose, onSuccess }) {
  const [step, setStep] = useState("methods");
  const [selectedMethod, setSelectedMethod] = useState(null);
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
    if (selectedMethod === "upi") return true; // no UPI ID needed
    if (selectedMethod === "card")
      return (
        cardData.number.replace(/\s/g, "").length === 16 &&
        cardData.expiry.length === 5 &&
        cardData.cvv.length === 3 &&
        cardData.name.length > 2
      );
    if (selectedMethod === "netbanking") return bank !== "";
    return false;
  };

  const banks = [
    "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank",
    "Kotak Bank", "Bank of Baroda", "Punjab National Bank", "Canara Bank",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => step === "methods" && onClose()}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(30px)", animation: "modalIn 0.25s cubic-bezier(.34,1.56,.64,1)" }}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center font-black text-white text-lg shadow-lg">
              A
            </div>
            <div>
              <p className="font-bold text-white text-sm">Altco Store</p>
              <p className="text-white/50 text-xs">Secure Checkout</p>
            </div>
          </div>
          {step === "methods" && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Amount strip */}
        <div className="px-6 py-4 bg-white/10 border-b border-white/10 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs mb-0.5">Amount to Pay</p>
            <p className="text-2xl font-black text-white tracking-tight">
              ₹{amount.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            256-bit SSL
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {step === "methods" && (
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">
                Choose Payment Method
              </p>

              <div className="space-y-2">
                {[
                  { id: "upi", label: "UPI", sub: "Pay via any UPI app (GPay, PhonePe, Paytm)", emoji: "⚡" },
                  { id: "card", label: "Credit / Debit Card", sub: "Visa, MasterCard, RuPay", emoji: "💳" },
                  { id: "netbanking", label: "Net Banking", sub: "All Indian Banks", emoji: "🏦" },
                ].map(({ id, label, sub, emoji }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedMethod(selectedMethod === id ? null : id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left ${
                      selectedMethod === id
                        ? "border-white/50 bg-white/20"
                        : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{label}</p>
                      <p className="text-white/50 text-xs mt-0.5">{sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedMethod === id ? "border-white bg-white" : "border-white/30"
                    }`}>
                      {selectedMethod === id && (
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* UPI — no ID needed, just a note */}
              {selectedMethod === "upi" && (
                <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20" style={{ animation: "slideDown 0.2s ease" }}>
                  <p className="text-white/80 text-xs flex items-center gap-2">
                    <span>⚡</span>
                    A secure UPI payment window will open to complete your transaction.
                  </p>
                </div>
              )}

              {/* Card Input */}
              {selectedMethod === "card" && (
                <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/20 space-y-3" style={{ animation: "slideDown 0.2s ease" }}>
                  {/* Card Preview */}
                  <div className="relative h-36 rounded-xl overflow-hidden p-5"
                    style={{ background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%)" }}>
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: "radial-gradient(circle at 70% 20%, white 0%, transparent 50%)" }} />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="w-8 h-6 rounded bg-yellow-300/80 flex items-center justify-center">
                          <div className="w-5 h-4 rounded bg-yellow-400/60" />
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
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm font-mono placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
                  />
                  <input
                    value={cardData.name}
                    onChange={e => setCardData(d => ({ ...d, name: e.target.value.toUpperCase() }))}
                    placeholder="Name on Card"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
                  />
                  <div className="flex gap-3">
                    <input
                      value={cardData.expiry}
                      onChange={e => setCardData(d => ({ ...d, expiry: formatExpiry(e.target.value) }))}
                      placeholder="MM/YY"
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
                    />
                    <input
                      value={cardData.cvv}
                      onChange={e => setCardData(d => ({ ...d, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                      placeholder="CVV"
                      type="password"
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Netbanking */}
              {selectedMethod === "netbanking" && (
                <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/20" style={{ animation: "slideDown 0.2s ease" }}>
                  <label className="text-white/60 text-xs font-semibold mb-2 block">Select Bank</label>
                  <div className="grid grid-cols-2 gap-2">
                    {banks.map(b => (
                      <button
                        key={b}
                        onClick={() => setBank(b)}
                        className={`py-2.5 px-3 rounded-lg text-xs text-left border transition-all ${
                          bank === b
                            ? "border-white/50 bg-white/20 text-white"
                            : "border-white/15 bg-white/5 text-white/60 hover:border-white/30"
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
                  className="mt-5 w-full py-4 rounded-xl font-black text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                >
                  Pay ₹{amount.toLocaleString()} →
                </button>
              )}
            </div>
          )}

          {step === "processing" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-white/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin" />
                <div className="absolute inset-3 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white font-black text-xl mb-2">Processing Payment</h3>
              <p className="text-white/50 text-sm">Securely verifying your transaction...</p>
              <div className="flex gap-1.5 mt-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white"
                    style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full bg-white/20" style={{ animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }} />
                <div className="relative w-20 h-20 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white font-black text-xl mb-2">Payment Successful!</h3>
              <p className="text-white/60 text-sm">Redirecting to your orders...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center justify-center gap-2 border-t border-white/10 pt-3">
          <svg className="w-3.5 h-3.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-white/30 font-medium">256-bit Encrypted · Secured by AltPay</span>
        </div>
      </div>

      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.92) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes ping { 75%,100% { transform:scale(1.8); opacity:0; } }
      `}</style>
    </div>
  );
}

/* ─── Input Field helper ─────────────────────────────────────────────────── */
function Field({ label, required, focused, children }) {
  return (
    <div>
      <label className="block text-white/70 text-xs font-bold mb-2 uppercase tracking-wider">
        {label} {required && <span className="text-blue-200">*</span>}
      </label>
      <div className={`rounded-xl border transition-all duration-200 overflow-hidden ${focused ? "border-white/50" : "border-white/20"}`}>
        {children}
      </div>
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
    <div className="min-h-screen bg-blue-500 text-white">
      <Navbar />

      {/* Payment Modal */}
      {showRazorpay && (
        <PaymentModal
          amount={grandTotal}
          contact={formData.phone}
          onClose={() => setShowRazorpay(false)}
          onSuccess={placeOrder}
        />
      )}

      {/* Placing order overlay */}
      {loading && !showRazorpay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-600/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin" />
            <p className="text-white/80 text-sm font-medium">Placing your order...</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10 pt-28">

        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors border border-white/20"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-3xl font-black text-white">Checkout</h1>
          </div>
          <p className="text-blue-100 text-sm ml-12">Fill in your details to complete the order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ─── Left: Form ─────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Delivery Info Card */}
            <div className="rounded-2xl border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Delivery Information</h2>
                  <p className="text-blue-100/60 text-xs">Where should we deliver?</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Address */}
                <Field label="Delivery Address" required focused={focusedField === "address"}>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("address")}
                    onBlur={() => setFocusedField(null)}
                    rows={3}
                    placeholder="House no., Street, Area, City, Pincode..."
                    className="w-full px-4 py-3.5 bg-white/10 text-white text-sm placeholder-white/30 focus:outline-none resize-none"
                  />
                </Field>

                {/* Phone */}
                <Field label="Phone Number" required focused={focusedField === "phone"}>
                  <div className="flex bg-white/10">
                    <div className="flex items-center gap-2 px-4 border-r border-white/20">
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-white/60 text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="9876 543 210"
                      className="flex-1 px-4 py-3.5 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none"
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="rounded-2xl border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
              <div className="px-6 py-4 border-b border-white/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Payment Method</h2>
                  <p className="text-blue-100/60 text-xs">How would you like to pay?</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      value: "UPI",
                      label: "Online Payment",
                      sub: "Cards, UPI, Net Banking",
                      emoji: "⚡",
                      badge: "Instant",
                      badgeStyle: "bg-white/20 text-white",
                    },
                    {
                      value: "COD",
                      label: "Cash on Delivery",
                      sub: "Pay when it arrives",
                      emoji: "💵",
                      badge: "+₹49 fee",
                      badgeStyle: "bg-white/15 text-blue-100",
                    },
                  ].map(({ value, label, sub, emoji, badge, badgeStyle }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChange({ target: { name: "paymentMethod", value } })}
                      className={`relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                        formData.paymentMethod === value
                          ? "border-white/50 bg-white/20"
                          : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      {formData.paymentMethod === value && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <span className="text-2xl mt-0.5">{emoji}</span>
                      <div>
                        <p className="text-white font-bold text-sm">{label}</p>
                        <p className="text-white/50 text-xs mt-0.5">{sub}</p>
                        <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${badgeStyle}`}>
                          {badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === "UPI" && (
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-white/10 border border-white/20">
                    <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-white/70 text-xs">A secure payment window will open to complete your transaction.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── Right: Order Summary ─────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="rounded-2xl border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-white/15 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-sm">Order Summary</h2>
                    <p className="text-blue-100/60 text-xs">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-3 max-h-52 overflow-y-auto"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}>
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/20" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-blue-100/60 text-xs">Qty: {item.qty}</p>
                      </div>
                      <p className="text-white text-sm font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="px-6 pb-4 space-y-2 border-t border-white/15 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100/70">Subtotal</span>
                    <span className="text-white font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100/70">Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-300 font-semibold">FREE</span>
                    ) : (
                      <span className="text-white font-medium">₹{deliveryFee}</span>
                    )}
                  </div>
                  {deliveryFee === 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-green-300/80">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      You saved ₹49 on delivery!
                    </div>
                  )}
                  <div className="pt-3 mt-1 border-t border-white/15 flex justify-between items-center">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-2xl font-black text-white">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <button
                    onClick={handleCheckoutClick}
                    disabled={loading || showRazorpay}
                    className="w-full py-4 rounded-xl font-black text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white text-blue-600 hover:bg-blue-50 shadow-lg flex items-center justify-center gap-2"
                  >
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
                  </button>

                  <p className="text-center text-white/40 text-xs mt-3 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
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
