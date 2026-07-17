"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cards = [
  { src: "/assets-experiment/images/corporal/s101.webp", pos: "top" },
  { src: "/assets-experiment/images/uman/s111.webp", pos: "bottom" },
  { src: "/assets-experiment/images/necorp/s149.webp", pos: "top" },
  { src: "/assets-experiment/images/evenimente/e101.webp", pos: "bottom" },
  { src: "/assets-experiment/images/antreprenori/a101.webp", pos: "top" },
  { src: "/assets-experiment/images/corporal/s105.webp", pos: "bottom" },
  { src: "/assets-experiment/images/uman/s115.webp", pos: "top" },
  { src: "/assets-experiment/images/necorp/s152.webp", pos: "bottom" },
];

export default function CardTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollXProgress } = useScroll({
    container: containerRef
  });

  const lineWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full h-[800px] bg-[#373435] flex items-center relative overflow-hidden">
      <div 
        ref={containerRef}
        className="w-full h-full flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-[20vw] hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#2D93A7] to-[#8FC74A] -translate-y-1/2 z-0"
          style={{ width: lineWidth }}
        />

        <div className="flex gap-40 relative z-10 w-max pr-[20vw]">
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              className={`snap-center shrink-0 w-48 relative flex flex-col items-center ${card.pos === 'top' ? 'justify-end mb-48' : 'justify-start mt-48'}`}
              initial={{ opacity: 0, scale: 0.5, y: card.pos === 'top' ? 50 : -50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className={`absolute left-1/2 w-0.5 h-12 bg-[#FEBD00] -translate-x-1/2 ${card.pos === 'top' ? 'bottom-[-48px]' : 'top-[-48px]'}`} />
              <div className={`absolute left-1/2 w-4 h-4 rounded-full bg-[#FEBD00] -translate-x-1/2 ${card.pos === 'top' ? 'bottom-[-56px]' : 'top-[-56px]'} shadow-[0_0_10px_#FEBD00]`} />
              
              <img 
                src={card.src} 
                alt="Card" 
                className="w-full h-auto rounded-xl shadow-2xl hover:scale-110 transition-transform duration-300" 
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest pointer-events-none">
        SCROLL HORIZONTALLY
      </div>
    </div>
  );
}
