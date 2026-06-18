'use client';

import { useRef, useCallback, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const rect = wrap.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    gsap.to(inner, {
      x: dx * 0.3,
      y: dy * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;

    gsap.to(inner, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  const baseClasses = [
    'magnetic-wrap',
    'rounded-full',
    'px-8 py-4',
    'inline-flex items-center justify-center',
    'transition-colors duration-300 ease-out',
    'cursor-pointer',
  ].join(' ');

  const variantClasses =
    variant === 'primary'
      ? 'bg-ink text-ivory hover:bg-gold'
      : 'border border-charcoal/20 text-charcoal hover:border-gold hover:text-ink';

  const labelClasses = 'uppercase tracking-widest text-xs font-medium inline-block';

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  const content = (
    <span ref={innerRef} className={labelClasses}>
      {children}
    </span>
  );

  if (href) {
    return (
      <div
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-flex"
      >
        <a href={href} onClick={onClick} className={combinedClasses}>
          {content}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      <button type="button" onClick={onClick} className={combinedClasses}>
        {content}
      </button>
    </div>
  );
}
