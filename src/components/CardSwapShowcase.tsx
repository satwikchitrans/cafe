'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils'; // I'll inline the generic cn below

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  onCardClick?: (idx: number) => void;
  children: React.ReactNode[];
}

export function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  skewAmount = 6,
  easing = 'elastic',
  onCardClick,
  children,
}: CardSwapProps) {
  const [activeCard, setActiveCard] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);

  const numCards = React.Children.count(children);

  const animateCards = (newActive: number) => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const offset = (index - newActive + numCards) % numCards;
      
      let x = offset * cardDistance;
      let y = offset * verticalDistance;
      let scale = 1 - offset * 0.05;
      let zIndex = numCards - offset;
      let opacity = 1 - offset * 0.2;
      let skewY = offset === 0 ? 0 : -skewAmount;
      
      gsap.to(card, {
        x,
        y,
        scale,
        zIndex,
        opacity,
        skewY,
        duration: easing === 'elastic' ? 1.2 : 0.6,
        ease: easing === 'elastic' ? 'elastic.out(1, 0.6)' : 'power3.out',
      });
    });
  };

  useEffect(() => {
    animateCards(activeCard);
  }, [activeCard]);

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % numCards);
  };

  useEffect(() => {
    if (pauseOnHover && isHovered.current) return;

    timerRef.current = setInterval(() => {
      nextCard();
    }, delay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [delay, pauseOnHover, numCards]);

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-full"
      style={{ height: `calc(${height}px + ${numCards * verticalDistance}px)` }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          ref={(el) => { cardsRef.current[index] = el; }}
          className="absolute rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-[#333333] bg-[#111111]"
          style={{ 
            width, 
            height, 
            maxWidth: 'calc(100vw - 32px)', 
            maxHeight: '55vh',
            transformOrigin: 'bottom left' 
          }}
          onClick={() => {
            if (activeCard !== index) {
              setActiveCard(index);
            } else if (onCardClick) {
              onCardClick(index);
            }
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`w-full h-full p-8 ${className}`}>
      {children}
    </div>
  );
}

export default CardSwap;
