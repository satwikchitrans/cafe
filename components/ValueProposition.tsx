'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.19, 1, 0.22, 1] as const;

const columns = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 4v24M8 12l8-8 8 8M4 24h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'What businesses lose without automation',
    items: [
      'Missed leads',
      'Slow response times',
      'Wasted employee hours',
      'Poor follow-up',
      'Inconsistent communication',
      'Lost revenue',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12h24M10 18h6M10 22h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'What a high-performance website should do',
    items: [
      'Build trust instantly',
      'Generate qualified leads',
      'Explain your business clearly',
      'Work perfectly on mobile',
      'Convert visitors into customers',
      'Strengthen your brand',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M22 8l4-4M26 8l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Why Agentic AI matters',
    items: [
      'Works 24/7 without breaks',
      'Handles repetitive tasks',
      'Improves operational efficiency',
      'Reduces manual workload',
      'Allows your team to focus on growth',
      'Scales with your business',
    ],
  },
];

export default function ValueProposition() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-wide">
        {/* Header text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center label text-graphite tracking-[0.25em] mb-20"
        >
          Without the right systems, businesses lose every single day.
        </motion.p>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease }}
              className="group"
            >
              <div className="text-graphite mb-5 group-hover:text-gold transition-colors duration-300">
                {col.icon}
              </div>
              <h3 className="text-base font-semibold text-ink mb-5 leading-snug">{col.title}</h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-graphite">
                    <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
