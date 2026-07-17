"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { src: '/assets-experiment/artwork/a103-antreprenor.webp', title: 'ANTREPRENORI' },
  { src: '/assets-experiment/artwork/s103-activ-corporal-cost-1.webp', title: 'CORPORALE' },
  { src: '/assets-experiment/artwork/s113-activ-uman-cost-1.webp', title: 'UMANE' },
  { src: '/assets-experiment/artwork/s150-activ-necorporal-cost-3.webp', title: 'NECORPORALE' },
  { src: '/assets-experiment/artwork/e102-eveniment.webp', title: 'EVENIMENTE' },
  { src: '/assets-experiment/artwork/a104-antreprenor.webp', title: 'LIDERI' }
];

export default function ArtworkKenBurns() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center font-sans">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={SLIDES[currentIndex].src}
            alt={SLIDES[currentIndex].title}
            className="w-full h-full object-cover opacity-60"
            initial={{ scale: 1, x: 0, y: 0 }}
            animate={{ 
              scale: 1.15,
              x: currentIndex % 2 === 0 ? '-2%' : '2%',
              y: currentIndex % 3 === 0 ? '-2%' : '2%'
            }}
            transition={{ duration: 10, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

      {/* Typewriter Title */}
      <div className="absolute bottom-32 left-8 md:left-24 z-20">
        <AnimatePresence mode="wait">
          <motion.h2
            key={currentIndex}
            className="text-4xl md:text-7xl font-black text-white tracking-[0.2em] uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "circOut" }}
          >
            {SLIDES[currentIndex].title}
          </motion.h2>
        </AnimatePresence>
        <motion.div 
          className="h-1 bg-[#FEBD00] mt-6 w-1/3 drop-shadow-md"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          key={`bar-${currentIndex}`}
        />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-20">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'bg-[#FEBD00] scale-150 shadow-[0_0_10px_rgba(254,189,0,0.8)]' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
