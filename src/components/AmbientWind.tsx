'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ambient wind that plays ONLY while the hero section is visible.
 * Uses pink noise + a gentle low oscillator for a more musical, aesthetic feel.
 */
export default function AmbientWind() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);
  const visibleRef = useRef(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const initAudio = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      ctxRef.current = ctx;

      // --- Layer 1: Pink noise (warm breeze) ---
      const bufferSize = ctx.sampleRate * 6;
      const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = buffer.getChannelData(ch);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          b3 = 0.8665 * b3 + white * 0.3104856;
          b4 = 0.55 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.016898;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.02;
          b6 = white * 0.115926;
        }
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.value = 280;
      noiseFilter.Q.value = 0.3;

      // --- Layer 2: Subtle low hum (aesthetic tone) ---
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 80; // Very low hum
      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.008; // Barely audible

      // --- Layer 3: Gentle high shimmer ---
      const shimmer = ctx.createOscillator();
      shimmer.type = 'sine';
      shimmer.frequency.value = 440;
      const shimmerGain = ctx.createGain();
      shimmerGain.gain.value = 0.003; // Whisper-quiet

      // Master gain
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gainRef.current = gain;

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(gain);
      osc.connect(oscGain);
      oscGain.connect(gain);
      shimmer.connect(shimmerGain);
      shimmerGain.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();
      osc.start();
      shimmer.start();

      // Fade in
      gain.gain.setTargetAtTime(0.07, ctx.currentTime, 1.0);
    };

    // Observe hero section visibility
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
          if (gainRef.current && ctxRef.current && startedRef.current) {
            const target = (entry.isIntersecting && !muted) ? 0.07 : 0;
            gainRef.current.gain.setTargetAtTime(target, ctxRef.current.currentTime, 0.5);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(heroEl);
    }

    // Start on first interaction
    const start = () => {
      initAudio();
      if (ctxRef.current?.state === 'suspended') ctxRef.current.resume();
    };
    window.addEventListener('click', start, { once: true });
    window.addEventListener('touchstart', start, { once: true });
    window.addEventListener('scroll', start, { once: true });

    return () => {
      window.removeEventListener('click', start);
      window.removeEventListener('touchstart', start);
      window.removeEventListener('scroll', start);
      if (observer) observer.disconnect();
      if (ctxRef.current) ctxRef.current.close();
    };
  }, [muted]);

  useEffect(() => {
    if (!gainRef.current || !ctxRef.current) return;
    const target = (muted || !visibleRef.current) ? 0 : 0.07;
    gainRef.current.gain.setTargetAtTime(target, ctxRef.current.currentTime, 0.3);
  }, [muted]);

  return (
    <button
      onClick={() => setMuted(!muted)}
      className="fixed bottom-6 right-6 z-50 w-9 h-9 rounded-full bg-ink/70 backdrop-blur-md border border-graphite/20 flex items-center justify-center text-ivory/80 hover:bg-gold hover:text-ink transition-all duration-300"
      aria-label={muted ? 'Unmute' : 'Mute'}
      title={muted ? 'Unmute wind' : 'Mute wind'}
    >
      {muted ? (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 010 7.07" />
        </svg>
      )}
    </button>
  );
}
