import { useState } from "react";
import { HeroCarousel } from "../components/HeroCarousel";
import { CategoryCards } from "../components/CategoryCards";
import { BestSellers } from "../components/BestSellers";
import { NewArrivals } from "../components/NewArrivals";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { InstagramStrip } from "../components/InstagramStrip";
import { IntroSplash } from "../components/IntroSplash";

/*
  Home page layout — updated per spec:
  1. Hero Carousel
  2. Best Sellers (grid below carousel removed — sits directly after)
  3. Variety of Products (CategoryCards)
  4. New Arrivals
  5. Testimonials
  6. Instagram
  
  The 2-column × 2-row Promise Grid that was between the carousel
  and Best Sellers has been REMOVED per section 5 of the spec.

  IntroSplash sits ABOVE all content (position:fixed, z-index:9999).
  It mounts immediately on first session visit; the full homepage is
  already painted behind it during the 2.7–2.8 s of video playback.
  On subsequent visits (sessionStorage flag set) IntroSplash is a no-op.
*/

export function Home() {
  /*
   * introComplete starts false if this is the very first session visit
   * (IntroSplash will be visible). If the session flag is already set
   * (repeat visit), IntroSplash immediately calls onComplete() which
   * sets this to true, and HeroCarousel skips the stagger delay.
   */
  const alreadyPlayed = sessionStorage.getItem("intro_played") === "1";
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [introComplete, setIntroComplete] = useState(
    alreadyPlayed || prefersReduced
  );

  return (
    <>
      {/* Intro splash: fixed overlay, highest z-index.
          Homepage content below is fully mounted and painted immediately. */}
      <IntroSplash onComplete={() => setIntroComplete(true)} />

      {/* 01 — Hero Carousel (receives introComplete for text stagger-in) */}
      <HeroCarousel introComplete={introComplete} />

      {/* 02 — Best Sellers (sits directly under Carousel, no grid in between) */}
      <BestSellers />

      {/* 03 — Variety of Products (Categories) */}
      <CategoryCards />

      {/* 04 — New Arrivals */}
      <NewArrivals />

      {/* 05 — Reviews / Testimonials */}
      <TestimonialsCarousel />

      {/* 06 — Instagram Posts & Highlights */}
      <InstagramStrip />
    </>
  );
}

