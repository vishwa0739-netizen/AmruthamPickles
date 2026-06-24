import { useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router";
import { motion } from "motion/react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { PRODUCTS, CATEGORIES, BRAND, type Product } from "../data";
import { ProductCard } from "../components/ProductCard";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" },
];

const SPICE_FILTERS = ["Mild", "Medium", "Hot", "Extra Hot"];

export function ProductListing() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const [sort, setSort] = useState("popular");
  const [spiceFilter, setSpiceFilter] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const catInfo = CATEGORIES.find((c) => c.slug === category);

  const filtered = useMemo(() => {
    // /search?q= route — filter by query string across all products
    let list: Product[] =
      searchQuery
        ? PRODUCTS.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        : !category || category === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === category);

    if (spiceFilter.length > 0) {
      list = list.filter((p) =>
        p.spiceLevels.some((s) => spiceFilter.includes(s))
      );
    }

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "newest":
        return [...list].filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival));
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }
  }, [category, sort, spiceFilter]);

  return (
    <div style={{ backgroundColor: "var(--brand-base)" }}>
      {/* Page header — matching reference dark header style */}
      <div
        className="py-10 md:py-14 text-center"
        style={{
          background: "linear-gradient(180deg, var(--brand-wine) 0%, var(--brand-wine-dark1) 100%)",
        }}
      >
        <p
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--brand-bronze-tint1)",
            marginBottom: 6,
          }}
        >
          {BRAND.fullName}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(28px, 6vw, 56px)",
            color: "var(--brand-base)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {catInfo ? catInfo.name : searchQuery ? `"${searchQuery}"` : "All Products"}
        </h1>
        {catInfo && (
          <p
            style={{
              fontFamily: "var(--font-accent)",
              fontStyle: "italic",
              fontSize: "var(--text-lg)",
              color: "rgba(252,252,247,0.6)",
              marginTop: 8,
            }}
          >
            {catInfo.tagline}
          </p>
        )}
      </div>

      {/* Category tabs — horizontal scroll, matching reference collection nav */}
      <div
        className="sticky z-20 overflow-x-auto scrollbar-hide"
        style={{
          top: 56,
          backgroundColor: "var(--brand-base)",
          borderBottom: "1px solid rgba(26,10,14,0.1)",
        }}
      >
        <div className="flex items-center px-4 md:px-8 max-w-7xl mx-auto">
          <Link
            to="/collections/all"
            className="shrink-0 py-4 px-4 text-sm font-semibold transition-colors border-b-2"
            style={{
              textDecoration: "none",
              borderColor: !category || category === "all" ? "var(--brand-wine)" : "transparent",
              color: !category || category === "all" ? "var(--brand-wine)" : "rgba(26,10,14,0.5)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              letterSpacing: "0.03em",
            }}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className="shrink-0 py-4 px-4 font-semibold transition-colors border-b-2 whitespace-nowrap"
              style={{
                textDecoration: "none",
                borderColor: category === cat.slug ? "var(--brand-wine)" : "transparent",
                color: category === cat.slug ? "var(--brand-wine)" : "rgba(26,10,14,0.5)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                letterSpacing: "0.03em",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Filter & Sort bar */}
        <div
          className="flex items-center justify-between gap-4 mb-6 sticky z-10 py-3"
          style={{
            top: 105,
            backgroundColor: "var(--brand-base)",
            borderBottom: "1px solid rgba(26,10,14,0.07)",
          }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-2 transition-all"
              style={{
                border: `1px solid ${showFilter ? "var(--brand-wine)" : "rgba(26,10,14,0.2)"}`,
                backgroundColor: showFilter ? "var(--brand-wine)" : "transparent",
                color: showFilter ? "var(--brand-base)" : "var(--foreground)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                borderRadius: 0,
              }}
            >
              <SlidersHorizontal size={14} /> Filter
              {spiceFilter.length > 0 && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--brand-bronze)", color: "white", fontSize: 9, fontWeight: 700 }}
                >
                  {spiceFilter.length}
                </span>
              )}
            </button>

            <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.4)" }}>
              {filtered.length} products
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2"
              style={{
                border: "1px solid rgba(26,10,14,0.15)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--foreground)",
                fontFamily: "var(--font-body)",
                backgroundColor: "white",
                borderRadius: 0,
              }}
            >
              {SORT_OPTIONS.find((o) => o.value === sort)?.label}
              <ChevronDown size={14} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div
                  className="absolute right-0 top-full z-20 py-1 min-w-48"
                  style={{
                    backgroundColor: "white",
                    boxShadow: "var(--shadow-lg)",
                    border: "1px solid rgba(26,10,14,0.1)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setSortOpen(false); }}
                      className="w-full text-left px-4 py-2.5"
                      style={{
                        fontSize: "var(--text-sm)",
                        color: sort === opt.value ? "var(--brand-wine)" : "var(--foreground)",
                        fontWeight: sort === opt.value ? 600 : 400,
                        backgroundColor: sort === opt.value ? "rgba(0,48,73,0.04)" : "transparent",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-4" style={{ border: "1px solid rgba(26,10,14,0.1)", backgroundColor: "var(--brand-base-80)" }}>
              <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, marginBottom: 10, color: "var(--brand-wine)" }}>
                Spice Level
              </p>
              <div className="flex flex-wrap gap-2">
                {SPICE_FILTERS.map((level) => {
                  const active = spiceFilter.includes(level);
                  return (
                    <button
                      key={level}
                      onClick={() =>
                        setSpiceFilter(
                          active ? spiceFilter.filter((x) => x !== level) : [...spiceFilter, level]
                        )
                      }
                      className="px-4 py-2 transition-all"
                      style={{
                        backgroundColor: active ? "var(--foreground)" : "white",
                        color: active ? "var(--brand-base)" : "var(--foreground)",
                        border: `1px solid ${active ? "var(--foreground)" : "rgba(26,10,14,0.2)"}`,
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        fontFamily: "var(--font-body)",
                        borderRadius: 0,
                      }}
                    >
                      {level}
                    </button>
                  );
                })}
                {spiceFilter.length > 0 && (
                  <button
                    onClick={() => setSpiceFilter([])}
                    className="flex items-center gap-1 px-3 py-2"
                    style={{ fontSize: "var(--text-sm)", color: "var(--brand-bronze)", fontWeight: 500 }}
                  >
                    <X size={12} /> Clear all
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 8 }}>
              No products found
            </p>
            <button
              onClick={() => setSpiceFilter([])}
              className="px-6 py-3 mt-4 font-bold"
              style={{ backgroundColor: "var(--brand-wine)", color: "var(--brand-base)", border: "none", fontFamily: "var(--font-body)", letterSpacing: "0.08em" }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.35) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
