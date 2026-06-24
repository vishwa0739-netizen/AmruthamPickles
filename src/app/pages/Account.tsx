import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Package, MapPin, Heart, LogIn, UserPlus, ChevronRight, Eye, EyeOff } from "lucide-react";
import { PRODUCTS } from "../data";
import { useWishlist } from "../store";
import { ProductCard } from "../components/ProductCard";

type AccountTab = "orders" | "wishlist" | "addresses" | "login" | "signup";

const MOCK_ORDERS = [
  { id: "VDU20240001", date: "12 Jun 2026", status: "Delivered", total: 680, items: ["Andhra Avakaya", "Kandi Podi"] },
  { id: "VDU20240002", date: "28 May 2026", status: "In Transit", total: 260, items: ["Gongura Pachadi"] },
  { id: "VDU20240003", date: "05 May 2026", status: "Delivered", total: 920, items: ["Andhra Essentials Box"] },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "#1a6b2f",
  "In Transit": "#b45309",
  Processing: "var(--brand-wine)",
};

export function Account() {
  const { tab } = useParams<{ tab: string }>();
  const [activeTab, setActiveTab] = useState<AccountTab>((tab as AccountTab) || "login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const { wishlist } = useWishlist();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const INPUT = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid rgba(0,48,73,0.12)",
    borderRadius: "var(--radius-input)",
    fontSize: "var(--text-base)",
    color: "var(--foreground)",
    backgroundColor: "white",
    outline: "none",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s",
  };

  const TABS = isLoggedIn
    ? [
        { id: "orders" as AccountTab, label: "My Orders", icon: Package },
        { id: "wishlist" as AccountTab, label: "Wishlist", icon: Heart },
        { id: "addresses" as AccountTab, label: "Addresses", icon: MapPin },
      ]
    : [
        { id: "login" as AccountTab, label: "Sign In", icon: LogIn },
        { id: "signup" as AccountTab, label: "Register", icon: UserPlus },
      ];

  return (
    <div style={{ backgroundColor: "var(--brand-base)", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="py-12 text-center"
        style={{ background: "linear-gradient(180deg, var(--brand-wine) 0%, var(--brand-wine-dark1) 100%)" }}
      >
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 40px)", color: "var(--brand-base)" }}>
          {isLoggedIn ? "My Account" : "Welcome Back"}
        </h1>
        {isLoggedIn && (
          <p style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", color: "rgba(252,252,247,0.65)", marginTop: 6, fontSize: "var(--text-base)" }}>
            Good to see you, Priya 👋
          </p>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Tab Nav */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-5 py-3 shrink-0 transition-all"
              style={{
                backgroundColor: activeTab === t.id ? "var(--brand-wine)" : "white",
                color: activeTab === t.id ? "var(--brand-base)" : "var(--brand-wine)",
                border: `2px solid ${activeTab === t.id ? "var(--brand-wine)" : "rgba(0,48,73,0.15)"}`,
                borderRadius: "var(--radius-pill)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
              }}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Login */}
          {activeTab === "login" && !isLoggedIn && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div
                className="p-8"
                style={{ backgroundColor: "white", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-md)", border: "1px solid rgba(0,48,73,0.08)" }}
              >
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 6 }}>Sign In</h2>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.5)", marginBottom: 24 }}>
                  New here?{" "}
                  <button onClick={() => setActiveTab("signup")} style={{ color: "var(--brand-bronze)", fontWeight: 600 }}>
                    Create an account
                  </button>
                </p>
                <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setActiveTab("orders"); }} className="flex flex-col gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Email</label>
                    <input value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} type="email" placeholder="priya@email.com" style={INPUT} required
                      onFocus={(e) => (e.target.style.borderColor = "var(--brand-bronze)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(0,48,73,0.12)")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Password</label>
                    <div className="relative">
                      <input value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} type={showPass ? "text" : "password"} placeholder="••••••••" style={{ ...INPUT, paddingRight: 44 }} required
                        onFocus={(e) => (e.target.style.borderColor = "var(--brand-bronze)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(0,48,73,0.12)")} />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(26,10,14,0.4)" }}>
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-4 font-bold mt-2 transition-all"
                    style={{ backgroundColor: "var(--brand-wine)", color: "var(--brand-base)", borderRadius: "var(--radius-pill)", fontSize: "var(--text-base)", border: "none" }}
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Signup */}
          {activeTab === "signup" && !isLoggedIn && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="p-8" style={{ backgroundColor: "white", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-md)", border: "1px solid rgba(0,48,73,0.08)" }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 6 }}>Create Account</h2>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.5)", marginBottom: 24 }}>
                  Already have one?{" "}
                  <button onClick={() => setActiveTab("login")} style={{ color: "var(--brand-bronze)", fontWeight: 600 }}>Sign in</button>
                </p>
                <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); setActiveTab("orders"); }} className="flex flex-col gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Full Name</label>
                    <input value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} placeholder="Priya Ramachandran" style={INPUT} required onFocus={(e) => (e.target.style.borderColor = "var(--brand-bronze)")} onBlur={(e) => (e.target.style.borderColor = "rgba(0,48,73,0.12)")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Email</label>
                    <input value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} type="email" placeholder="priya@email.com" style={INPUT} required onFocus={(e) => (e.target.style.borderColor = "var(--brand-bronze)")} onBlur={(e) => (e.target.style.borderColor = "rgba(0,48,73,0.12)")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Password</label>
                    <input value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} type="password" placeholder="Min. 8 characters" style={INPUT} required onFocus={(e) => (e.target.style.borderColor = "var(--brand-bronze)")} onBlur={(e) => (e.target.style.borderColor = "rgba(0,48,73,0.12)")} />
                  </div>
                  <button type="submit" className="py-4 font-bold mt-2" style={{ backgroundColor: "var(--brand-wine)", color: "var(--brand-base)", borderRadius: "var(--radius-pill)", fontSize: "var(--text-base)", border: "none" }}>
                    Create Account
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Orders */}
          {activeTab === "orders" && isLoggedIn && (
            <motion.div key="orders" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 20 }}>Order History</h2>
              <div className="flex flex-col gap-4">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between" style={{ backgroundColor: "white", borderRadius: "var(--radius-card)", boxShadow: "var(--shadow-sm)", border: "1px solid rgba(0,48,73,0.08)" }}>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--brand-wine)" }}>#{order.id}</span>
                        <span className="px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${STATUS_COLORS[order.status]}20`, color: STATUS_COLORS[order.status], fontSize: "var(--text-xs)", fontWeight: 700 }}>
                          {order.status}
                        </span>
                      </div>
                      <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.5)", marginBottom: 4 }}>{order.date}</p>
                      <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.65)" }}>{order.items.join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-xl)", color: "var(--brand-wine)" }}>₹{order.total}</span>
                      <button className="flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: "var(--brand-bronze)" }}>
                        Track <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Wishlist */}
          {activeTab === "wishlist" && isLoggedIn && (
            <motion.div key="wishlist" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 20 }}>My Wishlist</h2>
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart size={48} style={{ color: "rgba(0,48,73,0.2)", margin: "0 auto 16px" }} />
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", color: "var(--brand-wine)", marginBottom: 8 }}>Your wishlist is empty</p>
                  <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.5)", marginBottom: 24 }}>Save products you love by clicking the heart icon.</p>
                  <Link to="/collections/all" style={{ backgroundColor: "var(--brand-wine)", color: "var(--brand-base)", borderRadius: "var(--radius-pill)", padding: "12px 28px", textDecoration: "none", fontWeight: 600 }}>
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {wishlistedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </motion.div>
          )}

          {/* Addresses */}
          {activeTab === "addresses" && isLoggedIn && (
            <motion.div key="addresses" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 20 }}>Saved Addresses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 relative" style={{ backgroundColor: "white", borderRadius: "var(--radius-card)", border: "2px solid var(--brand-bronze)", boxShadow: "var(--shadow-sm)" }}>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(191,137,82,0.15)", fontSize: 10, fontWeight: 700, color: "var(--brand-bronze)" }}>DEFAULT</span>
                  <p style={{ fontWeight: 600, fontSize: "var(--text-base)", color: "var(--brand-wine)", marginBottom: 6 }}>Priya Ramachandran</p>
                  <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)", lineHeight: 1.7 }}>
                    Flat 4B, Sreenivasam Apartments<br />MG Road, Hyderabad<br />Telangana 500001<br />+91 99999 88888
                  </p>
                </div>
                <button className="p-5 flex flex-col items-center justify-center gap-2 transition-all" style={{ backgroundColor: "var(--brand-base-80)", borderRadius: "var(--radius-card)", border: "2px dashed rgba(0,48,73,0.2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--brand-bronze)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,48,73,0.2)")}>
                  <span style={{ fontSize: "var(--text-2xl)", color: "rgba(0,48,73,0.3)" }}>+</span>
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "rgba(0,48,73,0.5)" }}>Add New Address</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
