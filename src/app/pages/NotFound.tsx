import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Home } from "lucide-react";

export function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
      style={{ backgroundColor: "var(--brand-base)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(72px, 15vw, 120px)",
            color: "rgba(0,48,73,0.08)",
            lineHeight: 1,
            marginBottom: 0,
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(24px, 4vw, 36px)",
            color: "var(--brand-wine)",
            marginTop: -8,
            marginBottom: 12,
          }}
        >
          This jar is empty.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-accent)",
            fontStyle: "italic",
            fontSize: "var(--text-lg)",
            color: "var(--brand-bronze-dark1)",
            marginBottom: 32,
            maxWidth: 400,
          }}
        >
          The page you're looking for has been moved, deleted, or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-all"
            style={{
              backgroundColor: "var(--brand-btn-bg)",
              color: "var(--brand-btn-text)",
              borderRadius: "var(--radius-pill)",
              textDecoration: "none",
              fontSize: "var(--text-base)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            to="/collections/all"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold transition-all"
            style={{
              border: "2px solid var(--brand-wine)",
              color: "var(--brand-wine)",
              borderRadius: "var(--radius-pill)",
              textDecoration: "none",
              fontSize: "var(--text-base)",
            }}
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
