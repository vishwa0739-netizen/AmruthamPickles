import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { BRAND } from "../data";

const POLICIES: Record<string, { title: string; sections: { heading?: string; body: string }[] }> = {
  refund: {
    title: "Refund Policy",
    sections: [
      {
        heading: "💛 Order Cancellation & Refund Policy",
        body: `We completely understand — sometimes plans change! If you need to cancel your order, please reach out to us right away at ${BRAND.email} or send us a WhatsApp message with your order details at ${BRAND.phone}.`,
      },
      {
        body: `If your order is cancelled **before it's shipped**, we'll process a refund after deducting a **3% transaction charge**. Once the order has been shipped, we're unable to cancel — as our products are **freshly prepared, preservative-free and home-made**, making them unsuitable for return or resale.`,
      },
      {
        body: `In special cases, approved refunds will be made through the **original mode of payment within 15 working days** from the date of cancellation.`,
      },
      {
        body: `Thank you for your understanding — every jar is made with care, and we truly value your support!`,
      },
    ],
  },
  shipping: {
    title: "Shipping Policy",
    sections: [
      {
        heading: "Free Shipping",
        body: `Free standard shipping on all orders above ₹599 within India. For orders below ₹599, shipping charges are ₹79 (standard) or ₹149 (express).`,
      },
      {
        heading: "Delivery Timelines",
        body: `Standard Delivery: 3–5 business days\nExpress Delivery: 1–2 business days\nInternational Shipping: 7–14 business days (select countries: USA, UK, UAE, Singapore, Canada, Australia)`,
      },
      {
        heading: "Processing Time",
        body: `Since all products are made to order in small batches, orders are processed within 2–3 business days of payment confirmation. You'll receive a dispatch notification with tracking details once your order ships.`,
      },
      {
        heading: "Order Tracking",
        body: `Once shipped, you'll receive an SMS and email with a tracking link. You can also track your order from your account dashboard.`,
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Information We Collect",
        body: `We collect information you provide when creating an account, placing an order, or contacting us — including name, email, phone number, and delivery address.`,
      },
      {
        heading: "How We Use Your Information",
        body: `To process and fulfill your orders\nTo send order confirmations and shipping updates\nTo improve our products and services\nTo send promotional emails (only with your consent)`,
      },
      {
        heading: "Data Security",
        body: `We use industry-standard encryption (SSL/TLS) to protect your data. Payment information is processed securely through Razorpay and is never stored on our servers.`,
      },
      {
        heading: "Your Rights",
        body: `You may request access to, correction of, or deletion of your personal data at any time by contacting us at ${BRAND.email}.`,
      },
    ],
  },
};

export function Policy() {
  const { type } = useParams<{ type: string }>();
  const policy = POLICIES[type ?? ""] ?? {
    title: "Policy Not Found",
    sections: [{ body: "This policy page doesn't exist." }],
  };

  function renderBody(text: string) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <strong key={i} style={{ color: "var(--foreground)" }}>
            {line.replace(/\*\*/g, "")}
          </strong>
        );
      }
      // Inline bold
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.75)", lineHeight: 1.85, marginBottom: 8 }}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} style={{ color: "var(--foreground)", fontWeight: 700 }}>
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
  }

  return (
    <div style={{ backgroundColor: "var(--brand-base)" }}>
      {/* Header — matching reference with brand bar */}
      <div
        className="py-12 md:py-16"
        style={{ background: "linear-gradient(180deg, var(--brand-wine) 0%, var(--brand-wine-dark1) 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(28px, 5vw, 48px)",
              color: "var(--brand-base)",
              textTransform: "capitalize",
            }}
          >
            {policy.title}
          </motion.h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {policy.sections.map((section, i) => (
          <div key={i} className="mb-8">
            {section.heading && (
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "var(--text-lg)",
                  color: "var(--foreground)",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {section.heading}
              </h2>
            )}
            {renderBody(section.body)}
          </div>
        ))}

        {/* Contact prompt */}
        <div
          className="mt-10 p-6"
          style={{
            backgroundColor: "var(--brand-base-80)",
            border: "1px solid rgba(26,10,14,0.08)",
          }}
        >
          <p style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.7)", lineHeight: 1.75 }}>
            Have questions about our policies? Contact us at{" "}
            <a href={`mailto:${BRAND.email}`} style={{ color: "var(--brand-wine)", fontWeight: 600 }}>
              {BRAND.email}
            </a>{" "}
            or WhatsApp us at{" "}
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#25D366", fontWeight: 600 }}
            >
              {BRAND.phone}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
