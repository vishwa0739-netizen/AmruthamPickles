import { motion } from "motion/react";
import whatsappLogo from "../../imports/whatsapp_logo.png";
import { BRAND } from "../data";

export function WhatsAppFAB() {
  return (
    <motion.a
      href={`https://wa.me/${BRAND.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20products`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 rounded-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: "#25D366",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        textDecoration: "none",
        border: "2.5px solid white",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
    >
      {/* Official WhatsApp logo — user-supplied asset */}
      <img
        src={whatsappLogo}
        alt="Chat with Amrutham on WhatsApp"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </motion.a>
  );
}
