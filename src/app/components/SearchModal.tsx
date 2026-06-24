/**
 * SearchPanel — slides in from the LEFT, 75 vw wide.
 *
 * Animation: IDENTICAL to MobileNavDrawer —
 *   - AnimatePresence for mount/unmount lifecycle
 *   - motion.div with initial={{ x: "-100%" }} → animate={{ x: 0 }}
 *   - spring: stiffness 300, damping 30  (same values as the menu)
 *   - Backdrop: motion.div opacity 0→1, duration 0.2, same as menu
 *
 * Layout (top → bottom):
 *  1. Header row:  "Search" title  +  X close icon (close-btn-spin)
 *  2. Full-width text input + search icon button on the right
 *     Live autosuggest: filters PRODUCTS as user types (≥2 chars)
 *  3. "TRENDING NOW" label + chip row  →  navigate to category route, then close
 *  4. "POPULAR PRODUCTS" label + horizontal card row  →  product detail route
 *
 * Routing reuse:
 *  - Chips → /collections/:category  (TRENDING_CHIPS from data.ts)
 *  - Cards → /products/:slug          (existing ProductDetail route)
 *  - Enter/search btn → /search?q=…  (existing ProductListing route)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate, Link } from "react-router";
import { Search, X } from "lucide-react";
import { PRODUCTS, BRAND, TRENDING_CHIPS, POPULAR_PRODUCTS } from "../data";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  /* ─── Body scroll lock + focus input on open ─── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // focus after the slide-in transition starts (matches menu pattern)
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      return () => {};
    }
  }, [isOpen]);

  /* ─── Esc key handler ─── */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleKey]);

  /* ─── Clear query on close ─── */
  useEffect(() => {
    if (!isOpen) {
      // Wait for exit animation to finish before clearing (spring ~300ms)
      const t = setTimeout(() => setQuery(""), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ─── Live autosuggest (client-side filter) ─── */
  const suggestions =
    query.length >= 2
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tagline.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5)
      : [];

  /* ─── Navigation helpers — all close panel after routing ─── */
  function handleSearchSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  function handleChipClick(href: string) {
    navigate(href);
    onClose();
  }

  function handleProductClick() {
    onClose();
  }

  /*
   * ── ANIMATION PATTERN ─────────────────────────────────────────────────────
   * Exactly mirrors MobileNavDrawer:
   *
   *   MobileNavDrawer (REFERENCE — do not change):
   *     <AnimatePresence>
   *       <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
   *                    exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />  ← backdrop
   *       <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }}
   *                     exit={{ x: "-100%" }}
   *                     transition={{ type:"spring", stiffness:300, damping:30 }} />  ← drawer
   *
   *   SearchModal (NOW MATCHES):
   *     <AnimatePresence>
   *       <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
   *                    exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />  ← backdrop
   *       <motion.div  initial={{ x: "-100%" }} animate={{ x: 0 }}
   *                    exit={{ x: "-100%" }}
   *                    transition={{ type:"spring", stiffness:300, damping:30 }} />  ← panel
   * ─────────────────────────────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {isOpen && (
        /* Full-screen overlay container */
        <div className="fixed inset-0 z-50 flex">

          {/* ── LEFT: slide-in panel ────────────────────────────────────── */}
          <motion.div
            key="search-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative flex flex-col overflow-hidden"
            style={{
              width: "75vw",
              maxWidth: "480px",
              height: "100%",
              backgroundColor: "var(--brand-base)",
              boxShadow: "4px 0 32px rgba(0,0,0,0.22)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. HEADER ROW */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(0,48,73,0.1)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "var(--foreground)",
                }}
              >
                Search
              </span>
              <button
                onClick={onClose}
                className="close-btn-spin w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                aria-label="Close search"
                style={{ color: "var(--brand-wine)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                }
              >
                <X size={20} />
              </button>
            </div>

            {/* 2. SEARCH INPUT */}
            <div className="px-4 py-3 shrink-0">
              <form onSubmit={handleSearchSubmit}>
                <div
                  className="flex items-center gap-2"
                  style={{
                    border: "1px solid rgba(0,48,73,0.18)",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0,48,73,0.04)",
                    overflow: "hidden",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 outline-none bg-transparent px-3 py-2.5"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "var(--foreground)",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-3 py-2.5 flex items-center justify-center shrink-0 transition-colors"
                    aria-label="Submit search"
                    style={{ color: "var(--brand-wine)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,48,73,0.08)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                    }
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>

              {/* Live autosuggest dropdown */}
              {suggestions.length > 0 && (
                <div
                  className="mt-1 rounded-md overflow-hidden"
                  style={{
                    border: "1px solid rgba(0,48,73,0.12)",
                    backgroundColor: "white",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.slug}`}
                      onClick={handleProductClick}
                      className="flex items-center gap-3 px-3 py-2.5 transition-colors"
                      style={{ textDecoration: "none" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,48,73,0.04)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                      }
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-9 h-9 object-cover rounded shrink-0"
                      />
                      <div className="min-w-0">
                        <p
                          className="line-clamp-1"
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "var(--brand-wine)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {p.name}
                        </p>
                        <p style={{ fontSize: "11px", color: "rgba(26,10,14,0.5)" }}>
                          From ₹{p.price}
                        </p>
                      </div>
                      <Search
                        size={12}
                        style={{ color: "rgba(26,10,14,0.3)", marginLeft: "auto", flexShrink: 0 }}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 pb-8">
              {/* 3. TRENDING NOW chips — only shown when no query */}
              {!query && (
                <div className="mb-6">
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--foreground)",
                      marginBottom: 12,
                      marginTop: 4,
                    }}
                  >
                    Trending Now
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        onClick={() => handleChipClick(chip.href)}
                        className="flex items-center gap-1.5 transition-all"
                        style={{
                          padding: "7px 14px",
                          border: "1px solid rgba(0,48,73,0.13)",
                          borderRadius: "999px",
                          backgroundColor: "rgba(0,48,73,0.05)",
                          fontSize: "13px",
                          color: "var(--foreground)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--brand-bronze)";
                          (e.currentTarget as HTMLElement).style.color = "var(--brand-wine)";
                          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(191,137,82,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,48,73,0.13)";
                          (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,48,73,0.05)";
                        }}
                      >
                        <Search size={11} style={{ opacity: 0.45, flexShrink: 0 }} />
                        {chip.label.toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. POPULAR PRODUCTS (default) / SEARCH RESULTS (when typing) */}
              <div>
                {/* Section label */}
                {query.length >= 2 ? (
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--foreground)",
                      marginBottom: 12,
                    }}
                  >
                    Results for "{query}"
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--foreground)",
                      marginBottom: 12,
                    }}
                  >
                    Popular Products
                  </p>
                )}

                {/* Product cards — horizontal scroll */}
                {(() => {
                  const displayProducts =
                    query.length >= 2
                      ? PRODUCTS.filter(
                          (p) =>
                            p.name.toLowerCase().includes(query.toLowerCase()) ||
                            p.category.toLowerCase().includes(query.toLowerCase()) ||
                            p.tagline.toLowerCase().includes(query.toLowerCase())
                        ).slice(0, 6)
                      : POPULAR_PRODUCTS;

                  if (displayProducts.length === 0) {
                    return (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "rgba(26,10,14,0.45)",
                          padding: "20px 0",
                        }}
                      >
                        No products found. Try a different search.
                      </p>
                    );
                  }

                  return (
                    <div
                      className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                      style={{ scrollSnapType: "x mandatory" }}
                    >
                      {displayProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.slug}`}
                          onClick={handleProductClick}
                          className="shrink-0 flex flex-col"
                          style={{
                            width: "140px",
                            scrollSnapAlign: "start",
                            textDecoration: "none",
                          }}
                        >
                          {/* Product image */}
                          <div
                            className="overflow-hidden mb-2"
                            style={{
                              width: "140px",
                              height: "140px",
                              borderRadius: "6px",
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-300"
                              onMouseEnter={(e) =>
                                ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")
                              }
                              onMouseLeave={(e) =>
                                ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                              }
                            />
                          </div>

                          {/* Vendor / brand */}
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "rgba(26,10,14,0.45)",
                              marginBottom: 2,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {BRAND.name}
                          </p>

                          {/* Product name */}
                          <p
                            className="line-clamp-2"
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "var(--foreground)",
                              lineHeight: 1.3,
                              marginBottom: 4,
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            {product.name}
                          </p>

                          {/* Price */}
                          <p
                            style={{
                              fontSize: "13px",
                              color: "var(--brand-wine)",
                              fontFamily: "var(--font-body)",
                              fontWeight: 500,
                            }}
                          >
                            From{" "}
                            <span style={{ fontWeight: 700 }}>Rs. {product.price}.00</span>
                          </p>
                        </Link>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: dimmed backdrop — same fade as MobileNavDrawer ───── */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
            style={{
              backgroundColor: "rgba(26,10,14,0.55)",
              backdropFilter: "blur(2px)",
              cursor: "pointer",
            }}
            onClick={onClose}
            aria-label="Close search panel"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
