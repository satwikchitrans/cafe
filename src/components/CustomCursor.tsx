'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Dot follows directly
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(${isHovering.current ? 2.5 : 1})`;
    };

    const handleMouseEnterInteractive = () => {
      isHovering.current = true;
      if (dot) {
        dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(2.5)`;
      }
      if (ring) {
        ring.style.width = '56px';
        ring.style.height = '56px';
      }
    };

    const handleMouseLeaveInteractive = () => {
      isHovering.current = false;
      if (dot) {
        dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px) scale(1)`;
      }
      if (ring) {
        ring.style.width = '40px';
        ring.style.height = '40px';
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible.current = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Follower ring animation loop
    const animate = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      ringPos.current.x += dx * 0.15;
      ringPos.current.y += dy * 0.15;

      const ringWidth = isHovering.current ? 56 : 40;
      const offset = ringWidth / 2;

      ring.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;

      rafId.current = requestAnimationFrame(animate);
    };

    // Bind events
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Attach hover listeners to all interactive elements
    const attachInteractiveListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });

      return interactiveElements;
    };

    let interactiveElements = attachInteractiveListeners();

    // Observe DOM changes to re-attach listeners
    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
      interactiveElements = attachInteractiveListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Start animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });

      observer.disconnect();

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[999]"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#2A2825',
          mixBlendMode: 'difference',
          opacity: 0,
          transition: 'width 0.3s ease, height 0.3s ease',
          willChange: 'transform',
        }}
      />

      {/* Follower ring */}
      <div
        ref={ringRef}
        className="cursor-follower pointer-events-none fixed top-0 left-0 z-[998]"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1.5px solid #2A2825',
          mixBlendMode: 'difference',
          opacity: 0,
          transition: 'width 0.35s ease, height 0.35s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
