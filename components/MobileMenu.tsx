'use client';

import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/918580364890?text=Hi%20CHEMIKAZE%2C%20I%27d%20like%20to%20discuss%20a%20project.';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2, ease: [0.19, 1, 0.22, 1] as const } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.19, 1, 0.22, 1] as const },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] as const } },
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-40 bg-ivory flex flex-col items-center justify-center"
        >
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={onClose}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="heading-lg font-serif text-ink hover:text-gold transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-ink text-ivory px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-gold transition-colors duration-500"
            >
              WhatsApp Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
            </a>
            <a
              href="mailto:2500520510058@ietlucknow.ac.in"
              className="text-xs text-graphite hover:text-gold transition-colors tracking-wider"
            >
              2500520510058@ietlucknow.ac.in
            </a>
            <span className="text-xs text-graphite tracking-wider">+91 8580364890</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
