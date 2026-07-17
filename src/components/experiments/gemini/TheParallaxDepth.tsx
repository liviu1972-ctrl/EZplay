"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TheParallaxDepth() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <div ref={containerRef} className="relative w-full h-[800px] flex items-center justify-center -my-32 pointer-events-none">
      
      {/* Background System Field Lines */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <path d="M 100 0 L 100 800 M 300 0 L 300 800 M 500 0 L 500 800 M 700 0 L 700 800" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
          <path d="M 0 200 L 1000 200 M 0 400 L 1000 400 M 0 600 L 1000 600" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
        </svg>
      </div>

      <motion.div style={{ y: y1 }} className="absolute left-1/4 z-10 w-48 h-72 rounded-xl shadow-2xl overflow-hidden border-2 border-[#2D93A7]">
        <img src="/assets-experiment/images/corporal/s122.webp" className="w-full h-full object-cover" alt="Corp" />
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute z-20 w-56 h-80 rounded-xl shadow-2xl overflow-hidden border-2 border-[#2D93A7]">
        <img src="/assets-experiment/images/corporal/s123.webp" className="w-full h-full object-cover" alt="Corp" />
      </motion.div>
      
      <motion.div style={{ y: y3 }} className="absolute right-1/4 z-30 w-48 h-72 rounded-xl shadow-2xl overflow-hidden border-2 border-[#2D93A7]">
        <img src="/assets-experiment/images/corporal/s124.webp" className="w-full h-full object-cover" alt="Corp" />
      </motion.div>

    </div>
  );
}
