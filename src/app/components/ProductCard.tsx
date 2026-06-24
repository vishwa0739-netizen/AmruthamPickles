import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Eye, Heart } from "lucide-react";
import type { Product } from "../data";
import { BRAND } from "../data";
import { useCart, useWishlist } from "../store";

type Props = {
  product: Product;
  showBrand?: boolean;
};

export function ProductCard({ product, showBrand = true }: Props) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.weights[0].label, product.spiceLevels[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
        {/* Image container — square, no border-radius (matching reference) */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Sold Out overlay */}
          {product.soldOut && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1"
              style={{
                backgroundColor: "rgba(26,10,14,0.75)",
                color: "white",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              Sold Out
            </div>
          )}

          {/* Discount badge */}
          {product.comparePrice && !product.soldOut && (
            <div
              className="absolute top-3 left-3 px-2 py-0.5"
              style={{
                backgroundColor: "#1a6b2f",
                color: "white",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
            </div>
          )}

          {/* New arrival badge */}
          {product.newArrival && !product.comparePrice && (
            <div
              className="absolute top-3 left-3 px-2 py-0.5"
              style={{
                backgroundColor: "var(--brand-wine)",
                color: "var(--brand-base)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              NEW
            </div>
          )}

          {/* Eye (Quick View) icon — circular, top right — exactly matching reference */}
          <button
            onClick={handleWishlist}
            className="product-card-wishlist-btn absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: "rgba(252,252,247,0.95)",
              boxShadow: "0 2px 8px rgba(26,10,14,0.15)",
              color: wishlisted ? "var(--brand-wine)" : "rgba(0,48,73,0.5)",
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <motion.div
              animate={wishlisted ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={15}
                fill={wishlisted ? "var(--brand-wine)" : "none"}
                strokeWidth={2}
              />
            </motion.div>
          </button>
        </div>

        {/* Product info — matching reference layout exactly */}
        <div className="pt-3 pb-1">
          {/* Brand label */}
          {showBrand && (
            <p
              className="product-card-brand"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(26,10,14,0.5)",
                marginBottom: 3,
              }}
            >
              {BRAND.name.toUpperCase()}
            </p>
          )}

          {/* Product name */}
          <h3
            className="line-clamp-2 underline-anim product-card-name"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              color: "var(--foreground)",
              lineHeight: 1.35,
              marginBottom: 6,
            }}
          >
            {product.name}
          </h3>

          {/* Price — "From Rs. 180.00" style matching reference */}
          <p
            className="product-card-price mb-3"
            style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--foreground)" }}
          >
            <span style={{ color: "rgba(26,10,14,0.5)", fontWeight: 400 }}>From </span>
            <span style={{ fontWeight: 700, color: "var(--foreground)" }}>
              Rs. {product.price.toFixed(2)}
            </span>
            {product.comparePrice && (
              <span
                style={{
                  marginLeft: 8,
                  textDecoration: "line-through",
                  color: "rgba(26,10,14,0.35)",
                  fontWeight: 400,
                  fontSize: "var(--text-xs)",
                }}
              >
                Rs. {product.comparePrice.toFixed(2)}
              </span>
            )}
          </p>

          {/* QUICK ADD button — matching reference exactly */}
          <button
            onClick={handleQuickAdd}
            disabled={product.soldOut}
            className="product-card-quick-add w-full py-3 transition-all active:scale-[0.98]"
            style={{
              backgroundColor: added
                ? "var(--brand-bronze)"
                : product.soldOut
                ? "rgba(26,10,14,0.08)"
                : "transparent",
              color: added
                ? "white"
                : product.soldOut
                ? "rgba(26,10,14,0.3)"
                : "var(--foreground)",
              border: `1px solid ${added ? "var(--brand-bronze)" : product.soldOut ? "rgba(26,10,14,0.15)" : "rgba(26,10,14,0.2)"}`,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: product.soldOut ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!added && !product.soldOut) {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--foreground)";
                (e.currentTarget as HTMLElement).style.color = "var(--brand-base)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--foreground)";
              }
            }}
            onMouseLeave={(e) => {
              if (!added && !product.soldOut) {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(26,10,14,0.2)";
              }
            }}
          >
            {product.soldOut ? "SOLD OUT" : added ? "✓ ADDED!" : "QUICK ADD"}
          </button>
        </div>
      </Link>
    </div>
  );
}
