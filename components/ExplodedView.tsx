'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExplodedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null); // Cup base
  const layer2Ref = useRef<HTMLDivElement>(null); // Espresso
  const layer3Ref = useRef<HTMLDivElement>(null); // Milk
  const layer4Ref = useRef<HTMLDivElement>(null); // Foam
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        pin: pinRef.current,
        scrub: 1,
      },
    });

    // Initial state: stacked together
    gsap.set([layer1Ref.current, layer2Ref.current, layer3Ref.current, layer4Ref.current], {
      y: 0,
      opacity: 1,
      scale: 1,
    });

    // 1. Explode outwards
    tl.to(layer4Ref.current, { y: -150, x: -50, rotation: -10, scale: 1.1 }, 0)
      .to(layer3Ref.current, { y: -50, x: 50, rotation: 10, scale: 1.1 }, 0)
      .to(layer2Ref.current, { y: 50, x: -30, rotation: -5, scale: 1.1 }, 0)
      .to(layer1Ref.current, { y: 150, x: 20, rotation: 5, scale: 1.1 }, 0)
      .to(textRef.current, { opacity: 1, y: -20 }, 0.5);

    // 2. Fly back together and lock into a new layout
    tl.to(layer4Ref.current, { y: -30, x: 0, rotation: 0, scale: 1 }, 1)
      .to(layer3Ref.current, { y: -10, x: 0, rotation: 0, scale: 1 }, 1)
      .to(layer2Ref.current, { y: 10, x: 0, rotation: 0, scale: 1 }, 1)
      .to(layer1Ref.current, { y: 30, x: 0, rotation: 0, scale: 1 }, 1)
      .to(textRef.current, { opacity: 0 }, 1.5);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-midnight-bg">
      <div ref={pinRef} className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div ref={textRef} className="absolute top-32 text-center opacity-0">
          <h2 className="text-[#FF6B50] font-inter font-bold text-3xl md:text-5xl tracking-tight uppercase">Anatomy of our Brew</h2>
          <p className="text-[#888888] mt-4 font-satoshi">Every layer crafted with precision.</p>
        </div>

        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Layer 1: Cup */}
          <div ref={layer1Ref} className="absolute z-10 w-48 h-24 bg-[#111111] rounded-b-3xl border border-[#333333] shadow-2xl flex items-end justify-center pb-4">
            <span className="text-[#666666] text-xs font-bold uppercase tracking-widest">Ceramic Base</span>
          </div>

          {/* Layer 2: Espresso */}
          <div ref={layer2Ref} className="absolute z-20 w-48 h-12 bg-[#3A1B00] border-t border-[#4A2B10] shadow-inner top-[55%] -translate-y-1/2 flex items-center justify-center">
            <span className="text-[#FF6B50] text-[10px] font-bold uppercase tracking-widest opacity-80">Double Ristretto</span>
          </div>

          {/* Layer 3: Steamed Milk */}
          <div ref={layer3Ref} className="absolute z-30 w-48 h-16 bg-[#F5F5F7] shadow-inner top-[45%] -translate-y-1/2 flex items-center justify-center">
            <span className="text-[#333333] text-[10px] font-bold uppercase tracking-widest">Velvet Microfoam</span>
          </div>

          {/* Layer 4: Foam Art */}
          <div ref={layer4Ref} className="absolute z-40 w-48 h-8 bg-[#FFFDD0] border border-[#E5D5B0] rounded-t-xl top-[35%] -translate-y-1/2 flex items-center justify-center">
            <span className="text-[#96784F] text-[10px] font-bold uppercase tracking-widest">Latte Art</span>
          </div>
        </div>

      </div>
    </section>
  );
}
