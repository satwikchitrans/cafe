'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';

const benefits = [
  {
    title: 'Faster Operations',
    desc: 'Streamlined workflows and automated processes that save hours every week.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M17 3L5 19h10l-2 10L25 13H15l2-10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Higher Conversions',
    desc: 'Data-driven design and optimization that turn visitors into customers.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M4 24l8-8 5 5L28 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 8h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Better Engagement',
    desc: '24/7 automated communication that keeps customers connected.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M8 14a8 8 0 1116 0c0 4-4 5-4 8H12c0-3-4-4-4-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 26h8M14 30h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Reduced Manual Work',
    desc: 'AI-powered automation that handles repetitive tasks so your team can focus on growth.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Scalable Systems',
    desc: 'Infrastructure that grows with your business without breaking.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <rect x="4" y="18" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="10" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: 'Long-term Growth',
    desc: 'Strategic solutions designed for sustainable, compounding returns.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M16 28V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 14c0-5 4-8 4-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 14c0-4-3-7-4-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 18c-2 0-5 1-6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 18c2 0 5 1 6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as const }}
        >
          <SectionLabel index="03" label="Why Us" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const }}
          className="heading-lg font-serif text-ink mt-10 mb-16"
        >
          Why Businesses Choose{' '}
          <em className="italic text-gold">CHEMIKAZE</em>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.1,
                ease: [0.19, 1, 0.22, 1] as const,
              }}
              className="group"
            >
              <div className="text-gold mb-5 transition-transform duration-500 group-hover:scale-110">
                {b.icon}
              </div>
              <h3 className="text-lg font-medium text-ink mb-2">{b.title}</h3>
              <p className="body-md text-graphite">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
