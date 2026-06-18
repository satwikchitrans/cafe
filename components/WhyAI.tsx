'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';

const ease = [0.19, 1, 0.22, 1] as const;

const benefits = [
  { icon: '🌙', title: 'Works 24/7', desc: 'AI agents never sleep. They handle inquiries, process tasks, and serve customers around the clock — even while your team rests.' },
  { icon: '⚙️', title: 'Handles Repetitive Tasks', desc: 'Data entry, follow-ups, scheduling, reporting — AI handles the tasks your team shouldn\'t waste time on.' },
  { icon: '📈', title: 'Improves Efficiency', desc: 'Processes that take hours are completed in seconds. AI removes bottlenecks and accelerates every workflow.' },
  { icon: '💰', title: 'Reduces Operational Costs', desc: 'Automate the equivalent of multiple full-time roles without the overhead. Scale output, not headcount.' },
  { icon: '🚀', title: 'Accelerates Business Growth', desc: 'When operations run faster and customers are served better, growth becomes inevitable.' },
  { icon: '🧠', title: 'Scales Processes Intelligently', desc: 'AI systems learn and adapt. They get smarter over time, continuously optimizing your workflows.' },
  { icon: '🎯', title: 'Frees Teams for Higher-Value Work', desc: 'Let your people focus on strategy, creativity, and relationships — the work that actually moves the needle.' },
];

function AICard({ item, index }: { item: typeof benefits[0]; index: number }) {
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
            : 'bg-cream/60 border-sand/40 p-6 hover:-translate-y-1 hover:shadow-lg hover:shadow-sand/20'
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

export default function WhyAI() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <SectionLabel index="05" label="The Future" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="heading-lg font-serif text-ink mt-10 mb-6"
        >
          Why Agentic AI
          <br /><em className="italic text-gold">Matters</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="body-md text-graphite max-w-2xl mb-16"
        >
          AI isn&rsquo;t coming — it&rsquo;s here. Businesses that adopt intelligent automation now
          will outpace those that wait.
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {benefits.map((item, i) => (
            <AICard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
