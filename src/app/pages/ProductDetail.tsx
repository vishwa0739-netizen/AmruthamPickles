import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Star, Minus, Plus, ShoppingCart, Heart, Truck, Shield, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data";
import { useCart, useWishlist } from "../store";
import { ProductCard } from "../components/ProductCard";
import * as Accordion from "@radix-ui/react-accordion";

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [imgIndex, setImgIndex] = useState(0);
  const [weight, setWeight] = useState(product?.weights[0].label ?? "");
  const [spice, setSpice] = useState(product?.spiceLevels[0] ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--brand-wine)" }}>
          Product not found
        </p>
        <Link
          to="/collections/all"
          className="px-6 py-3"
          style={{
            backgroundColor: "var(--brand-wine)",
            color: "var(--brand-base)",
            borderRadius: "var(--radius-pill)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const selectedWeight = product.weights.find((w) => w.label === weight) ?? product.weights[0];
  const unitPrice = selectedWeight.price;
  const wishlisted = isWishlisted(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function handleAddToCart() {
    addToCart(product, weight, spice, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const ACCORDION_ITEMS = [
    { id: "description", label: "Description", content: product.description },
    { id: "ingredients", label: "Ingredients", content: product.ingredients },
    {
      id: "shipping",
      label: "Shipping & Returns",
      content: "Free shipping on orders above ₹599. Standard delivery 3–5 business days across India. Express delivery available at checkout. 7-day hassle-free return policy for unopened products.",
    },
    { id: "shelf", label: "Shelf Life & Storage", content: `${product.shelfLife}. Store in a cool, dry place away from direct sunlight. Refrigerate after opening and use within 3 months.` },
  ];

  return (
    <div style={{ backgroundColor: "var(--brand-base)" }}>
      {/* Breadcrumb */}
      <div
        className="px-4 md:px-8 py-4"
        style={{ borderBottom: "1px solid rgba(0,48,73,0.07)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 transition-colors"
            style={{ color: "rgba(26,10,14,0.45)", fontSize: "var(--text-sm)" }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <span style={{ color: "rgba(26,10,14,0.2)" }}>/</span>
          <Link
            to={`/collections/${product.category}`}
            style={{ color: "rgba(26,10,14,0.45)", fontSize: "var(--text-sm)", textDecoration: "none" }}
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span style={{ color: "rgba(26,10,14,0.2)" }}>/</span>
          <span style={{ color: "var(--brand-wine)", fontSize: "var(--text-sm)", fontWeight: 500 }}>
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Gallery */}
          <div>
            {/* Main image */}
            <div
              className="relative overflow-hidden cursor-zoom-in mb-3"
              style={{ borderRadius: "var(--radius-card)", aspectRatio: "1/1" }}
              onClick={() => setZoomed(!zoomed)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[imgIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.bestSeller && (
                  <span
                    className="px-3 py-1"
                    style={{
                      backgroundColor: "var(--brand-bronze)",
                      color: "white",
                      borderRadius: "var(--radius-pill)",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    Best Seller
                  </span>
                )}
                {product.comparePrice && (
                  <span
                    className="px-3 py-1"
                    style={{
                      backgroundColor: "#1a6b2f",
                      color: "white",
                      borderRadius: "var(--radius-pill)",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className="flex-1 overflow-hidden transition-all"
                    style={{
                      borderRadius: "var(--radius-input)",
                      border: `2px solid ${i === imgIndex ? "var(--brand-bronze)" : "transparent"}`,
                      aspectRatio: "1/1",
                      boxShadow: i === imgIndex ? "var(--shadow-sm)" : "none",
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--brand-bronze)",
                marginBottom: 8,
              }}
            >
              {product.category}
            </p>
            <h1
              className="underline-anim"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(24px, 4vw, 40px)",
                color: "var(--brand-wine)",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "var(--text-lg)",
                color: "var(--brand-bronze-dark1)",
                marginBottom: 16,
              }}
            >
              {product.tagline}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "var(--brand-bronze)" : "none"}
                    stroke="var(--brand-bronze)"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)" }}>
                {product.rating}
              </span>
              <span style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.45)" }}>
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-3xl)",
                  color: "var(--brand-wine)",
                }}
              >
                ₹{unitPrice}
              </span>
              {product.comparePrice && (
                <span
                  style={{
                    fontSize: "var(--text-xl)",
                    color: "rgba(26,10,14,0.35)",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{product.comparePrice}
                </span>
              )}
              <span
                style={{
                  padding: "3px 10px",
                  backgroundColor: "rgba(26,107,47,0.1)",
                  color: "#1a6b2f",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                }}
              >
                Incl. of taxes
              </span>
            </div>

            {/* Weight selector */}
            <div className="mb-6">
              <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>
                Weight
              </p>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w.label}
                    onClick={() => setWeight(w.label)}
                    className="px-5 py-2.5 transition-all"
                    style={{
                      backgroundColor: weight === w.label ? "var(--brand-wine)" : "white",
                      color: weight === w.label ? "var(--brand-base)" : "var(--brand-wine)",
                      border: `2px solid ${weight === w.label ? "var(--brand-wine)" : "rgba(0,48,73,0.2)"}`,
                      borderRadius: "var(--radius-pill)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 600,
                    }}
                  >
                    {w.label}
                    <span style={{ marginLeft: 4, opacity: 0.75, fontWeight: 400 }}>
                      ₹{w.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spice Level */}
            <div className="mb-6">
              <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>
                Spice Level
              </p>
              <div className="flex flex-wrap gap-2">
                {product.spiceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSpice(level)}
                    className="px-5 py-2.5 transition-all"
                    style={{
                      backgroundColor: spice === level ? "rgba(191,137,82,0.15)" : "white",
                      color: "var(--brand-wine)",
                      border: `2px solid ${spice === level ? "var(--brand-bronze)" : "rgba(0,48,73,0.15)"}`,
                      borderRadius: "var(--radius-pill)",
                      fontSize: "var(--text-sm)",
                      fontWeight: spice === level ? 600 : 400,
                    }}
                  >
                    {level === "Mild" ? "🌿" : level === "Medium" ? "🌶" : level === "Hot" ? "🔥" : "🌋"} {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex gap-3 mb-5">
              <div
                className="flex items-center"
                style={{
                  border: "2px solid rgba(0,48,73,0.15)",
                  borderRadius: "var(--radius-pill)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-11 h-12 flex items-center justify-center transition-colors"
                  style={{ color: "var(--brand-wine)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <Minus size={16} />
                </button>
                <span
                  className="w-10 text-center"
                  style={{ fontWeight: 700, fontSize: "var(--text-base)", color: "var(--brand-wine)" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-11 h-12 flex items-center justify-center transition-colors"
                  style={{ color: "var(--brand-wine)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <Plus size={16} />
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="flex-1 flex items-center justify-center gap-2 py-3 transition-all font-bold"
                style={{
                  backgroundColor: added ? "var(--brand-bronze)" : "var(--brand-wine)",
                  color: "var(--brand-base)",
                  borderRadius: "var(--radius-pill)",
                  fontSize: "var(--text-base)",
                  border: "none",
                  boxShadow: "var(--shadow-md)",
                }}
                onMouseEnter={(e) => {
                  if (!added) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-wine-dark1)";
                }}
                onMouseLeave={(e) => {
                  if (!added) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-wine)";
                }}
              >
                {added ? (
                  <>✓ Added to Cart!</>
                ) : (
                  <>
                    <ShoppingCart size={18} /> Add to Cart · ₹{unitPrice * qty}
                  </>
                )}
              </motion.button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
                style={{
                  border: "2px solid rgba(0,48,73,0.15)",
                  color: wishlisted ? "var(--brand-wine)" : "rgba(0,48,73,0.4)",
                  backgroundColor: wishlisted ? "rgba(0,48,73,0.05)" : "transparent",
                }}
              >
                <Heart size={20} fill={wishlisted ? "var(--brand-wine)" : "none"} />
              </button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, text: "Free shipping above ₹599" },
                { icon: Shield, text: "Secure payment" },
                { icon: RefreshCw, text: "7-day returns" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex flex-col items-center gap-1.5 py-3 px-2 text-center"
                  style={{
                    backgroundColor: "var(--brand-base-80)",
                    borderRadius: "var(--radius-input)",
                    fontSize: "var(--text-xs)",
                    color: "rgba(26,10,14,0.6)",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--brand-bronze)" }} />
                  {text}
                </div>
              ))}
            </div>

            {/* Accordion */}
            <Accordion.Root type="multiple" defaultValue={["description"]}>
              {ACCORDION_ITEMS.map((item) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  style={{ borderBottom: "1px solid rgba(0,48,73,0.1)" }}
                >
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between py-4 group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "var(--text-base)", color: "var(--brand-wine)" }}>
                      {item.label}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{ color: "var(--brand-bronze)", transition: "transform 0.25s" }}
                      className="group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content
                    className="overflow-hidden"
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(26,10,14,0.65)",
                      lineHeight: 1.75,
                      paddingBottom: 16,
                    }}
                  >
                    {item.content}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>

        {/* Mobile sticky add to cart */}
        <div
          className="fixed bottom-0 left-0 right-0 md:hidden z-30 p-4"
          style={{
            backgroundColor: "var(--brand-base)",
            boxShadow: "0 -4px 20px rgba(0,48,73,0.12)",
            borderTop: "1px solid rgba(0,48,73,0.08)",
          }}
        >
          <button
            onClick={handleAddToCart}
            className="w-full py-4 font-bold flex items-center justify-center gap-2 transition-all active:scale-98"
            style={{
              backgroundColor: added ? "var(--brand-bronze)" : "var(--brand-wine)",
              color: "var(--brand-base)",
              borderRadius: "var(--radius-pill)",
              fontSize: "var(--text-base)",
              border: "none",
            }}
          >
            {added ? (
              <>✓ Added to Cart!</>
            ) : (
              <>
                <ShoppingCart size={18} /> Add to Cart · ₹{unitPrice * qty}
              </>
            )}
          </button>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16 md:mt-24 pb-24 md:pb-8">
            <h2
              className="underline-anim"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(20px, 3.5vw, 32px)",
                color: "var(--brand-wine)",
                marginBottom: 24,
              }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
