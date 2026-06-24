import { HeroCarousel } from "../components/HeroCarousel";
import { CategoryCards } from "../components/CategoryCards";
import { BestSellers } from "../components/BestSellers";
import { NewArrivals } from "../components/NewArrivals";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import { InstagramStrip } from "../components/InstagramStrip";

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
*/
export function Home() {
  return (
    <>
      {/* 01 — Hero Carousel */}
      <HeroCarousel />

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
