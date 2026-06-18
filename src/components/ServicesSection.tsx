'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from './SectionLabel';

const ease = [0.19, 1, 0.22, 1] as const;

const services = [
  {
    id: 'web',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 12l12-6 12 6v16l-12 6-12-6V12z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l12 6 12-6M20 18v16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    name: 'Digital Presence Engine',
    subtitle: 'Website Development',
    shortDesc: 'High-performance, conversion-focused websites that build trust and drive real business results.',
    details: ['Conversion-focused design', 'Lightning-fast performance', 'Mobile-first & responsive', 'SEO-ready structure', 'Easy to manage'],
    why: 'Your website builds trust in 0.05 seconds and turns strangers into customers — without ever taking a break.',
  },
  {
    id: 'whatsapp',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 6C12.268 6 6 12.268 6 20c0 2.52.672 4.884 1.84 6.924L6 34l7.28-1.82A13.935 13.935 0 0020 34c7.732 0 14-6.268 14-14S27.732 6 20 6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 17.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v1c0 1.38-1.12 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    name: 'Customer Flow Engine',
    subtitle: 'WhatsApp Automation',
    shortDesc: 'Automate conversations, capture leads, and close more deals on autopilot — 24/7.',
    details: ['Smart lead qualification', 'Automated follow-ups', 'CRM integration', '24/7 customer support', 'Higher conversions'],
    why: 'Every minute without automation is a lost customer. Capture leads instantly and nurture relationships while your team sleeps.',
  },
  {
    id: 'ai',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 16l4 4-4 4M10 16l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    name: 'Autonomous Growth Engine',
    subtitle: 'Agentic AI',
    shortDesc: 'Intelligent AI agents that work 24/7 to handle tasks, make decisions and drive growth.',
    details: ['AI workflow automation', 'Intelligent task execution', 'Data processing & insights', 'Custom AI agents', 'Scale without limits'],
    why: 'AI agents think, act, and deliver. They handle repetitive tasks and free your team for work that actually moves the needle.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isExpanded]);

  // Cursor-reveal pattern (desktop only)
  const initPattern = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 768) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let mx = -999, my = -999;
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouse);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const spacing = 35;
      const revealRadius = 150;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const dx = mx - x, dy = my - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > revealRadius) continue;
          const t = 1 - dist / revealRadius;
          ctx.beginPath();
          ctx.arc(x, y, 1 + t * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(184, 151, 106, ${t * 0.25})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  useEffect(() => {
    const cleanup = initPattern();
    return cleanup;
  }, [initPattern]);

  const closeOverlay = () => {
    setIsExpanded(false);
    setActiveCard(null);
  };

  return (
    <section ref={sectionRef} id="services" className="section-padding bg-cream relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto hidden md:block" />

      <div className="container-wide relative z-10">
        <SectionLabel index="02" label="What We Do" />
        <h2 className="heading-lg font-serif text-ink mt-10 mb-12 md:mb-16">
          Our Core <em className="italic text-gold">Systems</em>
        </h2>

        {/* Left-side feature list */}
        <div className="max-w-sm">
          {services.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setIsExpanded(true)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left rounded-xl border border-sand/40 bg-ivory/60 hover:bg-ivory hover:border-gold/30 transition-all duration-300 mb-3 group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              <div className="text-graphite group-hover:text-gold transition-colors duration-300 flex-shrink-0">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">{s.name}</p>
                <p className="text-xs text-graphite">{s.subtitle}</p>
              </div>
              <svg className="w-4 h-4 text-stone group-hover:text-gold transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </motion.button>
          ))}
          <p className="text-xs text-graphite mt-2 pl-2">Click a system to explore →</p>
        </div>
      </div>

      {/* === FLOATING CARDS OVERLAY === */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-40 bg-ink/12 backdrop-blur-md cursor-pointer"
              onClick={closeOverlay}
            />

            {/* Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              className="fixed inset-0 z-50 flex items-start md:items-center justify-center pointer-events-none px-4 pt-20 pb-8 md:py-16 overflow-y-auto"
            >
              <div className="flex flex-col md:flex-row gap-3 pointer-events-auto w-full max-w-5xl items-stretch">
                {services.map((s, i) => {
                  const isActive = activeCard === s.id;
                  const isShrunk = activeCard !== null && !isActive;

                  return (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.45, delay: i * 0.06, ease }}
                      onMouseEnter={() => { if (!isMobile) setActiveCard(s.id); }}
                      onMouseLeave={() => { if (!isMobile) setActiveCard(null); }}
                      onClick={(e) => {
                        if (isMobile) {
                          e.stopPropagation();
                          setActiveCard(activeCard === s.id ? null : s.id);
                        }
                      }}
                      className={`rounded-2xl border bg-ivory/92 backdrop-blur-xl overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-auto ${
                        isActive
                          ? 'shadow-2xl shadow-gold/10 border-gold/30 flex-[2.5] md:flex-[2.2]'
                          : isShrunk
                          ? 'shadow-sm shadow-sand/10 border-sand/25 opacity-60 scale-[0.97] flex-[0.6]'
                          : 'shadow-lg shadow-sand/15 border-sand/35 flex-1'
                      }`}
                    >
                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className={`text-gold mb-3 transition-transform duration-500 ease-out ${isActive ? 'scale-110 origin-left' : ''}`}>
                          {s.icon}
                        </div>

                        <h4 className="text-base md:text-lg font-medium text-ink mb-1 whitespace-nowrap">{s.name}</h4>
                        <p className="text-xs text-graphite mb-3 whitespace-nowrap">{s.subtitle}</p>
                        <p className="text-sm text-graphite leading-relaxed flex-1">{s.shortDesc}</p>

                        {/* ONLY this card expands — others stay collapsed */}
                        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                          isActive ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="border-t border-sand/25 pt-4 mt-1 mb-3">
                            <p className="text-[11px] text-gold font-medium uppercase tracking-wider mb-2">Why This Matters</p>
                            <p className="text-sm text-charcoal leading-relaxed mb-4">{s.why}</p>
                          </div>
                          <ul className="space-y-2 pb-2">
                            {s.details.map((d) => (
                              <li key={d} className="flex items-center gap-2 text-sm text-graphite">
                                <svg className="w-3.5 h-3.5 text-gold flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
