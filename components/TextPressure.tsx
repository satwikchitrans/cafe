'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextPressureProps {
  text: string;
  className?: string;
  maxDistance?: number;
  minWeight?: number;
  maxWeight?: number;
  minWidth?: number;
  maxWidth?: number;
  minSlant?: number;
  maxSlant?: number;
}

export function TextPressure({
  text,
  className = '',
  maxDistance = 300,
  minWeight = 300,
  maxWeight = 900,
  minWidth = 50,
  maxWidth = 100,
  minSlant = 0,
  maxSlant = -10, // Depending on the variable font, italic/slant can be positive or negative
}: TextPressureProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (!containerRef.current) return;

      animationFrameId = requestAnimationFrame(() => {
        charRefs.current.forEach((charEl) => {
          if (!charEl) return;

          const rect = charEl.getBoundingClientRect();
          const charCenterX = rect.left + rect.width / 2;
          const charCenterY = rect.top + rect.height / 2;

          const dx = mouseX - charCenterX;
          const dy = mouseY - charCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let influence = 1 - Math.min(distance / maxDistance, 1);
          // Optional: Add easing for smoother transition
          influence = influence * influence;

          const weight = minWeight + (maxWeight - minWeight) * influence;
          const width = minWidth + (maxWidth - minWidth) * influence;
          const slant = minSlant + (maxSlant - minSlant) * influence;

          charEl.style.fontVariationSettings = `"wght" ${weight}, "wdth" ${width}, "ital" ${Math.abs(slant)}`;
          charEl.style.transform = `translateY(${influence * -5}px)`;
          charEl.style.color = influence > 0.5 ? 'var(--color-midnight-accent)' : '';
        });
      });
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(() => {
        charRefs.current.forEach((charEl) => {
          if (!charEl) return;
          charEl.style.fontVariationSettings = `"wght" ${minWeight}, "wdth" ${minWidth}, "ital" ${minSlant}`;
          charEl.style.transform = `translateY(0)`;
          charEl.style.color = '';
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxDistance, maxWeight, minWeight, maxWidth, minWidth, maxSlant, minSlant]);

  return (
    <h1 ref={containerRef} className={`font-inter ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            charRefs.current[index] = el;
          }}
          className="inline-block transition-colors duration-200"
          style={{
            fontVariationSettings: `"wght" ${minWeight}, "wdth" ${minWidth}, "ital" ${minSlant}`,
            transition: 'transform 0.1s ease-out, font-variation-settings 0.1s ease-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}
