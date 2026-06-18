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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] hidden md:block pointer-events-auto">
      <MagnificationDock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={80}
      />
    </div>
  );
}
