"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HEXAGONS = [
  { src: '/assets-experiment/artwork/a105-antreprenor.webp', color: '#FEBD00', delay: 0 },
  { src: '/assets-experiment/artwork/s104-activ-corporal-cost-2.webp', color: '#2D93A7', delay: 0.1 },
  { src: '/assets-experiment/artwork/s114-activ-uman-cost-2.webp', color: '#FEBD00', delay: 0.2 },
  { src: '/assets-experiment/artwork/s151-activ-necorporal-cost-4.webp', color: '#8FC74A', delay: 0.3 },
  { src: '/assets-experiment/artwork/e103-eveniment.webp', color: '#8FC74A', delay: 0.4 },
  { src: '/assets-experiment/artwork/a106-antreprenor.webp', color: '#FEBD00', delay: 0.5 },
  { src: '/assets-experiment/artwork/s105-activ-corporal-cost-2.webp', color: '#2D93A7', delay: 0.6 }
];

export default function ArtworkHexGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Center hex is index 3, others surround it.
  const getHexTransform = (index: number) => {
    if (hoveredIndex === null || hoveredIndex === index) return { x: 0, y: 0 };
    
    // Very simple repulsion logic for neighbors
    const isCenter = hoveredIndex === 3;
    if (isCenter) {
      // push outwards
      const angle = (index * Math.PI * 2) / 6;
      return { x: Math.cos(angle) * 15, y: Math.sin(angle) * 15 };
    }
    return { x: 0, y: 0 };
  };

  return (
    <div className="w-full min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden font-sans">
      <h2 className="text-white text-3xl font-bold mb-16 tracking-widest uppercase z-30">
        Honeycomb Grid
      </h2>
      <div className="relative w-[700px] h-[600px] flex items-center justify-center">
        {HEXAGONS.map((hex, i) => {
          let left = "50%";
          let top = "50%";
          const r = 165; 
          if (i !== 3) {
            // i=0..2 and 4..6. Angles for 6 surrounding hexes
            const idx = i > 3 ? i - 1 : i;
            const angle = (idx * Math.PI) / 3;
            left = `calc(50% + ${Math.cos(angle) * r}px)`;
            top = `calc(50% + ${Math.sin(angle) * r}px)`;
          }

          const shift = getHexTransform(i);

          return (
            <div 
              key={i} 
              className="absolute" 
              style={{ 
                left, 
                top, 
                transform: 'translate(-50%, -50%)', 
                zIndex: hoveredIndex === i ? 20 : 10 
              }}
            >
              <motion.div
                className="w-48 h-[220px] cursor-pointer relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredIndex === i ? 1.15 : 1,
                  x: shift.x,
                  y: shift.y
                }}
                transition={{ 
                  opacity: { duration: 0.5, delay: hex.delay },
                  scale: { duration: 0.3 },
                  x: { type: "spring", stiffness: 300, damping: 20 },
                  y: { type: "spring", stiffness: 300, damping: 20 }
                }}
                onHoverStart={() => setHoveredIndex(i)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Outer glow container */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: hex.color,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    opacity: hoveredIndex === i ? 1 : 0.5,
                    transform: 'scale(1.04)'
                  }}
                />
                {/* Inner image container */}
                <div 
                  className="absolute inset-0 bg-[#222]"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                  }}
                >
                  <img 
                    src={hex.src} 
                    alt={`Hex ${i}`} 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" 
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
