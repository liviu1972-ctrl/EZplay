"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const coins = [
  '/assets-experiment/coins/deckbuilder-component-coin-gold-generic-v01-public.webp',
  '/assets-experiment/coins/deckbuilder-component-coin-cash-v01-public.webp',
  '/assets-experiment/coins/deckbuilder-component-coin-copper-1-bani-v01-public.webp',
  '/assets-experiment/coins/deckbuilder-component-coin-silver-3-bani-v01-public.webp',
  '/assets-experiment/coins/deckbuilder-component-coin-turquoise-10-bani-v01-public.webp',
  '/assets-experiment/coins/deckbuilder-component-coin-gold-5-bani-v01-public.webp'
];

export default function CoinCascade() {
  const [resetKey, setResetKey] = useState(0);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const coinVariants = {
    hidden: { y: -200, x: 0, rotate: 0, opacity: 0 },
    show: (custom: number) => ({
      y: [ -200, 300, 250, 450, 420, 500 - custom * 15 ], // simulate bounces
      x: [ -50 + Math.random()*100, Math.random()*50, Math.random()*20 ],
      rotate: [ 0, 180, 360, 540, 720 ],
      opacity: [0, 1, 1, 1, 1, 1],
      transition: {
        duration: 2.5,
        ease: "easeOut",
        times: [0, 0.4, 0.5, 0.8, 0.9, 1]
      }
    })
  };

  // Sparkles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2
  }));

  return (
    <div className="w-full h-full min-h-[600px] bg-[#373435] relative overflow-hidden rounded-xl flex flex-col items-center">
      
      {/* Background Sparkles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Coins */}
      <motion.div 
        key={resetKey}
        className="absolute inset-0 flex justify-center pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {coins.slice(0, 5).map((src, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={coinVariants}
            className="absolute top-0 w-16 h-16 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            <img src={src} alt="coin" className="w-full h-full object-contain" />
            
            {/* Bounce Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white opacity-0"
              animate={{ 
                scale: [1, 2], 
                opacity: [0, 0.5, 0] 
              }}
              transition={{ 
                delay: 0.4 * i + 1, // timing based on staggered drop
                duration: 0.5,
                repeat: 2,
                repeatDelay: 0.4
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* UI */}
      <div className="absolute bottom-8 z-10">
        <button 
          onClick={() => setResetKey(k => k + 1)}
          className="px-6 py-2 bg-[#FEBD00] text-black font-bold rounded-full shadow-[0_0_20px_rgba(254,189,0,0.5)] hover:bg-white transition-colors"
        >
          Reset Cascade
        </button>
      </div>

    </div>
  );
}
