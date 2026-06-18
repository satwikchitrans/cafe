'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';

const ease = [0.19, 1, 0.22, 1] as const;
const WHATSAPP_URL = 'https://wa.me/918580364890?text=Hi%20CHEMIKAZE%2C%20I%27d%20like%20to%20discuss%20a%20project.';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-padding bg-ivory">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel index="01" label="Why CHEMIKAZE Exists" />
        </motion.div>

        <div className="mt-16 flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left — Statement */}
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.12, ease }}
              className="heading-lg font-serif text-ink mb-8"
            >
              Most businesses don&rsquo;t fail
              <br />because of competition.
              <br />They fail because of{' '}
              <em className="italic text-gold">systems.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.24, ease }}
              className="body-md text-graphite mb-6"
            >
              We exist to change that. We help businesses build the backend power,
              automation and intelligence they need to grow — consistently.
            </motion.p>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.36, ease }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink font-medium hover:text-gold transition-colors duration-300"
            >
              Learn more about us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
            </motion.a>
          </div>

          {/* Right — Philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="lg:w-1/2"
          >
            <div className="bg-cream rounded-2xl p-8 md:p-10 border border-sand/40 relative overflow-hidden">
              <p className="label text-gold mb-6">Our Philosophy</p>
              <p className="heading-md font-serif text-ink leading-snug">
                We don&rsquo;t chase trends.
                <br />We build systems
                <br />that stand the test of time.
              </p>
              {/* Decorative signature-like element */}
              <div className="mt-8 flex items-center gap-3">
                <div className="w-10 h-px bg-gold" />
                <span className="text-xs text-graphite italic font-serif">— Team CHEMIKAZE</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.48, ease }}
          className="divider mt-24"
        />
      </div>
    </section>
  );
}
