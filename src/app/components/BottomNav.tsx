import { Link, useLocation } from "react-router";
import { Search, Grid3x3, Home, User } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../store";
import iconCart from "../../imports/icon_cart.png";

/*
  Bottom Navigation Bar — MOBILE ONLY (md:hidden)

  Fix 6:
  - Total height set to exactly 60.04px
  - Home icon: reverted to Lucide <Home> (previous version)
  - Account icon: reverted to Lucide <User> (previous version)
  - Search, Collection, Cart: unchanged

  Padding: 7px 12px inside the inner flex div.
  Label font-size: 12px.
*/

type Props = {
  onSearchOpen: () => void;
};

// CSS filter to colorize custom PNG cart icon → brand-wine tint
const wineFilter = "brightness(0) saturate(100%) invert(12%) sepia(54%) saturate(1234%) hue-rotate(174deg) brightness(97%) contrast(102%)";
const dimFilter  = "brightness(0) saturate(100%) invert(68%) sepia(3%) saturate(455%) hue-rotate(170deg) brightness(95%) contrast(87%)";

export function BottomNav({ onSearchOpen }: Props) {
  const { pathname } = useLocation();
  const { cartCount, dispatch, state } = useCart();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const homeActive = isActive("/");
  const collectionActive = isActive("/collections");
  const accountActive = isActive("/account");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden"
      style={{
        backgroundColor: "var(--brand-base)",
        borderTop: "1px solid rgba(0,48,73,0.1)",
        boxShadow: "0 -4px 20px rgba(0,48,73,0.08)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* FIX 6: exact height 60.04px, padding kept at 7px 12px */}
      <div
        className="flex items-center justify-around"
        style={{ height: "60.04px", padding: "7px 12px" }}
      >
        {/* Home — reverted to Lucide <Home> icon */}
        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 flex-1"
          style={{ textDecoration: "none" }}
        >
          <Home
            size={22}
            style={{
              color: homeActive ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              transition: "color 0.2s",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: homeActive ? 600 : 500,
              color: homeActive ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              fontFamily: "var(--font-body)",
              transition: "color 0.2s",
            }}
          >
            Home
          </span>
        </Link>

        {/* Search — unchanged, Lucide Search */}
        <button
          onClick={onSearchOpen}
          className="flex flex-col items-center gap-0.5 flex-1"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Search size={22} style={{ color: "rgba(0,48,73,0.35)" }} />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "rgba(0,48,73,0.35)",
              fontFamily: "var(--font-body)",
            }}
          >
            Search
          </span>
        </button>

        {/* Collection — unchanged, Lucide Grid3x3 */}
        <Link
          to="/collections/all"
          className="flex flex-col items-center gap-0.5 flex-1"
          style={{ textDecoration: "none" }}
        >
          <Grid3x3
            size={22}
            style={{
              color: collectionActive ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              transition: "color 0.2s",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: collectionActive ? 600 : 500,
              color: collectionActive ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              fontFamily: "var(--font-body)",
              transition: "color 0.2s",
            }}
          >
            Collection
          </span>
        </Link>

        {/* Account — reverted to Lucide <User> icon */}
        <Link
          to="/account"
          className="flex flex-col items-center gap-0.5 flex-1"
          style={{ textDecoration: "none" }}
        >
          <User
            size={22}
            style={{
              color: accountActive ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              transition: "color 0.2s",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: accountActive ? 600 : 500,
              color: accountActive ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              fontFamily: "var(--font-body)",
              transition: "color 0.2s",
            }}
          >
            Account
          </span>
        </Link>

        {/* Cart — unchanged, uses custom icon PNG */}
        <button
          onClick={() => dispatch({ type: state.isOpen ? "CLOSE_CART" : "OPEN_CART" })}
          className="relative flex flex-col items-center gap-0.5 flex-1"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <div className="relative flex items-center justify-center" style={{ width: 22, height: 22 }}>
            <motion.div
              key={cartCount}
              animate={cartCount > 0 ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.35 }}
            >
              <img
                src={iconCart}
                alt="Cart"
                style={{
                  width: "22px",
                  height: "22px",
                  objectFit: "contain",
                  filter: cartCount > 0 ? wineFilter : dimFilter,
                  transition: "filter 0.2s",
                }}
              />
            </motion.div>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--brand-wine)",
                  color: "white",
                  fontSize: 9,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {cartCount > 9 ? "9+" : cartCount}
              </motion.span>
            )}
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: cartCount > 0 ? 600 : 500,
              color: cartCount > 0 ? "var(--brand-wine)" : "rgba(0,48,73,0.35)",
              fontFamily: "var(--font-body)",
            }}
          >
            Cart
          </span>
        </button>
      </div>
    </nav>
  );
}
