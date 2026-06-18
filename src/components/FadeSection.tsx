'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wrapper component that fades children in smoothly when scrolled into view.
 * Uses Framer Motion whileInView with a gentle upward slide.
 */
export default function FadeSection({ children, className = '', delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.19, 1, 0.22, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
