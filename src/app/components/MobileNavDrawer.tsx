import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { X, LogIn, UserPlus, ChevronRight } from "lucide-react";
import { BRAND, NAV_ITEMS } from "../data";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNavDrawer({ isOpen, onClose }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: "rgba(26,10,14,0.55)", backdropFilter: "blur(2px)" }}
            onClick={onClose}
          />

          {/* Drawer - slides from left */}
          <motion.aside
            key="nav-drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: "min(85vw, 340px)",
              backgroundColor: "var(--brand-base)",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(0,48,73,0.1)" }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "var(--text-lg)",
                    color: "var(--brand-wine)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    lineHeight: 1,
                  }}
                >
                  {BRAND.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontStyle: "italic",
                    fontSize: "var(--text-xs)",
                    color: "var(--brand-bronze)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {BRAND.subline}
                </p>
              </div>
              <button
                onClick={onClose}
                className="close-btn-spin w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                aria-label="Close menu"
                style={{ color: "var(--brand-wine)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu title */}
            <div className="px-5 pt-5 pb-2">
              <p
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(0,48,73,0.4)",
                }}
              >
                Menu
              </p>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-5 py-4 transition-colors"
                    style={{
                      borderBottom: "1px solid rgba(0,48,73,0.07)",
                      textDecoration: "none",
                      backgroundColor: isActive ? "rgba(0,48,73,0.05)" : "transparent",
                      color: isActive ? "var(--brand-wine)" : "var(--foreground)",
                      fontFamily: "var(--font-body)",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "var(--text-base)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-base-80)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    }}
                  >
                    {item.label}
                    <ChevronRight size={16} style={{ color: "rgba(0,48,73,0.3)" }} />
                  </Link>
                );
              })}
            </nav>

            {/* Footer actions */}
            <div
              className="px-5 py-5 flex flex-col gap-3"
              style={{ borderTop: "1px solid rgba(0,48,73,0.1)" }}
            >
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors"
                style={{
                  backgroundColor: "var(--brand-base-80)",
                  textDecoration: "none",
                  color: "var(--brand-wine)",
                  fontWeight: 500,
                  fontSize: "var(--text-sm)",
                }}
              >
                <LogIn size={17} style={{ color: "var(--brand-bronze)" }} />
                Sign In
              </Link>
              <Link
                to="/account/signup"
                onClick={onClose}
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors"
                style={{
                  backgroundColor: "var(--brand-wine)",
                  textDecoration: "none",
                  color: "var(--brand-base)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  borderRadius: "var(--radius-pill)",
                  justifyContent: "center",
                }}
              >
                <UserPlus size={17} />
                Create Account
              </Link>

              {/* Tagline */}
              <p
                className="text-center mt-1"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  fontSize: "var(--text-xs)",
                  color: "rgba(0,48,73,0.4)",
                  letterSpacing: "0.06em",
                }}
              >
                ✦ {BRAND.tagline} ✦
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
