import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Leaf, Sun, Heart } from "lucide-react";
import { BRAND } from "../data";
import amruthamLogo from "../../imports/amrutham_logo.jpeg";

const VALUES = [
  { icon: Leaf, title: "No Preservatives, Ever", body: "Every jar leaves our kitchen with only natural ingredients. If it needs a chemical to last, we don't make it." },
  { icon: Sun, title: "Small Batch · Made to Order", body: "We don't pre-make inventory. Your order is made fresh after you place it — that's the only way we know how to do it." },
  { icon: Heart, title: "Heirloom Andhra Recipes", body: "Our recipes come from grandmothers who never measured anything. We've preserved every detail — the oil, the ratios, the process." },
];

export function About() {
  return (
    <div style={{ backgroundColor: "var(--brand-base)" }}>
      {/* Hero */}
      <div
        className="relative overflow-hidden py-20 md:py-32"
        style={{ background: "linear-gradient(135deg, var(--brand-wine) 0%, var(--brand-wine-dark2) 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-10 relative z-10">
          {/* Logo circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            className="shrink-0"
          >
            <div
              className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4"
              style={{
                borderColor: "var(--brand-bronze)",
                boxShadow: "0 0 0 8px rgba(191,137,82,0.12)",
              }}
            >
              <img src={amruthamLogo} alt={BRAND.fullName} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <p
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--brand-bronze-tint1)",
                marginBottom: 10,
              }}
            >
              Our Story
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(28px, 6vw, 56px)",
                color: "var(--brand-base)",
                lineHeight: 1.05,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: 12,
              }}
            >
              {BRAND.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "clamp(16px, 2.5vw, 22px)",
                color: "rgba(252,252,247,0.72)",
                letterSpacing: "0.08em",
              }}
            >
              ✦ {BRAND.tagline} ✦
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
              alt="Spice preparation"
              className="w-full object-cover"
              style={{ aspectRatio: "4/3", boxShadow: "var(--shadow-lg)" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "var(--brand-wine)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: 14,
              }}
            >
              Born in a Guntur Courtyard
            </h2>
            <p style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.7)", lineHeight: 1.8, marginBottom: 14 }}>
              {BRAND.name} was born from the belief that the world deserves to taste authentic Andhra flavours — made exactly the way they've been made for generations, without shortcuts.
            </p>
            <p style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.7)", lineHeight: 1.8, marginBottom: 14 }}>
              Every jar is made to order in small batches. No preservatives, no fillers, no compromises. Just premium ingredients, cold-pressed oils, and recipes that have stood the test of time.
            </p>
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "var(--text-lg)",
                color: "var(--brand-bronze-dark1)",
                lineHeight: 1.65,
                borderLeft: "3px solid var(--brand-bronze)",
                paddingLeft: 16,
              }}
            >
              "Small batch tradition, made to order — because some things are worth waiting for."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16" style={{ backgroundColor: "var(--brand-base-80)" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(20px, 4vw, 32px)",
              color: "var(--brand-wine)",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 40,
            }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-7"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(26,10,14,0.07)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(191,137,82,0.12)" }}
                >
                  <v.icon size={20} style={{ color: "var(--brand-bronze)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "var(--text-base)",
                    color: "var(--brand-wine)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)", lineHeight: 1.75 }}>
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center max-w-xl mx-auto px-6">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(20px, 4vw, 32px)",
            color: "var(--brand-wine)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: 10,
          }}
        >
          Taste the Difference
        </h2>
        <p style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.6)", marginBottom: 28, lineHeight: 1.7 }}>
          Every jar is a small act of cultural preservation. We hope you taste the love in it.
        </p>
        <Link
          to="/collections/all"
          className="inline-flex items-center gap-2 font-bold transition-all"
          style={{
            backgroundColor: "var(--brand-btn-bg)",
            color: "var(--brand-btn-text)",
            padding: "14px 36px",
            textDecoration: "none",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
        >
          Shop All Products <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
