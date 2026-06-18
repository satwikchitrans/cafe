'use client';

import { motion } from 'framer-motion';

interface SectionLabelProps {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
      className="border-l-2 border-gold pl-4"
    >
      <span className="text-xs uppercase tracking-widest text-graphite font-medium">
        {index}
        <span className="mx-3">—</span>
        {label}
      </span>
    </motion.div>
  );
}
