import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--brand-base-80)" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5"
        style={{ backgroundColor: "var(--brand-wine)", pointerEvents: "none" }}
      />
      <div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-5"
        style={{ backgroundColor: "var(--brand-bronze)", pointerEvents: "none" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              backgroundColor: "rgba(191,137,82,0.12)",
              border: "1px solid rgba(191,137,82,0.3)",
              borderRadius: "var(--radius-pill)",
              padding: "6px 16px",
            }}
          >
            <Sparkles size={14} style={{ color: "var(--brand-bronze)" }} />
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                color: "var(--brand-bronze)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Join the Amrutham Family
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(24px, 4.5vw, 40px)",
              color: "var(--brand-wine)",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Recipes, Stories &{" "}
            <em
              style={{
                fontFamily: "var(--font-accent)",
                color: "var(--brand-bronze)",
              }}
            >
              Exclusive Offers
            </em>
          </h2>

          <p
            style={{
              fontSize: "var(--text-base)",
              color: "rgba(26,10,14,0.6)",
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Subscribe to our newsletter for heirloom recipes from our kitchen, early access to new products, and subscriber-only discounts.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-5 px-8 inline-block"
                style={{
                  backgroundColor: "rgba(191,137,82,0.12)",
                  border: "1px solid rgba(191,137,82,0.3)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "var(--text-xl)",
                    color: "var(--brand-wine)",
                    marginBottom: 4,
                  }}
                >
                  ✓ You're on the list!
                </p>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--brand-bronze)" }}>
                  Check your inbox for a 10% welcome discount.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-4 outline-none transition-all"
                  style={{
                    backgroundColor: "white",
                    border: focused
                      ? "2px solid var(--brand-bronze)"
                      : "2px solid rgba(0,48,73,0.12)",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "var(--text-base)",
                    color: "var(--foreground)",
                    boxShadow: focused ? "0 0 0 4px rgba(191,137,82,0.12)" : "none",
                  }}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-4 font-bold transition-all active:scale-95 shrink-0"
                  style={{
                    backgroundColor: "var(--brand-wine)",
                    color: "var(--brand-base)",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "var(--text-base)",
                    border: "none",
                    boxShadow: "var(--shadow-md)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-wine-dark1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-wine)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  Subscribe <ArrowRight size={18} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p
            style={{
              fontSize: "var(--text-xs)",
              color: "rgba(26,10,14,0.4)",
              marginTop: 16,
            }}
          >
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
