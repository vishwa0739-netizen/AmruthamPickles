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
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Link to={`/products/${product.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Image container — 4:5 portrait ratio, contain so full jar always visible */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "4/5",
            /* Warm cream background matches Amrutham brand and complements the jar labels */
            backgroundColor: "#F7F2E8",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full transition-transform duration-500"
            style={{
              objectFit: "contain",
              /* 45% pulls the jar label into the visual center of the card */
              objectPosition: "center 45%",
              transform: hovered ? "scale(1.07)" : "scale(1)",
              imageRendering: "auto",
              padding: "4% 5%",
            }}
          />
          {/* Subtle inner vignette on hover for depth */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-400"
            style={{
              opacity: hovered ? 1 : 0,
              background: "radial-gradient(ellipse at center, transparent 55%, rgba(26,10,14,0.06) 100%)",
            }}
          />

          {/* Sold Out overlay */}
          {product.soldOut && (
            <div
              className="absolute top-2 left-2 px-2.5 py-1"
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
              className="absolute top-2 left-2 px-2 py-0.5"
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
              className="absolute top-2 left-2 px-2 py-0.5"
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
            className="product-card-wishlist-btn absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all"
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
        {/* flex column: title + price are fixed-height slots; button anchors to bottom via marginTop:auto */}
        <div className="pt-3 pb-1" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
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

          {/* Product name — min-height reserves exactly 2 lines so 1-line titles
              don't make the card shorter than 2-line neighbours. calc(2*1.35em)
              scales automatically with the font-size override on .best-sellers-card. */}
          <h3
            className="line-clamp-2 underline-anim product-card-name"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: 600,
              color: "var(--foreground)",
              lineHeight: 1.35,
              marginBottom: 6,
              minHeight: "calc(2 * 1.35em)",
            }}
          >
            {product.name}
          </h3>

          {/*
            Price — two SEPARATE rows so height is identical across all cards.

            Row 1 (current price): always visible.
            Row 2 (strikethrough):  always IN the layout — visibility:hidden
            reserves the line-height even when there is no discount, so a card
            without a strikethrough is the same height as one with it.

            Using visibility:hidden (not display:none) is the key: the element
            still occupies its box; only its ink is suppressed.
          */}
          {/* Row 1 — current price */}
          <div
            className="product-card-price"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              color: "var(--foreground)",
              marginBottom: 2,
            }}
          >
            <span style={{ color: "rgba(26,10,14,0.5)", fontWeight: 400 }}>From </span>
            <span style={{ fontWeight: 700, color: "var(--foreground)" }}>
              Rs. {product.price.toFixed(2)}
            </span>
          </div>
          {/* Row 2 — strikethrough original price (space always reserved) */}
          <div
            style={{
              visibility: product.comparePrice ? "visible" : "hidden",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: "rgba(26,10,14,0.35)",
              textDecoration: "line-through",
              fontWeight: 400,
              lineHeight: 1.4,
              marginBottom: 12,
            }}
          >
            {product.comparePrice
              ? `Rs. ${product.comparePrice.toFixed(2)}`
              : "\u00A0" /* non-breaking space keeps the row from collapsing */}
          </div>

          {/* QUICK ADD button — marginTop:auto anchors it to the bottom of the
              flex column so it always sits at the same vertical position across
              every card in the row, regardless of title/price content above. */}
          <button
            onClick={handleQuickAdd}
            disabled={product.soldOut}
            className="product-card-quick-add w-full py-3 active:scale-[0.98]"
            style={{
              marginTop: "auto",
              ...(product.soldOut && {
                backgroundColor: "rgba(26,10,14,0.08)",
                color: "rgba(26,10,14,0.3)",
                border: "1px solid rgba(26,10,14,0.15)",
              }),
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: product.soldOut ? "not-allowed" : "pointer",
            }}
          >
            {product.soldOut ? "SOLD OUT" : added ? "✓ ADDED!" : "QUICK ADD"}
          </button>
        </div>
      </Link>
    </div>
  );
}
