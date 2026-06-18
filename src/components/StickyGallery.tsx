'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesData = [
  {
    id: 'web',
    title: 'Digital Presence Engine',
    category: 'Website Development',
    description: 'High-performance, conversion-focused websites that build trust and drive real business results.',
    color: 'bg-blue-900',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M8 12l12-6 12 6v16l-12 6-12-6V12z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12l12 6 12-6M20 18v16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    details: ['Conversion-focused design', 'Lightning-fast performance', 'Mobile-first & responsive', 'SEO-ready structure', 'Easy to manage'],
    why: 'Your website builds trust in 0.05 seconds and turns strangers into customers — without ever taking a break.',
  },
  {
    id: 'whatsapp',
    title: 'Customer Flow Engine',
    category: 'WhatsApp Automation',
    description: 'Automate conversations, capture leads, and close more deals on autopilot — 24/7.',
    color: 'bg-emerald-900',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <path d="M20 6C12.268 6 6 12.268 6 20c0 2.52.672 4.884 1.84 6.924L6 34l7.28-1.82A13.935 13.935 0 0020 34c7.732 0 14-6.268 14-14S27.732 6 20 6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 17.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v1c0 1.38-1.12 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    details: ['Smart lead qualification', 'Automated follow-ups', 'CRM integration', '24/7 customer support', 'Higher conversions'],
    why: 'Every minute without automation is a lost customer. Capture leads instantly and nurture relationships while your team sleeps.',
  },
  {
    id: 'ai',
    title: 'Autonomous Growth Engine',
    category: 'Agentic AI',
    description: 'Intelligent AI agents that work 24/7 to handle tasks, make decisions and drive growth.',
    color: 'bg-purple-900',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 28c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 16l4 4-4 4M10 16l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    details: ['AI workflow automation', 'Intelligent task execution', 'Data processing & insights', 'Custom AI agents', 'Scale without limits'],
    why: 'AI agents think, act, and deliver. They handle repetitive tasks and free your team for work that actually moves the needle.',
  }
];

export default function StickyGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const initScroll = () => {
        const sections = gsap.utils.toArray('.portfolio-panel');
        
        // Horizontal scroll animation
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            // The scroll distance depends on the total width to slide
            end: () => `+=${wrapperRef.current?.offsetWidth || window.innerWidth}`,
            invalidateOnRefresh: true,
          }
        });
      };

      // Safety check / small delay to ensure DOM is fully rendered and widths are accurate before ScrollTrigger calculates pinning logic
      const timeoutId = setTimeout(() => {
        initScroll();
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timeoutId);
    }, containerRef); // Scope to containerRef

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} className="overflow-hidden bg-zinc-950 text-white relative h-screen">
        <div className="absolute top-12 left-12 md:top-24 md:left-24 z-10 pointer-events-none mix-blend-difference">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">What We Do</h2>
          <p className="text-zinc-400 mt-2 text-lg">Our core systems and services.</p>
        </div>

        <div 
          ref={wrapperRef} 
          className="flex h-screen will-change-transform" 
          style={{ width: `${servicesData.length * 100}vw` }}
        >
          {servicesData.map((project, index) => (
            <div 
              key={project.id} 
              className="portfolio-panel w-screen h-full flex flex-col justify-center items-center relative p-8 md:p-24 shrink-0"
            >
              {/* Subtle background color overlay */}
              <div className={`absolute inset-0 opacity-10 ${project.color}`}></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-12 lg:gap-24">
                <div className="flex-1 space-y-6 lg:max-w-xl">
                  <div className="text-sm md:text-base font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-4">
                    <span>0{index + 1} {'//'} {project.category}</span>
                    <div className="w-6 h-6 text-[#b8976a] opacity-70">{project.icon}</div>
                  </div>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setSelectedService(project.id)}
                      className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors duration-300"
                    >
                      View Case Study
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 w-full relative h-[40vh] lg:h-[60vh] rounded-3xl overflow-hidden shadow-2xl group">
                  {/* Image container */}
                  <div 
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    style={{ backgroundImage: `url(${project.img})` }}
                  />
                  <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedService(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
            >
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl w-full pointer-events-auto relative shadow-2xl shadow-[#b8976a]/5 max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {(() => {
                  const service = servicesData.find(s => s.id === selectedService);
                  if (!service) return null;
                  return (
                    <div>
                      <div className="text-[#b8976a] mb-6 w-12 h-12">
                        {service.icon}
                      </div>
                      <h4 className="text-2xl md:text-4xl font-bold text-white mb-2">{service.title}</h4>
                      <p className="text-zinc-400 mb-6 text-lg">{service.category}</p>
                      
                      <p className="text-lg text-zinc-300 leading-relaxed mb-8">{service.description}</p>
                      
                      <div className="border-t border-white/10 pt-6 mb-6">
                        <p className="text-sm text-[#b8976a] font-medium uppercase tracking-wider mb-3">Why This Matters</p>
                        <p className="text-zinc-300 leading-relaxed text-lg">{service.why}</p>
                      </div>
                      
                      <ul className="space-y-4">
                        {service.details.map((d) => (
                          <li key={d} className="flex items-center gap-4 text-zinc-300 text-lg">
                            <svg className="w-6 h-6 text-[#b8976a] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
