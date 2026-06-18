'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';

const testimonials = [
  {
    quote:
      'CHEMIKAZE transformed our entire digital presence. Our website now converts 3x more visitors, and the WhatsApp automation handles 80% of customer inquiries automatically.',
    name: 'Arjun Mehta',
    role: 'CEO at ScaleUp Ventures',
  },
  {
    quote:
      'Their AI solutions automated our entire onboarding process. What used to take our team 4 hours now happens in minutes. Absolute game-changer.',
    name: 'Priya Sharma',
    role: 'COO at NovaTech Solutions',
  },
  {
    quote:
      'Working with CHEMIKAZE felt like adding a senior tech team to our company overnight. Strategic, fast, and incredibly precise.',
    name: 'Vikram Patel',
    role: 'Founder at GrowthEngine Labs',
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as const }}
        >
          <SectionLabel index="06" label="Testimonials" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const }}
          className="heading-lg font-serif text-ink mt-10 mb-16"
        >
          Client <em className="italic text-gold">Stories</em>
        </motion.h2>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.12,
                ease: [0.19, 1, 0.22, 1] as const,
              }}
              className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-ivory rounded-2xl p-8 md:p-10 border border-sand/50"
            >
              {/* Quotation mark */}
              <span className="block font-serif text-6xl text-gold/20 leading-none mb-4 select-none">
                &ldquo;
              </span>
              <p className="body-lg text-charcoal font-serif italic mb-8 leading-relaxed">
                {t.quote}
              </p>
              <div className="w-10 h-px bg-gold mb-5" />
              <p className="text-sm font-medium text-ink">{t.name}</p>
              <p className="text-xs text-graphite mt-0.5">{t.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
