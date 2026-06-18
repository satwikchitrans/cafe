'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';

const ease = [0.19, 1, 0.22, 1] as const;

const losses = [
  { icon: '⚡', title: 'Missed Leads', desc: 'Every minute without automation is a potential customer lost to a faster competitor.', color: 'from-red-500/10 to-transparent' },
  { icon: '⏳', title: 'Delayed Responses', desc: 'Customers expect instant replies. A 5-minute delay reduces qualification rates by 80%.', color: 'from-orange-500/10 to-transparent' },
  { icon: '🔄', title: 'Repetitive Manual Work', desc: 'Your team spends hours on tasks that could be automated in seconds.', color: 'from-yellow-500/10 to-transparent' },
  { icon: '📉', title: 'Lost Opportunities', desc: 'Without proper follow-up systems, warm leads go cold overnight.', color: 'from-pink-500/10 to-transparent' },
  { icon: '💬', title: 'Inconsistent Communication', desc: 'Manual messaging creates gaps. Customers slip through the cracks.', color: 'from-purple-500/10 to-transparent' },
  { icon: '⏰', title: 'Team Inefficiency', desc: 'High-value employees stuck doing low-value repetitive processes.', color: 'from-blue-500/10 to-transparent' },
];

function LossCard({ item, index }: { item: typeof losses[0]; index: number }) {
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
        transition={{ duration: 0.7, delay: index * 0.08, ease }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`cursor-pointer rounded-2xl border transition-all duration-500 ${
          isExpanded
            ? 'card-expanded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[85vw] max-w-md p-10 shadow-2xl'
            : 'bg-ivory/50 border-sand/40 p-6 md:p-8 hover:-translate-y-1 hover:shadow-lg hover:shadow-sand/20 group'
        }`}
      >
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 transition-transform duration-500 ${isExpanded ? 'scale-125' : 'group-hover:scale-110'}`}>
          {item.icon}
        </div>
        <h3 className="text-lg font-medium text-ink mb-2">{item.title}</h3>
        <p className="text-sm text-graphite leading-relaxed">{item.desc}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease }}
              className="mt-4 pt-4 border-t border-sand/30"
            >
              <p className="text-xs text-gold font-medium uppercase tracking-wider">The Cost of Inaction</p>
              <p className="text-sm text-graphite mt-2 leading-relaxed">
                Businesses that delay automation lose ground to competitors who move faster. Every day without a system in place is revenue left on the table.
              </p>
              <p className="mt-4 text-xs text-stone text-center">Tap outside to close</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <p className="text-xs text-gold mt-4 font-medium">Tap to learn more →</p>
        )}
      </motion.div>
    </>
  );
}

export default function BusinessLosses() {
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
          <SectionLabel index="03" label="The Problem" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="heading-lg font-serif text-ink mt-10 mb-6"
        >
          What Businesses <em className="italic text-gold">Lose</em>
          <br />Without Automation
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="body-md text-graphite max-w-2xl mb-16"
        >
          Every manual process is a bottleneck. Every delayed response is a lost customer.
          Here&rsquo;s what&rsquo;s costing your business growth right now.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {losses.map((item, i) => (
            <LossCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
