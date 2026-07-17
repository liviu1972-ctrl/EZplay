"use client";

import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

const GAME_ICONS = [
  { src: '/assets-experiment/icons/deckbuilder-component-icon-production-v01-public.webp', label: 'PRODUCTION', target: 8540 },
  { src: '/assets-experiment/icons/deckbuilder-component-icon-marketing-v01-public.webp', label: 'MARKETING', target: 3200 },
  { src: '/assets-experiment/icons/deckbuilder-component-icon-cost-v01-public.webp', label: 'COST', target: 1450 },
  { src: '/assets-experiment/icons/deckbuilder-component-icon-expense-v01-public.webp', label: 'EXPENSE', target: 670 }
];

const NUMBER_ELEMENTS = [
  { src: '/assets-experiment/images/elemente cifre/cash.webp', label: 'CASH', color: '#8FC74A' },
  { src: '/assets-experiment/images/elemente cifre/income.webp', label: 'INCOME', color: '#2D93A7' },
  { src: '/assets-experiment/images/elemente cifre/production.webp', label: 'PROD', color: '#55BFE5' },
  { src: '/assets-experiment/images/elemente cifre/profit.webp', label: 'PROFIT', color: '#FEBD00' },
  { src: '/assets-experiment/images/elemente cifre/sales.webp', label: 'SALES', color: '#8FC74A' },
  { src: '/assets-experiment/images/elemente cifre/expenses.webp', label: 'EXP', color: '#FEBD00' },
  { src: '/assets-experiment/images/elemente cifre/capitalization.webp', label: 'CAP', color: '#2D93A7' }
];

function Counter({ from, to }: { from: number; to: number }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(val) {
        setValue(Math.floor(val));
      }
    });
    return () => controls.stop();
  }, [from, to]);

  return <span className="font-mono tabular-nums">{value.toLocaleString()}</span>;
}

export default function IconDashboard() {
  return (
    <div className="w-full min-h-screen bg-[#0f1115] text-white p-8 font-sans overflow-hidden relative flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2D93A7] opacity-5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <img src="/assets-experiment/logo/ezplay-logo-primary-v01-w512-public.webp" alt="EZPLAY Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#55BFE5] to-[#2D93A7]">
            SYSTEM DASHBOARD
          </h1>
        </motion.div>

        {/* Top Row: Icons + Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {GAME_ICONS.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
              className="bg-[#1a1d24] border border-[#2D93A7]/30 rounded-xl p-6 flex flex-col items-center justify-center gap-4 relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#2D93A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src={icon.src} alt={icon.label} className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(45,147,167,0.5)] group-hover:scale-110 transition-transform duration-500" />
              <div className="text-center">
                <div className="text-[#55BFE5] text-sm font-bold tracking-widest mb-1 opacity-80">{icon.label}</div>
                <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  <Counter from={0} to={icon.target} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row: Number Elements */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {NUMBER_ELEMENTS.map((el, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.6 }}
              className="relative rounded-lg p-4 bg-[#14161b] flex flex-col items-center justify-center gap-3 w-[120px] shadow-lg group"
            >
              <motion.div
                className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                style={{ borderColor: el.color }}
                animate={{ 
                  boxShadow: [`0 0 5px ${el.color}40`, `0 0 15px ${el.color}80`, `0 0 5px ${el.color}40`]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
              <img src={el.src} alt={el.label} className="w-16 h-16 object-contain z-10 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold tracking-wider text-gray-400 z-10">{el.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
