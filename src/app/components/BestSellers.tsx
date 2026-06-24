import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS } from "../data";
import { ProductCard } from "./ProductCard";

/*
  Best Sellers — horizontal slider.

  MOBILE (< 768px):
  ─────────────────────────────────────────────────────────────────────────
  Pattern from DevTools inspection of upalaskitchen.in (verified reference):

    div.product.slick-slide  →  width: 187px;  padding: 0px 5px;
    a.card-link              →  width: 175.4px  height: 219.25px

  THE ONE RULE: padding: 0 SLIDE_PAD on EVERY slide wrapper, NO EXCEPTIONS.
  Same value for card[0], card[1], ..., card[last]. This automatically creates:
    - Left screen margin   = SLIDE_PAD  (first slide's left padding)
    - Inter-card gap       = SLIDE_PAD × 2  (right of slide N + left of slide N+1)
    - Right screen margin  = SLIDE_PAD  (last slide's right padding)

  Math at 390px viewport:
    SLIDE_WIDTH   = 50%  = 195px  (exactly 2 slides visible)
    SLIDE_PAD     = 10px
    Content width = 195 - 10 - 10 = 175px  ≈ 175.4px ✅
    Left margin   = 10px
    Gap           = 20px (10 + 10)
    Right margin  = 10px

  WHAT WAS REMOVED FROM PREVIOUS ATTEMPTS (the conflicting rules):
    ❌  marginLeft: isFirst ? 16 : 12   — different value per card → asymmetric
    ❌  marginRight: isLast ? 16 : 0    — different value per card → asymmetric
    ❌  flexBasis: '175.4px'            — fixed px width, doesn't flex to 50%
    ❌  width: '175.4px'               — same issue
    ❌  gap: 12px on container         — a SEPARATE gap rule conflicting with margin
    ❌  paddingLeft: 16 on container   — container-level padding (browser overflow bug)
    ❌  spacer <div> children          — collapsed to 0 in some browser contexts

  DESKTOP (≥ 768px):
  ─────────────────────────────────────────────────────────────────────────
  Separate JSX block — completely isolated. Uses arrow buttons + 4–5 column
  flex layout with 40px side padding for arrow button room.
*/

const BEST_SELLERS = PRODUCTS.filter((p) => p.bestSeller).slice(0, 6);

/** Uniform padding applied to EVERY slide wrapper — no per-card exceptions */
const SLIDE_PAD = 10; // px — same rule for card[0] through card[last]

export function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Advance or retreat by one slide (used by desktop arrow buttons).
   * Drives the scroll track via scrollLeft — no scrollIntoView quirks.
   */
  function scrollTo(dir: 1 | -1) {
    const next = Math.max(0, Math.min(BEST_SELLERS.length - 1, currentIndex + dir));
    setCurrentIndex(next);
    if (scrollRef.current) {
      // Each slide is exactly 50 % of the track's client width.
      const slideWidth = scrollRef.current.clientWidth / 2;
      scrollRef.current.scrollTo({ left: next * slideWidth, behavior: "smooth" });
    }
  }

  /**
   * Keeps currentIndex (dots + arrow disabled-state) in sync with wherever
   * the native CSS scroll-snap has settled after a finger swipe or
   * programmatic scroll.
   */
  function handleScroll() {
    if (!scrollRef.current) return;
    const slideWidth = scrollRef.current.clientWidth / 2;
    const index = Math.round(scrollRef.current.scrollLeft / slideWidth);
    setCurrentIndex(Math.max(0, Math.min(BEST_SELLERS.length - 1, index)));
  }

  return (
    <section
      className="py-10 md:py-14"
      style={{ borderTop: "1px solid rgba(26,10,14,0.08)" }}
    >
      {/* ── Heading + divider row ──────────────────────────────────────── */}
      <div className="flex flex-col items-center mb-6 md:mb-8 md:px-8">
        <div className="flex items-center w-full mb-1" style={{ gap: 12 }}>
          <div
            className="flex-1"
            style={{ height: 2, backgroundColor: "rgba(26,10,14,0.65)" }}
          />
          <h2
            className="shrink-0 best-sellers-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "20px",
              color: "#232323",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              whiteSpace: "nowrap",
            }}
          >
            Best Sellers
          </h2>
          <div
            className="flex-1"
            style={{ height: 2, backgroundColor: "rgba(26,10,14,0.65)" }}
          />
        </div>

        <Link
          to="/collections/all"
          style={{
            padding: "4px 0px",
            fontSize: "14px",
            color: "var(--foreground)",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            opacity: 0.55,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
        >
          View All
        </Link>
      </div>

      {/* ── Slider wrapper ─────────────────────────────────────────────── */}
      <div className="relative">

        {/* Desktop-only: Prev arrow */}
        <button
          onClick={() => scrollTo(-1)}
          disabled={currentIndex === 0}
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full shadow-md transition-all"
          style={{
            backgroundColor: "var(--brand-base)",
            border: "1px solid rgba(0,48,73,0.15)",
            color: "var(--brand-wine)",
            opacity: currentIndex === 0 ? 0.3 : 1,
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          }}
          aria-label="Previous product"
        >
          <ChevronLeft size={16} />
        </button>

        {/*
          ══════════════════════════════════════════════════════════════
          MOBILE TRACK  (hidden on ≥ 768px)
          ══════════════════════════════════════════════════════════════
          Outer container: NO side padding, full viewport width.
          overflow:hidden clips any sub-pixel overshoot at the edges.
        */}
        <div
          className="md:hidden"
          style={{ overflow: "hidden" }}
        >
          {/*
            Scroll track: overflow-x:auto with scroll-snap.
            NO paddingLeft, NO paddingRight, NO gap.
            All spacing comes exclusively from the per-slide padding below.
          */}
          {/*
            onScroll fires after each native snap settles and updates
            currentIndex so dots + arrow buttons stay in sync.
            No JS touch handlers — CSS scroll-snap owns all swipe behaviour.
          */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            style={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              paddingBottom: 8,
              /* ← no paddingLeft, no paddingRight, no gap */
            }}
          >
            {BEST_SELLERS.map((product, i) => (
              /*
                Plain div — NOT motion.div.
                Removing whileInView prevents the opacity/y entrance animation
                from re-firing on each card as it scrolls into view mid-swipe,
                which was the second source of jank (card flashing opacity:0→1
                while the user's finger is still on the screen).
              */
              <div
                key={product.id}
                style={{
                  /*
                    SLIDE WRAPPER — the single uniform rule
                    ─────────────────────────────────────────────────────
                    width: 50%  →  exactly 2 slides fit in the viewport
                    padding: 0 SLIDE_PAD  →  same on ALL cards (i=0 to last)
                    box-sizing: border-box  →  padding is inside the 50% width

                    Results at 390px:
                      Width of this wrapper  =  195px
                      Padding each side      =  10px
                      Inner card content     =  175px  (≈ 175.4px ✅)
                      Left screen margin     =  10px   (slide[0] left padding)
                      Gap between cards      =  20px   (10px right + 10px left)
                      Right screen margin    =  10px   (slide[last] right padding)

                    Every card (including first and last) gets the IDENTICAL
                    style object — no isFirst/isLast branching whatsoever.
                  */
                  flex: "0 0 50%",
                  width: "50%",
                  padding: `0 ${SLIDE_PAD}px`,
                  boxSizing: "border-box",
                  scrollSnapAlign: "start",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/*
          ══════════════════════════════════════════════════════════════
          DESKTOP TRACK  (hidden on < 768px)
          ══════════════════════════════════════════════════════════════
          Completely separate JSX — zero shared classes with mobile track.
          No cross-breakpoint leakage possible.
        */}
        <div
          className="hidden md:flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          {BEST_SELLERS.map((product, i) => (
            <motion.div
              key={`d-${product.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="best-sellers-card"
              style={{
                flex: "0 0 calc(25% - 9px)",
                minWidth: 0,
                scrollSnapAlign: "start",
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Desktop-only: Next arrow */}
        <button
          onClick={() => scrollTo(1)}
          disabled={currentIndex >= BEST_SELLERS.length - 1}
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full shadow-md transition-all"
          style={{
            backgroundColor: "var(--brand-base)",
            border: "1px solid rgba(0,48,73,0.15)",
            color: "var(--brand-wine)",
            opacity: currentIndex >= BEST_SELLERS.length - 1 ? 0.3 : 1,
            cursor: currentIndex >= BEST_SELLERS.length - 1 ? "not-allowed" : "pointer",
          }}
          aria-label="Next product"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dot indicators — click jumps directly to slide i via scrollLeft math */}
      <div className="flex justify-center gap-2 mt-4">
        {BEST_SELLERS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              if (scrollRef.current) {
                const slideWidth = scrollRef.current.clientWidth / 2;
                scrollRef.current.scrollTo({ left: i * slideWidth, behavior: "smooth" });
              }
            }}
            aria-label={`Go to product ${i + 1}`}
            style={{
              width: i === currentIndex ? 20 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                i === currentIndex ? "var(--brand-wine)" : "rgba(0,48,73,0.2)",
              border: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
