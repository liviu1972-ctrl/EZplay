"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TheBoardConnection() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="relative w-[600px] h-[300px] flex items-center justify-between" onClick={() => setConnected(!connected)}>
      
      {/* Node 1 */}
      <div className="z-10 w-40 h-56 rounded-xl overflow-hidden border-4 border-[#8FC74A] shadow-lg bg-white relative cursor-pointer">
        <img src="/assets-experiment/images/evenimente/e102.webp" className="w-full h-full object-cover" alt="Event" />
        <div className="absolute top-1/2 -right-4 w-4 h-4 bg-[#8FC74A] rounded-full translate-y-[-50%]" />
      </div>

      {/* SVG Line Connection */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" className="overflow-visible">
          <motion.path 
            d="M 160 150 C 300 150, 300 150, 440 150" 
            fill="transparent" 
            stroke="#FEBD00" 
            strokeWidth="4"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: connected ? 1 : 0, 
              opacity: connected ? 1 : 0,
              strokeDashoffset: connected ? [0, -100] : 0
            }}
            transition={{ 
              pathLength: { duration: 0.8, ease: "easeInOut" },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
            }}
          />
        </svg>
      </div>

      {/* Node 2 */}
      <div className="z-10 w-40 h-56 rounded-xl overflow-hidden border-4 border-[#FEBD00] shadow-lg bg-white relative cursor-pointer">
        <div className="absolute top-1/2 -left-4 w-4 h-4 bg-[#FEBD00] rounded-full translate-y-[-50%]" />
        <img src="/assets-experiment/images/elemente cifre/capitalization.webp" className="w-full h-full object-cover" alt="Capital" />
      </div>
      
      <div className="absolute -bottom-12 left-0 right-0 text-center text-sm text-[#5E5A54]">
        (Click oriunde pentru a conecta activele)
      </div>
    </div>
  );
}
