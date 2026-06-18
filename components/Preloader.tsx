'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const letters = 'CHEMIKAZE'.split('');

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const progressVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 2.0,
      delay: 0.5,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    onComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
        >
          {/* Letter animation */}
          <div className="flex overflow-hidden" style={{ perspective: '600px' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="font-serif text-ink inline-block"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                  letterSpacing: '0.12em',
                  transformOrigin: 'bottom',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-48 sm:w-64 h-[2px] bg-sand overflow-hidden rounded-full">
            <motion.div
              variants={progressVariants}
              className="h-full w-full bg-gold origin-left rounded-full"
            />
          </div>

          {/* Subtle tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 text-xs uppercase tracking-[0.2em] text-graphite"
          >
            Digital Growth Partner
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
