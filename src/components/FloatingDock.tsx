'use client';

import React from 'react';
import { Home, Coffee, Info, Mail } from 'lucide-react';
import { MagnificationDock } from '@/components/MagnificationDock';

export function FloatingDock() {
  const dockItems = [
    { icon: <Home size={22} />, label: 'Home', onClick: () => window.scrollTo(0, 0) },
    { icon: <Coffee size={22} />, label: 'Menu', onClick: () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <Info size={22} />, label: 'About', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <Mail size={22} />, label: 'Contact', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <>
      {/* Desktop Magnification Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] hidden md:block pointer-events-auto">
        <MagnificationDock 
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={80}
        />
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[110] bg-[#111111]/90 backdrop-blur-xl border-t border-[#ffffff1a] pointer-events-auto px-6 py-4 flex justify-between items-center pb-safe">
        {dockItems.map((item, index) => (
          <button 
            key={index} 
            onClick={item.onClick}
            className="flex flex-col items-center gap-1 text-[#888888] hover:text-white transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
