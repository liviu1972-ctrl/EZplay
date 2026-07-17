"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ARTWORKS = [
  { src: '/assets-experiment/artwork/a101-antreprenor.webp', color: '#FEBD00' },
  { src: '/assets-experiment/artwork/s101-activ-corporal-cost-0.webp', color: '#2D93A7' },
  { src: '/assets-experiment/artwork/s111-activ-uman-cost-0.webp', color: '#FEBD00' },
  { src: '/assets-experiment/artwork/s149-activ-necorporal-cost-3.webp', color: '#8FC74A' },
  { src: '/assets-experiment/artwork/e101-eveniment.webp', color: '#8FC74A' },
  { src: '/assets-experiment/artwork/a102-antreprenor.webp', color: '#FEBD00' },
  { src: '/assets-experiment/artwork/s102-activ-corporal-cost-1.webp', color: '#2D93A7' },
  { src: '/assets-experiment/artwork/s112-activ-uman-cost-1.webp', color: '#FEBD00' }
];

export default function ArtworkWaveReveal() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="w-full min-h-screen bg-[#373435] flex flex-col items-center justify-center p-8 overflow-hidden font-sans">
      <h2 className="text-white text-3xl font-bold mb-12 tracking-wider uppercase text-center drop-shadow-lg">
        Artwork Wave Reveal
      </h2>
      <div ref={containerRef} className="flex flex-wrap justify-center gap-6 max-w-7xl">
        {ARTWORKS.map((artwork, i) => (
          <div key={i} className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] shrink-0">
            {/* The Image Container for Breathing */}
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.2 }}
              animate={isInView ? { scale: [1, 1.05] } : { scale: 1.2 }}
              transition={
                isInView 
                  ? { 
                      duration: 4, 
                      delay: i * 0.15 + 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  : {}
              }
            >
              <img
                src={artwork.src}
                alt={`Artwork ${i}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Colored Cover Bar */}
            <motion.div
              className="absolute inset-0 z-10 origin-bottom"
              style={{ backgroundColor: artwork.color }}
              initial={{ scaleY: 1 }}
              animate={isInView ? { scaleY: 0 } : { scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: i * 0.15 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
