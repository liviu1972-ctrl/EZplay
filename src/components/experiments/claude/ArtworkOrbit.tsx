"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const orbits = [
  {
    radius: 120,
    duration: 15,
    color: '#2D93A7',
    artworks: [
      '/assets-experiment/artwork/s101-activ-corporal-cost-0.webp',
      '/assets-experiment/artwork/s102-activ-corporal-cost-1.webp',
      '/assets-experiment/artwork/s103-activ-corporal-cost-2.webp',
      '/assets-experiment/artwork/s104-activ-corporal-cost-3.webp',
    ]
  },
  {
    radius: 200,
    duration: 25,
    color: '#FEBD00',
    artworks: [
      '/assets-experiment/artwork/s111-activ-uman-cost-0.webp',
      '/assets-experiment/artwork/s112-activ-uman-cost-1.webp',
      '/assets-experiment/artwork/s113-activ-uman-cost-2.webp',
      '/assets-experiment/artwork/s114-activ-uman-cost-3.webp',
    ]
  },
  {
    radius: 280,
    duration: 35,
    color: '#8FC74A',
    artworks: [
      '/assets-experiment/artwork/s149-activ-necorporal-cost-3.webp',
      '/assets-experiment/artwork/s150-activ-necorporal-cost-4.webp',
      '/assets-experiment/artwork/e101-eveniment.webp',
      '/assets-experiment/artwork/e102-eveniment.webp',
    ]
  }
];

export default function ArtworkOrbit() {
  const [hoveredOrbit, setHoveredOrbit] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <div className="w-full h-full min-h-[600px] bg-[#373435] relative overflow-hidden rounded-xl flex items-center justify-center">
      
      {/* Center Logo */}
      <div className="absolute z-50 w-24 h-24 rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center p-2">
        <img src="/assets-experiment/logo/ezplay-logo-primary-v01-w512-public.webp" alt="EZplay" className="w-full h-full object-contain" />
      </div>

      {orbits.map((orbit, orbitIndex) => {
        const isPaused = hoveredOrbit === orbitIndex;
        
        return (
          <div key={orbitIndex} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Orbit Ring */}
            <div 
              className="absolute rounded-full border border-dashed opacity-30"
              style={{ 
                width: orbit.radius * 2, 
                height: orbit.radius * 2, 
                borderColor: orbit.color,
                boxShadow: `0 0 20px ${orbit.color}20, inset 0 0 20px ${orbit.color}20`
              }}
            />
            
            {/* Rotating Container */}
            <motion.div
              className="absolute w-full h-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                duration: orbit.duration,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ 
                animationPlayState: isPaused ? 'paused' : 'running' 
              }}
            >
              {orbit.artworks.map((src, i) => {
                const angle = (i / orbit.artworks.length) * Math.PI * 2;
                const x = Math.cos(angle) * orbit.radius;
                const y = Math.sin(angle) * orbit.radius;
                const isHoveredImg = hoveredImage === src;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full overflow-hidden border-2 cursor-pointer pointer-events-auto"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      x: '-50%',
                      y: '-50%',
                      borderColor: orbit.color,
                      boxShadow: `0 0 15px ${orbit.color}`
                    }}
                    onHoverStart={() => {
                      setHoveredOrbit(orbitIndex);
                      setHoveredImage(src);
                    }}
                    onHoverEnd={() => {
                      setHoveredOrbit(null);
                      setHoveredImage(null);
                    }}
                    animate={{
                      width: isHoveredImg ? 120 : 40,
                      height: isHoveredImg ? 120 : 40,
                      zIndex: isHoveredImg ? 100 : 10
                    }}
                  >
                    {/* Counter rotation wrapper to keep image upright */}
                    <motion.div
                      className="w-full h-full"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: orbit.duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    >
                      <img src={src} className="w-full h-full object-cover scale-[1.2]" alt="" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
