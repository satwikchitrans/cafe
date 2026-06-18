'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalScrollTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const getScrollAmount = () => {
      const textWidth = textRef.current?.scrollWidth || 0;
      return -(textWidth); // scroll completely
    };

    const tl = gsap.to(textRef.current, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top', // Pin when it reaches the top
        end: () => `+=${textRef.current?.scrollWidth || window.innerWidth}`, // End after scrolling its width
        scrub: 1,
        pin: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#050505] flex items-center overflow-hidden border-y border-[#1a1a1a]"
    >
      <div className="w-full flex overflow-hidden whitespace-nowrap px-10">
        <div ref={textRef} className="flex items-center gap-8 md:gap-16">
          <span className="text-4xl md:text-8xl font-inter font-light text-[#ebebeb]">In every cup,</span>
          
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF6B50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin-slow">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          
          <span className="text-4xl md:text-8xl font-inter font-semibold text-white tracking-tighter italic">discover the undeniable</span>
          
          <div className="w-16 h-1 bg-[#333333] rounded-full"></div>
          
          <span className="text-4xl md:text-8xl font-inter font-black text-[#FF6B50] uppercase tracking-widest">Real Magic</span>
          
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ebebeb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
          </svg>

          <span className="text-4xl md:text-8xl font-inter font-light text-[#888888]">of sharing pure</span>

          <span className="text-4xl md:text-8xl font-satoshi font-medium text-white bg-[#111111] px-8 py-2 rounded-full border border-[#333333]">Refreshment</span>

          <span className="text-4xl md:text-8xl font-inter font-light text-[#ebebeb]">that brings us</span>

          <span className="text-4xl md:text-8xl font-inter font-extrabold text-transparent" style={{ WebkitTextStroke: '2px #FF6B50' }}>TOGETHER</span>
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B50] to-[#E55A40] blur-xl opacity-50 shrink-0"></div>
        </div>
      </div>
    </section>
  );
}
