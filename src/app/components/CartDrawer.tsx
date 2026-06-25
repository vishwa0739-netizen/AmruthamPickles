import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../store";
import { BRAND } from "../data";

const FREE_SHIPPING_THRESHOLD = 599;

export function CartDrawer() {
  const { state, dispatch, cartTotal, cartCount } = useCart();
  const { items, isOpen } = state;

  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(26,10,14,0.45)" }}
            onClick={() => dispatch({ type: "CLOSE_CART" })}
          />

          {/* Drawer — right side slide */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm flex flex-col"
            style={{ backgroundColor: "white" }}
          >
            {/* Header — matching reference "Shopping Cart / N items" */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(26,10,14,0.1)" }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "var(--text-xl)",
                    color: "var(--foreground)",
                  }}
                >
                  Shopping Cart
                </h2>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.45)", marginTop: 2 }}>
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => dispatch({ type: "CLOSE_CART" })}
                className="close-btn-spin w-9 h-9 flex items-center justify-center transition-colors"
                style={{ color: "var(--foreground)" }}
                aria-label="Close cart"
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--brand-wine)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")}
              >
                <X size={22} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartTotal > 0 && (
              <div className="px-6 py-4" style={{ backgroundColor: "rgba(26,10,14,0.03)", borderBottom: "1px solid rgba(26,10,14,0.07)" }}>
                {remaining > 0 ? (
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--foreground)", marginBottom: 8 }}>
                    Add <strong style={{ color: "var(--brand-wine)" }}>₹{remaining}</strong> more for free shipping
                  </p>
                ) : (
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--brand-bronze-dark1)", fontWeight: 600, marginBottom: 8 }}>
                    🎉 You've unlocked free shipping!
                  </p>
                )}
                <div className="rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: "rgba(26,10,14,0.1)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "var(--brand-wine)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-5 text-center py-16">
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-base)",
                      color: "rgba(26,10,14,0.4)",
                    }}
                  >
                    Your cart is empty
                  </p>
                  <Link
                    to="/collections/all"
                    onClick={() => dispatch({ type: "CLOSE_CART" })}
                    className="w-full py-4 text-center font-bold transition-all"
                    style={{
                      border: "2px solid var(--foreground)",
                      color: "var(--foreground)",
                      textDecoration: "none",
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: "var(--text-sm)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--foreground)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                    }}
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => {
                    const key = `${item.product.id}-${item.selectedWeight}-${item.selectedSpice}`;
                    return (
                      <motion.li
                        key={key}
                        layout
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 16 }}
                        className="flex gap-4"
                      >
                        <div
                          className="shrink-0"
                          style={{ width: 80, height: 80, backgroundColor: "#F7F2E8", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            loading="lazy"
                            className="w-full h-full"
                            style={{ objectFit: "contain", objectPosition: "center", padding: "6%" }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            style={{
                              fontSize: "var(--text-xs)",
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "rgba(26,10,14,0.4)",
                              marginBottom: 2,
                            }}
                          >
                            {BRAND.name.toUpperCase()}
                          </p>
                          <p
                            className="line-clamp-2"
                            style={{
                              fontSize: "var(--text-sm)",
                              fontWeight: 600,
                              color: "var(--foreground)",
                              lineHeight: 1.3,
                              marginBottom: 3,
                            }}
                          >
                            {item.product.name}
                          </p>
                          <p style={{ fontSize: "var(--text-xs)", color: "rgba(26,10,14,0.45)", marginBottom: 8 }}>
                            {item.selectedWeight} · {item.selectedSpice}
                          </p>

                          <div className="flex items-center justify-between">
                            {/* Qty stepper */}
                            <div
                              className="flex items-center"
                              style={{ border: "1px solid rgba(26,10,14,0.2)" }}
                            >
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "UPDATE_QTY",
                                    payload: {
                                      productId: item.product.id,
                                      weight: item.selectedWeight,
                                      spice: item.selectedSpice,
                                      quantity: item.quantity - 1,
                                    },
                                  })
                                }
                                className="w-8 h-8 flex items-center justify-center transition-colors"
                                style={{ color: "var(--foreground)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(26,10,14,0.06)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                              >
                                <Minus size={12} />
                              </button>
                              <span
                                className="w-8 text-center"
                                style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)" }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "UPDATE_QTY",
                                    payload: {
                                      productId: item.product.id,
                                      weight: item.selectedWeight,
                                      spice: item.selectedSpice,
                                      quantity: item.quantity + 1,
                                    },
                                  })
                                }
                                className="w-8 h-8 flex items-center justify-center transition-colors"
                                style={{ color: "var(--foreground)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(26,10,14,0.06)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--foreground)" }}>
                                ₹{item.unitPrice * item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "REMOVE_ITEM",
                                    payload: {
                                      productId: item.product.id,
                                      weight: item.selectedWeight,
                                      spice: item.selectedSpice,
                                    },
                                  })
                                }
                                style={{ color: "rgba(26,10,14,0.3)" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--brand-wine)")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(26,10,14,0.3)")}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-5"
                style={{ borderTop: "1px solid rgba(26,10,14,0.1)" }}
              >
                <div className="flex justify-between items-center mb-5">
                  <span style={{ fontSize: "var(--text-base)", color: "var(--foreground)", fontWeight: 500 }}>
                    Subtotal
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "var(--text-xl)", color: "var(--foreground)" }}>
                    ₹{cartTotal}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => dispatch({ type: "CLOSE_CART" })}
                  className="w-full flex items-center justify-center gap-2 py-4 transition-all"
                  style={{
                    backgroundColor: "var(--brand-btn-bg)",
                    color: "var(--brand-btn-text)",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
                >
                  Check Out <ArrowRight size={16} />
                </Link>
                <p
                  className="text-center mt-3"
                  style={{ fontSize: "var(--text-xs)", color: "rgba(26,10,14,0.4)" }}
                >
                  Taxes and shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
