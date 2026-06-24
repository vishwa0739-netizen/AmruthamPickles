import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { useCart } from "../store";
import { BRAND, NAV_ITEMS } from "../data";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SearchModal } from "./SearchModal";
import amruthamLogo from "../../imports/amrutham_navbar_logo.jpg";
import iconAccountCustom from "../../imports/icon_account.png";
import iconCartCustom from "../../imports/icon_cart.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { state, dispatch, cartCount } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      {/*
        ── ANNOUNCEMENT BAR ──────────────────────────────────────────────────
        Mobile  (≤767px):  h=60px, padding=5px 15px
        Tablet  (768-1023): h=44px, padding=0px 15px
        Laptop  (≥1024px): HIDDEN here — merged into the laptop navbar top row
      */}
      <div
        className="w-full text-center"
        style={{
          backgroundColor: "#C1121F",
          color: "#FCFCF7",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        {/* Mobile: 60px height, 5px 15px padding */}
        <div
          className="flex flex-col items-center justify-center md:hidden"
          style={{ height: "60px", padding: "5px 15px" }}
        >
          <div style={{ width: "319.8px", maxWidth: "100%", fontSize: "11px" }}>
            {BRAND.announcement}
          </div>
          <div style={{ height: "27px", display: "flex", alignItems: "center", fontSize: "10px", opacity: 0.85 }}>
            Free shipping above ₹599 · Made to Order
          </div>
        </div>

        {/* Tablet: 44px height, 0px 15px padding */}
        <div
          className="hidden md:flex lg:hidden items-center justify-center"
          style={{ height: "44px", padding: "0px 15px" }}
        >
          <div style={{ width: "319.8px", maxWidth: "100%", fontSize: "11px" }}>
            {BRAND.announcement}
          </div>
        </div>

        {/* Laptop: 51px height, 2px 15px padding */}
        <div
          className="hidden lg:flex items-center justify-center"
          style={{ height: "51px", padding: "2px 15px" }}
        >
          <span style={{ fontSize: "12px" }}>{BRAND.announcement}</span>
        </div>
      </div>

      {/*
        ── MAIN NAVBAR ───────────────────────────────────────────────────────
        Mobile  (≤767px):  h=50px, padding=0px 10px
        Tablet  (768-1023): h=50px, padding=0px 15px
        Laptop  (≥1024px): Redesigned two-row layout:
          Row 1 (top bar): Logo LEFT | announcement text RIGHT | icons RIGHT
          Row 2 (nav bar): Full nav links, black bg, h=79px, Libre Baskerville
      */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          backgroundColor: "var(--brand-base)",
          borderBottom: scrolled ? "1px solid rgba(0,48,73,0.1)" : "1px solid rgba(0,48,73,0.08)",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Mobile: h=50px, px=10px */}
        <div className="flex items-center justify-between md:hidden" style={{ height: "50px", padding: "0px 10px" }}>
          {/* Left: Hamburger + Search */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center rounded-full transition-colors"
              style={{ color: "var(--brand-wine)", width: 40, height: 40 }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex items-center justify-center rounded-full transition-colors"
              style={{ color: "var(--brand-wine)", width: 40, height: 40 }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </div>

          {/* Center: Logo — 99×33 */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
            style={{ textDecoration: "none" }}
          >
            <img
              src={amruthamLogo}
              alt="Amrutham Pickles & Spices"
              style={{ width: "99px", height: "33px", objectFit: "contain" }}
            />
          </Link>

          {/* Right: Account + Cart */}
          <div className="flex items-center gap-1">
            <Link
              to="/account"
              aria-label="Account"
              className="flex items-center justify-center rounded-full transition-colors"
              style={{ color: "var(--brand-wine)", textDecoration: "none", width: 40, height: 40 }}
            >
              <img src={iconAccountCustom} alt="Account" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)" }} />
            </Link>

            <button
              onClick={() => dispatch({ type: state.isOpen ? "CLOSE_CART" : "OPEN_CART" })}
              aria-label={`Cart (${cartCount} items)`}
              className="relative flex items-center justify-center rounded-full transition-colors"
              style={{ color: "var(--brand-wine)", width: 40, height: 40 }}
            >
              <motion.div key={cartCount} animate={cartCount > 0 ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.35 }}>
                <img src={iconCartCustom} alt="Cart" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)" }} />
              </motion.div>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 rounded-full flex items-center justify-center"
                  style={{
                    width: "5.72px", height: "20px",
                    backgroundColor: "var(--brand-wine)",
                    color: "white",
                    fontSize: 7,
                    fontWeight: 700,
                    lineHeight: 1,
                    minWidth: "14px",
                    padding: "0 2px",
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Tablet: h=50px, px=15px */}
        <div className="hidden md:flex lg:hidden items-center justify-between" style={{ height: "50px", padding: "0px 15px" }}>
          <div className="flex items-center gap-1">
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="flex items-center justify-center rounded-full transition-colors" style={{ color: "var(--brand-wine)", width: 40, height: 40 }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center" style={{ textDecoration: "none" }}>
            <img src={amruthamLogo} alt="Amrutham Pickles & Spices" style={{ width: "99px", height: "33px", objectFit: "contain" }} />
          </Link>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="flex items-center justify-center rounded-full transition-colors" style={{ color: "var(--brand-wine)", width: 40, height: 40 }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <Link to="/account" aria-label="Account" className="flex items-center justify-center rounded-full transition-colors" style={{ color: "var(--brand-wine)", textDecoration: "none", width: 40, height: 40 }}>
              <img src={iconAccountCustom} alt="Account" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)" }} />
            </Link>
            <button onClick={() => dispatch({ type: state.isOpen ? "CLOSE_CART" : "OPEN_CART" })} aria-label={`Cart (${cartCount} items)`} className="relative flex items-center justify-center rounded-full transition-colors" style={{ color: "var(--brand-wine)", width: 40, height: 40 }}>
              <motion.div key={cartCount} animate={cartCount > 0 ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.35 }}>
                <img src={iconCartCustom} alt="Cart" style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)" }} />
              </motion.div>
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-1 right-1 rounded-full flex items-center justify-center"
                  style={{ minWidth: "14px", width: "5.72px", height: "20px", backgroundColor: "var(--brand-wine)", color: "white", fontSize: 7, fontWeight: 700, lineHeight: 1, padding: "0 2px" }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/*
          ── LAPTOP / DESKTOP NAVBAR (≥1024px) ──────────────────────────────
          Hamburger HIDDEN. Two-row layout:

          ┌─────────────────────────────────────────────────────────────────┐
          │  ROW 1 — Top bar (brand-base bg):                               │
          │  [LOGO left]          [Announcement text right] [Icons right]   │
          └─────────────────────────────────────────────────────────────────┘
          ┌─────────────────────────────────────────────────────────────────┐
          │  ROW 2 — Nav links bar (black bg, h=79px):                      │
          │  [Home] [About Us] [Pickles] [Pachadies] ... evenly distributed │
          └─────────────────────────────────────────────────────────────────┘
        */}
        <div className="hidden lg:block">
          {/* ── ROW 1: Top bar — logo left | announcement + icons right ── */}
          <div
            style={{
              backgroundColor: "var(--brand-base)",
              padding: "0 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
              borderBottom: "1px solid rgba(0,48,73,0.07)",
            }}
          >
            {/* Logo — larger than mobile, positioned left */}
            <Link
              to="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
            >
              <img
                src={amruthamLogo}
                alt="Amrutham Pickles & Spices"
                style={{ width: "148px", height: "50px", objectFit: "contain" }}
              />
            </Link>

            {/* Right side: announcement text + icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
              {/* Announcement paragraph — right aligned, ALL CAPS */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "#232323",
                  textTransform: "uppercase",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                FREE SHIPPING ON CHENNAI LOCAL DELIVERY ORDERS ABOVE ₹1499
              </p>

              {/* Icons row — Search | Sign In | Cart */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--brand-wine)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <span style={{ fontSize: "9px", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--brand-wine)", lineHeight: 1 }}>
                    Search
                  </span>
                </button>

                {/* Sign In */}
                <Link
                  to="/account"
                  aria-label="Sign In"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                    textDecoration: "none",
                    color: "var(--brand-wine)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <img
                    src={iconAccountCustom}
                    alt="Account"
                    style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)" }}
                  />
                  <span style={{ fontSize: "9px", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--brand-wine)", lineHeight: 1 }}>
                    Sign In
                  </span>
                </Link>

                {/* Shopping Cart */}
                <button
                  onClick={() => dispatch({ type: state.isOpen ? "CLOSE_CART" : "OPEN_CART" })}
                  aria-label={`Cart (${cartCount} items)`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--brand-wine)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
                >
                  <div style={{ position: "relative" }}>
                    <motion.div key={cartCount} animate={cartCount > 0 ? { scale: [1, 1.35, 1] } : {}} transition={{ duration: 0.35 }}>
                      <img
                        src={iconCartCustom}
                        alt="Cart"
                        style={{ width: 22, height: 22, objectFit: "contain", filter: "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)" }}
                      />
                    </motion.div>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: "absolute",
                          top: "-4px",
                          right: "-6px",
                          minWidth: "14px",
                          height: "14px",
                          backgroundColor: "var(--brand-wine)",
                          color: "white",
                          fontSize: 7,
                          fontWeight: 700,
                          lineHeight: 1,
                          padding: "0 2px",
                          borderRadius: "9999px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {cartCount > 9 ? "9+" : cartCount}
                      </motion.span>
                    )}
                  </div>
                  <span style={{ fontSize: "9px", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--brand-wine)", lineHeight: 1 }}>
                    Shopping Cart
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ── ROW 2: Nav links bar — black bg, h=79px, Libre Baskerville ── */}
          <nav
            style={{
              width: "100%",
              height: "79px",
              backgroundColor: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0",
                width: "100%",
                maxWidth: "1400px",
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="underline-anim"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      textDecoration: "none",
                      fontFamily: "'Libre Baskerville', Georgia, serif",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 400,
                      color: isActive ? "#BF8952" : "#FCFCF7",
                      letterSpacing: "0.04em",
                      padding: "0 6px",
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "#BF8952";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = "#FCFCF7";
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <MobileNavDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
