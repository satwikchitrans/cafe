import React from 'react';
import './cafe.css';
import { Inter } from "next/font/google";
import { Globe } from 'lucide-react';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

import { TextPressure } from '@/components/TextPressure';
import { FloatingDock } from '@/components/FloatingDock';
import { MasonryGallery } from '@/components/MasonryGallery';
import { ExplodedView } from '@/components/ExplodedView';
import { HorizontalScrollTicker } from '@/components/HorizontalScrollTicker';
import { CardSwap, Card } from '@/components/CardSwapShowcase';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function Home_Page() {
  const { data: galleryItems } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
  const { data: signatureItems } = await supabase.from('signatures').select('*').order('created_at', { ascending: true });

  const gallery = galleryItems && galleryItems.length > 0 ? galleryItems : [
    { id: '1', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop', height: 400, title: 'Morning Light' },
    { id: '2', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop', height: 250, title: 'The Roast' },
    { id: '3', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop', height: 600, title: 'Cozy Corners' },
    { id: '4', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop', height: 350, title: 'Latte Art' },
    { id: '5', img: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=800&auto=format&fit=crop', height: 500, title: 'Barista Flow' },
    { id: '6', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop', height: 300, title: 'Espresso Machine' },
  ];

  const signatures = signatureItems && signatureItems.length > 0 ? signatureItems : [
    {
      id: 's1',
      title: '01. The Midnight Blend',
      description: 'Dark roasted beans sourced from the highlands of Ethiopia. Notes of dark chocolate, black cherry, and toasted almond.',
      img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 's2',
      title: '02. Dawn Patrol',
      description: 'A light, bright roast perfect for early mornings. Floral aromas with hints of jasmine, lemon zest, and honey.',
      img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 's3',
      title: '03. Velvet Espresso',
      description: 'Our signature espresso pull. Thick crema, heavy body, and a lingering sweet finish. The foundation of our lattes.',
      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <main className={`min-h-screen w-full bg-midnight-bg text-[#ebebeb] font-satoshi antialiased selection:bg-midnight-accent selection:text-white overflow-x-hidden relative ${inter.variable}`}>
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between text-sm font-medium tracking-tight bg-[#111111]/80 backdrop-blur-xl border-b border-[#ffffff1a]">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center group">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-extrabold text-xl transition-transform group-hover:rotate-12">B.</div>
          </a>
          <div className="hidden lg:flex items-center gap-8 text-[#888888]">
            <a href="#" className="hover:text-white transition-colors">Origins</a>
            <a href="#gallery" className="hover:text-white transition-colors">Atmosphere</a>
            <a href="#menu" className="hover:text-white transition-colors">The Brew</a>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <a href="#contact" className="px-5 py-2.5 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333333] rounded-lg transition-all duration-300">
            Visit Us
          </a>
        </div>
      </nav>

      <FloatingDock />

      {/* Hero Section */}
      <header className="relative h-screen w-full flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_70%)] opacity-60"></div>
        </div>

        <div className="relative z-10 w-full flex justify-center px-4">
          <TextPressure 
            text="MIDNIGHT BREW" 
            className="text-[12vw] md:text-[10vw] font-bold text-center leading-none tracking-tighter"
            maxDistance={400}
          />
        </div>

        <div className="absolute bottom-32 left-8 md:left-12 flex items-center gap-5 group z-10">
          <p className="text-xs md:text-sm font-medium leading-tight text-[#888888] group-hover:text-white transition-colors uppercase tracking-widest">
            Est. 2024 <br/>
            Tokyo &mdash; NY
          </p>
        </div>
      </header>

      <ExplodedView />
      <HorizontalScrollTicker />

      {/* Masonry Gallery Section */}
      <section id="gallery" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20 border-b border-[#222222] pb-10">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6B50]">The Atmosphere</h2>
          <span className="hidden md:block text-[#444444] text-xs font-medium uppercase tracking-widest">Vol. 01</span>
        </div>
        
        <MasonryGallery 
          items={gallery}
          animateFrom="bottom"
          blurToFocus={true}
          stagger={0.1}
          scaleOnHover={true}
          hoverScale={0.97}
          colorShiftOnHover={true}
        />
      </section>

      {/* Card Swap Showcase Section */}
      <section id="menu" className="py-32 overflow-hidden bg-[#111111] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-satoshi font-semibold tracking-tighter mb-4">Our Signatures</h2>
          <p className="text-[#888888] font-inter">Swipe through our most loved roasts.</p>
        </div>
        
        <CardSwap delay={4000} cardDistance={60} verticalDistance={60}>
          {signatures.map((sig) => (
            <Card key={sig.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#FF6B50] mb-2 uppercase tracking-widest">{sig.title}</h3>
                <p className="text-[#888888] leading-relaxed">{sig.description}</p>
              </div>
              <div className="w-full h-48 bg-[#222222] rounded-xl overflow-hidden mt-8">
                <img src={sig.img} className="w-full h-full object-cover opacity-60 mix-blend-luminosity" alt={sig.title} />
              </div>
            </Card>
          ))}
        </CardSwap>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="relative pt-48 pb-32 px-6 md:px-12 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          <div className="flex-1">
            <h2 className="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-white mb-12 select-none">
              LET'S<br />BREW.
            </h2>
            <div className="flex flex-col gap-6">
              <a href="mailto:hello@midnightbrew.com" className="text-2xl sm:text-3xl md:text-4xl font-semibold hover:text-[#FF6B50] transition-all w-fit break-all">
                hello@midnightbrew.com
              </a>
              <a href="https://wa.me/918580364890" target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl md:text-3xl font-medium text-[#888888] hover:text-[#FF6B50] transition-all w-fit">
                +91 85803 64890
              </a>
              <p className="text-[#666666] flex items-center gap-2 mt-4">
                Available for private events and collaborations.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:mb-6">
            <a href="#" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-40 pt-10 border-t border-[#111111] flex flex-col md:flex-row justify-between items-center text-[#333333] text-[10px] font-bold uppercase tracking-widest text-center md:text-left gap-4">
          <p>&copy; 2024 Midnight Brew. All rights reserved.</p>
          <p className="text-[#FF6B50]">This is a sample website we CHEMIKAZE built.</p>
          <div className="flex gap-4 sm:gap-10 mt-6 md:mt-0 flex-wrap justify-center">
            <a href="#" className="hover:text-[#666666] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#666666] transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
