"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const artworks = [
  { id: 1, src: '/assets-experiment/artwork/s101-activ-corporal-cost-0.webp', color: '#2D93A7', type: 'corporal' },
  { id: 2, src: '/assets-experiment/artwork/s111-activ-uman-cost-0.webp', color: '#FEBD00', type: 'uman' },
  { id: 3, src: '/assets-experiment/artwork/s149-activ-necorporal-cost-3.webp', color: '#8FC74A', type: 'necorporal' },
  { id: 4, src: '/assets-experiment/artwork/a101-antreprenor.webp', color: '#FEBD00', type: 'antreprenor' },
  { id: 5, src: '/assets-experiment/artwork/e101-eveniment.webp', color: '#8FC74A', type: 'eveniment' },
  { id: 6, src: '/assets-experiment/artwork/s102-activ-corporal-cost-1.webp', color: '#2D93A7', type: 'corporal' },
  { id: 7, src: '/assets-experiment/artwork/s112-activ-uman-cost-1.webp', color: '#FEBD00', type: 'uman' },
  { id: 8, src: '/assets-experiment/artwork/s150-activ-necorporal-cost-4.webp', color: '#8FC74A', type: 'necorporal' },
  { id: 9, src: '/assets-experiment/artwork/a102-antreprenor.webp', color: '#FEBD00', type: 'antreprenor' },
  { id: 10, src: '/assets-experiment/artwork/e102-eveniment.webp', color: '#8FC74A', type: 'eveniment' },
  { id: 11, src: '/assets-experiment/artwork/s103-activ-corporal-cost-2.webp', color: '#2D93A7', type: 'corporal' },
  { id: 12, src: '/assets-experiment/artwork/s113-activ-uman-cost-2.webp', color: '#FEBD00', type: 'uman' },
];

export default function ArtworkMosaic() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="w-full h-full min-h-[600px] p-8 bg-[#373435] flex items-center justify-center overflow-hidden relative rounded-xl">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl w-full">
        {artworks.map((item, i) => {
          const isHovered = hoveredId === item.id;
          const isOtherHovered = hoveredId !== null && hoveredId !== item.id;
          
          return (
            <motion.div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isHovered ? 1.15 : 1,
                zIndex: isHovered ? 10 : 1,
                filter: isOtherHovered ? 'grayscale(80%) brightness(0.5)' : 'grayscale(0%) brightness(1)'
              }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                delay: hoveredId === null ? i * 0.05 : 0
              }}
              style={{
                boxShadow: isHovered ? `0 20px 40px ${item.color}80` : '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <img 
                src={item.src} 
                alt={`Artwork ${item.id}`} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                  style={{ borderColor: item.color }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
