'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';

const stats = [
  { value: 98, suffix: '%', label: 'Client Satisfaction', animate: true },
  { value: 3, suffix: 'x', label: 'Faster Operations', animate: true },
  { value: 40, suffix: '%', label: 'More Lead Conversion', animate: true },
  { value: 0, suffix: '', display: '24/7', label: 'Automated Engagement', animate: false },
];

function AnimatedCounter({ value, suffix, animate, display }: {
  value: number;
  suffix: string;
  animate: boolean;
  display?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView || !animate) return;
    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, animate]);

  return (
    <span ref={ref} className="heading-xl font-serif text-ink tabular-nums">
      {animate ? count : display}
      {suffix && <span className="text-gold">{suffix}</span>}
    </span>
  );
}

export default function ImpactStats() {
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
          <SectionLabel index="05" label="Impact" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const }}
          className="heading-lg font-serif text-ink mt-10 mb-20"
        >
          Numbers That <em className="italic text-gold">Speak</em>
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.1,
                ease: [0.19, 1, 0.22, 1] as const,
              }}
              className="text-center lg:text-left"
            >
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                animate={s.animate}
                display={s.display}
              />
              <p className="label text-graphite mt-3">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="divider mt-24"
        />
      </div>
    </section>
  );
}
