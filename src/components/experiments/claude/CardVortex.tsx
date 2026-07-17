"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const cards = [
  "/assets-experiment/images/corporal/s101-s134.webp",
  "/assets-experiment/images/uman/s111-s148.webp",
  "/assets-experiment/images/necorp/s149-s158.webp",
  "/assets-experiment/images/evenimente/e101-e110.webp",
  "/assets-experiment/images/antreprenori/a101-a109.webp",
  "/assets-experiment/images/corporal/s101-s134.webp",
  "/assets-experiment/images/uman/s111-s148.webp",
  "/assets-experiment/images/necorp/s149-s158.webp",
  "/assets-experiment/images/evenimente/e101-e110.webp",
  "/assets-experiment/images/antreprenori/a101-a109.webp",
  "/assets-experiment/images/corporal/s101-s134.webp",
  "/assets-experiment/images/uman/s111-s148.webp"
];

export default function CardVortex() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left - rect.width / 2,
          y: e.clientY - rect.top - rect.height / 2
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[800px] flex items-center justify-center overflow-hidden bg-[#373435]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D93A7]/20 to-transparent pointer-events-none" />
      
      {cards.map((src, index) => {
        const angle = (index / cards.length) * Math.PI * 2;
        const radius = 200;
        
        // Vortex positions
        const vortexX = Math.cos(angle) * radius;
        const vortexZ = Math.sin(angle) * radius;
        const vortexY = Math.sin(angle * 2) * 50;

        // Grid positions
        const cols = 4;
        const col = index % cols;
        const row = Math.floor(index / cols);
        const gridX = (col - 1.5) * 180;
        const gridY = (row - 1) * 250;
        
        const tiltX = (mousePos.y / 20) * -1;
        const tiltY = mousePos.x / 20;

        return (
          <motion.div
            key={index}
            className="absolute origin-center cursor-pointer shadow-2xl rounded-xl"
            initial={false}
            animate={{
              x: isHovered ? gridX : vortexX,
              y: isHovered ? gridY : vortexY,
              z: isHovered ? 0 : vortexZ,
              rotateY: isHovered ? tiltY : angle * (180 / Math.PI) + 90,
              rotateX: isHovered ? tiltX : 10,
              rotateZ: isHovered ? 0 : (index * 5) % 360,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 15,
              mass: 1,
              delay: isHovered ? index * 0.03 : 0
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img 
              src={src.replace('-s134', '').replace('-s148', '').replace('-s158', '').replace('-e110', '').replace('-a109', '')} 
              alt={`Card ${index}`} 
              className="w-32 md:w-40 h-auto rounded-xl shadow-2xl border-2 border-[#FEBD00]/30"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
