import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data";

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1);
      setCurrent((next + TESTIMONIALS.length) % TESTIMONIALS.length);
    },
    [current]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(current + 1), 4000);
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
    setTimeout(() => setPaused(false), 1200);
  }

  const t = TESTIMONIALS[current];

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: "var(--brand-base)", borderTop: "1px solid rgba(26,10,14,0.08)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 w-full mb-8">
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(26,10,14,0.18)" }} />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(18px, 4vw, 28px)",
              color: "var(--foreground)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            What Customers Say
          </h2>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(26,10,14,0.18)" }} />
        </div>

        {/* Review Card */}
        <div
          className="relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: "easeInOut" }}
            >
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  backgroundColor: "var(--brand-base-80)",
                  border: "1px solid rgba(26,10,14,0.07)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < t.rating ? "#BF8952" : "none"}
                      stroke="#BF8952"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontStyle: "italic",
                    fontSize: "clamp(16px, 2.5vw, 20px)",
                    color: "var(--foreground)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  "{t.text}"
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    style={{ border: "2px solid var(--brand-bronze)" }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: "var(--text-sm)",
                        color: "var(--foreground)",
                        lineHeight: 1.2,
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "rgba(26,10,14,0.5)",
                        marginTop: 2,
                      }}
                    >
                      {t.city} · {t.product}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => go(current - 1)}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: "var(--brand-base-60)",
              border: "1px solid rgba(26,10,14,0.12)",
              color: "var(--foreground)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-wine)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-60)")}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Review ${i + 1}`}
                style={{
                  width: i === current ? 22 : 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: i === current ? "var(--brand-wine)" : "rgba(26,10,14,0.2)",
                  border: "none",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(current + 1)}
            aria-label="Next review"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: "var(--brand-base-60)",
              border: "1px solid rgba(26,10,14,0.12)",
              color: "var(--foreground)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-wine)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-60)")}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Trust stats */}
        <div
          className="grid grid-cols-3 gap-4 mt-10 pt-8"
          style={{ borderTop: "1px solid rgba(26,10,14,0.08)" }}
        >
          {[
            { value: "50,000+", label: "Happy Customers" },
            { value: "4.9★", label: "Avg Rating" },
            { value: "Zero", label: "Preservatives" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 4vw, 28px)",
                  color: "var(--brand-wine)",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  color: "rgba(26,10,14,0.5)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
