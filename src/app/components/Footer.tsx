import { Link } from "react-router";
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { BRAND, NAV_ITEMS } from "../data";

const COLLECTION_LINKS = NAV_ITEMS.filter(
  (n) => n.href.startsWith("/collections") || n.href === "/"
);

const HELP_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Refund Policy", href: "/policies/refund" },
  { label: "Privacy Policy", href: "/policies/privacy" },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--brand-wine)",
        color: "var(--brand-base)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-12 pb-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand column — full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo / brand name */}
            <div className="mb-4">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 4vw, 28px)",
                  color: "var(--brand-base)",
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {BRAND.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-accent)",
                  fontStyle: "italic",
                  fontSize: "var(--text-xs)",
                  color: "var(--brand-bronze-tint2)",
                  letterSpacing: "0.12em",
                  display: "block",
                  marginTop: 2,
                }}
              >
                {BRAND.subline}
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "var(--text-sm)",
                color: "rgba(252,252,247,0.55)",
                letterSpacing: "0.06em",
                marginBottom: 12,
              }}
            >
              ✦ {BRAND.tagline} ✦
            </p>

            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "rgba(252,252,247,0.55)",
                lineHeight: 1.7,
                maxWidth: 220,
                marginBottom: 20,
              }}
            >
              Small batch, made to order. Every jar crafted with traditional Andhra recipes and zero preservatives.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: "rgba(252,252,247,0.1)",
                    color: "var(--brand-base)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-bronze)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(252,252,247,0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--brand-bronze-tint1)",
                marginBottom: 14,
              }}
            >
              Collections
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COLLECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(252,252,247,0.6)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--brand-bronze-tint1)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(252,252,247,0.6)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--brand-bronze-tint1)",
                marginBottom: 14,
              }}
            >
              Help
            </h3>
            <ul className="flex flex-col gap-2.5">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "rgba(252,252,247,0.6)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "var(--brand-bronze-tint1)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(252,252,247,0.6)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--brand-bronze-tint1)",
                marginBottom: 14,
              }}
            >
              Get in Touch
            </h3>

            <ul className="flex flex-col gap-3 mb-6">
              <li className="flex items-start gap-2.5">
                <Mail size={14} style={{ color: "var(--brand-bronze-tint1)", marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: "var(--text-sm)", color: "rgba(252,252,247,0.6)" }}>
                  {BRAND.email}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} style={{ color: "var(--brand-bronze-tint1)", marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: "var(--text-sm)", color: "rgba(252,252,247,0.6)" }}>
                  {BRAND.phone}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} style={{ color: "var(--brand-bronze-tint1)", marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: "var(--text-sm)", color: "rgba(252,252,247,0.6)" }}>
                  Andhra Pradesh, India
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <p
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--brand-bronze-tint1)",
                marginBottom: 8,
              }}
            >
              Newsletter
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-3 py-2.5 outline-none min-w-0"
                style={{
                  backgroundColor: "rgba(252,252,247,0.08)",
                  border: "1px solid rgba(252,252,247,0.18)",
                  borderRight: "none",
                  color: "var(--brand-base)",
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-body)",
                  borderRadius: 0,
                }}
              />
              <button
                type="submit"
                className="px-4 py-2.5 shrink-0"
                style={{
                  backgroundColor: "var(--brand-bronze)",
                  color: "white",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-bronze-dark1)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-bronze)")
                }
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(252,252,247,0.08)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: "var(--text-xs)", color: "rgba(252,252,247,0.35)", textAlign: "center" }}>
            © 2026 {BRAND.fullName}. All rights reserved. Made with ♥ in Andhra Pradesh.
          </p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["Visa", "Mastercard", "UPI", "RuPay"].map((p) => (
              <span
                key={p}
                className="px-2 py-1"
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  backgroundColor: "rgba(252,252,247,0.08)",
                  color: "rgba(252,252,247,0.4)",
                  letterSpacing: "0.05em",
                  borderRadius: 2,
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
