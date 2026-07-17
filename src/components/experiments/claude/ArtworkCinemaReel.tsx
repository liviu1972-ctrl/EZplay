"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

const REEL_IMAGES = [
  '/assets-experiment/artwork/a107-antreprenor.webp',
  '/assets-experiment/artwork/s106-activ-corporal-cost-3.webp',
  '/assets-experiment/artwork/s115-activ-uman-cost-0.webp',
  '/assets-experiment/artwork/s152-activ-necorporal-cost-4.webp',
  '/assets-experiment/artwork/e104-eveniment.webp',
  '/assets-experiment/artwork/a108-antreprenor.webp',
  '/assets-experiment/artwork/s107-activ-corporal-cost-3.webp',
  '/assets-experiment/artwork/s116-activ-uman-cost-1.webp',
  '/assets-experiment/artwork/s153-activ-necorporal-cost-4.webp',
  '/assets-experiment/artwork/e105-eveniment.webp'
];

export default function ArtworkCinemaReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const itemWidth = 300;
  const gap = 32;
  const totalWidth = (itemWidth + gap) * REEL_IMAGES.length;

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: [x.get(), -totalWidth],
        transition: {
          duration: ((totalWidth + x.get()) / 100), // constant speed based on remaining distance
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls, x, totalWidth]);

  // Create infinite array for smooth scrolling
  const duplicatedImages = [...REEL_IMAGES, ...REEL_IMAGES, ...REEL_IMAGES];

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden py-20 relative font-sans">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      
      <h2 className="text-4xl font-serif italic text-white/40 mb-16 tracking-[0.3em] pointer-events-none z-10 drop-shadow-lg">
        CINEMA REEL
      </h2>

      {/* The Reel Container */}
      <div className="w-[150vw] h-[440px] bg-black border-y-8 border-[#151515] relative flex flex-col justify-between py-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rotate-2 z-20">
        
        {/* Top Perforations */}
        <div className="w-full h-5 flex gap-4 overflow-hidden px-8">
          {Array.from({ length: 150 }).map((_, i) => (
            <div key={`top-${i}`} className="w-6 h-full bg-[#0a0a0a] rounded-[2px] shrink-0 shadow-inner" />
          ))}
        </div>

        {/* Scrolling Strip */}
        <div 
          className="flex-1 w-full overflow-hidden flex items-center cursor-grab active:cursor-grabbing my-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -totalWidth * 2 }}
            style={{ x }}
            animate={controls}
            className="flex gap-8 px-8"
          >
            {duplicatedImages.map((src, i) => (
              <div key={i} className="w-[300px] h-[300px] bg-[#222] shrink-0 relative p-1.5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-[#333]">
                {/* Vignette Overlay */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] z-10 pointer-events-none" />
                {/* Sepia/Contrast filter */}
                <div className="w-full h-full relative overflow-hidden bg-black">
                  <img 
                    src={src} 
                    alt={`Frame ${i}`} 
                    className="w-full h-full object-cover filter contrast-[1.1] sepia-[0.2] opacity-90" 
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Perforations */}
        <div className="w-full h-5 flex gap-4 overflow-hidden px-8">
          {Array.from({ length: 150 }).map((_, i) => (
            <div key={`bot-${i}`} className="w-6 h-full bg-[#0a0a0a] rounded-[2px] shrink-0 shadow-inner" />
          ))}
        </div>
      </div>
    </div>
  );
}
