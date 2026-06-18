'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';

const steps = [
  { num: '01', title: 'Discover', desc: 'We dive deep into your business, market, and goals to uncover opportunities.' },
  { num: '02', title: 'Design', desc: 'Strategic blueprints and user experiences crafted for maximum impact.' },
  { num: '03', title: 'Build', desc: 'Clean, performant code and systems engineered for scale.' },
  { num: '04', title: 'Automate', desc: 'Intelligent automation layers that eliminate friction and save time.' },
  { num: '05', title: 'Scale', desc: 'Continuous optimization and growth strategies that compound results.' },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.7], ['0%', '100%']);

  return (
    <section id="process" ref={sectionRef} className="section-padding bg-cream">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as const }}
        >
          <SectionLabel index="04" label="Process" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] as const }}
          className="heading-lg font-serif text-ink mt-10 mb-20"
        >
          How We <em className="italic text-gold">Work</em>
        </motion.h2>

        {/* ── Desktop: Horizontal ── */}
        <div className="hidden md:block relative">
          {/* Connecting line background */}
          <div className="absolute top-6 left-[10%] right-[10%] h-px bg-sand" />
          {/* Animated gold fill */}
          <motion.div
            className="absolute top-6 left-[10%] h-px bg-gold origin-left"
            style={{ width: lineWidth, maxWidth: '80%' }}
          />

          <div className="grid grid-cols-5 gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.12,
                  ease: [0.19, 1, 0.22, 1] as const,
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full border-2 border-sand bg-ivory flex items-center justify-center text-xs font-medium text-graphite mb-6 transition-all duration-500 hover:bg-ink hover:text-ivory hover:border-ink">
                  {step.num}
                </div>
                <h3 className="text-lg font-medium text-ink mb-2">{step.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: Vertical ── */}
        <div className="md:hidden relative pl-10">
          {/* Vertical line */}
          <div className="absolute top-0 left-5 bottom-0 w-px bg-sand" />
          <motion.div
            className="absolute top-0 left-5 w-px bg-gold origin-top"
            style={{
              height: lineWidth,
              maxHeight: '100%',
            }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.1,
                  ease: [0.19, 1, 0.22, 1] as const,
                }}
                className="relative"
              >
                {/* Node */}
                <div className="absolute -left-10 top-0 w-10 h-10 rounded-full border-2 border-sand bg-ivory flex items-center justify-center text-xs font-medium text-graphite">
                  {step.num}
                </div>
                <h3 className="text-lg font-medium text-ink mb-1">{step.title}</h3>
                <p className="text-sm text-graphite leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
