'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';

const ease = [0.19, 1, 0.22, 1] as const;

const points = [
  { icon: '🤝', title: 'Build Trust Immediately', desc: 'First impressions happen in 0.05 seconds. A premium website signals credibility before a single word is read.' },
  { icon: '🎯', title: 'Convert Visitors Into Customers', desc: 'Strategic design guides visitors through a clear journey — from curiosity to commitment.' },
  { icon: '💎', title: 'Clearly Communicate Value', desc: 'Your website should explain what you do, why it matters, and how to get started — in seconds.' },
  { icon: '📱', title: 'Work Flawlessly on Mobile', desc: 'Over 70% of web traffic is mobile. If your site isn\'t perfect on phones, you\'re losing the majority of visitors.' },
  { icon: '🔍', title: 'Improve Search Visibility', desc: 'SEO-ready architecture means your business gets found by the right people at the right time.' },
  { icon: '✨', title: 'Create a Premium First Impression', desc: 'Design quality signals business quality. A polished website tells customers you take your work seriously.' },
  { icon: '📊', title: 'Generate Qualified Leads', desc: 'Every element — from copy to CTAs — should work together to attract and convert your ideal customers.' },
];

function ValueCard({ item, index }: { item: typeof points[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="card-backdrop"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: index * 0.07, ease }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`cursor-pointer rounded-2xl border transition-all duration-500 ${
          isExpanded
            ? 'card-expanded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[85vw] max-w-md p-10 shadow-2xl'
            : 'bg-ivory/50 border-sand/40 p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-sand/20'
        }`}
      >
        <div className="text-2xl mb-3">{item.icon}</div>
        <h3 className="text-base font-medium text-ink mb-2">{item.title}</h3>

        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease }}
            >
              <p className="text-sm text-graphite leading-relaxed">{item.desc}</p>
              <p className="mt-4 text-xs text-stone text-center">Tap outside to close</p>
            </motion.div>
          ) : (
            <motion.p key="collapsed" className="text-xs text-gold font-medium">
              Tap to learn more →
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default function WebsiteValue() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel index="04" label="Standards" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="heading-lg font-serif text-ink mt-10 mb-6"
        >
          What a High-Performance Website
          <br /><em className="italic text-gold">Should Do</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="body-md text-graphite max-w-2xl mb-16"
        >
          A website isn&rsquo;t a digital brochure. It&rsquo;s your hardest-working employee —
          available 24/7, never taking a day off.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {points.map((item, i) => (
            <ValueCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
