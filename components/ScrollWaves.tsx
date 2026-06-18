'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useScroll } from 'framer-motion';

export default function ScrollWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => { scrollRef.current = v; });
    return unsub;
  }, [scrollYProgress]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mobile = window.innerWidth < 768;
    let w = 0;
    const h = mobile ? 200 : 300;

    const resize = () => {
      w = window.innerWidth;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let raf: number;
    const lineCount = mobile ? 4 : 8;
    const step = mobile ? 6 : 3;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.008;
      const scroll = scrollRef.current;

      for (let line = 0; line < lineCount; line++) {
        const baseY = h * 0.25 + line * (h * 0.09);
        const alpha = 0.08 + line * 0.03;
        const speed = 0.8 + line * 0.25;
        const amplitude = 18 + line * 7 + scroll * 35;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(184, 151, 106, ${alpha})`;
        ctx.lineWidth = 1.2;

        for (let x = 0; x < w; x += step) {
          const y = baseY +
            Math.sin(x * 0.003 + time * speed + line) * amplitude +
            Math.sin(x * 0.007 + time * speed * 0.4) * (amplitude * 0.4) +
            scroll * 50 * Math.sin(x * 0.004 + line);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Particle dots
      const particleCount = mobile ? 10 : 25;
      for (let i = 0; i < particleCount; i++) {
        const px = ((time * 25 * (1 + i * 0.15) + i * 180) % (w + 80)) - 40;
        const lineIdx = i % lineCount;
        const baseY = h * 0.25 + lineIdx * (h * 0.09);
        const amplitude = 18 + lineIdx * 7 + scroll * 35;
        const speed = 0.8 + lineIdx * 0.25;
        const py = baseY +
          Math.sin(px * 0.003 + time * speed + lineIdx) * amplitude +
          Math.sin(px * 0.007 + time * speed * 0.4) * (amplitude * 0.4) +
          scroll * 50 * Math.sin(px * 0.004 + lineIdx);

        const a = 0.2 + Math.sin(time + i) * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 151, 106, ${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  return (
    <div className="w-full overflow-hidden pointer-events-none bg-ivory">
      <canvas ref={canvasRef} className="w-full" />
    </div>
  );
}
