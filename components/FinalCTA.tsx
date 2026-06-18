'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.19, 1, 0.22, 1] as const;
const WHATSAPP_URL = 'https://wa.me/918580364890?text=Hi%20CHEMIKAZE%2C%20I%27d%20like%20to%20discuss%20a%20project.';

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="section-padding bg-ink text-ivory relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-32 h-32 border border-graphite/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-[15%] left-[8%] w-20 h-20 border border-gold/10 rotate-45 animate-float" />
      </div>

      <div className="container-wide text-center flex flex-col items-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="label text-gold mb-8"
        >
          Ready to grow?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="heading-xl font-serif text-ivory mb-8"
        >
          Your Next Stage of Growth
          <br />
          <em className="italic text-gold">Starts Here.</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="body-lg text-stone max-w-xl mb-12"
        >
          Let&rsquo;s discuss how we can build systems that generate momentum
          for your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold text-ink px-10 py-5 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-gold-light transition-colors duration-500"
          >
            Let&rsquo;s Talk on WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a
            href="mailto:2500520510058@ietlucknow.ac.in"
            className="inline-flex items-center gap-2 text-stone hover:text-gold transition-colors duration-300 text-xs uppercase tracking-widest"
          >
            Or Email Us →
          </a>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-6 text-xs text-graphite"
        >
          <span>+91 8580364890</span>
          <span className="hidden sm:block">·</span>
          <span>2500520510058@ietlucknow.ac.in</span>
        </motion.div>
      </div>
    </section>
  );
}
