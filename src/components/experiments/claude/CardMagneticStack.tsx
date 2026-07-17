"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const cards = [
  "/assets-experiment/images/corporal/s101.webp",
  "/assets-experiment/images/uman/s111.webp",
  "/assets-experiment/images/necorp/s149.webp",
  "/assets-experiment/images/evenimente/e101.webp",
  "/assets-experiment/images/antreprenori/a101.webp",
  "/assets-experiment/images/spate carti/event.webp"
];

export default function CardMagneticStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !exploded) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      } else if (exploded) {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [exploded, mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[800px] bg-[#373435] flex items-center justify-center relative overflow-hidden"
      onClick={() => setExploded(!exploded)}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white/10 font-bold text-6xl text-center select-none">
        {exploded ? "CLICK TO STACK" : "MOVE MOUSE & CLICK"}
      </div>

      {cards.map((src, index) => {
        // Progressive lag for spring
        const damping = 20 - index * 2;
        const stiffness = 200 - index * 20;
        
        const springX = useSpring(mouseX, { stiffness, damping });
        const springY = useSpring(mouseY, { stiffness, damping });
        
        // Stack visual separation
        const defaultY = index * 5;
        const defaultX = index * 5;
        
        // Explode positions
        const angle = (index / cards.length) * Math.PI * 2;
        const explodeRadius = 250;
        const explodeX = Math.cos(angle) * explodeRadius;
        const explodeY = Math.sin(angle) * explodeRadius;
        const explodeRotate = angle * (180 / Math.PI) + 90;

        return (
          <motion.div
            key={index}
            className="absolute w-40 md:w-56"
            style={{
              x: exploded ? explodeX : springX,
              y: exploded ? explodeY : springY,
              zIndex: cards.length - index
            }}
            animate={{
              x: exploded ? explodeX : defaultX,
              y: exploded ? explodeY : defaultY,
              rotate: exploded ? explodeRotate : index * 2 - (cards.length),
              scale: exploded ? 1 : 1 - index * 0.05
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15
            }}
          >
            <img 
              src={src} 
              alt="Card" 
              className="w-full h-auto rounded-xl shadow-2xl border border-white/10" 
              style={{
                boxShadow: exploded ? '0 10px 30px rgba(0,0,0,0.5)' : `0 ${10 + index*5}px ${20 + index*10}px rgba(0,0,0,${0.3 + index*0.1})`
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
