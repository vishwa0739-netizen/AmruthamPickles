import { Link } from "react-router";
import { motion } from "motion/react";
import { PRODUCTS } from "../data";
import { ProductCard } from "./ProductCard";

const NEW_ARRIVALS = PRODUCTS.filter((p) => p.newArrival).slice(0, 4);

export function NewArrivals() {
  return (
    <section
      className="py-10 md:py-14"
      style={{ backgroundColor: "var(--brand-base-80)", borderTop: "1px solid rgba(26,10,14,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="flex items-center gap-3 w-full justify-center mb-1">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(26,10,14,0.18)" }} />
            <h2
              className="section-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(18px, 4vw, 24px)",
                color: "var(--foreground)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
              }}
            >
              New Arrivals
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(26,10,14,0.18)" }} />
          </div>
          <Link
            to="/collections/all"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--foreground)",
              textDecoration: "underline",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              opacity: 0.6,
            }}
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {NEW_ARRIVALS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
