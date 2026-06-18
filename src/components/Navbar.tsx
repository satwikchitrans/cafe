'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import MobileMenu from './MobileMenu';

const WHATSAPP_URL = 'https://wa.me/918580364890?text=Hi%20CHEMIKAZE%2C%20I%27d%20like%20to%20discuss%20a%20project.';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-ivory/80 backdrop-blur-xl border-b border-sand/50'
            : 'bg-transparent'
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16 md:h-20">
          <a href="/" className="text-xs font-medium uppercase tracking-[0.3em] text-ink relative z-50">
            CHEMIKAZE
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wider text-graphite hover:text-ink transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:2500520510058@ietlucknow.ac.in"
              className="text-xs uppercase tracking-wider text-graphite hover:text-gold transition-colors duration-300"
            >
              Email
            </a>
            <MagneticButton href={WHATSAPP_URL} variant="primary">
              WhatsApp Us
            </MagneticButton>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 flex flex-col items-center justify-center w-10 h-10 md:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block h-[1.5px] w-6 bg-ink transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45 translate-y-[0.5px]' : '-translate-y-1'}`} />
            <span className={`block h-[1.5px] w-6 bg-ink transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-[0.5px]' : 'translate-y-1'}`} />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
