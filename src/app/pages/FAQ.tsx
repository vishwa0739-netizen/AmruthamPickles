import { motion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

const FAQS = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 3–5 business days across India. Express delivery (1–2 business days) is available at checkout for an additional charge. We ship to all pin codes in India." },
      { q: "Is there free shipping?", a: "Yes! Orders above ₹599 qualify for free standard shipping pan-India. No code needed — it's applied automatically at checkout." },
      { q: "Can I track my order?", a: "Absolutely. Once your order is shipped, you'll receive an SMS and email with a tracking link. You can also track your order from your account dashboard." },
      { q: "Do you ship internationally?", a: "Yes, we ship to select countries including the USA, UK, Canada, UAE, Singapore, and Australia. International shipping costs and times are calculated at checkout." },
    ],
  },
  {
    category: "Products",
    items: [
      { q: "Are your products free from preservatives?", a: "100%. Every product we make uses only natural ingredients — spices, oil, salt, and the main ingredient. No artificial preservatives, colours, or flavour enhancers." },
      { q: "How long do the products last?", a: "Shelf life varies by product: pickles last 12 months, fresh pachadis last 6 months, and podis last 3–6 months. All dates are printed on the jar. Once opened, refrigerate and consume within 3 months." },
      { q: "Are your products suitable for vegans?", a: "Most of our products are vegan — all pickles, podis, and chutneys. Our Nellore Chepala Pickle (fish pickle) is non-vegan. All products are clearly labelled." },
      { q: "What oil do you use?", a: "We use cold-pressed sesame oil (nuvvula nune) for most Andhra-style products, which is traditional and adds authentic flavour. Some products use groundnut oil. All oils are cold-pressed and sourced from local mills." },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We accept returns of unopened products within 7 days of delivery. If you received a damaged or incorrect product, we'll send a replacement or full refund — no questions asked." },
      { q: "My product arrived damaged. What do I do?", a: "We're so sorry! Please take a photo of the damaged product and packaging and WhatsApp it to us at +91 99999 88888 within 48 hours of delivery. We'll arrange a replacement or refund immediately." },
      { q: "How long do refunds take?", a: "Refunds are processed within 5–7 business days once we receive and inspect the returned product. The amount will be credited to your original payment method." },
    ],
  },
  {
    category: "Gifting",
    items: [
      { q: "Do you offer gift packaging?", a: "Yes! All our combo sets come in a handcrafted bamboo keepsake box. For individual products, you can request gift packaging at checkout for ₹49. We also offer personalised greeting cards." },
      { q: "Can I place a bulk or corporate order?", a: "Absolutely — we love corporate gifting! For bulk orders of 10+ units, contact us on WhatsApp or email at bulk@amrutham.in for special pricing and custom packaging options." },
    ],
  },
];

export function FAQ() {
  return (
    <div style={{ backgroundColor: "var(--brand-base)" }}>
      {/* Header */}
      <div
        className="py-16 md:py-20 text-center"
        style={{ background: "linear-gradient(180deg, var(--brand-wine) 0%, var(--brand-wine-dark1) 100%)" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", color: "var(--brand-base)" }}
        >
          Frequently Asked Questions
        </motion.h1>
        <p style={{ fontSize: "var(--text-base)", color: "rgba(252,252,247,0.65)", marginTop: 10 }}>
          Can't find your answer? <Link to="/contact" style={{ color: "var(--brand-bronze-tint1)", textDecoration: "underline" }}>Reach out to us.</Link>
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {FAQS.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: si * 0.08 }}
            className="mb-10"
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--text-xl)",
                color: "var(--brand-wine)",
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "2px solid var(--brand-bronze)",
                display: "inline-block",
              }}
            >
              {section.category}
            </h2>
            <Accordion.Root type="multiple">
              {section.items.map((item, i) => (
                <Accordion.Item
                  key={i}
                  value={`${si}-${i}`}
                  style={{
                    borderBottom: "1px solid rgba(0,48,73,0.1)",
                    backgroundColor: "white",
                    borderRadius: i === 0 ? "var(--radius-input) var(--radius-input) 0 0" : i === section.items.length - 1 ? "0 0 var(--radius-input) var(--radius-input)" : "0",
                    marginBottom: 2,
                    overflow: "hidden",
                  }}
                >
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    <span style={{ fontWeight: 600, fontSize: "var(--text-base)", color: "var(--brand-wine)", paddingRight: 16 }}>
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{ color: "var(--brand-bronze)", flexShrink: 0, transition: "transform 0.25s" }}
                      className="group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-none">
                    <div className="px-5 pb-5">
                      <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.65)", lineHeight: 1.8 }}>
                        {item.a}
                      </p>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        ))}

        {/* Still need help */}
        <div
          className="mt-8 p-8 text-center"
          style={{
            backgroundColor: "var(--brand-base-80)",
            borderRadius: "var(--radius-card)",
            border: "1px solid rgba(0,48,73,0.08)",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", color: "var(--brand-wine)", marginBottom: 8 }}>
            Still Have Questions?
          </h3>
          <p style={{ fontSize: "var(--text-sm)", color: "rgba(26,10,14,0.6)", marginBottom: 20 }}>
            Our team is available Monday–Saturday, 9am–6pm IST.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 font-semibold transition-all"
              style={{ backgroundColor: "var(--brand-btn-bg)", color: "var(--brand-btn-text)", borderRadius: "var(--radius-pill)", textDecoration: "none", fontSize: "var(--text-base)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)")}
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-semibold transition-all"
              style={{ backgroundColor: "#25D366", color: "white", borderRadius: "var(--radius-pill)", textDecoration: "none", fontSize: "var(--text-base)" }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
