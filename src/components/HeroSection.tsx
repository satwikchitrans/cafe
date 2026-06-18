'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const WHATSAPP_URL = 'https://wa.me/918580364890?text=Hi%20CHEMIKAZE%2C%20I%27d%20like%20to%20discuss%20a%20project.';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  /* ── Cursor-reveal wind pattern canvas ── */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for perf
    const mobile = window.innerWidth < 768;
    let w = 0, h = 0;
    let time = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    if (!mobile) window.addEventListener('mousemove', handleMouse);

    let raf: number;
    // Fewer lines on mobile for 60fps
    const lineCount = mobile ? 6 : 14;
    const stepSize = mobile ? 8 : 4;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.006;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const revealRadius = 220;

      for (let line = 0; line < lineCount; line++) {
        const baseY = h * 0.1 + line * (h * 0.07);
        const speed = 0.8 + line * 0.12;
        const amp = 25 + line * 6;

        ctx.beginPath();

        for (let x = 0; x < w; x += stepSize) {
          const y = baseY +
            Math.sin(x * 0.003 + time * speed + line * 0.5) * amp +
            Math.sin(x * 0.006 + time * 0.6) * (amp * 0.4);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // MUCH more visible base lines
        ctx.strokeStyle = `rgba(184, 151, 106, ${mobile ? 0.12 : 0.08})`;
        ctx.lineWidth = mobile ? 1.2 : 1;
        ctx.stroke();

        // Cursor-revealed brighter overlay (desktop only)
        if (!mobile) {
          ctx.beginPath();
          for (let x = 0; x < w; x += stepSize) {
            const y = baseY +
              Math.sin(x * 0.003 + time * speed + line * 0.5) * amp +
              Math.sin(x * 0.006 + time * 0.6) * (amp * 0.4);

            const dx = mx - x;
            const dy = my - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const t = Math.max(0, 1 - dist / revealRadius);

            if (t > 0.05) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(x, y, 1.5 + t * 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(184, 151, 106, ${t * 0.5})`;
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  const line = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 1.2, delay: 0.2 * i, ease: [0.19, 1, 0.22, 1] as const },
    }),
  };

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen md:min-h-[120vh] flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Floating accents */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-[12%] right-[8%] w-16 md:w-20 h-16 md:h-20 border border-gold/15 rounded-full animate-float-slow" />
        <div className="absolute top-[30%] right-[15%] w-6 md:w-8 h-6 md:h-8 border border-gold/10 rotate-45 animate-float" />
        <div className="absolute bottom-[25%] right-[10%] w-10 md:w-14 h-10 md:h-14 border border-stone/10 rounded-lg animate-float-reverse" />
        {/* Scroll indicator — desktop only */}
        <div className="absolute top-[20%] right-8 hidden lg:flex flex-col items-center gap-3">
          <div className="relative w-px h-20 bg-sand/40 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gold animate-scroll-line" />
          </div>
          <span className="label text-stone text-[0.55rem]" style={{ writingMode: 'vertical-lr' }}>SCROLL</span>
        </div>
      </div>

      {/* Content */}
      {showContent && (
        <div className="relative z-10 container-wide py-20 md:py-0">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] as const }}
              className="label text-graphite mb-6 md:mb-8"
            >
              We Engineer Systems That
            </motion.p>

            <motion.h1 style={isMobile ? {} : { y: headingY, opacity: headingOpacity }} className="mb-6 md:mb-8">
              <motion.span className="block heading-xl font-sans font-semibold text-ink leading-[1.1]" custom={0} initial="hidden" animate="visible" variants={line}>
                Move Businesses
              </motion.span>
              <motion.span className="block heading-xl font-serif italic text-gold leading-[1.1]" custom={1} initial="hidden" animate="visible" variants={line}>
                Forward.
              </motion.span>
            </motion.h1>

            <motion.div style={isMobile ? {} : { y: subY, opacity: subOpacity }}>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] as const }}
                className="body-lg text-graphite max-w-lg mb-8 md:mb-10"
              >
                Websites that convert. Automations that scale.
                <br className="hidden md:block" />
                AI agents that work while you grow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.19, 1, 0.22, 1] as const }}
                className="flex flex-col gap-2"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-ink text-ivory px-7 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-gold transition-colors duration-500 w-fit active:scale-95 transition-transform"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.346 0-4.542-.664-6.407-1.815l-.253-.153-2.627.881.881-2.627-.153-.253A9.963 9.963 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Let&rsquo;s Build Your System
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </a>
                <span className="text-xs text-stone ml-2">↳ We redirect to WhatsApp</span>
              </motion.div>
            </motion.div>

            {!isMobile && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="mt-12 text-xs text-stone flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l14 9-6 2-3 7-5-18z" /></svg>
                Move your cursor to reveal the wind
              </motion.p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
