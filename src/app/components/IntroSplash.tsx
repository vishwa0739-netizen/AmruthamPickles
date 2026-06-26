/**
 * IntroSplash — One-time video intro overlay for the homepage.
 *
 * Rules enforced here:
 *  - Only renders on homepage "/" — only imported from Home.tsx.
 *  - Skips entirely if sessionStorage flag "intro_played" is set.
 *  - Skips entirely if prefers-reduced-motion is active.
 *  - Detects desktop vs mobile ONCE on mount via matchMedia("(min-width: 1024px)").
 *    Uses the lg breakpoint — same value used throughout HeroCarousel / Layout.
 *  - Videos imported as Vite URL assets — never hardcoded paths.
 *  - Poster images imported and set as video poster= to prevent black flash.
 *  - The homepage renders BEHIND this overlay from the first paint.
 *  - Body scroll is locked while visible; restored only after fade-out completes.
 *  - Reveal: opacity 1->0 + scale 1->1.06 over 800ms ease-out (GPU-composited).
 *  - Safety timeout: 5s forces reveal if "ended" never fires.
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ── Video asset imports ────────────────────────────────────────────────────
// Desktop / laptop: 1920x1080, ~2.7s
import introLaptopWebm  from "@/imports/intro_laptop.webm";
import introLaptopMp4   from "@/imports/intro_laptop.mp4";
import posterLaptop     from "@/imports/poster_laptop.jpg";

// Mobile: 720x1280 vertical, ~2.8s
import introMobileWebm  from "@/imports/intro_trimmed (1).webm";
import introMobileMp4   from "@/imports/intro_trimmed.mp4";
import posterMobile     from "@/imports/poster.jpg";

// ── Constants ─────────────────────────────────────────────────────────────
const SESSION_KEY    = "intro_played";
const DESKTOP_MQ     = "(min-width: 1024px)";
const FADE_DURATION  = 800;  // ms
const SAFETY_TIMEOUT = 5000; // ms

interface IntroSplashProps {
  onComplete: () => void;
}

/**
 * Outer shell: checks guards synchronously before rendering the heavy inner.
 * Uses a two-component split so no hooks are called conditionally.
 */
export function IntroSplash({ onComplete }: IntroSplashProps) {
  const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "1";
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Either guard: skip the overlay entirely and surface completion immediately.
  if (alreadyPlayed || prefersReduced) {
    return <ImmediateComplete onComplete={onComplete} />;
  }

  return <SplashInner onComplete={onComplete} />;
}

/** Tiny shim that fires onComplete on mount — no hooks-in-conditional violation */
function ImmediateComplete({ onComplete }: IntroSplashProps) {
  useEffect(() => {
    onComplete();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

/** Main overlay — only mounted when we've confirmed we should show the intro */
function SplashInner({ onComplete }: IntroSplashProps) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  // Detect desktop vs mobile once on mount — never re-evaluates on resize
  const [isDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_MQ).matches
      : true
  );

  const webmSrc   = isDesktop ? introLaptopWebm  : introMobileWebm;
  const mp4Src    = isDesktop ? introLaptopMp4   : introMobileMp4;
  const posterSrc = isDesktop ? posterLaptop     : posterMobile;

  /** Kicks off the GPU-composited opacity + scale fade-out, then cleans up */
  const triggerReveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;

    const overlay = overlayRef.current;
    if (!overlay) {
      document.body.style.overflow = "";
      sessionStorage.setItem(SESSION_KEY, "1");
      onComplete();
      return;
    }

    // Web Animations API — opacity + transform only (GPU composited, zero jank)
    overlay.animate(
      [
        { opacity: "1", transform: "scale(1)",    transformOrigin: "center 40%" },
        { opacity: "0", transform: "scale(1.06)", transformOrigin: "center 40%" },
      ],
      {
        duration: FADE_DURATION,
        // ease-out-expo — feels like "light expanding and pulling us through"
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards",
      }
    ).onfinish = () => {
      // Restore scroll EXACTLY when fade finishes — not before
      document.body.style.overflow = "";
      sessionStorage.setItem(SESSION_KEY, "1");
      onComplete();
    };
  }, [onComplete]);

  // Lock scroll on mount, start safety timer
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const safetyTimer = setTimeout(triggerReveal, SAFETY_TIMEOUT);
    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, [triggerReveal]);

  // Explicitly call play() to handle browsers that may delay autoplay
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {
      // Autoplay blocked (unusual since video is muted) → skip straight to reveal
      triggerReveal();
    });
  }, [triggerReveal]);

  return (
    <div
      ref={overlayRef}
      id="intro-splash-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        // Brand warm cream — matches poster images and prevents any black flash
        backgroundColor: "#fff9ed",
        overflow: "hidden",
        // Promote to its own compositor layer up-front
        willChange: "opacity, transform",
        transform: "translateZ(0)",
      }}
    >
      {/* ── Video ─────────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        poster={posterSrc}
        onEnded={triggerReveal}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          // Center the jar both axes — aligns with hero section below
          objectPosition: "center center",
          display: "block",
        }}
      >
        {/* webm preferred (smaller + better), mp4 as universal fallback */}
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src}  type="video/mp4"  />
      </video>

      {/* ── Subtle edge vignette — softens transition into the bloom ─── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 42%, rgba(26,10,14,0.2) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Skip button — top-right, always visible ───────────────────── */}
      <button
        id="intro-skip-btn"
        onClick={triggerReveal}
        aria-label="Skip intro"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 16px",
          background: "rgba(255,249,237,0.15)",
          border: "1px solid rgba(255,249,237,0.45)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: 0,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,249,237,0.30)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,249,237,0.7)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,249,237,0.15)";
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,249,237,0.45)";
        }}
      >
        Skip
        {/* Forward-skip icon — inline SVG, zero bundle cost */}
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 2L7.5 6L2.5 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="9.5"
            y1="2"
            x2="9.5"
            y2="10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
