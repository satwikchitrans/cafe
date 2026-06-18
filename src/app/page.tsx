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
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const { data: settingsRow } = await supabase.from('site_settings').select('*').single();
  const siteName = settingsRow?.site_name || 'Midnight Brew';
  const description = `${siteName} - Premium coffee, stunning atmosphere.`;

  return {
    title: siteName,
    description: description,
    openGraph: {
      title: siteName,
      description: description,
      type: 'website',
    },
  };
}

export default async function Home_Page() {
  const { data: galleryItems } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
  const { data: signatureItems } = await supabase.from('signatures').select('*').order('created_at', { ascending: true });
  const { data: settingsRow } = await supabase.from('site_settings').select('*').single();

  const gallery = galleryItems && galleryItems.length > 0 ? galleryItems : [];
  const signatures = signatureItems && signatureItems.length > 0 ? signatureItems : [];
  
  // Default fallbacks in case settings are missing or db is empty
  const settings = settingsRow || {
    site_name: 'Midnight Brew',
    hero_text: 'MIDNIGHT BREW',
    email: 'hello@midnightbrew.com',
    whatsapp: '918580364890',
    instagram: '#',
    twitter: '#',
    delivery_link: '#'
  };

  return (
    <main className={`min-h-screen w-full bg-midnight-bg text-[#ebebeb] font-satoshi antialiased selection:bg-midnight-accent selection:text-white overflow-x-hidden relative ${inter.variable}`}>
      
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between text-sm font-medium tracking-tight bg-[#111111]/80 backdrop-blur-xl border-b border-[#ffffff1a]">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center group">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-extrabold text-xl transition-transform group-hover:rotate-12">
              {settings.site_name.charAt(0).toUpperCase()}.
            </div>
            <span className="ml-4 font-bold tracking-widest uppercase hidden md:block text-white">
              {settings.site_name}
            </span>
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
            text={settings.hero_text} 
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
        
        {gallery.length > 0 ? (
          <MasonryGallery 
            items={gallery}
            animateFrom="bottom"
            blurToFocus={true}
            stagger={0.1}
            scaleOnHover={true}
            hoverScale={0.97}
            colorShiftOnHover={true}
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-[#444444] border border-[#222222] rounded-xl border-dashed">
            Add images in the Admin Panel
          </div>
        )}
      </section>

      {/* Card Swap Showcase Section */}
      <section id="menu" className="py-32 overflow-hidden bg-[#111111] border-y border-[#222222]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-satoshi font-semibold tracking-tighter mb-4">Our Signatures</h2>
          <p className="text-[#888888] font-inter">Swipe through our most loved roasts.</p>
        </div>
        
        {signatures.length > 0 ? (
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
        ) : (
          <div className="max-w-md mx-auto h-64 flex items-center justify-center text-[#444444] border border-[#222222] rounded-xl border-dashed">
            Add signature blends in the Admin Panel
          </div>
        )}
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="relative pt-48 pb-32 px-6 md:px-12 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          <div className="flex-1">
            <h2 className="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-white mb-12 select-none">
              LET'S<br />BREW.
            </h2>
            <div className="flex flex-col gap-6">
              <a href={`mailto:${settings.email}`} className="text-2xl sm:text-3xl md:text-4xl font-semibold hover:text-[#FF6B50] transition-all w-fit break-all">
                {settings.email}
              </a>
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl md:text-3xl font-medium text-[#888888] hover:text-[#FF6B50] transition-all w-fit">
                +{settings.whatsapp}
              </a>
              <p className="text-[#666666] flex items-center gap-2 mt-4">
                Available for private events and collaborations.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:mb-6">
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href={settings.delivery_link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-40 pt-10 border-t border-[#111111] flex flex-col md:flex-row justify-between items-center text-[#333333] text-[10px] font-bold uppercase tracking-widest text-center md:text-left gap-4">
          <p>&copy; {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
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
