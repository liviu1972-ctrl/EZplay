"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cards = [
  "/assets-experiment/images/corporal/s101.webp",
  "/assets-experiment/images/uman/s111.webp",
  "/assets-experiment/images/necorp/s149.webp",
  "/assets-experiment/images/evenimente/e101.webp",
  "/assets-experiment/images/antreprenori/a101.webp",
  "/assets-experiment/images/corporal/s104.webp",
  "/assets-experiment/images/uman/s114.webp",
  "/assets-experiment/images/necorp/s151.webp"
];

export default function CardShuffleRain() {
  const [raining, setRaining] = useState(false);
  const [drops, setDrops] = useState<any[]>([]);

  const startRain = () => {
    setRaining(false);
    setTimeout(() => {
      const newDrops = Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        card: cards[i % cards.length],
        x: Math.random() * 80 + 10,
        delay: Math.random() * 2,
        rotation: Math.random() * 360,
        endRotation: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 0.5
      }));
      setDrops(newDrops);
      setRaining(true);
    }, 100);
  };

  useEffect(() => {
    startRain();
  }, []);

  return (
    <div className="relative w-full h-[800px] bg-[#373435] overflow-hidden flex flex-col items-center justify-end pb-10">
      <button 
        onClick={startRain}
        className="absolute top-10 z-50 px-8 py-3 bg-[#FEBD00] text-[#373435] font-bold rounded-full shadow-[0_0_15px_rgba(254,189,0,0.5)] hover:bg-[#8FC74A] hover:shadow-[0_0_20px_rgba(143,199,74,0.6)] transition-all transform hover:scale-105"
      >
        SHUFFLE RAIN
      </button>

      <AnimatePresence>
        {raining && drops.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ 
              y: -300, 
              x: `${drop.x}vw`, 
              rotate: drop.rotation,
              scale: drop.scale
            }}
            animate={{ 
              y: 700, 
              rotate: drop.endRotation
            }}
            exit={{
              y: -500,
              opacity: 0,
              transition: { duration: 0.5 }
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              delay: drop.delay,
              ease: "easeIn"
            }}
            className="absolute top-0 w-24 md:w-32 shadow-xl"
            style={{ left: 0 }}
          >
            <img src={drop.card} alt="Card" className="w-full h-auto rounded-lg border border-white/20" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
