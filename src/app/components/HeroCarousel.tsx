import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "../data";

/*
  HeroCarousel now accepts an optional `introComplete` prop (boolean).
  When false (during the intro splash), hero text elements start invisible
  and only animate in once the prop flips to true (after the intro fades out).
  When true from the start (repeat visits, non-home pages), text animates
  in immediately on mount — same as the existing behaviour.
*/

/*
  Fix 1: Eyebrow line completely removed from all slides — only headline, subhead, CTA.
  Fix 2: Text block is now center-aligned (items-center + text-center) across all breakpoints.
         Gradient changed to radial/center-darken so centered text is legible.
         Font hierarchy: headline dominant, subhead smaller, CTA proportional.

  Heights (user-adjusted): Mobile 146.98px, Tablet 370.11px, Laptop aspect-ratio.
*/

interface HeroCarouselProps {
  /** When false, hero text waits for intro to finish before staggering in */
  introComplete?: boolean;
}

export function HeroCarousel({ introComplete = true }: HeroCarouselProps) {
  /*
   * textReady: gates the text stagger-in animation.
   * Starts true on repeat visits (introComplete already true on mount).
   * On first visits: starts false, flips to true when introComplete prop changes.
   */
  const [textReady, setTextReady] = useState(introComplete);

  useEffect(() => {
    if (introComplete && !textReady) {
      // Small delay so the overlay's fade-out (800ms) has a moment to settle
      // before the text pops in — avoids competing animations.
      const t = setTimeout(() => setTextReady(true), 120);
      return () => clearTimeout(t);
    }
  }, [introComplete, textReady]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const go = useCallback(
    (next: number) => {
      const idx = (next + HERO_SLIDES.length) % HERO_SLIDES.length;
      setDirection(next > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(current + 1), 4500);
    return () => clearInterval(id);
  }, [current, paused, go]);

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
    setPaused(true);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(current + (diff > 0 ? 1 : -1));
    setTouchStart(null);
    setPaused(false);
  }

  const slide = HERO_SLIDES[current];

  // Center-darkening gradient so centered white text stays legible against any image
  const overlayGradient =
    "radial-gradient(ellipse at center, rgba(26,10,14,0.55) 0%, rgba(26,10,14,0.35) 60%, rgba(26,10,14,0.6) 100%)";

  return (
    <>
      {/* ── MOBILE: h=146.98px — centered text, no eyebrow ── */}
      <div
        className="relative w-full overflow-hidden select-none md:hidden"
        style={{ height: "147.60px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.6 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: overlayGradient }} />
            </div>

            {/* FIX 2: Full-height flex, items-center + justify-center → centered block */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-5">
              {/* No eyebrow (FIX 1) */}
              <motion.h1
                key={`headline-m-${current}`}
                initial={{ opacity: 0, y: 14 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ delay: textReady ? 0 : 0.15, duration: 0.42 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "32px",
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  marginBottom: 5,
                }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                key={`subhead-m-${current}`}
                initial={{ opacity: 0, y: 8 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: textReady ? 0.08 : 0.27, duration: 0.35 }}
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.4,
                  marginBottom: 10,
                }}
              >
                {slide.subhead}
              </motion.p>

              <motion.div
                key={`cta-m-${current}`}
                initial={{ opacity: 0, y: 6 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ delay: textReady ? 0.16 : 0.38, duration: 0.3 }}
              >
                <Link
                  to={slide.ctaLink}
                  className="inline-block transition-all active:scale-95"
                  style={{
                    border: "1.5px solid #fff",
                    color: "#fff",
                    borderRadius: 0,
                    padding: "5px 16px",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                    (e.currentTarget as HTMLElement).style.color = "var(--brand-wine)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <DotsIndicator current={current} go={go} />
      </div>

      {/* ── TABLET: h=370.11px — centered text, no eyebrow ── */}
      <div
        className="relative w-full overflow-hidden select-none hidden md:block lg:hidden"
        style={{ height: "370.11px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            key={`t-${current}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.6 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: overlayGradient }} />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
              {/* No eyebrow (FIX 1) */}
              <motion.h1
                key={`headline-t-${current}`}
                initial={{ opacity: 0, y: 18 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ delay: textReady ? 0 : 0.15, duration: 0.45 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(42px, 9vw, 72px)",
                  color: "#fff",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: 12,
                }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                key={`subhead-t-${current}`}
                initial={{ opacity: 0, y: 12 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: textReady ? 0.08 : 0.28, duration: 0.4 }}
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  fontSize: "clamp(14px, 2.2vw, 20px)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                  marginBottom: 24,
                  maxWidth: "480px",
                }}
              >
                {slide.subhead}
              </motion.p>

              <motion.div
                key={`cta-t-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: textReady ? 0.16 : 0.42, duration: 0.35 }}
              >
                <Link
                  to={slide.ctaLink}
                  className="inline-block transition-all active:scale-95"
                  style={{
                    border: "2px solid #fff",
                    color: "#fff",
                    borderRadius: 0,
                    padding: "10px 32px",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                    (e.currentTarget as HTMLElement).style.color = "var(--brand-wine)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <ArrowButtons go={go} current={current} />
        <DotsIndicator current={current} go={go} />
      </div>

      {/* ── LAPTOP/DESKTOP: aspect-ratio based — centered text, no eyebrow ── */}
      <div
        className="relative w-full overflow-hidden select-none hidden lg:block"
        style={{ aspectRatio: "2 / 1", minHeight: 200, maxHeight: 560 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="sync" initial={false} custom={direction}>
          <motion.div
            key={`d-${current}`}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0.6 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: overlayGradient }} />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-12">
              {/* No eyebrow (FIX 1) */}
              <motion.h1
                key={`headline-d-${current}`}
                initial={{ opacity: 0, y: 22 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ delay: textReady ? 0 : 0.15, duration: 0.5 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(40px, 8vw, 88px)",
                  color: "#fff",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: 14,
                }}
              >
                {slide.headline}
              </motion.h1>

              <motion.p
                key={`subhead-d-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: textReady ? 0.08 : 0.3, duration: 0.45 }}
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 2.5vw, 24px)",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                  marginBottom: 28,
                  maxWidth: "520px",
                }}
              >
                {slide.subhead}
              </motion.p>

              <motion.div
                key={`cta-d-${current}`}
                initial={{ opacity: 0, y: 12 }}
                animate={textReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: textReady ? 0.16 : 0.44, duration: 0.4 }}
              >
                <Link
                  to={slide.ctaLink}
                  className="inline-block transition-all active:scale-95"
                  style={{
                    border: "2px solid #fff",
                    color: "#fff",
                    borderRadius: 0,
                    padding: "12px 36px",
                    textDecoration: "none",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "var(--text-sm)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                    (e.currentTarget as HTMLElement).style.color = "var(--brand-wine)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                >
                  {slide.cta}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        <ArrowButtons go={go} current={current} />
        <DotsIndicator current={current} go={go} />
      </div>
    </>
  );
}

function ArrowButtons({ go, current }: { go: (n: number) => void; current: number }) {
  return (
    <>
      {[
        { label: "Prev", icon: ChevronLeft, fn: () => go(current - 1), pos: "left-4" },
        { label: "Next", icon: ChevronRight, fn: () => go(current + 1), pos: "right-4" },
      ].map(({ label, icon: Icon, fn, pos }) => (
        <button
          key={label}
          aria-label={label}
          onClick={fn}
          className={`absolute top-1/2 -translate-y-1/2 ${pos} flex w-10 h-10 items-center justify-center transition-all`}
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.28)",
            backdropFilter: "blur(6px)",
            color: "#fff",
            borderRadius: 0,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.26)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)")}
        >
          <Icon size={20} />
        </button>
      ))}
    </>
  );
}

function DotsIndicator({ current, go }: { current: number; go: (n: number) => void }) {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      {HERO_SLIDES.map((_, i) => (
        <button
          key={i}
          onClick={() => go(i)}
          aria-label={`Slide ${i + 1}`}
          style={{
            width: i === current ? 24 : 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: i === current ? "var(--brand-bronze)" : "rgba(255,255,255,0.4)",
            border: "none",
            transition: "all 0.3s ease",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
