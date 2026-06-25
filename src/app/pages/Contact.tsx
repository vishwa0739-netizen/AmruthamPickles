import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MessageCircle, Clock, MapPin, Send } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const FIELD_STYLE = (field: string) => ({
    width: "100%",
    padding: "12px 16px",
    border: `2px solid ${focused === field ? "var(--brand-bronze)" : "rgba(0,48,73,0.12)"}`,
    borderRadius: "var(--radius-input)",
    fontSize: "var(--text-base)",
    color: "var(--foreground)",
    backgroundColor: "white",
    outline: "none",
    boxShadow: focused === field ? "0 0 0 3px rgba(191,137,82,0.12)" : "none",
    fontFamily: "var(--font-body)",
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

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
          Get in Touch
        </motion.h1>
        <p style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "var(--text-lg)", color: "rgba(252,252,247,0.65)", marginTop: 10 }}>
          We'd love to hear from you — questions, orders, or just a recipe chat.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", color: "var(--brand-wine)", marginBottom: 20 }}>
              Contact Details
            </h2>
            {[
              { icon: Phone, label: "Phone", value: "+91 99999 88888", sub: "Mon–Sat, 9am–6pm IST" },
              { icon: Mail, label: "Email", value: "hello@amrutham.in", sub: "We reply within 24 hours" },
              { icon: MapPin, label: "From", value: "Guntur, Andhra Pradesh", sub: "Shipping across India" },
              { icon: Clock, label: "Support Hours", value: "Mon–Sat: 9am–6pm", sub: "Closed on Sundays & public holidays" },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(191,137,82,0.12)" }}>
                  <Icon size={18} style={{ color: "var(--brand-bronze)" }} />
                </div>
                <div>
                  <p style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--brand-bronze)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{label}</p>
                  <p style={{ fontWeight: 600, fontSize: "var(--text-base)", color: "var(--brand-wine)" }}>{value}</p>
                  <p style={{ fontSize: "var(--text-xs)", color: "rgba(26,10,14,0.5)" }}>{sub}</p>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20help%20with%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 mt-4 transition-all"
              style={{
                backgroundColor: "#25D366",
                color: "white",
                borderRadius: "var(--radius-pill)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "var(--text-base)",
                boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(37,211,102,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(37,211,102,0.35)";
              }}
            >
              <MessageCircle size={22} fill="white" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(191,137,82,0.15)" }}>
                  <Send size={28} style={{ color: "var(--brand-bronze)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-2xl)", color: "var(--brand-wine)", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ fontSize: "var(--text-base)", color: "rgba(26,10,14,0.6)" }}>We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-xl)", color: "var(--brand-wine)" }}>
                  Send Us a Message
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Your Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Priya Ramachandran" required style={FIELD_STYLE("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Email *</label>
                    <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="priya@email.com" required style={FIELD_STYLE("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Subject *</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Order query / Product question / Bulk order" required style={FIELD_STYLE("subject")} onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--brand-wine)", marginBottom: 6 }}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={6}
                    placeholder="Tell us how we can help..."
                    required
                    style={{ ...FIELD_STYLE("message"), resize: "vertical" as const }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-4 font-bold transition-all self-start px-8"
                  style={{
                    backgroundColor: "var(--brand-btn-bg)",
                    color: "var(--brand-btn-text)",
                    borderRadius: "var(--radius-pill)",
                    fontSize: "var(--text-base)",
                    border: "none",
                    boxShadow: "var(--shadow-md)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg-hover)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-btn-bg)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }}
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
