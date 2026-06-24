import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { WhatsAppFAB } from "./WhatsAppFAB";
import { BottomNav } from "./BottomNav";
import { SearchModal } from "./SearchModal";

export function Layout() {
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const hideFooter = pathname.startsWith("/checkout");
  const hideBottomNav = pathname.startsWith("/checkout");

  /*
   * ── GLOBAL SCROLL-TO-TOP ON ROUTE CHANGE ─────────────────────────────────
   *
   * React Router (and all SPA routers) do NOT reset scroll position on route
   * changes — the browser keeps the previous page's scrollY by default.
   *
   * This single useEffect fixes it for every page on the site, now and in
   * the future. Because Layout is the ONE shared parent of all routes (see
   * routes.tsx), adding it here is sufficient — no per-page code needed.
   *
   * Trigger: pathname change only (not search/hash changes, so in-page anchor
   * jumps, filter/sort query-string changes, and tab switches are unaffected).
   * ─────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--brand-base)", fontFamily: "var(--font-body)" }}
    >
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <CartDrawer />
      <WhatsAppFAB />
      {!hideBottomNav && <BottomNav onSearchOpen={() => setSearchOpen(true)} />}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
