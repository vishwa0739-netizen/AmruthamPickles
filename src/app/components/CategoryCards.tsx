import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { CATEGORIES } from "../data";

// Step 5: Group A hrefs (Pickles→/pickles, Pachadies→/pachadies, Podies→/podies)
// transferred to renamed Group B cards. Order preserved: Fryums→Pickles, Combos→Podies, No-Garlic→Pachadies
const MERGED_CATEGORIES = [
  {
    ...CATEGORIES.find((c) => c.id === "fryums")!,
    name: "Pickles",
    slug: "pickles",
  },
  {
    ...CATEGORIES.find((c) => c.id === "combos")!,
    name: "Podies",
    slug: "podies",
  },
  {
    ...CATEGORIES.find((c) => c.id === "no-garlic")!,
    name: "Pachadies",
    slug: "pachadies",
  },
];

export function CategoryCards() {
  return (
    <section className="py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="flex items-center gap-3 w-full mb-6">
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(26,10,14,0.18)" }} />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(18px, 4vw, 28px)",
              color: "var(--foreground)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            Variety of Products
          </h2>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(26,10,14,0.18)" }} />
        </div>

        {/* Tighter gap: gap-2 (8px) instead of gap-4 (16px) — noticeably tighter but cards don't touch */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {MERGED_CATEGORIES.map((cat, i) => (
            <SmallCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SmallCard({
  category,
  index,
}: {
  category: (typeof MERGED_CATEGORIES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/collections/${category.slug}`}
        className="relative block overflow-hidden group"
        style={{
          textDecoration: "none",
          height: 160,
          borderRadius: "var(--radius-card)",
          boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(26,10,14,0.08) 0%, rgba(26,10,14,0.65) 100%)" }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: "rgba(0,48,73,0.45)",
            backdropFilter: hovered ? "blur(1px)" : "none",
            opacity: hovered ? 1 : 0,
          }}
        />
        <div className="absolute inset-0 flex items-end p-4">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(16px, 3vw, 20px)",
              color: "var(--brand-base)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "transform 0.22s ease",
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
