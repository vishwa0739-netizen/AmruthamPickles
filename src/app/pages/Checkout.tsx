import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, CheckCircle, Lock, Package, CreditCard, Truck } from "lucide-react";
import { useCart } from "../store";

type Step = "address" | "shipping" | "payment" | "confirmation";

const STEPS: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: "address", label: "Address", icon: Package },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
];

const INPUT_STYLE = {
  width: "100%",
  padding: "12px 16px",
  border: "2px solid rgba(0,48,73,0.12)",
  borderRadius: "var(--radius-input)",
  fontSize: "var(--text-base)",
  color: "var(--foreground)",
  backgroundColor: "white",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "var(--font-body)",
};

const LABEL_STYLE = {
  fontSize: "var(--text-sm)",
  fontWeight: 600,
  color: "var(--brand-wine)",
  display: "block",
  marginBottom: 6,
};

export function Checkout() {
  const { state, cartTotal, dispatch } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [orderId] = useState(`VDU${Date.now().toString().slice(-8)}`);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    shipping: "standard",
  });

  const shippingCost = cartTotal >= 599 ? 0 : form.shipping === "express" ? 149 : 79;
  const grandTotal = cartTotal + shippingCost;

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function FocusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    (e.target as HTMLElement).style.borderColor = "var(--brand-bronze)";
    (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(191,137,82,0.12)";
  }
  function BlurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    (e.target as HTMLElement).style.borderColor = "rgba(0,48,73,0.12)";
    (e.target as HTMLElement).style.boxShadow = "none";
  }

  const stepIndex = step === "address" ? 0 : step === "shipping" ? 1 : step === "payment" ? 2 : 3;

  if (state.items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--brand-wine)" }}>
          Your cart is empty
        </p>
        <Link
          to="/collections/all"
          className="px-6 py-3"
          style={{
            backgroundColor: "var(--brand-btn-bg)",
            color: "var(--brand-btn-text)",
            borderRadius: "var(--radius-pill)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: "var(--brand-base)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-lg w-full text-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(191,137,82,0.15)" }}
          >
            <CheckCircle size={40} style={{ color: "var(--brand-bronze)" }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(24px, 5vw, 40px)",
              color: "var(--brand-wine)",
              marginBottom: 8,
            }}
          >
            Order Confirmed!
          </h1>
          <p
            style={{
              fontFamily: "var(--font-accent)",
              fontStyle: "italic",
              fontSize: "var(--text-lg)",
              color: "var(--brand-bronze-dark1)",
              marginBottom: 24,
            }}
          >
            Thank you for choosing Amrutham. We're packing your order with love.
          </p>
          <div
            className="p-5 mb-6 text-left"
            style={{
              backgroundColor: "var(--brand-base-80)",
              borderRadius: "var(--radius-card)",
              border: "1px solid rgba(0,48,73,0.1)",
            }}
          >
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)" }}>Order ID</span>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 700, color: "var(--brand-wine)" }}>#{orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)" }}>Estimated Delivery</span>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)" }}>3–5 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)" }}>Total Paid</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--brand-wine)" }}>₹{grandTotal}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/account/orders"
              className="flex-1 py-3 text-center font-semibold transition-all"
              style={{
                border: "2px solid var(--brand-wine)",
                borderRadius: "var(--radius-pill)",
                color: "var(--brand-wine)",
                textDecoration: "none",
                fontSize: "var(--text-base)",
              }}
            >
              Track Order
            </Link>
            <Link
              to="/collections/all"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="flex-1 py-3 text-center font-semibold transition-all"
              style={{
                backgroundColor: "var(--brand-btn-bg)",
                borderRadius: "var(--radius-pill)",
                color: "var(--brand-btn-text)",
                textDecoration: "none",
                fontSize: "var(--text-base)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--brand-base)", minHeight: "100vh" }}>
      {/* Checkout header */}
      <div
        className="sticky top-0 z-20 px-4 md:px-8 py-4 flex items-center justify-between"
        style={{
          backgroundColor: "var(--brand-base)",
          borderBottom: "1px solid rgba(0,48,73,0.08)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "var(--text-xl)",
            color: "var(--brand-wine)",
            textDecoration: "none",
          }}
        >
          Amrutham
        </Link>
        <div className="flex items-center gap-2">
          <Lock size={14} style={{ color: "var(--brand-bronze)" }} />
          <span style={{ fontSize: "var(--text-xs)", color: "rgba(26,10,14,0.5)" }}>Secure Checkout</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: i <= stepIndex ? "var(--brand-wine)" : "rgba(0,48,73,0.1)",
                    color: i <= stepIndex ? "white" : "var(--brand-wine)",
                  }}
                >
                  {i < stepIndex ? <CheckCircle size={16} /> : <span style={{ fontSize: "var(--text-xs)", fontWeight: 700 }}>{i + 1}</span>}
                </div>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: i === stepIndex ? 600 : 400, color: i <= stepIndex ? "var(--brand-wine)" : "rgba(26,10,14,0.4)" }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} style={{ color: "rgba(26,10,14,0.2)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "address" && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 24 }}>
                    Delivery Address
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label style={LABEL_STYLE}>Full Name *</label>
                        <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Priya Ramachandran" style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Phone Number *</label>
                        <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 99999 88888" style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput} />
                      </div>
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Email Address *</label>
                      <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" placeholder="priya@email.com" style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput} />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Street Address *</label>
                      <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Flat 4B, Sreenivasam Apartments, MG Road" style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput} />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label style={LABEL_STYLE}>City *</label>
                        <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Hyderabad" style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput} />
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>State *</label>
                        <select value={form.state} onChange={(e) => update("state", e.target.value)} style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput}>
                          <option value="">Select</option>
                          {["Andhra Pradesh", "Telangana", "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra", "Delhi", "Gujarat", "Other"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={LABEL_STYLE}>Pincode *</label>
                        <input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="500001" maxLength={6} style={INPUT_STYLE} onFocus={FocusInput} onBlur={BlurInput} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep("shipping")}
                    className="mt-8 w-full py-4 font-bold flex items-center justify-center gap-2 transition-all"
                    style={{
                      backgroundColor: "var(--brand-btn-bg)",
                      color: "var(--brand-btn-text)",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "var(--text-base)",
                      border: "none",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
                  >
                    Continue to Shipping <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 24 }}>
                    Shipping Method
                  </h2>
                  <div className="flex flex-col gap-3">
                    {[
                      { id: "standard", label: "Standard Delivery", sub: "3–5 business days", price: cartTotal >= 599 ? 0 : 79 },
                      { id: "express", label: "Express Delivery", sub: "1–2 business days", price: cartTotal >= 599 ? 70 : 149 },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => update("shipping", opt.id)}
                        className="flex items-center justify-between p-4 text-left transition-all"
                        style={{
                          border: `2px solid ${form.shipping === opt.id ? "var(--brand-wine)" : "rgba(0,48,73,0.12)"}`,
                          borderRadius: "var(--radius-card)",
                          backgroundColor: form.shipping === opt.id ? "rgba(0,48,73,0.04)" : "white",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                            style={{ borderColor: form.shipping === opt.id ? "var(--brand-wine)" : "rgba(0,48,73,0.3)" }}
                          >
                            {form.shipping === opt.id && (
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--brand-wine)" }} />
                            )}
                          </div>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: "var(--text-base)", color: "var(--brand-wine)" }}>{opt.label}</p>
                            <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.5)" }}>{opt.sub}</p>
                          </div>
                        </div>
                        <span style={{ fontWeight: 700, color: opt.price === 0 ? "#1a6b2f" : "var(--brand-wine)", fontSize: "var(--text-base)" }}>
                          {opt.price === 0 ? "FREE" : `₹${opt.price}`}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep("address")}
                      className="flex-1 py-4 font-semibold transition-all"
                      style={{ border: "2px solid rgba(0,48,73,0.2)", borderRadius: "var(--radius-pill)", color: "var(--brand-wine)", backgroundColor: "transparent", fontSize: "var(--text-base)" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("payment")}
                      className="flex-1 py-4 font-bold flex items-center justify-center gap-2 transition-all"
                      style={{ backgroundColor: "var(--brand-btn-bg)", color: "var(--brand-btn-text)", borderRadius: "var(--radius-pill)", fontSize: "var(--text-base)", border: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
                    >
                      Continue to Payment <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 24 }}>
                    Payment
                  </h2>
                  <div
                    className="p-8 text-center mb-6"
                    style={{
                      backgroundColor: "var(--brand-base-80)",
                      borderRadius: "var(--radius-card)",
                      border: "2px dashed rgba(0,48,73,0.15)",
                    }}
                  >
                    <p style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.6)", marginBottom: 8 }}>
                      Powered by
                    </p>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "var(--text-2xl)", color: "#072654" }}>
                      Razorpay
                    </p>
                    <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.45)", marginTop: 8 }}>
                      UPI · Cards · Net Banking · Wallets
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep("shipping")}
                      className="flex-1 py-4 font-semibold"
                      style={{ border: "2px solid rgba(0,48,73,0.2)", borderRadius: "var(--radius-pill)", color: "var(--brand-wine)", backgroundColor: "transparent", fontSize: "var(--text-base)" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("confirmation")}
                      className="flex-1 py-4 font-bold flex items-center justify-center gap-2"
                      style={{ backgroundColor: "var(--brand-btn-bg)", color: "var(--brand-btn-text)", borderRadius: "var(--radius-pill)", fontSize: "var(--text-base)", border: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
                    >
                      <Lock size={16} /> Pay ₹{grandTotal}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div>
            <div
              className="sticky top-28 p-5"
              style={{
                backgroundColor: "var(--brand-base-80)",
                borderRadius: "var(--radius-card)",
                border: "1px solid rgba(0,48,73,0.1)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", color: "var(--brand-wine)", marginBottom: 16 }}>
                Order Summary
              </h3>
              <div className="flex flex-col gap-3 mb-5">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedWeight}`} className="flex gap-3 items-start">
                    <div className="relative">
                      <div style={{ width: 56, height: 56, borderRadius: "var(--radius-input)", backgroundColor: "#F7F2E8", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img src={item.product.image} alt={item.product.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", padding: "6%" }} />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--brand-bronze)", color: "white", fontSize: 10, fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)" }}>{item.product.name}</p>
                      <p style={{ fontSize: "var(--text-xs)", color: "rgba(26,10,14,0.5)" }}>{item.selectedWeight}</p>
                    </div>
                    <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)" }}>₹{item.unitPrice * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-4" style={{ borderTop: "1px solid rgba(0,48,73,0.1)" }}>
                <div className="flex justify-between">
                  <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)" }}>Subtotal</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)" }}>Shipping</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: shippingCost === 0 ? "#1a6b2f" : "var(--foreground)" }}>
                    {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 mt-1" style={{ borderTop: "1px solid rgba(0,48,73,0.1)" }}>
                  <span style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--brand-wine)" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xl)", color: "var(--brand-wine)" }}>₹{grandTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
